/**
 * @author Yuriy Matviyuk
 */
import PropTypes from 'prop-types'
import React from 'react'
import url from '../../router/url'
import { connect } from 'react-redux'
import {NavLink, withRouter} from 'react-router-dom'

/**
 * ActionsPanel component
 *
 * @param notificationsQty
 * @param userId
 * @param isCustomLayout
 * @param newChats
 * @param user
 *
 * @returns {*}
 * @constructor
 */
const ActionsPanel = ({ notificationsQty, userId, isCustomLayout, newChats, user }) => {
  if (isCustomLayout) {
    return false // Hide if component use custom layout
  }

  return (
    <div className="actions-panel bottom">
      <NavLink exact to={url.home} activeClassName='active' className="action home"/>
      <NavLink to={url.notifications} activeClassName='active' className="action notifications">
        {!!notificationsQty && <span className='qty'>{notificationsQty}</span>}
      </NavLink>
      <NavLink to={url.chat} activeClassName='active' className="action chat">
        {!!newChats.size && <span className="counter">{newChats.size}</span>}
      </NavLink>
      <NavLink to={url.favorites} activeClassName='active' className="action like"/>
      <NavLink to={url.profile(userId)} activeClassName='active' className="action profile"/>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    userId: state.user.id,
    user: state.user,
    newChats: state.user.newChats,
    isCustomLayout: state.app.isCustomLayout,
    notificationsQty: state.user.notifications ? state.user.notifications.length : 0
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

ActionsPanel.propTypes = {
  userId: PropTypes.string,
  user: PropTypes.object,
  notificationsQty: PropTypes.number,
  isCustomLayout: PropTypes.bool,
  newChats: PropTypes.object
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ActionsPanel))
