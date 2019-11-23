/**
 * @author Yuriy Matviyuk
 */
import React from 'react'
import url from '../../router/url'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

/**
 * Logo component
 *
 * @param isCustomLayout
 *
 * @returns {*}
 * @constructor
 */
const Logo = ({ isCustomLayout }) => {
  if (isCustomLayout) {
    return false // Hide if used custom layout
  }

  return (
    <div className="logo-wrapper">
      <NavLink exact={true} to={url.home} className='logo'>
        <img src="/logo.png" alt=""/>
      </NavLink>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    isCustomLayout: state.app.isCustomLayout
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

Logo.propTypes = {
  isCustomLayout: PropTypes.bool
}

export default connect(mapStateToProps, mapDispatchToProps)(Logo)
