import { ButtonLink } from "@/components/ui/button";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { Reveal } from "@/components/ui/reveal";
import type { Service } from "@/lib/content";

export function ServiceBlock({ service }: { service: Service }) {
  return (
    <div
      id={service.slug}
      className="grid items-stretch gap-8 py-10 sm:py-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,36rem)] lg:gap-16"
    >
      <Reveal
        className="flex flex-col justify-center px-5 sm:px-8 lg:pl-[max(3rem,calc((100vw-72rem)/2+3rem))] lg:pr-0"
      >
        <h2 className="font-display italic text-4xl leading-[1.05] text-brand-warm sm:text-5xl lg:text-6xl">
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
          <ButtonLink href="/book">
            Book a <em>FREE</em> call
          </ButtonLink>
        </div>
      </Reveal>

      <Reveal delay={120} className="px-5 sm:px-8 lg:px-0">
        <ImagePlaceholder
          src={service.image}
          alt={service.alt}
          ratio="4/3"
          rounded="xl"
          className="lg:aspect-auto! lg:h-full lg:rounded-l-[2.5rem] lg:rounded-r-none"
        />
      </Reveal>
    </div>
  );
}
