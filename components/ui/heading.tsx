import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Renders a headline where *starred* segments become the coral display italic
 * used throughout the site — "We make Brands *Impossible* to ignore".
 */
export function SplitHeading({
  text,
  className,
  accentClassName,
  as: Tag = "h2",
}: {
  text: string;
  className?: string;
  accentClassName?: string;
  as?: ElementType;
}) {
  const parts = text.split(/(\*[^*]+\*)/g).filter(Boolean);

  return (
    <Tag className={cn("font-display", className)}>
      {parts.map((part, i) =>
        part.startsWith("*") && part.endsWith("*") ? (
          <em key={i} className={cn("italic text-coral", accentClassName)}>
            {part.slice(1, -1)}
          </em>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </Tag>
  );
}

/** Small uppercase label sitting above a section, with an optional rule. */
export function Eyebrow({
  children,
  className,
  rule = false,
}: {
  children: ReactNode;
  className?: string;
  rule?: boolean;
}) {
  return (
    <div className={cn("flex items-center gap-5", className)}>
      <span className="text-xs font-semibold uppercase tracking-[0.18em] sm:text-sm">
        {children}
      </span>
      {rule ? <span className="h-px flex-1 bg-current opacity-40" /> : null}
    </div>
  );
}
