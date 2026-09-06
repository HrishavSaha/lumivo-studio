"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { WorkCard } from "@/components/work/work-card";
import { cn } from "@/lib/cn";
import type { WorkCard as WorkCardData } from "@/lib/content";

// How much a card shrinks the further it sits from the track's centre.
const MIN_SCALE = 0.84;
const MAX_SCALE = 1;

// Cards get a z-index derived from their scale (so the centred one overlaps
// its shrinking neighbours), but capped well below the arrows' z-index so
// an enlarged card never covers the buttons.
const CARD_Z_INDEX_SCALE = 10;

function Arrow({
  direction,
  onClick,
  disabled,
  label,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  disabled: boolean;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={cn(
        "absolute top-[38%] z-30 grid h-9 w-9 place-items-center rounded-full bg-brand text-cream shadow-lg transition",
        "hover:bg-charcoal disabled:pointer-events-none disabled:opacity-0",
        direction === "prev" ? "left-1 sm:-left-2" : "right-1 sm:-right-2",
      )}
    >
      <svg
        viewBox="0 0 10 12"
        aria-hidden="true"
        className={cn("h-3 w-2.5 fill-current", direction === "prev" && "rotate-180")}
      >
        <path d="M0 0l10 6-10 6z" />
      </svg>
    </button>
  );
}

export function WorkCarousel({
  cards,
  title,
}: {
  cards: WorkCardData[];
  title: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const rafRef = useRef<number | null>(null);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  // Whether we can still scroll further, based on real scroll position —
  // not on whether a card happens to sit exactly at centre. Edge cards
  // often can't reach true centre (the track isn't padded that wide), so
  // nearest-card matching alone would leave a button stuck enabled forever.
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  // Runs on every scroll frame: measure each card's distance from the
  // track's centre and scale it continuously, so dragging/swiping smoothly
  // grows the incoming card and shrinks the outgoing one instead of the
  // size ever jumping between two fixed states.
  const updateScales = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const trackRect = track.getBoundingClientRect();
    const trackCenter = trackRect.left + trackRect.width / 2;

    let closestIndex = 0;
    let closestDistance = Infinity;

    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const distance = Math.abs(cardCenter - trackCenter);

      const falloff = rect.width * 0.9;
      const t = Math.min(distance / falloff, 1);
      const scale = MAX_SCALE - t * (MAX_SCALE - MIN_SCALE);

      card.style.transform = `scale(${scale})`;
      card.style.zIndex = String(Math.round(scale * CARD_Z_INDEX_SCALE));

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = i;
      }
    });

    if (closestIndex !== activeIndexRef.current) {
      activeIndexRef.current = closestIndex;
      setActiveIndex(closestIndex);
    }

    const max = track.scrollWidth - track.clientWidth;
    setCanPrev(track.scrollLeft > 2);
    setCanNext(track.scrollLeft < max - 2);
  }, []);

  const scheduleUpdate = useCallback(() => {
    if (rafRef.current != null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      updateScales();
    });
  }, [updateScales]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    cardRefs.current.length = cards.length;
    updateScales();

    // A smooth/snap-driven scroll can settle a couple of pixels after the
    // last "scroll" event we see, which used to leave a button visible for
    // one extra click. `scrollend` (with a debounce fallback for browsers
    // that don't support it) forces one final, authoritative check once
    // scrolling has actually stopped.
    let settleTimer: ReturnType<typeof setTimeout> | null = null;
    const handleScroll = () => {
      scheduleUpdate();
      if (settleTimer != null) clearTimeout(settleTimer);
      settleTimer = setTimeout(updateScales, 150);
    };

    track.addEventListener("scroll", handleScroll, { passive: true });
    track.addEventListener("scrollend", updateScales);
    const observer = new ResizeObserver(scheduleUpdate);
    observer.observe(track);
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      track.removeEventListener("scroll", handleScroll);
      track.removeEventListener("scrollend", updateScales);
      observer.disconnect();
      window.removeEventListener("resize", scheduleUpdate);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      if (settleTimer != null) clearTimeout(settleTimer);
    };
  }, [scheduleUpdate, updateScales, cards.length]);

  // Move by one card and always land exactly on its snap point, regardless
  // of gap/width, rather than scrolling by a fixed pixel step.
  const goToIndex = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(index, cardRefs.current.length - 1));
    cardRefs.current[clamped]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, []);

  const prev = useCallback(
    () => goToIndex(activeIndexRef.current - 1),
    [goToIndex],
  );
  const next = useCallback(
    () => goToIndex(activeIndexRef.current + 1),
    [goToIndex],
  );

  return (
    <div className="relative mx-auto max-w-5xl">
      <Arrow
        direction="prev"
        onClick={prev}
        disabled={!canPrev}
        label={`Previous ${title} project`}
      />
      <Arrow
        direction="next"
        onClick={next}
        disabled={!canNext}
        label={`Next ${title} project`}
      />

      <div
        ref={trackRef}
        // Keyboard users need to be able to scroll the track with arrow keys.
        tabIndex={0}
        role="group"
        aria-label={`${title} projects`}
        // Side padding equals half the (mobile/tablet) card width so the
        // first/last card can actually reach dead centre while scrolling —
        // without this, scrollWidth - clientWidth overshoots the true
        // "last card centred" position and the arrow lags a click behind
        // reality. lg reverts to a small fixed gutter: enough cards fit
        // there without scrolling that we don't want to force overflow.
        className="snap-track items-center gap-5 px-[max(1rem,calc(50%-8rem))] py-4 sm:gap-6 sm:px-[max(1rem,calc(50%-9rem))] lg:justify-center lg:px-10"
      >
        {cards.map((card, i) => (
          <WorkCard
            key={`${card.label}-${i}`}
            card={card}
            active={i === activeIndex}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
          />
        ))}
      </div>
    </div>
  );
}
