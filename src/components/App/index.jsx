/**
 * @author Yuriy Matviyuk
 */

import Aside from '../Aside'
import storage from '../../helper/storage'
import Main from '../Main'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Logo from '../Logo'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import userRequest from '../../api/axios/request/user'
import ActionsPanel from '../ActionsPanel'

/**
 * App component
 */
class App extends Component {
  /**
   * App Constructor
   *
   * @param props
   */
  constructor (props) {
    super(props)

    this.state = {
      pageClassName: this.getPageClassName(props.location)
    }

    this.getPageClassName = this.getPageClassName.bind(this)
  }

  getPageClassName (location) {
    let pathKeys = location.pathname.split('/')
    let pageClassName = ''

    pathKeys.shift()

    pathKeys.forEach(val => {
      if (val) {
        pageClassName += ' ' + val
      }
    })

    if (!pageClassName) {
      pageClassName = ' home'
    }

    return pageClassName
  }

  componentDidMount () {
    this.props.history.listen((location) => {
      this.setState({
        pageClassName: this.getPageClassName(location)
      })
    })
    
    const facebookId = storage.getCookie('dibf')

    if (facebookId) {
      userRequest.logIn({ facebookId })
    }
  }
  
  /**
   * Render App component
   */
  render () {
    return (
      <div className={'app-wrapper' + this.state.pageClassName}>
        <Logo/>
        <Main/>
        <ActionsPanel/>
        <Aside/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {}
}

App.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
