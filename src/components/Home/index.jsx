/**
 * @author Yuriy Matviyuk
 */
import PropTypes from 'prop-types'
import React from 'react'
import { Redirect } from 'react-router-dom'
import Search from '../Search'
import url from '../../router/url'
import UsersList from '../UsersList'
import { connect } from 'react-redux'
import appActions from '../../redux/actions/app'

/**
 * Home component
 *
 * @param userId
 * @param dob
 * @param userGender
 * @param setNotify
 *
 * @returns {*}
 * @constructor
 */
const Home = ({ userId, dob, userGender, setNotify }) => {
  if (!dob || !userGender) {
    setNotify('setYourInfo', 'warning')
    return <Redirect to={{ pathname: url.profile(userId), state: { isEditable: true } }} />
  }

  return (
    <div className='homepage-content'>
      <Search/>
      <UsersList/>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    userId: state.user.id,
    dob: state.user.dob,
    userGender: state.user.gender
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
    setNotify: (message, type) => {
      dispatch(appActions.setNotify(message, type))
    }
  }
}

Home.propTypes = {
  userId: PropTypes.string,
  dob: PropTypes.string,
  userGender: PropTypes.string,
  setNotify: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
