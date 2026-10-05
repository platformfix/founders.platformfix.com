import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { HomePage } from "./HomePage";
import { MethodPage } from "./MethodPage";
import { AboutPage } from "./AboutPage";

// The business plan says: no price on any page, no founder results, no dates the
// platform cannot back. The offer is not filmed and has no sponsors. The wording
// must not borrow from the AI Makeover site (Liam Ottley's company).
const PAGES = [
  ["home", HomePage],
  ["method", MethodPage],
  ["about", AboutPage],
] as const;

describe.each(PAGES)("%s page copy guards", (_name, Page) => {
  const text = () => render(<Page />, { wrapper: BrowserRouter }).container.textContent ?? "";

  it("shows no plan price and no 2026 to 2029 date", () => {
    // The 276,000 audit figure is the one allowed number.
    expect(text()).not.toMatch(/£\s?(300|500|1,?500|1,?800|7,?800|19,?500)\b/);
    expect(text()).not.toMatch(/\b202[6-9]\b/);
  });

  it("does not borrow the AI Makeover site's wording or claim a film or sponsors", () => {
    expect(text()).not.toMatch(/ottley|navy seal|seven months of progress|we film|sponsor/i);
  });
});
