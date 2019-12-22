/**
 * @author Yuriy Matviyuk
 */
import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import socket from '../../../api/io/socket'
import {useTranslation} from 'react-i18next'

/**
 * Actions component
 *
 * @param user
 * @param userId
 *
 * @returns {*}
 * @constructor
 */
const Actions = ({ user, userId }) => {
  const [message, setMessage] = useState('')
  const [imageFile, setImageFile] = useState(null)
  const messageInput = useRef(null)
  const { t } = useTranslation()

  const selectFiles = files => {
    let file = null

    if (files.length) {
      file = files[0]
    }

    setImageFile(file)
  }

  const sendMessage = () => {
    if (message.length === 0) {
      return false
    }

    if (message.length >= 1000) {
      return alert('tooLongMessage')
    }

    socket.sendMessage({
      text: message,
      senderId: userId,
      receiverId: user._id
    })
    setMessage('')
    messageInput.current.innerHTML = ''
  }

  return (
    <div className='chat-actions-panel'>
      <label className='action attach-file' htmlFor='upload_photo' title={t('uploadPhoto')}>
        <input type='file'
          className='hidden'
          name='upload_photo'
          id='upload_photo'
          accept='image/*'
          onChange={e => selectFiles(e.target.files)}
        />
      </label>
      <div className="chat-message-input-wrapper">
        <div className="chat-message-input"
          placeholder={t('yourMessage')}
          contentEditable
          ref={messageInput}
          suppressContentEditableWarning
          onInput={e => setMessage(e.target.innerHTML)}/>
      </div>
      <button type='button' className="action send-message" onClick={sendMessage}/>
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

Actions.propTypes = {
  user: PropTypes.object,
  userId: PropTypes.string
}

export default connect(mapStateToProps, mapDispatchToProps)(Actions)
