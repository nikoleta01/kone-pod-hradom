import type {Metadata} from 'next';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import type {Locale} from '@/i18n/routing';
import {PageHeader} from '@/components/page-header';
import {ekovanParts} from '@/content/services';
import {buildMetadata} from '@/lib/metadata';

type Props = {params: Promise<{locale: Locale}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  return buildMetadata({locale, namespace: 'ekovan', href: '/ekovan'});
}

export default async function EkovanPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  const t = await getTranslations('ekovan');

  return (
    <>
      <PageHeader title={t('title')} lead={t('lead')} />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
        <p className="max-w-2xl text-lg leading-relaxed text-charcoal-soft">
          {t('body')}
        </p>

        <h2 className="mt-16 font-serif text-3xl text-charcoal md:text-4xl">
          {t('partsTitle')}
        </h2>

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ekovanParts.map((part, index) => (
            <li
              key={part}
              className="rounded-2xl border border-brown bg-card/25 p-6"
            >
              <p
                aria-hidden="true"
                className="font-serif text-2xl text-brown"
              >
                {String(index + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-2 font-serif text-xl text-charcoal">
                {t(`parts.${part}.title`)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal-soft">
                {t(`parts.${part}.description`)}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-brown bg-card/30">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="font-serif text-2xl text-charcoal">{t('statusTitle')}</h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-charcoal-soft">
            {t('statusBody')}
          </p>
        </div>
      </section>
    </>
  );
}
