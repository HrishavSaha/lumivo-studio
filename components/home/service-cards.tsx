import Link from "next/link";
import { Container, Section } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { Reveal } from "@/components/ui/reveal";
import { services } from "@/lib/content";

export function ServiceCards() {
  return (
    <Section
      className="bg-[linear-gradient(180deg,var(--cream)_0%,var(--cream)_62%,var(--orange)_100%)] pt-6 text-ink sm:pt-8 lg:pt-10"
    >
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
                <h3 className="mt-6 font-display text-xl transition-colors group-hover:text-brand sm:text-2xl">
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
          <div className="mt-16 pb-4 text-center sm:mt-20">
            <p className="font-display text-3xl italic text-cream sm:text-4xl lg:text-5xl">
              Looking for something else?
            </p>
            <ButtonLink
              variant="pillDark"
              href="/services/extra"
              className="mt-7 gap-3 py-2.5 pl-7 pr-2.5 text-xs hover:bg-ink! sm:text-sm"
            >
              Check our other services
              <span
                aria-hidden="true"
                className="grid h-6 w-6 place-items-center rounded-full bg-cream text-charcoal"
              >
                <svg viewBox="0 0 16 16" className="h-3 w-3 fill-current">
                  <path d="M1 7.25h11.69L9.2 3.76a.75.75 0 1 1 1.06-1.06l5.3 5.3-5.3 5.3a.75.75 0 1 1-1.06-1.06l3.49-3.49H1a.75.75 0 0 1 0-1.5Z" />
                </svg>
              </span>
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
