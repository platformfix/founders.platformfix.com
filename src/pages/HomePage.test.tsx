import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { HomePage } from "./HomePage";
import { APPLY_FORM_URL } from "../lib/apply";

describe("HomePage", () => {
  it("renders the apply CTA twice (hero and close), opening the form in a new tab", () => {
    render(<HomePage />, { wrapper: BrowserRouter });
    // Two identical CTAs by design. Use getAllByRole, not getByRole, or this
    // throws on the duplicate match.
    const ctas = screen.getAllByRole("link", { name: /apply for a makeover/i });
    expect(ctas).toHaveLength(2);
    for (const cta of ctas) {
      expect(cta).toHaveAttribute("href", APPLY_FORM_URL);
      expect(cta).toHaveAttribute("target", "_blank");
      expect(cta).toHaveAttribute("rel", expect.stringContaining("noopener"));
    }
  });

  it("leads with the question and the seven-day offer", () => {
    render(<HomePage />, { wrapper: BrowserRouter });
    expect(
      screen.getByRole("heading", { level: 1, name: /who have you gone quiet on, and what is it worth/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/i spend seven days in your business/i)).toBeInTheDocument();
    expect(screen.getByText(/applying costs nothing and commits you to nothing/i)).toBeInTheDocument();
  });

  it("links to the day-by-day on the method page", () => {
    render(<HomePage />, { wrapper: BrowserRouter });
    expect(screen.getByRole("link", { name: /see the day-by-day/i })).toHaveAttribute("href", "/method");
  });

  it("renders the honest 'cannot tell you yet' block", () => {
    render(<HomePage />, { wrapper: BrowserRouter });
    expect(screen.getByRole("heading", { name: /what i cannot tell you yet/i })).toBeInTheDocument();
    expect(screen.getByText(/i have no founder case studies/i)).toBeInTheDocument();
    expect(screen.getByText(/the platform is still being built/i)).toBeInTheDocument();
  });

  it("renders the FAQ section with a matching FAQPage JSON-LD schema", () => {
    const { container } = render(<HomePage />, { wrapper: BrowserRouter });
    expect(screen.getByRole("heading", { name: /^questions$/i })).toBeInTheDocument();
    expect(screen.getByText("What does it cost?")).toBeInTheDocument();

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
    const question = screen.getByRole("button", { name: /what does it cost/i });
    expect(question).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByText(/i do not publish prices/i)).not.toBeInTheDocument();

    fireEvent.click(question);

    expect(question).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText(/i do not publish prices/i)).toBeInTheDocument();
  });
});
