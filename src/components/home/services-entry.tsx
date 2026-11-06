import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { AppPathname } from "@/i18n/routing";
import {
  fallbackPhotoId,
  featuredServiceIds,
  photoShoots,
  services,
} from "@/content/services";
import { site } from "@/content/site";
import { photoById, type Photo } from "@/content/photos";
import { CardSlideshow } from "./card-slideshow";
import { Entry } from "./entry";
import { CardCarousel } from "./card-carousel";

/** Anchor the hero's call to action scrolls to. */
export const SERVICES_ANCHOR = "zazitky";

const ROW_ID = "zazitky-karty";

/**
 * Grid placement, so no row ends with a lone card. Six cards (the five
 * programmes plus the photo shoot offer) fill the grid evenly: three rows of
 * two on a tablet, two rows of three on desktop. Five cards (offer switched
 * off): on a tablet the first spans the full width above two pairs; on
 * desktop three on top and two wider ones below. On a phone there is no
 * grid: the cards are one swipeable row (see the list).
 */
const PLACEMENT: Record<number, string[]> = {
  5: [
    "sm:col-span-2 lg:col-span-2",
    "lg:col-span-2",
    "lg:col-span-2",
    "lg:col-span-3",
    "lg:col-span-3",
  ],
  6: Array(6).fill("lg:col-span-2"),
};

/** Image widths per placement, so no card downloads more than it shows. */
const SIZES = {
  wide: "(min-width: 1024px) 50vw, (min-width: 640px) 100vw, 72vw",
  narrow: "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 72vw",
};

type Card = {
  key: string;
  href: AppPathname;
  title: string;
  short: string;
  description: string;
  photos: Photo[];
  ageLabel?: string;
  /** Marks a new offer: a "Novinka" badge and a dashed outline. */
  isNew?: boolean;
  /** A line under the description, on every screen. */
  credit?: string;
};

