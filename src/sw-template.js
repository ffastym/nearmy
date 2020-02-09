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

  self.addEventListener('push', async event => {
    const data = event.data.json()

    event.waitUntil(
      self.registration.showNotification(data.title, data)
    )
  })

  self.addEventListener('notificationclick', event => {
    if (event.action === 'open') {
      event.waitUntil(self.clients.matchAll({
        includeUncontrolled: true
      }).then(clientList => {
        let chatUrl = self.origin + event.notification.data.chatUrl

        for (let i = 0; i < clientList.length; i++) {
          let client = clientList[i]

          if (client.url === chatUrl && 'focus' in client) {
            return client.focus()
          }
        }

        if (self.clients.openWindow) {
          return self.clients.openWindow(chatUrl)
        }
      }))
    }

    event.notification.close()
  })
}
