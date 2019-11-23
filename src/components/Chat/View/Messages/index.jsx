/**
 * @author Yuriy Matviyuk
 */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import MessageView from './Message'

/**
 * Messages component
 *
 * @param messages
 *
 * @returns {*}
 * @constructor
 */
const Messages = ({ messages }) => {
  return (
    <div className='chat-messages-wrapper'>
      {messages.map(message => <MessageView key={message._id} message={message}/>)}
    </div>
  )
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {}
}

Messages.propTypes = {
  messages: PropTypes.array
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages)
