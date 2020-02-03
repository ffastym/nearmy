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
        longitude: User._doc.coordinates[0],
        latitude: User._doc.coordinates[1]
      },
      {
        longitude: coordinates[0],
        latitude: coordinates[1]
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
