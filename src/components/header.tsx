"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { siteConfig } from "@/content/site";
import { LanguageSwitcher, useLanguage } from "./language-provider";
import { Logo } from "./logo";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { locale } = useLanguage();
  const isZh = locale === "zh-CN";

  return (
    <header className="relative z-50 border-b hairline bg-[#f2f0eb]/95">
      <div className="container-site flex h-[78px] items-center justify-between">
        <Logo />
        <nav aria-label={isZh ? "主导航" : "Main navigation"} className="hidden items-center gap-5 xl:flex">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
              className={`text-[0.66rem] font-bold tracking-[0.13em] uppercase transition-colors hover:text-[#a76634] ${pathname === item.href ? "text-[#a76634]" : "text-[#3f3e39]"}`}
            >
              {isZh ? item.labelZh : item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 xl:flex">
          <LanguageSwitcher compact />
          <Link href="/contact#inquiry" className="button-dark min-w-36">
            {isZh ? "获取报价" : "Get a quote"} <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? (isZh ? "关闭导航" : "Close navigation") : (isZh ? "打开导航" : "Open navigation")}
          onClick={() => setOpen((value) => !value)}
          className="grid h-11 w-11 place-items-center border hairline xl:hidden"
        >
          <span className="sr-only">{isZh ? "菜单" : "Menu"}</span>
          <span aria-hidden="true" className="text-lg">{open ? "×" : "☰"}</span>
        </button>
      </div>
      {open ? (
        <div id="mobile-navigation" className="absolute inset-x-0 top-full border-b border-black/20 bg-[#11110f] text-white xl:hidden">
          <nav aria-label={isZh ? "移动端导航" : "Mobile navigation"} className="container-site py-7">
            <div className="mb-5 flex items-center justify-between border-b border-white/15 pb-5">
              <span className="text-[0.62rem] font-bold tracking-[0.15em] text-white/45 uppercase">{isZh ? "语言" : "Language"}</span>
              <LanguageSwitcher inverse />
            </div>
            {siteConfig.nav.map((item, index) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="flex items-center justify-between border-b border-white/15 py-4 text-sm uppercase tracking-[0.13em]">
                <span>{isZh ? item.labelZh : item.label}</span><span className="text-white/40">{String(index + 1).padStart(2, "0")}</span>
              </Link>
            ))}
            <Link href="/contact#inquiry" onClick={() => setOpen(false)} className="button-light mt-7 w-full">{isZh ? "获取报价" : "Get a quote"} <span aria-hidden="true">↗</span></Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
