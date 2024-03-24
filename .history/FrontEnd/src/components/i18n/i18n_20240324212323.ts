import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import Login_EN from '../locales/en/login.json'
import Login_VI from '../locales/vi/login.json'
import Home_EN from '../locales/en/login.json'
import Home_VI from '../locales/vi/login.json'
export const locales = {
  en: 'English',
  vi: 'Tiếng Việt'
}
const resources = {
  en: {
    login: Login_EN
  },
  vi: {
    login: Login_VI
  }
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'vi',
  ns: ['login'],
  fallbackLng: 'vi',
  interpolation: {
    escapeValue: false // react already safes from xss
  }
})

export default i18n
