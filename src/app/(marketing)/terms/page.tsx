import type { Metadata } from "next";
import { PageHero } from "@/components/ui";
export const metadata: Metadata = { title: "Website Terms", description: "Website terms structure for NS Elevator. Legal review required.", alternates: { canonical: "/terms" } };
const sections = [
  ["Website purpose", "This website presents a developing brand, product frameworks, and inquiry paths. It is not an offer, contract, technical approval, or installation instruction."],
  ["Concept and placeholder content", "Concept imagery, project studies, specifications, contact data, and unverified company information are clearly marked and must be replaced or approved before launch."],
  ["Technical information", "Final product selection, performance, compliance, interfaces, and suitability require project-specific engineering review and written agreement."],
  ["Intellectual property", "Ownership, permitted use, trademarks, imagery rights, and downloadable materials require company and legal confirmation."],
  ["External services and links", "Third-party service availability and terms are controlled by their providers. The final company terms must define relevant responsibility and limitations."],
  ["Liability and jurisdiction", "Applicable law, venue, warranties, exclusions, and liability limits have not been approved and require qualified legal review."],
] as const;
export default function TermsPage() { return <><PageHero eyebrow="Legal draft" title="Website terms." intro="Professional placeholder structure. Company and legal review is required before production launch." index="Legal / Review required" /><section className="container-site max-w-5xl py-16 md:py-24"><div className="mb-12 border-y border-[#a9663f] bg-[#eadcd0] p-6 text-sm leading-6"><strong>Not legal advice.</strong> These terms are an editorial framework only and are not ready for public reliance.</div>{sections.map(([title, text], index) => <section key={title} className="grid gap-4 border-t hairline py-8 md:grid-cols-[0.15fr_0.85fr]"><span className="text-[0.62rem] font-bold text-[#a96e3e]">{String(index + 1).padStart(2, "0")}</span><div><h2 className="display text-3xl">{title}</h2><p className="mt-4 text-sm leading-7 text-[#64625c]">{text}</p></div></section>)}</section></>; }
