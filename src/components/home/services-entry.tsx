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
import { SwipeDots } from "./swipe-dots";

/** Anchor the hero's call to action scrolls to. */
export const SERVICES_ANCHOR = "zazitky";

const ROW_ID = "zazitky-karty";

/**
 * Grid placement for five cards, so no row ends with a lone card: on a
 * tablet the first card spans the full width above two pairs; on desktop a
 * six-column grid fits three cards on top and two wider ones below. On a
 * phone there is no grid: the cards are one swipeable row (see the list).
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

      {/*
        On a phone the cards are one row you swipe through, snapping card by
        card, with the next one peeking in at the edge so the swipe is
        obvious. The row bleeds to the screen edges (-mx-4) and keeps the
        page gutter as its own padding. From sm up it is the grid.
      */}
      <ul
        id={ROW_ID}
        className="-mx-4 mt-8 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-6 [&::-webkit-scrollbar]:hidden">
        {featured.map((service, index) => {
          const photo = photoById(service.photoId ?? fallbackPhotoId);
          const zoom =
            "transition-transform duration-700 ease-out group-hover:scale-105 group-focus-visible:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100 motion-reduce:group-focus-visible:scale-100";
          const wide = index === 0 || index >= 3;

          return (
            <li
              key={service.id}
              className={`w-[82%] shrink-0 snap-start sm:w-auto ${PLACEMENT[index] ?? ""}`}
            >
              <Link
                href={service.href}
                className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-emerald sm:block sm:h-72 sm:bg-emerald-deep lg:h-80"
              >
                {/*
                  On a phone the photo has its own 4:3 slot and nothing
                  covers it. From sm up it fills the card under the band.
                */}
                <div className="relative aspect-[4/3] shrink-0 overflow-hidden bg-emerald-deep sm:absolute sm:inset-0 sm:aspect-auto">
                  {photo ? (
                    <Image
                      src={photo.src}
                      alt=""
                      fill
                      sizes={
                        wide
                          ? "(min-width: 1024px) 50vw, (min-width: 640px) 100vw, 82vw"
                          : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 82vw"
                      }
                      placeholder={photo.blurDataURL ? "blur" : "empty"}
                      blurDataURL={photo.blurDataURL}
                      className={`object-cover object-bottom ${zoom}`}
                      style={
                        photo.position
                          ? { objectPosition: photo.position }
                          : undefined
                      }
                    />
                  ) : null}
                </div>

                {service.ageRange ? (
                  <span className="absolute right-4 top-4 rounded-xl bg-cream/90 px-2.5 py-0.5 text-xs font-medium text-emerald-deep">
                    {tServices("ageValue", {
                      min: service.ageRange.min,
                      max: service.ageRange.max,
                    })}
                  </span>
                ) : null}

                {/*
                  Styled like the hero's green panel (see-through fill, blur
                  and emerald rule). On a phone it sits under the photo on
                  the page ground; from sm up it is a band over the photo's
                  bottom edge. Over the photo it is the hero's 75%, so the
                  image shows through; on the plain page ground 75% turns
                  grey, so a phone gets 90%. The photo's zoom is the hover
                  feedback.
                */}
                <div className="flex flex-1 flex-col justify-center border-t border-emerald bg-emerald-deep/90 px-4 py-3 sm:bg-emerald-deep/75 text-center text-cream backdrop-blur-sm sm:absolute sm:inset-x-0 sm:bottom-0 sm:block sm:px-6 sm:py-5">
                  <h3 className="font-stencil text-2xl leading-tight sm:text-3xl">
                    {tServices(`items.${service.id}.title`)}
                  </h3>
                  {/* A phone gets the one-line version, so the panel stays thin. */}
                  <p className="mt-1 truncate text-sm leading-snug text-cream/90 sm:hidden">
                    {tServices(`items.${service.id}.short`)}
                  </p>
                  <p className="mt-2 hidden text-sm leading-snug text-cream/90 sm:block">
                    {tServices(`items.${service.id}.description`)}
                  </p>
                  {service.id === "workshopy" ? (
                    <p className="mt-2 text-xs font-semibold text-cream">
                      {t("workshopSchedule")}
                    </p>
                  ) : null}
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
      <SwipeDots
        listId={ROW_ID}
        labels={featured.map((service) =>
          tServices(`items.${service.id}.title`),
        )}
      />
    </Entry>
  );
}
