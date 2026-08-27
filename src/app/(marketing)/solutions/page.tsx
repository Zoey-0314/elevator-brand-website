import type { Metadata } from "next";
import Image from "next/image";
import { CtaBand, ConceptLabel, PageHero, SolutionCard } from "@/components/ui";
import { solutions } from "@/content/solutions";

export const metadata: Metadata = { title: "Industry Solutions", description: "Elevator planning for residential, commercial, hotel, hospital, infrastructure, and industrial projects.", alternates: { canonical: "/solutions" } };

export default function SolutionsPage() {
  return <><PageHero eyebrow="Sector intelligence" title="Start with the building." intro="Product selection follows use: who moves, what moves, when demand peaks, and how the building must operate over time." index="Solutions / 01—06" /><section className="container-site py-16 md:py-24"><div className="mb-20 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]"><div className="flex items-end border-t hairline pt-6"><p className="display max-w-lg text-4xl md:text-5xl">The right vertical-mobility system is a response, not a preset.</p></div><div className="relative aspect-[16/9] overflow-hidden"><ConceptLabel /><Image src="/images/brand/atrium-concept.png" alt="Concept visualization of a glass elevator system in an atrium" fill sizes="(max-width:1024px) 100vw, 60vw" className="object-cover" /></div></div>{solutions.map((solution) => <SolutionCard key={solution.id} solution={solution} />)}</section><CtaBand title="Map the building's movement." /></>;
}
