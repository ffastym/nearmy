/**
 * @author Yuriy Matviyuk
 */
const initialState = {
  messages: {}
}

/**
 * Chat reducer
 */
const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_MESSAGES':
      const chatId = action.chatId
      const stateMessages = state.messages[chatId]
      const actionMessages = action.messages
      const newMessages = Array.isArray(actionMessages) ? actionMessages : [actionMessages]
      const oldMessages = Array.isArray(stateMessages) ? stateMessages : []

      state = {
        ...state,
        messages: {
          ...state.messages,
          [chatId]: [...oldMessages, ...newMessages]
        }
      }
      break
    default:
      state = {
        ...state
      }
  }

  return state
}

export default chatReducer
