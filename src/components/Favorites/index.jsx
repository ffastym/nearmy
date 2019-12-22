/**
 * @author Yuriy Matviyuk
 */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

/**
 * Favorites component
 *
 * @param props
 *
 * @returns {*}
 * @constructor
 */
const Favorites = (props) => {
  return (
    <div>favorites</div>
  )
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {}
}

Favorites.propTypes = {}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites)
