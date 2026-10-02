import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { photoById } from "@/content/photos";
import { Entry } from "./entry";

/** "Meet the horses": the first homepage section after the cover. */
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
    </Entry>
  );
}
