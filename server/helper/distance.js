import { getDistance } from 'geolib'

/**
 * @author Yuriy Matviyuk
 */
export default {
  /**
   * Replace user coordinates by distance to user
   *
   * @param User
   * @param coordinates
   * @returns {{distance: (number|number)}}
   */
  setDistanceToUserModel (User, coordinates) {
    let distance = getDistance(
      {
        longitude: User._doc.coordinates.lng,
        latitude: User._doc.coordinates.lat
      },
      {
        longitude: coordinates.lng,
        latitude: coordinates.lat
      }
    )

    let userDoc = {
      ...User._doc,
      distance: distance < 1000 ? 1 : Math.floor(distance / 1000)
    }

    delete userDoc.coordinates

    return userDoc
  }
}
