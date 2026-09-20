import type {MetadataRoute} from 'next';
import {siteUrl} from '@/lib/metadata';

/**
 * Nothing on this site is private, so every crawler gets the whole tree. The
 * `Sitemap` line is the part that matters: it is how Google finds the Hungarian
 * and English versions without waiting to stumble across a link to them.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/'
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl
  };
}
