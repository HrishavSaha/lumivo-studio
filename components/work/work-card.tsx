import { forwardRef } from "react";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { cn } from "@/lib/cn";
import type { WorkCard as WorkCardData } from "@/lib/content";

/**
 * Base size for every card — the carousel scales this down for cards away
 * from the centre via a live transform (see WorkCarousel), so there's no
 * separate "small" size class here.
 */
export const WorkCard = forwardRef<
  HTMLElement,
  {
    card: WorkCardData;
    /** Whether this is the card currently centred in the carousel. */
    active?: boolean;
  }
>(function WorkCard({ card, active = false }, ref) {
  return (
    <article
      ref={ref}
      className="flex w-64 origin-center flex-col overflow-hidden rounded-3xl bg-charcoal text-cream shadow-xl sm:w-72 lg:w-80"
    >
      <ImagePlaceholder
        src={card.image}
        alt={card.alt}
        ratio="4/5"
        className="rounded-t-3xl"
      />

      <div className="relative -mt-5 flex flex-col items-center px-5 pb-6">
        <span
          className={cn(
            "rounded-full px-5 py-1.5 text-center font-bold uppercase tracking-wide shadow-md transition-colors duration-300",
            active
              ? "bg-brand-warm text-ink text-sm sm:text-base"
              : "bg-brand text-cream text-xs sm:text-sm",
          )}
        >
          {card.label}
        </span>
        <p
          className={cn(
            "mt-3 text-center leading-relaxed text-cream/80 transition-[font-size] duration-300",
            active ? "text-[11px] sm:text-xs" : "text-[10px] sm:text-[11px]",
          )}
        >
          {card.description}
        </p>
      </div>
    </article>
  );
});
