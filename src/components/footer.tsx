import { getTranslations } from "next-intl/server";
import {
  TbBrandFacebook,
  TbBrandInstagram,
  TbMapPin,
  TbPhone,
} from "react-icons/tb";
import { Link } from "@/i18n/navigation";
import type { AppPathname } from "@/i18n/routing";
import { site, addressLine, telHref } from "@/content/site";
import { FooterRights } from "./footer-rights";

const footerNav: Array<{ href: AppPathname; key: string }> = [
  { href: "/o-nas", key: "about" },
  { href: "/ponuka", key: "services" },
  { href: "/ekovan", key: "ekovan" },
  { href: "/galeria", key: "gallery" },
  { href: "/kontakt", key: "contact" },
];

export async function SiteFooter() {
  const t = await getTranslations("footer");
  const tNav = await getTranslations("nav");

  const tel = telHref();

  return (
    <footer>
      <div className="border-t-2 border-emerald-deep bg-cream">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 sm:px-6 md:grid-cols-3 md:gap-10 md:py-12">
          <div>
            <p className="font-stencil text-lg text-charcoal">{site.name}</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-charcoal-soft">
              {t("tagline")}
            </p>

            <p className="mt-6 text-sm font-medium text-charcoal">
              {t.rich("fundingTitle", {
                tiLink: (chunks) => (
                  <a
                    href={site.funding.url}
                    target="_blank"
                    rel="noreferrer"
                    className="underline underline-offset-4 hover:text-emerald"
                  >
                    {chunks}
                  </a>
                ),
              })}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-6">
              <a
                href="https://www.kosickazupa.sk/"
                target="_blank"
                rel="noreferrer"
                className="inline-block transition hover:opacity-80"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/publicity/KSK_logo_hor_ver.png"
                  alt="Košický samosprávny kraj"
                  width={227}
                  height={58}
                  className="h-10 w-auto"
                />
              </a>
              <a
                href="https://www.kosiceregion.travel"
                target="_blank"
                rel="noreferrer"
                className="inline-block transition hover:opacity-80"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/publicity/kosice_region.png"
                  alt="Kosice Region"
                  width={558}
                  height={248}
                  className="h-9 w-auto"
                />
              </a>
            </div>
            <p className="mt-2 text-xs text-charcoal-soft">{t("kskSupport")}</p>
          </div>

          <nav aria-label={t("navTitle")}>
            <h2 className="text-sm font-semibold text-charcoal">{t("navTitle")}</h2>
            <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 md:block md:space-y-2">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-charcoal-soft transition hover:text-charcoal"
                  >
                    {tNav(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-semibold text-charcoal">
              {t("contactTitle")}
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-charcoal-soft">
              {tel ? (
                <li className="flex items-center gap-2">
                  <TbPhone
                    className="h-4 w-4 shrink-0 text-emerald"
                    aria-hidden="true"
                  />
                  <a href={tel} className="transition hover:text-charcoal">
                    {site.phone}
                  </a>
                </li>
              ) : null}
              {site.email ? (
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="transition hover:text-charcoal"
                  >
                    {site.email}
                  </a>
                </li>
              ) : null}
              <li className="flex items-center gap-2">
                <TbMapPin
                  className="h-4 w-4 shrink-0 text-emerald"
                  aria-hidden="true"
                />
                {addressLine()}
              </li>
            </ul>

            <h2 className="mt-6 text-sm font-semibold text-charcoal">
              {t("followTitle")}
            </h2>
            <ul className="mt-3 flex gap-4 text-sm">
              <li>
                <a
                  href={site.social.facebook}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="text-emerald transition hover:opacity-80"
                >
                  <TbBrandFacebook className="h-5 w-5" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href={site.social.instagram}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="text-emerald transition hover:opacity-80"
                >
                  <TbBrandInstagram className="h-5 w-5" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="mx-auto max-w-6xl px-5 py-4 text-xs text-charcoal-soft sm:px-6">
          <FooterRights buildYear={new Date().getFullYear()} />
        </p>
      </div>
    </footer>
  );
}
