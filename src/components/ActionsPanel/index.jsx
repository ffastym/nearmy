/**
 * @author Yuriy Matviyuk
 */
import PropTypes from 'prop-types'
import React from 'react'
import url from '../../router/url'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

/**
 * ActionsPanel component
 *
 * @param notificationsQty
 * @param userId
 * @param isCustomLayout
 *
 * @returns {*}
 * @constructor
 */
const ActionsPanel = ({ notificationsQty, userId, isCustomLayout }) => {
  if (isCustomLayout) {
    return false // Hide if component use custom layout
  }

  return (
    <div className="actions-panel bottom">
      <NavLink exact to={url.home} className="action home"/>
      <NavLink to={url.notifications} className="action notifications">
        {!!notificationsQty && <span className='qty'>{notificationsQty}</span> }
      </NavLink>
      <NavLink to={url.chat} className="action chat"/>
      <NavLink to={url.favorites} className="action like"/>
      <NavLink to={{ pathname: url.profile(userId), state: { isEditable: true } }} className="action profile"/>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    userId: state.user.id,
    isCustomLayout: state.app.isCustomLayout,
    notificationsQty: state.user.notifications ? state.user.notifications.length : 0
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

ActionsPanel.propTypes = {
  userId: PropTypes.string,
  notificationsQty: PropTypes.number,
  isCustomLayout: PropTypes.bool
}

export default connect(mapStateToProps, mapDispatchToProps)(ActionsPanel)
