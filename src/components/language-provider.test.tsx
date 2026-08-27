// @vitest-environment jsdom
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { LanguageProvider, LanguageSwitcher, T } from "./language-provider";

describe("LanguageProvider", () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.lang = "en";
  });

  it("switches to Simplified Chinese and persists the selection", async () => {
    const user = userEvent.setup();
    render(<LanguageProvider><LanguageSwitcher /><p><T en="Contact" zh="联系我们" /></p></LanguageProvider>);

    await user.click(screen.getByRole("button", { name: "简中" }));

    expect(screen.getByText("联系我们")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "简中" })).toHaveAttribute("aria-pressed", "true");
    await waitFor(() => expect(document.documentElement.lang).toBe("zh-CN"));
    expect(window.localStorage.getItem("ns-elevator.locale.v1")).toBe("zh-CN");
  });
});
