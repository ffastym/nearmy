/**
 * @author Yuriy Matviyuk
 */
import PropTypes from 'prop-types'
import React, { useState, Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import Slider from '@material-ui/core/Slider'
import { useTranslation } from 'react-i18next'
import userActions from '../../redux/actions/user'
import storage from '../../helper/storage'

/**
 * Radius component
 *
 * @param searchRadius
 * @param setSearchRadius
 * @param getNearbyUsers
 *
 * @returns {*}
 * @constructor
 */
const Radius = ({ searchRadius, setSearchRadius, getNearbyUsers }) => {
  const { t } = useTranslation()
  let [prevRadius, setPrevRadius] = useState(0)
  const [isEditMode, changeMode] = useState(false)

  useEffect(() => {
    if (!prevRadius) {
      setPrevRadius(searchRadius)
    }
  })

  const edit = () => {
    if (isEditMode) {
      storage.getLocalStorage().setItem(storage.searchRadiusKey, searchRadius)
      setPrevRadius(searchRadius)
      getNearbyUsers()
    }

    changeMode(!isEditMode)
  }

  const cancel = () => {
    setSearchRadius(prevRadius)
    changeMode(false)
  }

  const changeRadius = (e, value) => {
    setSearchRadius(value)
  }

  return (
    <Fragment>
      <div className='slider radius search-config'>
        <label id='radius' className="label">
          {t('searchRadius', { val: searchRadius })}
        </label>
        <div className="actions">
          <button className={isEditMode ? 'action edit active' : 'action edit'} onClick={edit}/>
          {isEditMode && <button className='action close' onClick={cancel}/>}
        </div>
      </div>
      {isEditMode && <Slider
        defaultValue={searchRadius}
        aria-labelledby="radius"
        onChange={changeRadius}
        step={5}
        min={5}
        max={100}
      />}
    </Fragment>
  )
}

const mapStateToProps = state => {
  return {
    searchRadius: state.user.searchRadius
  }
}

const mapDispatchToProps = dispatch => {
  return {
    /**
     * Set search radius
     *
     * @param radius
     */
    setSearchRadius: radius => {
      dispatch(userActions.setSearchRadius(radius))
    }
  }
}

Radius.propTypes = {
  searchRadius: PropTypes.number,
  setSearchRadius: PropTypes.func,
  getNearbyUsers: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(Radius)
