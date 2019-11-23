/**
 * @author Yuriy Matviyuk
 */
import * as serviceWorker from './serviceWorker'
import App from './components/App/index'
import i18n from './i18n/config'
import React from 'react'
import ReactDOM from 'react-dom'
import store from './redux/store'
import { BrowserRouter } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import { Provider } from 'react-redux'
import './styles/index.css'
import fb from './api/fb'

fb.init()

ReactDOM.hydrate((
  <BrowserRouter>
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <App/>
      </I18nextProvider>
    </Provider>
  </BrowserRouter>
), document.getElementById('root'))
serviceWorker.register()
