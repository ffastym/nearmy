/**
 * @author Yuriy Matviyuk
 */
import storage from '../../helper/storage'

const initialState = {
  isAcceptCookies: !!storage.getLocalStorage().getItem('acceptCookies'),
  isCustomLayout: false,
  notify: {
    message: '',
    type: 'success'
  }
}

/**
 * App reducer
 *
 * @param state
 * @param action
 *
 * @returns {{isAcceptCookies, isMobile}&{isAcceptCookies: boolean}}
 */
const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ACCEPT_COOKIES':
      state = {
        ...state,
        isAcceptCookies: true
      }
      break
    case 'SET_NOTIFY':
      state = {
        ...state,
        notify: action.notify
      }
      break
    case 'CHANGE_LAYOUT':
      state = {
        ...state,
        isCustomLayout: action.isCustomLayout
      }
      break
    default:
      state = {
        ...state
      }
  }

  return state
}

export default appReducer
