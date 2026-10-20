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
  /** Confirmed. The association's own Google Maps place, shared by Timea. */
  mapUrl: 'https://maps.app.goo.gl/vu1ZAAJyUTWfMobTA' as string | null,
  /** The pin of that place, for the embedded map. */
  coordinates: { lat: 48.6475911, lng: 20.5911735 },
  /**
   * Donations go straight to the association's account through a PAY by
   * square QR code, so there is no payment gateway and no fee.
   *
   * Confirmed: the association's account at Fio banka. Setting `iban` to null
   * hides the QR code and shows a pending line instead.
   */
  donation: {
    iban: 'SK3583300000002803450880' as string | null,
    beneficiary: 'OZ Tymián – kone pod hradom',
    /** Goes to the bank as-is, so it stays Slovak in every language. */
    paymentNote: 'Dar kone pod hradom',
    amounts: [10, 20, 50, 100]
  },
  /**
   * 2 % (3 %) of income tax. TODO: confirm the association is registered for
   * the current year, then fill in the details the tax form asks for.
   */
  taxShare: {
    registered: false as boolean,
    ico: null as string | null
  },
  social: {
    facebook:
      'https://www.facebook.com/people/OZ-Tymi%C3%A1n-kone-pod-hradom/61569924954643/',
    instagram: 'https://www.instagram.com/oztymian_konepodhradom/'
  },
  funding: {
    programme: 'Terra Incognita',
    url: 'https://www.terraincognita.sk/'
  },
  /** Confirmed. The photographer who takes the horse photo shoots. */
  photographer: {
    name: 'Angelika Vozárová',
    instagram: 'https://www.instagram.com/vozarova.angelika/'
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

/** The exact pin once we have it, otherwise a Google Maps search for the address. */
export function mapHref(): string {
  if (site.mapUrl) return site.mapUrl;
  const query = `${addressLine()}, ${site.address.country}`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

/**
 * OpenStreetMap rather than a Google embed: no cookies (so no consent banner),
 * no API key, and far lighter on the weak signal around the site.
 */
export function mapEmbedSrc(): string {
  const { lat, lng } = site.coordinates;
  const bbox = [lng - 0.008, lat - 0.004, lng + 0.008, lat + 0.004].join(',');
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`;
}

/** Street, postcode and village on one line, in postal order. */
export function addressLine(): string {
  return `${site.address.street}, ${site.address.postalCode} ${site.address.village}`;
}
