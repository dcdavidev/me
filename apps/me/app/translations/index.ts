import { initReactI18next } from 'react-i18next';

import i18n from 'i18next';

import en from './en';
import it from './it';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    it: { translation: it },
  },
  lng: 'en',
  fallbackLng: 'en',
  supportedLngs: ['en', 'it'],

  interpolation: {
    escapeValue: false,
  },

  debug: import.meta.env.DEV,
});

export { default } from 'i18next';
