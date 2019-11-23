/**
 * @author Yuriy Matviyuk
 */
import cloudinary from '../../api/cloudinary'
import PropTypes from 'prop-types'
import React from 'react'
import store from '../../redux/store'
import user from '../../api/axios/request/user'
import userActions from '../../redux/actions/user'
import { connect } from 'react-redux'
import { Image, Transformation } from 'cloudinary-react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

/**
 * Notification component
 *
 * @param data
 * @param setNotifications
 * @param notifications
 *
 * @returns {*}
 * @constructor
 */
const Notification = ({ data, setNotifications, notifications }) => {
  const { t } = useTranslation()

  const removeNotification = () => {
    user.removeNotification({
      notificationId: data._id,
      userId: store.getState().user.id
    }).then(() => {
      setNotifications(notifications.filter(notification => notification._id !== data._id))
    })
  }

  return (
    <div className="notification" onClick={removeNotification}>
      <NavLink to={data.action} className='content'>
        <Image cloudName={cloudinary.cloudName} publicId={data.image}>
          <Transformation height="60" fetchFormat="auto" width="45" gravity='face' crop="fill" />
        </Image>
        <div className="details">
          <div className="notification-title">{t(data.title)}</div>
          <div className="notification-text">{t(data.body.message, { senderName: data.body.senderName })}</div>
        </div>
      </NavLink>
      <div className="action close"/>
    </div>
  )
}

Notification.propTypes = {
  data: PropTypes.object,
  setNotifications: PropTypes.func,
  notifications: PropTypes.array
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    /**
     * Set notifications
     *
     * @param data
     * @returns {*}
     */
    setNotifications: data => {
      return dispatch(userActions.setNotifications(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notification)
