/**
 * @author Yuriy Matviyuk
 */
import React from 'react'
import { connect } from 'react-redux'

/**
 * Guest component
 *
 * @param props
 *
 * @returns {*}
 * @constructor
 */
const Guest = (props) => {
  return (
    <div>guest</div>
  )
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {}
}

Guest.propTypes = {}

export default connect(mapStateToProps, mapDispatchToProps)(Guest)
