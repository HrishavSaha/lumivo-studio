import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

const tones = {
  cream: "bg-cream text-ink",
  dark: "bg-charcoal text-cream",
  orange: "bg-brand text-cream",
  none: "",
} as const;

export function Container({
  children,
  className,
  size = "default",
}: {
  children: ReactNode;
  className?: string;
  size?: "default" | "wide" | "narrow";
}) {
  const width =
    size === "wide"
      ? "max-w-7xl"
      : size === "narrow"
        ? "max-w-3xl"
        : "max-w-6xl";

  return (
    <div className={cn("mx-auto w-full px-5 sm:px-8 lg:px-12", width, className)}>
      {children}
    </div>
  );
}

export function Section({
  children,
  className,
  tone = "none",
  as: Tag = "section",
  id,
}: {
  children: ReactNode;
  className?: string;
  tone?: keyof typeof tones;
  as?: ElementType;
  id?: string;
}) {
  return (
    <Tag
      id={id}
      className={cn(
        "relative overflow-x-clip py-16 sm:py-20 lg:py-28",
        tones[tone],
        className,
      )}
    >
      {children}
    </Tag>
  );
}
