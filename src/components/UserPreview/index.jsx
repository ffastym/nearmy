/**
 * @author Yuriy Matviyuk
 */
import cloudinary from '../../api/cloudinary'
import PropTypes from 'prop-types'
import { NavLink, Redirect } from 'react-router-dom'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Image, Transformation } from 'cloudinary-react'
import { useTranslation } from 'react-i18next'
import url from '../../router/url'
import userRequest from '../../api/axios/request/user'
import appActions from '../../redux/actions/app'
import userActions from '../../redux/actions/user'

/**
 * UserPreview component
 *
 * @param user
 * @param currentUserId
 * @param favorites
 * @param setNotify
 * @param updateFavorites
 *
 * @returns {*}
 * @constructor
 */
const UserPreview = ({ user, currentUserId, favorites, setNotify, updateFavorites }) => {
  const { t } = useTranslation()
  const [isRedirectToChat, redirectToChat] = useState(false)
  const age = Math.floor((new Date() - new Date(user.dob)) / 31557600000)
  const profileUserId = user._id
  const remove = favorites.includes(profileUserId)

  if (isRedirectToChat) {
    return <Redirect to={{ pathname: url.chatView(profileUserId), state: { user } }}/>
  }

  /**
   * Get distance to user in km
   *
   * @returns {never}
   */
  const getDistance = () => {
    const distance = user.distance

    return t(distance === 1 ? 'less1km' : 'distanceInKm', { distance })
  }

  /**
   * Redirect to chat page
   *
   * @param e
   */
  const setRedirectToChat = (e) => {
    e.preventDefault()
    redirectToChat(true)
  }

  /**
   * Add/remove user to/from favorites
   *
   * @param e
   * @returns {Promise<void>}
   */
  const toggleFavorites = async (e) => {
    e.preventDefault()
    const { data } = await userRequest.toggleFavorites(currentUserId, profileUserId, remove)

    if (!data.success) {
      setNotify(remove ? 'removeFromFavoritesError' : 'addToFavoritesError', 'error')
    } else {
      updateFavorites(data.favoriteId, remove)
    }
  }

  return (
    <NavLink to={
      {
        pathname: url.profile(profileUserId),
        state: { user }
      }
    } className='user-preview'>
      <div className="user-photo">
        <Image cloudName={cloudinary.cloudName} publicId={user.avatar}>
          <Transformation fetchFormat="auto" aspectRatio="10:15" gravity='face' crop="fill" />
        </Image>
      </div>
      <div className="user-info">
        <p className='user-name'>{user.name}</p>
        <p className='user-age'>{age}</p>
        <p className='user-distance'>{getDistance()}</p>
      </div>
      <div className="user-actions actions">
        <button className={`action like bold ${remove ? '_remove' : '_add'}`} onClick={toggleFavorites}/>
        <button type='button' className="action bold chat" onClick={setRedirectToChat}/>
      </div>
    </NavLink>
  )
}

const mapStateToProps = state => {
  return {
    currentUserId: state.user.id,
    favorites: state.user.favorites
  }
}

const mapDispatchToProps = dispatch => {
  return {
    /**
     * Set notify message
     *
     * @param message
     * @param type
     * @returns {*}
     */
    setNotify: (message, type) => dispatch(appActions.setNotify(message, type)),

    /**
     * Add/remove user to/from favorites list
     *
     * @param userId
     * @param remove
     * @returns {*}
     */
    updateFavorites: (userId, remove) => dispatch(userActions.updateFavorites(userId, remove))
  }
}

UserPreview.propTypes = {
  user: PropTypes.object,
  favorites: PropTypes.array,
  setNotify: PropTypes.func,
  updateFavorites: PropTypes.func,
  currentUserId: PropTypes.string
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPreview)
