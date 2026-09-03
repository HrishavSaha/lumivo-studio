"use client";

import type { ElementType, ReactNode } from "react";
import { useInView } from "@/lib/use-in-view";
import { cn } from "@/lib/cn";

/** Fades + lifts its children into place the first time they scroll into view. */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  /** Stagger in milliseconds. */
  delay?: number;
  as?: ElementType;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <Tag
      ref={ref}
      data-in-view={inView}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
      className={cn("reveal", className)}
    >
      {children}
    </Tag>
  );
}
