/**
 * @author Yuriy Matviyuk
 */
import Editable from './Editable'
import Guest from './Guest'
import Photo from './Photo'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

/**
 * UserProfile component
 *
 * @param location
 *
 * @returns {*}
 * @constructor
 */
const UserProfile = ({ location }) => {
  let isEditable = location.state && location.state.isEditable

  return (
    <div className='user-profile'>
      <Photo isEditable={isEditable}/>
      {isEditable ? <Editable/> : <Guest/>}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    avatar: state.user.avatar,
    userAge: state.user.age,
    gender: state.user.gender,
    userName: state.user.name
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

UserProfile.propTypes = {
  userName: PropTypes.string,
  userAge: PropTypes.string,
  location: PropTypes.object,
  gender: PropTypes.string,
  setGender: PropTypes.func
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserProfile))
