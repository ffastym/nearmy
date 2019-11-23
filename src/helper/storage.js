const storage = {
  searchRadiusKey: 'searchRadius',
  /**
   * Get local storage
   *
   * @returns {Storage}
   */
  getLocalStorage () {
    if (typeof localStorage === 'undefined' || localStorage === null) {
      let LocalStorage = require('node-localstorage').LocalStorage
      // eslint-disable-next-line no-global-assign
      return new LocalStorage('./scratch')
    } else {
      return localStorage
    }
  },

  /**
   * Get cookie by name
   *
   * @param name
   * @returns {string}
   */
  getCookie (name) {
    let value = `; ${document.cookie}`
    let parts = value.split(`; ${name}=`)
    if (parts.length === 2) {
      return parts.pop().split(';').shift()
    }
  }
}

export default storage
