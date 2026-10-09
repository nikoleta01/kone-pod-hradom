"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { TbMenu2, TbX } from "react-icons/tb";
import { Link, usePathname } from "@/i18n/navigation";
import type { AppPathname, Locale } from "@/i18n/routing";
import { HorseshoeMark } from "./horseshoe-mark";
import { LanguageSwitcher } from "./language-switcher";

const navItems: Array<{ href: AppPathname; key: string }> = [
  { href: "/o-nas", key: "about" },
  { href: "/ponuka", key: "services" },
  { href: "/ekovan", key: "ekovan" },
  { href: "/galeria", key: "gallery" },
  { href: "/kontakt", key: "contact" },
];

export function SiteHeader({ locale }: { locale: Locale }) {
  const t = useTranslations("nav");
  const tMeta = useTranslations("meta");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Invisible behaviour, kept deliberately: Escape closes the panel and
  // returns focus to the toggle, and the page behind cannot scroll away.
  useEffect(() => {
    if (!open) return;

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    }

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-brown/25 bg-cream/95 backdrop-blur">
      <a
        href="#obsah"
        className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-10 focus:rounded-full focus:bg-charcoal focus:px-3 focus:py-2 focus:text-sm focus:font-semibold focus:text-cream"
      >
        {t("skipToContent")}
      </a>

      <div className="mx-auto flex max-w-6xl items-center justify-between gap-5 px-4 py-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2.5"
          onClick={() => setOpen(false)}
        >
          {/*
            The castle mark is drawn through a CSS mask so it takes theme
            colors: brown while it stands alone on a phone, charcoal to
            match the site name once that appears beside it.
          */}
          <span
            aria-hidden="true"
            className="block aspect-[1292/685] h-10 shrink-0 bg-brown sm:bg-charcoal"
            style={{
              WebkitMask: "url(/logo.svg) center / contain no-repeat",
              mask: "url(/logo.svg) center / contain no-repeat",
            }}
          />
          {/*
            Below sm the castle mark stands alone: the name, the unpacked
            language pills and the menu button don't fit one row on a phone.
            It stays in the accessibility tree so the home link keeps a name.
          */}
          <span className="sr-only font-stencil text-xl font-semibold leading-tight text-charcoal sm:not-sr-only">
            {tMeta("siteName")}
          </span>
        </Link>

        <nav aria-label={t("menu")} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={
                      isActive
                        ? "group flex items-center gap-1.5 rounded-full border border-emerald-deep bg-emerald-soft py-1.5 pl-2 pr-3 text-sm font-medium text-emerald-deep"
                        : "group flex items-center gap-1.5 rounded-full border border-transparent py-1.5 pl-2 pr-3 text-sm font-medium text-charcoal-soft transition hover:bg-emerald-soft/60 hover:text-emerald-deep"
                    }
                  >
                    {/*
                      Every link carries the horseshoe's slot, so labels never
                      shift between pages. Current page: the full horseshoe.
                      Hover: a faint one, previewing the current-page look.
                    */}
                    <HorseshoeMark
                      className={`h-[18px] w-[18px] shrink-0 -rotate-[15deg] transition-opacity ${
                        isActive ? "opacity-100" : "opacity-0 group-hover:opacity-40"
                      }`}
                      holeClassName={isActive ? "fill-emerald-soft" : "fill-cream"}
                    />
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
            aria-label={open ? t("close") : t("menu")}
            className="p-1.5 text-charcoal lg:hidden"
          >
            {open ? (
              <TbX className="h-6 w-6" aria-hidden="true" />
            ) : (
              <TbMenu2 className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          aria-label={t("menu")}
          // Overlays the page from under the header instead of joining the
          // flow, so opening the menu never pushes the content down.
          className="absolute inset-x-0 top-full max-h-[calc(100dvh-100%)] overflow-y-auto border-y border-brown/30 bg-cream lg:hidden"
        >
          <ul className="mx-auto max-w-6xl px-4 py-2 sm:px-6">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className={`flex items-center gap-2 border-b border-brown/25 py-3 text-base last:border-none ${
                    pathname === item.href
                      ? "font-medium text-emerald-deep"
                      : "pl-7 text-charcoal"
                  }`}
                >
                  {pathname === item.href ? (
                    <HorseshoeMark className="h-5 w-5 shrink-0 -rotate-[15deg]" />
                  ) : null}
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
