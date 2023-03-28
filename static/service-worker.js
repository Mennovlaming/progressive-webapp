// const CORE_ASSETS = [
//     '/offline',
//     '/index.css',
//     '/index.js'
// ]
// const CACHE_NAME = 'cache-v1'

//   self.addEventListener('fetch', function(event) {
//     // intersept fetch
//     event.respondWith(
//         // open cache 'my-cache'
//       caches.open(CACHE_NAME).then(function(cache) {
//         // The cache is checked for a match with the requested resource, 
//         // and if it exists, it is returned from the cache. 
//         // If it doesn't exist, the resource is fetched from the network and 
//         // stored in the cache for future requests.
//         return cache.match(event.request).then(function(response) {
//           return response || fetch(event.request).then(function(response) {
//             cache.put(event.request, response.clone());
//             return response;
//           });
//         });
//       })
//     );
//   });
  //Werkt, oude versies blijven staan

//voeg skipwaiting toe

  

//if event.request.headers.get('accept').includes('text/html') {
// fetch (event.request.url)

//

self.addEventListener('install', function(event) {
    //als install is getriggerd
    event.waitUntil(
      caches.open('my-cache2').then(function(cache) {
        //open cache storage
        //voeg offline.html toe aan de cache
        return cache.add('/offline.html');
      })
    );
  });



self.addEventListener('fetch', function(event) {
    // intersept fetch
    event.respondWith(
      caches.match(event.request).then(function(response) {
        if (response) {
          return response;
          //als je response krijgt, return die, zo niet:
        } else {
            // pak je de offline.html, die in de catch zit
          return fetch(event.request).catch(function() {
            return caches.match('/offline.html');
          });
        }
      })
    );
  });

  self.addEventListener('install', (event) => {
    self.skipWaiting();
  })


 