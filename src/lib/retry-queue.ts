import { ReportDispatchPayload, DispatchResult, DeliveryStatus } from '@/types';
import { enqueueSyncItem } from './db';

export interface RetryOptions {
  maxRetries?: number;
  baseDelayMs?: number;
  maxDelayMs?: number;
  onStatusUpdate?: (status: DeliveryStatus, attempt: number, message?: string) => void;
}

export function calculateBackoff(attempt: number, baseMs = 1000, maxMs = 20000): number {
  const exp = Math.min(attempt, 5);
  const delay = Math.min(baseMs * Math.pow(2, exp), maxMs);
  const jitter = Math.random() * 0.25 * delay;
  return Math.floor(delay + jitter);
}

/**
 * Executes report dispatch with resilient exponential backoff retry
 */
export async function submitReportWithRetry(
  payload: ReportDispatchPayload,
  options: RetryOptions = {}
): Promise<DispatchResult> {
  const maxRetries = options.maxRetries ?? 3;
  const baseDelayMs = options.baseDelayMs ?? 1000;
  const maxDelayMs = options.maxDelayMs ?? 16000;

  let attempt = 0;
  options.onStatusUpdate?.('pending', attempt, 'Initiating secure dispatch transmission...');

  while (attempt <= maxRetries) {
    try {
      options.onStatusUpdate?.('pending', attempt, `Transmitting to dispatch server (Attempt ${attempt + 1})...`);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch('/api/v1/reports/dispatch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const result: DispatchResult = await response.json();
        options.onStatusUpdate?.(
          result.deliveryStatus || 'acknowledged',
          attempt,
          result.message || 'Report officially acknowledged by authorities.'
        );
        return result;
      }

      // If client validation error (400), do not retry indefinitely
      if (response.status === 400 || response.status === 401) {
        const errJson = await response.json().catch(() => ({}));
        throw new Error(errJson.error || `Client error (${response.status})`);
      }

      throw new Error(`Server responded with HTTP ${response.status}`);
    } catch (err: unknown) {
      attempt++;
      const errorMsg = err instanceof Error ? err.message : String(err);

      if (attempt > maxRetries) {
        console.warn(`[RetryQueue] Max retries (${maxRetries}) reached for report ${payload.reportId}. Enqueueing for background sync.`);

        // Enqueue to background sync so when connectivity returns, it will be automatically transmitted
        await enqueueSyncItem({
          id: `sync-report-${payload.reportId}`,
          operation: 'CREATE',
          entityType: 'report',
          payload,
          createdAt: new Date().toISOString(),
          retryCount: attempt,
          status: 'pending',
          errorMessage: errorMsg,
        });

        options.onStatusUpdate?.(
          'pending',
          attempt,
          'Network offline or server unreachable. Saved to local offline queue for automatic sync.'
        );

        return {
          success: false,
          reportId: payload.reportId,
          trackingNumber: `OFFLINE-${payload.reportId.substring(0, 8).toUpperCase()}`,
          acknowledgmentId: 'PENDING_OFFLINE_SYNC',
          deliveryStatus: 'pending',
          routedAgencies: ['Local Offline Sync Queue'],
          slaResponseMinutes: 60,
          timestamp: new Date().toISOString(),
          auditHash: 'offline_queued',
          message: 'Saved locally in offline queue. Will auto-dispatch as soon as connection is restored.',
        };
      }

      const delay = calculateBackoff(attempt, baseDelayMs, maxDelayMs);
      console.log(`[RetryQueue] Dispatch attempt ${attempt} failed: ${errorMsg}. Retrying in ${delay}ms...`);
      options.onStatusUpdate?.('pending', attempt, `Connection failed. Retrying in ${Math.round(delay / 1000)}s...`);

      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw new Error('Unexpected retry loop termination');
}
