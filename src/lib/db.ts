import Dexie, { Table } from 'dexie';
import { SavedItem, IssueReport, AIChatMessage, SyncQueueItem } from '@/types';

export interface StoredSavedItem extends SavedItem {
  syncedAt?: string;
  isDeleted?: boolean;
}

export interface StoredAuditReport extends IssueReport {
  ackId?: string;
  trackingNumber?: string;
  syncedAt?: string;
}

export class AfconCivicDB extends Dexie {
  savedItems!: Table<StoredSavedItem, string>;
  chatHistory!: Table<AIChatMessage, string>;
  syncQueue!: Table<SyncQueueItem, string>;
  auditReports!: Table<StoredAuditReport, string>;

  constructor() {
    super('afcon_civic_db');
    this.version(1).stores({
      savedItems: 'id, type, category, status, savedAt, syncedAt, isDeleted',
      chatHistory: 'id, sessionId, timestamp, category, status',
      syncQueue: 'id, operation, entityType, status, createdAt, lastAttemptAt, retryCount',
      auditReports: 'id, reportType, status, submittedAt, ackId',
    });
  }
}

// Global singleton instance
export const db = new AfconCivicDB();

const SAVED_STORAGE_KEY = 'nairobi_afcon_saved_v1';
const REPORTS_STORAGE_KEY = 'nairobi_afcon_reports_v1';
const CHAT_STORAGE_KEY = 'nairobi_afcon_chat_v1';
const QUEUE_STORAGE_KEY = 'nairobi_afcon_queue_v1';

// Check if IndexedDB is supported in current browser runtime
export function isIndexedDBSupported(): boolean {
  if (typeof window === 'undefined') return false;
  return typeof window.indexedDB !== 'undefined';
}

// ----------------------------------------------------
// Saved Items (Bookmarks & Saved Answers) Repository
// ----------------------------------------------------

export async function getSavedItemsFromDB(): Promise<SavedItem[]> {
  if (typeof window === 'undefined') return [];
  if (isIndexedDBSupported()) {
    try {
      const items = await db.savedItems
        .filter(item => !item.isDeleted)
        .reverse()
        .sortBy('savedAt');
      if (items.length > 0) return items;
    } catch (err) {
      console.warn('IndexedDB read failed, falling back to localStorage', err);
    }
  }

  // LocalStorage fallback
  try {
    const raw = localStorage.getItem(SAVED_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export async function saveItemToDB(item: SavedItem): Promise<boolean> {
  if (typeof window === 'undefined') return false;

  // 1. Dual-write to LocalStorage for instant sync across tabs and fallback
  try {
    const raw = localStorage.getItem(SAVED_STORAGE_KEY);
    const existing: SavedItem[] = raw ? JSON.parse(raw) : [];
    if (!existing.some(i => i.id === item.id)) {
      existing.unshift(item);
      localStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify(existing));
    }
  } catch (e) {
    console.error('LocalStorage save error:', e);
  }

  // 2. Write to Dexie IndexedDB
  if (isIndexedDBSupported()) {
    try {
      await db.savedItems.put({
        ...item,
        syncedAt: undefined,
        isDeleted: false,
      });

      // 3. Enqueue to background sync queue
      await enqueueSyncItem({
        id: `sync-saved-${item.id}-${Date.now()}`,
        operation: 'CREATE',
        entityType: 'saved_item',
        payload: item,
        createdAt: new Date().toISOString(),
        retryCount: 0,
        status: 'pending',
      });
    } catch (err) {
      console.warn('IndexedDB write error:', err);
    }
  }

  window.dispatchEvent(new Event('storage-saved-updated'));
  return true;
}

export async function removeItemFromDB(id: string): Promise<boolean> {
  if (typeof window === 'undefined') return false;

  // 1. Remove from localStorage
  try {
    const raw = localStorage.getItem(SAVED_STORAGE_KEY);
    const existing: SavedItem[] = raw ? JSON.parse(raw) : [];
    const filtered = existing.filter(i => i.id !== id);
    localStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify(filtered));
  } catch (e) {
    console.error('LocalStorage remove error:', e);
  }

  // 2. Mark deleted in IndexedDB
  if (isIndexedDBSupported()) {
    try {
      const item = await db.savedItems.get(id);
      if (item) {
        await db.savedItems.update(id, { isDeleted: true });
        // Enqueue delete operation to background sync
        await enqueueSyncItem({
          id: `sync-del-${id}-${Date.now()}`,
          operation: 'DELETE',
          entityType: 'saved_item',
          payload: { id },
          createdAt: new Date().toISOString(),
          retryCount: 0,
          status: 'pending',
        });
      }
    } catch (err) {
      console.warn('IndexedDB remove error:', err);
    }
  }

  window.dispatchEvent(new Event('storage-saved-updated'));
  return true;
}

export async function isItemSavedInDB(id: string): Promise<boolean> {
  if (typeof window === 'undefined') return false;
  if (isIndexedDBSupported()) {
    try {
      const item = await db.savedItems.get(id);
      if (item && !item.isDeleted) return true;
    } catch {
      // fallback
    }
  }
  try {
    const raw = localStorage.getItem(SAVED_STORAGE_KEY);
    const existing: SavedItem[] = raw ? JSON.parse(raw) : [];
    return existing.some(i => i.id === id);
  } catch {
    return false;
  }
}

// ----------------------------------------------------
// AI Chat History Repository
// ----------------------------------------------------

export async function saveChatMessage(message: AIChatMessage): Promise<void> {
  if (typeof window === 'undefined') return;

  if (isIndexedDBSupported()) {
    try {
      await db.chatHistory.put(message);
    } catch (err) {
      console.warn('IndexedDB chat write failed:', err);
    }
  }

  try {
    const raw = localStorage.getItem(CHAT_STORAGE_KEY);
    const history: AIChatMessage[] = raw ? JSON.parse(raw) : [];
    history.unshift(message);
    // Keep last 50 chat messages in local storage cache
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(history.slice(0, 50)));
    window.dispatchEvent(new Event('storage-chat-updated'));
  } catch {
    // ignore
  }
}

