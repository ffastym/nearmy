/**
 * @author Yuriy Matviyuk
 */
import appActions from '../../redux/actions/app'
import PropTypes from 'prop-types'
import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'

/**
 * Notify component
 *
 * @param type
 * @param setNotify
 * @param message
 *
 * @returns {*}
 * @constructor
 */
const Notify = ({ type, setNotify, message }) => {
  let color = ''
  const { t } = useTranslation()

  switch (type) {
    case 'error':
      color = 'red'
      break
    case 'warning':
      color = 'orange'
      break
    default:
      color = 'green'
  }

  /**
     * Hide snackbar
     */
  const hide = () => {
    setNotify('')
  }

  if (!message) {
    return ''
  }

  return (
    <Snackbar open={true} autoHideDuration={2000} onClose={hide}>
      <SnackbarContent message={t(message)} style={{ background: color }}/>
    </Snackbar>
  )
}

const mapStateToProps = state => {
  return {
    message: state.app.notify.message,
    type: state.app.notify.type
  }
}

const mapDispatchToProps = dispatch => {
  return {
    /**
     * Set notify message
     *
     * @param message
     * @param type
     */
    setNotify: (message, type) => dispatch(appActions.setNotify(message, type))
  }
}

Notify.propTypes = {
  type: PropTypes.string,
  setNotify: PropTypes.func,
  message: PropTypes.string
}

export default connect(mapStateToProps, mapDispatchToProps)(Notify)
