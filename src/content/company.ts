export const company = {
  name: "NS Elevator",
  introduction:
    "NS Elevator is being developed as an international, project-led elevator brand focused on clear engineering coordination, considered material choices, and dependable lifecycle support.",
  positioning: "Engineering vertical movement around the way buildings live.",
  note:
    "Company history, factory capacity, locations, certifications, and operating statistics require owner verification before public launch.",
  contact: {
    salesEmail: "gzzt7575@gmail.com",
    telephone: "+852 70150436",
  },
  zh: {
    introduction: "NS Elevator 致力于打造面向全球项目的电梯品牌，注重清晰的工程协调、审慎的材质选择与可靠的全生命周期支持。",
    positioning: "围绕建筑的真实使用方式，设计垂直交通。",
    note: "公司历史、生产能力、地点、认证和运营数据将在获得所有者核实后再公开。",
    metrics: [
      { value: "项目导向", label: "配置方法" },
      { value: "6", label: "核心产品系列" },
      { value: "5 阶段", label: "全生命周期服务模式" },
      { value: "全球", label: "国际市场架构" },
    ],
    principles: [
      { index: "01", title: "工程清晰", text: "提前协调需求、接口与文档，避免其演变为现场问题。" },
      { index: "02", title: "过程质量", text: "通过明确评审、检验节点、测试和可追溯交付记录建立质量。" },
      { index: "03", title: "有目的的定制", text: "让饰面、接口、载重和控制系统适配建筑，而不是套用通用目录。" },
      { index: "04", title: "全生命周期支持", text: "将安装指导、调试、文档、配件和技术响应作为一个完整系统规划。" },
    ],
  },
  metrics: [
    { value: "Project-led", label: "Configuration approach" },
    { value: "6", label: "Core product families" },
    { value: "5-stage", label: "Lifecycle service model" },
    { value: "Global", label: "Market-ready architecture" },
  ],
  principles: [
    {
      index: "01",
      title: "Engineering clarity",
      text: "Coordinate requirements, interfaces, and documentation before they become site issues.",
    },
    {
      index: "02",
      title: "Quality by process",
      text: "Build quality into defined reviews, inspection points, testing, and traceable handover records.",
    },
    {
      index: "03",
      title: "Purposeful customization",
      text: "Align finishes, interfaces, capacity, and controls with the building rather than a generic catalogue.",
    },
    {
      index: "04",
      title: "Lifecycle support",
      text: "Plan installation guidance, commissioning, documentation, parts, and technical response as one system.",
    },
  ],
} as const;
