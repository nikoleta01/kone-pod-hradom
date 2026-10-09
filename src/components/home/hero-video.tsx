"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { heroVideo } from "@/content/media";

type NetworkInformation = { saveData?: boolean; effectiveType?: string };

/**
 * Should this visitor get the moving video at all? No on reduced motion, on
 * Data Saver, or on a 2G-class connection: weak rural signal should never
 * pay for a background loop.
 */
function canPlayVideo(): boolean {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return false;
  }
  const connection = (navigator as Navigator & { connection?: NetworkInformation })
    .connection;
  if (connection?.saveData) return false;
  if (connection?.effectiveType && /(^|-)2g$/.test(connection.effectiveType)) {
    return false;
  }
  return true;
}

/**
 * The hero's full-bleed background. The poster paints first and stays as the
 * fallback; the video is only mounted after the page has loaded and the
 * visitor's settings allow it, fades in once it can play, and pauses while
 * the hero is scrolled out of view. Decorative: the hero text carries the
 * meaning.
 */
export function HeroVideo() {
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Deferred so the video never competes with the page's first load.
    const id = window.setTimeout(() => setEnabled(canPlayVideo()), 0);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!enabled || !video) return;

    // React sets `muted` only as a property, never as the HTML attribute, and
    // iOS Safari refuses to autoplay a video it does not see as muted.
    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute("muted", "");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {
            // Autoplay refused (e.g. Low Power Mode): the poster stays.
          });
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [enabled]);

  return (
    <div aria-hidden="true" className="absolute inset-0">
      <Image
        src={heroVideo.poster.src}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {enabled ? (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="auto"
          onCanPlay={() => setReady(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            ready ? "opacity-100" : "opacity-0"
          }`}
        >
          {heroVideo.sources.map((source) => (
            <source
              key={source.src}
              src={source.src}
              type={source.type}
              media={"media" in source ? source.media : undefined}
            />
          ))}
        </video>
      ) : null}
    </div>
  );
}
