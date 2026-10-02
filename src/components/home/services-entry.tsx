import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { featuredServiceIds, services } from "@/content/services";
import { photoById } from "@/content/photos";
import { Entry } from "./entry";

/** Anchor the hero's call to action scrolls to. */
export const SERVICES_ANCHOR = "zazitky";

/** "Programmes": the ruled service checklist. */
export async function ServicesEntry() {
  const t = await getTranslations("home");
  const tActions = await getTranslations("actions");
  const tServices = await getTranslations("services");
  const tGallery = await getTranslations("gallery");

  const featured = featuredServiceIds
    .map((id) => services.find((service) => service.id === id))
    .filter((service): service is NonNullable<typeof service> =>
      Boolean(service),
    );

  const childrenPhoto = photoById("deti-v-prirode");

  return (
    <Entry id={SERVICES_ANCHOR}>
      <h2 className="font-stencil text-3xl text-charcoal md:text-4xl">
        {t("servicesTitle")}
      </h2>
      <p className="mt-3 max-w-xl text-charcoal-soft">
        {t("servicesSubtitle")}
      </p>

      <div className="mt-8 grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-start md:gap-12">
        <ul>
          {featured.map((service, index) => (
            <li
              key={service.id}
              className={`border-brown/25 py-5 ${
                index === 0 ? "" : "border-t"
              }`}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="font-stencil text-xl text-charcoal">
                  {tServices(`items.${service.id}.title`)}
                </h3>
                {service.ageRange ? (
                  <span className="rounded-xl bg-emerald-soft px-2.5 py-0.5 text-xs font-medium text-emerald-deep">
                    {tServices("ageValue", {
                      min: service.ageRange.min,
                      max: service.ageRange.max,
                    })}
                  </span>
                ) : null}
              </div>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-charcoal-soft">
                {tServices(`items.${service.id}.description`)}
              </p>
              {service.id === "workshopy" ? (
                <p className="mt-2 text-xs font-medium text-brown">
                  {t("workshopSchedule")}
                </p>
              ) : null}
            </li>
          ))}
        </ul>

        {childrenPhoto ? (
          <div className="overflow-hidden rounded-xl border-2 border-emerald">
            <Image
              src={childrenPhoto.src}
              alt={tGallery("photos.deti-v-prirode")}
              width={childrenPhoto.width}
              height={childrenPhoto.height}
              sizes="(min-width: 768px) 40vw, 90vw"
              className="h-auto w-full object-cover"
            />
          </div>
        ) : null}
      </div>

      <Link
        href="/ponuka"
        className="mt-8 inline-block text-sm font-semibold text-emerald underline underline-offset-4 hover:text-emerald-deep"
      >
        {tActions("seeOffer")}
      </Link>
    </Entry>
  );
}
