/**
 * @author Yuriy Matviyuk
 */
import React from 'react'
import url from '../../router/url'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

/**
 * NotFound page component
 *
 * @returns {*}
 * @constructor
 */
const NotFound = () => {
  const { t } = useTranslation()

  return (
    <div className="not-found">
      <h1>404</h1>
      <p>{t('pageNotFound')}</p>
      <Link to={url.home}>{t('returnHome')}</Link>
    </div>
  )
}

export default NotFound
