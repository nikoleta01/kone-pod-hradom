"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Photo } from "@/content/photos";

/** How long each photo stays before the next one fades in. */
const INTERVAL_MS = 4500;

/**
 * A card's photos taking turns: each one fades into the next and the loop
 * starts over. Stacked in the card's photo slot, so the card keeps its size.
 * A visitor who asked for reduced motion only ever sees the first photo.
 */
export function CardSlideshow({
  photos,
  sizes,
  imageClassName,
}: {
  photos: Photo[];
  sizes: string;
  /** Classes for every image, e.g. the card's hover zoom. */
  imageClassName: string;
}) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (photos.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(() => {
      setActive((index) => (index + 1) % photos.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [photos.length]);

  return photos.map((photo, index) => (
    // The fade sits on a wrapper so it never fights the image's own zoom
    // transition.
    <div
      key={photo.id}
      className={`absolute inset-0 transition-opacity duration-1000 motion-reduce:transition-none ${
        index === active ? "opacity-100" : "opacity-0"
      }`}
    >
      <Image
        src={photo.src}
        alt=""
        fill
        sizes={sizes}
        placeholder={photo.blurDataURL ? "blur" : "empty"}
        blurDataURL={photo.blurDataURL}
        className={`object-cover object-bottom ${imageClassName}`}
        style={photo.position ? { objectPosition: photo.position } : undefined}
      />
    </div>
  ));
}
