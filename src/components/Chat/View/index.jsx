/**
 * @author Yuriy Matviyuk
 */
import Actions from './Actions'
import appActions from '../../../redux/actions/app'
import chatActions from '../../../redux/actions/chat'
import chatRequest from '../../../api/axios/request/chat'
import Header from './Header'
import Loader from '../../Loader'
import Messages from './Messages'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import VideoChat from './VideoChat'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

/**
 * ChatView component
 *
 * @param userId
 * @param match
 * @param location
 * @param messages
 * @param setMessages
 * @param changeLayout
 * @param isCustomLayout
 * @param incomingCall
 * @param mediaStream
 *
 * @returns {*}
 * @constructor
 */
const ChatView = ({
  userId,
  match,
  location,
  messages,
  setMessages,
  changeLayout,
  isCustomLayout,
  incomingCall,
  mediaStream
}) => {
  const interlocutor = location.state.user
  const chatId = interlocutor._id
  const chatMessages = messages[chatId]
  const [headerHeight, setHeaderHeight] = useState(0)
  const [actionsHeight, setActionsHeight] = useState(0)
  const [isSingleVideo, setIsSingleVideo] = useState(false)
  const messagesHeight = `calc(100vh - ${headerHeight}px - ${actionsHeight}px)`
  const videoCallActive = (mediaStream || (incomingCall && incomingCall.accepted))

  const toggleVideoMode = () => {
    setIsSingleVideo(!isSingleVideo)
  }

  if (!isCustomLayout) {
    changeLayout(true)
  }

  useEffect(() => {
    if (!chatMessages) {
      chatRequest.getMessages([userId, match.params.userId]).then(({ data }) => {
        let messages = data.messages

        setMessages(data.success && messages ? messages : [], chatId)
      })
    }

    return () => {
      changeLayout(false)
    }
  }, [])

  if (!chatMessages) {
    return <Loader/>
  }

  const chatViewClassName = `chat-view ${videoCallActive ? 'video' : ''} ${isSingleVideo ? 'single' : ''}`

  return (
    <div className={chatViewClassName}>
      <Header user={interlocutor} setHeaderHeight={setHeaderHeight}/>
      {videoCallActive &&
        <VideoChat mediaStream={mediaStream}
          interlocutor={interlocutor}
          toggleVideoMode={toggleVideoMode}
          isSingleVideo={isSingleVideo}/>}
      <Messages messages={chatMessages} chatId={chatId} height={messagesHeight} />
      <Actions user={interlocutor} setActionsHeight={setActionsHeight}/>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    userId: state.user.id,
    mediaStream: state.chat.mediaStream,
    messages: state.chat.messages,
    incomingCall: state.chat.incomingCall,
    isCustomLayout: state.app.isCustomLayout
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setMessages: (messages, chatId) => dispatch(chatActions.setMessages(messages, chatId)),
    changeLayout: isCustomLayout => dispatch(appActions.changeLayout(isCustomLayout))
  }
}

ChatView.propTypes = {
  userId: PropTypes.string.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      userId: PropTypes.string.isRequired
    })
  }),
  messages: PropTypes.object,
  videoStream: PropTypes.object,
  incomingCall: PropTypes.object,
  mediaStream: PropTypes.object,
  setMessages: PropTypes.func,
  changeLayout: PropTypes.func,
  isCustomLayout: PropTypes.bool,
  location: PropTypes.shape({
    state: PropTypes.shape({
      user: PropTypes.object.isRequired
    })
  })
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChatView))
