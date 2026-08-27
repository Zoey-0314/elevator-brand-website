import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Product, Project, Solution } from "@/content/types";
import { T } from "./language-provider";

export function ArrowLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return <Link href={href} className={`link-arrow ${className}`}>{children}<span aria-hidden="true">↗</span></Link>;
}

export function SectionHeading({ eyebrow, eyebrowZh, title, titleZh, text, textZh, inverse = false }: { eyebrow: string; eyebrowZh?: string; title: string; titleZh?: string; text?: string; textZh?: string; inverse?: boolean }) {
  return (
    <div className="grid gap-7 lg:grid-cols-[0.55fr_1.45fr]">
      <div><span className={`eyebrow ${inverse ? "text-white/50" : ""}`}><T en={eyebrow} zh={eyebrowZh ?? eyebrow} /></span></div>
      <div>
        <h2 className={`display text-[clamp(2.5rem,5vw,5.8rem)] leading-[0.94] ${inverse ? "text-white" : ""}`}><T en={title} zh={titleZh ?? title} /></h2>
        {text ? <p className={`mt-7 max-w-2xl text-base leading-7 ${inverse ? "text-white/60" : "text-[#5d5b55]"}`}><T en={text} zh={textZh ?? text} /></p> : null}
      </div>
    </div>
  );
}

export function PageHero({ eyebrow, eyebrowZh, title, titleZh, intro, introZh, index = "NS / 01", indexZh }: { eyebrow: string; eyebrowZh?: string; title: string; titleZh?: string; intro: string; introZh?: string; index?: string; indexZh?: string }) {
  return (
    <section className="container-site border-b hairline py-16 md:py-24 lg:py-32">
      <div className="grid gap-12 lg:grid-cols-[1.65fr_0.55fr] lg:items-end">
        <div className="reveal">
          <span className="eyebrow"><T en={eyebrow} zh={eyebrowZh ?? eyebrow} /></span>
          <h1 className="display mt-9 max-w-5xl text-[clamp(3.6rem,9vw,9.5rem)] leading-[0.82]"><T en={title} zh={titleZh ?? title} /></h1>
        </div>
        <div className="pb-2">
          <p className="text-base leading-7 text-[#5d5b55]"><T en={intro} zh={introZh ?? intro} /></p>
          <p className="mt-8 text-[0.65rem] font-bold tracking-[0.17em] text-[#8b8982] uppercase"><T en={index} zh={indexZh ?? index} /></p>
        </div>
      </div>
    </section>
  );
}

export function ConceptLabel() {
  return <span className="absolute top-4 left-4 z-10 bg-[#11110f] px-3 py-2 text-[0.58rem] font-bold tracking-[0.16em] text-white uppercase"><T en="Concept visual" zh="概念图" /></span>;
}

export function ProductCard({ product, featured = false }: { product: Product; featured?: boolean }) {
  return (
    <article className={`group border-t hairline pt-5 ${featured ? "md:col-span-2" : ""}`}>
      <Link href={`/products/${product.slug}`} className="block">
        <div className={`relative overflow-hidden bg-[#d7d4cc] ${featured ? "aspect-[16/8]" : "aspect-[4/5]"}`}>
          <ConceptLabel />
          <Image src={product.heroImage.src} alt={product.heroImage.alt} fill sizes={featured ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"} className="object-cover transition-transform duration-700 group-hover:scale-[1.025]" />
        </div>
        <div className="flex items-start justify-between gap-4 pt-5">
          <div><p className="text-[0.62rem] font-bold tracking-[0.16em] text-[#8a877f] uppercase">{product.index} / <T en={product.category} zh={product.zh.category} /></p><h3 className="display mt-2 text-3xl"><T en={product.name} zh={product.zh.name} /></h3></div>
          <span aria-hidden="true" className="mt-2 text-xl transition-transform group-hover:translate-x-1">↗</span>
        </div>
      </Link>
    </article>
  );
}

export function SolutionCard({ solution }: { solution: Solution }) {
  return (
    <article className="group border-t hairline py-6">
      <Link href={`/solutions/${solution.slug}`} className="grid gap-4 md:grid-cols-[0.22fr_0.78fr_1fr_auto] md:items-center">
        <span className="text-[0.63rem] font-bold tracking-[0.16em] text-[#8a877f]">{solution.index}</span>
        <h3 className="display text-3xl md:text-4xl"><T en={solution.name} zh={solution.zh.name} /></h3>
        <p className="max-w-md text-sm leading-6 text-[#6b6962]"><T en={solution.overview} zh={solution.zh.overview} /></p>
        <span aria-hidden="true" className="text-xl transition-transform group-hover:translate-x-1">↗</span>
      </Link>
    </article>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group">
      <Link href={`/projects/${project.slug}`}>
        <div className="relative aspect-[5/4] overflow-hidden bg-[#d7d4cc]">
          <ConceptLabel />
          <Image src={project.images[0].src} alt={project.images[0].alt} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.025]" />
        </div>
        <p className="mt-5 text-[0.61rem] font-bold tracking-[0.15em] text-[#85827a] uppercase"><T en={<>Placeholder study / {project.buildingType}</>} zh={<>概念研究 / {project.zh.buildingType}</>} /></p>
        <div className="mt-2 flex items-start justify-between gap-3"><h3 className="display text-3xl"><T en={project.title} zh={project.zh.title} /></h3><span aria-hidden="true" className="text-xl">↗</span></div>
      </Link>
    </article>
  );
}

export function Breadcrumbs({ items }: { items: Array<{ label: string; labelZh?: string; href?: string }> }) {
  return (
    <nav aria-label="Breadcrumb" className="container-site py-5">
      <ol className="flex flex-wrap items-center gap-2 text-[0.61rem] font-bold tracking-[0.12em] text-[#77746d] uppercase">
        {items.map((item, index) => <li key={`${item.label}-${index}`} className="flex items-center gap-2">{item.href ? <Link className="hover:text-black" href={item.href}><T en={item.label} zh={item.labelZh ?? item.label} /></Link> : <span aria-current="page"><T en={item.label} zh={item.labelZh ?? item.label} /></span>}{index < items.length - 1 ? <span aria-hidden="true">/</span> : null}</li>)}
      </ol>
    </nav>
  );
}

export function CtaBand({ title = "Bring the project into focus.", titleZh = "让项目需求清晰落地。", text = "Share the building type, location, timeline, and mobility brief. We will map the next engineering conversation.", textZh = "告诉我们建筑类型、地点、时间计划和垂直交通需求，我们将梳理下一步工程沟通。" }: { title?: string; titleZh?: string; text?: string; textZh?: string }) {
  return (
    <section className="bg-[#bd8150] text-[#11110f]">
      <div className="container-site grid gap-10 py-16 md:py-24 lg:grid-cols-[1.4fr_0.6fr] lg:items-end">
        <div><p className="text-[0.65rem] font-bold uppercase tracking-[0.18em]"><T en="Start a project" zh="启动项目" /></p><h2 className="display mt-6 max-w-4xl text-[clamp(3rem,7vw,7.5rem)] leading-[0.86]"><T en={title} zh={titleZh} /></h2></div>
        <div><p className="max-w-md text-sm leading-7"><T en={text} zh={textZh} /></p><Link href="/contact#inquiry" className="button-dark mt-8"><T en="Request a quote" zh="获取报价" /> <span aria-hidden="true">↗</span></Link></div>
      </div>
    </section>
  );
}

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
