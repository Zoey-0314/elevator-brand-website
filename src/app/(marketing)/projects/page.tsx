import type { Metadata } from "next";
import { CtaBand, PageHero, ProjectCard } from "@/components/ui";
import { projects } from "@/content/projects";

export const metadata: Metadata = { title: "Project References", description: "NS Elevator project-reference framework with clearly labelled concept studies pending verified case studies.", alternates: { canonical: "/projects" } };

export default function ProjectsPage() {
  return <><PageHero eyebrow="Project framework" title="Evidence, clearly labelled." intro="Real project references belong here. Until they are verified, every record remains an explicit concept study—not a fabricated case study." index="Projects / Placeholder set" /><section className="container-site py-16 md:py-24"><div className="mb-14 border-y border-[#b26a42] bg-[#eadcd0] px-5 py-5 text-sm leading-6"><strong>Content status:</strong> all records below are placeholders for structure and design review. They do not represent completed NS Elevator installations.</div><div className="grid gap-9 md:grid-cols-3">{projects.map((project) => <ProjectCard key={project.id} project={project} />)}</div></section><CtaBand title="Have a reference to document?" text="Provide verified scope, location, product, year, imagery rights, and approved outcomes. The project record can then be published accurately." /></>;
}
