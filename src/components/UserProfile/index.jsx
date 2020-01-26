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
import GallerySmall from '../GallerySmall'

/**
 * UserProfile component
 *
 * @param location
 * @param sessionUser
 *
 * @returns {*}
 * @constructor
 */
const UserProfile = ({ location, currentUser: sessionUser }) => {
  let isEditable = !location.state
  let user = isEditable ? sessionUser : location.state.user

  return (
    <div className='user-profile'>
      <Photo isEditable={isEditable} avatar={user.avatar}/>
      <GallerySmall isEditable={isEditable} user={user}/>
      {isEditable ? <Editable/> : <Guest user={user}/>}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    avatar: state.user.avatar,
    currentUser: state.user,
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
  currentUser: PropTypes.object,
  gender: PropTypes.string,
  setGender: PropTypes.func
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserProfile))
