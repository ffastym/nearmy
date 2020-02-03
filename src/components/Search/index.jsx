/**
 * @author Yuriy Matviyuk
 */
import appActions from '../../redux/actions/app'
import PropTypes from 'prop-types'
import Radius from '../Radius'
import React, { Component } from 'react'
import userActions from '../../redux/actions/user'
import userRequest from '../../api/axios/request/user'
import { connect } from 'react-redux'
import { Trans } from 'react-i18next'

/**
 * Search component
 *
 * @param props
 *
 * @returns {*}
 * @constructor
 */
class Search extends Component {
  constructor (props) {
    super(props)

    this.getNearbyUsers = this.getNearbyUsers.bind(this)
    this.setSearchMessage = this.setSearchMessage.bind(this)

    this.state = {
      searchMessage: <Trans>searchingNearbyUsers</Trans>
    }
  }

  componentDidMount () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const coordinates = [position.coords.longitude, position.coords.latitude]

        this.props.setCoordinates(coordinates)
        this.getNearbyUsers(coordinates)
      }, err => {
        console.log(err)
        // TODO: add popin if user block geolocation
      })
    } else {
      console.log('browser not support')
      // TODO: add popin if browser not support navigation
    }
  }

  /**
   * Fetch users in such radius
   *
   * @param coordinates
   */
  getNearbyUsers (coordinates = this.props.coordinates) {
    this.setState({
      searchMessage: <Trans>searchingNearbyUsers</Trans>
    })

    const searchData = {
      coordinates,
      gender: this.props.gender,
      radius: this.props.searchRadius,
      userId: this.props.userId
    }

    userRequest.getNearbyUsers(searchData).then(({ data }) => {
      if (data.success) {
        let users = data.users

        this.props.setNearbyUsers(users)
        this.setSearchMessage(users.length)
      } else {
        this.props.setNearbyUsers([])
        this.setSearchMessage(0)
      }
    }).catch(() => {
      this.setSearchMessage(0)
      this.props.setNotify('fetchingUsersError', 'error')
    })
  }

  /**
   * Set search nearby users message
   *
   * @param qty
   *
   * @returns {*}
   */
  setSearchMessage (qty) {
    let message = qty
      ? <Trans values={{ qty }}>numberFoundUsers</Trans>
      : <Trans>nearbyUsersNotFound</Trans>
    this.setState({
      searchMessage: message
    })
  }

  render () {
    return (
      <div className='search-wrapper'>
        <h1>{this.state.searchMessage}</h1>
        <Radius getNearbyUsers={this.getNearbyUsers}/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    userId: state.user.id,
    gender: state.user.gender,
    coordinates: state.user.coordinates,
    nearbyUsers: state.user.nearbyUsers,
    searchRadius: state.user.searchRadius
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
    },

    /**
     * Set user current coordinates
     *
     * @param coordinates
     */
    setCoordinates: coordinates => {
      dispatch(userActions.setCoordinates(coordinates))
    },

    /**
     * Set nearby users
     *
     * @param users
     */
    setNearbyUsers: users => {
      dispatch(userActions.setNearbyUsers(users))
    }
  }
}

Search.propTypes = {
  setNotify: PropTypes.func,
  setNearbyUsers: PropTypes.func,
  setCoordinates: PropTypes.func,
  coordinates: PropTypes.array,
  searchRadius: PropTypes.number,
  userId: PropTypes.string,
  gender: PropTypes.string,
  nearbyUsers: PropTypes.array
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
