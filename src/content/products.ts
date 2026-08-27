import type { Product } from "./types";

const hero = {
  src: "/images/brand/cabin-concept.png",
  alt: "Concept visualization of a dark brushed-metal elevator cabin",
  caption: "Concept visualization — final product imagery pending.",
  isConcept: true,
};

const atrium = {
  src: "/images/brand/atrium-concept.png",
  alt: "Concept visualization of a glass elevator in a multi-level atrium",
  caption: "Concept visualization — not a completed NS Elevator project.",
  isConcept: true,
};

const definitions: Array<
  Pick<Product, "slug" | "name" | "category" | "tagline" | "overview" | "benefits" | "applications">
> = [
  {
    slug: "passenger-elevator",
    name: "Passenger Elevator",
    category: "People movement",
    tagline: "A composed journey through every floor.",
    overview:
      "A project-configured passenger platform for residential and commercial buildings, balancing traffic planning, interior coordination, and accessible operation.",
    benefits: ["Project-specific planning", "Coordinated cabin finishes", "Accessible interface options", "Lifecycle documentation"],
    applications: ["Residential towers", "Offices", "Mixed-use buildings", "Education"],
  },
  {
    slug: "home-elevator",
    name: "Home Elevator",
    category: "Private residence",
    tagline: "Vertical comfort, quietly integrated.",
    overview:
      "A residential mobility concept designed to coordinate with private interiors, spatial constraints, and the everyday rhythms of a home.",
    benefits: ["Interior-led coordination", "Compact planning options", "Simple everyday operation", "Material flexibility"],
    applications: ["Villas", "Townhouses", "Multi-level apartments", "Private residences"],
  },
  {
    slug: "hospital-elevator",
    name: "Hospital Elevator",
    category: "Healthcare mobility",
    tagline: "Movement planned around care.",
    overview:
      "A healthcare-oriented configuration framework focused on bed movement, durable interiors, clear controls, and coordination with operational workflows.",
    benefits: ["Workflow-led planning", "Durable finish options", "Clear control layouts", "Handover documentation"],
    applications: ["Hospitals", "Clinics", "Care facilities", "Medical campuses"],
  },
  {
    slug: "freight-elevator",
    name: "Freight Elevator",
    category: "Materials movement",
    tagline: "Working capacity for demanding routes.",
    overview:
      "A goods-movement platform configured around loading patterns, doorway coordination, robust finishes, and the building's operational plan.",
    benefits: ["Load-route coordination", "Robust finish options", "Door planning", "Service access strategy"],
    applications: ["Warehouses", "Factories", "Retail back-of-house", "Logistics facilities"],
  },
  {
    slug: "panoramic-elevator",
    name: "Panoramic Elevator",
    category: "Architectural mobility",
    tagline: "Make movement part of the architecture.",
    overview:
      "A transparent vertical-mobility concept developed with the facade, atrium, or public interior so engineering and experience read as one gesture.",
    benefits: ["Architecture-led design", "Glazing coordination", "Material detailing", "Public-space integration"],
    applications: ["Hotels", "Retail atriums", "Cultural venues", "Commercial lobbies"],
  },
  {
    slug: "escalator",
    name: "Escalator",
    category: "Continuous flow",
    tagline: "Continuous movement, resolved with the space.",
    overview:
      "A planning-led escalator solution for continuous passenger movement, with attention to circulation, interfaces, finishes, and maintenance access.",
    benefits: ["Circulation planning", "Interface coordination", "Finish selection", "Maintenance access"],
    applications: ["Retail", "Transport", "Convention venues", "Public buildings"],
  },
];

export const products: Product[] = definitions.map((product, index) => ({
  ...product,
  id: `product-${index + 1}`,
  index: String(index + 1).padStart(2, "0"),
  heroImage: product.slug === "panoramic-elevator" || product.slug === "escalator" ? atrium : hero,
  gallery: [hero, atrium],
  specifications: [
    { label: "Application", value: "Configured to project brief" },
    { label: "Rated load", value: "To be confirmed by engineering selection" },
    { label: "Rated speed", value: "To be confirmed by traffic study" },
    { label: "Door arrangement", value: "Project-dependent" },
    { label: "Finishes", value: "Curated project palette" },
    { label: "Codes & standards", value: "Confirm for installation jurisdiction" },
  ],
  seoTitle: `${product.name} | NS Elevator`,
  seoDescription: `${product.name} concepts configured around architecture, engineering, and project delivery by NS Elevator.`,
  isPlaceholder: true,
}));

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}
