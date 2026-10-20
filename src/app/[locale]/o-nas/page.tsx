import type {Metadata, ResolvingMetadata} from 'next';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import type {Locale} from '@/i18n/routing';
import {PageHeader} from '@/components/page-header';
import {buildMetadata} from '@/lib/metadata';

type Props = {params: Promise<{locale: Locale}>};

export async function generateMetadata(
  {params}: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const {locale} = await params;
  return buildMetadata({locale, namespace: 'about', href: '/o-nas', parent});
}

export default async function AboutPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  const t = await getTranslations('about');

  const values = [
    {title: t('value1Title'), body: t('value1Body')},
    {title: t('value2Title'), body: t('value2Body')},
    {title: t('value3Title'), body: t('value3Body')}
  ];

  return (
    <>
      <PageHeader
        title={t('title')}
        lead={t('lead')}
        photoId="child"
        photoPosition="50% 40%"
      />

      <section className="mx-auto max-w-6xl px-4 pb-16 pt-8 sm:px-6 md:pb-20 md:pt-12">
        <div className="grid gap-6 md:grid-cols-2 md:gap-16">
          <p className="text-lg leading-relaxed text-charcoal-soft">{t('body1')}</p>
          <p className="text-lg leading-relaxed text-charcoal-soft">{t('body2')}</p>
        </div>
      </section>

      <section className="border-t border-brown bg-card/30">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
          <h2 className="font-serif text-3xl text-charcoal md:text-4xl">
            {t('valuesTitle')}
          </h2>
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {values.map((value) => (
              <li
                key={value.title}
                className="rounded-xl border border-brown bg-cream p-6"
              >
                <h3 className="font-serif text-xl text-charcoal">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal-soft">
                  {value.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
