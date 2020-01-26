/**
 * @author Yuriy Matviyuk
 */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {useTranslation} from 'react-i18next'

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

  return (
    <div>
      <h1>{user.name}</h1>
      <div>{t('GenderWithVal', { gender: t(user.gender) })}</div>
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
