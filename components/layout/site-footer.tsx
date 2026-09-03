import Link from "next/link";
import type { ReactNode } from "react";
import { contactDetails } from "@/lib/content";

function Pin() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
      <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
    </svg>
  );
}

function Envelope() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
      <path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm9 8 8-5H4l8 5Zm0 2.2L4 10v7h16v-7l-8 5.2Z" />
    </svg>
  );
}

function Instagram() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
      <path d="M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2Zm0 3.05A6.75 6.75 0 1 0 18.75 12 6.75 6.75 0 0 0 12 5.25Zm0 11.13A4.38 4.38 0 1 1 16.38 12 4.38 4.38 0 0 1 12 16.38Zm6.98-11.4a1.58 1.58 0 1 1-1.58-1.57 1.58 1.58 0 0 1 1.58 1.57Z" />
    </svg>
  );
}

function Phone() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
      <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24 11.4 11.4 0 0 0 3.6.58 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .58 3.6 1 1 0 0 1-.25 1l-2.23 2.2Z" />
    </svg>
  );
}

function ContactPill({
  icon,
  children,
  href,
}: {
  icon: ReactNode;
  children: ReactNode;
  href?: string;
}) {
  const inner = (
    <>
      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-cream text-charcoal">
        {icon}
      </span>
      <span className="truncate text-xs font-medium sm:text-sm">{children}</span>
    </>
  );

  const className =
    "flex items-center gap-3 rounded-full bg-charcoal px-3 py-2 pr-5 text-cream transition-colors hover:bg-brand";

  return href ? (
    <a href={href} className={className}>
      {inner}
    </a>
  ) : (
    <div className={className}>{inner}</div>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-cream text-ink">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-16 lg:px-12">
        <Link href="/" className="flex flex-col items-center gap-1 lg:items-start">
          <span className="font-sans text-4xl font-bold uppercase leading-none tracking-tight">
            Lumivo<span className="text-brand">.</span>
          </span>
          <span className="flex w-full items-center gap-2">
            <span className="h-px flex-1 bg-brand/70" />
            <span className="text-xs font-medium uppercase tracking-[0.5em]">
              Studio
            </span>
            <span className="h-px flex-1 bg-brand/70" />
          </span>
          <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-muted">
            Marketing Agency
          </span>
        </Link>

        <div className="grid gap-3 sm:grid-cols-2">
          <ContactPill icon={<Pin />}>{contactDetails.address}</ContactPill>
          <ContactPill icon={<Envelope />}>{contactDetails.email}</ContactPill>
          <ContactPill icon={<Instagram />} href={contactDetails.instagramUrl}>
            {contactDetails.instagram}
          </ContactPill>
          <ContactPill icon={<Phone />} href={contactDetails.phoneHref}>
            {contactDetails.phone}
          </ContactPill>
        </div>
      </div>

      <div className="border-t border-ink/10">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-5 py-5 text-[11px] text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
          <p>© {new Date().getFullYear()} Lumivo Studio. All rights reserved.</p>
          <Link href="/book" className="font-medium underline underline-offset-4">
            Book a free call
          </Link>
        </div>
      </div>
    </footer>
  );
}
