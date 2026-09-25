import type {Metadata, ResolvingMetadata} from 'next';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import type {Locale} from '@/i18n/routing';
import {PageHeader} from '@/components/page-header';
import {services} from '@/content/services';
import {buildMetadata} from '@/lib/metadata';

type Props = {params: Promise<{locale: Locale}>};

export async function generateMetadata(
  {params}: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const {locale} = await params;
  return buildMetadata({locale, namespace: 'services', href: '/ponuka', parent});
}

export default async function ServicesPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  const t = await getTranslations('services');
  const tActions = await getTranslations('actions');

  return (
    <>
      <PageHeader title={t('title')} lead={t('lead')} />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
        <p className="max-w-2xl text-lg leading-relaxed text-charcoal-soft">
          {t('intro')}
        </p>

        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {services.map((service) => (
            <li
              key={service.id}
              className="flex flex-col rounded-2xl border border-brown bg-card/25 p-7"
            >
              <h2 className="font-serif text-2xl text-charcoal">
                {t(`items.${service.id}.title`)}
              </h2>
              <p className="mt-3 leading-relaxed text-charcoal-soft">
                {t(`items.${service.id}.description`)}
              </p>

              {/*
                Duration and capacity render only when the association has
                actually supplied them. They are not invented.
              */}
              <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm text-charcoal-soft">
                {service.ageRange ? (
                  <div>
                    <dt className="inline font-medium text-charcoal">
                      {t('ageLabel')}:{' '}
                    </dt>
                    <dd className="inline">
                      {t('ageValue', {
                        min: service.ageRange.min,
                        max: service.ageRange.max
                      })}
                    </dd>
                  </div>
                ) : null}
                {service.durationMinutes ? (
                  <div>
                    <dt className="inline font-medium text-charcoal">
                      {t('durationLabel')}:{' '}
                    </dt>
                    <dd className="inline">
                      {t('durationValue', {minutes: service.durationMinutes})}
                    </dd>
                  </div>
                ) : null}
                {service.capacity ? (
                  <div>
                    <dt className="inline font-medium text-charcoal">
                      {t('capacityLabel')}:{' '}
                    </dt>
                    <dd className="inline">
                      {t('capacityValue', {count: service.capacity})}
                    </dd>
                  </div>
                ) : null}
              </dl>

              <p className="mt-4 text-sm text-charcoal-soft">
                {t('priceOnRequest')}
              </p>

              {/* Swap this for a real booking button once `bookable` flips. */}
              <Link
                href="/kontakt"
                className="mt-6 inline-block self-start rounded-full border border-brown px-5 py-2.5 text-sm font-semibold text-charcoal transition hover:bg-card"
              >
                {tActions('contactUs')}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
