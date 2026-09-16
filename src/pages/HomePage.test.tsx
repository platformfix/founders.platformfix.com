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

  it("renders the Why Platform Fix authority section", () => {
    render(<HomePage />, { wrapper: BrowserRouter });
    expect(screen.getByRole("heading", { name: /why platform fix/i })).toBeInTheDocument();
    expect(screen.getByText(/fifty-plus platform transformations/i)).toBeInTheDocument();
  });

  it("renders the FAQ section with a matching FAQPage JSON-LD schema", () => {
    const { container } = render(<HomePage />, { wrapper: BrowserRouter });
    expect(screen.getByRole("heading", { name: /frequently asked questions/i })).toBeInTheDocument();
    expect(screen.getByText("What exactly do you build?")).toBeInTheDocument();

    const schemaScript = container.querySelector('script[type="application/ld+json"]');
    expect(schemaScript).not.toBeNull();
    const schema = JSON.parse(schemaScript!.innerHTML);
    expect(schema["@type"]).toBe("FAQPage");
    expect(schema.mainEntity.length).toBeGreaterThanOrEqual(5);
    expect(schema.mainEntity[0]).toHaveProperty("@type", "Question");
    expect(schema.mainEntity[0].acceptedAnswer).toHaveProperty("@type", "Answer");
  });
});
