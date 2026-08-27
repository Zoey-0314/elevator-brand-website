"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { siteConfig } from "@/content/site";
import { Logo } from "./logo";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-50 border-b hairline bg-[#f2f0eb]/95">
      <div className="container-site flex h-[78px] items-center justify-between">
        <Logo />
        <nav aria-label="Main navigation" className="hidden items-center gap-7 xl:flex">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
              className={`text-[0.66rem] font-bold tracking-[0.13em] uppercase transition-colors hover:text-[#a76634] ${pathname === item.href ? "text-[#a76634]" : "text-[#3f3e39]"}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden xl:block">
          <Link href="/contact#inquiry" className="button-dark min-w-40">
            Get a quote <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen((value) => !value)}
          className="grid h-11 w-11 place-items-center border hairline xl:hidden"
        >
          <span className="sr-only">Menu</span>
          <span aria-hidden="true" className="text-lg">{open ? "×" : "☰"}</span>
        </button>
      </div>
      {open ? (
        <div id="mobile-navigation" className="absolute inset-x-0 top-full border-b border-black/20 bg-[#11110f] text-white xl:hidden">
          <nav aria-label="Mobile navigation" className="container-site py-7">
            {siteConfig.nav.map((item, index) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="flex items-center justify-between border-b border-white/15 py-4 text-sm uppercase tracking-[0.13em]">
                <span>{item.label}</span><span className="text-white/40">{String(index + 1).padStart(2, "0")}</span>
              </Link>
            ))}
            <Link href="/contact#inquiry" onClick={() => setOpen(false)} className="button-light mt-7 w-full">Get a quote <span aria-hidden="true">↗</span></Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
