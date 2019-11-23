import Models from '../../db/Models'

/**
 * @author Yuriy Matviyuk
 */

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
    getUserChats: (req, res) => {
      const userId = req.body.userId

      Models.Chat.find({ users: userId }, { messages: { $slice: -1 } })
        .populate('messages')
        .populate('users')
        .exec((err, chats) => res.json({ success: !err, chats }))
    },

    /**
     * Get chat messages
     *
     * @param req
     * @param res
     */
    getMessages: (req, res) => {
      const ids = req.body.ids

      Models.Message.find({
        sender: {
          $in: ids
        },
        receiver: {
          $in: ids
        }
      }).exec((err, messages) => res.json({ success: !err, messages }))
    }
  }
}

export default chatRequest
