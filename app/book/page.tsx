import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SplitHeading } from "@/components/ui/heading";
import { Reveal } from "@/components/ui/reveal";
import { BookingWidget } from "@/components/book/booking-widget";
import { extraServices, services } from "@/lib/content";

export const metadata: Metadata = {
  title: "Book a free call",
  description:
    "Pick a date and time for a free call with Lumivo Studio and tell us what you need help with.",
};

/** Resolves ?service=<slug> against both service lists for the prefill. */
function labelForSlug(slug: string | undefined) {
  if (!slug) return "";
  return (
    extraServices.find((s) => s.slug === slug)?.title ??
    services.find((s) => s.slug === slug)?.title ??
    ""
  );
}

export default async function BookPage({ searchParams }: PageProps<"/book">) {
  // searchParams is Promise-only in Next 16.
  const params = await searchParams;
  const raw = params.service;
  const slug = Array.isArray(raw) ? raw[0] : raw;

  return (
    <div className="bg-cream py-14 sm:py-20">
      <Container>
        <Reveal>
          <p className="text-center text-sm font-bold uppercase tracking-[0.1em] text-brand sm:text-base">
            Book a free call!
          </p>
          <span className="mx-auto mt-4 block h-px w-full max-w-2xl bg-ink/25" />
        </Reveal>

        <Reveal delay={100}>
          <SplitHeading
            as="h1"
            text="Build Something *Impossible* to ignore with us!"
            className="mx-auto mt-8 max-w-3xl text-center text-4xl leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          />
        </Reveal>

        <Reveal delay={180} className="mt-14">
          <BookingWidget defaultHelp={labelForSlug(slug)} />
        </Reveal>
      </Container>
    </div>
  );
}
