import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { photoById } from "@/content/photos";
import { Entry } from "./entry";

type HorseshoeColor = "brown" | "emerald" | "emerald-deep" | "charcoal-soft";

const HORSESHOE_STROKE: Record<HorseshoeColor, string> = {
  brown: "stroke-brown",
  emerald: "stroke-emerald",
  "emerald-deep": "stroke-emerald-deep",
  "charcoal-soft": "stroke-charcoal-soft"
};

const HORSESHOES: Array<{ color: HorseshoeColor; offset: number }> = [
  { color: "brown", offset: 0 },
  { color: "emerald", offset: -4 },
  { color: "emerald-deep", offset: 3 },
  { color: "charcoal-soft", offset: -2 }
];

/** One fixed 20x20 horseshoe mark — true square viewBox, so it can't warp. */
function Horseshoe({ color, offset }: { color: HorseshoeColor; offset: number }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 20 20"
      style={{ transform: `translateY(${offset}px)` }}
    >
      <path
        d="M5,13 A5,5 0 1 1 15,13"
        fill="none"
        className={HORSESHOE_STROKE[color]}
        strokeOpacity="0.6"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <circle cx="6" cy="9.5" r="1" className="fill-cream" />
      <circle cx="14" cy="9.5" r="1" className="fill-cream" />
    </svg>
  );
}

/**
 * A small trailing-off flourish under the entry — real square (20x20)
 * viewBoxes, so unlike the earlier stretched background version, nothing
 * here can warp at any screen size. Sits in the whitespace below the
 * content, never over running text.
 */
function HorseshoeTrail() {
  return (
    <div aria-hidden="true" className="mt-8 flex items-center gap-8">
      {HORSESHOES.map((shoe, index) => (
        <Horseshoe key={index} color={shoe.color} offset={shoe.offset} />
      ))}
    </div>
  );
}

/** "Meet the horses" — the first entry on the spine. */
export async function IntroEntry() {
  const t = await getTranslations("home");
  const tGallery = await getTranslations("gallery");

  const childHorsePhoto = photoById("child");

  return (
    <Entry>
      <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-center md:gap-12">
        <div>
          <h2 className="font-stencil text-3xl text-charcoal md:text-4xl">
            {t("introTitle")}
          </h2>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-charcoal-soft">
            {t("introBody")}
          </p>
        </div>
        {childHorsePhoto ? (
          <div className="mt-8 overflow-hidden rounded-xl border-2 border-emerald md:self-start">
            <Image
              src={childHorsePhoto.src}
              alt={tGallery("photos.child")}
              width={childHorsePhoto.width}
              height={childHorsePhoto.height}
              sizes="(min-width: 768px) 40vw, 90vw"
              className="h-auto w-full object-cover"
            />
          </div>
        ) : null}
      </div>
      <HorseshoeTrail />
    </Entry>
  );
}
