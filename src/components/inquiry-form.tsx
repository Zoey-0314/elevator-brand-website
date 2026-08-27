"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { products } from "@/content/products";
import { useLanguage } from "./language-provider";

declare global {
  interface Window {
    turnstile?: {
      render: (target: HTMLElement, options: Record<string, unknown>) => string;
      reset: (widgetId?: string) => void;
    };
  }
}

type Props = { initialProduct?: string; sourcePage: string };
type ApiResponse = { accepted?: boolean; code?: string; message?: string; inquiryId?: string; fieldErrors?: Record<string, string[]> };

export function InquiryForm({ initialProduct = "", sourcePage }: Props) {
  const { locale } = useLanguage();
  const isZh = locale === "zh-CN";
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const widgetTarget = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | undefined>(undefined);
  const formStartedAt = useRef(0);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileUnavailable, setTurnstileUnavailable] = useState(false);
  const [state, setState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [reference, setReference] = useState("");
  const copy = isZh ? {
    securityError: "安全验证未能加载，请刷新页面后重试。",
    securityFallback: "安全验证在当前网络不可用，您仍可提交询盘。",
    submitError: "询盘未能提交。",
    success: "您的询盘已收到。",
    networkError: "暂时无法连接询盘服务，请稍后重试。",
    received: "询盘已收到",
    thankYou: "感谢您，项目信息已记录。",
    reference: "编号",
    another: "继续提交询盘",
    name: "姓名",
    company: "公司",
    email: "邮箱",
    phone: "电话",
    country: "国家或地区",
    product: "产品",
    general: "一般咨询",
    projectType: "项目类型",
    projectTypePlaceholder: "例如：酒店、住宅、医院",
    quantity: "数量",
    quantityPlaceholder: "可选的项目估算",
    projectMessage: "项目说明",
    messagePlaceholder: "请说明建筑、地点、项目阶段、主要需求和时间计划。",
    sensitive: "请勿填写密码、付款信息或敏感个人信息。",
    consentPrefix: "我同意 NS Elevator 使用所提交的信息回复本次询盘。请阅读",
    privacy: "隐私政策",
    security: "安全验证",
    preview: "预览配置：",
    disabled: "配置 Turnstile 站点密钥和服务器服务凭据后，询盘提交功能才会启用。",
    sending: "发送中…",
    send: "提交询盘",
    required: "标有 * 的字段为必填项。有效询盘会先保存，再发送邮件通知。",
  } : {
    securityError: "The security check could not load. Please refresh and try again.",
    securityFallback: "The security check is unavailable on this network. You can still submit your inquiry.",
    submitError: "The inquiry could not be submitted.",
    success: "Your inquiry has been received.",
    networkError: "The inquiry service could not be reached. Please try again.",
    received: "Inquiry received",
    thankYou: "Thank you. The project is now on record.",
    reference: "Reference",
    another: "Send another inquiry",
    name: "Name",
    company: "Company",
    email: "Email",
    phone: "Phone",
    country: "Country or region",
    product: "Product",
    general: "General inquiry",
    projectType: "Project type",
    projectTypePlaceholder: "e.g. Hotel, residential, hospital",
    quantity: "Quantity",
    quantityPlaceholder: "Optional project estimate",
    projectMessage: "Project message",
    messagePlaceholder: "Tell us about the building, location, project stage, key requirements, and timeline.",
    sensitive: "Please do not include passwords, payment details, or sensitive personal information.",
    consentPrefix: "I agree that NS Elevator may use the information I submit to respond to this inquiry. Read the",
    privacy: "Privacy Policy",
    security: "Security verification",
    preview: "Preview configuration:",
    disabled: "Inquiry submission is disabled until a Turnstile site key and the server-side provider credentials are configured.",
    sending: "Sending…",
    send: "Send inquiry",
    required: "Fields marked * are required. Valid inquiries are stored before email notification.",
  };

  const mountTurnstile = useCallback(() => {
    if (!siteKey || !widgetTarget.current || !window.turnstile || widgetId.current) return;
    widgetId.current = window.turnstile.render(widgetTarget.current, {
      sitekey: siteKey,
      action: "inquiry",
      theme: "light",
      callback: (token: string) => { setTurnstileToken(token); setTurnstileUnavailable(false); },
      "expired-callback": () => setTurnstileToken(""),
      "error-callback": () => { setTurnstileToken(""); setTurnstileUnavailable(true); },
    });
  }, [siteKey]);

  useEffect(() => {
    if (!formStartedAt.current) formStartedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (!siteKey) return;
    const timer = window.setTimeout(() => { if (!turnstileToken) setTurnstileUnavailable(true); }, 6_000);
    return () => window.clearTimeout(timer);
  }, [siteKey, turnstileToken]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "submitting") return;
    const form = event.currentTarget;
    const data = new FormData(form);
    setState("submitting"); setMessage(""); setFieldErrors({});
    const payload = {
      name: data.get("name"), company: data.get("company"), email: data.get("email"), phone: data.get("phone"), country: data.get("country"), product: data.get("product"), projectType: data.get("projectType"), quantity: data.get("quantity"), message: data.get("message"), privacyConsent: data.get("privacyConsent") === "on", turnstileToken, website: data.get("website"), formStartedAt: formStartedAt.current, sourcePage,
    };
    try {
      const response = await fetch("/api/inquiries", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const result = await response.json() as ApiResponse;
      if (!response.ok || !result.accepted) {
        setFieldErrors(result.fieldErrors ?? {}); setMessage(isZh ? copy.submitError : (result.message ?? copy.submitError)); setState("error");
      } else {
        setReference(result.inquiryId ?? ""); setMessage(isZh ? copy.success : (result.message ?? copy.success)); setState("success"); form.reset();
      }
    } catch { setMessage(copy.networkError); setState("error"); }
    finally { setTurnstileToken(""); window.turnstile?.reset(widgetId.current); }
  }

  const errorFor = (name: string) => fieldErrors[name]?.[0];
  if (state === "success") return <div className="border-t border-[#59836a] bg-[#e3ebe5] p-8" role="status" aria-live="polite"><p className="eyebrow text-[#315a42]">{copy.received}</p><h2 className="display mt-8 text-4xl">{copy.thankYou}</h2><p className="mt-5 max-w-xl text-sm leading-7 text-[#4c6254]">{message}</p>{reference ? <p className="mt-6 text-xs font-bold tracking-[0.12em] uppercase">{copy.reference}: {reference}</p> : null}<button type="button" onClick={() => { setState("idle"); setMessage(""); setReference(""); }} className="button-dark mt-8">{copy.another}</button></div>;

  return (
    <form onSubmit={submit} noValidate aria-busy={state === "submitting"}>
      {siteKey ? <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="afterInteractive" onReady={mountTurnstile} /> : null}
      <div className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true"><label>Website<input name="website" type="text" tabIndex={-1} autoComplete="off" /></label></div>
      <div className="grid gap-x-8 gap-y-8 md:grid-cols-2">
        <Field label={copy.name} name="name" required error={errorFor("name")} autoComplete="name" />
        <Field label={copy.company} name="company" error={errorFor("company")} autoComplete="organization" />
        <Field label={copy.email} name="email" type="email" required error={errorFor("email")} autoComplete="email" />
        <Field label={copy.phone} name="phone" type="tel" error={errorFor("phone")} autoComplete="tel" />
        <Field label={copy.country} name="country" required error={errorFor("country")} autoComplete="country-name" />
        <label className="block"><span className="text-[0.65rem] font-bold tracking-[0.13em] uppercase">{copy.product}</span><select className="field" name="product" defaultValue={initialProduct} aria-invalid={Boolean(errorFor("product"))}><option value="">{copy.general}</option>{products.map((product) => <option key={product.id} value={product.name}>{isZh ? product.zh.name : product.name}</option>)}</select>{errorFor("product") ? <FieldError id="product-error">{errorFor("product")}</FieldError> : null}</label>
        <Field label={copy.projectType} name="projectType" error={errorFor("projectType")} placeholder={copy.projectTypePlaceholder} />
        <Field label={copy.quantity} name="quantity" error={errorFor("quantity")} placeholder={copy.quantityPlaceholder} />
      </div>
      <label className="mt-9 block"><span className="text-[0.65rem] font-bold tracking-[0.13em] uppercase">{copy.projectMessage} <span aria-hidden="true">*</span></span><textarea name="message" className="field" required minLength={20} maxLength={4000} aria-invalid={Boolean(errorFor("message"))} aria-describedby={errorFor("message") ? "message-error" : "message-help"} placeholder={copy.messagePlaceholder} /><span id="message-help" className="mt-2 block text-xs text-[#85827a]">{copy.sensitive}</span>{errorFor("message") ? <FieldError id="message-error">{errorFor("message")}</FieldError> : null}</label>
      <label className="mt-7 flex items-start gap-3 text-sm leading-6"><input type="checkbox" name="privacyConsent" className="mt-1 h-4 w-4 accent-[#11110f]" aria-invalid={Boolean(errorFor("privacyConsent"))} aria-describedby={errorFor("privacyConsent") ? "privacy-error" : undefined} /><span>{copy.consentPrefix} <a className="underline underline-offset-4" href="/privacy">{copy.privacy}</a>. <span aria-hidden="true">*</span></span></label>{errorFor("privacyConsent") ? <FieldError id="privacy-error">{errorFor("privacyConsent")}</FieldError> : null}
      <div className="mt-8 min-h-[74px]" aria-label={copy.security}>{siteKey ? <><div ref={widgetTarget} className={turnstileUnavailable ? "hidden" : undefined} />{turnstileUnavailable ? <div className="border border-[#9b8a61] bg-[#eee9dc] p-4 text-sm leading-6">{copy.securityFallback}</div> : null}</> : <div className="border border-[#b26a42] bg-[#eadcd0] p-4 text-sm leading-6"><strong>{copy.preview}</strong> {copy.disabled}</div>}{errorFor("turnstileToken") ? <FieldError id="turnstile-error">{errorFor("turnstileToken")}</FieldError> : null}</div>
      {message ? <div role="alert" aria-live="assertive" className="mt-6 border-l-2 border-[#a63c2f] bg-[#eee5df] p-4 text-sm">{message}</div> : null}
      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><button type="submit" disabled={state === "submitting" || !siteKey} className="button-dark min-w-52 disabled:cursor-not-allowed disabled:opacity-45">{state === "submitting" ? copy.sending : copy.send} <span aria-hidden="true">↗</span></button><p className="text-xs text-[#7d7a73]">{copy.required}</p></div>
    </form>
  );
}

function Field({ label, name, type = "text", required = false, error, ...props }: { label: string; name: string; type?: string; required?: boolean; error?: string; [key: string]: unknown }) {
  const errorId = `${name}-error`;
  return <label className="block"><span className="text-[0.65rem] font-bold tracking-[0.13em] uppercase">{label} {required ? <span aria-hidden="true">*</span> : null}</span><input className="field" name={name} type={type} required={required} aria-invalid={Boolean(error)} aria-describedby={error ? errorId : undefined} {...props} />{error ? <FieldError id={errorId}>{error}</FieldError> : null}</label>;
}

function FieldError({ id, children }: { id: string; children: string | undefined }) { return <span id={id} className="mt-2 block text-xs font-medium text-[#96382d]">{children}</span>; }
