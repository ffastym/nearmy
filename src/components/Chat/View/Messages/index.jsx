/**
 * @author Yuriy Matviyuk
 */
import React, {useEffect, useRef} from 'react'
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
  const wrapperEl = useRef(null)

  useEffect(() => {
    const wrapper = wrapperEl.current
    wrapper.scrollTo(0, wrapper.scrollHeight)
  })

  return (
    <div className='chat-messages-wrapper' ref={wrapperEl}>
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
