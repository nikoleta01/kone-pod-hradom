import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Newsreader, Source_Sans_3 } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/footer";
import { StructuredData } from "@/components/structured-data";
import { siteUrl } from "@/lib/metadata";
import "../globals.css";

// `latin-ext` is required — Slovak (ď ľ ť ô ŕ) and Hungarian (ő ű) live there.
// Source Sans 3: a humanist sans whose warmth matches Newsreader without
// competing with it, and reads well at the small sizes of FAQ answers.
const body = Source_Sans_3({
  subsets: ["latin", "latin-ext"],
  variable: "--font-body",
  display: "swap",
});

// Newsreader carries every heading and label, chosen by the client. Variable
// weight plus the optical-size axis, so large headings get the finer cut and
// small labels the sturdier one. Never body copy. See DESIGN.md.
const display = Newsreader({
  subsets: ["latin", "latin-ext"],
  axes: ["opsz"],
  variable: "--font-display",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
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
    // Served straight from `public/` rather than through the app-dir icon
    // convention: the .ico carries a greyscale+alpha 256px entry that Next's
    // icon processing rejects ("PNG is not in RGBA format").
    icons: {
      icon: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
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
        <StructuredData locale={locale as Locale} />
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
