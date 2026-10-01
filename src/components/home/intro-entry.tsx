import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { photoById } from "@/content/photos";
import { HorseshoeMark } from "@/components/horseshoe-mark";
import { Entry } from "./entry";

type HorseshoeColor = "brown" | "emerald" | "emerald-deep" | "charcoal-soft";

const HORSESHOE_TEXT: Record<HorseshoeColor, string> = {
  brown: "text-brown",
  emerald: "text-emerald",
  "emerald-deep": "text-emerald-deep",
  "charcoal-soft": "text-charcoal-soft"
};

const HORSESHOES: Array<{ color: HorseshoeColor; offset: number }> = [
  { color: "brown", offset: 0 },
  { color: "emerald", offset: -4 },
  { color: "emerald-deep", offset: 3 },
  { color: "charcoal-soft", offset: -2 }
];

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
        <HorseshoeMark
          key={index}
          className={`h-[18px] w-[18px] opacity-60 ${HORSESHOE_TEXT[shoe.color]}`}
          style={{ transform: `translateY(${shoe.offset}px)` }}
        />
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
