/**
 * @author Yuriy Matviyuk
 */
import CookiesBanner from '../CookiesBanner'
import IncomingCall from '../IncomingCall'
import Notify from '../Notify'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

/**
 * Aside component
 *
 * @param isAcceptCookies
 * @param incomingCall
 *
 * @returns {*}
 * @constructor
 */
const Aside = ({ isAcceptCookies, incomingCall }) => {
  return (
    <aside>
      <Notify/>
      {isAcceptCookies && <CookiesBanner/>}
      {incomingCall && !incomingCall.accepted && <IncomingCall incomingCall={incomingCall}/>}
    </aside>
  )
}

const mapStateToProps = state => {
  return {
    incomingCall: state.chat.incomingCall
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

Aside.propTypes = {
  isAcceptCookies: PropTypes.bool,
  incomingCall: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(Aside)
