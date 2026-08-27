import Link from "next/link";
import { company } from "@/content/company";
import { siteConfig } from "@/content/site";
import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="bg-[#11110f] text-white">
      <div className="container-site pt-20 pb-8 md:pt-28">
        <div className="grid gap-14 border-b border-white/15 pb-16 lg:grid-cols-[1.35fr_0.65fr_0.65fr]">
          <div>
            <Logo inverse />
            <p className="display mt-10 max-w-xl text-4xl leading-[1.05] text-white md:text-5xl">
              Precision in every rise.
            </p>
            <p className="mt-6 max-w-md text-sm leading-7 text-white/55">
              Project-led elevator systems shaped around architecture, operation, and long-term service.
            </p>
          </div>
          <div>
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-white/40">Navigate</p>
            <div className="mt-6 grid gap-3">
              {siteConfig.nav.slice(1).map((item) => <Link className="text-sm text-white/75 hover:text-white" key={item.href} href={item.href}>{item.label}</Link>)}
            </div>
          </div>
          <div>
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-white/40">Contact</p>
            <div className="mt-6 space-y-4 text-sm leading-6 text-white/75">
              <p>{company.contact.salesEmail}</p>
              <p>{company.contact.telephone}</p>
              <p>{company.contact.address}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 pt-7 text-[0.65rem] uppercase tracking-[0.12em] text-white/40 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} NS Elevator. All rights reserved.</p>
          <div className="flex gap-5"><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/admin/login">Admin</Link></div>
        </div>
      </div>
    </footer>
  );
}
