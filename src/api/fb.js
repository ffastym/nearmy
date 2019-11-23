import userRequest from './axios/request/user'
/* global FB */
const appId = '415275812496090'
const fb = {
  /**
   * Check facebook login status
   */
  checkLoginStatus () {
    FB.getLoginStatus(({ authResponse }) => {
      if (authResponse) {
        FB.api('/me', { fields: 'gender, name, birthday' }, ({ gender, birthday, name }) => {
          userRequest.logIn({
            facebookId: authResponse.userID,
            expiresIn: authResponse.expiresIn,
            gender,
            name,
            age: new Date().getFullYear() - new Date(birthday).getFullYear()
          })
        })
      }
    })
  },

  /**
   * Init Facebook SDK
   */
  init () {
    window.fbAsyncInit = () => {
      FB.init({
        appId,
        cookie: true,
        xfbml: true,
        version: 'v5.0'
      })

      FB.AppEvents.logPageView()
      this.checkLoginStatus()
    };

    (function (d, s, id) {
      let js
      let fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) { return }
      js = d.createElement(s); js.id = id
      js.src = 'https://connect.facebook.net/en_US/sdk.js'
      fjs.parentNode.insertBefore(js, fjs)
    }(document, 'script', 'facebook-jssdk'))
  }
}

export default fb
