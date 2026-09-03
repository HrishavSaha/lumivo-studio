"use client";

import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { extraServices } from "@/lib/content";

export function ExtraServicesAccordion() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  return (
    <div>
      <h2 className="text-right font-display text-4xl leading-[1.05] text-cream sm:text-5xl lg:text-6xl">
        <span className="block">Our Extra</span>
        <span className="block">Services</span>
      </h2>

      <ul className="mt-8 divide-y divide-cream/20 border-t border-cream/20">
        {extraServices.map((service) => {
          const open = openSlug === service.slug;

          return (
            <li key={service.slug}>
              <button
                type="button"
                onClick={() => setOpenSlug(open ? null : service.slug)}
                aria-expanded={open}
                aria-controls={`panel-${service.slug}`}
                className="flex w-full items-center justify-between gap-4 py-3.5 text-left transition-colors hover:text-brand-warm"
              >
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-cream sm:text-base">
                    {service.title}
                  </span>
                  <span className="mt-0.5 block text-[11px] leading-snug text-cream/65 sm:text-xs">
                    {service.subtitle}
                  </span>
                </span>
                <svg
                  viewBox="0 0 10 12"
                  aria-hidden="true"
                  className={cn(
                    "h-3 w-2.5 shrink-0 fill-cream transition-transform duration-300",
                    open && "rotate-90",
                  )}
                >
                  <path d="M0 0l10 6-10 6z" />
                </svg>
              </button>

              {/* 0fr → 1fr avoids measuring heights in JS. */}
              <div
                id={`panel-${service.slug}`}
                className={cn(
                  "grid transition-[grid-template-rows] duration-300 ease-out",
                  open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                )}
              >
                <div className="overflow-hidden">
                  <div className="pb-4 text-xs leading-relaxed text-cream/75">
                    {service.description}
                    <Link
                      href={`#${service.slug}`}
                      className="mt-3 block font-semibold uppercase tracking-[0.12em] text-brand-warm underline underline-offset-4"
                    >
                      Read more ↓
                    </Link>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
