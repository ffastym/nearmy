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
 *
 * @returns {*}
 * @constructor
 */
const MessageView = ({ message }) => {
  return (
    <div className='chat-message-view'>
      <div className="chat-message-text">{message.text}</div>
      <div className="chat-message-date">{new Date(message.date).toISOString().slice(0, 10)}</div>
    </div>
  )
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {}
}

MessageView.propTypes = {
  message: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageView)
