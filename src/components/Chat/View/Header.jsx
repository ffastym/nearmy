/**
 * @author Yuriy Matviyuk
 */
import React from 'react'
import PropTypes from 'prop-types'
import {NavLink, withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import { Image, Transformation } from 'cloudinary-react'
import cloudinary from '../../../api/cloudinary'
import url from '../../../router/url'

/**
 * Header component
 *
 * @param user
 * @param history
 *
 * @returns {*}
 * @constructor
 */
const Header = ({ user, history }) => {
  return (
    <div className="chat-view-header">
      <div className="chat-back-button">
        <button className="action back" onClick={ history.goBack }/>
      </div>
      <NavLink to={url.profile(user._id)} className="chat-view-user-photo">
        <Image cloudName={cloudinary.cloudName} publicId={user.avatar}>
          <Transformation height="35" fetchFormat="auto" width="35" gravity='face' crop="fill" />
        </Image>
      </NavLink>
      <div className="chat-view-user-name">
        <span>{user.name}</span>
        <span className={!user.isOnline ? 'action online-status online' : 'action online-status'}>
          {user.lastVisit ? `(${user.lastVisit})` : ''}
        </span>
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
  history: PropTypes.object.isRequired
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))
