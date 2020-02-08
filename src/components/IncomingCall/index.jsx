/**
 * @author Yuriy Matviyuk
 */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import cloudinary from '../../api/cloudinary'
import { Image, Transformation } from 'cloudinary-react'
import { useTranslation } from 'react-i18next'
import Button from '@material-ui/core/Button'
import { Redirect } from 'react-router-dom'
import url from '../../router/url'
import userRequest from '../../api/axios/request/user'
import chatActions from '../../redux/actions/chat'
import stream from '../../helper/stream'

/**
 * IncomingCall component
 *
 * @param incomingCall
 * @param acceptVideoCall
 * @param setMediaStream
 *
 * @returns {*}
 * @constructor
 */
const IncomingCall = ({ incomingCall, acceptVideoCall, setMediaStream }) => {
  let userData = incomingCall.senderData
  const { t } = useTranslation()
  const [isNeedRedirect, setRedirect] = useState(false)
  const [user, setUser] = useState(null)

  if (incomingCall && incomingCall.senderData && incomingCall.senderData.isAnswer) {
    return ''
  }

  const startVideoChat = async () => {
    try {
      const { data } = await userRequest.getUserProfile(userData.id)

      if (!data.success) {
        return
      }

      setUser(data.user)
      acceptVideoCall()

      try {
        let videoStream = await stream.getMediaStream()
        stream.addStream(videoStream)
        setMediaStream(videoStream)
      } catch (err) {
        console.error(new Error(`Get media stream error --->  ${err}`))
      }

      stream.createOffer(userData.id, true)

      if (url.chatView(userData.id) !== window.location.pathname) {
        setRedirect(true)
      }
    } catch (e) {
      console.error(new Error(e))
    }
  }

  if (incomingCall.accepted) {
    return isNeedRedirect
      ? <Redirect to={{ pathname: url.chatView(user._id), state: { user } }}/>
      : ''
  }

  return (
    <div className='chat-call-offer overlay'>
      <audio src='/audio/rington.mp3' autoPlay/>
      <div className="chat-call-offer-user">
        <div className="chat-call-offer-user-photo">
          <Image cloudName={cloudinary.cloudName} publicId={userData.avatar}>
            <Transformation height="200" fetchFormat="auto" width="200" gravity='face' crop="fill" />
          </Image>
        </div>
        <div className="chat-call-offer-user-name">
          {userData.name}
        </div>
        <span>{t('proposeVideoChat')}</span>
        <div className="chat-call-offer-user-actions">
          <Button href=''
            onClick={startVideoChat}
            className="button primary"
            variant={'contained'}>
            {t('Accept')}
          </Button>
          <Button href=''
            onClick={stream.declineVideoChat}
            className="button secondary"
            variant={'contained'}>
            {t('Reject')}
          </Button>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    acceptVideoCall: () => dispatch(chatActions.acceptVideoCall()),
    setMediaStream: stream => dispatch(chatActions.setMediaStream(stream))
  }
}

IncomingCall.propTypes = {
  incomingCall: PropTypes.object,
  acceptVideoCall: PropTypes.func,
  setMediaStream: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(IncomingCall)
