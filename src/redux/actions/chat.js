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
  setMessages: (messages, chatId) => {
    return {
      type: 'SET_MESSAGES',
      messages,
      chatId
    }
  }
}

export default chatActions
