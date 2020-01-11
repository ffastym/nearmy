/**
 * @author Yuriy Matviyuk
 */
import appActions from '../../redux/actions/app'
import Button from '@material-ui/core/Button'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormLabel from '@material-ui/core/FormLabel'
import PropTypes from 'prop-types'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import userActions from '../../redux/actions/user'
import userRequest from '../../api/axios/request/user'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'

/**
 * Editable component
 *
 * @param props
 *
 * @returns {*}
 * @constructor
 */
const Editable = ({ age, gender, name, setNotify, userId, setNewUserData }) => {
  const { t } = useTranslation()
  const [isValidated, setIsValidated] = useState(false)
  const [userData, setUserData] = useState({ age, gender, name })
  const saveProfile = () => {
    setIsValidated(true)

    for (let value of Object.values(userData)) {
      if (!value) {
        return setNotify('pleaseFillRequiredFields', 'warning')
      }
    }

    userRequest.updateProfile(userData, userId)
      .then(updateProfile)
      .catch(showUpdateError)
  }

  /**
   * Show error message if occurs error on profile updating
   *
   * @returns {*}
   */
  const showUpdateError = () => setNotify('profileUpdateError', 'error')

  /**
   * Set new user data
   *
   * @param data
   * 
   * @returns {*}
   */
  const updateProfile = ({ data }) => {
    if (!data.success) {
      return showUpdateError()
    }

    setNewUserData(data.newUserData)
    setNotify('profileWasUpdatedSuccessfully', 'success')
  }

  return (
    <div>
      <TextField
        id="name"
        className="user-name"
        label={t('Name')}
        error={isValidated && !userData.name}
        value={userData.name ? userData.name : ''}
        onChange={e => setUserData({ ...userData, name: e.target.value })}
        margin="normal"
      />
      <TextField
        type='number'
        min={0}
        onChange={e => setUserData({ ...userData, age: e.target.value })}
        id="age"
        error={isValidated && !userData.age}
        value={userData.age ? userData.age : ''}
        className="user-age"
        label={t('Age')}
        margin="normal"
      />
      <FormLabel component="legend">{t('Gender')}</FormLabel>
      <RadioGroup
        aria-label="gender"
        name="gender"
        error={isValidated && !userData.gender}
        value={userData.gender ? userData.gender : ''}
        onChange={e => setUserData({ ...userData, gender: e.target.value })}>
        <FormControlLabel value="female" control={<Radio />} label={t('Female')}/>
        <FormControlLabel value="male" control={<Radio />} label={t('Male')}/>
      </RadioGroup>
      <Button href=''
        onClick={saveProfile}
        className="primary"
        variant={'contained'}>
        {t('Save')}
      </Button>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    age: state.user.age,
    gender: state.user.gender,
    name: state.user.name,
    userId: state.user.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    /**
     * Update user data
     *
     * @param userData
     *
     * @returns {*}
     */
    setNewUserData: userData => dispatch(userActions.setUserData(userData)),

    /**
     * Set notify message
     *
     * @param message
     * @param type
     *
     * @returns {*}
     */
    setNotify: (message, type) => dispatch(appActions.setNotify(message, type))
  }
}

Editable.propTypes = {
  age: PropTypes.string,
  avatar: PropTypes.string,
  gender: PropTypes.string,
  name: PropTypes.string,
  setNewUserData: PropTypes.func,
  setNotify: PropTypes.func,
  userId: PropTypes.string
}

export default connect(mapStateToProps, mapDispatchToProps)(Editable)
