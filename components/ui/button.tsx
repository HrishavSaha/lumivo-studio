import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

export const buttonVariants = {
  /** Square orange block with a serif label — the primary CTA. */
  solid:
    "bg-brand text-cream font-display text-base sm:text-lg px-7 py-2.5 hover:bg-ink",
  /** Charcoal capsule, small uppercase sans — "SEE OUR WORK". */
  pillDark:
    "bg-charcoal text-cream rounded-full px-6 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] hover:bg-brand",
  /** Cream capsule with a caret — "CONFIRM BOOKING". */
  pillCream:
    "bg-cream text-ink rounded-full px-8 py-3.5 text-sm font-bold uppercase tracking-[0.08em] shadow-lg hover:bg-white",
  /** White outline capsule in the orange nav bar. */
  pillOutline:
    "bg-cream text-ink rounded-full px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.08em] hover:bg-charcoal hover:text-cream",
} as const;

const base =
  "inline-flex items-center justify-center gap-2 transition-colors duration-200 " +
  "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-current " +
  "disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:bg-inherit";

type Variant = keyof typeof buttonVariants;

export function Button({
  variant = "solid",
  className,
  children,
  ...props
}: ComponentProps<"button"> & { variant?: Variant }) {
  return (
    <button
      className={cn(base, buttonVariants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = "solid",
  className,
  href,
  children,
}: {
  variant?: Variant;
  className?: string;
  href: string;
  children: ReactNode;
}) {
  return (
    <Link href={href} className={cn(base, buttonVariants[variant], className)}>
      {children}
    </Link>
  );
}

/** Solid caret used inside the cream confirm pills. */
export function Caret({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 10 12"
      aria-hidden="true"
      className={cn("h-3 w-2.5 fill-current", className)}
    >
      <path d="M0 0l10 6-10 6z" />
    </svg>
  );
}
