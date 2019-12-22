/**
 * @author Yuriy Matviyuk
 */
import socketIo from 'socket.io'
import Models from '../db/Models'
import notification from '../middleware/push-notifications'

/**
 * Subscribe server events
 */
const io = {
  /**
   * Active users
   */
  users: {},

  /**
   * Io
   */
  io: null,

  /**
   * Subscribe to events
   *
   * @param server
   */
  listen (server) {
    this.io = socketIo(server)
    this.subscribeToEvents()
    // associate user with current socket id
    this.io.use((socket, next) => {
      let userId = socket.handshake.query.id

      if (userId) {
        socket.userId = userId
        this.users[userId] = socket.id

        return next()
      }

      return next(new Error('authentication error'))
    })
  },

  /**
   * Change user online status
   *
   * @param userId
   * @param isOnline
   */
  changeOnlineStatus (userId, isOnline) {
    Models.User.findOneAndUpdate(
      { _id: userId },
      { $set: { isOnline } },
      { useFindAndModify: false },
      (err) => {
        if (err) {
          return console.log('Saving subscription error ---> ', err)
        }
      }
    )
  },

  /**
   * Subscribe to socket events
   */
  subscribeToEvents () {
    this.io.on('connection', socket => {
      this.changeOnlineStatus(socket.userId, true)
      Object.keys(this.events).forEach(eventName => {
        socket.on(eventName, (data) => {
          this.events[eventName].bind(this)(data, socket)
        })
      })
    })
  },

  /**
   * Send notification to the client
   *
   * @param userId
   * @param notification
   * @param additionalData
   */
  sendNotification (userId, notification, additionalData = {}) {
    this.io.to(this.users[userId]).emit(
      'send notification',
      { notification, additionalData }
    )
  },

  /**
   * All socket events
   */
  events: {
    /**
     * Handle user disconnect and remove from users list
     *
     * @param reason
     * @param socket
     */
    disconnect (reason, socket) {
      let users = this.users

      if (reason !== 'transport close') {
        return
      }

      for (let userId in users) {
        if (!users.hasOwnProperty(userId)) {
          continue
        }

        if (users[userId] === socket.id) {
          delete users[userId]
          this.changeOnlineStatus(socket.userId, false)
          break
        }
      }
    },
    
    /**
     * Send chat message event
     *
     * @param message
     */
    sendMessage (message) {
      const users = [message.senderId, message.receiverId].sort()

      let Message = new Models.Message({
        text: message.text,
        sender: message.senderId,
        receiver: message.receiverId,
        date: new Date()
      })

      Message.save(err => {
        if (err) {
          return console.log('Message saving error ---> ', err)
        }
      })

      Models.Chat.findOneAndUpdate(
        { users },
        { $push: { messages: Message._id } },
        { useFindAndModify: false }
      ).populate('users').exec((err, Chat) => {
        if (err) {
          return console.log('chat search error ---> ', err)
        }

        let chat = Chat

        if (!Chat) {
          let Chat = new Models.Chat({
            users,
            messages: [Message._id]
          })

          Chat.save(err => {
            if (err) {
              return console.log('Chat creating error ---> ', err)
            }
          })

          chat = Chat
        }

        users.forEach(userId => {
          let userSocketId = this.users[userId]

          if (userSocketId) {
            return this.io.to(userSocketId).emit('sendMessage', Message)
          }

          for (let user of chat.users) {
            if (user._id.toString() === message.receiverId) {
              const subscription = user.subscription

              if (subscription) {
                notification.send(subscription, {
                  type: 'NEW_MESSAGE'
                })
              }

              break
            }
          }
        })
      })
    }
  }
}

export default io
