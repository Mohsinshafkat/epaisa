const CACHE_NAME = 'easypaisa-cache-v3';
const urlsToCache = [
  'index.html',
  'amount.html',
  'confirm.html',
  'sending.html',
  'receipt.html',
  'receipt2.html',
  'loader.js',
  'manifest.json',
  'logo.png',
  'eplogo.png',
  'logo2.png',
  'anim1.mp3',
  'anim1.gif',
  'anim2.gif'
];

// 1. Install Event (Main files ko pehle hi cache mein daal do)
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

// 2. Activate Event (Purana cache saaf karne ke liye)
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clientsClaim())
  );
});

// 3. Fetch Event (Smart Caching: Jo file load ho, usay automatically cache mein save karte jao)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        // Agar cache mein mojood hai toh wahan se do, warna internet/server se fetch karo
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request).then(response => {
          // Response theek ho toh usay cache mein save kar lo (jaise bank logos waghera)
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          let responseToCache = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
          return response;
        });
      })
  );
});
