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
import PrivacyPolicy from '../PrivacyPolicy'
import Chat from '../Chat'
import ChatView from '../Chat/View'
import Notifications from '../Notifications'
import Favorites from '../Favorites'

/**
 * Main component
 *
 * @param isLoggedIn
 *
 * @returns {*}
 * @constructor
 */
const Main = ({ isLoggedIn }) => {
  return (
    <main className='main'>
      {isLoggedIn
        ? <Switch>
          <Route exact path={url.home} render={() => (<Home/>)}/>
          <Route exact path={url.chat} render={() => (<Chat/>)}/>
          <Route exact path={url.privacyPolicy} render={() => (<PrivacyPolicy/>)}/>
          <Route exact path={url.favorites} render={() => (<Favorites/>)}/>
          <Route exact path={url.notifications} render={() => (<Notifications/>)}/>
          <Route exact path={url.chatView(':userId')} render={() => (<ChatView/>)}/>
          <Route exact path={url.profile(':userId')} render={() => (<UserProfile/>)}/>
          <Route path={url.notFound} component={NotFound}/>
          <Route component={NotFound}/>
        </Switch>
        : <LogIn/>}
    </main>
  )
}

const mapStateToProps = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

Main.propTypes = {
  isLoggedIn: PropTypes.bool
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main))
