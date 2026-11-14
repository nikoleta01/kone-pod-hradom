import { getTranslations } from "next-intl/server";
import { TbArrowDown } from "react-icons/tb";
import { CONTACT_ANCHOR } from "./faq-entry";
import { HeroVideo } from "./hero-video";
import { SERVICES_ANCHOR } from "./services-entry";

/**
 * The cover: the association's own footage as a muted loop. The footage
 * stays untouched; the text sits on a semi-transparent deep-green panel, the
 * same device as the service cards' labels.
 *
 * The text keeps out of the footage's way. From md up it is a band along the
 * bottom of the frame, where the shots are mostly ground, so the horses and
 * the sky stay clear; from lg up the band lays the title and the buttons side
 * by side to keep it flat. On phones the video gets its own strip at the top
 * and the text follows below it, covering none of it. There the panel sits
 * on the section's own green, so it drops its border.
 */
export async function HeroSection() {
  const t = await getTranslations("home");
  const tActions = await getTranslations("actions");

  return (
    <section className="relative isolate overflow-hidden border-b border-emerald bg-emerald-deep">
      <div className="relative h-72 sm:h-96 md:absolute md:inset-0 md:h-auto">
        <HeroVideo />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-5 sm:px-6 sm:py-6 md:flex md:min-h-[40rem] md:items-end md:pb-8 md:pt-20">
        <div className="rounded-xl bg-emerald-deep/75 md:border md:border-emerald p-5 backdrop-blur-sm sm:p-8 md:w-full md:px-8 md:py-6 lg:flex lg:items-center lg:justify-between lg:gap-8">
          <div className="min-w-0">
            <h1 className="font-stencil text-4xl leading-[1.05] text-cream sm:text-5xl">
              {t("heroTitle")}
            </h1>
            <p className="mt-3 max-w-lg text-base leading-snug text-cream/90 md:text-lg">
              {t("thesis")}
            </p>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3 lg:mt-0 lg:shrink-0 lg:flex-nowrap">
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
