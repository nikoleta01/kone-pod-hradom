import type {Metadata} from 'next';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import type {Locale} from '@/i18n/routing';
import {services} from '@/content/services';
import {buildMetadata} from '@/lib/metadata';

type Props = {params: Promise<{locale: Locale}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'meta'});

  return {
    ...(await buildMetadata({locale, namespace: 'meta', href: '/'})),
    title: t('title')
  };
}

export default async function HomePage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  const t = await getTranslations('home');
  const tActions = await getTranslations('actions');
  const tServices = await getTranslations('services');

  return (
    <>
      <section className="border-b border-line bg-sand/40">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-moss">
            {t('heroEyebrow')}
          </p>
          <h1 className="mt-4 max-w-3xl font-serif text-5xl leading-[1.05] text-bark md:text-7xl">
            {t('heroTitle')}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-bark-soft md:text-xl">
            {t('heroSubtitle')}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/ponuka"
              className="rounded-full bg-moss px-6 py-3 text-sm font-semibold text-cream transition hover:bg-moss-dark"
            >
              {tActions('seeOffer')}
            </Link>
            <Link
              href="/kontakt"
              className="rounded-full border border-line px-6 py-3 text-sm font-semibold text-bark transition hover:bg-sand"
            >
              {tActions('contactUs')}
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <div className="grid gap-10 md:grid-cols-[1fr_1.2fr] md:gap-16">
          <h2 className="font-serif text-3xl leading-tight text-bark md:text-4xl">
            {t('introTitle')}
          </h2>
          <p className="text-lg leading-relaxed text-bark-soft">
            {t('introBody')}
          </p>
        </div>
      </section>

      <section className="border-y border-line bg-sand/30">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
          <h2 className="font-serif text-3xl text-bark md:text-4xl">
            {t('servicesTitle')}
          </h2>
          <p className="mt-3 max-w-2xl text-bark-soft">
            {t('servicesSubtitle')}
          </p>

          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <li
                key={service.id}
                className="rounded-2xl border border-line bg-cream p-6"
              >
                <h3 className="font-serif text-xl text-bark">
                  {tServices(`items.${service.id}.title`)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-bark-soft">
                  {tServices(`items.${service.id}.description`)}
                </p>
              </li>
            ))}
          </ul>

          <Link
            href="/ponuka"
            className="mt-10 inline-block text-sm font-semibold text-moss underline underline-offset-4"
          >
            {tActions('seeOffer')}
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <div className="rounded-3xl bg-moss px-6 py-12 text-cream md:px-12 md:py-16">
          <h2 className="max-w-2xl font-serif text-3xl leading-tight md:text-4xl">
            {t('ekovanTitle')}
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-cream/85">
            {t('ekovanBody')}
          </p>
          <Link
            href="/ekovan"
            className="mt-8 inline-block rounded-full bg-cream px-6 py-3 text-sm font-semibold text-moss-dark transition hover:bg-sand"
          >
            {tActions('learnMore')}
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-8 sm:px-6">
        <div className="grid gap-6 border-t border-line pt-12 md:grid-cols-[1fr_1.2fr] md:gap-16">
          <h2 className="font-serif text-3xl text-bark md:text-4xl">
            {t('visitTitle')}
          </h2>
          <div>
            <p className="text-lg leading-relaxed text-bark-soft">
              {t('visitBody')}
            </p>
            <Link
              href="/kontakt"
              className="mt-6 inline-block text-sm font-semibold text-moss underline underline-offset-4"
            >
              {tActions('contactUs')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
