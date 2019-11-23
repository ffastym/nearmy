/**
 * @author Yuriy Matviyuk
 */
import Schemas from './Schemas'
import mongoose from 'mongoose'

const Models = {
  /**
  * User model
  */
  User: mongoose.model('User', Schemas.UserSchema, 'user'),

  /**
   * Notification model
   */
  Notification: mongoose.model('Notification', Schemas.NotificationSchema, 'notification'),

  /**
   * Chat model
   */
  Chat: mongoose.model('Chat', Schemas.ChatSchema, 'chat'),

  /**
   * Chat message model
   */
  Message: mongoose.model('Message', Schemas.MessageSchema, 'message')
}

export default Models
