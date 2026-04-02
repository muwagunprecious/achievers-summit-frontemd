export type TicketCategory = "summit" | "gala" | "group";

export type TicketDay = {
  active: boolean;
  highlight?: boolean;
  label: string;
};

export type TicketFeature = {
  bold?: boolean;
  text: string;
};

export type TicketOption = {
  bgTint?: string;
  category: TicketCategory;
  className: string;
  days: TicketDay[];
  description: string;
  features: TicketFeature[];
  id: string;
  labelColor?: string;
  price: number;
  priceDisplay: string;
  priceSuffix: string;
  slug: string;
  subtitle: string;
  title: string;
};

export const TICKET_OPTIONS: readonly TicketOption[] = [
  {
    slug: "general-admission",
    id: "T01",
    title: "General Admission▪ T01",
    subtitle: "Terminal Access",
    className: "",
    price: 10000,
    priceDisplay: "₦10,000",
    priceSuffix: "/person",
    category: "summit",
    days: [
      { label: "DAY 1", active: true },
      { label: "DAY 2", active: false },
      { label: "GALA NIGHT", active: false },
    ],
    description: "Business & leadership enthusiasts seeking inspiration and connection",
    features: [
      { text: "Summit Day 1 Full Access" },
      { text: "Breakout Sessions" },
      { text: "Exhibition Floor & Brand Activations" },
      { text: "Event Badge" },
    ],
  },
  {
    slug: "standard-pass",
    id: "E02",
    title: "Standard Pass▪ E02",
    subtitle: "Economy Class",
    className: "",
    price: 40000,
    priceDisplay: "₦40,000",
    priceSuffix: "/person",
    category: "summit",
    days: [
      { label: "DAY 1", active: true },
      { label: "DAY 2", active: true },
      { label: "GALA NIGHT", active: false },
    ],
    description: "Entrepreneurs, leaders and influencers seeking growth, collaboration and deals",
    features: [
      { text: "All Terminal Access privileges" },
      { text: "Meet & Greet Session", bold: true },
      { text: "Priority registration" },
      { text: "Standard breakout sessions" },
      { text: "Business Lounge access" },
    ],
  },
  {
    slug: "business-class",
    id: "B03",
    title: "Most Popular▪ B03",
    subtitle: "Business Class",
    className: "",
    price: 100000,
    priceDisplay: "₦100,000",
    priceSuffix: "/person",
    labelColor: "#000ff9",
    bgTint: "rgba(0,15,249,0.1)",
    category: "summit",
    days: [
      { label: "DAY 1", active: true },
      { label: "DAY 2", active: true },
      { label: "GALA NIGHT", active: true, highlight: true },
    ],
    description: "Business executives, leaders and decision-makers wanting premium full-event access",
    features: [
      { text: "Full 3-Day Access", bold: true },
      { text: "Reserved VIP Seating", bold: true },
      { text: "Photo moments, Meet & Greet with speakers", bold: true },
      { text: "Priority check-in" },
      { text: "Certificate of Participation" },
    ],
  },
  {
    slug: "investors-pass",
    id: "F04",
    title: "Investors Pass▪ F04",
    subtitle: "First Class",
    className: "",
    price: 250000,
    priceDisplay: "₦250,000",
    priceSuffix: "/person",
    labelColor: "#ff5c00",
    bgTint: "rgba(255,217,102,0.1)",
    category: "summit",
    days: [
      { label: "DAY 1", active: true },
      { label: "DAY 2", active: true },
      { label: "GALA NIGHT", active: true, highlight: true },
    ],
    description: "Investors, awardees and executives seeking highest-level access and deal-making",
    features: [
      { text: "Investor Roundtable & Deal Room", bold: true },
      { text: "Reserved Seating at Investors Panel", bold: true },
      { text: "One-on-one meetings with speakers", bold: true },
      { text: "Full 3-Day Access" },
      { text: "Priority check-in" },
    ],
  },
  {
    slug: "gala-night-single",
    id: "G01",
    title: "Gala Night▪ G01",
    subtitle: "Gala Night — Single",
    className: "",
    price: 50000,
    priceDisplay: "₦50,000",
    priceSuffix: "/person",
    category: "gala",
    days: [
      { label: "DAY 1", active: false },
      { label: "DAY 2", active: false },
      { label: "GALA NIGHT", active: true, highlight: true },
    ],
    description: "August 13 · Oriental Hotel, Victoria Island",
    features: [
      { text: "Red carpet & gala dinner", bold: true },
      { text: "Entertainment performances & award presentations" },
      { text: "Cocktail reception" },
      { text: "Meet & Greet with performers" },
      { text: "Photo opportunities" },
    ],
  },
  {
    slug: "gala-night-couple",
    id: "G06",
    title: "Gala Night▪Couple▪ G06",
    subtitle: "Gala Night — Couple",
    className: "",
    price: 80000,
    priceDisplay: "₦80,000",
    priceSuffix: "/2 persons",
    category: "gala",
    days: [
      { label: "DAY 1", active: false },
      { label: "DAY 2", active: false },
      { label: "GALA NIGHT", active: true, highlight: true },
    ],
    description: "Save NGN 20,000 vs. two single passes · Oriental Hotel, Victoria Island",
    features: [
      { text: "Admits 2 guests", bold: true },
      { text: "Red carpet & gala dinner", bold: true },
      { text: "Entertainment performances & award presentations" },
      { text: "Cocktail reception" },
      { text: "Meet & Greet with performers" },
      { text: "Photo opportunities" },
    ],
  },
  {
    slug: "innovators-pass",
    id: "I07",
    title: "Innovators Pass▪Admits 2▪I07",
    subtitle: "Economy Tier 2",
    className: "",
    price: 60000,
    priceDisplay: "₦60,000",
    priceSuffix: "/2 persons",
    category: "group",
    days: [
      { label: "DAY 1", active: true },
      { label: "DAY 2", active: true },
      { label: "GALA NIGHT", active: false },
    ],
    description: "Leaders & business partners looking to learn and grow together — save up to 25%",
    features: [
      { text: "Admits 2 people", bold: true },
      { text: "All Economy Class Privileges" },
      { text: "Meet & Greet Session" },
      { text: "Priority registration" },
      { text: "Business Lounge access" },
    ],
  },
  {
    slug: "group-pass",
    id: "C08",
    title: "Group Pass▪Admits 10▪C08",
    subtitle: "Community Pass",
    className: "",
    price: 90000,
    priceDisplay: "₦90,000",
    priceSuffix: "/10 persons",
    category: "group",
    days: [
      { label: "DAY 1", active: true },
      { label: "DAY 2", active: false },
      { label: "GALA NIGHT", active: false },
    ],
    description: "Organisations, churches, institutions & community groups — Day 1 only",
    features: [
      { text: "Admits 10 people", bold: true },
      { text: "Full Day 1 Summit access" },
      { text: "Breakout sessions" },
      { text: "Exhibition floor & brand activations" },
      { text: "Event badges for all" },
    ],
  },
] as const;

export const TICKET_OPTIONS_BY_SLUG = new Map(
  TICKET_OPTIONS.map((ticket) => [ticket.slug, ticket]),
);

export function getTicketOptionBySlug(slug: string) {
  return TICKET_OPTIONS_BY_SLUG.get(slug) ?? null;
}
