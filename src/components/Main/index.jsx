/**
 * @author Yuriy Matviyuk
 */
import Home from '../Home'
import NotFound from '../NotFound'
import PropTypes from 'prop-types'
import React from 'react'
import url from '../../router/url'
import { connect } from 'react-redux'
import { Switch, Route, withRouter } from 'react-router-dom'
import LogIn from '../LogIn'
import UserProfile from '../UserProfile'
import Chat from '../Chat'
import ChatView from '../Chat/View'
import Notifications from '../Notifications'
import Favorites from '../Favorites'

/**
 * Main component
 *
 * @param isLoggedIn
 * @param userId
 *
 * @returns {*}
 * @constructor
 */
const Main = ({ isLoggedIn, userId }) => {
  return (
    <main className='main'>
      {isLoggedIn
        ? <Switch>
          <Route exact path={url.home} render={() => (<Home/>)}/>
          <Route exact path={url.chat} render={() => (<Chat/>)}/>
          <Route exact path={url.favorites} render={() => (<Favorites/>)}/>
          <Route exact path={url.notifications} render={() => (<Notifications/>)}/>
          <Route exact path={url.chatView(':userId')} render={() => (<ChatView/>)}/>
          <Route exact path={url.profile(':userId')} render={() => (<UserProfile/>)}/>
          <Route component={NotFound}/>
        </Switch>
        : <LogIn/>}
    </main>
  )
}

const mapStateToProps = state => {
  return {
    isLoggedIn: !!state.user.id,
    userId: state.user.id
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

Main.propTypes = {
  isLoggedIn: PropTypes.bool,
  userId: PropTypes.string
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main))
