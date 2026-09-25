import type { Metadata, ResolvingMetadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/metadata";
import { HeroSection } from "@/components/home/hero-section";
import { LogSpine } from "@/components/home/entry";
import { IntroEntry } from "@/components/home/intro-entry";
import { ServicesEntry } from "@/components/home/services-entry";
import { VisitEntry } from "@/components/home/visit-entry";
import { FaqEntry } from "@/components/home/faq-entry";
import { EkovanSection } from "@/components/home/ekovan-section";
import { SupportSection } from "@/components/home/support-section";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    ...(await buildMetadata({ locale, namespace: "meta", href: "/", parent })),
    title: t("title"),
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <LogSpine>
        <IntroEntry />
        <ServicesEntry />
        <VisitEntry />
        <FaqEntry />
      </LogSpine>
      <EkovanSection />
      <SupportSection />
    </>
  );
}
