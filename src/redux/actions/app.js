/**
 * @author Yuriy Matviyuk
 *
 * App actions
 */
import storage from '../../helper/storage'

const appActions = {
  /**
   * Accept cookies
   *
   * @returns {{type: string}}
   */
  acceptCookies: () => {
    storage.getLocalStorage().setItem('acceptCookies', 'true')

    return {
      type: 'ACCEPT_COOKIES'
    }
  },

  /**
   * Set Notify message
   *
   * @param message
   * @param type string
   *
   * @returns {{payload: *, type: string}}
   */
  setNotify: (message, type = 'success') => {
    return {
      type: 'SET_NOTIFY',
      notify: { message, type }
    }
  },

  /**
   * ChangeLayout
   *
   * @param isCustomLayout
   * @returns {{isCustomLayout: *, type: string}}
   */
  changeLayout: isCustomLayout => {
    return {
      type: 'CHANGE_LAYOUT',
      isCustomLayout
    }
  }
}

export default appActions
