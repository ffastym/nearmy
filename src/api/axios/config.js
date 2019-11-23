/**
 * @author Yuriy Matviyuk
 */

export default {
  /**
   * Server url
   */
  serverApiPath: process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3001',

  /**
   * Get server api url
   *
   * @param path
   *
   * @returns {string}
   */
  getUrl (path) {
    return `${this.serverApiPath}/api/${path}`
  }
}
