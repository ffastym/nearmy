/**
 * @author Yuriy Matviyuk
 */
import dotenv from 'dotenv'
import webpush from 'web-push'

dotenv.config()
webpush.setVapidDetails(
  process.env.WEB_PUSH_CONTACT,
  process.env.PUBLIC_VAPID_KEY,
  process.env.PRIVATE_VAPID_KEY
)

/**
 * Prepare notification data
 *
 * @param type string
 * @param data object
 * @param rest object
 *
 * @returns {string}
 */
const preparePayload = ({ type, data, ...rest }) => {
  let payload = {
    title: 'N2M',
    body: 'У Вас нове сповіщення',
    vibrate: [100, 50, 100],
    icon: 'icons/android-chrome-512x512.png',
    badge: 'icons/android-chrome-192x192.png'
  }

  switch (type) {
    case 'NEW_MESSAGE':
      payload = {
        ...payload,
        ...rest,
        data,
        tag: 'new-message',
        actions: [
          {
            action: 'open',
            title: 'Відповісти'
          },
          {
            action: 'close',
            title: 'Закрити'
          }
        ]
      }
      break
    default:
      break
  }

  return JSON.stringify(payload)
}

/**
 * Push notifications manager
 *
 * @type {{send(*=, *=): void}}
 */
const notification = {
  /**
   * Send push notification to the client
   *
   * @param subscription
   * @param data
   */
  send (subscription, data) {
    webpush.sendNotification(subscription, preparePayload(data))
      .catch(err => {
        console.error('Notification sending error ---> ', err)
      })
  }
}

export default notification
