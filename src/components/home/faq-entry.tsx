import { getTranslations } from "next-intl/server";
import { TbPlus } from "react-icons/tb";
import { Entry } from "./entry";

/** Order is the order a parent tends to ask in on the phone. */
const FAQ_IDS = ["age", "parents", "clothes", "weather", "price", "groups"] as const;

/**
 * "Questions" — a ruled page of questions. Native `<details>`, so it opens
 * without any JavaScript on weak signal and every answer stays in the HTML
 * for search engines.
 */
export async function FaqEntry() {
  const t = await getTranslations("faq");

  return (
    <Entry>
      <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:gap-12">
        <div>
          <h2 className="font-stencil text-3xl text-charcoal md:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 max-w-sm text-charcoal-soft">{t("lead")}</p>
        </div>

        <div className="divide-y divide-brown/25 border-y-2 border-brown">
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
