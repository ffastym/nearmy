/**
 * @author Yuriy Matviyuk
 */
import React, {useEffect, useState} from 'react'
import chatRequest from '../../../api/axios/request/chat'
import Messages from './Messages'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import Loader from '../../Loader/Loader'
import { connect } from 'react-redux'
import Header from './Header'
import Actions from './Actions'
import chatActions from '../../../redux/actions/chat'
import appActions from '../../../redux/actions/app'

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
 *
 * @returns {*}
 * @constructor
 */
const ChatView = ({ userId, match, location, messages, setMessages, changeLayout, isCustomLayout }) => {
  const interlocutor = location.state.user
  const chatId = interlocutor._id
  const chatMessages = messages[chatId]
  const [headerHeight, setHeaderHeight] = useState(0)
  const [actionsHeight, setActionsHeight] = useState(0)
  const messagesHeight = `calc(100vh - ${headerHeight}px - ${actionsHeight}px)`

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

  return (
    <div className="chat-view">
      <Header user={interlocutor} setHeaderHeight={setHeaderHeight}/>
      <Messages messages={chatMessages} chatId={chatId} height={messagesHeight} />
      <Actions user={interlocutor} setActionsHeight={setActionsHeight}/>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    userId: state.user.id,
    messages: state.chat.messages,
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
