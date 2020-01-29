/**
 * @author Yuriy Matviyuk
 */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Notification from './Notification'
import { useTranslation } from 'react-i18next'
/**
 * Notifications component
 *
 * @param notifications
 *
 * @returns {*}
 * @constructor
 */
const Notifications = ({ notifications }) => {
  const { t } = useTranslation()
  const [items, setItems] = useState([])

  if (notifications.length && items.length !== notifications.length) {
    let html = []

    notifications.forEach((data, index) => {
      html.push(<Notification data={data} key={index} notifications={notifications}/>)
    })

    setItems(html)
  } else if (!notifications.length && items.length) {
    setItems([])
  }

  return (
    <div className='notifications-wrapper'>
      <h1 className="title">
        {t('Notifications')}
      </h1>
      <p className="empty">
        {!items.length && t('noNotifications')}
      </p>
      {items}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    notifications: state.user.notifications
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

Notifications.propTypes = {
  notifications: PropTypes.array
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Notifications))
