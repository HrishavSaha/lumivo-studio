import { cn } from "@/lib/cn";

/**
 * Stand-in for a real image.
 *
 * Every call site already passes the final `src` and a written `alt`, so
 * turning the whole site's imagery on is a single edit: drop the assets into
 * `public/images/`, then uncomment the <Image> block below (and the `next/image`
 * import) and delete the placeholder markup underneath it.
 *
 *   // import Image from "next/image";
 *   //
 *   // <Image
 *   //   src={`/images/${src}.jpg`}
 *   //   alt={alt}
 *   //   fill
 *   //   sizes="(max-width: 768px) 100vw, 50vw"
 *   //   className="object-cover"
 *   // />
 *
 * Note for Next 16: use `preload` (not the deprecated `priority`) on the
 * above-the-fold hero images, and add any non-75 values to `images.qualities`
 * in next.config.ts.
 */
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
      {/* <Image src={`/images/${src}.jpg`} alt={alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" /> */}
      <span className="pointer-events-none select-none px-4 text-center font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6b6055]">
        {src}
      </span>
    </div>
  );
}
