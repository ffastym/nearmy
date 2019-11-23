/**
 * @author Yuriy Matviyuk
 */

import en from './dictionary/en'
import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import ru from './dictionary/ru'
import uk from './dictionary/uk'
import { initReactI18next } from 'react-i18next'

i18n.use(LanguageDetector).use(initReactI18next).init({
  fallbackLng: 'uk',
  load: 'languageOnly',
  resources: { en, uk, ru },
  debug: process.env.NODE_ENV === 'development',
  interpolation: {
    escapeValue: false
  }
})

export default i18n
