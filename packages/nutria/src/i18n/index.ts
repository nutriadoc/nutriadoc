import i18n from 'i18next'
import en from './en'

i18n.init({
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: {
      translation: en
    }
  }
})

export default i18n