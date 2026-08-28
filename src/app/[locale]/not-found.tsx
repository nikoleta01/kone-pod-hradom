import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';

export default function NotFoundPage() {
  const t = useTranslations('notFound');
  const tActions = useTranslations('actions');

  return (
    <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6 md:py-28">
      <h1 className="font-serif text-4xl leading-tight text-bark md:text-5xl">
        {t('title')}
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-bark-soft">{t('body')}</p>
      <Link
        href="/"
        className="mt-8 inline-block rounded-full bg-moss px-6 py-3 text-sm font-semibold text-cream transition hover:bg-moss-dark"
      >
        {tActions('backHome')}
      </Link>
    </section>
  );
}
