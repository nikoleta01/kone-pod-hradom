"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { TbChevronLeft, TbChevronRight, TbX } from "react-icons/tb";
import type { Photo } from "@/content/photos";

/**
 * The gallery grid, where every photo opens a full-screen carousel.
 *
 * The modal is the native `<dialog>`: it brings Escape to close, keeps
 * keyboard focus inside while open and returns it to the photo that opened
 * it. Inside, the photos sit in one row that snaps photo by photo, so a
 * phone swipes through them; the arrow buttons and the arrow keys scroll
 * the same row.
 */
export function GalleryLightbox({ photos }: { photos: Photo[] }) {
  const t = useTranslations("gallery");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  function scrollToPhoto(index: number, smooth: boolean) {
    const track = trackRef.current;
    if (!track) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({
      left: index * track.clientWidth,
      behavior: smooth && !reduce ? "smooth" : "auto",
    });
  }

  function open(index: number) {
    setActive(index);
    dialogRef.current?.showModal();
    // The row only has a width once the dialog is shown.
    requestAnimationFrame(() => scrollToPhoto(index, false));
  }

  function step(delta: number) {
    const next = (active + delta + photos.length) % photos.length;
    scrollToPhoto(next, true);
  }

  function onTrackScroll() {
    const track = trackRef.current;
    if (!track || track.clientWidth === 0) return;
    setActive(Math.round(track.scrollLeft / track.clientWidth));
  }

  // The page behind must not scroll while the carousel is open.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    function lock() {
      document.documentElement.style.overflow = "hidden";
    }
    function unlock() {
      document.documentElement.style.overflow = "";
    }
    const observer = new MutationObserver(() =>
      dialog.open ? lock() : unlock(),
    );
    observer.observe(dialog, { attributes: true, attributeFilter: ["open"] });
    return () => {
      observer.disconnect();
      unlock();
    };
  }, []);

  const arrowClass =
    "absolute top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full border border-cream/40 bg-charcoal/60 p-3 text-cream transition hover:bg-charcoal sm:flex";

  return (
    <>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {photos.map((photo, index) => (
          <li
            key={photo.id}
            className="overflow-hidden rounded-xl border border-brown bg-card/40"
          >
            <button
              type="button"
              onClick={() => open(index)}
              className="group block w-full cursor-zoom-in focus-visible:-outline-offset-4"
            >
              <Image
                src={photo.src}
                alt={t(`photos.${photo.id}`)}
                width={photo.width}
                height={photo.height}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                placeholder={photo.blurDataURL ? "blur" : "empty"}
                blurDataURL={photo.blurDataURL}
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                style={
                  photo.position ? { objectPosition: photo.position } : undefined
                }
              />
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label={t("dialogLabel")}
        onKeyDown={(event) => {
          // Handled here, so the row's own arrow-key scrolling can't add a
          // second step on top.
          if (event.key === "ArrowRight") {
            event.preventDefault();
            step(1);
          }
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            step(-1);
          }
        }}
        className="m-0 h-dvh max-h-none w-full max-w-none bg-charcoal/95 p-0 text-cream backdrop:bg-charcoal/80 open:flex open:flex-col"
      >
        <div className="flex items-center justify-between px-4 py-3 sm:px-6">
          <p className="text-sm tabular-nums text-cream/80" aria-live="polite">
            {t("counter", { current: active + 1, total: photos.length })}
          </p>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label={t("close")}
            className="rounded-full p-2 text-cream transition hover:bg-cream/10"
          >
            <TbX className="h-7 w-7" aria-hidden="true" />
          </button>
        </div>

        <div className="relative min-h-0 flex-1">
          <div
            ref={trackRef}
            onScroll={onTrackScroll}
            className="flex h-full snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {photos.map((photo) => (
              <figure
                key={photo.id}
                className="flex h-full w-full shrink-0 snap-center flex-col px-4 sm:px-20"
              >
                <div className="relative min-h-0 flex-1">
                  <Image
                    src={photo.src}
                    alt={t(`photos.${photo.id}`)}
                    fill
                    sizes="100vw"
                    className="object-contain"
                  />
                </div>
                <figcaption className="mx-auto max-w-2xl py-4 text-center text-sm leading-snug text-cream/85">
                  {t(`photos.${photo.id}`)}
                </figcaption>
              </figure>
            ))}
          </div>

          <button
            type="button"
            onClick={() => step(-1)}
            aria-label={t("previous")}
            className={`${arrowClass} left-4`}
          >
            <TbChevronLeft className="h-6 w-6" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            aria-label={t("next")}
            className={`${arrowClass} right-4`}
          >
            <TbChevronRight className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </dialog>
    </>
  );
}
