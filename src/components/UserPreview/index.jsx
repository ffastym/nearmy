/**
 * @author Yuriy Matviyuk
 */
import cloudinary from '../../api/cloudinary'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import React from 'react'
import { connect } from 'react-redux'
import { Image, Transformation } from 'cloudinary-react'
import { useTranslation } from 'react-i18next'
import url from '../../router/url'

/**
 * UserPreview component
 *
 * @param user
 *
 * @returns {*}
 * @constructor
 */
const UserPreview = ({ user }) => {
  const { t } = useTranslation()

  /**
   * Get distance to user in km
   *
   * @returns {never}
   */
  const getDistance = () => {
    const distance = user.distance

    return t(distance === 1 ? 'less1km' : 'distanceInKm', { distance })
  }

  return (
    <div className='user-preview'>
      <div className="user-photo">
        <Image cloudName={cloudinary.cloudName} publicId={user.avatar}>
          <Transformation fetchFormat="auto" aspectRatio="10:15" gravity='face' crop="fill" />
        </Image>
      </div>
      <div className="user-info">
        <p className='user-name'>{user.name}</p>
        <p className='user-age'>{user.age}</p>
        <p className='user-distance'>{getDistance()}</p>
      </div>
      <div className="user-actions actions">
        <button className="action like"/>
        <NavLink to={{ pathname: url.chatView(user._id), state: { user } }} className="action chat"/>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {}
}

UserPreview.propTypes = {
  user: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPreview)
