"use client";

import { useEffect, useRef, useState } from "react";
import { HorseshoeMark } from "@/components/horseshoe-mark";

/** How far the side cards shrink and fade, at one card's distance. */
const STEP_BACK = { scale: 0.12, fade: 0.3 };
/** The width under which the row is a carousel; from sm up it is a grid. */
const PHONE = "(max-width: 639px)";

/**
 * Runs the phone carousel of homepage cards, and draws its horseshoes.
 *
 * The card you are on sits in the middle of the screen. The row opens on
 * the first card; at either end the end card still centres, with empty
 * space on its outer side. The card in the middle is full size; its neighbours step back (a
 * little smaller and softer) and grow as they slide in. Reduced motion keeps
 * the centred row without the size change.
 *
 * The horseshoes are a fixed map: one per card, standing still, with the
 * current card's one highlighted. Tapping one brings its card to the middle.
 */
export function CardCarousel({
  listId,
  labels,
}: {
  listId: string;
  /** One per card, in order: the card's title, read out for its horseshoe. */
  labels: string[];
}) {
  // Opens on the first card. Six cards have no single middle card to
  // open on, so the row starts at the beginning, like a book.
  const startIndex = 0;
  const [active, setActive] = useState(startIndex);
  const rowRef = useRef<HTMLElement | null>(null);

  // Card `index` centred on screen.
  function centre(index: number, smooth: boolean) {
    const row = rowRef.current;
    const item = row?.children[index] as HTMLElement | undefined;
    if (!row || !item) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    row.scrollTo({
      left: item.offsetLeft + item.offsetWidth / 2 - row.clientWidth / 2,
      behavior: smooth && !reduce ? "smooth" : "auto",
    });
  }

  useEffect(() => {
    const row = document.getElementById(listId);
    if (!row) return;
    rowRef.current = row;
    const items = [...row.children] as HTMLElement[];
    const phone = window.matchMedia(PHONE);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const centreOf = (el: HTMLElement) => el.offsetLeft + el.offsetWidth / 2;
    const card = (item: HTMLElement) => item.firstElementChild as HTMLElement | null;

    function paint() {
      if (!phone.matches) {
        // A grid from sm up: no effect, and no leftovers from a phone width.
        for (const item of items) {
          const el = card(item);
          if (el) el.style.transform = el.style.opacity = "";
        }
        return;
      }
      const mid = row!.scrollLeft + row!.clientWidth / 2;
      let nearest = 0;
      let nearestDistance = Infinity;
      items.forEach((item, index) => {
        const distance = Math.abs(centreOf(item) - mid);
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearest = index;
        }
        const el = card(item);
        if (!el) return;
        if (reduce.matches) {
          el.style.transform = el.style.opacity = "";
          return;
        }
        const offset = Math.min(1, distance / item.offsetWidth);
        el.style.transform = `scale(${1 - STEP_BACK.scale * offset})`;
        el.style.opacity = String(1 - STEP_BACK.fade * offset);
      });
      setActive(nearest);
    }

    function onScroll() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(paint);
    }

    function start() {
      if (phone.matches) centre(startIndex, false);
      paint();
    }

    start();
    row.addEventListener("scroll", onScroll, { passive: true });
    phone.addEventListener("change", start);
    reduce.addEventListener("change", paint);
    return () => {
      row.removeEventListener("scroll", onScroll);
      phone.removeEventListener("change", start);
      reduce.removeEventListener("change", paint);
      cancelAnimationFrame(frame);
    };
  }, [listId, startIndex]);

  return (
    // A fixed map of the cards: the horseshoes stay put and only the
    // highlight moves, so a glance says "card 4 of 6".
    <div className="mt-3 flex justify-center gap-1 sm:hidden">
      {labels.map((label, index) => {
        const isActive = index === active;
        return (
          // 32px tap target around a 16px shoe.
          <button
            key={label}
            type="button"
            onClick={() => centre(index, true)}
            aria-label={label}
            aria-current={isActive ? "true" : undefined}
            className="flex h-8 w-8 items-center justify-center rounded-full"
          >
            <HorseshoeMark
              className={`h-4 w-4 -rotate-[15deg] transition motion-reduce:transition-none ${
                isActive ? "scale-125 text-emerald" : "text-brown/35"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}
