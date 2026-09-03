"use client";

import { WorkCard } from "@/components/work/work-card";
import { useCarousel } from "@/lib/use-carousel";
import { cn } from "@/lib/cn";
import type { WorkCard as WorkCardData } from "@/lib/content";

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
        "absolute top-[38%] z-20 grid h-9 w-9 place-items-center rounded-full bg-brand text-cream shadow-lg transition",
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
  const { trackRef, canPrev, canNext, prev, next } = useCarousel();

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
        // All three cards fit at lg, so centre them there; smaller screens scroll.
        className="snap-track items-center gap-5 px-8 py-4 sm:gap-6 sm:px-10 lg:justify-center"
      >
        {cards.map((card, i) => (
          <WorkCard
            key={`${card.label}-${i}`}
            card={card}
            featured={i === 1}
          />
        ))}
      </div>
    </div>
  );
}
