// @vitest-environment jsdom
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next/script", () => ({
  default: function ScriptMock({ onReady }: { onReady?: () => void }) { React.useEffect(() => { onReady?.(); }, [onReady]); return null; },
}));

import { InquiryForm } from "./inquiry-form";

describe("InquiryForm", () => {
  beforeEach(() => {
    vi.stubEnv("NEXT_PUBLIC_TURNSTILE_SITE_KEY", "test-site-key");
    window.turnstile = {
      render: vi.fn((_target: HTMLElement, options: Record<string, unknown>) => { queueMicrotask(() => (options.callback as (token: string) => void)("verified-token")); return "widget-1"; }),
      reset: vi.fn(),
    };
  });

  it("renders an accessible success state after an accepted submission", async () => {
    const user = userEvent.setup();
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify({ accepted: true, message: "Your inquiry has been received.", inquiryId: "fcd7ec3f-930a-4d06-8744-41c393d1a6b8" }), { status: 201 })));
    render(<InquiryForm initialProduct="Passenger Elevator" sourcePage="/products/passenger-elevator" />);
    await user.type(screen.getByLabelText(/Name/), "Ada Builder");
    await user.type(screen.getByLabelText(/Email/), "ada@example.com");
    await user.type(screen.getByLabelText(/Country/), "Canada");
    await user.type(screen.getByLabelText(/Project message/), "A residential tower needs early product guidance.");
    await user.click(screen.getByLabelText(/I agree/));
    await waitFor(() => expect(window.turnstile?.render).toHaveBeenCalled());
    await user.click(screen.getByRole("button", { name: /Send inquiry/ }));
    expect(await screen.findByRole("status")).toHaveTextContent("The project is now on record");
  });

  it("announces a server validation error and keeps the form available", async () => {
    const user = userEvent.setup();
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify({ accepted: false, message: "Review the highlighted fields.", fieldErrors: { message: ["Please include at least 20 characters."] } }), { status: 422 })));
    render(<InquiryForm sourcePage="/contact" />);
    await user.type(screen.getByLabelText(/Name/), "Ada Builder");
    await user.type(screen.getByLabelText(/Email/), "ada@example.com");
    await user.type(screen.getByLabelText(/Country/), "Canada");
    await user.type(screen.getByLabelText(/Project message/), "short but client allows");
    await user.click(screen.getByLabelText(/I agree/));
    await user.click(screen.getByRole("button", { name: /Send inquiry/ }));
    expect(await screen.findByRole("alert")).toHaveTextContent("Review the highlighted fields");
    expect(screen.getByLabelText(/Name/)).toHaveValue("Ada Builder");
  });
});
