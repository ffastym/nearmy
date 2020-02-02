/**
 * @author Yuriy Matviyuk
 */
import chatActions from '../../../redux/actions/chat'
import cloudinary from '../../../api/cloudinary'
import PropTypes from 'prop-types'
import React, { useEffect, useRef } from 'react'
import stream from '../../../helper/stream'
import url from '../../../router/url'
import { connect } from 'react-redux'
import { Image, Transformation } from 'cloudinary-react'
import { NavLink, withRouter } from 'react-router-dom'

/**
 * Header component
 *
 * @param user
 * @param history
 * @param setHeaderHeight
 * @param setMediaStream
 *
 * @returns {*}
 * @constructor
 */
const Header = ({ user, history, setHeaderHeight, setMediaStream }) => {
  const chatViewHeaderRef = useRef(null)

  useEffect(() => {
    if (chatViewHeaderRef.current) {
      setHeaderHeight(chatViewHeaderRef.current.clientHeight)
    }
  })

  const createVideoOffer = async () => {
    try {
      let videoStream = await stream.getMediaStream()
      setMediaStream(videoStream)
      stream.addStream(videoStream)
    } catch (err) {
      console.warn('Get media stream error ---> ', err)
    }

    stream.createOffer(user._id)
  }

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
        <button className="action video" onClick={createVideoOffer}/>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    setMediaStream: stream => dispatch(chatActions.setMediaStream(stream))
  }
}

Header.propTypes = {
  user: PropTypes.object.isRequired,
  setHeaderHeight: PropTypes.func,
  setMediaStream: PropTypes.func,
  history: PropTypes.object.isRequired
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))
