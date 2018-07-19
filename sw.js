var staticCacheName = "mws-restaurant-cache-";

// Append random number for Cache ID.
staticCacheName += Math.floor(Math.random() * 1000);

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      return cache
        .addAll([
          "//raw.githubusercontent.com/necolas/normalize.css/master/normalize.css",
          "/css/main.css",
          "/css/responsive.css",
          "/img/*",
          "/js/dbhelper.js",
          "/js/main.js",
          "/js/register.js",
          "/js/restaurant_info.js",
          "https://fonts.googleapis.com/css?family=Roboto:300,400,500",
          "index.html",
          "restaurant.html"
        ])
        .catch(error => {});
    })
  );
});

self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames
          .filter(function(cacheName) {
            return (
              cacheName.startsWith("mws-restaurant-cache-") &&
              cacheName != staticCacheName
            );
          })
          .map(function(cacheName) {
            return caches.delete(cacheName);
          })
      );
    })
  );
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response !== undefined) {
        return response;
      } else {
        return fetch(event.request).then(function(response) {
          let responseClone = response.clone();

          caches.open(staticCacheName).then(function(cache) {
            cache.put(event.request, responseClone);
          });
          return response;
        });
      }
    }) // end of promise for cache match
  ); // end of respond with
});
