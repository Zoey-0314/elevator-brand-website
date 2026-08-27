import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs, ConceptLabel, CtaBand } from "@/components/ui";
import { getProject, projects } from "@/content/projects";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const item = getProject((await params).slug); return item ? { title: item.seoTitle, description: item.seoDescription, alternates: { canonical: `/projects/${item.slug}` } } : {}; }

export default async function ProjectDetail({ params }: Props) {
  const project = getProject((await params).slug); if (!project) notFound();
  return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Projects", href: "/projects" }, { label: project.title }]} /><section className="container-site border-t hairline pt-10 pb-16"><div className="grid gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:items-end"><div><p className="eyebrow">Unverified concept record</p><h1 className="display mt-9 text-[clamp(3.8rem,8vw,8.5rem)] leading-[0.84]">{project.title}</h1></div><div><p className="text-sm leading-7 text-[#64625c]">{project.summary}</p><div className="mt-8 grid grid-cols-2 gap-5 border-t hairline pt-5 text-xs"><div><p className="font-bold uppercase tracking-[0.12em] text-[#88857d]">Location</p><p className="mt-2">{project.city}, {project.country}</p></div><div><p className="font-bold uppercase tracking-[0.12em] text-[#88857d]">Building</p><p className="mt-2">{project.buildingType}</p></div></div></div></div></section><section className="container-site"><div className="relative aspect-[16/8] overflow-hidden"><ConceptLabel /><Image src={project.images[0].src} alt={project.images[0].alt} fill sizes="100vw" className="object-cover" /></div><p className="mt-3 text-xs text-[#77746d]">{project.images[0].caption}</p></section><section className="container-site grid gap-16 py-20 md:py-32 lg:grid-cols-[0.7fr_1.3fr]"><div><span className="eyebrow">Record status</span><h2 className="display mt-8 text-5xl">Awaiting verified project data.</h2></div><div><p className="display text-3xl leading-tight">{project.description}</p><div className="mt-12 border-t hairline"><div className="grid grid-cols-2 border-b hairline py-5 text-sm"><span className="text-[#77746d]">Elevator types</span><span>{project.elevatorTypes.join(", ")}</span></div><div className="grid grid-cols-2 border-b hairline py-5 text-sm"><span className="text-[#77746d]">Completion year</span><span>Pending verification</span></div><div className="grid grid-cols-2 border-b hairline py-5 text-sm"><span className="text-[#77746d]">Client approval</span><span>Not supplied</span></div></div><Link href="/contact" className="button-dark mt-10">Discuss a similar brief <span aria-hidden="true">↗</span></Link></div></section><CtaBand /></>;
}
