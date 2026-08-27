import { describe, expect, it } from "vitest";
import { isAdminEmail } from "./admin-authorization";

describe("isAdminEmail", () => {
  it("requires an explicitly allowlisted email", () => {
    const allowlist = "owner@example.com, ops@example.com";
    expect(isAdminEmail("OWNER@example.com", allowlist)).toBe(true);
    expect(isAdminEmail("visitor@example.com", allowlist)).toBe(false);
    expect(isAdminEmail(null, allowlist)).toBe(false);
  });
});
