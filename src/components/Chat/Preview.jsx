/**
 * @author Yuriy Matviyuk
 */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import cloudinary from '../../api/cloudinary'
import { Image, Transformation } from 'cloudinary-react'
import { NavLink } from 'react-router-dom'
import url from '../../router/url'
import { useTranslation } from 'react-i18next'

/**
 * Preview component
 *
 * @param chat
 * @param userId
 * @param messages
 * @param newChats
 *
 * @returns {*}
 * @constructor
 */
const Preview = ({ chat, userId, messages, newChats }) => {
  const { t } = useTranslation()
  const MAX_TEXT_LENGTH = 100
  const chatUsers = chat.users
  const [isNew, setIsNew] = useState(false)
  let interlocutor

  for (let user of chatUsers) {
    if (user._id !== userId) {
      interlocutor = user
      break
    }
  }

  let interlocutorId = interlocutor._id
  let interlocutorMessages = messages[interlocutorId]
  let lastMessage = interlocutorMessages ? interlocutorMessages[interlocutorMessages.length - 1] : chat.messages[0]

  if (!isNew && newChats.includes(interlocutorId)) {
    setIsNew(true)
  }

  /**
   * Crop long messages
   *
   * @param text
   * @returns {*}
   */
  const cropMessage = text => {
    return text.length > MAX_TEXT_LENGTH
      ? text.slice(0, MAX_TEXT_LENGTH)
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
      {isNew && <span className="is-new">{t('New')}</span>}
    </NavLink>
  )
}

const mapStateToProps = state => {
  return {
    userId: state.user.id,
    messages: state.chat.messages,
    newChats: state.user.newChats
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

Preview.propTypes = {
  chat: PropTypes.object.isRequired,
  newChats: PropTypes.array,
  userId: PropTypes.string,
  messages: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(Preview)
