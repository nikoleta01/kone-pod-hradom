import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { TbBrandInstagram, TbPhone } from "react-icons/tb";
import { photoById, type Photo } from "@/content/photos";
import { photoShoots } from "@/content/services";
import { site, telHref } from "@/content/site";

/** Size, tilt and overlap of each print in the fan. */
const PRINT_SLOTS = {
  left: "w-36 -rotate-6 translate-y-3 bg-card",
  lead: "z-10 -ml-8 w-44 rotate-2 bg-cream lg:w-48",
  right: "hidden -ml-8 w-36 translate-y-4 rotate-[5deg] bg-card lg:block",
} as const;

/**
 * "Novinka": the photo shoot offer. The Ekovan loose-page shape (tilted,
 * dashed edge), which on this site means "new, still being tried", filled
 * with the Support band's emerald so it catches the eye. Hidden entirely
 * when `photoShoots.active` is false.
 */
export async function PhotoShootCard({ className = "" }: { className?: string }) {
  if (!photoShoots.active) return null;

  const t = await getTranslations("photoShoots");
  const tActions = await getTranslations("actions");
  const tel = telHref();
  // Lead photo in the middle, the next two either side of it.
  const [lead, left, right] = photoShoots.photoIds.map(photoById);
  const prints = (
    [
      { photo: left, slot: "left" },
      { photo: lead, slot: "lead" },
      { photo: right, slot: "right" },
    ] as const
  ).filter((print): print is typeof print & { photo: Photo } =>
    Boolean(print.photo),
  );

  return (
    <section
      aria-labelledby="photo-shoots-title"
      className={`rotate-[-1deg] rounded-xl border border-dashed border-cream/50 bg-emerald p-5 text-cream sm:p-8 md:mx-2 md:grid md:grid-cols-[1fr_auto] md:items-center md:gap-10 ${className}`}
    >
      <div>
        <p className="inline-block rounded-full bg-cream px-3 py-0.5 text-xs font-semibold uppercase tracking-wide text-emerald-deep">
          {t("badge")}
        </p>
        <h2
          id="photo-shoots-title"
          className="mt-3 font-stencil text-3xl leading-tight md:text-4xl"
        >
          {t("title")}
        </h2>
        <p className="mt-2 max-w-md text-lg leading-relaxed text-cream/90">
          {t("body")}
        </p>
        <a
          href={site.photographer.instagram}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-flex items-center gap-2 font-semibold text-cream underline underline-offset-4 hover:text-cream/80"
        >
          <TbBrandInstagram className="h-5 w-5 shrink-0" aria-hidden="true" />
          {t("photographer", { name: site.photographer.name })}
        </a>
        <ul className="mt-4 flex flex-wrap gap-2 text-sm">
          <li className="rounded-full border border-dashed border-cream/50 px-3 py-0.5">
            {t("dates")}
          </li>
          <li className="rounded-full border border-dashed border-cream/50 px-3 py-0.5">
            {t("price")}
          </li>
        </ul>
        {tel ? (
          <a
            href={tel}
            className="mt-5 inline-flex items-center gap-2.5 rounded-full border border-emerald-deep bg-cream px-5 py-2.5 font-semibold text-emerald-deep transition hover:bg-emerald-soft"
          >
            <TbPhone className="h-5 w-5 shrink-0" aria-hidden="true" />
            <span className="sr-only">{tActions("call")}: </span>
            {site.phone}
          </a>
        ) : null}
      </div>

      {/*
        Prints of the association's own photos, fanned out like photos laid
        on a table, the lead one in the middle. Desktop only: on a phone the
        card stays compact. Flat, like everything on the site: no border or
        shadow; the lead print is the lighter cream and the side ones the
        card ground, so the overlapping edges still read through that one
        step of tone. Medium screens get two prints so the text keeps its
        room.
      */}
      {prints.length > 0 ? (
        <div className="hidden md:flex md:flex-col md:items-center">
          <div className="flex items-center">
            {prints.map(({ photo, slot }) => (
              <figure
                key={photo.id}
                className={`relative rounded-xl p-2 pb-6 ${PRINT_SLOTS[slot]}`}
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={photo.src}
                    alt=""
                    fill
                    sizes="192px"
                    placeholder={photo.blurDataURL ? "blur" : "empty"}
                    blurDataURL={photo.blurDataURL}
                    className="object-cover"
                    style={{ objectPosition: photo.position ?? "50% 30%" }}
                  />
                </div>
              </figure>
            ))}
          </div>
          <p className="mt-4 text-xs text-cream/70">{t("photoNote")}</p>
        </div>
      ) : null}
    </section>
  );
}
