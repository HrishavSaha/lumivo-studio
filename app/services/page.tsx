import type { Metadata } from "next";
import Link from "next/link";
import { Container, Section } from "@/components/ui/container";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { Reveal } from "@/components/ui/reveal";
import { ServiceBlock } from "@/components/services/service-block";
import { services } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Social media management, content creation and branding — everything your brand needs to stand out.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="relative overflow-x-clip bg-cream pt-12 pb-8 sm:pt-16">
        {/* Soft peach bloom behind the heading — pure CSS, no asset. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 -top-24 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(249,161,122,0.35),transparent_65%)]"
        />

        {/* Heading sits on the container grid; the camera runs off the right edge. */}
        <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_minmax(0,32rem)] lg:gap-6">
          <Reveal className="px-5 sm:px-8 lg:pl-[max(3rem,calc((100vw-72rem)/2+3rem))]">
            <h1 className="font-display text-5xl leading-none tracking-tight sm:text-7xl lg:text-8xl">
              Our Services
            </h1>
            <p className="mt-4 text-sm text-muted sm:text-base">
              Everything your brand needs to stand out.
            </p>
          </Reveal>

          <Reveal delay={120} className="px-5 sm:px-8 lg:px-0">
            <ImagePlaceholder
              src="services-hero-camera"
              alt="Hand holding an orange compact camera showing a photo on its screen"
              ratio="4/3"
            />
          </Reveal>
        </div>
      </section>

      <Section tone="cream" className="pt-0">
        <Container>
          <div className="divide-y divide-ink/10">
            {services.map((service) => (
              <ServiceBlock key={service.slug} service={service} />
            ))}
          </div>

          <Reveal>
            <div className="mt-12 text-center">
              <Link
                href="/services/extra"
                className="font-display text-2xl underline decoration-1 underline-offset-8 transition-colors hover:text-brand sm:text-3xl"
              >
                Extra Services
              </Link>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
