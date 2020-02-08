/**
 * @author Yuriy Matviyuk
 */
import PropTypes from 'prop-types'
import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import appActions from '../../redux/actions/app'
import url from '../../router/url'
import {useTranslation} from 'react-i18next'
import Button from '@material-ui/core/Button'

/**
 * CookiesBanner component
 *
 * $param acceptCookies
 *
 * @returns {*}
 * @constructor
 */
const CookiesBanner = ({ acceptCookies }) => {
  const { t } = useTranslation()

  return (
    <div className='cookies-banner'>
      <p className='cookies-banner__message'
        dangerouslySetInnerHTML={
          { __html: t(
            'cookiesMessage',
            {
              privacyPolicyUrl: url.privacyPolicy,
              interpolation: {
                escapeValue: false
              }
            }
          ) }
        }/>
      <Button href=''
        onClick={acceptCookies}
        className="button primary"
        variant={'contained'}>
        {t('Accept')}
      </Button>
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
