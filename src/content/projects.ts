import type { Project } from "./types";

const concepts = [
  ["metropolitan-residential-concept", "Metropolitan Residential Study", "Residential", ["Passenger Elevator"]],
  ["atrium-mobility-concept", "Civic Atrium Mobility Study", "Public Infrastructure", ["Panoramic Elevator", "Escalator"]],
  ["healthcare-circulation-concept", "Healthcare Circulation Study", "Hospital", ["Hospital Elevator", "Passenger Elevator"]],
] as const;

export const projects: Project[] = concepts.map(([slug, title, buildingType, elevatorTypes], index) => ({
  id: `project-${index + 1}`,
  slug,
  title,
  country: "Location pending",
  city: "Verification pending",
  buildingType,
  elevatorTypes: [...elevatorTypes],
  summary: "A clearly labelled concept record demonstrating how verified project references will be structured on this site.",
  description:
    "This is not a claimed NS Elevator installation. It is a content placeholder for future verified scope, constraints, selected systems, coordination notes, and project imagery supplied by the owner.",
  images: [
    {
      src: index === 1 ? "/images/brand/atrium-concept.png" : "/images/brand/hero-architecture.png",
      alt: `Concept visualization for ${title}`,
      caption: "Concept study — replace with a verified project reference.",
      isConcept: true,
    },
  ],
  seoTitle: `${title} | NS Elevator`,
  seoDescription: `Concept project record for ${buildingType.toLowerCase()} vertical mobility. Verification required before launch.`,
  isPlaceholder: true,
}));

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
