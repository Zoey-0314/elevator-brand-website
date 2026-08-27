import { NextResponse, type NextRequest } from "next/server";
import { Resend } from "resend";
import { inquiryEmail } from "@/emails/inquiry";
import { processInquiry } from "@/lib/inquiries/service";
import { checkRateLimit } from "@/lib/rate-limit";
import { createServiceClient } from "@/lib/supabase/service";
import { verifyTurnstileToken } from "@/lib/turnstile";

export const runtime = "nodejs";
const MAX_BODY_BYTES = 16_384;

export async function POST(request: NextRequest) {
  const length = Number(request.headers.get("content-length") ?? "0");
  if (length > MAX_BODY_BYTES) return NextResponse.json({ accepted: false, code: "PAYLOAD_TOO_LARGE", message: "The inquiry is too large." }, { status: 413 });

  let payload: unknown;
  try { payload = await request.json(); } catch { return NextResponse.json({ accepted: false, code: "INVALID_JSON", message: "The request could not be read." }, { status: 400 }); }

  const required = ["NEXT_PUBLIC_SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY", "RESEND_API_KEY", "RESEND_FROM_EMAIL", "INQUIRY_NOTIFICATION_EMAIL", "TURNSTILE_SECRET_KEY"] as const;
  if (required.some((name) => !process.env[name])) return NextResponse.json({ accepted: false, code: "SERVICE_NOT_CONFIGURED", message: "Inquiry service is not configured yet. Please use the published business contact details." }, { status: 503 });

  const ipKey = request.headers.get("cf-connecting-ip") ?? request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anonymous";
  const supabase = createServiceClient();
  const resend = new Resend(process.env.RESEND_API_KEY);
  const result = await processInquiry(payload, {
    verifyTurnstile: (token) => verifyTurnstileToken({ token, secret: process.env.TURNSTILE_SECRET_KEY!, expectedHostname: process.env.TURNSTILE_EXPECTED_HOSTNAME }),
    allowRequest: () => checkRateLimit(ipKey),
    insertInquiry: async (input) => { const { data, error } = await supabase.from("inquiries").insert(input).select("id, created_at").single(); if (error || !data) throw new Error(error?.message ?? "No insert receipt"); return data; },
    sendBusinessNotification: async (inquiry) => { const email = inquiryEmail(inquiry); const { error } = await resend.emails.send({ from: process.env.RESEND_FROM_EMAIL!, to: process.env.INQUIRY_NOTIFICATION_EMAIL!, subject: email.subject, html: email.html, text: email.text }); if (error) throw new Error(error.message); },
    sendCustomerConfirmation: process.env.SEND_CUSTOMER_CONFIRMATION_EMAIL === "true" ? async (inquiry) => { const { error } = await resend.emails.send({ from: process.env.RESEND_FROM_EMAIL!, to: inquiry.email, subject: "We received your NS Elevator inquiry", text: `Thank you, ${inquiry.name}. Your inquiry ${inquiry.id} has been received. Our team will review the project information and follow up through the contact details you provided.` }); if (error) throw new Error(error.message); } : undefined,
    updateNotificationStatus: async (id, status, errorMessage) => { const { error } = await supabase.from("inquiries").update({ email_notification_status: status, email_notification_error: errorMessage?.slice(0, 1000) ?? null }).eq("id", id); if (error) throw new Error(error.message); },
    log: (event, context) => console.error(JSON.stringify({ event, ...context })),
  });

  if (result.accepted) return NextResponse.json({ ...result, message: "Your inquiry has been received." }, { status: 201 });
  const messages = { VALIDATION_FAILED: "Review the highlighted fields.", TURNSTILE_FAILED: "The security check could not be verified.", RATE_LIMITED: "Please wait before sending another inquiry.", DATABASE_UNAVAILABLE: "We could not save the inquiry. Please try again later." } as const;
  return NextResponse.json({ ...result, message: messages[result.code] }, { status: result.status, headers: result.code === "RATE_LIMITED" ? { "Retry-After": String(result.retryAfter) } : undefined });
}
