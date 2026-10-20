import Image from "next/image";
import { photoById } from "@/content/photos";

/**
 * A page's name and one-line lead. Sized to its text rather than to a fixed
 * banner height: the band is there to name the page, and the content should
 * follow close behind.
 *
 * With a photo it becomes a smaller cousin of the homepage hero: tall enough
 * (200px on a phone, 280px from md up) that the photo reads as a picture
 * rather than a clamped slice, with the text at its bottom left. The tint
 * is a gradient: strong behind the text, so it never depends on what part
 * of the photo is behind it, and light where there is no text, so the photo
 * shows. On a phone it fades upward, from md up from left to right.
 */
export function PageHeader({
  title,
  lead,
  photoId,
  photoPosition,
}: {
  title: string;
  lead?: string;
  /** An id from `src/content/photos.ts`. */
  photoId?: string;
  /** CSS `object-position` for this band's crop, which is wide and short. */
  photoPosition?: string;
}) {
  const photo = photoId ? photoById(photoId) : undefined;

  return (
    <header
      className={
        photo
          ? "relative isolate flex min-h-[12.5rem] items-end overflow-hidden border-b border-emerald-deep bg-emerald-deep md:min-h-[17.5rem]"
          : "border-b border-brown bg-card/40"
      }
    >
      {photo ? (
        <>
          <Image
            src={photo.src}
            alt=""
            fill
            priority
            sizes="100vw"
            placeholder={photo.blurDataURL ? "blur" : "empty"}
            blurDataURL={photo.blurDataURL}
            className="-z-10 object-cover"
            style={{ objectPosition: photoPosition ?? photo.position ?? "50% 50%" }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-linear-to-t from-emerald-deep/90 via-emerald-deep/55 via-60% to-emerald-deep/30 md:bg-linear-to-r md:from-emerald-deep/88 md:via-emerald-deep/62 md:via-45% md:to-emerald-deep/22"
          />
        </>
      ) : null}

      <div
        className={`mx-auto max-w-6xl px-4 sm:px-6 ${
          photo ? "w-full py-6 md:py-10" : "py-8 md:py-12"
        }`}
      >
        <h1
          className={`font-serif text-4xl leading-tight md:text-5xl ${
            photo ? "text-cream" : "text-charcoal"
          }`}
        >
          {title}
        </h1>
        {lead ? (
          <p
            className={`mt-3 max-w-2xl text-lg leading-relaxed ${
              photo ? "text-cream/90" : "text-charcoal-soft"
            }`}
          >
            {lead}
          </p>
        ) : null}
      </div>
    </header>
  );
}
