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
  src: "/images/products/hospital-elevator-concept-v2.png",
  alt: "Concept visualization of a hospital elevator in a contemporary healthcare corridor",
  caption: "Original concept visualization — not a completed NS Elevator project.",
  isConcept: true,
};

const freight = {
  src: "/images/products/freight-elevator-concept-v2.png",
  alt: "Concept visualization of a freight elevator in a modern logistics facility",
  caption: "Original concept visualization — not a completed NS Elevator project.",
  isConcept: true,
};

const escalator = {
  src: "/images/products/escalator-concept-v2.png",
  alt: "Concept visualization of an escalator in a contemporary public atrium",
  caption: "Original concept visualization — not a completed NS Elevator project.",
  isConcept: true,
};

const home = {
  src: "/images/products/home-elevator-concept-v2.png",
  alt: "Original concept visualization of a compact glazed home elevator beside a timber staircase",
  caption: "Original concept visualization — final project configuration requires engineering confirmation.",
  isConcept: true,
};

const productHeroImages: Record<string, Product["heroImage"]> = {
  "passenger-elevator": hero,
  "home-elevator": home,
  "hospital-elevator": hospital,
  "freight-elevator": freight,
  "panoramic-elevator": atrium,
  escalator,
};

const productGalleryImages: Record<string, Product["gallery"]> = {
  "passenger-elevator": [hero, { src: "/images/solutions/commercial-concept.png", alt: "Concept visualization of a coordinated commercial elevator bank", caption: "Concept visualization — project configuration pending.", isConcept: true }],
  "home-elevator": [home, { src: "/images/solutions/residential-concept.png", alt: "Concept visualization of an accessible residential elevator lobby", caption: "Concept visualization — project configuration pending.", isConcept: true }],
  "hospital-elevator": [hospital, { src: "/images/solutions/hospital-concept.png", alt: "Concept visualization of a hospital transfer lobby with wide elevator access", caption: "Concept visualization — workflow and dimensions require project confirmation.", isConcept: true }],
  "freight-elevator": [freight, { src: "/images/solutions/industrial-concept.png", alt: "Concept visualization of a freight elevator aligned with an industrial logistics route", caption: "Concept visualization — load and route requirements require project confirmation.", isConcept: true }],
  "panoramic-elevator": [atrium, { src: "/images/projects/civic-atrium-study.png", alt: "Concept visualization of a panoramic elevator within a planted civic atrium", caption: "Concept visualization — not a completed NS Elevator project.", isConcept: true }],
  escalator: [escalator, { src: "/images/solutions/public-infrastructure-concept.png", alt: "Concept visualization of escalators and an accessible elevator in a public concourse", caption: "Concept visualization — circulation requirements require project confirmation.", isConcept: true }],
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
      "A project-configured passenger elevator framework for residential, office, and mixed-use buildings. Planning begins with expected traffic, peak demand, travel pattern, and accessibility, then coordinates shaft interfaces, door arrangements, cabin materials, controls, installation information, and long-term service access.",
    benefits: ["Traffic-led project planning", "Coordinated doors, cabin finishes, and interfaces", "Accessible controls and arrival experience", "Structured installation and lifecycle documentation"],
    applications: ["Residential towers", "Offices", "Mixed-use buildings", "Education"],
  },
  {
    slug: "home-elevator",
    name: "Home Elevator",
    category: "Private residence",
    tagline: "Vertical comfort, quietly integrated.",
    overview:
      "A residential mobility concept shaped around the architecture and daily routines of a private home. The planning conversation can cover available footprint, pit and headroom conditions, enclosure strategy, doorway position, accessibility, noise expectations, interior materials, and a clear route for future maintenance.",
    benefits: ["Space-conscious residential planning", "Architecture and interior integration", "Intuitive accessible everyday operation", "Coordinated finishes and service access"],
    applications: ["Villas", "Townhouses", "Multi-level apartments", "Private residences"],
  },
  {
    slug: "hospital-elevator",
    name: "Hospital Elevator",
    category: "Healthcare mobility",
    tagline: "Movement planned around care.",
    overview:
      "A healthcare-oriented configuration framework developed around patient, bed, trolley, staff, and service movement. Door clearances, turning areas, cabin proportions, durable cleanable surfaces, control visibility, traffic separation, and handover records are coordinated with the facility's operational plan and applicable local requirements.",
    benefits: ["Clinical workflow and route planning", "Bed-movement and doorway coordination", "Durable cleanable interior options", "Clear controls and documented handover"],
    applications: ["Hospitals", "Clinics", "Care facilities", "Medical campuses"],
  },
  {
    slug: "freight-elevator",
    name: "Freight Elevator",
    category: "Materials movement",
    tagline: "Working capacity for demanding routes.",
    overview:
      "A goods-movement platform configured around what is transported, how it is loaded, and where it travels. The project review coordinates rated requirements, trolley or pallet routes, landing protection, doorway and threshold conditions, durable cabin finishes, operating controls, and service access without publishing unverified performance figures.",
    benefits: ["Goods, pallet, and trolley route coordination", "Doorway, threshold, and landing protection planning", "Robust cabin and finish options", "Operational and maintenance access strategy"],
    applications: ["Warehouses", "Factories", "Retail back-of-house", "Logistics facilities"],
  },
  {
    slug: "panoramic-elevator",
    name: "Panoramic Elevator",
    category: "Architectural mobility",
    tagline: "Make movement part of the architecture.",
    overview:
      "A transparent vertical-mobility concept developed with the atrium, facade, or public interior so engineering and experience read as one architectural gesture. Sightlines, glazing, structural interfaces, solar exposure, landing details, cabin materials, rescue planning, and maintenance access are considered together from the design stage.",
    benefits: ["Architecture and sightline-led design", "Glazing and structural interface coordination", "Cabin and landing material detailing", "Public experience, rescue, and service planning"],
    applications: ["Hotels", "Retail atriums", "Cultural venues", "Commercial lobbies"],
  },
  {
    slug: "escalator",
    name: "Escalator",
    category: "Continuous flow",
    tagline: "Continuous movement, resolved with the space.",
    overview:
      "A planning-led escalator solution for continuous passenger movement in retail, transport, and public environments. Demand, rise, inclination, landing space, approach routes, balustrade interfaces, surrounding finishes, safety coordination, and maintenance access are reviewed as part of the building circulation strategy.",
    benefits: ["Passenger-flow and landing planning", "Balustrade and building interface coordination", "Durable finish integration", "Safety and maintenance access strategy"],
    applications: ["Retail", "Transport", "Convention venues", "Public buildings"],
  },
];

