import type { Metadata } from "next";
import { PageHero } from "@/components/ui";
import { T } from "@/components/language-provider";
export const metadata: Metadata = { title: "Website Terms", description: "Website terms structure for NS Elevator. Legal review required.", alternates: { canonical: "/terms" } };
const sections = [
  ["Website purpose", "This website presents a developing brand, product frameworks, and inquiry paths. It is not an offer, contract, technical approval, or installation instruction."],
  ["Concept and placeholder content", "Concept imagery, project studies, specifications, contact data, and unverified company information are clearly marked and must be replaced or approved before launch."],
  ["Technical information", "Final product selection, performance, compliance, interfaces, and suitability require project-specific engineering review and written agreement."],
  ["Intellectual property", "Ownership, permitted use, trademarks, imagery rights, and downloadable materials require company and legal confirmation."],
  ["External services and links", "Third-party service availability and terms are controlled by their providers. The final company terms must define relevant responsibility and limitations."],
  ["Liability and jurisdiction", "Applicable law, venue, warranties, exclusions, and liability limits have not been approved and require qualified legal review."],
] as const;
const sectionsZh = [
  ["网站用途", "本网站用于介绍正在发展的品牌、产品框架和询价路径，不构成要约、合同、技术批准或安装指示。"],
  ["概念与占位内容", "概念图、项目研究、技术规格及未经验证的公司信息均有明确标注，正式采用前必须替换或获得批准。"],
  ["技术信息", "最终产品选型、性能、合规性、接口与适用性均需进行项目专项工程审核并签署书面协议。"],
  ["知识产权", "所有权、允许使用方式、商标、图像版权和可下载资料均需公司及法律确认。"],
  ["外部服务与链接", "第三方服务的可用性与条款由其提供商控制，公司的最终条款必须明确相关责任与限制。"],
  ["责任与司法辖区", "适用法律、管辖地、保证、免责与责任限制尚未批准，需要由合资格的法律专业人士审核。"],
] as const;
export default function TermsPage() { return <><PageHero eyebrow="Legal draft" eyebrowZh="法律草案" title="Website terms." titleZh="网站条款。" intro="Professional placeholder structure. Company and legal review is required before production launch." introZh="当前为专业占位结构，正式启用前仍需公司与法律审核。" index="Legal / Review required" indexZh="法律 / 需要审核" /><section className="container-site max-w-5xl py-16 md:py-24"><div className="mb-12 border-y border-[#a9663f] bg-[#eadcd0] p-6 text-sm leading-6"><strong><T en="Not legal advice." zh="非法律意见。" /></strong> <T en="These terms are an editorial framework only and are not ready for public reliance." zh="这些条款仅为编辑框架，尚不能作为公众依赖的正式条款。" /></div>{sections.map(([title, text], index) => <section key={title} className="grid gap-4 border-t hairline py-8 md:grid-cols-[0.15fr_0.85fr]"><span className="text-[0.62rem] font-bold text-[#a96e3e]">{String(index + 1).padStart(2, "0")}</span><div><h2 className="display text-3xl"><T en={title} zh={sectionsZh[index][0]} /></h2><p className="mt-4 text-sm leading-7 text-[#64625c]"><T en={text} zh={sectionsZh[index][1]} /></p></div></section>)}</section></>; }
