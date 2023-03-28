console.log('test123')

if ('serviceWorker' in navigator) {
  //hij installeert bij elke window
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/service-worker.js');
  });
 
}
