import { describe, expect, it } from "vitest";
import { buildQuoteHref } from "./site";

describe("buildQuoteHref", () => {
  it("preserves product and source context", () => {
    expect(buildQuoteHref("Passenger Elevator", "/products/passenger-elevator")).toBe("/contact?product=Passenger+Elevator&source=%2Fproducts%2Fpassenger-elevator#inquiry");
  });
});
