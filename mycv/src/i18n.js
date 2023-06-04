import { createI18n } from 'vue-i18n';
import en from './locales/en';
import ru from './locales/ru';

const i18n = createI18n({
    globalInjection: true,
    legacy: false,
    locale: 'en',
    fallbackLocale: 'ru',
    messages: {
        en,
        ru,
    },
});

export default i18n;