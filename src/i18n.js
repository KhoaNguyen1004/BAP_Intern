import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

import translationUS from './locales/us/translation.json';
import translationVN from './locales/vn/translation.json';

// the translations
const resources = {
    us: {
        translation: translationUS
    },
    vn: {
        translation: translationVN
    }
};

i18n
    .use(Backend)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'us',
        debug: true,
        interpolation: {
            escapeValue: false // not needed for react as it escapes by default
        }
    });

export default i18n;

