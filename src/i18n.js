import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import es from './translations/es.json';
import en from './translations/en.json';
import pt from './translations/pt.json';

i18n.use(initReactI18next).init({
  resources: {
    es: { translation: es },
    en: { translation: en },
    pt: { translation: pt },
  },
  lng: 'es',
  fallbackLng: 'es',
  interpolation: { escapeValue: false },
});

export default i18n;
