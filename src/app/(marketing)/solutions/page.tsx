import type { Metadata } from "next";
import Image from "next/image";
import { CtaBand, ConceptLabel, PageHero, SolutionCard } from "@/components/ui";
import { T } from "@/components/language-provider";
import { solutions } from "@/content/solutions";

export const metadata: Metadata = { title: "Industry Solutions", description: "Elevator planning for residential, commercial, hotel, hospital, infrastructure, and industrial projects.", alternates: { canonical: "/solutions" } };

export default function SolutionsPage() {
  return <><PageHero eyebrow="Sector intelligence" eyebrowZh="行业洞察" title="Start with the building." titleZh="从建筑出发。" intro="Product selection follows use: who moves, what moves, when demand peaks, and how the building must operate over time." introZh="产品选型源于实际使用：谁在移动、运输什么、何时达到峰值，以及建筑如何长期运营。" index="Solutions / 01—06" indexZh="解决方案 / 01—06" /><section className="container-site py-16 md:py-24"><div className="mb-20 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]"><div className="flex items-end border-t hairline pt-6"><p className="display max-w-lg text-4xl md:text-5xl"><T en="The right vertical-mobility system is a response, not a preset." zh="合适的垂直交通系统应回应真实需求，而非套用预设。" /></p></div><div className="relative aspect-[16/9] overflow-hidden"><ConceptLabel /><Image src="/images/brand/atrium-concept.png" alt="Concept visualization of a glass elevator system in an atrium" fill sizes="(max-width:1024px) 100vw, 60vw" className="object-cover" /></div></div>{solutions.map((solution) => <SolutionCard key={solution.id} solution={solution} />)}</section><CtaBand title="Map the building's movement." titleZh="梳理建筑中的移动方式。" /></>;
}
