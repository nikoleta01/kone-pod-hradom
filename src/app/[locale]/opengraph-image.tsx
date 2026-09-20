import {readFile} from 'node:fs/promises';
import {join} from 'node:path';
import {ImageResponse} from 'next/og';
import {getTranslations} from 'next-intl/server';
import {routing, type Locale} from '@/i18n/routing';

/**
 * The card a link to this site unfolds into in Messenger, WhatsApp and
 * Facebook — which, for this association, is how most people will first meet
 * the site. Without it a shared link is a bare grey rectangle.
 *
 * One card per locale, generated at build time. The photograph is read off
 * disk rather than fetched, so the build never depends on the network.
 */

export const size = {width: 1200, height: 630};
export const contentType = 'image/png';
export const alt = 'OZ Tymián – kone pod hradom, Krásnohorské Podhradie';

// 1.91:1 is what the social platforms crop to. The photo is square, so it is
// cropped rather than letterboxed, and the caption sits on its own band below.
const PHOTO_HEIGHT = 430;

// Without this the three cards are rendered on demand, once per crawler hit —
// a full image rasterisation to serve a file that never changes.
export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function OpenGraphImage({
  params
}: {
  params: Promise<{locale: Locale}>;
}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'meta'});

  const photo = await readFile(
    join(process.cwd(), 'public', 'galeria', 'kone-pod-hradom-zima.jpg')
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#fbf8f1'
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- satori renders
            plain <img>; next/image does not exist inside ImageResponse. */}
        <img
          src={`data:image/jpeg;base64,${photo.toString('base64')}`}
          alt=""
          width={size.width}
          height={PHOTO_HEIGHT}
          style={{objectFit: 'cover', objectPosition: 'center 40%'}}
        />
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 10,
            padding: '0 56px',
            // The rule is the site's own device: a hard border between a
            // picture and the words about it.
            borderTop: '8px solid #0e6b4a'
          }}
        >
          <div style={{fontSize: 52, color: '#262b26', lineHeight: 1.1}}>
            {t('siteName')}
          </div>
          <div style={{fontSize: 28, color: '#4a534c', letterSpacing: 1}}>
            {t('place')}
          </div>
        </div>
      </div>
    ),
    size
  );
}
