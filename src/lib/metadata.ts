import type {Metadata} from 'next';
import {getTranslations} from 'next-intl/server';
import {getPathname} from '@/i18n/navigation';
import {routing, type AppPathname, type Locale} from '@/i18n/routing';

/** TODO: set NEXT_PUBLIC_SITE_URL once the real domain is registered. */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://konepodhradom.sk';

/**
 * Canonical + hreflang alternates for one route, so each language version is
 * indexed separately instead of competing with the others.
 */
function alternates(href: AppPathname, locale: Locale) {
  const languages: Record<string, string> = {};

  for (const code of routing.locales) {
    languages[code] = getPathname({href, locale: code});
  }

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
      locale,
      type: 'website',
      siteName: tMeta('siteName')
    }
  };
}
