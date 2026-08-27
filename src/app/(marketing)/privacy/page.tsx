import type { Metadata } from "next";
import { PageHero } from "@/components/ui";

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
export default function PrivacyPage() { return <><PageHero eyebrow="Legal draft" title="Privacy policy." intro="Professional placeholder structure. Company and legal review is required before production launch." index="Legal / Review required" /><section className="container-site max-w-5xl py-16 md:py-24"><div className="mb-12 border-y border-[#a9663f] bg-[#eadcd0] p-6 text-sm leading-6"><strong>Not legal advice.</strong> This draft reflects the planned site workflow but has not been approved for any jurisdiction.</div>{sections.map(([title, text], index) => <section key={title} className="grid gap-4 border-t hairline py-8 md:grid-cols-[0.15fr_0.85fr]"><span className="text-[0.62rem] font-bold text-[#a96e3e]">{String(index + 1).padStart(2, "0")}</span><div><h2 className="display text-3xl">{title}</h2><p className="mt-4 text-sm leading-7 text-[#64625c]">{text}</p></div></section>)}</section></>; }
