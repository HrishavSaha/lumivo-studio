import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/container";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { Reveal } from "@/components/ui/reveal";
import { ExtraServicesAccordion } from "@/components/services/extra-services-accordion";
import { extraServices } from "@/lib/content";

export const metadata: Metadata = {
  title: "Extra Services",
  description:
    "Strategy calls, logo design, graphic design, website design and development, business photoshoots and complete websites.",
};

export default function ExtraServicesPage() {
  return (
    <>
      <section className="relative overflow-x-clip bg-charcoal py-14 sm:py-20">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-14 lg:px-12">
          {/* Circular image inside a thick orange ring, bleeding off the left edge. */}
          <Reveal className="relative mx-auto w-full max-w-sm lg:mx-0 lg:-ml-44 lg:max-w-none">
            <div className="rounded-full bg-brand p-3 sm:p-4">
              <ImagePlaceholder
                src="extra-services-desk"
                alt="Stack of newspapers and a coffee cup, shot in black and white"
                ratio="1/1"
                rounded="full"
              />
            </div>
          </Reveal>

          <Reveal delay={120}>
            <ExtraServicesAccordion />
          </Reveal>
        </div>
      </section>

      <Section tone="cream">
        <Container>
          <div className="divide-y divide-ink/10">
            {extraServices.map((service, i) => (
              <Reveal
                key={service.slug}
                delay={Math.min(i, 3) * 80}
                as="article"
              >
                <div
                  id={service.slug}
                  className="grid gap-6 py-10 sm:py-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14"
                >
                  <h2 className="font-display text-4xl leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl">
                    {service.titleLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </h2>

                  <div className="border-l-[3px] border-brand pl-5 sm:pl-6">
                    <p className="text-xs leading-relaxed text-muted sm:text-sm">
                      {service.description}
                    </p>
                    <ButtonLink
                      href={`/book?service=${service.slug}`}
                      className="mt-6 text-sm sm:text-base"
                    >
                      Book Now !
                    </ButtonLink>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
