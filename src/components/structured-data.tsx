import {getTranslations} from 'next-intl/server';
import {getPathname} from '@/i18n/navigation';
import {routing, type Locale} from '@/i18n/routing';
import {siteUrl} from '@/lib/metadata';
import {site} from '@/content/site';
import zimaPodHradom from '@/content/images/kone-pod-hradom-zima.jpg';

/**
 * Machine-readable description of the association, emitted on every page.
 *
 * This is what lets Google show the phone number, the village and the opening
 * card in a local result instead of a bare blue link — for a small operation
 * whose visitors search "kone Krásnohorské Podhradie", that panel is most of
 * the traffic.
 *
 * Only facts confirmed in `content/site.ts` go in here. Nothing is invented to
 * fill a field: a wrong address in structured data is worse than a missing
 * one, because it is the version the map shows. Deliberately absent until
 * someone confirms them: `geo` (coordinates), `openingHoursSpecification`,
 * `priceRange`, `email`, and the house number on Mierová.
 */
export async function StructuredData({locale}: {locale: Locale}) {
  const t = await getTranslations({locale, namespace: 'meta'});

  const homeUrl = new URL(getPathname({href: '/', locale}), siteUrl).toString();
  const organisationId = `${siteUrl}/#organizacia`;

  const graph = [
    {
      '@type': 'LocalBusiness',
      '@id': organisationId,
      name: t('siteName'),
      legalName: site.name,
      description: t('description'),
      url: homeUrl,
      logo: `${siteUrl}/logo.svg`,
      image: `${siteUrl}${zimaPodHradom.src}`,
      telephone: site.phoneE164,
      address: {
        '@type': 'PostalAddress',
        streetAddress: site.address.street,
        addressLocality: site.address.village,
        postalCode: site.address.postalCode,
        addressCountry: 'SK'
      },
      areaServed: {
        '@type': 'AdministrativeArea',
        name: 'Košický kraj'
      },
      // The three languages a visitor can actually be served in, on the site
      // and on the phone.
      knowsLanguage: [...routing.locales],
      sameAs: [site.social.facebook, site.social.instagram]
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#web`,
      name: t('siteName'),
      url: homeUrl,
      inLanguage: locale,
      publisher: {'@id': organisationId}
    }
  ];

  return (
    <script
      type="application/ld+json"
      // The payload is built from our own constants and message files, never
      // from user input. The `<` escape is belt-and-braces so a future string
      // containing `</script>` cannot close the tag early.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': graph
        }).replace(/</g, '\\u003c')
      }}
    />
  );
}
