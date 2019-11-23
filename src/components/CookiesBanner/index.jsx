/**
 * @author Yuriy Matviyuk
 */
import PropTypes from 'prop-types'
import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import appActions from '../../redux/actions/app'

/**
 * CookiesBanner component
 *
 * $param acceptCookies
 *
 * @returns {*}
 * @constructor
 */
const CookiesBanner = ({ acceptCookies }) => {
  return (
    <div className='cookies-banner'>
      <p>
        Для ведення аналітики відвідування додатку ми використовуємо
        файли cookies, а також записуємо дані про сесію до локального сховища Вашого браузера.
        Натискаючи на кнопку нижче ви підтверджуєте, що погоджуєтеся з даними умовами та з
        умовами нашої <a href="http://www.invischat.com/privacy_policy">Політики конфіденційності</a>
      </p>
      <button className="button ok-button" onClick={acceptCookies}>Погоджуюся</button>
    </div>
  )
}

const mapStateToProps = () => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    /**
     * Accept Cookies
     */
    acceptCookies: () => {
      dispatch(appActions.acceptCookies())
    }
  }
}

CookiesBanner.propTypes = {
  acceptCookies: PropTypes.func
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CookiesBanner))
