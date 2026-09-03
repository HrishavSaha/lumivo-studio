"use client";

import { cn } from "@/lib/cn";
import { timeSlots } from "@/lib/content";

export function TimeSlots({
  selected,
  onSelect,
  disabled,
}: {
  selected: string | null;
  onSelect: (time: string) => void;
  /** Slots stay inert until a date is chosen. */
  disabled: boolean;
}) {
  return (
    <div>
      <h3 className="text-center text-base font-bold uppercase tracking-[0.08em] text-cream sm:text-lg">
        Available Time
      </h3>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {timeSlots.map((slot) => {
          const isSelected = selected === slot;

          return (
            <button
              key={slot}
              type="button"
              disabled={disabled}
              aria-pressed={isSelected}
              onClick={() => onSelect(slot)}
              className={cn(
                "rounded-full px-2 py-2.5 text-xs font-medium transition-colors sm:text-sm",
                disabled && "cursor-not-allowed opacity-40",
                isSelected
                  ? "bg-cream text-ink"
                  : "bg-brand-warm text-cream hover:bg-brand",
              )}
            >
              {slot}
            </button>
          );
        })}
      </div>

      {disabled ? (
        <p className="mt-4 text-center text-[11px] text-cream/60">
          Pick a date to see availability.
        </p>
      ) : null}
    </div>
  );
}
