/**
 * @author Yuriy Matviyuk
 */
import socketIo from 'socket.io'
import Models from '../db/Models'
import chatMessage from '../chat/message'
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
     * Make video answer
     *
     * @param data
     * @param socket
     */
    makeVideoAnswer (data, socket) {
      socket.to(this.users[data.senderId]).emit('madeVideoAnswer', {
        senderId: data.senderId,
        answer: data.answer
      })
    },

    /**
     * Make offer to video chat
     *
     * @param data
     * @param socket
     */
    makeVideoOffer ({ offer, userId, senderData }, socket) {
      socket.to(this.users[userId]).emit('madeVideoOffer', { offer, senderData })
    },

    /**
     * Stop video streaming
     *
     * @param senderId
     * @param socket
     */
    declineVideoChat ({ senderId }, socket) {
      socket.to(this.users[senderId]).emit('stopStream')
    },

    /**
     * Cancel video chat offer
     *
     * @param receiverId
     * @param socket
     */
    cancelVideoChat ({ receiverId }, socket) {
      socket.to(this.users[receiverId]).emit('cancelIncomingCall')
    },

    /**
     * Add RTC iceCandidate (required for communication between users)
     *
     * @param candidate
     * @param userId
     * @param socket
     */
    addCandidate ({ candidate, userId }, socket) {
      socket.to(this.users[userId]).emit('addCandidate', candidate)
    },

    /**
     * Send chat message event
     *
     * @param message
     */
    async sendMessage (message) {
      let Message = await chatMessage.create(message)

      if (!Message) {
        return console.log(`Can't Create message`)
      }

      let receiverId = Message.receiver.toString()
      let senderId = Message.sender.toString()
      let receiverSocketId = this.users[receiverId]
      let senderSocketId = this.users[senderId]

      const receiverModel = await chatMessage.getReceiverModel(receiverId)

      if (!receiverModel) {
        return console.log(`Can't find receiver`)
      }

      chatMessage.pushSenderIdToNewChats(receiverModel, senderId)
      this.io.to(senderSocketId).emit('sendMessage', Message)

      if (!receiverSocketId) {
        const subscription = receiverModel.subscription

        if (subscription) {
          notification.send(subscription, {
            type: 'NEW_MESSAGE'
          })
        }

        return
      }

      this.io.to(receiverSocketId).emit('sendMessage', Message)
    }
  }
}

export default io
