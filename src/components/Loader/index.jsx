/**
 * @author Yuriy Matviyuk
 */
import React from 'react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

/**
 * Loader component
 *
 * @param text
 * @param withWrapper
 *
 * @returns {*}
 * @constructor
 */
const Loader = ({ text, withWrapper }) => {
  const { t } = useTranslation()

  return (
    <div className={withWrapper ? 'loader-wrapper loading' : 'loading'}>
      <span className="loader"/>
      {text && <p className="loader-text">{t(text)}</p>}
    </div>
  )
}

Loader.propTypes = {
  text: PropTypes.string,
  withWrapper: PropTypes.bool
}

export default Loader
