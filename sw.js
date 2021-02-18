const cacheName = `dev.finance:${Math.round(Math.random() * 100)}`

const resourcesToCache = [
  '/assets/expense.svg',
  '/assets/favicon.ico',
  '/assets/income.svg',
  '/assets/logo-dark.svg',
  '/assets/logo-light.svg',
  '/assets/logo.svg',
  '/assets/minus.svg',
  '/assets/plus.svg',
  '/assets/total.svg',
  '/assets/icons/icon-144x144.png',
  '/assets/icons/icon-168x168.png',
  '/assets/icons/icon-192x192.png',
  '/assets/icons/icon-256x256.png',
  '/assets/icons/icon-48x48.png',
  '/assets/icons/icon-512x512.png',
  '/assets/icons/icon-72x72.png',
  '/assets/icons/icon-96x96.png',
]

self.addEventListener('install', event => {
  event.waitUntil(caches.open(cacheName).then(cache => cache.addAll([])))
})

self.addEventListener('fetch', event => {
  event.respondWith(
    caches
      .match(event.request)
      .then(cacheResponse => cacheResponse || fetch(event.request))
  )
})
