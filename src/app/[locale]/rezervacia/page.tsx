import type {Metadata} from 'next';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import type {Locale} from '@/i18n/routing';
import {PageHeader} from '@/components/page-header';
import {buildMetadata} from '@/lib/metadata';

type Props = {params: Promise<{locale: Locale}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  return buildMetadata({locale, namespace: 'booking', href: '/rezervacia'});
}

/** Placeholder for the reservation system. */
export default async function BookingPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  const t = await getTranslations('booking');

  return (
    <>
      <PageHeader title={t('title')} lead={t('lead')} />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
        <p className="max-w-2xl text-lg leading-relaxed text-bark-soft">
          {t('body')}
        </p>

        <Link
          href="/kontakt"
          className="mt-8 inline-block rounded-full bg-moss px-6 py-3 text-sm font-semibold text-cream transition hover:bg-moss-dark"
        >
          {t('cta')}
        </Link>
      </section>
    </>
  );
}
