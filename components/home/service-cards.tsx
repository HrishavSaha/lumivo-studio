import Link from "next/link";
import { Container, Section } from "@/components/ui/container";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { Reveal } from "@/components/ui/reveal";
import { services } from "@/lib/content";

export function ServiceCards() {
  return (
    <Section tone="cream" className="pt-6 sm:pt-8 lg:pt-10">
      <Container>
        <Reveal>
          <h2 className="text-center font-display text-3xl leading-tight text-brand sm:text-4xl lg:text-5xl">
            Creative solutions that build strong brands
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-12">
          {services.map((service, i) => (
            <Reveal key={service.slug} delay={i * 100}>
              <Link
                href={`/services#${service.slug}`}
                className="group block text-center"
              >
                <ImagePlaceholder
                  src={service.image}
                  alt={service.alt}
                  ratio="1/1"
                  className="transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <h3 className="mt-6 font-display text-xl underline decoration-1 underline-offset-[6px] sm:text-2xl">
                  {service.title}
                </h3>
                <span className="mx-auto mt-4 block h-px w-full max-w-56 bg-brand/50" />
                <p className="mt-4 text-xs leading-relaxed text-muted sm:text-sm">
                  {service.blurb}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={150}>
          <div className="mt-16 text-center">
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
  );
}
