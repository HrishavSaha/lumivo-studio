import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

const tones = {
  /** On the cream/orange contact panel — cream text on a dark photo. */
  light: {
    label: "text-cream/90",
    control: "text-cream placeholder:text-cream/45 border-cream/60 focus:border-cream",
  },
  /** On the orange booking card — near-black on orange. */
  ink: {
    label: "text-ink/80",
    control: "text-ink placeholder:text-ink/45 border-ink/40 focus:border-ink",
  },
} as const;

type Tone = keyof typeof tones;

function Shell({
  label,
  htmlFor,
  tone,
  error,
  children,
  className,
}: {
  label: string;
  htmlFor: string;
  tone: Tone;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label
        htmlFor={htmlFor}
        className={cn("font-display text-lg sm:text-xl", tones[tone].label)}
      >
        {label}
      </label>
      {children}
      {error ? (
        <p role="alert" className="text-xs font-medium text-red-200">
          {error}
        </p>
      ) : null}
    </div>
  );
}

const control =
  "w-full border-0 border-b bg-transparent pb-2 text-sm outline-none transition-colors sm:text-base " +
  "focus:outline-none aria-[invalid=true]:border-red-300";

export function Input({
  label,
  tone = "light",
  error,
  wrapperClassName,
  id,
  ...props
}: ComponentProps<"input"> & {
  label: string;
  tone?: Tone;
  error?: string;
  wrapperClassName?: string;
}) {
  const fieldId = id ?? props.name ?? label.toLowerCase().replace(/\W+/g, "-");

  return (
    <Shell
      label={label}
      htmlFor={fieldId}
      tone={tone}
      error={error}
      className={wrapperClassName}
    >
      <input
        id={fieldId}
        aria-invalid={Boolean(error)}
        className={cn(control, tones[tone].control)}
        {...props}
      />
    </Shell>
  );
}

export function Textarea({
  label,
  tone = "light",
  error,
  wrapperClassName,
  id,
  ...props
}: ComponentProps<"textarea"> & {
  label: string;
  tone?: Tone;
  error?: string;
  wrapperClassName?: string;
}) {
  const fieldId = id ?? props.name ?? label.toLowerCase().replace(/\W+/g, "-");

  return (
    <Shell
      label={label}
      htmlFor={fieldId}
      tone={tone}
      error={error}
      className={wrapperClassName}
    >
      <textarea
        id={fieldId}
        aria-invalid={Boolean(error)}
        className={cn(control, "resize-none", tones[tone].control)}
        {...props}
      />
    </Shell>
  );
}
