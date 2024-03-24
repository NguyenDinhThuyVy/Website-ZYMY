import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import Login_EN from '../locales/en/login.json'
import Login_VI from '../locales/vi/login.json'
import Home_EN from '../locales/en/home.json'
import Home_VI from '../locales/vi/home.json'
import Detail_EN from '../locales/en/detail.json'
import Detail_VI from '../locales/vi/detail.json'
import Cart_EN from '../locales/en/cart.json'
import Cart_VI from '../locales/vi/cart.json'
import Profile_EN from '../locales/en/profile.json'
import Profile_VI from '../locales/vi/profile.json'
export const locales = {
  en: 'English',
  vi: 'Tiếng Việt'
}
const resources = {
  en: {
    login: Login_EN,
    home: Home_EN,
    detail: Detail_EN,
    cart: Cart_EN,
    profile: Profile_EN
  },
  vi: {
    login: Login_VI,
    home: Home_VI,
    detail: Detail_VI,
    cart: Cart_VI,
    profile: Profile_VI
  }
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'vi',
  ns: ['login', 'home', 'detail'],
  fallbackLng: 'vi',
  interpolation: {
    escapeValue: false // react already safes from xss
  }
})

export default i18n
