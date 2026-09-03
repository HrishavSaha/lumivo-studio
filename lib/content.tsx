import type { ReactNode } from "react";

/* -------------------------------------------------------------------------- */
/*  Navigation                                                                */
/* -------------------------------------------------------------------------- */

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

/* -------------------------------------------------------------------------- */
/*  Contact details                                                           */
/* -------------------------------------------------------------------------- */

export const contactDetails = {
  // TODO: replace with the real street address.
  address: "Fill this with your business address",
  // TODO: replace with the real inbox.
  email: "Fill this with your email address",
  instagram: "lumivo.studio1",
  instagramUrl: "https://instagram.com/lumivo.studio1",
  phone: "+32 471 80 64 49",
  phoneHref: "tel:+32471806449",
};

/* -------------------------------------------------------------------------- */
/*  Core services (home cards + services page blocks)                         */
/* -------------------------------------------------------------------------- */

export type Service = {
  slug: string;
  title: string;
  /** Two-line title used on the services page, where it wraps. */
  titleLines: [string, string?];
  blurb: string;
  image: string;
  alt: string;
};

export const services: Service[] = [
  {
    slug: "social-media-management",
    title: "Social Media Management",
    titleLines: ["Social Media", "Management"],
    blurb:
      "Content planning, scheduling & community management that keeps your brand active and engaging.",
    image: "service-social-media",
    alt: "A phone showing a managed Instagram grid beside a laptop",
  },
  {
    slug: "content-creation",
    title: "Content Creation",
    titleLines: ["Content", "Creation"],
    blurb:
      "Reels, photos, carousels & graphics designed to capture attention and turn viewers into customers.",
    image: "service-content-creation",
    alt: "A camera and media-team lanyard on a studio chair",
  },
  {
    slug: "branding-visual-identity",
    title: "Branding & Visual Identity",
    titleLines: ["Branding", "& Visual Identity"],
    blurb:
      "Visual identities, brand direction & design systems that make your business look professional and recognizable.",
    image: "service-branding",
    alt: "A brand identity system displayed on a desktop screen",
  },
];

/* -------------------------------------------------------------------------- */
/*  Extra services                                                            */
/* -------------------------------------------------------------------------- */

export type ExtraService = {
  slug: string;
  title: string;
  subtitle: string;
  /** Display name, split so it wraps the way the mockup does. */
  titleLines: string[];
  description: ReactNode;
};

export const extraServices: ExtraService[] = [
  {
    slug: "strategy-calls",
    title: "Strategy Calls",
    subtitle: "Business analysis, creative ideas & marketing direction",
    titleLines: ["Strategy", "Calls."],
    description: (
      <>
        Let&rsquo;s have a chat about your business and where you want to take
        it. We&rsquo;ll look at what you&rsquo;re currently doing, what could be
        improved, and where we see opportunities to help you grow. We&rsquo;ll
        also share some ideas specifically for your business and answer any
        questions you have.
      </>
    ),
  },
  {
    slug: "logo-design",
    title: "Logo Design Only",
    subtitle: "Custom logo design",
    titleLines: ["Logo", "Design", "Only"],
    description: (
      <>
        A logo that actually feels like your brand. We create a clean, memorable
        logo that fits your style, your audience, and the way you want your
        business to be seen. You&rsquo;ll receive a logo that&rsquo;s ready to
        use across social media, your website, and print.
      </>
    ),
  },
  {
    slug: "graphic-design",
    title: "Graphic Design",
    subtitle: "Social posts, flyers & promotional graphics",
    titleLines: ["Graphic", "Design"],
    description: (
      <>
        Got something in mind but don&rsquo;t know how to make it look right?
        We&rsquo;ll turn your ideas into clean, on-brand designs that actually
        feel like your business — we&rsquo;ll create it for you.{" "}
        <strong className="font-semibold text-ink">
          Unlimited revisions included
        </strong>{" "}
        — we&rsquo;ll keep working on it until you&rsquo;re happy with the final
        design.
      </>
    ),
  },
  {
    slug: "website-design",
    title: "Website Design",
    subtitle: "Custom website layout, UI/UX & visual design",
    titleLines: ["Website", "Design"],
    description: (
      <>
        Your website should make a good first impression and make it easy for
        people to understand what you do. We&rsquo;ll design a website that fits
        your brand and feels natural to use. From the layout and visuals to the
        little details, everything is made around your business and your goals.
      </>
    ),
  },
  {
    slug: "website-development",
    title: "Website Development",
    subtitle: "Building and launching the website",
    titleLines: ["Website", "Development"],
    description: (
      <>
        We&rsquo;ll take your website design and turn it into a real, working
        website. Everything will be built to work smoothly across phones,
        tablets, and computers, with a focus on making it fast, easy to use, and
        simple for your customers to navigate.
      </>
    ),
  },
  {
    slug: "business-photoshoot",
    title: "Business Photoshoot",
    subtitle: "Professional photoshoot at your business/location",
    titleLines: ["Business", "Photoshoot"],
    description: (
      <>
        We come to your business and capture natural, high-quality photos taken
        by a professional camera. From your space and products to you and your
        team, we&rsquo;ll create visuals that show what your business is really
        about.{" "}
        <span className="font-semibold text-brand">
          Currently available in Belgium only.
        </span>
      </>
    ),
  },
  {
    slug: "complete-website",
    title: "Complete Website",
    subtitle: "Website Design + Website Development",
    titleLines: ["Complete", "Website"],
    description: (
      <>
        Need a website but don&rsquo;t want to deal with the whole process
        yourself? We&rsquo;ll take care of everything from start to finish — from
        the design and development to making sure everything works properly and
        is ready to go live.
      </>
    ),
  },
];

