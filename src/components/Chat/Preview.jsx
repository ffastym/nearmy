/**
 * @author Yuriy Matviyuk
 */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import cloudinary from '../../api/cloudinary'
import { Image, Transformation } from 'cloudinary-react'
import { NavLink } from 'react-router-dom'
import url from '../../router/url'

/**
 * Preview component
 *
 * @param chat
 * @param userId
 *
 * @returns {*}
 * @constructor
 */
const Preview = ({ chat, userId }) => {
  const MAX_TEXT_LENGTH = 30
  const chatUsers = chat.users
  const lastMessage = chat.messages[0]
  let interlocutor

  for (let user of chatUsers) {
    if (user._id !== userId) {
      interlocutor = user
    }
  }

  const cropMessage = text => {
    return text.length > MAX_TEXT_LENGTH
      ? `${text.slice(0, MAX_TEXT_LENGTH)}...`
      : text
  }

  return (
    <NavLink to={{ pathname: url.chatView(interlocutor._id), state: { user: interlocutor } }} className='chat-preview'>
      <div className="interlocutor-photo">
        <Image cloudName={cloudinary.cloudName} publicId={interlocutor.avatar}>
          <Transformation height="35" fetchFormat="auto" width="35" gravity='face' crop="fill" />
        </Image>
      </div>
      <div className="chat-preview-text">
        <div className="interlocutor-name">{interlocutor.name}</div>
        <div className="chat-preview-last-message">
          <div className="chat-preview-message-text">{cropMessage(lastMessage.text)}</div>
          <div className="chat-preview-date">{new Date(lastMessage.date).toISOString().slice(0, 10)}</div>
        </div>
      </div>
    </NavLink>
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

Preview.propTypes = {
  chat: PropTypes.object.isRequired,
  userId: PropTypes.string
}

export default connect(mapStateToProps, mapDispatchToProps)(Preview)