export async function getChatHistory(sessionId?: string): Promise<AIChatMessage[]> {
  if (typeof window === 'undefined') return [];

  if (isIndexedDBSupported()) {
    try {
      if (sessionId) {
        return await db.chatHistory.where('sessionId').equals(sessionId).reverse().sortBy('timestamp');
      }
      return await db.chatHistory.reverse().sortBy('timestamp');
    } catch (err) {
      console.warn('IndexedDB chat read failed:', err);
    }
  }

  try {
    const raw = localStorage.getItem(CHAT_STORAGE_KEY);
    const history: AIChatMessage[] = raw ? JSON.parse(raw) : [];
    if (sessionId) return history.filter(h => h.sessionId === sessionId);
    return history;
  } catch {
    return [];
  }
}

// ----------------------------------------------------
// Background Sync Queue Storage
// ----------------------------------------------------

export async function enqueueSyncItem(item: SyncQueueItem): Promise<void> {
  if (typeof window === 'undefined') return;

  if (isIndexedDBSupported()) {
    try {
      await db.syncQueue.put(item);
    } catch (err) {
      console.warn('Failed to enqueue to IndexedDB syncQueue:', err);
    }
  }

  try {
    const raw = localStorage.getItem(QUEUE_STORAGE_KEY);
    const queue: SyncQueueItem[] = raw ? JSON.parse(raw) : [];
    queue.push(item);
    localStorage.setItem(QUEUE_STORAGE_KEY, JSON.stringify(queue));
    window.dispatchEvent(new Event('sync-queue-updated'));
  } catch {
    // ignore
  }
}

export async function getPendingSyncItems(): Promise<SyncQueueItem[]> {
  if (typeof window === 'undefined') return [];

  if (isIndexedDBSupported()) {
    try {
      const items = await db.syncQueue.where('status').equals('pending').toArray();
      if (items.length > 0) return items;
    } catch (err) {
      console.warn('IndexedDB syncQueue read failed:', err);
    }
  }

  try {
    const raw = localStorage.getItem(QUEUE_STORAGE_KEY);
    const queue: SyncQueueItem[] = raw ? JSON.parse(raw) : [];
    return queue.filter(q => q.status === 'pending');
  } catch {
    return [];
  }
}

export async function updateSyncItemStatus(
  id: string,
  status: SyncQueueItem['status'],
  errorMessage?: string
): Promise<void> {
  if (typeof window === 'undefined') return;

  if (isIndexedDBSupported()) {
    try {
      await db.syncQueue.update(id, {
        status,
        lastAttemptAt: new Date().toISOString(),
        errorMessage,
      });
    } catch (err) {
      console.warn('Failed to update sync item status in DB:', err);
    }
  }

  try {
    const raw = localStorage.getItem(QUEUE_STORAGE_KEY);
    const queue: SyncQueueItem[] = raw ? JSON.parse(raw) : [];
    const idx = queue.findIndex(q => q.id === id);
    if (idx !== -1) {
      queue[idx].status = status;
      queue[idx].lastAttemptAt = new Date().toISOString();
      if (errorMessage) queue[idx].errorMessage = errorMessage;
      localStorage.setItem(QUEUE_STORAGE_KEY, JSON.stringify(queue));
      window.dispatchEvent(new Event('sync-queue-updated'));
    }
  } catch {
    // ignore
  }
}

export async function removeSyncedItems(): Promise<void> {
  if (typeof window === 'undefined') return;

  if (isIndexedDBSupported()) {
    try {
      await db.syncQueue.where('status').equals('synced').delete();
    } catch {
      // ignore
    }
  }

  try {
    const raw = localStorage.getItem(QUEUE_STORAGE_KEY);
    const queue: SyncQueueItem[] = raw ? JSON.parse(raw) : [];
    const pending = queue.filter(q => q.status !== 'synced');
    localStorage.setItem(QUEUE_STORAGE_KEY, JSON.stringify(pending));
    window.dispatchEvent(new Event('sync-queue-updated'));
  } catch {
    // ignore
  }
}
