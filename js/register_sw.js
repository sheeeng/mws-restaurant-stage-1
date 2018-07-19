/* Register service worker. */
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
  .register('/sw.js', {scope: "/"})
    .then(reg => {
      console.log('Service Worker registered. Scope: ' + reg.scope);
    })
    .catch(error => {
      console.log('Service Worker registration failed. Error:' + error);
    });
}
