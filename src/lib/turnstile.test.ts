import { describe, expect, it, vi } from "vitest";
import { verifyTurnstileToken } from "./turnstile";

describe("verifyTurnstileToken", () => {
  it("accepts a successful inquiry token for the expected hostname", async () => {
    const fetcher = vi.fn().mockResolvedValue(new Response(JSON.stringify({ success: true, hostname: "www.ns-elevator.com", action: "inquiry" }), { status: 200 }));
    await expect(verifyTurnstileToken({ token: "token", secret: "secret", expectedHostname: "www.ns-elevator.com", fetcher })).resolves.toBe(true);
  });

  it("rejects provider failure, wrong hostname, and wrong action", async () => {
    const failed = vi.fn().mockResolvedValue(new Response(JSON.stringify({ success: false }), { status: 200 }));
    const wrongHost = vi.fn().mockResolvedValue(new Response(JSON.stringify({ success: true, hostname: "evil.example", action: "inquiry" }), { status: 200 }));
    const wrongAction = vi.fn().mockResolvedValue(new Response(JSON.stringify({ success: true, hostname: "www.ns-elevator.com", action: "login" }), { status: 200 }));
    await expect(verifyTurnstileToken({ token: "x", secret: "s", fetcher: failed })).resolves.toBe(false);
    await expect(verifyTurnstileToken({ token: "x", secret: "s", expectedHostname: "www.ns-elevator.com", fetcher: wrongHost })).resolves.toBe(false);
    await expect(verifyTurnstileToken({ token: "x", secret: "s", expectedHostname: "www.ns-elevator.com", fetcher: wrongAction })).resolves.toBe(false);
  });
});
