/**
 * @author Yuriy Matviyuk
 */
import app from './reducers/app'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import user from './reducers/user'
import chat from './reducers/chat'
import { createStore, combineReducers, applyMiddleware } from 'redux'

let middleware = [thunk]

if (process.env.NODE_ENV === 'development') { // enable logger in develop mode
  middleware = [...middleware, logger]
}

export default createStore(
  combineReducers({ app, user, chat }),
  {},
  applyMiddleware(...middleware)
)
