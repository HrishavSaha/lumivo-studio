import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { Reveal } from "@/components/ui/reveal";
import { ContactForm } from "@/components/contact/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Have a project in mind? Get in touch with Lumivo Studio and we’ll bring your ideas to life.",
};

export default function ContactPage() {
  return (
    <section className="relative overflow-hidden bg-charcoal-deep pb-14 sm:pb-20">
      {/* Dark curtain backdrop, visible either side of the arch. */}
      <div aria-hidden="true" className="absolute inset-0">
        <ImagePlaceholder
          src="contact-curtain"
          alt=""
          ratio="1/1"
          className="h-full opacity-30"
        />
      </div>

      {/* Half-ellipse arch: 50% radii on both axes give a true dome at any width. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-[-14%] inset-y-0 rounded-t-[50%] bg-linear-to-b from-brand via-[#b8480f] to-[#5c2408]"
      />

      <Container className="relative pt-8 sm:pt-12">
        <Reveal>
          <h1 className="mx-auto w-fit bg-cream px-6 py-1.5 text-center font-sans text-3xl font-bold uppercase tracking-tight text-ink sm:px-10 sm:text-4xl">
            Contact Us
          </h1>
        </Reveal>

        <Reveal delay={120}>
          <p className="mt-6 text-center font-display text-xl text-cream sm:text-2xl">
            Let&rsquo;s get in touch with Lumivo Studio.
          </p>
          <p className="mx-auto mt-2 max-w-md text-center font-display text-sm text-cream/85">
            Have a project in mind? We&rsquo;d love to hear from you and bring
            your ideas to life.
          </p>
        </Reveal>

        <Reveal delay={200}>
          <div className="relative mx-auto mt-8 max-w-3xl border border-cream/70">
            <div className="grid lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
              {/* Fills its column edge to edge, so the panel border sits tight
                  against the image on all four sides. */}
              <div className="hidden bg-charcoal-deep lg:block">
                <ImagePlaceholder
                  src="contact-phone"
                  alt="Hand holding an orange corded telephone receiver against a black backdrop"
                  ratio="3/4"
                  className="h-full"
                />
              </div>

              <ContactForm />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
