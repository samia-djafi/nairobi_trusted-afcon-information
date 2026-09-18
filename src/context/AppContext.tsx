'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, AFCONInfoItem, NotificationAlert } from '@/types';
import { getStoredLanguage, setStoredLanguage, getSavedItems } from '@/lib/storage';
import { RECENT_NOTIFICATIONS } from '@/lib/knowledge-base';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  selectedSourceItem: AFCONInfoItem | null;
  openSourceExplorer: (item: AFCONInfoItem) => void;
  closeSourceExplorer: () => void;
  savedCount: number;
  refreshSavedCount: () => void;
  notifications: NotificationAlert[];
  unreadNotificationCount: number;
  markNotificationsAsRead: () => void;
  isNotificationDrawerOpen: boolean;
  setIsNotificationDrawerOpen: (open: boolean) => void;
  isLowBandwidthMode: boolean;
  setIsLowBandwidthMode: (low: boolean) => void;
  isSafetyBannerDismissed: boolean;
  dismissSafetyBanner: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [language, setLangState] = useState<Language>('en');
  const [selectedSourceItem, setSelectedSourceItem] = useState<AFCONInfoItem | null>(null);
  const [savedCount, setSavedCount] = useState<number>(0);
  const [notifications, setNotifications] = useState<NotificationAlert[]>(RECENT_NOTIFICATIONS);
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);
  const [isLowBandwidthMode, setIsLowBandwidthMode] = useState(false);
  const [isSafetyBannerDismissed, setIsSafetyBannerDismissed] = useState(false);

  useEffect(() => {
    setLangState(getStoredLanguage());
    setSavedCount(getSavedItems().length);

    const handleSavedUpdate = () => {
      setSavedCount(getSavedItems().length);
    };

    const handleLangChange = () => {
      setLangState(getStoredLanguage());
    };

    window.addEventListener('storage-saved-updated', handleSavedUpdate);
    window.addEventListener('language-changed', handleLangChange);

    // Check for prefers-reduced-data or slow connection
    if (typeof navigator !== 'undefined' && 'connection' in navigator) {
      const conn = (navigator as unknown as { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
      if (conn?.saveData || conn?.effectiveType === '2g' || conn?.effectiveType === 'slow-2g') {
        setIsLowBandwidthMode(true);
      }
    }

    return () => {
      window.removeEventListener('storage-saved-updated', handleSavedUpdate);
      window.removeEventListener('language-changed', handleLangChange);
    };
  }, []);

  const setLanguage = (lang: Language) => {
    setLangState(lang);
    setStoredLanguage(lang);
  };

  const openSourceExplorer = (item: AFCONInfoItem) => {
    setSelectedSourceItem(item);
  };

  const closeSourceExplorer = () => {
    setSelectedSourceItem(null);
  };

  const refreshSavedCount = () => {
    setSavedCount(getSavedItems().length);
  };

  const unreadNotificationCount = notifications.filter(n => !n.read).length;

  const markNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const dismissSafetyBanner = () => {
    setIsSafetyBannerDismissed(true);
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        selectedSourceItem,
        openSourceExplorer,
        closeSourceExplorer,
        savedCount,
        refreshSavedCount,
        notifications,
        unreadNotificationCount,
        markNotificationsAsRead,
        isNotificationDrawerOpen,
        setIsNotificationDrawerOpen,
        isLowBandwidthMode,
        setIsLowBandwidthMode,
        isSafetyBannerDismissed,
        dismissSafetyBanner,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
