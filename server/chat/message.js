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

    const Chat = await this.getChat(Message)

    if (!Chat) {
      console.log(`Can't get chat`)
    }

    return Message
  },

  /**
   * Get receiver user's model
   *
   * @param _id
   * @returns {Promise<*>}
   */
  async getReceiverModel (_id) {
    let receiverModel

    try {
      receiverModel = await Models.User.findOne({ _id })
    } catch (err) {
      console.log('Getting receiver model error', err)
    }

    return receiverModel
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
          console.log('Chat creating error ---> ', err)
        }
      })
    } catch (err) {
      console.log('Chat creating error ---> ', err)
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
      console.log('Chat search error ---> ', err)
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
      console.log('Updating receiver new chats error  ---> ', err)
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
