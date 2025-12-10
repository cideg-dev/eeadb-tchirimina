// public/sw.js
// Service Worker pour les Progressive Web App

const CACHE_NAME = 'eeadb-v1';
const urlsToCache = [
  '/',
  '/presentation',
  '/activites',
  '/galerie',
  '/ressources',
  '/contact',
  '/assets/logo-ad.png',
  '/styles/globals.css'
];

// Installation du service worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache ouvert');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activation du service worker
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Interception des requêtes réseau
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Retourne la réponse du cache si trouvée
        if (response) {
          return response;
        }

        // Sinon, effectue la requête réseau
        return fetch(event.request).then(
          response => {
            // Vérifie si la réponse est valide
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Copie la réponse pour la mettre en cache
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
  );
});