/* -------------------------------------------------------------------------- */
/*  Work                                                                      */
/* -------------------------------------------------------------------------- */

export type WorkCard = {
  label: string;
  description: string;
  image: string;
  alt: string;
};

export type WorkCategory = {
  slug: string;
  title: string;
  tone: "cream" | "orange";
  cards: WorkCard[];
};

// TODO: replace with real copy — the mockup uses lorem ipsum here.
const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eu lobortis lacus, eget tempus nulla. Curabitur porta nisl nisl, in sodales eros lacinia at.";

export const workIntro = `${LOREM} ${LOREM}`;

export const workCategories: WorkCategory[] = [
  {
    slug: "branding-visual-identity",
    title: "Branding & Visual Identity",
    tone: "cream",
    cards: [
      {
        label: "Arabella",
        description:
          "Arabella is a modern clothing boutique offering carefully curated pieces designed to celebrate effortless style, femininity, and confidence.",
        image: "work-arabella-branding",
        alt: "Arabella branded shopping bag with ribbon handles",
      },
      {
        label: "Yana Monoi",
        description:
          "Yana Monoi is a beauty and lifestyle brand based in Antwerp, focused on creating a tropical, sun-inspired self-care experience. The brand combines beauty, wellness, and an effortless island feel through its products and distinctive visual identity.",
        image: "work-yana-monoi-branding",
        alt: "Yana Monoi product set with pink packaging and mug",
      },
      {
        // TODO: real client name.
        label: "Client's name",
        description: LOREM,
        image: "work-branding-03",
        alt: "Acrylic review stand with a QR code on a salon counter",
      },
    ],
  },
  {
    slug: "content-creation",
    title: "Content Creation",
    tone: "orange",
    cards: [
      {
        label: "Reels",
        description: LOREM,
        image: "work-reels",
        alt: "Branded takeaway cup with a floral illustration",
      },
      {
        label: "Long-Form Videos",
        description: LOREM,
        image: "work-long-form-videos",
        alt: "Product flat lay styled for a long-form video shoot",
      },
      {
        label: "Photography",
        description: LOREM,
        image: "work-photography",
        alt: "Product photography of an acrylic review stand",
      },
    ],
  },
  {
    slug: "social-media-management",
    title: "Social Media Management",
    tone: "cream",
    cards: [
      {
        label: "Arabella",
        description: LOREM,
        image: "work-arabella-social",
        alt: "Arabella social media content grid",
      },
      {
        // TODO: real client name.
        label: "Client's name",
        description: LOREM,
        image: "work-social-02",
        alt: "Styled product photography used for social posts",
      },
      {
        // TODO: real client name.
        label: "Client's name",
        description: LOREM,
        image: "work-social-03",
        alt: "In-store review stand photographed for social content",
      },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  About                                                                     */
/* -------------------------------------------------------------------------- */

export const about = {
  history: [
    "Lumivo. started from a simple idea: help good businesses get the attention they deserve.",
    "We noticed that a lot of service-based businesses have great work behind them, but their branding and online presence don’t always show it. That’s where we come in. We help businesses bring their ideas to life through branding, content, and social media — making everything feel more professional, consistent, and true to who they are.",
    "We’re not here to make every business look the same. We want to understand what makes each one different and build something around that.",
  ],
  people: [
    {
      lead: "We’re just a group of creative people who genuinely enjoy building things.",
      body: "We like coming up with ideas, designing, creating content, and seeing a business go from “this could be better” to something they’re actually proud to show people.",
    },
    {
      lead: "",
      body: "We work closely with the businesses we help, keep things simple, and care about the little details. At the end of the day, we want our work to make your business look good — but more importantly, help it grow.",
    },
  ],
  portraits: [
    { image: "about-portrait-01", alt: "Lumivo team member portrait" },
    { image: "about-portrait-02", alt: "Lumivo team member portrait" },
    { image: "about-portrait-03", alt: "Lumivo team member portrait" },
  ],
};

/* -------------------------------------------------------------------------- */
/*  Booking                                                                   */
/* -------------------------------------------------------------------------- */

export const timeSlots = [
  "09.00 AM",
  "10.00 AM",
  "11.00 AM",
  "01.00 PM",
  "02.00 PM",
  "03.00 PM",
  "04.00 PM",
  "05.00 PM",
  "06.00 PM",
];
