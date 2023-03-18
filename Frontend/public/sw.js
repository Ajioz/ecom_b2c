let version = "v2.0.4";
const CACHE_NAME = 'hubsandy-collection';

// Add whichever assets you want to pre-cache here:
const PRECACHE_ASSETS = [
    '/static/js/main.chunk.js',
    '/static/js/bundle.js',
    '/static/js/0.chunk.js',
    '/static/js/1.chunk.js',
    '/static/js/2.chunk.js',
    '/static/js/4.chunk.js',
    '/static/js/5.chunk.js',
    '/static/js/6.chunk.js',
    '/index.html',
    '/',
    "/products/:id",
    "/profile",
    "/login",
    "/register",
    "/cart/:id?",
    "/shipping",
    "/payment",
    "/order/:id",
    "/*"
]
let urlObject = new URL(location);


/*
    Install SW
    // Listener for the install event - pre-caches our assets list on service worker install.
*/
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then((cache) => {
            return cache.addAll(PRECACHE_ASSETS);
        })
    )
});


/*
    Activate the SW
*/
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [];
    cacheWhitelist.push(CACHE_NAME);
    event.waitUntil(
        caches.keys()
        .then((cacheNames) => Promise.all(
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
this.addEventListener("fetch",  (event) => {
    if(!navigator.onLine){
        
        console.warn("url", event.request.url);
        if (event.request.url === "http://localhost:3000/static/js/main.chunk.js") {
            event.waitUntil(
                this.registration.showNotification("Internet", {
                    body: "internet not working",
                })
            )
        }

        event.respondWith(
        caches.match(event.request).then((resp) => {
            if (resp) return resp

            // IMPORTANT: Clone the request. A request is a stream and
            // can only be consumed once. Since we are consuming this
            // once by cache and once by the browser for fetch, we need
            // to clone the response.
            let requestUrl = event.request.clone();
            return fetch(requestUrl).then(
                function(response) {
                    // Check if we received a valid response
                    if(!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }

                    // IMPORTANT: Clone the response. A response is a stream
                    // and because we want the browser to consume the response
                    // as well as the cache consuming the response, we need
                    // to clone it so we have two streams.
                    let responseToCache = response.clone();

                    caches.open(CACHE_NAME)
                    .then(function(cache) {
                        cache.put(event.request, responseToCache);
                    });
                    return response;
                }
            );
        }))
    } 
}) 