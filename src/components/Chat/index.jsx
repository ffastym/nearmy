/**
 * @author Yuriy Matviyuk
 */
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Loader from '../Loader'
import { connect } from 'react-redux'
import chatRequest from '../../api/axios/request/chat'
import Preview from './Preview'

/**
 * Chat component
 *
 * @param userId
 *
 * @returns {*}
 * @constructor
 */
const Chat = ({ userId }) => {
  const [chats, setChats] = useState(null)

  useEffect(() => {
    if (!chats) {
      chatRequest.getUserChats(userId).then(({ data }) => {
        const chats = data.chats

        setChats(data.success && chats ? chats : [])
      })
    }
  })

  if (!chats) {
    return <Loader/>
  }

  return (
    <div className='chat-previews-wrapper'>
      {chats.map(chat => <Preview key={chat._id} chat={chat}/>)}
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

Chat.propTypes = {
  userId: PropTypes.string
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
