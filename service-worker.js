const CACHE_NAME = 'benzconfig-cache-v2';

// Определение корректного пути для GitHub Pages
const BASE = self.location.pathname.replace(/service-worker\.js$/, "");

const FILES_TO_CACHE = [
    BASE,
    BASE + 'index.html',
    BASE + 'app.js',
    BASE + 'style.css',
    BASE + 'manifest.json',
    BASE + 'assets/icon-180.png',
    BASE + 'assets/icon-256.ico'
];

// Установка
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
    );
});

// Активация + очистка старых кешей
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
            )
        )
    );
});

// Fetch handler "offline first"
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(cached => {
            return cached || fetch(event.request).catch(() => {
                if (event.request.mode === 'navigate') {
                    return caches.match(BASE + 'index.html');
                }
                return null;
            });
        })
    );
});
