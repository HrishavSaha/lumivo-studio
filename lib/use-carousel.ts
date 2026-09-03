"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Arrow controls for a horizontal scroll-snap track. Scrolls by one child
 * width per press and keeps canPrev/canNext in sync with native scrolling
 * (so touch swipes update the arrows too).
 */
export function useCarousel<T extends HTMLElement = HTMLDivElement>() {
  const trackRef = useRef<T>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const sync = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    setCanPrev(track.scrollLeft > 8);
    setCanNext(track.scrollLeft < max - 8);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    sync();
    track.addEventListener("scroll", sync, { passive: true });

    const observer = new ResizeObserver(sync);
    observer.observe(track);

    return () => {
      track.removeEventListener("scroll", sync);
      observer.disconnect();
    };
  }, [sync]);

  const scrollBy = useCallback((direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const first = track.firstElementChild as HTMLElement | null;
    const step = first ? first.offsetWidth + 24 : track.clientWidth * 0.8;
    track.scrollBy({ left: step * direction, behavior: "smooth" });
  }, []);

  return {
    trackRef,
    canPrev,
    canNext,
    prev: () => scrollBy(-1),
    next: () => scrollBy(1),
  };
}
