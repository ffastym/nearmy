import email from '../email'

/**
 * @author Yuriy Matviyuk
 */

const appRequest = {
  /**
   * App post requests
   */
  post: {
    /**
     * Send mail
     *
     * @param req
     * @param res
     */
    sendMail: (req, res) => {
      email.sendEmail(req.body.message, res)
    }
  }
}

export default appRequest
