import type { Metadata } from "next";
import Image from "next/image";
import { CtaBand, ConceptLabel, PageHero, SectionHeading } from "@/components/ui";
import { T } from "@/components/language-provider";

export const metadata: Metadata = { title: "Service", description: "NS Elevator service pathway from pre-sales consultation to after-sales technical support.", alternates: { canonical: "/service" } };

const serviceStages = [
  ["01", "Pre-sales consultation", "Clarify building use, stakeholder needs, project stage, location, and target timeline."],
  ["02", "Engineering support", "Coordinate requirements, product selection, interfaces, and documentation expectations."],
  ["03", "Installation guidance", "Define installation responsibilities, information flow, site readiness, and support boundaries."],
  ["04", "Commissioning", "Prepare project-specific testing, acceptance, and handover pathways once procedures are verified."],
  ["05", "Maintenance support", "Structure lifecycle service requirements around the operating environment and local provision."],
  ["06", "Spare parts", "Plan traceable parts identification, request handling, and logistics with verified supply information."],
  ["07", "After-sales technical support", "Maintain clear escalation routes, documentation, and issue context throughout operation."],
] as const;

const serviceStagesZh = [
  ["售前咨询", "明确建筑用途、相关方需求、项目阶段、地点和目标时间。"],
  ["工程支持", "协调需求、产品选型、接口条件与技术文件预期。"],
  ["安装指导", "明确安装责任、信息流、现场准备情况和支持边界。"],
  ["调试", "在流程验证后制定项目专属的测试、验收与交付路径。"],
  ["维保支持", "结合运行环境与当地服务条件，规划全生命周期服务需求。"],
  ["备品备件", "依据经验证的供应信息，规划可追溯的零件识别、需求处理与物流。"],
  ["售后技术支持", "在设备运行期间保持清晰的升级路径、技术文件与问题背景记录。"],
] as const;

export default function ServicePage() {
  return <><PageHero eyebrow="Lifecycle service" eyebrowZh="全生命周期服务" title="Support starts before installation." titleZh="支持从安装前开始。" intro="A reliable elevator project depends on clear technical coordination and service planning long before equipment arrives on site." introZh="可靠的电梯项目在设备到场之前，就需要清晰的技术协调与服务规划。" index="Service / 01—07" indexZh="服务 / 01—07" /><section className="container-site py-16 md:py-24"><div className="relative aspect-[16/8] overflow-hidden"><ConceptLabel /><Image src="/images/brand/atrium-concept.png" alt="Concept visualization of elevator engineering integrated into a public atrium" fill sizes="100vw" className="object-cover" /></div></section><section className="container-site py-20 md:py-32"><SectionHeading eyebrow="Service pathway" eyebrowZh="服务路径" title="One project record. Seven moments of support." titleZh="一份项目记录，贯穿七个支持阶段。" text="Availability, response targets, regions, and partner coverage require owner verification before they can be represented as service commitments." textZh="服务可用性、响应目标、覆盖地区与合作伙伴范围必须经业主验证后，方可作为服务承诺发布。" /><div className="mt-16 border-t hairline">{serviceStages.map(([index, title, text], itemIndex) => <article key={index} className="grid gap-5 border-b hairline py-8 md:grid-cols-[0.15fr_0.65fr_1fr]"><span className="text-[0.62rem] font-bold text-[#a96e3e]">{index}</span><h2 className="display text-3xl"><T en={title} zh={serviceStagesZh[itemIndex][0]} /></h2><p className="max-w-xl text-sm leading-7 text-[#68665f]"><T en={text} zh={serviceStagesZh[itemIndex][1]} /></p></article>)}</div></section><CtaBand title="Plan service with the system." titleZh="让服务与系统同步规划。" /></>;
}
