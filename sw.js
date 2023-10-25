const CACHE_NAME = 'my-cache';

const urlsToCache = [
  '/',
  '/apple-icon-57x57.png',
  '/icon/apple-icon-60x60.png',
  '/icon/apple-icon-72x72.png',
  '/icon/apple-icon-76x76.png',
  '/icon/apple-icon-114x114.png',
  '/icon/apple-icon-120x120.png',
  '/icon/apple-icon-144x144.png',
  '/icon/apple-icon-152x152.png',
  '/icon/apple-icon-180x180.png',
  '/icon/android-icon-192x192.png',
  '/icon/favicon-32x32.png',
  '/icon/favicon-96x96.png',
  '/icon/favicon-16x16.png',
  '/bootstrap.css',
  '/style.css',
  '/app.js',
  'img/eric.png',
  'img/fondo.png',
  'img/ike.png',
  'img/jimbo.png',
  'img/jimmy.png',
  'img/kenny.png',
  'img/kyle.png',
  'img/randy.png',
  'img/stan.png',
  'img/toallin.png',
  'img/token.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache abierto');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const responseToCache = response.clone();
        caches.open(CACHE_NAME)
          .then((cache) => {
            cache.put(event.request, responseToCache);
          });
        return response;
      })
      .catch(() => {
        return caches.match(event.request);
      })
  );
});
