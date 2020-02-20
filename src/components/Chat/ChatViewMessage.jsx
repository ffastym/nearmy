/**
 * @author Yuriy Matviyuk
 */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import cloudinary from '../../api/cloudinary'
import { Image, Transformation } from 'cloudinary-react'

/**
 * MessageView component
 *
 * @param message
 * @param userId
 *
 * @returns {*}
 * @constructor
 */
const MessageView = ({ message, userId }) => {
  let messageWrapperClassName = message.sender === userId
    ? 'chat-message-wrapper own'
    : 'chat-message-wrapper'
  
  const zoomImage = e => e.currentTarget.classList.toggle('overlay')

  return (
    <div className={messageWrapperClassName}>
      <div className="chat-message-view">
        {message.image &&
        <div className="message-image" onClick={zoomImage}>
          <Image cloudName={cloudinary.cloudName} publicId={message.image}>
            <Transformation height="500" fetchFormat="auto" gravity="face" crop="fill" />
          </Image>
        </div> }
        <div className="chat-message-text">{message.text}</div>
      </div>
      <div className="chat-message-date">{new Date(message.date).toLocaleString()}</div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    userId: state.user.id
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

MessageView.propTypes = {
  message: PropTypes.object.isRequired,
  userId: PropTypes.string.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageView)
