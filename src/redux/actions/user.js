/**
 * @author Yuriy Matviyuk
 */

const userActions = {
  setUserData (userData) {
    return {
      type: 'SET_USER_DATA',
      userData
    }
  },

  /**
   * Add new photo to the gallery
   *
   * @param photo
   * @returns {{photo: *, type: string}}
   */
  addPhoto (photo) {
    return {
      type: 'ADD_PHOTO',
      photo
    }
  },

  /**
   * Add/remove user to/from favorites list
   *
   * @param userId
   * @param remove
   * @returns {{type: string, userId: *, remove: boolean}}
   */
  updateFavorites (userId, remove = false) {
    return {
      type: 'UPDATE_FAVORITES',
      remove,
      userId
    }
  },

  /**
   * Remove user's photo
   *
   * @param photo
   * @returns {{photo: *, type: string}}
   */
  removePhoto (photo) {
    return {
      type: 'REMOVE_PHOTO',
      photo
    }
  },

  /**
   * Exclude chat from newChats list
   *
   * @param chatId
   * @returns {{chatId: *, type: string}}
   */
  setChatAsRead (chatId) {
    return {
      type: 'SET_CHAT_AS_READ',
      chatId
    }
  },

  /**
   * Add chat to the newChats list
   *
   * @param chatId
   * @returns {{chatId: *, type: string}}
   */
  setChatAsNew (chatId) {
    return {
      type: 'SET_CHAT_AS_NEW',
      chatId
    }
  },

  /**
   * Set users search radius
   *
   * @param radius
   * @returns {{type: string}}
   */
  setSearchRadius (radius) {
    return {
      type: 'SET_SEARCH_RADIUS',
      radius
    }
  },

  /**
   * Set nearby users
   *
   * @param nearbyUsers
   *
   * @returns {{nearbyUsers: *, type: string}}
   */
  setNearbyUsers (nearbyUsers) {
    return {
      type: 'SET_NEARBY_USERS',
      nearbyUsers
    }
  },

  /**
   * Set new user's notifications
   *
   * @param notifications
   * @returns {{payload: *, type: string}}
   */
  setNotifications (notifications) {
    return {
      type: 'SET_NOTIFICATIONS',
      notifications
    }
  },

  /**
   * Set user coordinates
   *
   * @param coordinates
   * @returns {{coordinates: *, type: string}}
   */
  setCoordinates (coordinates) {
    return {
      type: 'SET_COORDINATES',
      coordinates
    }
  },

  /**
   * Set user profile photo
   *
   * @param avatar
   * @returns {{payload: *, type: string}}
   */
  setAvatar: avatar => {
    return {
      type: 'SET_AVATAR',
      avatar
    }
  },

  /**
   * Set user gender
   *
   * @param gender
   * @returns {{payload: *, type: string}}
   */
  setGender: gender => {
    return {
      type: 'SET_GENDER',
      payload: gender
    }
  }
}

export default userActions
