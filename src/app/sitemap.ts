import type {MetadataRoute} from 'next';
import {getPathname} from '@/i18n/navigation';
import {routing, type AppPathname, type Locale} from '@/i18n/routing';
import {siteUrl} from '@/lib/metadata';

/**
 * Relative importance within this site only — it is not a ranking signal
 * against other sites. The offer sits at the top because it is
 * what a parent is actually searching for; the gallery is supporting material.
 *
 * Keyed by canonical (Slovak) pathname, so adding a route to `routing` without
 * a priority here is a type error rather than a silently missing sitemap entry.
 */
const priority: Record<AppPathname, number> = {
  '/': 1,
  '/ponuka': 0.9,
  '/ekovan': 0.7,
  '/o-nas': 0.7,
  '/kontakt': 0.7,
  '/galeria': 0.5
};

function absolute(href: AppPathname, locale: Locale): string {
  return new URL(getPathname({href, locale}), siteUrl).toString();
}

export default function sitemap(): MetadataRoute.Sitemap {
  // Build time. The site is static, so a redeploy is the only thing that can
  // change a page — which makes this the honest answer to "last modified".
  const lastModified = new Date();
  const hrefs = Object.keys(routing.pathnames) as AppPathname[];

  return hrefs.flatMap((href) =>
    routing.locales.map((locale) => ({
      url: absolute(href, locale),
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: priority[href],
      alternates: {
        languages: {
          ...Object.fromEntries(
            routing.locales.map((code) => [code, absolute(href, code)])
          ),
          // A visitor whose language we do not publish lands on Slovak.
          'x-default': absolute(href, routing.defaultLocale)
        }
      }
    }))
  );
}
