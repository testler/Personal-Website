// Kill-switch: replaces the old CRA service worker.
// When browsers fetch this URL to check for updates, they install this SW,
// which immediately unregisters itself and clears caches.
self.addEventListener('install', function () {
  self.skipWaiting();
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    (async function () {
      try {
        const keys = await caches.keys();
        await Promise.all(keys.map(function (key) { return caches.delete(key); }));
      } catch (e) {}
      try {
        await self.registration.unregister();
      } catch (e) {}
      const clientList = await self.clients.matchAll({ type: 'window' });
      clientList.forEach(function (client) { client.navigate(client.url); });
    })()
  );
});
