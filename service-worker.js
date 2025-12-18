const CACHE_NAME = 'benzconfig-cache-v2'; // Новая версия кеша
const FILES_TO_CACHE = [
    '/',
    '/index.html',
    '/app.js',
    '/style.css',
    '/manifest.json',
    '/icon-180.png'
];

// ===================== Установка SW =====================
self.addEventListener('install', event => {
    event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE)));
});

// ===================== Активация SW =====================
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))
        )
    );
});

// ===================== Перехват запросов =====================
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(cached => {
            const fetchPromise = fetch(event.request).then(networkResponse => {
                caches.open(CACHE_NAME).then(cache => cache.put(event.request, networkResponse.clone()));
                return networkResponse;
            });
            return cached || fetchPromise;
        })
    );
});
