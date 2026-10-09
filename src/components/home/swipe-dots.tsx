"use client";

import { useEffect, useState } from "react";
import { HorseshoeMark } from "@/components/horseshoe-mark";

/**
 * Position dots under a swipeable row, drawn as the site's horseshoe: they
 * follow the row's scroll and mark the card in view with a full emerald
 * shoe, the same "you are here" mark the nav uses for the current page.
 * Tapping one scrolls its card into view. Phones only, because from sm up
 * the row is a grid.
 */
export function SwipeDots({
  listId,
  labels,
}: {
  listId: string;
  /** One per card, in order: the card's title, read out for its dot. */
  labels: string[];
}) {
  const count = labels.length;
  const [active, setActive] = useState(0);

  useEffect(() => {
    const list = document.getElementById(listId);
    if (!list) return;

    function onScroll() {
      if (!list) return;
      const first = list.firstElementChild as HTMLElement | null;
      if (!first) return;
      // The last card can't snap to the start, so the very end of the row
      // counts as the last card.
      if (list.scrollLeft >= list.scrollWidth - list.clientWidth - 2) {
        setActive(count - 1);
        return;
      }
      const gap = parseFloat(getComputedStyle(list).columnGap) || 0;
      const step = first.offsetWidth + gap;
      setActive(Math.min(count - 1, Math.round(list.scrollLeft / step)));
    }

    list.addEventListener("scroll", onScroll, { passive: true });
    return () => list.removeEventListener("scroll", onScroll);
  }, [listId, count]);

  function goTo(index: number) {
    const card = document.getElementById(listId)?.children[index];
    if (!card) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // `inline: "start"` honours the row's scroll padding, so the card lands
    // exactly where a swipe would snap it.
    card.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "nearest",
      inline: "start",
    });
  }

  return (
    <div className="mt-3 flex justify-center gap-1 sm:hidden">
      {labels.map((label, index) => {
        const isActive = index === active;
        return (
          // 32px tap target around a 16px shoe.
          <button
            key={label}
            type="button"
            onClick={() => goTo(index)}
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
