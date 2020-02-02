/**
 * @author Yuriy Matviyuk
 */

import distance from '../../helper/distance'
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
     * @param coordinates
     * @param userId
     */
    setCoordinates (coordinates, userId) {
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
        err => res.json({ success: !err, newUserData: body.data })
      )
    },

    /**
     * Add/remove user to/from list of favorites
     *
     * @param req
     * @param res
     */
    toggleFavorites (req, res) {
      const body = req.body
      const favoriteId = body.favoriteId
      const remove = body.remove

      Models.User.findOneAndUpdate(
        { _id: body.userId },
        { [remove ? '$pull' : '$push']: { favorites: favoriteId } },
        { useFindAndModify: false },
        err => res.json({ success: !err, favoriteId, remove })
      )
    },

    /**
     * Get list of favorite users
     *
     * @param req
     * @param res
     * @returns {Promise<*>}
     */
    async getFavoritesList (req, res) {
      const users = await Models.User
        .find({ _id: { $in: req.body.favoritesIds } })
        .select(['+coordinates'])

      if (!users) {
        return res.json({ success: false })
      }

      const favorites = users.map(
        user => distance.setDistanceToUserModel(user, req.body.coordinates)
      )

      res.json({ success: true, favorites })
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

      userRequest.post.setCoordinates(coordinates, data.userId)

      Models.User.find({
        coordinates: {
          $geoWithin: {
            $centerSphere: [coordinates, radius / R]
          }
        },
        gender: { $ne: data.gender }
      }).select(['+coordinates'])
        .exec((err, data) => {
          let users = data.map(
            user => distance.setDistanceToUserModel(user, coordinates)
          )

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
     * Add photo to user gallery
     *
     * @param req
     * @param res
     */
    addPhoto (req, res) {
      const data = req.body

      Models.User.findOneAndUpdate(
        { _id: data.id },
        { $push: { photos: data.photo } },
        (err) => {
          return res.json({ success: !err, photo: data.photo })
        }
      )
    },

    /**
     * Remove image from user's gallery
     *
     * @param req
     * @param res
     */
    removePhoto (req, res) {
      const data = req.body

      Models.User.findOneAndUpdate(
        { _id: data.id },
        { $pull: { photos: data.photo } },
        (err) => {
          return res.json({ success: !err, photo: data.photo })
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
        .select(['+facebookId', 'dob', 'gender', 'name', 'coordinates', 'avatar', 'newChats', 'favorites', 'photos'])
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
     * Set chat as already read
     *
     * @param req
     * @param res
     */
    setChatAsRead (req, res) {
      let data = req.body

      Models.User.findOneAndUpdate({ _id: data.userId }, { $pull: { newChats: data.chatId } }, err => {
        return res.json({ success: !err, chatId: data.chatId })
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
        return res.json({ success: !err, user: userDoc })
      })
    }
  }
}

export default userRequest
