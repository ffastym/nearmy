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
