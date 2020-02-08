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
 * @param mediaStream
 * @param cancelIncomingCall
 *
 * @returns {*}
 * @constructor
 */
const Header = ({
  user,
  history,
  setHeaderHeight,
  setMediaStream,
  mediaStream,
  cancelIncomingCall
}) => {
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
    } catch (e) {
      throw new Error(e)
    }

    stream.createOffer(user._id)
  }

  const stopVideo = () => {
    stream.stopAllStreams(user._id)
    cancelIncomingCall()
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
        <button className={`action video ${mediaStream ? 'active' : ''}`}
          onClick={mediaStream ? stopVideo : createVideoOffer}/>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    incomingCall: state.chat.incomingCall,
    mediaStream: state.chat.mediaStream
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setMediaStream: stream => dispatch(chatActions.setMediaStream(stream)),
    cancelIncomingCall: () => dispatch(chatActions.setIncomingCallData(null))
  }
}

Header.propTypes = {
  user: PropTypes.object.isRequired,
  setHeaderHeight: PropTypes.func,
  setMediaStream: PropTypes.func,
  cancelIncomingCall: PropTypes.func,
  incomingCall: PropTypes.object,
  mediaStream: PropTypes.object,
  history: PropTypes.object.isRequired
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))
