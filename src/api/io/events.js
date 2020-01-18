/**
 * Socket.io events
 *
 * @author Yuriy Matviyuk
 */
import store from '../../redux/store'
import chatActions from '../../redux/actions/chat'
import userActions from '../../redux/actions/user'

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
  }
}

export default events
