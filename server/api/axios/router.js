/**
 * @author Yuriy Matviyuk
 */
import appRequest from './app'
import userRequest from './user'
import chatRequest from './chat'

/**
 * Listen all axios API requests
 *
 * @param router
 */
const listenAxiosRequests = router => {
  const axios = {
    post: { ...appRequest.post, ...userRequest.post, ...chatRequest.post },
    get: { ...appRequest.get, ...userRequest.get }
  }

  Object.entries(axios).forEach(([type, requests]) => {
    Object.entries(requests).forEach(([name, callback]) => {
      router[type]('/' + name, callback)
    })
  })
}

export default listenAxiosRequests
