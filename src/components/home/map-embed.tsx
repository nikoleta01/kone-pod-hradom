"use client";

import { useEffect, useRef, useState } from "react";
import { TbHandClick } from "react-icons/tb";

type Props = {
  src: string;
  title: string;
  unlockLabel: string;
};

/**
 * The embedded map, locked until the visitor clearly means to use it. A
 * cross-origin iframe swallows every wheel and touch scroll that lands on
 * it, so a page scrolled past the map would stall there. While locked, a
 * transparent button sits over it and the page scrolls straight through; a
 * click or tap unlocks it. It locks again when the pointer leaves, or on a
 * tap anywhere else on the page.
 */
export function MapEmbed({ src, title, unlockLabel }: Props) {
  const [active, setActive] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active) return;
    function onPointerDown(event: PointerEvent) {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setActive(false);
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [active]);

  return (
    <div
      ref={wrapperRef}
      onMouseLeave={() => setActive(false)}
      className="group relative border-b-2 border-brown"
    >
      <iframe
        src={src}
        title={title}
        loading="lazy"
        referrerPolicy="no-referrer"
        tabIndex={active ? 0 : -1}
        className={`block h-72 w-full rounded-t-[10px] md:h-96 ${
          active ? "" : "pointer-events-none"
        }`}
      />
      {active ? null : (
        <button
          type="button"
          onClick={() => setActive(true)}
          className="absolute inset-0 flex cursor-pointer items-end justify-center rounded-t-[10px] pb-4"
        >
          {/*
            Always visible on touch screens, where there is no hover to
            reveal it; on a mouse it appears only while over the map.
          */}
          <span className="inline-flex items-center gap-2 rounded-full border-2 border-brown bg-cream px-4 py-2 text-sm font-semibold text-charcoal transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 [@media(hover:hover)]:opacity-0">
            <TbHandClick className="h-4 w-4 shrink-0 text-emerald" aria-hidden="true" />
            {unlockLabel}
          </span>
        </button>
      )}
    </div>
  );
}
