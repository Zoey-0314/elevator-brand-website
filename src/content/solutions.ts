import type { Solution } from "./types";

const solutionNames = [
  ["residential", "Residential", ["passenger-elevator", "home-elevator"]],
  ["commercial", "Commercial", ["passenger-elevator", "panoramic-elevator", "escalator"]],
  ["hotel", "Hotel", ["passenger-elevator", "panoramic-elevator", "freight-elevator"]],
  ["hospital", "Hospital", ["hospital-elevator", "passenger-elevator"]],
  ["public-infrastructure", "Public Infrastructure", ["passenger-elevator", "escalator"]],
  ["industrial", "Industrial", ["freight-elevator", "passenger-elevator"]],
] as const;

const solutionImages: Record<string, Solution["image"]> = {
  residential: { src: "/images/solutions/residential-concept.png", alt: "Concept visualization of an accessible elevator integrated into a residential lobby", caption: "Original residential solution concept — project configuration pending.", isConcept: true },
  commercial: { src: "/images/solutions/commercial-concept.png", alt: "Concept visualization of a coordinated elevator bank in a commercial office lobby", caption: "Original commercial solution concept — project configuration pending.", isConcept: true },
  hotel: { src: "/images/solutions/hotel-concept.png", alt: "Concept visualization of an elevator entrance within a warm hotel guest lobby", caption: "Original hospitality solution concept — project configuration pending.", isConcept: true },
  hospital: { src: "/images/solutions/hospital-concept.png", alt: "Concept visualization of wide hospital elevators beside a clinical circulation route", caption: "Original healthcare solution concept — workflow and dimensions require confirmation.", isConcept: true },
  "public-infrastructure": { src: "/images/solutions/public-infrastructure-concept.png", alt: "Concept visualization of escalators and an accessible elevator in a public concourse", caption: "Original public-infrastructure solution concept — circulation requirements pending.", isConcept: true },
  industrial: { src: "/images/solutions/industrial-concept.png", alt: "Concept visualization of a freight elevator aligned with an industrial logistics route", caption: "Original industrial solution concept — load and route requirements pending.", isConcept: true },
};

const solutionEnglish: Record<string, Pick<Solution, "overview" | "challenges" | "benefits">> = {
  residential: {
    overview: "Residential mobility planning connects everyday convenience with the building's long-term operation. We consider resident traffic, move-in and service routes, accessibility, security interfaces, cabin durability, arrival experience, and maintainable access before a product configuration is confirmed.",
    challenges: ["Morning and evening traffic patterns", "Resident, visitor, move-in, and service routes", "Accessibility, security, and acoustic expectations", "Shaft, landing, installation, and maintenance interfaces"],
    benefits: ["A clear mobility brief for the whole building", "Product selection tied to resident use", "Coordinated lobby, door, cabin, and control design", "Documented installation and lifecycle pathway"],
  },
  commercial: {
    overview: "Commercial buildings need a vertical-transport strategy that responds to peak arrivals, tenant mix, destination patterns, public circulation, and changing occupancy. Passenger elevators, panoramic systems, and escalators can be coordinated with lobby planning, access control, finishes, and maintenance routes.",
    challenges: ["Peak arrival, lunch, and departure demand", "Tenant, visitor, service, and accessible circulation", "Lobby queuing, access control, and wayfinding interfaces", "Phased installation and continuity of building operation"],
    benefits: ["Traffic decisions linked to the operating brief", "A coordinated elevator bank and public arrival experience", "Durable materials selected for expected use", "Clear handover information for owners and operators"],
  },
  hotel: {
    overview: "Hotel mobility must feel effortless to guests while keeping luggage, housekeeping, catering, and service movement operationally clear. The solution coordinates guest elevators, back-of-house routes, acoustic comfort, finishes, accessibility, controls, and service access with the hospitality design intent.",
    challenges: ["Guest, luggage, housekeeping, and catering routes", "Peak check-in, event, and breakfast circulation", "Quiet operation and premium arrival expectations", "Separation of public and back-of-house movement"],
    benefits: ["A smoother guest journey from lobby to room", "Service routes planned around hotel operations", "Cabin and landing finishes aligned with the interior concept", "Maintainable access with reduced operational conflict"],
  },
  hospital: {
    overview: "Healthcare circulation is planned around beds, patients, staff, visitors, supplies, waste, and emergency priorities. The project framework reviews route separation, door and cabin requirements, turning areas, durable cleanable finishes, control visibility, resilience, and handover documentation.",
    challenges: ["Bed, trolley, staff, visitor, and service routes", "Door clearances and maneuvering space", "Hygiene, durability, accessibility, and control visibility", "Operational continuity and maintenance planning"],
    benefits: ["Elevator selection tied to clinical workflows", "Clear transfer routes and landing interfaces", "Durable, cleanable interior coordination", "Structured testing, handover, and lifecycle records"],
  },
  "public-infrastructure": {
    overview: "Public facilities require legible, durable, and inclusive movement across sustained and event-driven demand. Elevators and escalators are considered together with route visibility, accessible alternatives, landing capacity, surrounding structure, safety interfaces, maintenance access, and long operating hours.",
    challenges: ["High-volume and event-driven passenger flow", "Accessible alternatives and intuitive route visibility", "Durable interfaces for intensive public use", "Safe maintenance access within extended operating hours"],
    benefits: ["A unified elevator and escalator circulation strategy", "Accessible movement integrated into the primary route", "Robust materials and interfaces", "Operationally clear inspection and maintenance planning"],
  },
  industrial: {
    overview: "Industrial mobility begins with the load: its weight, dimensions, handling equipment, frequency, route, and interaction with production. Freight and passenger systems are coordinated with doorways, thresholds, landing protection, controls, structure, safety requirements, and maintenance access.",
    challenges: ["Load dimensions, handling method, and movement frequency", "Pallet, trolley, vehicle, and personnel route separation", "Door, threshold, landing, and structural interfaces", "Durability, safety, downtime, and service access"],
    benefits: ["Equipment selection grounded in the logistics brief", "Protected and coordinated loading interfaces", "Durable cabin and landing material strategy", "Maintenance planning aligned with operations"],
  },
};

