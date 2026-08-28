'use client';

import {useTransition} from 'react';
import {useTranslations} from 'next-intl';
import {usePathname, useRouter} from '@/i18n/navigation';
import {routing, type Locale} from '@/i18n/routing';

export function LanguageSwitcher({locale}: {locale: Locale}) {
  const t = useTranslations('language');
  const router = useRouter();
  // Invisible behaviour, kept deliberately: on weak rural signal the switch
  // used to look broken, so the target locale is marked busy until it lands.
  const [isPending, startTransition] = useTransition();
  // None of our routes take dynamic segments, so the internal pathname alone
  // is enough to resolve the equivalent URL in another locale.
  const pathname = usePathname();

  return (
    <nav aria-label={t('label')} className="flex items-center gap-1">
      {routing.locales.map((code) => {
        const isActive = code === locale;

        return (
          <button
            key={code}
            type="button"
            lang={code}
            disabled={isPending || isActive}
            aria-current={isActive ? 'true' : undefined}
            onClick={() =>
              startTransition(() => {
                router.replace(pathname, {locale: code});
              })
            }
            className={
              isActive
                ? 'rounded-full bg-moss px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-cream'
                : 'rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-bark-soft transition hover:bg-sand hover:text-bark disabled:opacity-50'
            }
          >
            {code}
            <span className="sr-only"> – {t(code)}</span>
          </button>
        );
      })}
      {isPending ? (
        <span role="status" className="sr-only">
          {t('switching')}
        </span>
      ) : null}
    </nav>
  );
}
