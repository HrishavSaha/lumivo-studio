import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * Basenames that have a real asset in `public/images/`. Everything else
 * still falls back to the placeholder swatch below.
 *
 * Note for Next 16: use `preload` (not the deprecated `priority`) on the
 * above-the-fold hero images, and add any non-75 values to `images.qualities`
 * in next.config.ts.
 */
const AVAILABLE_IMAGES = new Set([
  "service-social-media",
  "service-content-creation",
  "service-branding",
  "work-arabella-branding",
  "work-arabella-signage",
  "work-amore-archives",
  "work-le-chan-tea",
  "work-nami-beauty",
  "work-rumus-studio",
  "work-waniraos",
]);

export function ImagePlaceholder({
  src,
  alt,
  ratio = "4/3",
  className,
  rounded = "none",
}: {
  /** Basename of the eventual file in public/images, e.g. "home-hero". */
  src: string;
  alt: string;
  /** CSS aspect-ratio, e.g. "4/5", "1/1". Ignored when the parent sets a height. */
  ratio?: string;
  className?: string;
  rounded?: "none" | "md" | "xl" | "2xl" | "3xl" | "full";
}) {
  const radius = {
    none: "",
    md: "rounded-md",
    xl: "rounded-xl",
    "2xl": "rounded-2xl",
    "3xl": "rounded-3xl",
    full: "rounded-full",
  }[rounded];

  if (AVAILABLE_IMAGES.has(src)) {
    return (
      <div
        style={{ aspectRatio: ratio }}
        className={cn("relative w-full overflow-hidden", radius, className)}
      >
        <Image
          src={`/images/${src}.png`}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={alt}
      title={alt}
      style={{ aspectRatio: ratio }}
      className={cn(
        "relative flex w-full items-center justify-center overflow-hidden",
        "bg-[repeating-linear-gradient(135deg,#d6cabb_0_10px,#cec1b1_10px_20px)]",
        radius,
        className,
      )}
    >
      <span className="pointer-events-none select-none px-4 text-center font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6b6055]">
        {src}
      </span>
    </div>
  );
}
