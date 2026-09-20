import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Inter, Big_Shoulders_Stencil } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/footer";
import { siteUrl } from "@/lib/metadata";
import "../globals.css";

// `latin-ext` is required — Slovak (ď ľ ť ô ŕ) and Hungarian (ő ű) live there.
const body = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-body",
  display: "swap",
});

// The stencil face carries card headers and dated field-entry labels — the
// world's own "stamped" lettering, never body copy. See DESIGN.md.
const display = Big_Shoulders_Stencil({
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
  fallback: ["Arial Narrow", "Arial", "sans-serif"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: t("title"),
      template: `%s | ${t("siteName")}`,
    },
    description: t("description"),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Opts every page under this layout into static rendering.
  setRequestLocale(locale);

  return (
    <html lang={locale} className={`${body.variable} ${display.variable}`}>
      <body className="flex min-h-screen flex-col">
        <NextIntlClientProvider>
          <SiteHeader locale={locale as Locale} />
          <main id="obsah" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
