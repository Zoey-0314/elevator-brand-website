import { describe, expect, it } from "vitest";
import { inquirySchema, inquiryStatusSchema, normalizeInquiry } from "./inquiry";

export const validInquiry = {
  name: "Ada Builder",
  company: "Northline Developments",
  email: "ADA@EXAMPLE.COM",
  phone: "+1 555 0100",
  country: "Canada",
  product: "Passenger Elevator",
  projectType: "Residential",
  quantity: "4",
  message: "We are planning a residential tower and need early-stage product guidance.",
  privacyConsent: true,
  turnstileToken: "verified-token",
  sourcePage: "/products/passenger-elevator",
};

describe("inquirySchema", () => {
  it("accepts and normalizes a complete inquiry", () => {
    const parsed = inquirySchema.parse(validInquiry);
    expect(normalizeInquiry(parsed)).toMatchObject({ email: "ada@example.com", company: "Northline Developments", source_page: "/products/passenger-elevator" });
  });

  it("rejects missing consent, short messages, and oversized input", () => {
    const result = inquirySchema.safeParse({ ...validInquiry, privacyConsent: false, message: "too short", name: "x".repeat(121) });
    expect(result.success).toBe(false);
    if (!result.success) expect(Object.keys(result.error.flatten().fieldErrors)).toEqual(expect.arrayContaining(["privacyConsent", "message", "name"]));
  });

  it("allows exactly the five approved statuses", () => {
    for (const status of ["new", "contacted", "quoted", "won", "closed"]) expect(inquiryStatusSchema.safeParse(status).success).toBe(true);
    expect(inquiryStatusSchema.safeParse("deleted").success).toBe(false);
  });
});
