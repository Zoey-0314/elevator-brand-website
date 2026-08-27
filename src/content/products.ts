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

const hospital = {
  src: "/images/products/hospital-elevator-concept.png",
  alt: "Concept visualization of a hospital elevator in a contemporary healthcare corridor",
  caption: "Original concept visualization — not a completed NS Elevator project.",
  isConcept: true,
};

const freight = {
  src: "/images/products/freight-elevator-concept.png",
  alt: "Concept visualization of a freight elevator in a modern logistics facility",
  caption: "Original concept visualization — not a completed NS Elevator project.",
  isConcept: true,
};

const escalator = {
  src: "/images/products/escalator-concept.png",
  alt: "Concept visualization of an escalator in a contemporary public atrium",
  caption: "Original concept visualization — not a completed NS Elevator project.",
  isConcept: true,
};

const productHeroImages: Record<string, Product["heroImage"]> = {
  "passenger-elevator": hero,
  "home-elevator": hero,
  "hospital-elevator": hospital,
  "freight-elevator": freight,
  "panoramic-elevator": atrium,
  escalator,
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

const productZh: Record<string, Product["zh"]> = {
  "passenger-elevator": {
    name: "乘客电梯",
    category: "人员运输",
    tagline: "从容连接每一个楼层。",
    overview: "面向住宅与商业建筑的项目定制型乘客电梯方案，兼顾交通规划、轿厢内装协调与无障碍操作。",
    benefits: ["项目专属规划", "轿厢饰面协调", "无障碍界面选项", "全生命周期文档"],
    applications: ["住宅塔楼", "办公楼", "综合体", "教育建筑"],
    specifications: [],
  },
  "home-elevator": {
    name: "家用电梯",
    category: "私人住宅",
    tagline: "安静融入居家生活的垂直舒适。",
    overview: "围绕私人室内空间、场地限制和日常生活节奏进行协调的住宅垂直交通方案。",
    benefits: ["室内设计导向协调", "紧凑型规划选项", "简洁日常操作", "多样化材质选择"],
    applications: ["别墅", "联排住宅", "复式公寓", "私人住宅"],
    specifications: [],
  },
  "hospital-elevator": {
    name: "医用电梯",
    category: "医疗运输",
    tagline: "围绕医疗照护规划每一次移动。",
    overview: "面向医疗场景的配置框架，重点考虑病床运输、耐用内装、清晰控制和运营流程协调。",
    benefits: ["流程导向规划", "耐用饰面选项", "清晰控制布局", "交付文档"],
    applications: ["医院", "诊所", "护理机构", "医疗园区"],
    specifications: [],
  },
  "freight-elevator": {
    name: "载货电梯",
    category: "货物运输",
    tagline: "为高强度运输路线提供可靠承载。",
    overview: "围绕装载方式、门区协调、耐用饰面及建筑运营计划配置的货物运输平台。",
    benefits: ["荷载路线协调", "耐用饰面选项", "门区规划", "维保通道策略"],
    applications: ["仓库", "工厂", "商业后勤区", "物流设施"],
    specifications: [],
  },
  "panoramic-elevator": {
    name: "观光电梯",
    category: "建筑交通",
    tagline: "让垂直移动成为建筑的一部分。",
    overview: "与立面、中庭或公共室内空间协同设计的透明垂直交通方案，使工程与体验形成统一表达。",
    benefits: ["建筑导向设计", "玻璃系统协调", "材质细节设计", "公共空间融合"],
    applications: ["酒店", "商业中庭", "文化场馆", "商业大堂"],
    specifications: [],
  },
  escalator: {
    name: "自动扶梯",
    category: "连续客流",
    tagline: "持续运送，与空间协调统一。",
    overview: "面向连续客流的规划型自动扶梯方案，关注流线、接口、饰面和维保通道。",
    benefits: ["流线规划", "接口协调", "饰面选择", "维保通道"],
    applications: ["零售商业", "交通枢纽", "会展场馆", "公共建筑"],
    specifications: [],
  },
};

const specificationsZh = [
  { label: "应用场景", value: "按项目需求配置" },
  { label: "额定载重", value: "由工程选型确认" },
  { label: "额定速度", value: "由交通分析确认" },
  { label: "开门方式", value: "根据项目确定" },
  { label: "饰面", value: "项目定制材质方案" },
  { label: "规范与标准", value: "按安装所在地确认" },
];

export const products: Product[] = definitions.map((product, index) => ({
  ...product,
  id: `product-${index + 1}`,
  index: String(index + 1).padStart(2, "0"),
  heroImage: productHeroImages[product.slug],
  gallery: [hero, atrium],
  zh: { ...productZh[product.slug], specifications: specificationsZh },
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
