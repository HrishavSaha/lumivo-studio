"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navLinks } from "@/lib/content";
import { cn } from "@/lib/cn";

export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "font-sans text-2xl font-bold uppercase leading-none tracking-tight",
        className,
      )}
    >
      Lumivo<span className="text-charcoal">.</span>
    </span>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile panel whenever the route changes — adjusting state during
  // render rather than in an effect, so it never renders open on the new route.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 bg-brand text-cream">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-5 sm:px-8 lg:h-20 lg:px-12">
        <Link href="/" aria-label="Lumivo Studio — home">
          <Wordmark />
        </Link>

        <nav
          aria-label="Main"
          className="hidden flex-1 items-center justify-center gap-8 lg:flex xl:gap-12"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={cn(
                "relative py-1 text-xs font-semibold uppercase tracking-[0.14em] transition-opacity hover:opacity-100",
                isActive(link.href) ? "opacity-100" : "opacity-85",
              )}
            >
              {link.label}
              <span
                aria-hidden="true"
                className={cn(
                  "absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-cream transition-opacity",
                  isActive(link.href) ? "opacity-100" : "opacity-0",
                )}
              />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/book"
            className="hidden rounded-full bg-cream px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.08em] text-ink transition-colors hover:bg-charcoal hover:text-cream sm:inline-flex sm:items-center sm:gap-2"
          >
            Book a free call
            <span aria-hidden="true">↗</span>
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
          >
            <span
              className={cn(
                "h-0.5 w-6 bg-cream transition-transform duration-200",
                open && "translate-y-2 rotate-45",
              )}
            />
            <span
              className={cn(
                "h-0.5 w-6 bg-cream transition-opacity duration-200",
                open && "opacity-0",
              )}
            />
            <span
              className={cn(
                "h-0.5 w-6 bg-cream transition-transform duration-200",
                open && "-translate-y-2 -rotate-45",
              )}
            />
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-cream/25 bg-brand lg:hidden"
      >
        <nav aria-label="Mobile" className="flex flex-col px-5 py-2 sm:px-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={cn(
                "border-b border-cream/15 py-3.5 text-sm font-semibold uppercase tracking-[0.14em]",
                isActive(link.href) ? "opacity-100" : "opacity-85",
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/book"
            className="my-4 inline-flex items-center justify-center gap-2 rounded-full bg-cream px-5 py-3 text-xs font-bold uppercase tracking-[0.08em] text-ink"
          >
            Book a free call <span aria-hidden="true">↗</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
