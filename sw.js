// asignar nombre y version cache
const CACHE_NAME = 'V1_CACHE.AWP';

var urlToCache = [
    './',
    './css/style.css',
    './assets/Apple_logo_black.svg.png',
    './assets/7e945160-f699-11ea-beef-f468e8c9049c.cf.jpg',
    './assets/Apple_MacBook-Pro_14-16-inch_10182021_big.jpg.slideshow-xlarge_2x.jpg',
    './assets/eventoapple.jpeg',
    './assets/iphone-14-pro-finish-select-202209-6-1inch-deeppurple.jpeg',
    './https://www.youtube.com/embed/lQteFoUPObw',
    
]

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
            return cache.addAll(urlToCache)
                .then( () => {
                    self.skipWaiting();
            })
        })
        .catch(err => {
            console.log('NO SE HA REGISTRADO EL CACHE', err);
        })
    )
});

// Evento activate
self.addEventListener('activate', e => {
    const cacheWhiteList = [CACHE_NAME];
    e.waitUntil(
        caches.keys()
              .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheNames => {
                        if(cacheWhiteList.indexOf(cacheName) === -1) {
                            // Borrar los elementos que no se necesitan
                            return caches.delete(cacheName);
                    }
                })
            );
        })
        .then( () => {
            // Activar la cache
            self.clients.claim();
        })
    );
})

// Evento fetch
self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request)
              .then(res => {
                if(res) {
                // Devuelvo los datos desde cache
                return res;
            }
            return fetch(e.request);
        })
    );
})