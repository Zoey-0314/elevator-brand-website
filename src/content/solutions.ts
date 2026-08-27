import type { Solution } from "./types";

const solutionNames = [
  ["residential", "Residential", ["passenger-elevator", "home-elevator"]],
  ["commercial", "Commercial", ["passenger-elevator", "panoramic-elevator", "escalator"]],
  ["hotel", "Hotel", ["passenger-elevator", "panoramic-elevator", "freight-elevator"]],
  ["hospital", "Hospital", ["hospital-elevator", "passenger-elevator"]],
  ["public-infrastructure", "Public Infrastructure", ["passenger-elevator", "escalator"]],
  ["industrial", "Industrial", ["freight-elevator", "passenger-elevator"]],
] as const;

export const solutions: Solution[] = solutionNames.map(([slug, name, productSlugs], index) => ({
  id: `solution-${index + 1}`,
  slug,
  name,
  index: String(index + 1).padStart(2, "0"),
  eyebrow: "Sector solution",
  overview: `A coordinated vertical-mobility approach for ${name.toLowerCase()} projects, shaped around circulation, user needs, building interfaces, and long-term operation.`,
  challenges: ["Traffic and route planning", "Architectural interface coordination", "User and accessibility needs", "Installation and service strategy"],
  benefits: ["One clear project brief", "Product selection tied to use", "Coordinated finishes and interfaces", "Structured handover pathway"],
  productSlugs: [...productSlugs],
  image: {
    src: index % 2 === 0 ? "/images/brand/atrium-concept.png" : "/images/brand/hero-architecture.png",
    alt: `Concept architectural visualization for a ${name.toLowerCase()} elevator solution`,
    caption: "Concept visualization — project references pending verification.",
    isConcept: true,
  },
  seoTitle: `${name} Elevator Solutions | NS Elevator`,
  seoDescription: `Project-led elevator planning for ${name.toLowerCase()} buildings from NS Elevator.`,
}));

export function getSolution(slug: string) {
  return solutions.find((solution) => solution.slug === slug);
}
