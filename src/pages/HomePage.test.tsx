import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { HomePage } from "./HomePage";

describe("HomePage", () => {
  it("renders CTAs linking to work-with-us", () => {
    render(<HomePage />, { wrapper: BrowserRouter });
    // The page has two "Get in touch" CTAs (hero + closing section) by design —
    // use getAllByRole, not getByRole, or this throws on the duplicate match.
    const ctas = screen.getAllByRole("link", { name: /get in touch/i });
    expect(ctas.length).toBeGreaterThanOrEqual(1);
    for (const cta of ctas) {
      expect(cta).toHaveAttribute("href", "/work-with-us");
    }
  });

  it("renders all three phase names", () => {
    render(<HomePage />, { wrapper: BrowserRouter });
    expect(screen.getByText("Identify")).toBeInTheDocument();
    expect(screen.getByText("Develop")).toBeInTheDocument();
    expect(screen.getByText("Adopt")).toBeInTheDocument();
  });
});
