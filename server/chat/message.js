import Models from '../db/Models'

/**
 * @author Yuriy Matviyuk
 */

const chatMessage = {
  /**
   * Create chat message
   *
   * @param message
   */
  async create (message) {
    let Message
    let Chat

    try {
      Message = new Models.Message({
        image: message.imageId,
        text: message.text,
        sender: message.senderId,
        receiver: message.receiverId,
        date: new Date()
      })

      await Message.save()
    } catch (err) {
      console.log('Message creation error ---> ', err)
    }

    try {
      Chat = await this.getChat(Message)
    } catch (e) {
      console.error('Get chat error ---> ', e)
    }

    if (!Chat) {
      console.log(`Can't get chat`)
    }

    return Message
  },

  /**
   * Get user model
   *
   * @param _id
   * @returns {Promise<*>}
   */
  async getUserModel (_id) {
    let User

    try {
      User = await Models.User.findOne({ _id })
    } catch (e) {
      console.error('Getting user model error', e)
    }

    return User
  },

  /**
   * Create new chat
   *
   * @param users
   * @param messageId
   * @returns {Promise<*>}
   */
  async createChat (users, messageId) {
    let Chat

    try {
      Chat = new Models.Chat({ users, messages: [messageId] })
      await Chat.save(err => {
        if (err) {
          console.error('Chat creating error ---> ', err)
        }
      })
    } catch (err) {
      console.error('Chat creating error ---> ', err)
    }

    return Chat
  },

  /**
   * Try to find existing chat
   *
   * @param messageUsersIds
   * @param messageId
   * @returns {Promise<*>}
   */
  async findChat (messageUsersIds, messageId) {
    let Chat

    try {
      Chat = await Models.Chat.findOneAndUpdate(
        { users: messageUsersIds },
        { $push: { messages: messageId } },
        { useFindAndModify: false }
      )
    } catch (err) {
      console.error('Chat search error ---> ', err)
    }

    return Chat
  },

  /**
   * Push sender's id to the receiver user's model
   *
   * @param receiver
   * @param senderId
   */
  pushSenderIdToNewChats (receiver, senderId) {
    try {
      receiver.newChats.push(senderId)
      receiver.save()
    } catch (err) {
      console.error('Updating receiver new chats error  ---> ', err)
    }
  },

  /**
   * Get users chat
   *
   * @param Message
   * @returns {Promise<*>}
   */
  async getChat (Message) {
    const messageUsersIds = [Message.sender, Message.receiver].sort()
    const messageId = Message._id
    let Chat = await this.findChat(messageUsersIds, messageId)

    if (!Chat) {
      Chat = await this.createChat(messageUsersIds, messageId)
    }

    return Chat
  }
}

export default chatMessage
