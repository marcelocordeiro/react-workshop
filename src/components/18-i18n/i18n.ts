import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

/**
 * In a real app the translations live in one JSON file per language
 * (`translations/en.json`, `translations/de.json`, ...), are loaded by a
 * backend plugin, and are written by translators — not by you. They are
 * inlined here so the chapter is self-contained.
 *
 * Backend analogy: a `ResourceBundle` / `messages_xx.properties` set, with
 * the current locale resolved once and read everywhere.
 */
const resources = {
  en: {
    translation: {
      'demo.title': 'Delivery status',
      'demo.greeting': 'Hello, {{name}}!',
      // i18next picks the right suffix from the `count` option. Which
      // suffixes exist depends on the language's plural rules.
      'demo.orders_one': 'You have {{count}} order.',
      'demo.orders_other': 'You have {{count}} orders.',
      'demo.switch': 'Language',
    },
  },
  de: {
    translation: {
      'demo.title': 'Lieferstatus',
      'demo.greeting': 'Hallo, {{name}}!',
      'demo.orders_one': 'Du hast {{count}} Bestellung.',
      'demo.orders_other': 'Du hast {{count}} Bestellungen.',
      'demo.switch': 'Sprache',
    },
  },
  pt: {
    translation: {
      'demo.title': 'Estado da entrega',
      'demo.greeting': 'Olá, {{name}}!',
      'demo.orders_one': 'Você tem {{count}} pedido.',
      'demo.orders_other': 'Você tem {{count}} pedidos.',
      // 'demo.switch' is deliberately missing — see the fallback in the demo.
    },
  },
};

// A separate instance rather than the global default, so this chapter cannot
// interfere with the rest of the app.
export const i18n = i18next.createInstance();

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en', // missing key in the active language => fall back to this
  interpolation: {
    // React already escapes everything it renders, so escaping here too
    // would double-escape.
    escapeValue: false,
  },
});

export const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'de', label: 'Deutsch' },
  { code: 'pt', label: 'Português' },
];
