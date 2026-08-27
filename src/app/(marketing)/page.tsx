import Image from "next/image";
import Link from "next/link";
import { CtaBand, JsonLd, ProductCard, ProjectCard, SectionHeading, SolutionCard } from "@/components/ui";
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
          <div className="flex items-center justify-between text-[0.62rem] font-bold tracking-[0.18em] uppercase text-white/60"><span>Engineered vertical movement</span><span>Concept visual / 2026</span></div>
          <div className="reveal max-w-6xl py-16">
            <p className="eyebrow text-white/70">NS Elevator / International</p>
            <h1 className="display mt-8 text-[clamp(4.5rem,11vw,11.5rem)] leading-[0.78] tracking-[-0.06em]">Move with<br />precision.</h1>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row"><Link href="/products" className="button-light">Explore products <span aria-hidden="true">↗</span></Link><Link href="/contact#inquiry" className="button-outline">Request a quote <span aria-hidden="true">↗</span></Link></div>
          </div>
          <div className="grid gap-5 border-t border-white/30 pt-5 text-xs leading-5 text-white/70 md:grid-cols-[1fr_1fr_auto] md:items-end">
            <p className="max-w-sm">Elevator systems coordinated around the building, its users, and its operating life.</p>
            <p className="max-w-sm">For residential, commercial, healthcare, hospitality, infrastructure, and industrial projects.</p>
            <span aria-hidden="true" className="text-xl">↓</span>
          </div>
        </div>
      </section>

      <section className="container-site py-20 md:py-32">
        <SectionHeading eyebrow="The proposition" title="Built around the whole journey." text={company.introduction} />
        <div className="mt-20 grid border-y hairline sm:grid-cols-2 lg:grid-cols-4">
          {company.metrics.map((metric, index) => <div key={metric.label} className={`py-8 sm:px-6 ${index > 0 ? "border-t sm:border-t-0 sm:border-l" : ""} hairline`}><p className="display text-4xl">{metric.value}</p><p className="mt-3 text-[0.64rem] font-bold tracking-[0.14em] text-[#77746d] uppercase">{metric.label}</p></div>)}
        </div>
        <p className="mt-4 text-xs text-[#8a877f]">Operating metrics and company claims remain intentionally unpublished until owner verification.</p>
      </section>

      <section className="bg-[#dedbd4] py-20 md:py-32">
        <div className="container-site">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between"><SectionHeading eyebrow="Product system" title="Six ways upward." /><Link className="link-arrow shrink-0" href="/products">All products <span aria-hidden="true">↗</span></Link></div>
          <div className="mt-16 grid gap-x-6 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        </div>
      </section>

      <section className="bg-[#11110f] py-20 text-white md:py-32">
        <div className="container-site">
          <SectionHeading inverse eyebrow="The NS method" title="One system. Four disciplines." text="From the first brief to lifecycle support, each discipline is coordinated around the same project intent." />
          <div className="mt-20 grid gap-0 border-t border-white/20 md:grid-cols-2 lg:grid-cols-4">
            {company.principles.map((principle) => <article key={principle.index} className="border-b border-white/20 py-8 md:px-6 lg:border-r"><p className="text-[0.62rem] font-bold tracking-[0.16em] text-[#c98b53]">{principle.index}</p><h3 className="display mt-12 text-3xl">{principle.title}</h3><p className="mt-5 text-sm leading-6 text-white/55">{principle.text}</p></article>)}
          </div>
        </div>
      </section>

      <section className="container-site py-20 md:py-32">
        <SectionHeading eyebrow="Sector thinking" title="The building sets the brief." text="We start with the way people, goods, and services move through the building, then define the right product configuration." />
        <div className="mt-16">{solutions.map((solution) => <SolutionCard key={solution.id} solution={solution} />)}</div>
      </section>

      <section className="grid min-h-[620px] lg:grid-cols-2">
        <div className="relative min-h-[420px]"><span className="absolute top-5 left-5 z-10 bg-black px-3 py-2 text-[0.58rem] font-bold tracking-[0.15em] text-white uppercase">Concept visual</span><Image src="/images/brand/atrium-concept.png" alt="Concept visualization of a panoramic elevator in an atrium" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" /></div>
        <div className="flex items-center bg-[#bd8150] p-8 sm:p-14 lg:p-20"><div><span className="eyebrow">Integrated engineering</span><h2 className="display mt-9 text-[clamp(3.2rem,6vw,7rem)] leading-[0.87]">Architecture and motion, resolved together.</h2><p className="mt-8 max-w-xl text-base leading-7">Shaft interfaces, traffic, cabin materials, controls, access, installation, and service planning belong in one coordinated conversation.</p><Link href="/about" className="button-dark mt-10">How we work <span aria-hidden="true">↗</span></Link></div></div>
      </section>

      <section className="container-site py-20 md:py-32">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between"><SectionHeading eyebrow="Project framework" title="References, without the fiction." text="Until verified project records are supplied, these concept studies demonstrate the intended content structure without inventing clients or outcomes." /><Link className="link-arrow shrink-0" href="/projects">View framework <span aria-hidden="true">↗</span></Link></div>
        <div className="mt-16 grid gap-8 md:grid-cols-3">{projects.map((project) => <ProjectCard key={project.id} project={project} />)}</div>
      </section>
      <CtaBand />
    </>
  );
}
