// Nairobi AFCON 2027 Civic Trust Platform - Progressive Service Worker
const CACHE_NAME = 'nairobi-afcon-cache-v1';
const STATIC_ASSETS = [
  '/',
  '/ask',
  '/report',
  '/saved',
  '/browse',
  '/emergency',
  '/how-it-works',
  '/afcon-logo.jpg',
  '/globals.css',
];

// Install: Cache critical application shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Pre-caching offline application shell');
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn('[ServiceWorker] Some assets failed to pre-cache:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// Activate: Purge obsolete cache stores and claim clients
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[ServiceWorker] Removing obsolete cache:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Strategy:
// 1. Static Assets: Cache-First with network fallback
// 2. Read APIs (/api/search, /api/explain): Network-First with Cache fallback
// 3. Mutation APIs (/api/v1/reports/dispatch, /api/v1/sync, /api/v1/ai/query): Network Only (Client sync engine handles queue)
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests and SSE streaming routes
  if (request.method !== 'GET' || url.pathname.includes('/api/v1/ai/query')) {
    return;
  }

  // API endpoints: Network-first, fallback to cache
  if (url.pathname.startsWith('/api/search') || url.pathname.startsWith('/api/explain')) {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, responseToCache));
          }
          return networkResponse;
        })
        .catch(() => {
          return caches.match(request).then((cachedResponse) => {
            if (cachedResponse) return cachedResponse;
            return new Response(JSON.stringify({ offline: true, error: 'Network unavailable. Showing offline cached state.' }), {
              headers: { 'Content-Type': 'application/json' },
            });
          });
        })
    );
    return;
  }

  // App Shell & Static Assets: Cache-first, network fallback
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        // Fetch in background to revalidate cache (stale-while-revalidate for page navigations)
        fetch(request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then((cache) => cache.put(request, networkResponse));
          }
        }).catch(() => {});
        return cachedResponse;
      }

      return fetch(request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(request, responseToCache);
        });
        return networkResponse;
      }).catch(() => {
        // Fallback for document navigation
        if (request.destination === 'document') {
          return caches.match('/');
        }
      });
    })
  );
});

// Background Sync API: Handles queue sync when network is restored
self.addEventListener('sync', (event) => {
  console.log('[ServiceWorker] Background Sync event fired:', event.tag);
  if (event.tag === 'afcon-sync-queue') {
    event.waitUntil(
      self.clients.matchAll({ includeUncontrolled: true, type: 'window' }).then((clients) => {
        clients.forEach((client) => {
          client.postMessage({
            type: 'SYNC_TRIGGERED',
            tag: event.tag,
            timestamp: new Date().toISOString(),
          });
        });
      })
    );
  }
});

// Direct message listener from client
self.addEventListener('message', (event) => {
  if (event.data && event.data.action === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
