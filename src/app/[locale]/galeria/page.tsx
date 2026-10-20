import type {Metadata, ResolvingMetadata} from 'next';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import type {Locale} from '@/i18n/routing';
import {GalleryLightbox} from '@/components/gallery-lightbox';
import {PageHeader} from '@/components/page-header';
import {PhotoShootCard} from '@/components/photo-shoot-card';
import {photos} from '@/content/photos';
import {buildMetadata} from '@/lib/metadata';

type Props = {params: Promise<{locale: Locale}>};

export async function generateMetadata(
  {params}: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const {locale} = await params;
  return buildMetadata({locale, namespace: 'gallery', href: '/galeria', parent});
}

export default async function GalleryPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  const t = await getTranslations('gallery');

  return (
    <>
      <PageHeader
        title={t('title')}
        lead={t('lead')}
        photoId="fotenie-s-konmi"
        photoPosition="50% 30%"
      />

      <section className="mx-auto max-w-6xl px-4 pb-16 pt-8 sm:px-6 md:pb-20 md:pt-12">
        <PhotoShootCard className="mb-10 sm:mb-14" />
        {photos.length > 0 ? (
          <GalleryLightbox photos={photos} />
        ) : null}
      </section>
    </>
  );
}
