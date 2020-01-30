/**
 * @author Yuriy Matviyuk
 */
import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { NavLink, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Image, Transformation } from 'cloudinary-react'
import cloudinary from '../../../api/cloudinary'
import url from '../../../router/url'

/**
 * Header component
 *
 * @param user
 * @param history
 * @param setHeaderHeight
 *
 * @returns {*}
 * @constructor
 */
const Header = ({ user, history, setHeaderHeight }) => {
  const chatViewHeaderRef = useRef(null)

  useEffect(() => {
    if (chatViewHeaderRef.current) {
      setHeaderHeight(chatViewHeaderRef.current.clientHeight)
    }
  })

  return (
    <div className="chat-view-header" ref={chatViewHeaderRef}>
      <div className="chat-back-button">
        <button className="action back" onClick={ history.goBack }/>
      </div>
      <NavLink to={
        {
          pathname: url.profile(user._id),
          state: { user }
        }
      } className="chat-view-user-photo">
        <Image cloudName={cloudinary.cloudName} publicId={user.avatar}>
          <Transformation height="35" fetchFormat="auto" width="35" gravity='face' crop="fill" />
        </Image>
      </NavLink>
      <div className="chat-view-user-name">
        <span>{user.name}</span>
        {user.isOnline && <span className='action online-status online'/>}
      </div>
      <div className="chat-view-video">
        <button className="action video"/>
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

Header.propTypes = {
  user: PropTypes.object.isRequired,
  setHeaderHeight: PropTypes.func,
  history: PropTypes.object.isRequired
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))
