/**
 * @author Yuriy Matviyuk
 *
 * Chat actions
 */
const chatActions = {
  /**
   * Set chat Messages
   *
   * @param messages
   * @param chatId
   *
   * @returns {{chatId: *, messages: array, type: string}}
   */
  setMessages (messages, chatId) {
    return {
      type: 'SET_MESSAGES',
      messages,
      chatId
    }
  },

  /**
   * Set data about incoming call
   *
   * @param data
   * @returns {{data: *, type: string}}
   */
  setIncomingCallData (data) {
    return {
      type: 'SET_INCOMING_CALL_DATA',
      data
    }
  },

  setMediaStream (stream) {
    return {
      type: 'SET_MEDIA_STREAM',
      stream
    }
  },

  /**
   * Accept incoming video call
   *
   * @returns {{type: string}}
   */
  acceptVideoCall () {
    return {
      type: 'ACCEPT_VIDEO_CALL'
    }
  }
}

export default chatActions
