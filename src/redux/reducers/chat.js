/**
 * @author Yuriy Matviyuk
 */
const initialState = {
  messages: {},
  incomingCall: null,
  mediaStream: null
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
    case 'SET_INCOMING_CALL_DATA':
      state = {
        ...state,
        incomingCall: action.data
      }
      break
    case 'SET_MEDIA_STREAM':
      const stream = action.stream

      if (!stream && state.mediaStream) {
        state.mediaStream.getTracks().forEach(track => track.stop())
      }

      state = {
        ...state,
        mediaStream: stream
      }
      break
    case 'ACCEPT_VIDEO_CALL':
      state = {
        ...state,
        incomingCall: {
          ...state.incomingCall,
          accepted: true
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
