import type {Metadata} from 'next';
import Image from 'next/image';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import type {Locale} from '@/i18n/routing';
import {PageHeader} from '@/components/page-header';
import {site} from '@/content/site';
import {photos} from '@/content/photos';
import {buildMetadata} from '@/lib/metadata';

type Props = {params: Promise<{locale: Locale}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  return buildMetadata({locale, namespace: 'gallery', href: '/galeria'});
}

export default async function GalleryPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  const t = await getTranslations('gallery');

  return (
    <>
      <PageHeader title={t('title')} lead={t('lead')} />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
        {photos.length > 0 ? (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {photos.map((photo) => (
              <li
                key={photo.id}
                className="overflow-hidden rounded-2xl border border-brown bg-card/40"
              >
                <Image
                  src={photo.src}
                  alt={t(`photos.${photo.id}`)}
                  width={photo.width}
                  height={photo.height}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="aspect-[4/3] w-full object-cover"
                />
              </li>
            ))}
          </ul>
        ) : null}

        <p className="mt-8 max-w-xl text-lg leading-relaxed text-charcoal-soft">
          {t('empty')}
        </p>
        <div className="mt-4 flex gap-4">
          <a
            href={site.social.facebook}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-semibold text-emerald underline underline-offset-4"
          >
            Facebook
          </a>
          <a
            href={site.social.instagram}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-semibold text-emerald underline underline-offset-4"
          >
            Instagram
          </a>
        </div>
      </section>
    </>
  );
}
