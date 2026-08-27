import type { Metadata } from "next";
import Image from "next/image";
import { CtaBand, ConceptLabel, PageHero, SectionHeading } from "@/components/ui";
import { T } from "@/components/language-provider";
import { company } from "@/content/company";

export const metadata: Metadata = { title: "About", description: "The developing NS Elevator brand, engineering approach, quality philosophy, and support-network framework.", alternates: { canonical: "/about" } };

const capabilities = [
  ["01", "Manufacturing capability", "Capacity, equipment, and factory information will be published only after owner verification and supporting evidence."],
  ["02", "Engineering capability", "A project-led framework for requirements, traffic assumptions, interfaces, drawings, product configuration, and documentation."],
  ["03", "Quality philosophy", "Defined reviews, inspection points, testing, and traceable records—subject to verified production procedures."],
  ["04", "Global market", "English-first content and project coordination for international markets, with local compliance confirmed per installation."],
  ["05", "Support network", "A service model for consultation, installation guidance, commissioning, parts, and after-sales technical support."],
] as const;

const capabilitiesZh = [
  ["制造能力", "产能、设备与工厂信息仅在业主核实并提供支持材料后发布。"],
  ["工程能力", "以项目为中心，协调需求、客流假设、接口、图纸、产品配置与技术文件。"],
  ["质量理念", "建立评审、检验、测试与可追溯记录，并以经验证的生产流程为依据。"],
  ["全球市场", "面向国际市场提供中英文内容与项目协同，每个安装项目均需确认当地合规要求。"],
  ["服务网络", "构建覆盖咨询、安装指导、调试、零部件与售后技术支持的服务模式。"],
] as const;

export default function AboutPage() {
  return <><PageHero eyebrow="About NS" eyebrowZh="关于 NS" title="A brand taking shape with intent." titleZh="以清晰方向塑造品牌。" intro={company.introduction} introZh={company.zh.introduction} index="Company / Verification pending" indexZh="公司 / 信息待验证" /><section className="container-site py-16 md:py-24"><div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]"><div className="relative min-h-[560px]"><ConceptLabel /><Image src="/images/brand/cabin-concept.png" alt="Concept visualization showing elevator cabin material detailing" fill sizes="(max-width:1024px) 100vw, 52vw" className="object-cover" /></div><div className="flex flex-col justify-between bg-[#11110f] p-8 text-white sm:p-12 lg:p-16"><span className="eyebrow text-white/50"><T en="Positioning" zh="品牌定位" /></span><div><blockquote className="display text-[clamp(3rem,5vw,6rem)] leading-[0.9]">“<T en={company.positioning} zh={company.zh.positioning} />”</blockquote><p className="mt-10 max-w-lg text-sm leading-7 text-white/55"><T en={company.note} zh={company.zh.note} /></p></div></div></div></section><section className="container-site py-20 md:py-32"><SectionHeading eyebrow="Capability framework" eyebrowZh="能力框架" title="What must become verifiable." titleZh="让每项能力都有据可查。" text="The structure is ready for real evidence. Unsupported capacity, certification, market, and network claims are deliberately absent." textZh="网站已为真实资料预留清晰结构；未有证据支持的产能、认证、市场与服务网络信息不会作为事实发布。" /><div className="mt-16 border-t hairline">{capabilities.map(([index, title, text], itemIndex) => <article key={index} className="grid gap-5 border-b hairline py-8 md:grid-cols-[0.2fr_0.8fr_1fr]"><span className="text-[0.62rem] font-bold text-[#a96e3e]">{index}</span><h2 className="display text-3xl"><T en={title} zh={capabilitiesZh[itemIndex][0]} /></h2><p className="max-w-xl text-sm leading-7 text-[#68665f]"><T en={text} zh={capabilitiesZh[itemIndex][1]} /></p></article>)}</div></section><CtaBand title="Build the brand on evidence." titleZh="用真实证据建立品牌。" text="Verified company history, facilities, team, markets, capacity, certifications, and service coverage can replace the clearly marked placeholders in one centralized content layer." textZh="经验证的公司历史、设施、团队、市场、产能、认证和服务范围可在统一内容层中替换当前明确标注的占位内容。" /></>;
}
