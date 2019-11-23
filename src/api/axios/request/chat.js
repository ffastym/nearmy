/**
 * @author Yuriy Matviyuk
 */
import axios from 'axios'
import config from '../config'

const chatRequest = {
  /**
   * Get user activeChats
   *
   * @param userId
   *
   * @returns {AxiosPromise<any>}
   */
  getUserChats (userId) {
    return axios.post(config.getUrl('getUserChats'), { userId })
  },

  /**
   * Get chat messages
   *
   * @param ids
   *
   * @returns {Promise<AxiosResponse<T>>}
   */
  getMessages (ids) {
    return axios.post(config.getUrl('getMessages'), { ids })
  }
}

export default chatRequest
