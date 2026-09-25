import { getTranslations } from "next-intl/server";
import { TbReceiptTax } from "react-icons/tb";
import { site } from "@/content/site";
import { DonationCard } from "./donation-card";

/**
 * "Support us" — the one full-bleed emerald band on the site. Colors invert
 * here (cream ink on emerald), but the structure stays the same: the ruled
 * top edge, and a dashed border for what is not ready yet, the same mark the
 * Ekovan loose page uses.
 */
export async function SupportSection() {
  const t = await getTranslations("support");

  return (
    <section
      aria-labelledby="support-title"
      className="border-t-2 border-emerald-deep bg-emerald text-cream"
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-[0.9fr_1.1fr] md:gap-14 md:py-20">
        <div>
          <p className="font-stencil text-sm font-semibold uppercase tracking-wide text-cream/80">
            {t("eyebrow")}
          </p>
          <h2
            id="support-title"
            className="mt-2 font-stencil text-3xl text-cream md:text-4xl"
          >
            {t("title")}
          </h2>
          <p className="mt-4 max-w-md text-lg leading-relaxed text-cream/90">
            {t("body")}
          </p>

          <div className="mt-10 rotate-[-1deg] rounded-2xl border-2 border-dashed border-cream/50 p-5 sm:p-6">
            <h3 className="flex items-center gap-2 font-stencil text-xl text-cream">
              <TbReceiptTax className="h-5 w-5 shrink-0" aria-hidden="true" />
              {t("taxTitle")}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-cream/90">
              {t("taxBody")}
            </p>
            {site.taxShare.registered && site.taxShare.ico ? (
              <p className="mt-3 text-sm font-semibold">
                {t("taxIco")}: <span className="tabular-nums">{site.taxShare.ico}</span>
              </p>
            ) : (
              <p className="mt-3 text-xs font-medium uppercase tracking-wide text-cream/70">
                {t("taxPending")}
              </p>
            )}
          </div>
        </div>

        <DonationCard
          iban={site.donation.iban}
          beneficiary={site.donation.beneficiary}
          paymentNote={site.donation.paymentNote}
          amounts={site.donation.amounts}
        />
      </div>
    </section>
  );
}
