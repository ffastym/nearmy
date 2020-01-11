import { subscribeUser } from '../../subscription'
import storage from '../../helper/storage'

/**
 * @author Yuriy Matviyuk
 */
const searchRadius = storage.getLocalStorage().getItem(storage.searchRadiusKey)
const initialState = {
  age: null,
  ageRange: [20, 25],
  avatar: null,
  coordinates: null,
  gender: null,
  id: null,
  name: null,
  nearbyUsers: null,
  notifications: [],
  searchRadius: searchRadius ? parseInt(searchRadius) : 20 // in kilometers
}

/**
 * user reducer
 *
 * @param state
 * @param action
 *
 * @returns {{id, login}}
 */
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER_DATA':
      subscribeUser()
      state = {
        ...state,
        ...action.userData
      }
      break
    case 'SET_AVATAR':
      state = {
        ...state,
        avatar: action.avatar
      }
      break
    case 'SET_SEARCH_RADIUS':
      state = {
        ...state,
        searchRadius: action.radius
      }
      break
    case 'SET_COORDINATES':
      state = {
        ...state,
        coordinates: action.coordinates
      }
      break
    case 'SET_GENDER':
      state = {
        ...state,
        gender: action.gender
      }
      break
    case 'SET_NEARBY_USERS':
      state = {
        ...state,
        nearbyUsers: action.nearbyUsers
      }
      break
    case 'SET_NOTIFICATIONS':
      state = {
        ...state,
        notifications: action.notifications
      }
      break
    default:
      state = {
        ...state
      }
  }

  return state
}

export default userReducer
