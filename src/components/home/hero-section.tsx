import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { photoById } from "@/content/photos";
import { PhoneCard } from "./phone-card";

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
          <p className="mt-5 max-w-md rotate-[-0.6deg] text-base leading-snug text-brown">
            {t("thesis")}
          </p>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-charcoal-soft md:text-xl">
            {t("heroSubtitle")}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <PhoneCard label={tActions("call")} note={t("callNote")} />
            <Link
              href="/ponuka"
              className="text-sm font-semibold text-emerald underline underline-offset-4 hover:text-emerald-deep"
            >
              {tActions("seeOffer")}
            </Link>
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
