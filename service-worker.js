const CACHE_NAME = 'benzconfig-cache-v2';

// Автоматически определяем правильный путь для GitHub Pages
const BASE = self.location.pathname.replace(/service-worker\.js$/, "");

const FILES_TO_CACHE = [
    BASE,
    BASE + 'index.html',
    BASE + 'app.js',
    BASE + 'style.css',
    BASE + 'manifest.json',
    BASE + 'assets/icon-180.png'
];

// Установка SW и кэширование ресурсов
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
    );
});

// Очистка старых кешей
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
        )
    );
});

// Перехват запросов (offline-first)
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(cached =>
            cached ||
            fetch(event.request).catch(() =>
                // fallback на index при оффлайне
                event.request.mode === 'navigate' ? caches.match(BASE + 'index.html') : null
            )
        )
    );
});
