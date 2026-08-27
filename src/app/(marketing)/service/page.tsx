import type { Metadata } from "next";
import Image from "next/image";
import { CtaBand, ConceptLabel, PageHero, SectionHeading } from "@/components/ui";

export const metadata: Metadata = { title: "Service", description: "NS Elevator service pathway from pre-sales consultation to after-sales technical support.", alternates: { canonical: "/service" } };

const serviceStages = [
  ["01", "Pre-sales consultation", "Clarify building use, stakeholder needs, project stage, location, and target timeline."],
  ["02", "Engineering support", "Coordinate requirements, product selection, interfaces, and documentation expectations."],
  ["03", "Installation guidance", "Define installation responsibilities, information flow, site readiness, and support boundaries."],
  ["04", "Commissioning", "Prepare project-specific testing, acceptance, and handover pathways once procedures are verified."],
  ["05", "Maintenance support", "Structure lifecycle service requirements around the operating environment and local provision."],
  ["06", "Spare parts", "Plan traceable parts identification, request handling, and logistics with verified supply information."],
  ["07", "After-sales technical support", "Maintain clear escalation routes, documentation, and issue context throughout operation."],
] as const;

export default function ServicePage() {
  return <><PageHero eyebrow="Lifecycle service" title="Support starts before installation." intro="A reliable elevator project depends on clear technical coordination and service planning long before equipment arrives on site." index="Service / 01—07" /><section className="container-site py-16 md:py-24"><div className="relative aspect-[16/8] overflow-hidden"><ConceptLabel /><Image src="/images/brand/atrium-concept.png" alt="Concept visualization of elevator engineering integrated into a public atrium" fill sizes="100vw" className="object-cover" /></div></section><section className="container-site py-20 md:py-32"><SectionHeading eyebrow="Service pathway" title="One project record. Seven moments of support." text="Availability, response targets, regions, and partner coverage require owner verification before they can be represented as service commitments." /><div className="mt-16 border-t hairline">{serviceStages.map(([index, title, text]) => <article key={index} className="grid gap-5 border-b hairline py-8 md:grid-cols-[0.15fr_0.65fr_1fr]"><span className="text-[0.62rem] font-bold text-[#a96e3e]">{index}</span><h2 className="display text-3xl">{title}</h2><p className="max-w-xl text-sm leading-7 text-[#68665f]">{text}</p></article>)}</div></section><CtaBand title="Plan service with the system." /></>;
}
