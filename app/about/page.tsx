import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { Eyebrow, SplitHeading } from "@/components/ui/heading";
import { Reveal } from "@/components/ui/reveal";
import { about } from "@/lib/content";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "About",
  description:
    "Lumivo Studio helps service-based businesses get the attention they deserve through branding, content and social media.",
};

export default function AboutPage() {
  return (
    // One element owns the whole gradient so there is no seam behind the circles.
    <div className="overflow-x-clip bg-linear-to-b from-charcoal from-40% via-[#6b3010] via-75% to-brand text-cream">
      <Container className="pt-16 pb-10 sm:pt-24">
        <Reveal>
          <SplitHeading
            as="h1"
            text="About *Us*."
            className="text-center text-5xl tracking-tight sm:text-7xl lg:text-8xl"
          />
        </Reveal>

        <Reveal delay={120} className="mt-14 sm:mt-20">
          <Eyebrow rule>Our History</Eyebrow>
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-6 max-w-4xl space-y-4">
            {about.history.map((paragraph) => (
              <p
                key={paragraph.slice(0, 24)}
                className="text-sm leading-relaxed text-cream/85 sm:text-base"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>
      </Container>

      {/* Overlapping portrait trio — centre circle larger and above the others. */}
      <Reveal delay={100}>
        <div className="mx-auto flex max-w-3xl items-center justify-center px-5 py-12 sm:py-20">
          {about.portraits.map((portrait, i) => (
            <div
              key={portrait.image}
              className={cn(
                "shrink-0",
                i === 1
                  ? "z-10 w-40 sm:w-64 lg:w-80"
                  : "w-32 sm:w-52 lg:w-64",
                i === 1 ? "-mx-6 sm:-mx-10" : "",
              )}
            >
              <ImagePlaceholder
                src={portrait.image}
                alt={portrait.alt}
                ratio="1/1"
                rounded="full"
              />
            </div>
          ))}
        </div>
      </Reveal>

      <Container size="narrow" className="pb-20 text-center sm:pb-28">
        <Reveal>
          <SplitHeading
            text="People behind *LUMIVO*."
            className="text-3xl tracking-tight sm:text-5xl lg:text-6xl"
          />
          <span className="mx-auto mt-6 block h-px w-3/4 bg-cream/40" />
        </Reveal>

        <Reveal delay={140}>
          <div className="mt-10 space-y-6">
            {about.people.map((block, i) => (
              <div key={i} className="space-y-1">
                {block.lead ? (
                  <p className="text-sm leading-relaxed text-cream sm:text-base">
                    {block.lead}
                  </p>
                ) : null}
                <p className="text-sm leading-relaxed text-cream/85 sm:text-base">
                  {block.body}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </div>
  );
}
