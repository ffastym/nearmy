/**
 * @author Yuriy Matviyuk
 */
import React, {useEffect, useRef, useState} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import socket from '../../../api/io/socket'
import { useTranslation } from 'react-i18next'
import cloudinary from '../../../api/cloudinary'
import Loader from '../../Loader'
import appActions from '../../../redux/actions/app'
import { Image, Transformation } from 'cloudinary-react'

/**
 * Actions component
 *
 * @param user
 * @param userId
 * @param setNotify
 * @param setActionsHeight
 *
 * @returns {*}
 * @constructor
 */
const Actions = ({ user, userId, setNotify, setActionsHeight }) => {
  const [message, setMessage] = useState('')
  const [imageId, setImageId] = useState(null)
  const [isUploadProcessed, setIsUploadProcessed] = useState(false)
  const messageInput = useRef(null)
  const { t } = useTranslation()
  const chatActionsPanelRef = useRef()

  useEffect(() => {
    if (chatActionsPanelRef.current) {
      setActionsHeight(chatActionsPanelRef.current.clientHeight)
    }
  })

  const selectFiles = files => {
    if (!files.length) {
      return
    }

    setIsUploadProcessed(true)
    cloudinary.upload(files[0]).end((err, response) => {
      const photo = response.body.public_id

      if (err || !photo) {
        setNotify('imageUploadingError', 'error')
      } else {
        setImageId(photo)
      }

      setIsUploadProcessed(false)
    })
  }

  /**
   * Send message on press 'Enter' key
   *
   * @param e
   * @returns {boolean|void|undefined}
   */
  const sendMessageIfButtonIsEnter = (e) => {
    if (e.key === 'Enter') {
      return sendMessage()
    }
  }

  const removeImage = () => setImageId(null)

  const sendMessage = () => {
    if (message.length === 0) {
      return false
    }

    if (message.length >= 1000) {
      return alert('tooLongMessage')
    }

    socket.sendMessage({
      imageId,
      text: message,
      senderId: userId,
      receiverId: user._id
    })
    setMessage('')
    if (imageId) removeImage()
    messageInput.current.innerHTML = ''
  }

  return (
    <div className='chat-actions-panel' ref={chatActionsPanelRef}>
      {imageId
        ? <div className="upload-preview">
          <span className="action remove" onClick={removeImage}/>
          <Image cloudName={cloudinary.cloudName} publicId={imageId}>
            <Transformation height="115" fetchFormat="auto" gravity="face" crop="fill" />
          </Image>
        </div>
        : isUploadProcessed
          ? <div className='action'>
            <Loader/>
          </div>
          : <label className='action attach-file' htmlFor='upload_photo' title={t('uploadPhoto')}>
            <input type='file'
              className='hidden'
              name='upload_photo'
              id='upload_photo'
              accept='image/*'
              onChange={e => selectFiles(e.target.files)}
            />
          </label>}
      <div className="chat-message-input-wrapper">
        <div className="chat-message-input"
          placeholder={t('yourMessage')}
          contentEditable
          ref={messageInput}
          suppressContentEditableWarning
          onInput={e => setMessage(e.target.innerText)}
          onKeyPress={sendMessageIfButtonIsEnter}/>
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
  return {
    /**
     * Set notify message
     *
     * @param message
     * @param type
     */
    setNotify: (message, type) => {
      dispatch(appActions.setNotify(message, type))
    }
  }
}

Actions.propTypes = {
  user: PropTypes.object,
  setNotify: PropTypes.func,
  setActionsHeight: PropTypes.func,
  userId: PropTypes.string
}

export default connect(mapStateToProps, mapDispatchToProps)(Actions)
