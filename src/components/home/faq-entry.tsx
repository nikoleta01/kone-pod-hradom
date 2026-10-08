import { getTranslations } from "next-intl/server";
import { TbBrandFacebook, TbBrandInstagram, TbPlus } from "react-icons/tb";
import { site } from "@/content/site";
import { Entry } from "./entry";
import { PhoneCard } from "./phone-card";

/** Anchor the hero's "Kontakt" button scrolls to: the phone and social links live here. */
export const CONTACT_ANCHOR = "kontakt";

/** Order is the order a parent tends to ask in on the phone. */
const FAQ_IDS = ["age", "parents", "clothes", "weather", "price", "groups"] as const;

/**
 * "Questions": a ruled page of questions. Native `<details>`, so it opens
 * without any JavaScript on weak signal and every answer stays in the HTML
 * for search engines.
 */
export async function FaqEntry() {
  const t = await getTranslations("faq");
  const tHome = await getTranslations("home");
  const tActions = await getTranslations("actions");

  return (
    <Entry id={CONTACT_ANCHOR}>
      <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:gap-12">
        <div>
          <h2 className="font-stencil text-3xl text-charcoal md:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 max-w-sm text-charcoal-soft">{t("lead")}</p>

          <div className="mt-8 flex flex-wrap items-start gap-x-8 gap-y-6">
            <PhoneCard label={tActions("call")} note={tHome("callNote")} />

            <div className="flex flex-col items-start gap-2">
              <div className="-ml-1 flex h-14 items-center gap-3">
                <a
                  href={site.social.facebook}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="p-1 text-emerald transition hover:text-emerald-deep"
                >
                  <TbBrandFacebook className="h-7 w-7" aria-hidden="true" />
                </a>
                <a
                  href={site.social.instagram}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="p-1 text-emerald transition hover:text-emerald-deep"
                >
                  <TbBrandInstagram className="h-7 w-7" aria-hidden="true" />
                </a>
              </div>
              <p className="text-sm text-charcoal-soft">{tHome("orFollow")}</p>
            </div>
          </div>
        </div>

        <div className="divide-y divide-brown/25 border-y border-brown">
          {FAQ_IDS.map((id) => (
            <details key={id} className="group">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-4 text-left [&::-webkit-details-marker]:hidden">
                <span className="font-stencil text-xl text-charcoal">
                  {t(`items.${id}.q`)}
                </span>
                <TbPlus
                  className="mt-1 h-5 w-5 shrink-0 text-emerald transition-transform group-open:rotate-45 motion-reduce:transition-none"
                  aria-hidden="true"
                />
              </summary>
              <p className="max-w-xl pb-5 leading-relaxed text-charcoal-soft">
                {t(`items.${id}.a`)}
              </p>
            </details>
          ))}
        </div>
      </div>
    </Entry>
  );
}
