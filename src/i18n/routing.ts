import {defineRouting} from 'next-intl/routing';

/**
 * Canonical (internal) pathnames are Slovak — they match the folder names
 * under `src/app/[locale]`. The per-locale values are what users actually see
 * in the URL bar, which keeps each language independently indexable.
 */
export const routing = defineRouting({
  locales: ['sk', 'hu', 'en'],
  defaultLocale: 'sk',
  localePrefix: 'always',
  pathnames: {
    '/': '/',
    '/o-nas': {
      sk: '/o-nas',
      hu: '/rolunk',
      en: '/about'
    },
    '/ponuka': {
      sk: '/ponuka',
      hu: '/kinalat',
      en: '/experiences'
    },
    '/ekovan': {
      sk: '/ekovan',
      hu: '/ekovan',
      en: '/ekovan'
    },
    '/galeria': {
      sk: '/galeria',
      hu: '/galeria',
      en: '/gallery'
    },
    '/rezervacia': {
      sk: '/rezervacia',
      hu: '/foglalas',
      en: '/booking'
    },
    '/kontakt': {
      sk: '/kontakt',
      hu: '/kapcsolat',
      en: '/contact'
    }
  }
});

export type Locale = (typeof routing.locales)[number];
export type AppPathname = keyof typeof routing.pathnames;
