import { subscribeUser } from '../../subscription'
import storage from '../../helper/storage'

/**
 * @author Yuriy Matviyuk
 */
const searchRadius = storage.getLocalStorage().getItem(storage.searchRadiusKey)
const initialState = {
  age: null,
  dob: null,
  ageRange: [20, 25],
  avatar: null,
  coordinates: null,
  newChats: new Set(),
  gender: null,
  id: null,
  name: null,
  nearbyUsers: null,
  notifications: [],
  searchRadius: searchRadius // in kilometers
    ? parseInt(searchRadius) <= 200
      ? parseInt(searchRadius)
      : 100
    : 20
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

      if (state.newChats) {
        state.newChats = new Set(state.newChats)
      }

      state.age = Math.floor((new Date() - new Date(state.dob)) / 31557600000)
      break
    case 'SET_AVATAR':
      state = {
        ...state,
        avatar: action.avatar
      }
      break
    case 'ADD_PHOTO':
      state = {
        ...state,
        photos: [...state.photos, action.photo]
      }
      break
    case 'REMOVE_PHOTO':
      state = {
        ...state,
        photos: state.photos.filter(photo => photo !== action.photo)
      }
      break
    case 'UPDATE_FAVORITES':
      let favorites = action.remove
        ? state.favorites.filter(userId => userId !== action.userId)
        : state.favorites.concat(action.userId)

      state = {
        ...state,
        favorites
      }
      break
    case 'SET_CHAT_AS_READ':
      state = {
        ...state
      }

      let prevNewChats = new Set([...state.newChats])
      prevNewChats.delete(action.chatId)
      state.newChats = prevNewChats
      break
    case 'SET_CHAT_AS_NEW':
      state = {
        ...state
      }

      let newChats = new Set([...state.newChats])
      newChats.add(action.chatId)
      state.newChats = newChats
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
