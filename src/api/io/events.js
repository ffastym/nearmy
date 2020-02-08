/**
 * Socket.io events
 *
 * @author Yuriy Matviyuk
 */
import chatActions from '../../redux/actions/chat'
import store from '../../redux/store'
import stream from '../../helper/stream'
import userActions from '../../redux/actions/user'
import appActions from '../../redux/actions/app'

const events = {
  /**
   * Set new chat message or clear all if empty
   *
   * @param message
   */
  sendMessage (message) {
    let senderId = message.sender
    let receiverId = message.receiver
    let userId
    const state = store.getState()

    if (senderId === state.user.id) {
      userId = receiverId
    } else {
      if (!state.user.newChats.has(senderId)) {
        store.dispatch(userActions.setChatAsNew(senderId))
      }

      userId = senderId
    }

    store.dispatch(chatActions.setMessages(message, userId))
  },

  /**
   * Add RTC iceCandidate (required for communication between users)
   *
   * @param candidate
   */
  addCandidate (candidate) {
    stream.addCandidate(candidate)
  },

  /**
   * Cancel incoming video call request
   */
  cancelIncomingCall () {
    stream.cancelIncomingCall()
  },

  /**
   * Stop video streaming
   */
  stopStream ({ message }) {
    stream.stopStream()
    store.dispatch(appActions.setNotify(message, 'warning'))
  },

  /**
   * Made answer for videochat offer
   *
   * @param data
   */
  madeVideoAnswer (data) {
    stream.madeVideoAnswer(data)
  },

  /**
   * Handle video chat offer
   *
   * @param data
   */
  madeVideoOffer (data) {
    stream.madeVideoOffer(data)
  }
}

export default events
