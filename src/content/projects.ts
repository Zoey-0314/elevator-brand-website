import type { Project } from "./types";

const concepts = [
  ["metropolitan-residential-concept", "Metropolitan Residential Study", "Residential", ["Passenger Elevator"]],
  ["atrium-mobility-concept", "Civic Atrium Mobility Study", "Public Infrastructure", ["Panoramic Elevator", "Escalator"]],
  ["healthcare-circulation-concept", "Healthcare Circulation Study", "Hospital", ["Hospital Elevator", "Passenger Elevator"]],
] as const;

const projectImages: Record<string, Project["images"][number]> = {
  "metropolitan-residential-concept": { src: "/images/projects/residential-study.png", alt: "Original concept study of a high-rise residential sky lobby with two passenger elevators", caption: "Concept study — not a completed NS Elevator installation.", isConcept: true },
  "atrium-mobility-concept": { src: "/images/projects/civic-atrium-study.png", alt: "Original concept study of a planted civic atrium with panoramic elevator and escalators", caption: "Concept study — not a completed NS Elevator installation.", isConcept: true },
  "healthcare-circulation-concept": { src: "/images/projects/healthcare-study.png", alt: "Original concept study of a hospital transfer lobby with a wide elevator cabin", caption: "Concept study — not a completed NS Elevator installation.", isConcept: true },
};

const projectEnglish: Record<string, Pick<Project, "summary" | "description">> = {
  "metropolitan-residential-concept": {
    summary: "A concept framework for documenting passenger-elevator planning in a high-rise residential building without presenting an unverified installation as fact.",
    description: "This study illustrates the information a verified residential reference should eventually contain: expected resident and visitor traffic, move-in and service routes, elevator grouping, shaft and landing interfaces, accessibility, cabin and lobby materials, installation constraints, handover records, and owner-approved project photography. No client, location, performance result, or completed NS Elevator scope is claimed.",
  },
  "atrium-mobility-concept": {
    summary: "A concept framework showing how panoramic elevators, escalators, accessible routes, and public-space architecture could be documented as one coordinated mobility system.",
    description: "A future verified civic reference should explain demand patterns, accessible alternatives, escalator landing capacity, elevator visibility, structural and glazing interfaces, public safety coordination, maintenance access, commissioning evidence, and approved imagery. This study demonstrates that structure only and does not identify a real client or completed installation.",
  },
  "healthcare-circulation-concept": {
    summary: "A concept framework for recording hospital elevator decisions around patient, bed, staff, visitor, and service movement while keeping unverified claims out of the site.",
    description: "A verified healthcare reference should document clinical and service routes, bed and trolley clearances, turning space, door and cabin coordination, durable cleanable finishes, controls, testing, operational handover, and publication approval. This study is a content template, not evidence of a completed NS Elevator hospital project.",
  },
};

const projectZh: Record<string, Project["zh"]> = {
  "metropolitan-residential-concept": {
    title: "都市住宅概念研究",
    country: "地点待确认",
    city: "信息待核实",
    buildingType: "住宅",
    elevatorTypes: ["乘客电梯"],
    summary: "用于展示高层住宅乘客电梯规划如何形成可信案例记录的概念框架，不将未经核实的安装项目当作事实发布。",
    description: "本研究展示未来经核实的住宅案例应包含的信息：住户与访客客流、搬家与后勤路线、电梯分组、井道与层站接口、无障碍需求、轿厢和大堂材质、安装限制、交付记录以及经业主授权的项目图片。当前不声称任何客户、地点、性能结果或已完成的 NS Elevator 项目范围。",
  },
  "atrium-mobility-concept": {
    title: "公共中庭交通概念研究",
    country: "地点待确认",
    city: "信息待核实",
    buildingType: "公共基础设施",
    elevatorTypes: ["观光电梯", "自动扶梯"],
    summary: "展示观光电梯、自动扶梯、无障碍路线与公共空间建筑如何作为统一交通系统进行记录的概念框架。",
    description: "未来经核实的公共项目案例应说明客流规律、无障碍替代路线、扶梯上下端容量、电梯可见性、结构与玻璃接口、公共安全协调、维保通道、调试证据及获准发布的图片。本研究只展示该内容结构，不代表真实客户或已完工项目。",
  },
  "healthcare-circulation-concept": {
    title: "医疗流线概念研究",
    country: "地点待确认",
    city: "信息待核实",
    buildingType: "医院",
    elevatorTypes: ["医用电梯", "乘客电梯"],
    summary: "围绕患者、病床、医护、访客及后勤运输记录医院电梯决策的概念框架，同时避免发布未经核实的项目声明。",
    description: "经核实的医疗案例应记录医疗与后勤路线、病床和推车净空、转弯空间、门及轿厢协调、耐用易清洁饰面、控制系统、测试、运营交付及发布授权。本研究是内容模板，不是 NS Elevator 已完成医院项目的证明。",
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
  ...projectEnglish[slug],
  zh: projectZh[slug],
  images: [projectImages[slug]],
  seoTitle: `${title} | NS Elevator`,
  seoDescription: `Concept project record for ${buildingType.toLowerCase()} vertical mobility. Verification required before launch.`,
  isPlaceholder: true,
}));

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
