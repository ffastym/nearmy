/**
 * @author Yuriy Matviyuk
 */
import Models from '../../db/Models'

const chatRequest = {
  /**
   * App post requests
   */
  post: {
    /**
     * Get user active chats
     *
     * @param req
     * @param res
     */
    getUserChats: async (req, res) => {
      const userId = req.body.userId
      let chats = []
      let success

      try {
        chats = await Models.Chat.find(
          { users: userId },
          { messages: { $slice: -1 } }
        ).populate('messages')
          .populate('users')
        success = true
      } catch (e) {
        success = false
        console.error('Getting user\'s chats error --->', e)
      } finally {
        res.json({ success, chats })
      }
    },

    /**
     * Get chat messages
     *
     * @param req
     * @param res
     */
    getMessages: async (req, res) => {
      const ids = req.body.ids
      let messages = []
      let success

      try {
        messages = await Models.Message.find({
          sender: {
            $in: ids
          },
          receiver: {
            $in: ids
          }
        })
        success = true
      } catch (e) {
        success = false
        console.error('Getting chat messages error --->', e)
      } finally {
        res.json({ success, messages })
      }
    }
  }
}

export default chatRequest