const productZh: Record<string, Product["zh"]> = {
  "passenger-elevator": {
    name: "乘客电梯",
    category: "人员运输",
    tagline: "从容连接每一个楼层。",
    overview: "面向住宅、办公与综合体建筑的项目配置型乘客电梯框架。从预期客流、高峰需求、运行路线与无障碍需求出发，进一步协调井道接口、开门方案、轿厢材质、控制系统、安装资料及长期维保通道。",
    benefits: ["基于客流的项目规划", "门系统、轿厢饰面与建筑接口协调", "无障碍控制与到站体验", "结构化安装及全生命周期文档"],
    applications: ["住宅塔楼", "办公楼", "综合体", "教育建筑"],
    specifications: [],
  },
  "home-elevator": {
    name: "家用电梯",
    category: "私人住宅",
    tagline: "安静融入居家生活的垂直舒适。",
    overview: "围绕私人住宅的建筑条件与日常生活方式规划垂直交通。可根据可用占地、底坑与顶层条件、围护方式、开门位置、无障碍需求、噪声预期、室内材质及未来维保路径开展协调。",
    benefits: ["节省空间的住宅规划", "建筑与室内一体化协调", "直观且无障碍的日常操作", "饰面与维保通道统筹"],
    applications: ["别墅", "联排住宅", "复式公寓", "私人住宅"],
    specifications: [],
  },
  "hospital-elevator": {
    name: "医用电梯",
    category: "医疗运输",
    tagline: "围绕医疗照护规划每一次移动。",
    overview: "围绕患者、病床、推车、医护与后勤运输构建的医疗电梯配置框架。门净宽、转弯空间、轿厢尺寸、耐用易清洁表面、控制可视性、流线分隔及交付记录，将与医院运营方案和当地适用要求协同确认。",
    benefits: ["医疗流程与运输路线规划", "病床运输及门区协调", "耐用易清洁内装选项", "清晰控制与交付记录"],
    applications: ["医院", "诊所", "护理机构", "医疗园区"],
    specifications: [],
  },
  "freight-elevator": {
    name: "载货电梯",
    category: "货物运输",
    tagline: "为高强度运输路线提供可靠承载。",
    overview: "围绕运输对象、装载方式及物流路径配置的货物运输平台。项目评审涵盖载荷需求、托盘或推车路线、层站防护、门区与门槛条件、耐用轿厢饰面、操作控制和维保通道，同时避免发布未经确认的性能参数。",
    benefits: ["货物、托盘与推车路线协调", "门区、门槛及层站防护规划", "耐用轿厢与饰面选项", "运营和维保通道策略"],
    applications: ["仓库", "工厂", "商业后勤区", "物流设施"],
    specifications: [],
  },
  "panoramic-elevator": {
    name: "观光电梯",
    category: "建筑交通",
    tagline: "让垂直移动成为建筑的一部分。",
    overview: "与中庭、立面或公共室内空间共同设计的透明垂直交通方案，使工程系统与空间体验形成统一表达。视线、玻璃系统、结构接口、日照条件、层站细节、轿厢材质、救援方案和维保通道均在设计阶段协同考虑。",
    benefits: ["建筑与视线导向设计", "玻璃及结构接口协调", "轿厢与层站材质细化", "公共体验、救援及维保规划"],
    applications: ["酒店", "商业中庭", "文化场馆", "商业大堂"],
    specifications: [],
  },
  escalator: {
    name: "自动扶梯",
    category: "连续客流",
    tagline: "持续运送，与空间协调统一。",
    overview: "面向零售、交通与公共建筑连续客流的规划型自动扶梯方案。结合客流需求、提升高度、倾角、上下端空间、接近路线、扶手带及建筑接口、周边饰面、安全协调和维保通道进行整体规划。",
    benefits: ["客流与上下端空间规划", "扶手带及建筑接口协调", "耐用饰面整合", "安全与维保通道策略"],
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
  gallery: productGalleryImages[product.slug],
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
