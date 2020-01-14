/**
 * @author Yuriy Matviyuk
 */
import { Schema } from 'mongoose'

const Schemas = {
  /**
   * User entity Schema
   */
  UserSchema: new Schema(
    {
      age: Number,
      avatar: {
        type: String,
        required: true,
        default: 'battle/uaawqnq3hirlfimfr431'
      },
      coordinates: {
        type: Array,
        select: false
      },
      facebookId: {
        type: String,
        required: true,
        select: false
      },
      favorites: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        select: false
      }],
      gender: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      isOnline: {
        type: Boolean,
        required: true,
        default: true
      },
      notifications: [{
        type: Schema.Types.ObjectId,
        ref: 'Notification',
        select: false
      }],
      newChats: [{
        type: String,
        required: true
      }],
      photos: Array,
      subscription: Object
    }
  ),

  /**
   * Notification entity Schema
   */
  NotificationSchema: new Schema(
    {
      title: { type: String, required: true },
      body: { type: Object, required: true },
      image: String,
      action: String
    }
  ),

  /**
   * Chat entity schema
   */
  ChatSchema: new Schema(
    {
      users: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }],
      messages: [{
        type: Schema.Types.ObjectId,
        ref: 'Message'
      }]
    }
  ),

  /**
   * Chat message entity schema
   */
  MessageSchema: new Schema(
    {
      text: {
        type: String,
        required: true
      },
      image: String,
      sender: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
      },
      receiver: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
      },
      date: {
        type: Date,
        required: true
      }
    }
  )
}

export default Schemas
