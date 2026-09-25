import {defineRouting} from 'next-intl/routing';

/**
 * Canonical (internal) pathnames are Slovak — they match the folder names
 * under `src/app/[locale]`. The per-locale values are what users actually see
 * in the URL bar, which keeps each language independently indexable.
 */
export const routing = defineRouting({
  locales: ['sk', 'hu', 'en'],
  defaultLocale: 'sk',
  localePrefix: 'as-needed',
  // next-intl gates both the Accept-Language header AND the locale cookie
  // behind this one flag — there's no way to disable just the header. A
  // fresh visit to the bare `/` always serves Slovak, full stop, even for a
  // visitor who picked hu/en on a previous visit. Site-internal navigation
  // (the `Link` from ./navigation) isn't affected: it already renders an
  // explicit locale-prefixed href, so it never needs detection to begin with.
  localeDetection: false,
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
    '/kontakt': {
      sk: '/kontakt',
      hu: '/kapcsolat',
      en: '/contact'
    }
  }
});

export type Locale = (typeof routing.locales)[number];
export type AppPathname = keyof typeof routing.pathnames;
