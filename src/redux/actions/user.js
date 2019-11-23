/**
 * @author Yuriy Matviyuk
 */

const userActions = {
  logIn (userData) {
    return {
      type: 'LOG_IN',
      userData
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
