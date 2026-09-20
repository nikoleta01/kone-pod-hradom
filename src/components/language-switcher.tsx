'use client';

import {useState, useTransition} from 'react';
import {useTranslations} from 'next-intl';
import {usePathname, useRouter} from '@/i18n/navigation';
import {routing, type Locale} from '@/i18n/routing';

/**
 * Collapsed to just the active locale until it "unpacks" the other two —
 * on hover for a mouse/trackpad, or a tap on touch, where :hover never
 * reliably fires. Both mechanisms are wired at once (CSS group-hover plus
 * a click-toggled `open` state) rather than detecting device type, since
 * a real touchscreen won't trigger the hover styles anyway.
 *
 * The component's own footprint in the header's flex row never changes
 * size (an invisible spacer reserves it) — the unpacked pills render in an
 * absolutely positioned layer on top, anchored to the same spot and
 * growing to the left, so neighbouring header items (the mobile menu
 * button in particular) never shift.
 */
export function LanguageSwitcher({locale}: {locale: Locale}) {
  const t = useTranslations('language');
  const router = useRouter();
  // Invisible behaviour, kept deliberately: on weak rural signal the switch
  // used to look broken, so the target locale is marked busy until it lands.
  const [isPending, startTransition] = useTransition();
  // None of our routes take dynamic segments, so the internal pathname alone
  // is enough to resolve the equivalent URL in another locale.
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const inactiveLocales = routing.locales.filter((code) => code !== locale);

  function select(code: Locale) {
    setOpen(false);
    startTransition(() => {
      router.replace(pathname, {locale: code});
    });
  }

  return (
    <div
      data-expanded={open ? 'true' : undefined}
      className="group/lang relative"
    >
      {/* Reserves the switcher's permanent size in the header's layout. */}
      <span
        aria-hidden="true"
        className="invisible block rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide"
      >
        {locale}
      </span>

      <nav
        aria-label={t('label')}
        className="absolute right-0 top-0 flex items-center gap-1"
      >
        {inactiveLocales.map((code, index) => (
          <div
            key={code}
            style={{transitionDelay: `${index * 60}ms`}}
            className="grid grid-cols-[0fr] opacity-0 transition-[grid-template-columns,opacity] duration-300 ease-out group-hover/lang:grid-cols-[1fr] group-hover/lang:opacity-100 group-data-[expanded=true]/lang:grid-cols-[1fr] group-data-[expanded=true]/lang:opacity-100"
          >
            <div className="min-w-0 overflow-hidden">
              <button
                type="button"
                lang={code}
                disabled={isPending}
                onClick={() => select(code)}
                className="rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-charcoal-soft transition hover:bg-emerald-soft hover:text-emerald-deep disabled:opacity-50"
              >
                {code}
                <span className="sr-only"> – {t(code)}</span>
              </button>
            </div>
          </div>
        ))}

        <button
          type="button"
          lang={locale}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="rounded-full bg-emerald px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-cream"
        >
          {locale}
          <span className="sr-only"> – {t(locale)}</span>
        </button>
      </nav>

      {isPending ? (
        <span role="status" className="sr-only">
          {t('switching')}
        </span>
      ) : null}
    </div>
  );
}
