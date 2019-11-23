/**
 * @author Yuriy Matviyuk
 */
import CookiesBanner from '../CookiesBanner'
import Notify from '../Notify'
import PropTypes from 'prop-types'
import React from 'react'

/**
 * Aside component
 *
 * @param isAcceptCookies
 *
 * @returns {*}
 * @constructor
 */
const Aside = ({ isAcceptCookies }) => {
  return (
    <aside>
      <Notify/>
      {isAcceptCookies && <CookiesBanner/>}
    </aside>
  )
}

Aside.propTypes = {
  isAcceptCookies: PropTypes.bool
}

export default Aside