/** "Programmes": photo cards, one per featured service, plus new offers. */
export async function ServicesEntry() {
  const t = await getTranslations("home");
  const tServices = await getTranslations("services");
  const tPhotoShoots = await getTranslations("photoShoots");

  const cards: Card[] = featuredServiceIds
    .map((id) => services.find((service) => service.id === id))
    .filter((service): service is NonNullable<typeof service> =>
      Boolean(service),
    )
    .map((service) => ({
      key: service.id,
      href: service.href,
      title: tServices(`items.${service.id}.title`),
      short: tServices(`items.${service.id}.short`),
      description: tServices(`items.${service.id}.description`),
      photos: [
        service.photoId ?? fallbackPhotoId,
        ...(service.extraPhotoIds ?? []),
      ]
        .map(photoById)
        .filter((photo): photo is Photo => Boolean(photo)),
      ageLabel: service.ageRange
        ? tServices("ageValue", {
            min: service.ageRange.min,
            max: service.ageRange.max,
          })
        : undefined,
    }));

  // The photo shoot offer joins as the sixth card while it is switched on.
  // It leads to the gallery, where the full offer and the call button are.
  if (photoShoots.active) {
    cards.push({
      key: "fotenie",
      href: "/galeria",
      title: tPhotoShoots("title"),
      short: tPhotoShoots("short"),
      description: tPhotoShoots("body"),
      photos: [photoById(photoShoots.photoIds[0])].filter(
        (photo): photo is Photo => Boolean(photo),
      ),
      isNew: true,
      credit: tPhotoShoots("photographer", { name: site.photographer.name }),
    });
  }

  const placement = PLACEMENT[cards.length] ?? [];

  return (
    <Entry id={SERVICES_ANCHOR}>
      <h2 className="font-stencil text-3xl text-charcoal md:text-4xl">
        {t("servicesTitle")}
      </h2>
      <p className="mt-3 max-w-xl text-charcoal-soft">
        {t("servicesSubtitle")}
      </p>

      {/*
        On a phone the cards are one row you swipe through: the card you are
        on snaps to the middle of the screen, with its neighbours peeking in
        either side. The row runs edge to edge (-mx-4), and its side padding
        (14vw) lets a 72vw card sit exactly in the middle, so even the first
        and last cards centre, with empty space on their outer side. It opens
        on the first card. From sm up it is the grid.
      */}
      <ul
        id={ROW_ID}
        className="-mx-4 mt-6 flex snap-x snap-mandatory gap-2 overflow-x-auto px-[14vw] py-2 [scrollbar-width:none] sm:mx-0 sm:mt-8 sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:px-0 sm:py-0 lg:grid-cols-6 [&::-webkit-scrollbar]:hidden">
        {cards.map((card, index) => {
          const [photo, ...extraPhotos] = card.photos;
          const zoom =
            "transition-transform duration-700 ease-out group-hover:scale-105 group-focus-visible:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100 motion-reduce:group-focus-visible:scale-100";
          const cardPlacement = placement[index] ?? "";
          const sizes = cardPlacement.includes("col-span-3") ||
            cardPlacement.includes("sm:col-span-2")
            ? SIZES.wide
            : SIZES.narrow;

          return (
            <li
              key={card.key}
              className={`w-[72vw] shrink-0 snap-center sm:w-auto ${cardPlacement}`}
            >
              <Link
                href={card.href}
                className={`group relative flex h-full flex-col overflow-hidden rounded-xl border border-brown/40 bg-card transition-[transform,opacity] duration-75 ${
                  // The site's "new, being tried" mark, as on the Ekovan
                  // page. Not on a phone, where the swipe row would clip it.
                  card.isNew
                    ? "sm:outline-2 sm:outline-offset-4 sm:outline-emerald sm:outline-dashed"
                    : ""
                }`}
              >
                {/*
                  The photo has its own slot at the top and nothing covers
                  it: 6:5 on a phone, a fixed height from sm up so cards of
                  different widths still line up.
                */}
                <div className="relative aspect-[6/5] shrink-0 overflow-hidden bg-emerald-deep sm:aspect-auto sm:h-52 lg:h-56">
                  {photo && extraPhotos.length > 0 ? (
                    <CardSlideshow
                      photos={card.photos}
                      sizes={sizes}
                      imageClassName={zoom}
                    />
                  ) : photo ? (
                    <Image
                      src={photo.src}
                      alt=""
                      fill
                      sizes={sizes}
                      placeholder="blur"
                      className={`object-cover object-bottom ${zoom}`}
                      style={
                        photo.position
                          ? { objectPosition: photo.position }
                          : undefined
                      }
                    />
                  ) : null}
                </div>

                {card.isNew ? (
                  <span className="absolute left-4 top-4 rounded-xl border border-cream/70 bg-emerald px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-cream">
                    {tPhotoShoots("badge")}
                  </span>
                ) : null}

                {card.ageLabel ? (
                  <span className="absolute right-4 top-4 rounded-xl bg-cream/90 px-2.5 py-0.5 text-xs font-medium text-emerald-deep">
                    {card.ageLabel}
                  </span>
                ) : null}

                {/*
                  The text panel sits under the photo at every width, on
                  Field Card Cream: the design system's ground for a distinct
                  card. The hero above is the page's one big green moment, so
                  the cards stay neutral (charcoal titles, no green fill) and
                  the photos lead. Cards in a row stretch to the tallest, so the text is
                  centred in the panel. The photo's zoom is the hover
                  feedback.
                */}
                <div className="flex flex-1 flex-col justify-center border-t border-brown/25 bg-card px-4 py-3 text-center sm:px-6 sm:py-5">
                  <h3 className="font-stencil text-2xl leading-tight text-charcoal sm:text-3xl">
                    {card.title}
                  </h3>
                  {/* A phone gets the one-line version, so the panel stays thin. */}
                  <p className="mt-1 truncate text-sm leading-snug text-charcoal-soft sm:hidden">
                    {card.short}
                  </p>
                  <p className="mt-2 hidden text-sm leading-snug text-charcoal-soft sm:block">
                    {card.description}
                  </p>
                  {card.credit ? (
                    <p className="mt-1 text-xs font-semibold text-emerald-deep sm:mt-2">
                      {card.credit}
                    </p>
                  ) : null}
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
      <CardCarousel listId={ROW_ID} labels={cards.map((card) => card.title)} />
    </Entry>
  );
}
