import type { Metadata } from "next";
import { InquiryForm } from "@/components/inquiry-form";
import { T } from "@/components/language-provider";
import { PageHero } from "@/components/ui";
import { company } from "@/content/company";
import { products } from "@/content/products";

export const metadata: Metadata = { title: "Contact & Quote", description: "Start a project conversation with NS Elevator and submit a secure quotation inquiry.", alternates: { canonical: "/contact" } };
type Props = { searchParams: Promise<{ product?: string; source?: string }> };

export default async function ContactPage({ searchParams }: Props) {
  const query = await searchParams;
  const initialProduct = products.some((product) => product.name === query.product) ? query.product : "";
  const sourcePage = query.source?.startsWith("/") ? query.source.slice(0, 500) : "/contact";

  return <>
    <PageHero eyebrow="Start a project" eyebrowZh="启动项目" title="Let's define the next move." titleZh="一起明确下一步。" intro="Share the building, location, product interest, project stage, and timeline. The inquiry workflow stores a valid record before attempting email notification." introZh="告诉我们建筑、地点、感兴趣的产品、项目阶段和时间计划。有效询盘会先保存记录，再尝试发送邮件通知。" index="Contact / Secure inquiry" indexZh="联系我们 / 安全询盘" />
    <section className="container-site grid gap-16 py-16 md:py-24 lg:grid-cols-[0.65fr_1.35fr]">
      <aside>
        <span className="eyebrow"><T en="Business contact" zh="商务联系" /></span>
        <h2 className="display mt-8 text-5xl"><T en="One clear point of entry." zh="一个清晰的联系入口。" /></h2>
        <p className="mt-6 max-w-md text-sm leading-7 text-[#68665f]"><T en="Contact us directly by email or telephone." zh="您可以通过电子邮件或电话直接联系我们。" /></p>
        <div className="mt-10 border-t hairline">
          <div className="border-b hairline py-5">
            <p className="text-[0.62rem] font-bold tracking-[0.13em] text-[#85827a] uppercase"><T en="Email" zh="邮箱" /></p>
            <a className="mt-2 inline-block text-sm underline-offset-4 hover:underline" href={`mailto:${company.contact.salesEmail}`}>{company.contact.salesEmail}</a>
          </div>
          <div className="border-b hairline py-5">
            <p className="text-[0.62rem] font-bold tracking-[0.13em] text-[#85827a] uppercase"><T en="Telephone" zh="电话" /></p>
            <a className="mt-2 inline-block text-sm underline-offset-4 hover:underline" href={`tel:${company.contact.telephone.replace(/\s/g, "")}`}>{company.contact.telephone}</a>
          </div>
        </div>
      </aside>
      <div id="inquiry" className="scroll-mt-24">
        <div className="border-t hairline pt-6">
          <span className="eyebrow"><T en="Quotation inquiry" zh="报价询盘" /></span>
          <h2 className="display mt-8 text-5xl md:text-6xl"><T en="Tell us about the project." zh="请告诉我们项目情况。" /></h2>
          <p className="mt-6 max-w-2xl text-sm leading-7 text-[#68665f]"><T en="A server-verified security check is required. Submitted data is validated, stored in Supabase, and then routed to the configured business recipient." zh="提交前需要完成服务器验证的安全检查。数据经验证后保存至 Supabase，再发送给配置的业务联系人。" /></p>
        </div>
        <div className="mt-12"><InquiryForm initialProduct={initialProduct} sourcePage={sourcePage} /></div>
      </div>
    </section>
  </>;
}
