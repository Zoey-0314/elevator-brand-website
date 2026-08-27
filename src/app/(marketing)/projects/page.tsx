import type { Metadata } from "next";
import { CtaBand, PageHero, ProjectCard } from "@/components/ui";
import { T } from "@/components/language-provider";
import { projects } from "@/content/projects";

export const metadata: Metadata = { title: "Project References", description: "NS Elevator project-reference framework with clearly labelled concept studies pending verified case studies.", alternates: { canonical: "/projects" } };

export default function ProjectsPage() {
  return <><PageHero eyebrow="Project framework" eyebrowZh="项目框架" title="Evidence, clearly labelled." titleZh="证据清晰，标注明确。" intro="Real project references belong here. Until they are verified, every record remains an explicit concept study—not a fabricated case study." introZh="真实项目案例将在此展示。在完成核实前，所有记录均明确标注为概念研究，而非虚构案例。" index="Projects / Placeholder set" indexZh="项目 / 概念内容" /><section className="container-site py-16 md:py-24"><div className="mb-14 border-y border-[#b26a42] bg-[#eadcd0] px-5 py-5 text-sm leading-6"><strong><T en="Content status:" zh="内容状态：" /></strong> <T en="all records below are placeholders for structure and design review. They do not represent completed NS Elevator installations." zh="以下记录仅用于结构和设计评审，不代表 NS Elevator 已完工项目。" /></div><div className="grid gap-9 md:grid-cols-3">{projects.map((project) => <ProjectCard key={project.id} project={project} />)}</div></section><CtaBand title="Have a reference to document?" titleZh="有真实项目需要记录？" text="Provide verified scope, location, product, year, imagery rights, and approved outcomes. The project record can then be published accurately." textZh="请提供经核实的项目范围、地点、产品、年份、图片授权和批准成果，我们即可准确发布项目记录。" /></>;
}
