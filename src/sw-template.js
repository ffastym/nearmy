if (typeof importScripts === 'function') {
  // eslint-disable-next-line no-undef
  importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js'
  )
  /* global workbox */
  if (workbox) {
    // eslint-disable-next-line no-console
    console.log('Workbox is loaded')

    /* injection point for manifest files.  */
    workbox.precaching.precacheAndRoute([])

    /* custom cache rules */
    workbox.routing.registerNavigationRoute('/index.html', {
      blacklist: [/^\/_/, /\/[^]+\.[^]+$/]
    })

    workbox.routing.registerRoute(
      /\.(?:png|gif|jpg|jpeg)$/,
      workbox.strategies.cacheFirst({
        cacheName: 'images',
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 100,
            maxAgeSeconds: 7 * 24 * 60 * 60 // 7 Days
          })
        ]
      })
    )
  } else {
    // eslint-disable-next-line no-console
    console.log('Workbox could not be loaded. No Offline support')
  }

  self.addEventListener('push', event => {
    const data = event.data.json()

    event.waitUntil(
      self.registration.showNotification(data.title, data)
    )
  })

  self.addEventListener('notificationclick', event => {
    if (event.action === 'open') {
      // eslint-disable-next-line no-undef
      clients.openWindow('https://www.pbattle.me/my_battles')
    }

    event.notification.close()
  })
}
