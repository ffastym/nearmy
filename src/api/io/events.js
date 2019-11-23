/**
 * Socket.io events
 *
 * @author Yuriy Matviyuk
 */
import store from '../../redux/store'
import chatActions from '../../redux/actions/chat'

const events = {
  /**
   * Set new chat message or clear all if empty
   *
   * @param message
   */
  sendMessage (message) {
    let userId = message.sender !== store.getState().user.id
      ? message.sender
      : message.receiver

    store.dispatch(chatActions.setMessages(message, userId))
  }
}

export default events
