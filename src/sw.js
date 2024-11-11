var dynamicCacheName = 'pwa_demo_v1.0.20';
var excludedUrls = [
    /\/[Ss][Ww].[Jj][Ss]\?/,
    /\/[Aa][Pp][Ii]\//
];

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.map(key => {
                if (dynamicCacheName !== key) {
                    return caches.delete(key);
                }
            })
        ))
    );
});

self.addEventListener('install', (event) => {
    self.skipWaiting();
    console.log('Service Worker installed');
});


self.addEventListener('fetch', evt => {

    
    if (evt.request.url.indexOf('chrome-extension:') == -1) {
        let isExcluded = excludedUrls.filter(reg => reg.test(evt.request.url)).length > 0;
        console.log(isExcluded);  // Use console.log instead of alert

        if (isExcluded) return; // Instead of returning `false`, just return to skip caching

        evt.respondWith(
            caches.match(evt.request, { ignoreVary: true }).then(cacheRes => {
                return cacheRes || fetch(evt.request).then(fetchRes => {
                    return fetchRes.status === 200
                        ? caches.open(dynamicCacheName).then(cache => {
                            cache.put(evt.request.url, fetchRes.clone()).catch(error => {
                                console.error('Cache put failed:', error);
                            });
                            return fetchRes;
                        })
                        : fetchRes;
                });
            })
        );
    }
    else{
        fetch(evt.request).then(fetchRes => {
            return fetchRes;
        });
    }
});
