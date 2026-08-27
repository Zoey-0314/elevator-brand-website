import Link from "next/link";
import { company } from "@/content/company";
import { siteConfig } from "@/content/site";
import { LanguageSwitcher, T } from "./language-provider";
import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="bg-[#11110f] text-white">
      <div className="container-site pt-20 pb-8 md:pt-28">
        <div className="grid gap-14 border-b border-white/15 pb-16 lg:grid-cols-[1.35fr_0.65fr_0.65fr]">
          <div>
            <Logo inverse />
            <p className="display mt-10 max-w-xl text-4xl leading-[1.05] text-white md:text-5xl">
              <T en="Precision in every rise." zh="每一次升降，皆以精准为准则。" />
            </p>
            <p className="mt-6 max-w-md text-sm leading-7 text-white/55">
              <T en="Project-led elevator systems shaped around architecture, operation, and long-term service." zh="围绕建筑、运营与长期服务需求，提供项目导向的电梯系统。" />
            </p>
          </div>
          <div>
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-white/40"><T en="Navigate" zh="导航" /></p>
            <div className="mt-6 grid gap-3">
              {siteConfig.nav.slice(1).map((item) => <Link className="text-sm text-white/75 hover:text-white" key={item.href} href={item.href}><T en={item.label} zh={item.labelZh} /></Link>)}
            </div>
          </div>
          <div>
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-white/40"><T en="Contact" zh="联系方式" /></p>
            <div className="mt-6 space-y-4 text-sm leading-6 text-white/75">
              <p><a className="hover:text-white hover:underline" href={`mailto:${company.contact.salesEmail}`}>{company.contact.salesEmail}</a></p>
              <p><a className="hover:text-white hover:underline" href={`tel:${company.contact.telephone.replace(/\s/g, "")}`}>{company.contact.telephone}</a></p>
              <LanguageSwitcher inverse compact />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 pt-7 text-[0.65rem] uppercase tracking-[0.12em] text-white/40 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} NS Elevator. <T en="All rights reserved." zh="保留所有权利。" /></p>
          <div className="flex gap-5"><Link href="/privacy"><T en="Privacy" zh="隐私" /></Link><Link href="/terms"><T en="Terms" zh="条款" /></Link><Link href="/admin/login"><T en="Admin" zh="管理" /></Link></div>
        </div>
      </div>
    </footer>
  );
}
