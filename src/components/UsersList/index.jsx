/**
 * @author Yuriy Matviyuk
 */
import PropTypes from 'prop-types'
import React from 'react'
import UserPreview from '../UserPreview'
import { connect } from 'react-redux'

/**
 * UsersList component
 *
 * @param nearbyUsers
 *
 * @returns {*}
 * @constructor
 */
const UsersList = ({ nearbyUsers }) => {
  const getList = () => {
    let list = []

    if (nearbyUsers) {
      nearbyUsers.forEach(user => {
        list.push(<UserPreview key={user._id} user={user}/>)
      })
    }

    return list
  }

  return (
    <div className='users-list'>
      {getList()}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    nearbyUsers: state.user.nearbyUsers
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

UsersList.propTypes = {
  nearbyUsers: PropTypes.array
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersList)
