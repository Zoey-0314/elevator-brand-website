import type { Metadata } from "next";
import { InquiryForm } from "@/components/inquiry-form";
import { PageHero } from "@/components/ui";
import { company } from "@/content/company";
import { products } from "@/content/products";

export const metadata: Metadata = { title: "Contact & Quote", description: "Start a project conversation with NS Elevator and submit a secure quotation inquiry.", alternates: { canonical: "/contact" } };
type Props = { searchParams: Promise<{ product?: string; source?: string }> };

export default async function ContactPage({ searchParams }: Props) {
  const query = await searchParams;
  const initialProduct = products.some((product) => product.name === query.product) ? query.product : "";
  const sourcePage = query.source?.startsWith("/") ? query.source.slice(0, 500) : "/contact";
  const details = [
    ["Sales email", company.contact.salesEmail], ["Service email", company.contact.serviceEmail], ["Telephone", company.contact.telephone], ["WhatsApp", company.contact.whatsapp], ["Address", company.contact.address], ["Working hours", company.contact.hours],
  ];
  return <><PageHero eyebrow="Start a project" title="Let's define the next move." intro="Share the building, location, product interest, project stage, and timeline. The inquiry workflow stores a valid record before attempting email notification." index="Contact / Secure inquiry" /><section className="container-site grid gap-16 py-16 md:py-24 lg:grid-cols-[0.65fr_1.35fr]"><aside><span className="eyebrow">Business contact</span><h2 className="display mt-8 text-5xl">One clear point of entry.</h2><p className="mt-6 max-w-md text-sm leading-7 text-[#68665f]">All contact information is centralized. Current details are placeholders and must be replaced with verified business records before public launch.</p><div className="mt-10 border-t hairline">{details.map(([label, value]) => <div key={label} className="border-b hairline py-5"><p className="text-[0.62rem] font-bold tracking-[0.13em] text-[#85827a] uppercase">{label}</p><p className="mt-2 text-sm">{value}</p></div>)}</div><div className="mt-8 border-l-2 border-[#a9663f] bg-[#eadcd0] p-5 text-xs leading-6"><strong>Verification notice.</strong> Do not use the .example email addresses for real correspondence.</div></aside><div id="inquiry" className="scroll-mt-24"><div className="border-t hairline pt-6"><span className="eyebrow">Quotation inquiry</span><h2 className="display mt-8 text-5xl md:text-6xl">Tell us about the project.</h2><p className="mt-6 max-w-2xl text-sm leading-7 text-[#68665f]">A server-verified security check is required. Submitted data is validated, stored in Supabase, and then routed to the configured business recipient.</p></div><div className="mt-12"><InquiryForm initialProduct={initialProduct} sourcePage={sourcePage} /></div></div></section></>;
}
