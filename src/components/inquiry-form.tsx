"use client";

import Script from "next/script";
import { useCallback, useRef, useState, type FormEvent } from "react";
import { products } from "@/content/products";

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
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const widgetTarget = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | undefined>(undefined);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [state, setState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [reference, setReference] = useState("");

  const mountTurnstile = useCallback(() => {
    if (!siteKey || !widgetTarget.current || !window.turnstile || widgetId.current) return;
    widgetId.current = window.turnstile.render(widgetTarget.current, {
      sitekey: siteKey,
      action: "inquiry",
      theme: "light",
      callback: (token: string) => setTurnstileToken(token),
      "expired-callback": () => setTurnstileToken(""),
      "error-callback": () => { setTurnstileToken(""); setMessage("The security check could not load. Please refresh and try again."); setState("error"); },
    });
  }, [siteKey]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "submitting") return;
    const form = event.currentTarget;
    const data = new FormData(form);
    setState("submitting"); setMessage(""); setFieldErrors({});
    const payload = {
      name: data.get("name"), company: data.get("company"), email: data.get("email"), phone: data.get("phone"), country: data.get("country"), product: data.get("product"), projectType: data.get("projectType"), quantity: data.get("quantity"), message: data.get("message"), privacyConsent: data.get("privacyConsent") === "on", turnstileToken, sourcePage,
    };
    try {
      const response = await fetch("/api/inquiries", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const result = await response.json() as ApiResponse;
      if (!response.ok || !result.accepted) {
        setFieldErrors(result.fieldErrors ?? {}); setMessage(result.message ?? "The inquiry could not be submitted."); setState("error");
      } else {
        setReference(result.inquiryId ?? ""); setMessage(result.message ?? "Your inquiry has been received."); setState("success"); form.reset();
      }
    } catch { setMessage("The inquiry service could not be reached. Please try again."); setState("error"); }
    finally { setTurnstileToken(""); window.turnstile?.reset(widgetId.current); }
  }

  const errorFor = (name: string) => fieldErrors[name]?.[0];
  if (state === "success") return <div className="border-t border-[#59836a] bg-[#e3ebe5] p-8" role="status" aria-live="polite"><p className="eyebrow text-[#315a42]">Inquiry received</p><h2 className="display mt-8 text-4xl">Thank you. The project is now on record.</h2><p className="mt-5 max-w-xl text-sm leading-7 text-[#4c6254]">{message}</p>{reference ? <p className="mt-6 text-xs font-bold tracking-[0.12em] uppercase">Reference: {reference}</p> : null}<button type="button" onClick={() => { setState("idle"); setMessage(""); setReference(""); }} className="button-dark mt-8">Send another inquiry</button></div>;

  return (
    <form onSubmit={submit} noValidate aria-busy={state === "submitting"}>
      {siteKey ? <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="afterInteractive" onReady={mountTurnstile} /> : null}
      <div className="grid gap-x-8 gap-y-8 md:grid-cols-2">
        <Field label="Name" name="name" required error={errorFor("name")} autoComplete="name" />
        <Field label="Company" name="company" error={errorFor("company")} autoComplete="organization" />
        <Field label="Email" name="email" type="email" required error={errorFor("email")} autoComplete="email" />
        <Field label="Phone / WhatsApp" name="phone" type="tel" error={errorFor("phone")} autoComplete="tel" />
        <Field label="Country" name="country" required error={errorFor("country")} autoComplete="country-name" />
        <label className="block"><span className="text-[0.65rem] font-bold tracking-[0.13em] uppercase">Product</span><select className="field" name="product" defaultValue={initialProduct} aria-invalid={Boolean(errorFor("product"))}><option value="">General inquiry</option>{products.map((product) => <option key={product.id} value={product.name}>{product.name}</option>)}</select>{errorFor("product") ? <FieldError id="product-error">{errorFor("product")}</FieldError> : null}</label>
        <Field label="Project type" name="projectType" error={errorFor("projectType")} placeholder="e.g. Hotel, residential, hospital" />
        <Field label="Quantity" name="quantity" error={errorFor("quantity")} placeholder="Optional project estimate" />
      </div>
      <label className="mt-9 block"><span className="text-[0.65rem] font-bold tracking-[0.13em] uppercase">Project message <span aria-hidden="true">*</span></span><textarea name="message" className="field" required minLength={20} maxLength={4000} aria-invalid={Boolean(errorFor("message"))} aria-describedby={errorFor("message") ? "message-error" : "message-help"} placeholder="Tell us about the building, location, project stage, key requirements, and timeline." /><span id="message-help" className="mt-2 block text-xs text-[#85827a]">Please do not include passwords, payment details, or sensitive personal information.</span>{errorFor("message") ? <FieldError id="message-error">{errorFor("message")}</FieldError> : null}</label>
      <label className="mt-7 flex items-start gap-3 text-sm leading-6"><input type="checkbox" name="privacyConsent" className="mt-1 h-4 w-4 accent-[#11110f]" aria-invalid={Boolean(errorFor("privacyConsent"))} aria-describedby={errorFor("privacyConsent") ? "privacy-error" : undefined} /><span>I agree that NS Elevator may use the information I submit to respond to this inquiry. Read the <a className="underline underline-offset-4" href="/privacy">Privacy Policy</a>. <span aria-hidden="true">*</span></span></label>{errorFor("privacyConsent") ? <FieldError id="privacy-error">{errorFor("privacyConsent")}</FieldError> : null}
      <div className="mt-8 min-h-[74px]" aria-label="Security verification">{siteKey ? <div ref={widgetTarget} /> : <div className="border border-[#b26a42] bg-[#eadcd0] p-4 text-sm leading-6"><strong>Preview configuration:</strong> inquiry submission is disabled until a Turnstile site key and the server-side provider credentials are configured.</div>}{errorFor("turnstileToken") ? <FieldError id="turnstile-error">{errorFor("turnstileToken")}</FieldError> : null}</div>
      {message ? <div role="alert" aria-live="assertive" className="mt-6 border-l-2 border-[#a63c2f] bg-[#eee5df] p-4 text-sm">{message}</div> : null}
      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><button type="submit" disabled={state === "submitting" || !siteKey} className="button-dark min-w-52 disabled:cursor-not-allowed disabled:opacity-45">{state === "submitting" ? "Sending…" : "Send inquiry"} <span aria-hidden="true">↗</span></button><p className="text-xs text-[#7d7a73]">Fields marked * are required. Valid inquiries are stored before email notification.</p></div>
    </form>
  );
}

function Field({ label, name, type = "text", required = false, error, ...props }: { label: string; name: string; type?: string; required?: boolean; error?: string; [key: string]: unknown }) {
  const errorId = `${name}-error`;
  return <label className="block"><span className="text-[0.65rem] font-bold tracking-[0.13em] uppercase">{label} {required ? <span aria-hidden="true">*</span> : null}</span><input className="field" name={name} type={type} required={required} aria-invalid={Boolean(error)} aria-describedby={error ? errorId : undefined} {...props} />{error ? <FieldError id={errorId}>{error}</FieldError> : null}</label>;
}

function FieldError({ id, children }: { id: string; children: string | undefined }) { return <span id={id} className="mt-2 block text-xs font-medium text-[#96382d]">{children}</span>; }
