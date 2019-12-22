/**
 * @author Yuriy Matviyuk
 */

import { getDistance } from 'geolib'
import Models from '../../db/Models'

const R = 6371 // Radius of the Earth in kilometers

const userRequest = {
  /**
   * Post user requests
   */
  post: {
    /**
     * Set user gender
     *
     * @param req
     * @param res
     */
    setGender (req, res) {
      const data = req.body
      const gender = data.gender

      Models.User.findOneAndUpdate(
        { _id: data.id },
        { $set: { gender } },
        (err) => {
          return res.json({ success: !err, gender })
        }
      )
    },

    /**
     * Set user coordinates into database
     *
     * @param userId
     * @param coordinates
     */
    setCoordinates (userId, coordinates) {
      Models.User.findOneAndUpdate(
        { _id: userId },
        { $set: { coordinates } },
        { useFindAndModify: false },
        err => err && console.log('set coordinates error ---> ', err)
      )
    },

    /**
     * Update user profile data
     *
     * @param req
     * @param res
     */
    updateProfile (req, res) {
      const body = req.body

      Models.User.findOneAndUpdate(
        { _id: body.userId },
        { $set: { ...body.data } },
        { useFindAndModify: false },
        err => res.json({ success: !err })
      )
    },

    /**
     * Get nearby users
     *
     * @param req
     * @param res
     */
    getNearbyUsers (req, res) {
      const data = req.body
      const coordinates = data.coordinates
      const radius = data.radius
      const formattedCoordinates = [ coordinates.lng, coordinates.lat ]

      userRequest.post.setCoordinates(formattedCoordinates, data.userId)

      Models.User.find({
        coordinates: {
          $geoWithin: {
            $centerSphere: [formattedCoordinates, radius / R]
          }
        },
        gender: { $ne: data.gender }
      }).select(['+coordinates'])
        .exec((err, data) => {
          let users = []

          data.forEach(user => {
            let distance = getDistance(
              { longitude: user._doc.coordinates[0], latitude: user._doc.coordinates[1] },
              { longitude: coordinates.lng, latitude: coordinates.lat }
            )

            let userDoc = {
              ...user._doc,
              distance: distance < 1000 ? 1 : Math.floor(distance / 1000)
            }
            delete userDoc.coordinates
            users.push(userDoc)
          })

          return res.json({ success: !err, users })
        })
    },

    /**
     * Set user photo avatar
     *
     * @param req
     * @param res
     */
    setAvatar (req, res) {
      const data = req.body

      Models.User.findOneAndUpdate(
        { _id: data.id },
        { $set: { avatar: data.photo } },
        (err) => {
          return res.json({ success: !err })
        }
      )
    },

    /**
     * Save user subscription into DB
     *
     * @param req
     * @param res
     */
    saveSubscription (req, res) {
      const _id = req.body.id
      const subscription = req.body.subscription

      Models.User.findOneAndUpdate({ _id }, { $set: { subscription } }, (err) => {
        if (err) {
          return console.log('Saving subscription error ---> ', err)
        }

        return res.json({ success: true })
      })
    },

    /**
     * Log in to account
     *
     * @param req
     * @param res
     */
    logIn (req, res) {
      let userData = req.body

      Models.User.findOne({ facebookId: userData.facebookId })
        .select(['+facebookId', 'age', 'gender', 'name', 'avatar'])
        .populate('notifications')
        .exec((err, userDoc) => {
          if (err) {
            return res.json({ success: false, err })
          } else if (userDoc) {
            return res.json({ success: true, user: userDoc })
          }

          let User = new Models.User(userData)

          User.save(err => res.json({ success: !err, user: User }))
        })
    },

    /**
     * Remove user notification
     *
     * @param req
     * @param res
     */
    removeNotification (req, res) {
      let data = req.body

      Models.Notification.remove({ _id: data.notificationId }).then(() => {
        Models.User.updateOne(
          { _id: data.userId },
          { $pull: { notifications: data.notificationId } }
        ).then(() => {
          return res.json({ success: true })
        })
      })
    },

    /**
     * Get user profile data
     *
     * @param req
     * @param res
     */
    getUserProfile (req, res) {
      Models.User.findOne({ _id: req.body.userId }, (err, userDoc) => {
        return res.json(err ? { success: false } : userDoc)
      })
    }
  }
}

export default userRequest
