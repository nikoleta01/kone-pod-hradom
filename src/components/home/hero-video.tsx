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
 * visitor's settings allow it, is revealed once it plays, and pauses while
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

    let inView = false;

    // iOS refuses autoplay in Low Power Mode, but still allows play() from
    // a tap. So when autoplay is refused, the visitor's first tap, click or
    // key press starts the loop instead of the poster staying for good.
    const gestures = ["touchend", "click", "keydown"] as const;
    function playOnGesture() {
      removeGestureListeners();
      if (inView) video?.play().catch(() => {});
    }
    function removeGestureListeners() {
      for (const type of gestures) {
        document.removeEventListener(type, playOnGesture);
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (entry.isIntersecting) {
          video.play().catch(() => {
            for (const type of gestures) {
              document.addEventListener(type, playOnGesture, { passive: true });
            }
          });
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(video);
    return () => {
      observer.disconnect();
      removeGestureListeners();
    };
  }, [enabled]);

  return (
    <div aria-hidden="true" className="absolute inset-0">
      {/*
        The video sits underneath at full opacity and the poster covers it,
        fading out once the video really plays. Never the other way round:
        Safari (Mac and iPhone) refuses to autoplay a video it considers
        invisible, so a video waiting at opacity 0 for its first frame never
        gets one.
      */}
      {enabled ? (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="auto"
          onPlaying={() => setReady(true)}
          className="absolute inset-0 h-full w-full object-cover"
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
      <Image
        src={heroVideo.poster}
        alt=""
        fill
        preload
        placeholder="blur"
        sizes="100vw"
        className={`object-cover transition-opacity duration-700 motion-reduce:transition-none ${
          ready ? "opacity-0" : "opacity-100"
        }`}
      />
    </div>
  );
}
