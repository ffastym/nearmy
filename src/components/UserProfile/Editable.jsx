/**
 * @author Yuriy Matviyuk
 */
import Button from '@material-ui/core/Button'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormLabel from '@material-ui/core/FormLabel'
import PropTypes from 'prop-types'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import userActions from '../../redux/actions/user'
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
const Editable = ({ age, gender, name, setGender }) => {
  const { t } = useTranslation()
  const [isValidated, setIsValidated] = useState(false)
  const [userData, setUserData] = useState({ age, gender, name })

  const changeGender = e => setGender(e.target.value)
  
  const saveProfile = () => {
    setIsValidated(true)
  }

  return (
    <div>
      <TextField
        id="name"
        className="user-name"
        label={t('Name')}
        error={isValidated && !userData.name}
        value={userData.name ? userData.name : ''}
        margin="normal"
      />
      <TextField
        type='number'
        min={0}
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
        helperText={'asdasd'}
        value={userData.gender ? userData.gender : ''}
        onChange={changeGender}>
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
    name: state.user.name
  }
}

const mapDispatchToProps = dispatch => {
  return {
    /**
     * Set user gender
     *
     * @param gender
     * @returns {*}
     */
    setGender: gender => dispatch(userActions.setGender(gender))
  }
}

Editable.propTypes = {
  avatar: PropTypes.string,
  name: PropTypes.string,
  age: PropTypes.string,
  gender: PropTypes.string,
  setGender: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(Editable)
