"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/cn";

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const iso = (y: number, m: number, d: number) =>
  `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

export function Calendar({
  selected,
  onSelect,
}: {
  /** ISO yyyy-mm-dd, or null when nothing is picked yet. */
  selected: string | null;
  onSelect: (date: string) => void;
}) {
  const today = useMemo(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }, []);

  const [view, setView] = useState({
    year: today.getFullYear(),
    month: today.getMonth(),
  });

  const { year, month } = view;
  const leadingBlanks = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Rolls the year over correctly at both ends.
  const shiftMonth = (delta: number) =>
    setView(({ year: y, month: m }) => {
      const next = new Date(y, m + delta, 1);
      return { year: next.getFullYear(), month: next.getMonth() };
    });

  const atFirstMonth =
    year === today.getFullYear() && month === today.getMonth();

  return (
    <div>
      <div className="flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => shiftMonth(-1)}
          disabled={atFirstMonth}
          aria-label="Previous month"
          className="grid h-7 w-7 place-items-center text-cream transition-opacity hover:opacity-70 disabled:opacity-25"
        >
          <svg viewBox="0 0 10 12" aria-hidden="true" className="h-3 w-2.5 rotate-180 fill-current">
            <path d="M0 0l10 6-10 6z" />
          </svg>
        </button>

        <h3
          aria-live="polite"
          className="min-w-52 text-center text-base font-bold uppercase tracking-[0.08em] text-cream sm:text-lg"
        >
          {MONTHS[month]} {year}
        </h3>

        <button
          type="button"
          onClick={() => shiftMonth(1)}
          aria-label="Next month"
          className="grid h-7 w-7 place-items-center text-cream transition-opacity hover:opacity-70"
        >
          <svg viewBox="0 0 10 12" aria-hidden="true" className="h-3 w-2.5 fill-current">
            <path d="M0 0l10 6-10 6z" />
          </svg>
        </button>
      </div>

      <div className="mt-6 grid grid-cols-7 gap-y-1 text-center">
        {DAY_LABELS.map((label) => (
          <abbr
            key={label}
            title={label}
            className="pb-2 text-[11px] font-medium uppercase tracking-wide text-cream/60 no-underline sm:text-xs"
          >
            {label}
          </abbr>
        ))}

        {Array.from({ length: leadingBlanks }, (_, i) => (
          <span key={`blank-${i}`} />
        ))}

        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          const value = iso(year, month, day);
          const isPast = new Date(year, month, day) < today;
          const isSelected = selected === value;

          return (
            <button
              key={value}
              type="button"
              disabled={isPast}
              aria-pressed={isSelected}
              aria-label={`${day} ${MONTHS[month]} ${year}`}
              onClick={() => onSelect(value)}
              className={cn(
                "mx-auto grid h-9 w-9 place-items-center rounded-full text-sm transition-colors",
                isPast
                  ? "cursor-not-allowed text-cream/25"
                  : "text-cream hover:bg-cream/15",
                isSelected && "bg-brand font-semibold text-cream hover:bg-brand",
              )}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
