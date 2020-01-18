/**
 * @author Yuriy Matviyuk
 */
import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import MessageView from './Message'
import userActions from "../../../../redux/actions/user";
import userRequest from "../../../../api/axios/request/user";

/**
 * Messages component
 *
 * @param messages
 * @param chatId
 * @param newChats
 * @param setChatAsRead
 * @param userId
 *
 * @returns {*}
 * @constructor
 */
const Messages = ({ messages, chatId, newChats, setChatAsRead, userId }) => {
  const wrapperEl = useRef(null)

  useEffect(() => {
    const wrapper = wrapperEl.current
    wrapper.scrollTop = wrapper.scrollHeight
  })

  if (newChats.has(chatId)) {
    userRequest.setChatAsRead(userId, chatId).then(({ data }) => data.success && setChatAsRead(data.chatId))
  }

  return (
    <div className='chat-messages-wrapper' ref={wrapperEl}>
      {messages.map(message => <MessageView key={message._id} message={message}/>)}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    newChats: state.user.newChats,
    userId: state.user.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setChatAsRead: chatId => dispatch(userActions.setChatAsRead(chatId))
  }
}

Messages.propTypes = {
  chatId: PropTypes.string,
  userId: PropTypes.string,
  messages: PropTypes.array,
  setChatAsRead: PropTypes.func,
  newChats: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages)
