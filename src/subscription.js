/**
 * @author Yuriy Matviyuk
 */
import user from './api/axios/request/user'
import store from './redux/store'

const vapidKey = process.env.NODE_ENV === 'development'
  ? 'BO4uA3No3TIallm4RjI03P114ux-4TlW-d91cJ8K_-6B-YE2EBvDPAntevBgkv9uL9oKuKXK-0yxyNyb8wJi1PY'
  : process.env.REACT_APP_PUBLIC_VAPID_KEY
const convertedVapidKey = vapidKey ? urlBase64ToUint8Array(vapidKey) : null

function urlBase64ToUint8Array (base64String) {
  if (typeof window === 'undefined') {
    return
  }

  const padding = '='.repeat((4 - base64String.length % 4) % 4)
  // eslint-disable-next-line
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/")

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

/**
 * Add property subscription to the user model in database with current user subscription data
 *
 * @param subscription object
 */
function saveSubscription (subscription) {
  const id = store.getState().user.id

  if (!id) {
    return
  }

  user.saveSubscription(subscription, id).then(res => {
    console.log('subscription saved ---> ', res.data)
  }).catch(err => {
    console.log('subscription saved ---> ', err)
  })
}

export function subscribeUser () {
  if ('serviceWorker' in navigator && typeof window !== 'undefined') {
    navigator.serviceWorker.ready.then(function (registration) {
      if (!registration.pushManager) {
        console.log('Push manager unavailable.')
        return
      }

      registration.pushManager.getSubscription().then(function (existedSubscription) {
        if (existedSubscription === null) {
          console.log('No subscription detected, make a request.')
          registration.pushManager.subscribe({
            applicationServerKey: convertedVapidKey,
            userVisibleOnly: true
          }).then(function (newSubscription) {
            console.log('New subscription added.')
            saveSubscription(newSubscription)
          }).catch(function (e) {
            if (Notification.permission !== 'granted') {
              console.log('Permission was not granted.')
            } else {
              console.error('An error ocurred during the subscription process.', e)
            }
          })
        } else {
          console.log('Existed subscription detected.')
        }
      })
    })
      .catch(function (e) {
        console.error('An error ocurred during Service Worker registration.', e)
      })
  }
}
