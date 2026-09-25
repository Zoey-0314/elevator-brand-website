import type { Metadata } from "next";
import Image from "next/image";
import { CtaBand, ConceptLabel, PageHero, SectionHeading } from "@/components/ui";
import { T } from "@/components/language-provider";

export const metadata: Metadata = { title: "Service", description: "NS Elevator service pathway from pre-sales consultation to after-sales technical support.", alternates: { canonical: "/service" } };

const serviceStages = [
  ["01", "Pre-sales consultation", "Translate the building brief into a useful mobility discussion: project stage, users, traffic patterns, locations, key routes, accessibility, architectural intent, programme, and information still required for engineering selection."],
  ["02", "Engineering support", "Coordinate product selection with shaft conditions, entrances, loads, controls, finishes, power, surrounding structure, local requirements, and the drawings or schedules needed by the project team."],
  ["03", "Installation guidance", "Define responsibilities, approved information flow, interfaces with other trades, storage and access needs, site-readiness checks, installation sequence, inspection points, and the boundaries of remote or local support."],
  ["04", "Commissioning", "Prepare a project-specific pathway for functional checks, safety-related verification, defect recording, acceptance responsibilities, operating information, and handover once the actual procedures and applicable requirements are confirmed."],
  ["05", "Maintenance support", "Structure inspection and maintenance needs around equipment configuration, usage intensity, environment, access constraints, record keeping, local service capability, and the owner's operational priorities."],
  ["06", "Parts machining and component manufacturing", "Alongside complete elevator manufacturing, NS Elevator offers parts machining and component production for elevator manufacturers, installers, maintenance providers, and distributors. Share drawings or part references, material and dimensional requirements, quantities, intended application, and delivery needs. We review manufacturing feasibility, interfaces, inspection requirements, and supply scope before confirming a quotation or delivery commitment."],
  ["07", "After-sales technical support", "Keep each issue connected to its equipment record, symptoms, operating context, previous actions, evidence, escalation route, responsibilities, and closure notes throughout the service life."],
] as const;

const serviceStagesZh = [
  ["售前咨询", "把建筑需求转化为有效的交通规划讨论：梳理项目阶段、使用者、客流规律、位置、关键路线、无障碍需求、建筑意图、计划时间及工程选型仍需补充的信息。"],
  ["工程支持", "将产品选型与井道条件、出入口、载荷、控制、饰面、电源、周边结构、当地要求以及项目团队所需图纸和清单进行协调。"],
  ["安装指导", "明确各方责任、批准后的信息流、与其他专业的接口、存储和进场需求、现场准备检查、安装顺序、检验节点及远程或当地支持边界。"],
  ["调试", "在实际流程和适用要求确认后，制定功能检查、安全相关验证、问题记录、验收责任、运行资料及交付的项目专属路径。"],
  ["维保支持", "结合设备配置、使用强度、运行环境、通道限制、记录管理、当地服务能力及业主运营重点，规划检查和维护需求。"],
  ["零件加工与配件生产", "除整机电梯制造外，NS Elevator 也为电梯制造商、安装商、维保服务商及经销商提供零件加工与配件生产服务。欢迎提供图纸或零件编号、材质与尺寸要求、采购数量、应用场景及交付需求。我们将在确认报价与交期前，评估加工可行性、装配接口、检验要求及供货范围。"],
  ["售后技术支持", "在设备生命周期内，将每个问题与设备档案、故障表现、运行背景、既往措施、证据、升级路径、责任分工和结案记录保持关联。"],
] as const;

export default function ServicePage() {
  return <><PageHero eyebrow="Lifecycle service" eyebrowZh="全生命周期服务" title="Support starts before installation." titleZh="支持从安装前开始。" intro="A reliable elevator project depends on clear technical coordination, disciplined records, and service planning long before equipment arrives on site—and continues through commissioning, maintenance, parts, and technical support." introZh="可靠的电梯项目需要在设备到场前完成清晰的技术协调、规范的记录管理和服务规划，并贯穿调试、维保、备件与售后技术支持。" index="Service / 01—07" indexZh="服务 / 01—07" /><section className="container-site py-16 md:py-24"><div className="relative aspect-[16/8] overflow-hidden"><ConceptLabel /><Image src="/images/brand/service-engineering-concept.png" alt="Original concept visualization of an elevator technician inspecting a control cabinet with diagnostic tools" fill sizes="100vw" className="object-cover" /></div></section><section className="container-site py-20 md:py-32"><SectionHeading eyebrow="Service pathway" eyebrowZh="服务路径" title="One project record. Seven moments of support." titleZh="一份项目记录，贯穿七个支持阶段。" text="Each stage should preserve decisions, responsibilities, evidence, and open issues in one traceable project record. Actual availability, response targets, regions, and partner coverage require owner verification before they can be represented as commitments." textZh="每个阶段都应在一份可追溯的项目档案中保存决策、责任、证据和未决事项。实际服务可用性、响应目标、覆盖地区与合作伙伴范围须经业主核实后，方可作为承诺发布。" /><div className="mt-16 border-t hairline">{serviceStages.map(([index, title, text], itemIndex) => <article key={index} className="grid gap-5 border-b hairline py-8 md:grid-cols-[0.15fr_0.65fr_1fr]"><span className="text-[0.62rem] font-bold text-[#a96e3e]">{index}</span><h2 className="display text-3xl"><T en={title} zh={serviceStagesZh[itemIndex][0]} /></h2><p className="max-w-xl text-sm leading-7 text-[#68665f]"><T en={text} zh={serviceStagesZh[itemIndex][1]} /></p></article>)}</div></section><CtaBand title="Plan service with the system." titleZh="让服务与系统同步规划。" /></>;
}
