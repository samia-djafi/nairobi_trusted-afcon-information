import { NextRequest, NextResponse } from 'next/server';
import { SyncQueueItem } from '@/types';

// In-memory persistent server store for synchronization demonstration
// In production, this writes to PostgreSQL / Supabase
interface ServerSyncRecord {
  id: string;
  type: string;
  data: any;
  updatedAt: string;
  version: number;
}

const serverStorage: Map<string, ServerSyncRecord> = new Map();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { batch, clientTime } = body;

    if (!Array.isArray(batch)) {
      return NextResponse.json(
        { success: false, error: 'Invalid payload: "batch" must be an array' },
        { status: 400 }
      );
    }

    const processedIds: string[] = [];
    const failedIds: Array<{ id: string; reason: string }> = [];
    const syncedEntities: Array<{ id: string; type: string; syncedAt: string }> = [];

    const now = new Date().toISOString();

    for (const item of batch as SyncQueueItem[]) {
      try {
        const entityId = item.payload?.id || item.id;
        const incomingTimestamp = item.createdAt || clientTime || now;

        if (item.operation === 'CREATE' || item.operation === 'UPDATE') {
          const existing = serverStorage.get(entityId);

          // Conflict resolution: Last-Write-Wins (LWW)
          if (!existing || new Date(incomingTimestamp) >= new Date(existing.updatedAt)) {
            serverStorage.set(entityId, {
              id: entityId,
              type: item.entityType,
              data: item.payload,
              updatedAt: incomingTimestamp,
              version: (existing?.version || 0) + 1,
            });
          }

          processedIds.push(item.id);
          syncedEntities.push({
            id: entityId,
            type: item.entityType,
            syncedAt: now,
          });
        } else if (item.operation === 'DELETE') {
          serverStorage.delete(entityId);
          processedIds.push(item.id);
          syncedEntities.push({
            id: entityId,
            type: item.entityType,
            syncedAt: now,
          });
        } else {
          failedIds.push({
            id: item.id,
            reason: `Unsupported operation: ${item.operation}`,
          });
        }
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Unknown item processing error';
        failedIds.push({ id: item.id, reason: msg });
      }
    }

    return NextResponse.json({
      success: true,
      processedCount: processedIds.length,
      processedIds,
      failedIds,
      syncedEntities,
      syncToken: `sync-token-${Date.now()}`,
      serverTime: now,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal sync error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function GET() {
  // Returns server sync health status
  return NextResponse.json({
    status: 'healthy',
    activeEntitiesCount: serverStorage.size,
    timestamp: new Date().toISOString(),
  });
}
