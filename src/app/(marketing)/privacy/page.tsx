import type { Metadata } from "next";
import { PageHero } from "@/components/ui";
import { T } from "@/components/language-provider";

export const metadata: Metadata = { title: "Privacy Policy", description: "Privacy-policy structure for NS Elevator website inquiries. Legal review required.", alternates: { canonical: "/privacy" } };
const sections = [
  ["Information you provide", "The inquiry form may collect your name, company, business contact details, country, product interest, project context, message, consent, and source page."],
  ["Why it is processed", "Information is intended to be used to review, route, and respond to your business inquiry and to maintain a record of that communication."],
  ["Storage and service providers", "The planned workflow uses Supabase for persistence, Resend for email notifications, Cloudflare Turnstile for abuse protection, Vercel for hosting, and their relevant infrastructure."],
  ["International users", "Provider infrastructure and recipients may operate in different countries. The company must confirm its lawful transfer and retention arrangements before launch."],
  ["Retention and security", "A final retention schedule, deletion process, and internal access controls must be approved and documented before production use."],
  ["Your rights", "Depending on your location, you may have rights concerning access, correction, deletion, restriction, objection, or portability. The company must confirm the process and response contact."],
  ["Contact", "The privacy contact and legal company identity are pending verification. Do not rely on this draft for legal compliance."],
] as const;
const sectionsZh = [
  ["您提供的信息", "询价表单可能收集您的姓名、公司、商务联系方式、国家或地区、感兴趣的产品、项目背景、留言、同意状态及来源页面。"],
  ["处理目的", "相关信息用于审核、分配和回复您的商务咨询，并保留该次沟通记录。"],
  ["存储与服务提供商", "计划中的工作流使用 Supabase 保存数据、Resend 发送邮件通知、Cloudflare Turnstile 防止滥用，并由 Vercel 及相关基础设施提供托管。"],
  ["国际用户", "服务提供商的基础设施和收件人可能位于不同国家或地区。公司必须在正式启用前确认合法的数据传输和保留安排。"],
  ["保留与安全", "正式的数据保留期限、删除流程和内部访问控制必须在生产使用前获得批准并形成文件。"],
  ["您的权利", "根据您所在地区，您可能享有访问、更正、删除、限制、反对或可携带等权利。公司必须确认申请流程和回复联系方式。"],
  ["联系", "隐私事务请先使用网站页脚公布的邮箱联系。此草案不能替代正式法律意见。"],
] as const;
export default function PrivacyPage() { return <><PageHero eyebrow="Legal draft" eyebrowZh="法律草案" title="Privacy policy." titleZh="隐私政策。" intro="Professional placeholder structure. Company and legal review is required before production launch." introZh="当前为专业占位结构，正式启用前仍需公司与法律审核。" index="Legal / Review required" indexZh="法律 / 需要审核" /><section className="container-site max-w-5xl py-16 md:py-24"><div className="mb-12 border-y border-[#a9663f] bg-[#eadcd0] p-6 text-sm leading-6"><strong><T en="Not legal advice." zh="非法律意见。" /></strong> <T en="This draft reflects the planned site workflow but has not been approved for any jurisdiction." zh="本草案反映网站计划中的工作流程，但尚未获得任何司法辖区的正式批准。" /></div>{sections.map(([title, text], index) => <section key={title} className="grid gap-4 border-t hairline py-8 md:grid-cols-[0.15fr_0.85fr]"><span className="text-[0.62rem] font-bold text-[#a96e3e]">{String(index + 1).padStart(2, "0")}</span><div><h2 className="display text-3xl"><T en={title} zh={sectionsZh[index][0]} /></h2><p className="mt-4 text-sm leading-7 text-[#64625c]"><T en={text} zh={sectionsZh[index][1]} /></p></div></section>)}</section></>; }
