/**
 * @author Yuriy Matviyuk
 */

/**
 * All site routes config
 */
const url = {
  base: process.env.NODE_ENV === 'production' ? 'https://www.pbattle.me' : 'localhost:3000',
  chat: '/chat',
  chatView: userId => `/chat/${userId}`,
  contactUs: '/contact-us',
  favorites: '/favorites',
  notifications: '/notifications',
  home: '/',
  privacyPolicy: '/privacy-policy',
  profile: userId => `/profile/${userId}`,
  registration: '/create-account'
}

export default url
