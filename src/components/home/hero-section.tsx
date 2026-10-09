import { getTranslations } from "next-intl/server";
import { TbArrowDown } from "react-icons/tb";
import { CONTACT_ANCHOR } from "./faq-entry";
import { HeroVideo } from "./hero-video";
import { SERVICES_ANCHOR } from "./services-entry";

/**
 * The cover: the association's own footage as a full-bleed muted loop. The
 * footage stays untouched; only the text block sits on a semi-transparent
 * deep-green panel, the same device as the service cards' labels. On phones
 * the panel drops the eyebrow and the second sentence, keeping the title,
 * the one line saying who they are, and both buttons, so the video shows.
 */
export async function HeroSection() {
  const t = await getTranslations("home");
  const tActions = await getTranslations("actions");

  return (
    <section className="relative isolate overflow-hidden border-b border-emerald bg-emerald-deep">
      <HeroVideo />

      <div className="relative mx-auto flex max-w-6xl items-end px-4 pb-6 pt-56 sm:px-6 sm:pb-10 md:min-h-[40rem] md:items-center md:py-20">
        <div className="max-w-xl rounded-xl border border-emerald bg-emerald-deep/75 p-5 backdrop-blur-sm sm:p-8">
          <p className="hidden font-stencil text-sm font-semibold uppercase tracking-wide text-cream/80 sm:block">
            {t("heroEyebrow")}
          </p>
          <h1 className="font-stencil text-4xl leading-[1.05] text-cream sm:mt-3 sm:text-5xl md:text-6xl">
            {t("heroTitle")}
          </h1>
          <p className="mt-3 max-w-md text-base leading-snug text-cream/90 sm:mt-5">
            {t("thesis")}
          </p>
          <p className="mt-6 hidden text-lg leading-relaxed text-cream/90 sm:block md:text-xl">
            {t("heroSubtitle")}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3 sm:mt-10">
            <a
              href={`#${SERVICES_ANCHOR}`}
              className="inline-flex items-center gap-2.5 rounded-full border border-emerald-deep bg-emerald px-4 py-2.5 text-base font-semibold sm:px-5 sm:py-3 sm:text-lg text-cream transition hover:bg-emerald-deep"
            >
              {t("heroCta")}
              <TbArrowDown className="h-5 w-5 shrink-0" aria-hidden="true" />
            </a>
            <a
              href={`#${CONTACT_ANCHOR}`}
              className="inline-flex items-center gap-2.5 rounded-full border border-emerald bg-cream px-4 py-2.5 text-base font-semibold sm:px-5 sm:py-3 sm:text-lg text-emerald transition hover:bg-emerald-soft hover:text-emerald-deep"
            >
              {tActions("contactUs")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
