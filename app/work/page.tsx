import type { Metadata } from "next";
import Link from "next/link";
import { Container, Section } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { WorkCarousel } from "@/components/work/work-carousel";
import { workCategories, workIntro } from "@/lib/content";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Branding, content creation and social media work from the Lumivo Studio portfolio.",
};

export default function WorkPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-brand py-14 text-center sm:py-20">
        {/* Layered radial gradients stand in for the mockup's warm texture. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-70 [background:radial-gradient(60%_80%_at_20%_15%,#ffb066_0%,transparent_60%),radial-gradient(50%_70%_at_80%_25%,#ff8a2b_0%,transparent_60%),radial-gradient(70%_90%_at_50%_100%,#8c2f05_0%,transparent_65%)]"
        />

        <Container className="relative">
          <Reveal>
            <h1 className="font-display text-5xl uppercase leading-none tracking-tight text-cream sm:text-7xl lg:text-8xl">
              Our Work
            </h1>
          </Reveal>

          <Reveal delay={120}>
            <nav
              aria-label="Work categories"
              className="mt-8 flex flex-wrap justify-center gap-3 sm:gap-6"
            >
              {workCategories.map((category) => (
                <Link
                  key={category.slug}
                  href={`#${category.slug}`}
                  className="rounded-full bg-charcoal px-5 py-2 font-display text-sm text-cream transition-colors hover:bg-cream hover:text-ink sm:text-base"
                >
                  {category.title}
                </Link>
              ))}
            </nav>
          </Reveal>
        </Container>
      </section>

      <Section tone="cream" className="py-10 sm:py-12">
        <Container size="narrow">
          <Reveal>
            {/* TODO: replace the mockup's lorem ipsum with real copy. */}
            <p className="text-center text-[11px] leading-relaxed text-muted sm:text-xs">
              {workIntro}
            </p>
          </Reveal>
        </Container>
      </Section>

      {workCategories.map((category) => (
        <Section
          key={category.slug}
          id={category.slug}
          tone={category.tone === "orange" ? "orange" : "cream"}
          className={cn("py-14 sm:py-20", category.tone === "cream" && "relative")}
        >
          {category.tone === "cream" ? (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-24 mx-auto h-[28rem] max-w-4xl rounded-full bg-[radial-gradient(circle,rgba(249,161,122,0.28),transparent_65%)]"
            />
          ) : null}

          <Container className="relative">
            <Reveal>
              <h2
                className={cn(
                  "text-center font-display text-3xl leading-tight tracking-tight sm:text-5xl lg:text-6xl",
                  category.tone === "orange" ? "text-cream" : "text-ink",
                )}
              >
                {category.title}
              </h2>
            </Reveal>

            <Reveal delay={120} className="mt-10">
              <WorkCarousel cards={category.cards} title={category.title} />
            </Reveal>
          </Container>
        </Section>
      ))}
    </>
  );
}
