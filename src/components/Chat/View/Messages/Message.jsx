/**
 * @author Yuriy Matviyuk
 */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

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

  return (
    <div className={messageWrapperClassName}>
      <div className="chat-message-view">
        <div className="chat-message-text">{message.text}</div>
      </div>
      <div className="chat-message-date">{new Date(message.date).toISOString().slice(0, 10)}</div>
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
