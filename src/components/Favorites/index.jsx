/**
 * @author Yuriy Matviyuk
 */
import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Loader from '../Loader'
import userRequest from '../../api/axios/request/user'
import appActions from '../../redux/actions/app'
import Preview from '../UserPreview'
import {useTranslation} from 'react-i18next'

/**
 * Favorites component
 *
 * @param userId
 * @param setNotify
 * @param favorites
 *
 * @returns {*}
 * @constructor
 */
const Favorites = ({ userId, setNotify, favorites }) => {
  const { t } = useTranslation()
  const [favoritesList, setFavoritesList] = useState([])
  const [isLoadingPrecessed, SetIsLoadingProcessed] = useState(true)

  const getFavoritesHtml = () => {
    return favoritesList.map(favorite => <Preview key={favorite._id} user={favorite}/>)
  }

  async function getFavoritesList () {
    const { data } = await userRequest.getFavoritesList(userId)
    SetIsLoadingProcessed(false)

    if (!data.success) {
      return setNotify('fetchFavoritesListError', 'error')
    }

    setFavoritesList(data.favorites)
  }

  useEffect(() => {
    getFavoritesList()
  }, [favorites])

  return (
    <div className='favorites-wrapper'>
      <h1>{t('favoritesList')}</h1>
      {isLoadingPrecessed
        ? <Loader withWrapper text={'favoritesListLoading'}/>
        : favoritesList.length
          ? getFavoritesHtml()
          : <p className='empty'>{t('favoritesListEmpty')}</p>}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    userId: state.user.id,
    favorites: state.user.favorites
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

Favorites.propTypes = {
  userId: PropTypes.string,
  favorites: PropTypes.array,
  setNotify: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites)
