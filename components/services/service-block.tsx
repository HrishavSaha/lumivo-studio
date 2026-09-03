import { ButtonLink } from "@/components/ui/button";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { Reveal } from "@/components/ui/reveal";
import type { Service } from "@/lib/content";

export function ServiceBlock({ service }: { service: Service }) {
  return (
    <div
      id={service.slug}
      className="grid items-center gap-8 py-10 sm:py-14 lg:grid-cols-2 lg:gap-16"
    >
      <Reveal>
        <h2 className="font-display text-4xl leading-[1.05] text-brand-warm sm:text-5xl lg:text-6xl">
          {service.titleLines.filter(Boolean).map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>

        <p className="mt-6 max-w-md text-sm leading-relaxed text-muted">
          {service.blurb}
        </p>

        <div className="mt-8 flex flex-col items-start gap-3">
          <ButtonLink variant="pillDark" href={`/work#${service.slug}`}>
            See our work
          </ButtonLink>
          <ButtonLink href="/book">Book a FREE call</ButtonLink>
        </div>
      </Reveal>

      <Reveal delay={120}>
        <ImagePlaceholder
          src={service.image}
          alt={service.alt}
          ratio="4/3"
          rounded="md"
        />
      </Reveal>
    </div>
  );
}
