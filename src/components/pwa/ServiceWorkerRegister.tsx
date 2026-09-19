'use client';

import { useEffect } from 'react';
import { syncEngine } from '@/lib/sync-engine';

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((registration) => {
            console.log('[PWA] Service Worker registered with scope:', registration.scope);

            // Periodically check for updates
            registration.onupdatefound = () => {
              const installingWorker = registration.installing;
              if (installingWorker) {
                installingWorker.onstatechange = () => {
                  if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
                    console.log('[PWA] New content is available; please refresh.');
                  }
                };
              }
            };
          })
          .catch((error) => {
            console.warn('[PWA] Service Worker registration failed:', error);
          });
      });
    }

    // Register BackgroundSync when queue items are present
    const unbind = syncEngine.subscribe((state) => {
      if (state.pendingCount > 0 && state.isOnline) {
        syncEngine.requestBackgroundSync();
      }
    });

    return () => unbind();
  }, []);

  return null;
}
