import type {Metadata} from 'next';
import {getTranslations} from 'next-intl/server';
import {getPathname} from '@/i18n/navigation';
import {routing, type AppPathname, type Locale} from '@/i18n/routing';

/**
 * TODO: set NEXT_PUBLIC_SITE_URL once the real domain is registered.
 *
 * Trailing slash is stripped because this value is concatenated in
 * `robots.ts`, and `https://example.sk//sitemap.xml` is not the same URL.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://konepodhradom.sk'
).replace(/\/$/, '');

/**
 * Canonical + hreflang alternates for one route, so each language version is
 * indexed separately instead of competing with the others.
 */
function alternates(href: AppPathname, locale: Locale) {
  const languages: Record<string, string> = {};

  for (const code of routing.locales) {
    languages[code] = getPathname({href, locale: code});
  }

  // Told to a crawler serving a language we do not publish: send it to Slovak
  // rather than letting it pick whichever version it saw first.
  languages['x-default'] = getPathname({href, locale: routing.defaultLocale});

  return {
    canonical: getPathname({href, locale}),
    languages
  };
}

/**
 * Builds page metadata from a namespace in `messages/*.json`, which must expose
 * a `title` and either a `lead` or `description` key.
 */
export async function buildMetadata({
  locale,
  namespace,
  href
}: {
  locale: Locale;
  namespace: string;
  href: AppPathname;
}): Promise<Metadata> {
  const t = await getTranslations({locale, namespace});
  const tMeta = await getTranslations({locale, namespace: 'meta'});

  const title = t('title');
  const description = t.has('lead') ? t('lead') : tMeta('description');

  return {
    title,
    description,
    alternates: alternates(href, locale),
    openGraph: {
      title: `${title} | ${tMeta('siteName')}`,
      description,
      // Absolute, because a share card is read off another host entirely.
      url: new URL(getPathname({href, locale}), siteUrl).toString(),
      locale,
      type: 'website',
      siteName: tMeta('siteName')
    },
    // The card image itself comes from `app/[locale]/opengraph-image.tsx`;
    // this only asks for the wide layout rather than the small square one.
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${tMeta('siteName')}`,
      description
    }
  };
}