const solutionZh: Record<string, Solution["zh"]> = {
  residential: {
    name: "住宅",
    eyebrow: "行业解决方案",
    overview: "住宅垂直交通规划需要同时回应日常便利与建筑长期运营。方案将在产品配置确认前，综合考虑住户客流、搬家与后勤路线、无障碍需求、安防接口、轿厢耐用性、到站体验以及可维护的检修通道。",
    challenges: ["早晚高峰客流规律", "住户、访客、搬家与后勤路线", "无障碍、安防与声学预期", "井道、层站、安装及维保接口"],
    benefits: ["覆盖整栋建筑的清晰交通需求", "按住户实际使用进行产品选型", "大堂、门系统、轿厢与控制协同设计", "结构化安装与生命周期路径"],
  },
  commercial: {
    name: "商业",
    eyebrow: "行业解决方案",
    overview: "商业建筑的垂直交通策略需要回应高峰到达、租户构成、目的楼层分布、公共流线和未来使用变化。乘客电梯、观光电梯及自动扶梯可与大堂规划、门禁、饰面和维保路线统一协调。",
    challenges: ["上下班、午间及离场高峰", "租户、访客、后勤与无障碍流线", "大堂排队、门禁及导向接口", "分期安装与建筑持续运营"],
    benefits: ["交通决策与运营需求相匹配", "电梯群控与公共到达体验协调", "按使用强度选择耐用材质", "为业主与运营方提供清晰交付资料"],
  },
  hotel: {
    name: "酒店",
    eyebrow: "行业解决方案",
    overview: "酒店垂直交通既要让宾客使用自然顺畅，也要保持行李、客房服务、餐饮与后勤运输清晰高效。方案将宾客电梯、后勤路线、声学舒适、饰面、无障碍控制和维保通道与酒店室内设计统一协调。",
    challenges: ["宾客、行李、客房及餐饮路线", "入住、活动与早餐高峰流线", "安静运行与高品质到达体验", "公共区域与后勤运输分隔"],
    benefits: ["从大堂到客房的顺畅宾客旅程", "围绕酒店运营规划后勤路线", "轿厢与层站饰面匹配室内概念", "减少运营冲突的可维护通道"],
  },
  hospital: {
    name: "医院",
    eyebrow: "行业解决方案",
    overview: "医疗交通围绕病床、患者、医护、访客、物资、废弃物及应急优先级进行规划。项目框架将评审路线分隔、门和轿厢需求、转弯空间、耐用易清洁饰面、控制可视性、运行韧性与交付文件。",
    challenges: ["病床、推车、医护、访客及后勤路线", "门净宽与转弯操作空间", "卫生、耐用、无障碍及控制可视性", "持续运营与维保规划"],
    benefits: ["按医疗流程进行电梯选型", "清晰的运输路线与层站接口", "耐用易清洁内装协调", "结构化测试、交付及生命周期记录"],
  },
  "public-infrastructure": {
    name: "公共基础设施",
    eyebrow: "行业解决方案",
    overview: "公共设施需要在持续客流与活动高峰下提供清晰、耐用且包容的通行方式。电梯和自动扶梯将与路线可视性、无障碍替代路径、上下端容量、周边结构、安全接口、维保通道及长时间运营统一考虑。",
    challenges: ["高强度及活动型客流", "无障碍替代路径与直观导向", "适应高频公共使用的耐用接口", "长运营时段下的安全维保通道"],
    benefits: ["统一的电梯与自动扶梯流线策略", "无障碍交通融入主要路线", "坚固耐用的材料与接口", "清晰的检查和维保规划"],
  },
  industrial: {
    name: "工业",
    eyebrow: "行业解决方案",
    overview: "工业交通从载荷本身出发：重量、尺寸、搬运设备、频次、路线及其与生产流程的关系。货梯与客梯系统将与门区、门槛、层站防护、控制、结构、安全要求和维保通道协同规划。",
    challenges: ["载荷尺寸、搬运方式与运输频次", "托盘、推车、车辆与人员路线分隔", "门区、门槛、层站及结构接口", "耐用性、安全、停机与维保通道"],
    benefits: ["基于物流需求进行设备选型", "受保护且协调一致的装载接口", "耐用轿厢及层站材质策略", "与运营计划匹配的维保方案"],
  },
};

export const solutions: Solution[] = solutionNames.map(([slug, name, productSlugs], index) => ({
  id: `solution-${index + 1}`,
  slug,
  name,
  index: String(index + 1).padStart(2, "0"),
  eyebrow: "Sector solution",
  ...solutionEnglish[slug],
  zh: solutionZh[slug],
  productSlugs: [...productSlugs],
  image: solutionImages[slug],
  seoTitle: `${name} Elevator Solutions | NS Elevator`,
  seoDescription: `Project-led elevator planning for ${name.toLowerCase()} buildings from NS Elevator.`,
}));

export function getSolution(slug: string) {
  return solutions.find((solution) => solution.slug === slug);
}
