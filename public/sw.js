const CACHE_NAME = 'my-app-cache-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/main.js',
  '/styles.css',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
];

this.addEventListener('install', (event) => {
  event.waitUntil(this.caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE)));
  this.skipWaiting();
});

this.addEventListener('fetch', (event) => {
  event.respondWith(
    this.caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    }),
  );
});

this.addEventListener('activate', (event) => {
  event.waitUntil(
    this.caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((cacheName) => cacheName !== CACHE_NAME).map((cacheName) => this.caches.delete(cacheName)),
      );
    }),
  );
  this.self.clients.claim();
});
