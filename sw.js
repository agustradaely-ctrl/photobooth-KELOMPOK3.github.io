// Service Worker untuk offline capability
const CACHE_NAME = 'photo-booth-v1.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.js'
];

// Install Event
self.addEventListener('install', event => {
  console.log('✅ Service Worker Installed');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Fetch Event
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

// Activate Event
self.addEventListener('activate', event => {
  console.log('✅ Service Worker Activated');
});



