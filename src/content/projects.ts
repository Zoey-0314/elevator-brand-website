import type { Project } from "./types";

const concepts = [
  ["metropolitan-residential-concept", "Metropolitan Residential Study", "Residential", ["Passenger Elevator"]],
  ["atrium-mobility-concept", "Civic Atrium Mobility Study", "Public Infrastructure", ["Panoramic Elevator", "Escalator"]],
  ["healthcare-circulation-concept", "Healthcare Circulation Study", "Hospital", ["Hospital Elevator", "Passenger Elevator"]],
] as const;

const projectZh: Record<string, Project["zh"]> = {
  "metropolitan-residential-concept": {
    title: "都市住宅概念研究",
    country: "地点待确认",
    city: "信息待核实",
    buildingType: "住宅",
    elevatorTypes: ["乘客电梯"],
    summary: "明确标注的概念记录，用于展示未来经核实项目案例在网站中的内容结构。",
    description: "这不是 NS Elevator 已完工项目。它是未来录入真实项目范围、限制条件、选型、协调说明和经授权图片的内容模板。",
  },
  "atrium-mobility-concept": {
    title: "公共中庭交通概念研究",
    country: "地点待确认",
    city: "信息待核实",
    buildingType: "公共基础设施",
    elevatorTypes: ["观光电梯", "自动扶梯"],
    summary: "明确标注的概念记录，用于展示未来经核实项目案例在网站中的内容结构。",
    description: "这不是 NS Elevator 已完工项目。它是未来录入真实项目范围、限制条件、选型、协调说明和经授权图片的内容模板。",
  },
  "healthcare-circulation-concept": {
    title: "医疗流线概念研究",
    country: "地点待确认",
    city: "信息待核实",
    buildingType: "医院",
    elevatorTypes: ["医用电梯", "乘客电梯"],
    summary: "明确标注的概念记录，用于展示未来经核实项目案例在网站中的内容结构。",
    description: "这不是 NS Elevator 已完工项目。它是未来录入真实项目范围、限制条件、选型、协调说明和经授权图片的内容模板。",
  },
};

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
  zh: projectZh[slug],
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
