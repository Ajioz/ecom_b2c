const CACHE_NAME = 'hubsandy-v1';

// Add whichever assets you want to pre-cache here:
const PRECACHE_ASSETS = ['/public/',  '/src/' ]
// const PRECACHE_ASSETS = [ 'index.html' ];

/*
    Install SW
    // Listener for the install event - pre-caches our assets list on service worker install.
*/
// self.addEventListener('install', (event) => {
//     event.waitUntil((async () => {
//         const cache = await caches.open(CACHE_NAME);
//         return cache.addAll(PRECACHE_ASSETS);
//     })());
// });

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');

                return cache.addAll(PRECACHE_ASSETS);
            })
    )
});

/*
    Activate the SW
*/
// self.addEventListener('activate', event => {
//   event.waitUntil(clients.claim());
// });


self.addEventListener('activate', (event) => {
    const cacheWhitelist = [];
    cacheWhitelist.push(CACHE_NAME);

    event.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames.map((cacheName) => {
                if(!cacheWhitelist.includes(cacheName)) {
                    return caches.delete(cacheName);
                }
            })
        ))
            
    )
});


/*
    Listen for requests - Fetch
*/
// self.addEventListener('fetch', event => {
//   event.respondWith(async () => {
//       const cache = await caches.open(CACHE_NAME);

//       // match the request to our cache
//       const cachedResponse = await cache.match(event.request);

//       // check if we got a valid response
//       if (cachedResponse !== undefined) {
//           // Cache hit, return the resource
//           return cachedResponse;
//       } else {
//         // Otherwise, go to the network
//           return fetch(event.request)
//       };
//   });
// });

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then(() => {
                return fetch(event.request) 
                    .catch(() => caches.match('offline.html'))
            })
    )
});

