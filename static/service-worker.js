// Install service worker
self.addEventListener('install', function(event) {
  event.waitUntil(
    //open 'my-cache' en voeg de root en offline.html toe
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
    //kijkt of de requested resourse al gecached is
    caches.match(event.request).then(function(response) {
      if (response) {
        return response;
      }
      //Als de resource niet in de cache zit, fetch hem van het netwerk
      return fetch(event.request).then(function(response) {

        //Als de netwerk request faalt of niet 200 terug geeft (200 is goed),
        //return de response hoe hij is, vanuit de cache
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
  
        //responseToCache is een clone van de response, omdat die maar 1 keer gebruikt kan worden.
        var responseToCache = response.clone();
        caches.open('my-cache').then(function(cache) {
          cache.put(event.request, responseToCache);
        });
        return response;
      }).catch(function() {
        //Als het netwerk faalt en het zit niet in de cache, toon de offline page.
        return caches.match('/offline.html');
      });
    })
  );
});
