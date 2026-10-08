import type {AppPathname} from '@/i18n/routing';

/**
 * The catalogue — the numbered key of the wall chart.
 *
 * Copy lives in `messages/*.json` under `services.items.<id>` so it stays
 * translatable; everything structural lives here.
 *
 * On invented values: `durationMinutes` and `capacity` previously shipped
 * real-looking numbers (60 min, "up to 20 people") that the association never
 * committed to, rendered as fact in three languages. They are null until Timea
 * supplies them. A null renders a visible pending chip — the row keeps its
 * shape and the fact is visibly awaited, rather than quietly disappearing.
 *
 * `ageRange` is the exception: the association published "PRE DETI od 5 do 10
 * rokov" on its own workshop poster, so it is real — but ONLY for the workshop
 * and the forest-pedagogy programme. It is not the age range for riding.
 */
export type Service = {
  /** Stable key — also the translation key and the future DB primary key. */
  id: string;
  /** Where the detail/booking page will live once it exists. */
  href: AppPathname;
  /** Confirmed by the client, or null while unknown. Never guessed. */
  ageRange: {min: number; max: number} | null;
  durationMinutes: number | null;
  capacity: number | null;
  priceEur: number | null;
  /**
   * The photograph this category wears on its card, as an id from
   * `src/content/photos.ts`. Null falls back to `fallbackPhotoId` until the
   * association sends a photo of that service.
   */
  photoId: string | null;
  /** Flip to true once the service can actually be reserved online. */
  bookable: boolean;
};

export const services: Service[] = [
  {
    id: 'vozenie-deti',
    href: '/ponuka',
    ageRange: null,
    durationMinutes: null,
    capacity: null,
    priceEur: null,
    photoId: 'child',
    bookable: false
  },
  {
    id: 'lesna-pedagogika',
    href: '/ponuka',
    ageRange: {min: 5, max: 10},
    durationMinutes: 60,
    capacity: null,
    priceEur: null,
    photoId: 'deti-v-prirode',
    bookable: false
  },
  {
    id: 'workshopy',
    href: '/ponuka',
    ageRange: {min: 5, max: 10},
    durationMinutes: 60,
    capacity: null,
    priceEur: null,
    photoId: null,
    bookable: false
  },
  {
    id: 'senzoricke-hry',
    href: '/ponuka',
    ageRange: null,
    durationMinutes: null,
    capacity: null,
    priceEur: null,
    photoId: null,
    bookable: false
  },
  {
    id: 'jazdenie',
    href: '/ponuka',
    ageRange: null,
    durationMinutes: null,
    capacity: null,
    priceEur: null,
    photoId: null,
    bookable: false
  },
  {
    id: 'zoznamenie-s-konmi',
    href: '/ponuka',
    ageRange: null,
    durationMinutes: null,
    capacity: null,
    priceEur: null,
    photoId: null,
    bookable: false
  },
  {
    id: 'ekocentrum-programy',
    href: '/ekovan',
    ageRange: null,
    durationMinutes: null,
    capacity: null,
    priceEur: null,
    photoId: null,
    bookable: false
  }
];

/** Stand-in on a service card until that service has a photo of its own. */
export const fallbackPhotoId = 'zima-pod-hradom';

/**
 * The cards on the homepage: the four the association leads with on its own
 * poster, in its own order, plus sensory games.
 */
export const featuredServiceIds = [
  'vozenie-deti',
  'lesna-pedagogika',
  'workshopy',
  'zoznamenie-s-konmi',
  'senzoricke-hry'
] as const;

/** Parts of the Ekovan project, rendered on the Ekovan page. */
export const ekovanParts = [
  'maringotka',
  'tvoriva-zona',
  'bylinkova-zahrada',
  'zmyslovy-chodnik',
  'jazdiaren',
  'zazemie',
  'mini-kaviaren',
  'eko-infrastruktura'
] as const;
