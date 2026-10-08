import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  fallbackPhotoId,
  featuredServiceIds,
  services,
} from "@/content/services";
import { photoById } from "@/content/photos";
import { Entry } from "./entry";

/** Anchor the hero's call to action scrolls to. */
export const SERVICES_ANCHOR = "zazitky";

/**
 * Grid placement for five cards, so no row ends with a lone card: on a
 * tablet the first card spans the full width above two pairs; on desktop a
 * six-column grid fits three cards on top and two wider ones below.
 */
const PLACEMENT = [
  "sm:col-span-2 lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-3",
  "lg:col-span-3",
];

/** "Programmes": photo cards, one per featured service. */
export async function ServicesEntry() {
  const t = await getTranslations("home");
  const tServices = await getTranslations("services");

  const featured = featuredServiceIds
    .map((id) => services.find((service) => service.id === id))
    .filter((service): service is NonNullable<typeof service> =>
      Boolean(service),
    );

  return (
    <Entry id={SERVICES_ANCHOR}>
      <h2 className="font-stencil text-3xl text-charcoal md:text-4xl">
        {t("servicesTitle")}
      </h2>
      <p className="mt-3 max-w-xl text-charcoal-soft">
        {t("servicesSubtitle")}
      </p>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
        {featured.map((service, index) => {
          const photo = photoById(service.photoId ?? fallbackPhotoId);
          const zoom =
            "transition-transform duration-700 ease-out group-hover:scale-105 group-focus-visible:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100 motion-reduce:group-focus-visible:scale-100";
          const wide = index === 0 || index >= 3;

          return (
            <li key={service.id} className={PLACEMENT[index] ?? ""}>
              <Link
                href={service.href}
                className="group relative block h-72 overflow-hidden rounded-xl border border-brown bg-emerald-deep lg:h-80"
              >
                {photo ? (
                  <Image
                    src={photo.src}
                    alt=""
                    fill
                    sizes={
                      wide
                        ? "(min-width: 1024px) 50vw, 100vw"
                        : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    }
                    className={`object-cover ${zoom}`}
                  />
                ) : null}

                {service.ageRange ? (
                  <span className="absolute right-4 top-4 rounded-xl bg-cream/90 px-2.5 py-0.5 text-xs font-medium text-emerald-deep">
                    {tServices("ageValue", {
                      min: service.ageRange.min,
                      max: service.ageRange.max,
                    })}
                  </span>
                ) : null}

                {/*
                  The photo stays fully visible; the text sits on one
                  centered, semi-transparent label, as in the association's
                  own programme cards. It firms up on hover.
                */}
                <div className="absolute inset-0 flex items-center justify-center p-5">
                  <div className="w-full max-w-sm rounded-xl bg-emerald-deep/80 px-5 py-5 text-center text-cream backdrop-blur-[2px] transition-colors duration-500 group-hover:bg-emerald-deep/90 group-focus-visible:bg-emerald-deep/90 motion-reduce:transition-none sm:px-6">
                    <h3 className="font-stencil text-2xl uppercase leading-tight tracking-wide">
                      {tServices(`items.${service.id}.title`)}
                    </h3>
                    <p className="mt-2 text-sm leading-snug text-cream/90">
                      {tServices(`items.${service.id}.description`)}
                    </p>
                    {service.id === "workshopy" ? (
                      <p className="mt-2 text-xs font-semibold text-cream">
                        {t("workshopSchedule")}
                      </p>
                    ) : null}
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </Entry>
  );
}
