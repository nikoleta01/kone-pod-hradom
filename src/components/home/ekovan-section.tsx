import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

/** Ekovan — a loose page tucked into the log, not yet bound into it. */
export async function EkovanSection() {
  const t = await getTranslations("home");
  const tActions = await getTranslations("actions");

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
      <div className="rotate-[-1deg] rounded-xl border border-dashed border-emerald/50 bg-card p-6 sm:ml-12 sm:p-8 md:ml-24">
        <p className="font-stencil text-xs font-semibold uppercase tracking-wide text-emerald">
          {t("ekovanLabel")}
        </p>
        <h2 className="mt-2 max-w-xl font-stencil text-2xl text-charcoal md:text-3xl">
          {t("ekovanTitle")}
        </h2>
        <p className="mt-3 max-w-xl leading-relaxed text-charcoal-soft">
          {t("ekovanBody")}
        </p>
        <Link
          href="/ekovan"
          className="mt-6 inline-block text-sm font-semibold text-emerald underline underline-offset-4 hover:text-emerald-deep"
        >
          {tActions("learnMore")}
        </Link>
      </div>
    </section>
  );
}
