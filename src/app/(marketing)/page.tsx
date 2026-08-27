import Image from "next/image";
import Link from "next/link";
import { CtaBand, JsonLd, ProductCard, ProjectCard, SectionHeading, SolutionCard } from "@/components/ui";
import { T } from "@/components/language-provider";
import { company } from "@/content/company";
import { products } from "@/content/products";
import { projects } from "@/content/projects";
import { absoluteUrl, siteConfig } from "@/content/site";
import { solutions } from "@/content/solutions";

export default function HomePage() {
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "WebSite", name: siteConfig.name, url: absoluteUrl(), description: siteConfig.description }} />
      <section className="relative min-h-[calc(100svh-78px)] overflow-hidden bg-[#171714] text-white">
        <Image priority src="/images/brand/hero-architecture.png" alt="Concept visualization of a contemporary elevator lobby" fill sizes="100vw" className="object-cover opacity-75" />
        <div className="absolute inset-0 bg-black/30" />
        <div className="container-site relative flex min-h-[calc(100svh-78px)] flex-col justify-between py-8 md:py-12">
          <div className="flex items-center justify-between text-[0.62rem] font-bold tracking-[0.18em] uppercase text-white/60"><span><T en="Engineered vertical movement" zh="工程化垂直交通" /></span><span><T en="Concept visual / 2026" zh="概念图 / 2026" /></span></div>
          <div className="reveal max-w-6xl py-16">
            <p className="eyebrow text-white/70"><T en="NS Elevator / International" zh="NS 电梯 / 全球服务" /></p>
            <h1 className="display mt-8 text-[clamp(4.5rem,11vw,11.5rem)] leading-[0.78] tracking-[-0.06em]"><T en={<>Move with<br />precision.</>} zh={<>精准，贯穿<br />每次升降。</>} /></h1>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row"><Link href="/products" className="button-light"><T en="Explore products" zh="浏览产品" /> <span aria-hidden="true">↗</span></Link><Link href="/contact#inquiry" className="button-outline"><T en="Request a quote" zh="获取报价" /> <span aria-hidden="true">↗</span></Link></div>
          </div>
          <div className="grid gap-5 border-t border-white/30 pt-5 text-xs leading-5 text-white/70 md:grid-cols-[1fr_1fr_auto] md:items-end">
            <p className="max-w-sm"><T en="Elevator systems coordinated around the building, its users, and its operating life." zh="围绕建筑、使用者与运营周期协同规划电梯系统。" /></p>
            <p className="max-w-sm"><T en="For residential, commercial, healthcare, hospitality, infrastructure, and industrial projects." zh="服务住宅、商业、医疗、酒店、基础设施和工业项目。" /></p>
            <span aria-hidden="true" className="text-xl">↓</span>
          </div>
        </div>
      </section>

      <section className="container-site py-20 md:py-32">
        <SectionHeading eyebrow="The proposition" eyebrowZh="品牌主张" title="Built around the whole journey." titleZh="围绕完整旅程而设计。" text={company.introduction} textZh={company.zh.introduction} />
        <div className="mt-20 grid border-y hairline sm:grid-cols-2 lg:grid-cols-4">
          {company.metrics.map((metric, index) => <div key={metric.label} className={`py-8 sm:px-6 ${index > 0 ? "border-t sm:border-t-0 sm:border-l" : ""} hairline`}><p className="display text-4xl"><T en={metric.value} zh={company.zh.metrics[index].value} /></p><p className="mt-3 text-[0.64rem] font-bold tracking-[0.14em] text-[#77746d] uppercase"><T en={metric.label} zh={company.zh.metrics[index].label} /></p></div>)}
        </div>
        <p className="mt-4 text-xs text-[#8a877f]"><T en="Operating metrics and company claims remain intentionally unpublished until owner verification." zh="运营数据和公司声明将在所有者核实前保持不公开。" /></p>
      </section>

      <section className="bg-[#dedbd4] py-20 md:py-32">
        <div className="container-site">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between"><SectionHeading eyebrow="Product system" eyebrowZh="产品体系" title="Six ways upward." titleZh="六种向上的方式。" /><Link className="link-arrow shrink-0" href="/products"><T en="All products" zh="全部产品" /> <span aria-hidden="true">↗</span></Link></div>
          <div className="mt-16 grid gap-x-6 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        </div>
      </section>

      <section className="bg-[#11110f] py-20 text-white md:py-32">
        <div className="container-site">
          <SectionHeading inverse eyebrow="The NS method" eyebrowZh="NS 方法" title="One system. Four disciplines." titleZh="一个系统，四项原则。" text="From the first brief to lifecycle support, each discipline is coordinated around the same project intent." textZh="从初步需求到全生命周期支持，各项工作始终围绕同一项目目标协同推进。" />
          <div className="mt-20 grid gap-0 border-t border-white/20 md:grid-cols-2 lg:grid-cols-4">
            {company.principles.map((principle, index) => <article key={principle.index} className="border-b border-white/20 py-8 md:px-6 lg:border-r"><p className="text-[0.62rem] font-bold tracking-[0.16em] text-[#c98b53]">{principle.index}</p><h3 className="display mt-12 text-3xl"><T en={principle.title} zh={company.zh.principles[index].title} /></h3><p className="mt-5 text-sm leading-6 text-white/55"><T en={principle.text} zh={company.zh.principles[index].text} /></p></article>)}
          </div>
        </div>
      </section>

      <section className="container-site py-20 md:py-32">
        <SectionHeading eyebrow="Sector thinking" eyebrowZh="行业思考" title="The building sets the brief." titleZh="建筑决定需求。" text="We start with the way people, goods, and services move through the building, then define the right product configuration." textZh="我们从人员、货物和服务在建筑中的移动方式出发，再确定合适的产品配置。" />
        <div className="mt-16">{solutions.map((solution) => <SolutionCard key={solution.id} solution={solution} />)}</div>
      </section>

      <section className="grid min-h-[620px] lg:grid-cols-2">
        <div className="relative min-h-[420px]"><span className="absolute top-5 left-5 z-10 bg-black px-3 py-2 text-[0.58rem] font-bold tracking-[0.15em] text-white uppercase"><T en="Concept visual" zh="概念图" /></span><Image src="/images/brand/atrium-concept.png" alt="Concept visualization of a panoramic elevator in an atrium" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" /></div>
        <div className="flex items-center bg-[#bd8150] p-8 sm:p-14 lg:p-20"><div><span className="eyebrow"><T en="Integrated engineering" zh="一体化工程" /></span><h2 className="display mt-9 text-[clamp(3.2rem,6vw,7rem)] leading-[0.87]"><T en="Architecture and motion, resolved together." zh="建筑与运行，一体协同。" /></h2><p className="mt-8 max-w-xl text-base leading-7"><T en="Shaft interfaces, traffic, cabin materials, controls, access, installation, and service planning belong in one coordinated conversation." zh="井道接口、交通流量、轿厢材质、控制、通行、安装与服务规划，应在同一协同流程中解决。" /></p><Link href="/about" className="button-dark mt-10"><T en="How we work" zh="了解我们的方法" /> <span aria-hidden="true">↗</span></Link></div></div>
      </section>

      <section className="container-site py-20 md:py-32">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between"><SectionHeading eyebrow="Project framework" eyebrowZh="项目框架" title="References, without the fiction." titleZh="案例展示，不虚构事实。" text="Until verified project records are supplied, these concept studies demonstrate the intended content structure without inventing clients or outcomes." textZh="在获得经核实的项目资料前，这些概念研究仅用于展示内容结构，不虚构客户或成果。" /><Link className="link-arrow shrink-0" href="/projects"><T en="View framework" zh="查看项目框架" /> <span aria-hidden="true">↗</span></Link></div>
        <div className="mt-16 grid gap-8 md:grid-cols-3">{projects.map((project) => <ProjectCard key={project.id} project={project} />)}</div>
      </section>
      <CtaBand />
    </>
  );
}
