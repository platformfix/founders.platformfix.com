import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { HomePage } from "./HomePage";

describe("HomePage", () => {
  it("renders the map CTA in the hero and the closing section, both linking to work-with-us", () => {
    render(<HomePage />, { wrapper: BrowserRouter });
    // Two identical CTAs by design (hero + closing). Use getAllByRole, not
    // getByRole, or this throws on the duplicate match.
    const ctas = screen.getAllByRole("link", { name: /free map of where your leads and promises live/i });
    expect(ctas).toHaveLength(2);
    for (const cta of ctas) {
      expect(cta).toHaveAttribute("href", "/work-with-us");
    }
  });

  it("renders the three steps", () => {
    render(<HomePage />, { wrapper: BrowserRouter });
    expect(screen.getByText("Map")).toBeInTheDocument();
    expect(screen.getByText("Diagnose")).toBeInTheDocument();
    expect(screen.getByText("Install")).toBeInTheDocument();
  });

  it("renders the Why me proof and the honest 'cannot tell you yet' block", () => {
    render(<HomePage />, { wrapper: BrowserRouter });
    expect(screen.getByRole("heading", { name: /why me/i })).toBeInTheDocument();
    expect(screen.getByText(/average audit recovers about £276,000 a year/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /what i cannot tell you yet/i })).toBeInTheDocument();
    expect(screen.getByText(/i have no founder case studies/i)).toBeInTheDocument();
  });

  it("states no price, no date and no founder result", () => {
    // The business plan says no price on any page and no claim the platform
    // cannot yet back. The 276,000 audit figure is the one allowed number.
    const { container } = render(<HomePage />, { wrapper: BrowserRouter });
    const text = container.textContent ?? "";
    expect(text).not.toMatch(/£\s?(300|500|1,?500|1,?800|7,?800|19,?500)\b/);
    expect(text).not.toMatch(/\b202[6-9]\b/);
  });

  it("renders the FAQ section with a matching FAQPage JSON-LD schema", () => {
    const { container } = render(<HomePage />, { wrapper: BrowserRouter });
    expect(screen.getByRole("heading", { name: /^questions$/i })).toBeInTheDocument();
    expect(screen.getByText("What exactly do you build?")).toBeInTheDocument();

    const schemaScript = container.querySelector('script[type="application/ld+json"]');
    expect(schemaScript).not.toBeNull();
    const schema = JSON.parse(schemaScript!.innerHTML);
    expect(schema["@type"]).toBe("FAQPage");
    expect(schema.mainEntity.length).toBeGreaterThanOrEqual(3);
    expect(schema.mainEntity[0]).toHaveProperty("@type", "Question");
    expect(schema.mainEntity[0].acceptedAnswer).toHaveProperty("@type", "Answer");
  });

  it("FAQ answers are collapsed by default and expand on click", () => {
    render(<HomePage />, { wrapper: BrowserRouter });
    const question = screen.getByRole("button", { name: /what exactly do you build/i });
    expect(question).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByText(/the first job is lead reactivation/i)).not.toBeInTheDocument();

    fireEvent.click(question);

    expect(question).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText(/the first job is lead reactivation/i)).toBeInTheDocument();
  });
});
