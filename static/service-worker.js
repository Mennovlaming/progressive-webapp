// Install service worker
self.addEventListener('install', function(event) {
  event.waitUntil(
    //open 'my-cache' en voeg root en offline.html toe
    caches.open('my-cache').then(function(cache) {
      return cache.addAll([
        '/',
        '/offline.html'
      ]);
    })
  );
});


//onderschep de fetch en catch de response
self.addEventListener('fetch', function(event) {
  event.respondWith(
    //intercept network request, provide response
    //kijkt of de requested resourse al gecached is
    caches.match(event.request).then(function(response) {
      if (response) {
        return response;
      }
      //if the resource is not cached, the code fetches the resource 
      //from the network
      return fetch(event.request).then(function(response) {
        //If the network request fails or returns a non-200 status code, 
        //the code returns the response as-is (i.e. not cached).
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        //Als het netwerk 200 status code geeft (hierboven)
        var responseToCache = response.clone();
        caches.open('my-cache').then(function(cache) {
          cache.put(event.request, responseToCache);
        });
        return response;
      }).catch(function() {
        //if the network request fails, catch en show offline.html
        return caches.match('/offline.html');
      });
    })
  );
});
