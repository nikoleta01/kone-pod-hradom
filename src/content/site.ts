/**
 * Single source of truth for contact details and external links.
 *
 * `phone` is deliberately `null` rather than a plausible-looking placeholder.
 * The previous value (+421 900 000 000) shipped as a live `tel:` link on the
 * one page that matters, so a visitor could dial a number that does not exist.
 * While it is null every call affordance renders as a visible pending slot and
 * is not a link. Set it to the real number and the whole site becomes live —
 * no component changes.
 */
export const site = {
  name: 'OZ Tymián – kone pod hradom',
  /** TODO: real address from Timea. Null renders a pending slot, not a fake link. */
  email: null as string | null,
  /**
   * Confirmed. Every call plate on the site is live because of this line.
   *
   * `phone` is what the visitor reads — national notation, which is what a
   * Slovak or Hungarian parent expects. `phoneE164` is what gets dialled: a
   * traveller at the castle on a foreign SIM cannot reach 0915…, so the link
   * always carries the international form.
   */
  phone: '+421 915 104 548' as string | null,
  phoneE164: '+421915104548',
  /** Confirmed. Street and postcode are real; the house number is not known. */
  address: {
    street: 'Mierová',
    postalCode: '049 41',
    village: 'Krásnohorské Podhradie',
    country: 'Slovensko'
  },
  social: {
    facebook:
      'https://www.facebook.com/people/OZ-Tymi%C3%A1n-kone-pod-hradom/61569924954643/',
    instagram: 'https://www.instagram.com/oztymian_konepodhradom/'
  },
  funding: {
    programme: 'Terra Incognita',
    url: 'https://www.terraincognita.sk/'
  }
} as const;

/**
 * The dialled number is always international, so a visitor on a foreign SIM
 * can reach it. Returns null while no number is set, which renders a pending
 * slot rather than a broken link.
 */
export function telHref(): string | null {
  return site.phone ? `tel:${site.phoneE164}` : null;
}

/** Street, postcode and village on one line, in postal order. */
export function addressLine(): string {
  return `${site.address.street}, ${site.address.postalCode} ${site.address.village}`;
}
