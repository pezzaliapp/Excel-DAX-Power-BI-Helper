// service-worker.js

const CACHE_NAME = 'excel-dax-helper-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/app.js',
    '/manifest.json',
    '/icon-excel-192.png',
    '/icon-excel-512.png'
];

// Installazione del service worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('Aperto il cache');
            return cache.addAll(urlsToCache);
        })
    );
});

// Gestione delle richieste
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            // Restituisce la risposta dal cache o esegue la fetch
            return response || fetch(event.request);
        })
    );
});

// Aggiornamento del service worker
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
