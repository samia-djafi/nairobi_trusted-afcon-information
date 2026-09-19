import { SavedItem, IssueReport } from '@/types';
import {
  saveItemToDB,
  removeItemFromDB,
  getSavedItemsFromDB,
  isItemSavedInDB,
} from './db';

const SAVED_STORAGE_KEY = 'nairobi_afcon_saved_v1';
const REPORTS_STORAGE_KEY = 'nairobi_afcon_reports_v1';
const LANGUAGE_STORAGE_KEY = 'nairobi_afcon_lang_v1';

/**
 * Returns saved items synchronously from localStorage cache,
 * while scheduling an asynchronous reconcile from IndexedDB (Dexie)
 */
export function getSavedItems(): SavedItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(SAVED_STORAGE_KEY);
    const cached: SavedItem[] = raw ? JSON.parse(raw) : [];

    // Asynchronously reconcile with IndexedDB
    getSavedItemsFromDB().then((dbItems) => {
      if (dbItems.length > 0 && JSON.stringify(dbItems) !== raw) {
        localStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify(dbItems));
        window.dispatchEvent(new Event('storage-saved-updated'));
      }
    }).catch(() => {});

    return cached;
  } catch (e) {
    console.error('Error loading saved items', e);
    return [];
  }
}

/**
 * Persists an item to both Dexie IndexedDB and localStorage
 */
export function saveItem(item: SavedItem): boolean {
  if (typeof window === 'undefined') return false;
  try {
    // Save to Dexie IndexedDB with sync queue
    saveItemToDB(item);

    const existing = getSavedItems();
    if (!existing.some(i => i.id === item.id)) {
      existing.unshift(item);
      localStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify(existing));
      window.dispatchEvent(new Event('storage-saved-updated'));
      return true;
    }
    return false;
  } catch (e) {
    console.error('Error saving item', e);
    return false;
  }
}

/**
 * Removes an item from both Dexie IndexedDB and localStorage
 */
export function removeItem(id: string): boolean {
  if (typeof window === 'undefined') return false;
  try {
    // Remove from Dexie IndexedDB with sync queue delete entry
    removeItemFromDB(id);

    const existing = getSavedItems();
    const filtered = existing.filter(i => i.id !== id);
    localStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify(filtered));
    window.dispatchEvent(new Event('storage-saved-updated'));
    return true;
  } catch (e) {
    console.error('Error removing item', e);
    return false;
  }
}

export function isItemSaved(id: string): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const existing = getSavedItems();
    return existing.some(i => i.id === id);
  } catch {
    return false;
  }
}

export function saveReport(report: IssueReport): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const raw = localStorage.getItem(REPORTS_STORAGE_KEY);
    const existing: IssueReport[] = raw ? JSON.parse(raw) : [];
    existing.unshift(report);
    localStorage.setItem(REPORTS_STORAGE_KEY, JSON.stringify(existing));
    return true;
  } catch (e) {
    console.error('Error saving report', e);
    return false;
  }
}

export function getSavedReports(): IssueReport[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(REPORTS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function getStoredLanguage(): 'en' | 'sw' | 'fr' {
  if (typeof window === 'undefined') return 'en';
  try {
    const lang = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (lang === 'sw' || lang === 'fr' || lang === 'en') return lang;
    return 'en';
  } catch {
    return 'en';
  }
}

export function setStoredLanguage(lang: 'en' | 'sw' | 'fr'): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    window.dispatchEvent(new Event('language-changed'));
  } catch (e) {
    console.error('Error setting language', e);
  }
}

export { getSavedItemsFromDB, saveItemToDB, removeItemFromDB, isItemSavedInDB };
