'use client';

import {useEffect, useRef, useState} from 'react';
import {useTranslations} from 'next-intl';
import {Link, usePathname} from '@/i18n/navigation';
import type {AppPathname, Locale} from '@/i18n/routing';
import {LanguageSwitcher} from './language-switcher';

const navItems: Array<{href: AppPathname; key: string}> = [
  {href: '/o-nas', key: 'about'},
  {href: '/ponuka', key: 'services'},
  {href: '/ekovan', key: 'ekovan'},
  {href: '/galeria', key: 'gallery'},
  {href: '/rezervacia', key: 'booking'},
  {href: '/kontakt', key: 'contact'}
];

export function SiteHeader({locale}: {locale: Locale}) {
  const t = useTranslations('nav');
  const tMeta = useTranslations('meta');
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Invisible behaviour, kept deliberately: Escape closes the panel and
  // returns focus to the toggle, and the page behind cannot scroll away.
  useEffect(() => {
    if (!open) return;

    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    }

    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-cream/90 backdrop-blur">
      <a
        href="#obsah"
        className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-10 focus:rounded-full focus:bg-bark focus:px-3 focus:py-2 focus:text-sm focus:font-semibold focus:text-cream"
      >
        {t('skipToContent')}
      </a>

      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="font-serif text-lg font-semibold leading-tight text-bark"
          onClick={() => setOpen(false)}
        >
          {tMeta('siteName')}
        </Link>

        <nav aria-label={t('menu')} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? 'page' : undefined}
                    className={
                      isActive
                        ? 'rounded-full bg-sand px-3 py-2 text-sm font-medium text-bark'
                        : 'rounded-full px-3 py-2 text-sm font-medium text-bark-soft transition hover:bg-sand hover:text-bark'
                    }
                  >
                    {t(item.key)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher locale={locale} />
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="rounded-full border border-line px-3 py-2 text-sm font-medium text-bark lg:hidden"
          >
            {open ? t('close') : t('menu')}
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          aria-label={t('menu')}
          className="border-t border-line bg-cream lg:hidden"
        >
          <ul className="mx-auto max-w-6xl px-4 py-2 sm:px-6">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={pathname === item.href ? 'page' : undefined}
                  className="block border-b border-line/60 py-3 text-base text-bark last:border-none"
                >
                  {t(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
