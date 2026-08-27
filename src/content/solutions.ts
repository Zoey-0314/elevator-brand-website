import type { Solution } from "./types";

const solutionNames = [
  ["residential", "Residential", ["passenger-elevator", "home-elevator"]],
  ["commercial", "Commercial", ["passenger-elevator", "panoramic-elevator", "escalator"]],
  ["hotel", "Hotel", ["passenger-elevator", "panoramic-elevator", "freight-elevator"]],
  ["hospital", "Hospital", ["hospital-elevator", "passenger-elevator"]],
  ["public-infrastructure", "Public Infrastructure", ["passenger-elevator", "escalator"]],
  ["industrial", "Industrial", ["freight-elevator", "passenger-elevator"]],
] as const;

const solutionZh: Record<string, Solution["zh"]> = {
  residential: {
    name: "住宅",
    eyebrow: "行业解决方案",
    overview: "面向住宅项目的垂直交通协同方案，围绕客流、住户需求、建筑接口和长期运营进行规划。",
    challenges: ["客流与路线规划", "建筑接口协调", "用户及无障碍需求", "安装与维保策略"],
    benefits: ["清晰统一的项目需求", "按用途进行产品选型", "饰面与接口协调", "结构化交付路径"],
  },
  commercial: {
    name: "商业",
    eyebrow: "行业解决方案",
    overview: "面向商业项目的垂直交通协同方案，兼顾高峰客流、公共体验、建筑接口与持续运营。",
    challenges: ["高峰客流与路线规划", "建筑接口协调", "公众及无障碍需求", "安装与维保策略"],
    benefits: ["清晰统一的项目需求", "按用途进行产品选型", "饰面与接口协调", "结构化交付路径"],
  },
  hotel: {
    name: "酒店",
    eyebrow: "行业解决方案",
    overview: "面向酒店项目的垂直交通协同方案，平衡宾客体验、后勤流线、建筑设计和长期运营。",
    challenges: ["宾客与后勤流线规划", "建筑接口协调", "舒适度及无障碍需求", "安装与维保策略"],
    benefits: ["清晰统一的项目需求", "按用途进行产品选型", "饰面与接口协调", "结构化交付路径"],
  },
  hospital: {
    name: "医院",
    eyebrow: "行业解决方案",
    overview: "面向医院项目的垂直交通协同方案，围绕病床运输、人员流线、建筑接口和持续运营进行规划。",
    challenges: ["医疗流线与路线规划", "建筑接口协调", "患者及无障碍需求", "安装与维保策略"],
    benefits: ["清晰统一的项目需求", "按医疗用途进行选型", "耐用饰面与接口协调", "结构化交付路径"],
  },
  "public-infrastructure": {
    name: "公共基础设施",
    eyebrow: "行业解决方案",
    overview: "面向公共基础设施的垂直交通协同方案，关注大客流、耐久性、无障碍和长期运营。",
    challenges: ["大客流与路线规划", "建筑接口协调", "公众及无障碍需求", "安装与维保策略"],
    benefits: ["清晰统一的项目需求", "按公共用途进行选型", "耐用饰面与接口协调", "结构化交付路径"],
  },
  industrial: {
    name: "工业",
    eyebrow: "行业解决方案",
    overview: "面向工业项目的垂直交通协同方案，围绕荷载、物流路线、耐用接口和长期运营进行规划。",
    challenges: ["荷载与物流路线规划", "建筑接口协调", "人员及安全需求", "安装与维保策略"],
    benefits: ["清晰统一的项目需求", "按工业用途进行选型", "耐用饰面与接口协调", "结构化交付路径"],
  },
};

export const solutions: Solution[] = solutionNames.map(([slug, name, productSlugs], index) => ({
  id: `solution-${index + 1}`,
  slug,
  name,
  index: String(index + 1).padStart(2, "0"),
  eyebrow: "Sector solution",
  overview: `A coordinated vertical-mobility approach for ${name.toLowerCase()} projects, shaped around circulation, user needs, building interfaces, and long-term operation.`,
  challenges: ["Traffic and route planning", "Architectural interface coordination", "User and accessibility needs", "Installation and service strategy"],
  benefits: ["One clear project brief", "Product selection tied to use", "Coordinated finishes and interfaces", "Structured handover pathway"],
  zh: solutionZh[slug],
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
