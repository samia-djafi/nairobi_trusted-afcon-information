import {
  getPendingSyncItems,
  updateSyncItemStatus,
  removeSyncedItems,
  db,
  isIndexedDBSupported,
} from './db';
import { SyncQueueItem } from '@/types';

export interface SyncEngineState {
  isOnline: boolean;
  isSyncing: boolean;
  pendingCount: number;
  lastSyncTimestamp: string | null;
  lastError: string | null;
}

type SyncStateListener = (state: SyncEngineState) => void;

class SyncEngine {
  private isSyncing = false;
  private listeners: Set<SyncStateListener> = new Set();
  private lastSyncTimestamp: string | null = null;
  private lastError: string | null = null;
  private retryTimeouts: Map<string, NodeJS.Timeout> = new Map();

  constructor() {
    if (typeof window !== 'undefined') {
      this.initListeners();
    }
  }

  private initListeners() {
    window.addEventListener('online', () => {
      console.log('[SyncEngine] Network connectivity restored. Triggering sync flush.');
      this.notifyState();
      this.flushQueue();
    });

    window.addEventListener('offline', () => {
      console.log('[SyncEngine] Device went offline. Queueing operations locally.');
      this.notifyState();
    });

    // Listen for Service Worker background sync notification messages
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'SYNC_TRIGGERED') {
          console.log('[SyncEngine] Background sync triggered by Service Worker');
          this.flushQueue();
        }
      });
    }

    // Initial check
    setTimeout(() => {
      this.notifyState();
      if (navigator.onLine) {
        this.flushQueue();
      }
    }, 1500);
  }

  public subscribe(listener: SyncStateListener): () => void {
    this.listeners.add(listener);
    listener(this.getState());
    return () => this.listeners.delete(listener);
  }

  public getState(): SyncEngineState {
    const isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;
    return {
      isOnline,
      isSyncing: this.isSyncing,
      pendingCount: 0, // Will be updated asynchronously
      lastSyncTimestamp: this.lastSyncTimestamp,
      lastError: this.lastError,
    };
  }

  private notifyState() {
    const state = this.getState();
    getPendingSyncItems().then((items) => {
      state.pendingCount = items.length;
      this.listeners.forEach((listener) => listener(state));
    }).catch(() => {
      this.listeners.forEach((listener) => listener(state));
    });
  }

  /**
   * Request BackgroundSync registration via Service Worker if supported,
   * otherwise fallback to immediate online check.
   */
  public async requestBackgroundSync(): Promise<void> {
    if (typeof window === 'undefined') return;

    if ('serviceWorker' in navigator && 'SyncManager' in window) {
      try {
        const registration = await navigator.serviceWorker.ready;
        // @ts-expect-error SyncManager sync registration
        await registration.sync.register('afcon-sync-queue');
        console.log('[SyncEngine] Registered Service Worker BackgroundSync tag: afcon-sync-queue');
        return;
      } catch (e) {
        console.warn('[SyncEngine] BackgroundSync registration failed, using online fallback', e);
      }
    }

    // Fallback if BackgroundSync API is unsupported in browser
    if (navigator.onLine) {
      await this.flushQueue();
    }
  }

  /**
   * Exponential backoff calculation with jitter
   */
  public calculateBackoffDelay(retryCount: number, baseMs: number = 1000, maxMs: number = 30000): number {
    const exp = Math.min(retryCount, 6);
    const delay = Math.min(baseMs * Math.pow(2, exp), maxMs);
    const jitter = Math.random() * 0.3 * delay; // 0-30% randomized jitter
    return Math.floor(delay + jitter);
  }

  /**
   * Process and flush all pending synchronization queue items to cloud API
   */
  public async flushQueue(): Promise<void> {
    if (this.isSyncing) return;
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      console.log('[SyncEngine] Device is offline. Sync deferred.');
      return;
    }

    this.isSyncing = true;
    this.lastError = null;
    this.notifyState();

    try {
      const pending = await getPendingSyncItems();
      if (pending.length === 0) {
        this.isSyncing = false;
        this.notifyState();
        return;
      }

      console.log(`[SyncEngine] Processing ${pending.length} pending sync items.`);

      // Send batch to cloud sync API endpoint
      const response = await fetch('/api/v1/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Client-Timestamp': new Date().toISOString(),
        },
        body: JSON.stringify({
          batch: pending,
          clientTime: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error(`Sync server responded with status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success && Array.isArray(result.processedIds)) {
        // Mark processed items as synced
        for (const id of result.processedIds) {
          await updateSyncItemStatus(id, 'synced');
        }

        // Clean up completed synced items from queue
        await removeSyncedItems();

        // Update local item syncedAt timestamps
        if (isIndexedDBSupported() && Array.isArray(result.syncedEntities)) {
          for (const item of result.syncedEntities) {
            if (item.type === 'saved_item' && item.id) {
              await db.savedItems.update(item.id, { syncedAt: new Date().toISOString() });
            }
          }
        }

        this.lastSyncTimestamp = new Date().toISOString();
        console.log('[SyncEngine] Queue successfully synced with cloud.');
      } else if (result.failedIds && Array.isArray(result.failedIds)) {
        for (const failure of result.failedIds) {
          await updateSyncItemStatus(failure.id, 'failed', failure.reason);
        }
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      console.error('[SyncEngine] Sync flush encountered error:', message);
      this.lastError = message;

      // Reschedule retry for pending items with exponential backoff
      const items = await getPendingSyncItems();
      for (const item of items) {
        const nextAttempt = (item.retryCount || 0) + 1;
        const delay = this.calculateBackoffDelay(nextAttempt);
        console.log(`[SyncEngine] Will retry item ${item.id} in ${delay}ms (attempt #${nextAttempt})`);
        
        const existingTimeout = this.retryTimeouts.get(item.id);
        if (existingTimeout) clearTimeout(existingTimeout);

        const timeout = setTimeout(() => {
          this.retryTimeouts.delete(item.id);
          this.flushQueue();
        }, delay);

        this.retryTimeouts.set(item.id, timeout);
      }
    } finally {
      this.isSyncing = false;
      this.notifyState();
    }
  }
}

export const syncEngine = new SyncEngine();
