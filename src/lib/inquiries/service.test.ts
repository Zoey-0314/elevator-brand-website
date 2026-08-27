import { describe, expect, it, vi } from "vitest";
import { validInquiry } from "@/validation/inquiry.test";
import { processInquiry, type InquiryDependencies } from "./service";

function dependencies(overrides: Partial<InquiryDependencies> = {}): InquiryDependencies {
  return {
    verifyTurnstile: vi.fn().mockResolvedValue(true),
    allowRequest: vi.fn().mockReturnValue({ allowed: true, retryAfter: 0 }),
    insertInquiry: vi.fn().mockResolvedValue({ id: "fcd7ec3f-930a-4d06-8744-41c393d1a6b8", created_at: "2026-08-27T10:00:00Z" }),
    sendBusinessNotification: vi.fn().mockResolvedValue(undefined),
    updateNotificationStatus: vi.fn().mockResolvedValue(undefined),
    ...overrides,
  };
}

describe("processInquiry", () => {
  it("validates before calling providers", async () => {
    const deps = dependencies();
    const result = await processInquiry({ name: "" }, deps);
    expect(result).toMatchObject({ accepted: false, code: "VALIDATION_FAILED" });
    expect(deps.verifyTurnstile).not.toHaveBeenCalled();
    expect(deps.insertInquiry).not.toHaveBeenCalled();
  });

  it("rejects a failed Turnstile check before insertion", async () => {
    const deps = dependencies({ verifyTurnstile: vi.fn().mockResolvedValue(false) });
    expect(await processInquiry(validInquiry, deps)).toMatchObject({ accepted: false, code: "TURNSTILE_FAILED" });
    expect(deps.insertInquiry).not.toHaveBeenCalled();
  });

  it("returns a database failure without sending email", async () => {
    const deps = dependencies({ insertInquiry: vi.fn().mockRejectedValue(new Error("database offline")) });
    expect(await processInquiry(validInquiry, deps)).toMatchObject({ accepted: false, code: "DATABASE_UNAVAILABLE" });
    expect(deps.sendBusinessNotification).not.toHaveBeenCalled();
  });

  it("retains the stored record and marks notification failure when Resend fails", async () => {
    const status = vi.fn().mockResolvedValue(undefined);
    const deps = dependencies({ sendBusinessNotification: vi.fn().mockRejectedValue(new Error("Resend unavailable")), updateNotificationStatus: status });
    const result = await processInquiry(validInquiry, deps);
    expect(result).toMatchObject({ accepted: true, code: "INQUIRY_STORED" });
    expect(deps.insertInquiry).toHaveBeenCalledTimes(1);
    expect(status).toHaveBeenCalledWith("fcd7ec3f-930a-4d06-8744-41c393d1a6b8", "failed", "Resend unavailable");
  });
});
