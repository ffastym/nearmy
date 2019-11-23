/**
 * Socket.io client api
 *
 * @author Yuriy Matviyuk
 */

import io from 'socket.io-client'
import store from '../../redux/store'
import userActions from '../../redux/actions/user'
import events from './events'

const socket = {
  /**
   * Default socket namespace
   */
  app: null,

  /**
   * Connect to chat namespace
   *
   * @param userId
   *
   * @returns {*}
   */
  io (userId = null) {
    if (!this.app) {
      this.app = io(`${process.env.NODE_ENV === 'development' ? 'localhost:3001' : '/'}?id=${userId}`)
    }

    Object.keys(events).forEach(eventName => {
      this.app.off(eventName).on(eventName, events[eventName])
    })

    return this.app
  },

  /**
   * Send chat message
   *
   * @param message
   */
  sendMessage (message) {
    this.app.emit('sendMessage', message)
  },

  /**
   * Subscribe for new notifications
   *
   * @param id
   */
  subscribeNotifications (id) {
    this.io(id).on('send notification', ({ notification }) => {
      store.dispatch(userActions.setNotifications([notification, ...store.getState().user.notifications]))
    })
  }
}

export default socket
