/**
 * @author Yuriy Matviyuk
 */
import Button from '@material-ui/core/Button'
import cloudinary from '../../../api/cloudinary'
import PropTypes from 'prop-types'
import React, { useEffect, useRef } from 'react'
import stream from '../../../helper/stream'
import { connect } from 'react-redux'
import { Image, Transformation } from 'cloudinary-react'
import { useTranslation } from 'react-i18next'

/**
 * VideoChat component
 *
 * @param mediaStream
 * @param incomingCall
 * @param toggleVideoMode
 * @param isSingleVideo
 * @param interlocutor
 *
 * @returns {*}
 * @constructor
 */
const VideoChat = ({
  mediaStream,
  incomingCall,
  toggleVideoMode,
  isSingleVideo,
  interlocutor
}) => {
  const videoOwnRef = useRef()
  const videoInterRef = useRef()
  const { t } = useTranslation()

  useEffect(() => {
    if (videoOwnRef.current) {
      videoOwnRef.current.srcObject = mediaStream
    }

    if (videoInterRef.current && incomingCall) {
      videoInterRef.current.srcObject = incomingCall.stream
    }

    if (mediaStream && incomingCall) {
      window.onbeforeunload = e => {
        const dialogText = t('isWantReload')
        e.returnValue = dialogText
        return dialogText
      }
    } else if (window.onbeforeunload) {
      window.onbeforeunload = null
    }
  })

  const cancelVideoChat = () => {
    stream.cancelVideoChat(interlocutor._id)
  }
  
  return (
    <div className='video-chat'>
      <button className="action toggle-mode" onClick={toggleVideoMode}/>
      {incomingCall
        ? <video className='video-interlocutor' autoPlay ref={videoInterRef}/>
        : <div className="video-chat-request">
          <div className="video-chat-request-photo">
            <Image cloudName={cloudinary.cloudName} publicId={interlocutor.avatar}>
              <Transformation height="150" fetchFormat="auto" width="150" gravity='face' crop="fill" />
            </Image>
          </div>
          <div>{t('callTo', { name: interlocutor.name })}</div>
          <div className="video-chat-request-actions">
            <Button href=''
              onClick={cancelVideoChat}
              className="button secondary"
              variant={'contained'}>
              {t('Cancel')}
            </Button>
          </div>
        </div>}
      {!isSingleVideo && <video className='video-own' muted autoPlay ref={videoOwnRef}/>}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    incomingCall: state.chat.incomingCall
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

VideoChat.propTypes = {
  mediaStream: PropTypes.object,
  interlocutor: PropTypes.object,
  height: PropTypes.string,
  isSingleVideo: PropTypes.bool,
  toggleVideoMode: PropTypes.func,
  incomingCall: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoChat)
