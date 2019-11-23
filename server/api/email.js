'use strict'

const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: 'invischat@hotmail.com',
    pass: 'Tt239allo!'
  }
})

const MailSender = {
  /**
     * Email data
     */
  emailData: {
    from: 'invischat@hotmail.com',
    to: 'yuriy.matviyuk22@gmail.com',
    subject: 'Email from Invischat',
    text: 'default text'
  },

  /**
     * Send email
     *
     * @param message
     * @param res
     */
  sendEmail: function (message, res) {
    this.emailData.text = message
    transporter.sendMail(this.emailData, err => {
      return res.json({ success: !err })
    })
  }
}

export default MailSender
