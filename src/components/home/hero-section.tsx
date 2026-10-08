import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { TbArrowDown } from "react-icons/tb";
import { photoById } from "@/content/photos";
import { CONTACT_ANCHOR } from "./faq-entry";
import { SERVICES_ANCHOR } from "./services-entry";

/** Cover entry — the field card the whole log opens on. */
export async function HeroSection() {
  const t = await getTranslations("home");
  const tActions = await getTranslations("actions");
  const tGallery = await getTranslations("gallery");

  const castlePhoto = photoById("zima-pod-hradom");

  return (
    <section className="border-b border-emerald bg-card">
      <div className="mx-auto grid max-w-6xl items-stretch gap-10 px-4 py-16 sm:px-6 md:grid-cols-[1.05fr_0.95fr] md:gap-0 md:py-0">
        <div className="flex flex-col justify-center md:py-20">
          <p className="font-stencil text-sm font-semibold uppercase tracking-wide text-emerald">
            {t("heroEyebrow")}
          </p>
          <h1 className="mt-3 max-w-xl font-stencil text-5xl leading-[1.05] text-charcoal md:text-6xl">
            {t("heroTitle")}
          </h1>
          <p className="mt-5 max-w-md text-base leading-snug text-brown">
            {t("thesis")}
          </p>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-charcoal-soft md:text-xl">
            {t("heroSubtitle")}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href={`#${SERVICES_ANCHOR}`}
              className="inline-flex items-center gap-2.5 rounded-full border border-emerald-deep bg-emerald px-5 py-3 text-lg font-semibold text-cream transition hover:bg-emerald-deep"
            >
              {t("heroCta")}
              <TbArrowDown className="h-5 w-5 shrink-0" aria-hidden="true" />
            </a>
            <a
              href={`#${CONTACT_ANCHOR}`}
              className="inline-flex items-center gap-2.5 rounded-full border border-emerald bg-cream px-5 py-3 text-lg font-semibold text-emerald transition hover:bg-emerald-soft hover:text-emerald-deep"
            >
              {tActions("contactUs")}
            </a>
          </div>
        </div>

        {castlePhoto ? (
          <div className="relative -mx-4 h-64 sm:-mx-6 sm:h-80 md:mx-0 md:h-auto md:pb-10">
            <Image
              src={castlePhoto.src}
              alt={tGallery("photos.zima-pod-hradom")}
              fill
              sizes="(min-width: 768px) 45vw, 100vw"
              priority
              className="hero-photo-fade object-cover"
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}
