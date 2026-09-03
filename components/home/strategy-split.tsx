import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { Reveal } from "@/components/ui/reveal";

const words = ["Strategy", "Design", "Growth"];

/** Left edge stays on the container grid; the image runs off the right edge. */
const gutter = "px-5 sm:px-8 lg:pl-[max(3rem,calc((100vw-72rem)/2+3rem))]";

export function StrategySplit() {
  return (
    <section className="relative overflow-x-clip bg-cream py-12 sm:py-16 lg:py-20">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
        <Reveal className={`order-2 lg:order-1 ${gutter}`}>
          <p className="font-display text-3xl italic text-brand sm:text-4xl">
            we build with
          </p>
          <p className="mt-1 font-display text-[3.25rem] font-medium uppercase leading-[0.92] tracking-tight text-brand sm:text-7xl lg:text-8xl">
            {words.map((word) => (
              <span key={word} className="block">
                {word}
              </span>
            ))}
          </p>
        </Reveal>

        <Reveal delay={120} className="order-1 px-5 sm:px-8 lg:order-2 lg:px-0">
          <ImagePlaceholder
            src="home-strategy"
            alt="Creative director in an orange dress reviewing printed campaign proofs"
            ratio="4/3"
          />
        </Reveal>
      </div>
    </section>
  );
}
