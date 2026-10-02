import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import { TbCar, TbExternalLink, TbMapPin, TbRoute } from "react-icons/tb";
import { addressLine, mapEmbedSrc, mapHref } from "@/content/site";
import { Entry } from "./entry";

/** One ruled cell of the "how to find us" card. */
function VisitCell({
  icon,
  label,
  children,
}: {
  icon: ReactNode;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="p-5 sm:p-6">
      <h3 className="flex items-center gap-2 font-stencil text-xl text-charcoal">
        {icon}
        {label}
      </h3>
      <div className="mt-2 text-sm leading-relaxed text-charcoal-soft">
        {children}
      </div>
    </div>
  );
}

/**
 * "Come visit": the map, address, the way there and where to park.
 * Visitors arrive by car, often straight from the castle, so the address
 * also links out to the phone's own maps app for directions.
 */
export async function VisitEntry() {
  const t = await getTranslations("home");
  const iconClass = "h-5 w-5 shrink-0 text-emerald";

  return (
    <Entry>
      <h2 className="font-stencil text-3xl text-charcoal md:text-4xl">
        {t("visitTitle")}
      </h2>
      <p className="mt-4 max-w-xl text-lg leading-relaxed text-charcoal-soft">
        {t("visitBody")}
      </p>

      <div className="mt-8 isolate overflow-hidden rounded-xl border-2 border-brown bg-card">
        <iframe
          src={mapEmbedSrc()}
          title={t("visitMapTitle")}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="block h-72 w-full rounded-t-[10px] border-b-2 border-brown md:h-96"
        />
        <div className="grid divide-y-2 divide-brown/25 md:grid-cols-3 md:divide-x-2 md:divide-y-0">
          <VisitCell
            icon={<TbMapPin className={iconClass} aria-hidden="true" />}
            label={t("visitAddressLabel")}
          >
            <p>{addressLine()}</p>
            <a
              href={mapHref()}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 font-semibold text-emerald underline underline-offset-4 hover:text-emerald-deep"
            >
              {t("visitMapLink")}
              <TbExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </VisitCell>
          <VisitCell
            icon={<TbRoute className={iconClass} aria-hidden="true" />}
            label={t("visitRouteLabel")}
          >
            <p>{t("visitRouteBody")}</p>
          </VisitCell>
          <VisitCell
            icon={<TbCar className={iconClass} aria-hidden="true" />}
            label={t("visitParkingLabel")}
          >
            <p>{t("visitParkingBody")}</p>
          </VisitCell>
        </div>
      </div>
    </Entry>
  );
}
