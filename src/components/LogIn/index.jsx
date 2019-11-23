/**
 * @author Yuriy Matviyuk
 */
import React from 'react'
import { connect } from 'react-redux'
import fb from '../../api/fb'

/**
 * LogIn component
 *
 * @param props
 *
 * @returns {*}
 * @constructor
 */

if (typeof window !== 'undefined') {
  window.checkLoginStatus = fb.checkLoginStatus
}

const LogIn = () => {
  return (
    <div className='login-wrapper'>
      <div className="fb-login-button"
        data-width=""
        data-size="large"
        data-onlogin="checkLoginStatus()"
        data-scope="public_profile,user_gender,user_age_range,user_birthday"
        data-button-type="continue_with"
        data-auto-logout-link="false"
        data-use-continue-as="false"/>
    </div>
  )
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {}
}

LogIn.propTypes = {}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn)
