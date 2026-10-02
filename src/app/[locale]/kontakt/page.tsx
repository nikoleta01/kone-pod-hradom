import type {Metadata, ResolvingMetadata} from 'next';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import type {Locale} from '@/i18n/routing';
import {PageHeader} from '@/components/page-header';
import {site, addressLine, telHref} from '@/content/site';
import {buildMetadata} from '@/lib/metadata';

type Props = {params: Promise<{locale: Locale}>};

export async function generateMetadata(
  {params}: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const {locale} = await params;
  return buildMetadata({locale, namespace: 'contact', href: '/kontakt', parent});
}

export default async function ContactPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  const t = await getTranslations('contact');
  const tel = telHref();

  return (
    <>
      <PageHeader title={t('title')} lead={t('lead')} />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <p className="text-lg leading-relaxed text-charcoal-soft">
              {t('body')}
            </p>

            <dl className="mt-10 space-y-6">
              <div>
                <dt className="text-sm font-semibold text-charcoal">
                  {t('phoneLabel')}
                </dt>
                <dd className="mt-1">
                  {tel ? (
                    <a
                      href={tel}
                      className="text-emerald underline underline-offset-4"
                    >
                      {site.phone}
                    </a>
                  ) : (
                    <span className="text-charcoal-soft">{t('phonePending')}</span>
                  )}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-charcoal">
                  {t('emailLabel')}
                </dt>
                <dd className="mt-1">
                  {site.email ? (
                    <a
                      href={`mailto:${site.email}`}
                      className="text-emerald underline underline-offset-4"
                    >
                      {site.email}
                    </a>
                  ) : (
                    <span className="text-charcoal-soft">{t('emailPending')}</span>
                  )}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-charcoal">
                  {t('addressLabel')}
                </dt>
                <dd className="mt-1 text-charcoal-soft">{addressLine()}</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-charcoal">
                  {t('socialLabel')}
                </dt>
                <dd className="mt-1 flex gap-4">
                  <a
                    href={site.social.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald underline underline-offset-4"
                  >
                    Facebook
                  </a>
                  <a
                    href={site.social.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald underline underline-offset-4"
                  >
                    Instagram
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <aside className="rounded-xl border border-brown bg-card/30 p-7">
            <h2 className="font-serif text-xl text-charcoal">{t('orgTitle')}</h2>
            <p className="mt-2 text-charcoal-soft">{t('orgName')}</p>
            <p className="mt-1 text-charcoal-soft">{addressLine()}</p>
            {/* TODO: add IČO / DIČ and an embedded map once we have them. */}
          </aside>
        </div>
      </section>
    </>
  );
}
