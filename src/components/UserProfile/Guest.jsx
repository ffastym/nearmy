/**
 * @author Yuriy Matviyuk
 */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'

/**
 * Guest component
 *
 * @param user
 *
 * @returns {*}
 * @constructor
 */
const Guest = ({ user }) => {
  const { t } = useTranslation()
  const distance = user.distance

  return (
    <div className='user-profile-info'>
      <h1>{user.name}</h1>
      <div className="user-profile-info-row">{t('GenderWithVal', { gender: t(user.gender) })}</div>
      <div className="user-profile-info-row">{t('AgeWithVal', { age: Math.floor((new Date() - new Date(user.dob)) / 31557600000) })}</div>
      <div className="user-profile-info-row">{t('DistanceWithVal', { distance: t(distance === 1 ? 'less1km' : 'distanceInKm', { distance }) })}</div>
    </div>
  )
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {}
}

Guest.propTypes = {
  user: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(Guest)
