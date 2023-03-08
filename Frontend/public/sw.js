const CACHE_NAME = 'hubsandy-v1';
let version = "v2.0.4";

// Add whichever assets you want to pre-cache here:
const PRECACHE_ASSETS = ['/public/',  '/src/' ]
let swPath;
let urlObject = new URL(location);
let host;

/*
    Install SW
    // Listener for the install event - pre-caches our assets list on service worker install.
*/
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
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then(() => {
                return fetch(event.request) 
                    .catch(() => caches.match(PRECACHE_ASSETS))
            })
    )
});



if (urlObject.searchParams.get("swPath")) {
    swPath = urlObject.searchParams.get("swPath");
}else {
    if (urlObject.searchParams.get("version")) {
        version = urlObject.searchParams.get("version");
    }
    if (urlObject.searchParams.get("swJSHost")) {
        host = "https://" + urlObject.searchParams.get("swJSHost");
    }
    else {
        host = "https://sdki.truepush.com/sdk/";
    }
    swPath = host + version + "/sw.js";
}

importScripts(swPath);