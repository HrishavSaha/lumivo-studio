import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { cn } from "@/lib/cn";
import type { WorkCard as WorkCardData } from "@/lib/content";

export function WorkCard({
  card,
  featured = false,
}: {
  card: WorkCardData;
  /** The middle card in each carousel renders larger, as in the mockup. */
  featured?: boolean;
}) {
  return (
    <article
      className={cn(
        "flex flex-col overflow-hidden rounded-3xl bg-charcoal text-cream shadow-xl transition-transform duration-300",
        featured
          ? "w-64 sm:w-72 lg:w-80"
          : "w-56 self-center sm:w-64 lg:w-68",
      )}
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
            "rounded-full px-5 py-1.5 text-center font-bold uppercase tracking-wide shadow-md",
            featured
              ? "bg-brand-warm text-ink text-sm sm:text-base"
              : "bg-brand text-cream text-xs sm:text-sm",
          )}
        >
          {card.label}
        </span>
        <p
          className={cn(
            "mt-3 text-center leading-relaxed text-cream/80",
            featured ? "text-[11px] sm:text-xs" : "text-[10px] sm:text-[11px]",
          )}
        >
          {card.description}
        </p>
      </div>
    </article>
  );
}
