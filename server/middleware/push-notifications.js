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
 * @param name string
 *
 * @returns {string}
 */
const preparePayload = ({ type, name }) => {
  let payload = {
    title: 'Photo Battle',
    body: 'У Вас нове сповіщення',
    vibrate: [100, 50, 100],
    icon: 'icons/android-chrome-512x512.png',
    badge: 'icons/android-chrome-192x192.png'
  }

  switch (type) {
    case 'NEW_BATTLE':
      payload = {
        ...payload,
        title: 'Новий Батл',
        tag: 'battle-accept',
        actions: [
          {
            action: 'open',
            title: 'Переглянути'
          },
          {
            action: 'close',
            title: 'Закрити'
          }
        ],
        body: 'Користувач ' + name + ' пропонує вам батл'
      }
      break
    case 'ACCEPT_BATTLE':
      payload = {
        ...payload,
        title: 'Батл прийнято',
        tag: 'battle-accept',
        actions: [
          {
            action: 'open',
            title: 'Переглянути'
          },
          {
            action: 'close',
            title: 'Закрити'
          }
        ],
        body: 'Користувач ' + name + ' прийняв Ваш запит на батл.'
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
      .then(res => {
        if (res.body) {
          console.log('notification sending response ---> ', res.body)
        }
      }).catch(err => {
        console.log('notification sending error ---> ', err)
      })
  }
}

export default notification
