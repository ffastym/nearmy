import io from '../api/io'
import Models from '../db/Models'
import notification from './push-notifications'
import url from '../../src/router/url'

/**
 * @author Yuriy Matviyuk
 */

const notify = {
  /**
   * Send notification to the opponent when battle was created
   *
   * @param battle
   * @returns {*|void}
   */
  battleCreate (battle) {
    let users = battle._doc.users
    let sender = users.user1.data

    return this.send({
      title: 'battleCreated',
      sender,
      battleId: battle._doc._id,
      receiverId: users.user2.data.toString(),
      body: {
        message: 'user%1ProposeBattle',
        '%1': sender.name + ' ' + sender.surname
      }
    })
  },

  /**
   * Send notification to the battle author when someone accept battle
   *
   * @param battle
   * @returns {*|void}
   */
  battleAccept (battle) {
    let users = battle._doc.users
    let sender = users.user2.data

    return this.send({
      title: 'battleAccepted',
      sender,
      battleId: battle._id.toString(),
      receiverId: battle.author,
      body: {
        message: 'user%1AcceptYourBattle',
        '%1': sender.name + ' ' + sender.surname
      }
    })
  },

  /**
   * Send notification to the client app
   *
   * @param data
   */
  send (data) {
    let Notification = new Models.Notification()
    let sender = data.sender
    let battleId = data.battleId

    Notification.title = data.title
    Notification.body = data.body
    Notification.action = url.battle.replace(':battle_id', battleId) // Url to current battle page
    Notification.image = sender.avatar
    Notification.save().then((doc) => {
      Models.User.findOneAndUpdate(
        { _id: data.receiverId },
        { $push: { notifications: doc._id.toString() } },
        (err, userDoc) => {
          if (err) {
            return console.log('Notification sending error ---> ', err)
          }

          io.sendNotification(userDoc._id.toString(), doc, { battleId })

          const subscription = userDoc.subscription

          if (subscription) {
            notification.send(subscription, {
              type: 'ACCEPT_BATTLE',
              name: userDoc.name + ' ' + userDoc.surname
            })
          }
        })
    })
  }
}

export default notify
