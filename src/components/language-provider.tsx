"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useSyncExternalStore, type ReactNode } from "react";

export type Locale = "en" | "zh-CN";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

const STORAGE_KEY = "ns-elevator.locale.v1";
const CHANGE_EVENT = "ns-elevator:locale-change";
const LanguageContext = createContext<LanguageContextValue | null>(null);

function getLocaleSnapshot(): Locale {
  const saved = window.localStorage.getItem(STORAGE_KEY);
  return saved === "zh-CN" ? "zh-CN" : "en";
}

function getServerLocaleSnapshot(): Locale {
  return "en";
}

function subscribeToLocale(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(CHANGE_EVENT, onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(CHANGE_EVENT, onStoreChange);
  };
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore(subscribeToLocale, getLocaleSnapshot, getServerLocaleSnapshot);
  const setLocale = useCallback((nextLocale: Locale) => {
    window.localStorage.setItem(STORAGE_KEY, nextLocale);
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale === "zh-CN" ? "zh-CN" : "en";
  }, [locale]);

  const value = useMemo(() => ({ locale, setLocale }), [locale, setLocale]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}

export function T({ en, zh }: { en: ReactNode; zh: ReactNode }) {
  const { locale } = useLanguage();
  return <>{locale === "zh-CN" ? zh : en}</>;
}

export function LanguageSwitcher({ inverse = false, compact = false }: { inverse?: boolean; compact?: boolean }) {
  const { locale, setLocale } = useLanguage();
  const base = inverse ? "border-white/25 text-white/65" : "border-black/20 text-[#5d5b55]";
  const active = inverse ? "bg-white text-black" : "bg-[#11110f] text-white";

  return (
    <div className={`inline-flex border ${base}`} role="group" aria-label={locale === "zh-CN" ? "语言选择" : "Language selection"}>
      <button type="button" aria-pressed={locale === "en"} onClick={() => setLocale("en")} className={`${compact ? "px-2.5 py-2" : "px-3 py-2.5"} text-[0.6rem] font-bold tracking-[0.12em] ${locale === "en" ? active : ""}`}>EN</button>
      <button type="button" aria-pressed={locale === "zh-CN"} onClick={() => setLocale("zh-CN")} className={`${compact ? "px-2.5 py-2" : "px-3 py-2.5"} text-[0.6rem] font-bold tracking-[0.08em] ${locale === "zh-CN" ? active : ""}`}>简中</button>
    </div>
  );
}
