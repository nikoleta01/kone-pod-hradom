import { getTranslations } from "next-intl/server";
import { TbBrandFacebook, TbBrandInstagram, TbMapPin } from "react-icons/tb";
import { site, addressLine } from "@/content/site";
import { Entry, EntryDot } from "./entry";
import { PhoneCard } from "./phone-card";

/** "Come visit" — the closing entry on the spine. */
export async function VisitEntry() {
  const t = await getTranslations("home");
  const tActions = await getTranslations("actions");

  return (
    <Entry>
      <EntryDot />
      <h2 className="font-stencil text-3xl text-charcoal md:text-4xl">
        {t("visitTitle")}
      </h2>
      <div className="mt-4 grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-start md:gap-12">
        <div>
          <p className="max-w-xl text-lg leading-relaxed text-charcoal-soft">
            {t("visitBody")}
          </p>
          <p className="mt-4 flex items-center gap-2 text-sm text-charcoal-soft">
            <TbMapPin
              className="h-4 w-4 shrink-0 text-emerald"
              aria-hidden="true"
            />
            {addressLine()}
          </p>
          <p className="mt-6 text-sm font-medium text-charcoal-soft">
            {t("orFollow")}
          </p>
          <div className="mt-2 flex gap-4">
            <a
              href={site.social.facebook}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="text-emerald transition hover:text-emerald-deep"
            >
              <TbBrandFacebook className="h-5 w-5" aria-hidden="true" />
            </a>
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="text-emerald transition hover:text-emerald-deep"
            >
              <TbBrandInstagram className="h-5 w-5" aria-hidden="true" />
            </a>
          </div>
        </div>
        <PhoneCard label={tActions("call")} note={t("callNote")} />
      </div>
    </Entry>
  );
}
