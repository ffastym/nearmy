/**
 * @author Yuriy Matviyuk
 */
import axios from 'axios'
import config from '../config'
import store from '../../../redux/store'
import userActions from '../../../redux/actions/user'
import appActions from '../../../redux/actions/app'
import socket from '../../io/socket'

const userRequest = {
  /**
   * Log into account
   *
   * @param userData
   *
   * @returns {Promise<AxiosResponse<T>>}
   */
  logIn: (userData) => {
    axios.post(config.getUrl('logIn'), userData).then(({ data }) => {
      if (!data.success) {
        return store.dispatch(appActions.setNotify('loginError', 'error'))
      }

      const user = data.user
      const userId = user._id
      socket.io(userId)
      user.id = userId
      delete user._id
      delete user.__v

      store.dispatch(userActions.setUserData(user))
      if (userData.expiresIn) {
        const secure = process.env.NODE_ENV === 'development' ? '' : 'Secure;'
        document.cookie = `dibf=${userData.facebookId}; path=/; SameSite=None; ${secure} max-age=${userData.expiresIn}`
      }
    })
  },

  /**
   * Set user profile photo
   *
   * @param data
   *
   * @returns {Promise<AxiosResponse<T>>}
   */
  setAvatar: data => axios.post(config.getUrl('setAvatar'), data),

  /**
   * Get list of favorites users
   *
   * @param userId
   * @returns {Promise<AxiosResponse<T>>}
   */
  getFavoritesList: userId => axios.post(config.getUrl('getFavoritesList'), { userId }),

  /**
   * Add photo to user's gallery
   *
   * @param data
   *
   * @returns {Promise<AxiosResponse<T>>}
   */
  addPhoto: data => {
    return axios.post(config.getUrl('addPhoto'), data)
  },

  /**
   * Add user to favorites
   *
   * @param userId
   * @param favoriteId
   * @param remove
   * @returns {Promise<AxiosResponse<T>>}
   */
  toggleFavorites: (userId, favoriteId, remove = false) => {
    return axios.post(config.getUrl('toggleFavorites'), { favoriteId, userId, remove })
  },

  /**
   * Remove photo from user's gallery
   *
   * @param data
   * @returns {Promise<AxiosResponse<T>>}
   */
  removePhoto: data => {
    return axios.post(config.getUrl('removePhoto'), data)
  },

  /**
   * Update user profile information
   *
   * @param data
   * @param userId
   */
  updateProfile: (data, userId) => {
    return axios.post(config.getUrl('updateProfile'), { data, userId })
  },

  /**
   * Set chat as already read
   *
   * @param userId
   * @param chatId
   *
   * @returns {Promise<AxiosResponse<T>>}
   */
  setChatAsRead: (userId, chatId) => {
    return axios.post(config.getUrl('setChatAsRead'), { userId, chatId })
  },

  /**
   * Set user gender (use in social login)
   *
   * @param id
   * @param gender
   *
   * @returns {Promise<AxiosResponse<T>>}
   */
  setGender (id, gender) {
    return axios.post(config.getUrl('setUserGender'), { id, gender })
  },

  /**
   * Fetch all users in such radius
   *
   * @param searchData
   *
   * @returns {Promise<AxiosResponse<T>>}
   */
  getNearbyUsers (searchData) {
    return axios.post(config.getUrl('getNearbyUsers'), searchData)
  },

  /**
   * Save in db user subsription to the push notifications
   *
   * @param subscription
   * @param id
   *
   * @returns {AxiosPromise<any>}
   */
  saveSubscription (subscription, id) {
    return axios.post(config.getUrl('saveSubscription'), { subscription, id })
  },

  /**
   * Get user profile data
   *
   * @param userId
   *
   * @returns {AxiosPromise<any>}
   */
  getUserProfile (userId) {
    return axios.post(config.getUrl('getUserProfile'), { userId })
  }
}

export default userRequest
