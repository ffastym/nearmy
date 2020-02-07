/**
 * @author Yuriy Matviyuk
 */
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Loader from '../Loader'
import userRequest from '../../api/axios/request/user'
import appActions from '../../redux/actions/app'
import Preview from '../UserPreview'
import { useTranslation } from 'react-i18next'

/**
 * Favorites component
 *
 * @param setNotify
 * @param favorites
 * @param coordinates
 *
 * @returns {*}
 * @constructor
 */
const Favorites = ({ setNotify, favorites, coordinates }) => {
  const { t } = useTranslation()
  const [favoritesList, setFavoritesList] = useState([])
  const [isLoadingPrecessed, setIsLoadingProcessed] = useState(true)

  const getFavoritesHtml = () => {
    return favoritesList.map(favorite => <Preview key={favorite._id} user={favorite}/>)
  }

  async function getFavoritesList () {
    try {
      const { data } = await userRequest.getFavoritesList(favorites, coordinates)

      if (data.success) {
        setFavoritesList(data.favorites)
      }
    } catch (e) {
      setNotify('fetchFavoritesListError', 'error')
    }

    setIsLoadingProcessed(false)
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
    favorites: state.user.favorites,
    coordinates: state.user.coordinates
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
  favorites: PropTypes.array,
  coordinates: PropTypes.array,
  setNotify: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites)
