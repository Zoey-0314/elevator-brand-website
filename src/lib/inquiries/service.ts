import { inquirySchema, normalizeInquiry, type InquiryInput } from "@/validation/inquiry";

export type StoredInquiry = ReturnType<typeof normalizeInquiry> & { id: string; created_at: string };
export type InquiryDependencies = {
  verifyTurnstile: (token: string) => Promise<boolean>;
  now?: () => number;
  allowRequest?: () => { allowed: boolean; retryAfter: number };
  insertInquiry: (input: ReturnType<typeof normalizeInquiry>) => Promise<{ id: string; created_at: string }>;
  sendBusinessNotification: (inquiry: StoredInquiry) => Promise<void>;
  sendCustomerConfirmation?: (inquiry: StoredInquiry) => Promise<void>;
  updateNotificationStatus: (id: string, status: "sent" | "failed", error?: string) => Promise<void>;
  log?: (event: string, context: Record<string, unknown>) => void;
};

export type InquiryResult =
  | { accepted: true; code: "INQUIRY_STORED"; inquiryId: string }
  | { accepted: false; code: "VALIDATION_FAILED"; status: 422; fieldErrors: Record<string, string[]> }
  | { accepted: false; code: "TURNSTILE_FAILED"; status: 400 }
  | { accepted: false; code: "BOT_CHECK_FAILED"; status: 400 }
  | { accepted: false; code: "RATE_LIMITED"; status: 429; retryAfter: number }
  | { accepted: false; code: "DATABASE_UNAVAILABLE"; status: 503 };

export async function processInquiry(payload: unknown, deps: InquiryDependencies): Promise<InquiryResult> {
  const parsed = inquirySchema.safeParse(payload);
  if (!parsed.success) return { accepted: false, code: "VALIDATION_FAILED", status: 422, fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]> };

  const limit = deps.allowRequest?.();
  if (limit && !limit.allowed) return { accepted: false, code: "RATE_LIMITED", status: 429, retryAfter: limit.retryAfter };

  const token = parsed.data.turnstileToken?.trim();
  if (token) {
    let verified = false;
    try { verified = await deps.verifyTurnstile(token); } catch (error) { deps.log?.("turnstile_error", { error: error instanceof Error ? error.message : "unknown" }); }
    if (!verified) return { accepted: false, code: "TURNSTILE_FAILED", status: 400 };
  } else {
    const elapsed = (deps.now?.() ?? Date.now()) - parsed.data.formStartedAt;
    if (parsed.data.website || elapsed < 3_000 || elapsed > 7_200_000) {
      deps.log?.("inquiry_fallback_bot_check_failed", { honeypot: Boolean(parsed.data.website), elapsed });
      return { accepted: false, code: "BOT_CHECK_FAILED", status: 400 };
    }
    deps.log?.("inquiry_turnstile_unavailable_fallback", {});
  }

  const normalized = normalizeInquiry(parsed.data as InquiryInput);
  let receipt: { id: string; created_at: string };
  try { receipt = await deps.insertInquiry(normalized); } catch (error) { deps.log?.("inquiry_insert_failed", { error: error instanceof Error ? error.message : "unknown" }); return { accepted: false, code: "DATABASE_UNAVAILABLE", status: 503 }; }
  const stored: StoredInquiry = { ...normalized, ...receipt };

  let notificationError: string | undefined;
  try { await deps.sendBusinessNotification(stored); } catch (error) { notificationError = error instanceof Error ? error.message : "Notification provider error"; }
  try { await deps.updateNotificationStatus(stored.id, notificationError ? "failed" : "sent", notificationError); } catch (error) { deps.log?.("notification_status_update_failed", { inquiryId: stored.id, error: error instanceof Error ? error.message : "unknown" }); }
  if (notificationError) deps.log?.("business_notification_failed", { inquiryId: stored.id, error: notificationError });

  if (deps.sendCustomerConfirmation) {
    try { await deps.sendCustomerConfirmation(stored); } catch (error) { deps.log?.("customer_confirmation_failed", { inquiryId: stored.id, error: error instanceof Error ? error.message : "unknown" }); }
  }
  return { accepted: true, code: "INQUIRY_STORED", inquiryId: stored.id };
}
