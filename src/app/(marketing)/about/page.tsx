import type { Metadata } from "next";
import Image from "next/image";
import { CtaBand, ConceptLabel, PageHero, SectionHeading } from "@/components/ui";
import { company } from "@/content/company";

export const metadata: Metadata = { title: "About", description: "The developing NS Elevator brand, engineering approach, quality philosophy, and support-network framework.", alternates: { canonical: "/about" } };

const capabilities = [
  ["01", "Manufacturing capability", "Capacity, equipment, and factory information will be published only after owner verification and supporting evidence."],
  ["02", "Engineering capability", "A project-led framework for requirements, traffic assumptions, interfaces, drawings, product configuration, and documentation."],
  ["03", "Quality philosophy", "Defined reviews, inspection points, testing, and traceable records—subject to verified production procedures."],
  ["04", "Global market", "English-first content and project coordination for international markets, with local compliance confirmed per installation."],
  ["05", "Support network", "A service model for consultation, installation guidance, commissioning, parts, and after-sales technical support."],
] as const;

export default function AboutPage() {
  return <><PageHero eyebrow="About NS" title="A brand taking shape with intent." intro={company.introduction} index="Company / Verification pending" /><section className="container-site py-16 md:py-24"><div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]"><div className="relative min-h-[560px]"><ConceptLabel /><Image src="/images/brand/cabin-concept.png" alt="Concept visualization showing elevator cabin material detailing" fill sizes="(max-width:1024px) 100vw, 52vw" className="object-cover" /></div><div className="flex flex-col justify-between bg-[#11110f] p-8 text-white sm:p-12 lg:p-16"><span className="eyebrow text-white/50">Positioning</span><div><blockquote className="display text-[clamp(3rem,5vw,6rem)] leading-[0.9]">“{company.positioning}”</blockquote><p className="mt-10 max-w-lg text-sm leading-7 text-white/55">{company.note}</p></div></div></div></section><section className="container-site py-20 md:py-32"><SectionHeading eyebrow="Capability framework" title="What must become verifiable." text="The structure is ready for real evidence. Unsupported capacity, certification, market, and network claims are deliberately absent." /><div className="mt-16 border-t hairline">{capabilities.map(([index, title, text]) => <article key={index} className="grid gap-5 border-b hairline py-8 md:grid-cols-[0.2fr_0.8fr_1fr]"><span className="text-[0.62rem] font-bold text-[#a96e3e]">{index}</span><h2 className="display text-3xl">{title}</h2><p className="max-w-xl text-sm leading-7 text-[#68665f]">{text}</p></article>)}</div></section><CtaBand title="Build the brand on evidence." text="Verified company history, facilities, team, markets, capacity, certifications, and service coverage can replace the clearly marked placeholders in one centralized content layer." /></>;
}
