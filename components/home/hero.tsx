import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SplitHeading } from "@/components/ui/heading";
import { Reveal } from "@/components/ui/reveal";

export function HomeHero() {
  return (
    <section className="relative overflow-x-clip bg-cream pt-16 pb-10 text-center sm:pt-20 lg:pt-28">
      <Container size="narrow">
        <Reveal>
          <SplitHeading
            as="h1"
            text="We make Brands *Impossible* to ignore"
            className="text-[2.75rem] leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl"
          />
        </Reveal>

        <Reveal delay={120}>
          <p className="mt-6 font-display text-base text-ink/80 sm:text-lg">
            A creative Social Media and Marketing agency
          </p>
        </Reveal>

        <Reveal delay={220}>
          <ButtonLink href="/book" className="mt-10">
            Book a <em>FREE</em> call
          </ButtonLink>
        </Reveal>
      </Container>
    </section>
  );
}
