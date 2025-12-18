const CACHE_NAME = 'benzconfig-cache-v1'; 
// Название кэша, который будет использоваться для хранения файлов приложения. 
// Версия можно менять для обновления кэша при изменениях.

const FILES_TO_CACHE = [
    '/',
    '/index.html',
    '/app.js',
    '/manifest.json',
    '/icon-180.png'
];
// Список файлов, которые будут закэшированы при установке Service Worker. 
// '/' означает корень сайта, остальные — важные ресурсы приложения.


// Установка
self.addEventListener('install', event => { 
    // Событие "install" срабатывает при первой установке SW
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => { 
            // Открываем указанный кэш
            return cache.addAll(FILES_TO_CACHE); 
            // Добавляем все файлы из списка в кэш
        })
    );
});


// Активация
self.addEventListener('activate', event => { 
    // Событие "activate" срабатывает после установки и активации SW
    event.waitUntil(
        caches.keys().then(keys => { 
            // Получаем все существующие кэши
            return Promise.all(
                keys.filter(key => key !== CACHE_NAME) 
                    // Фильтруем кэши, которые не совпадают с текущей версией
                    .map(key => caches.delete(key)) 
                    // Удаляем старые версии кэша
            );
        })
    );
});


// Перехват запросов
self.addEventListener('fetch', event => { 
    // Событие "fetch" срабатывает при каждом сетевом запросе
    event.respondWith(
        caches.match(event.request).then(response => { 
            // Ищем запрошенный ресурс в кэше
            return response || fetch(event.request); 
            // Если найден в кэше — возвращаем его, иначе идем в сеть
        })
    );
});
