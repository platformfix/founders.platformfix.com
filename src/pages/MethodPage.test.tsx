import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { MethodPage } from "./MethodPage";

describe("MethodPage", () => {
  it("lists all seven days in order", () => {
    render(<MethodPage />, { wrapper: BrowserRouter });
    const headings = screen.getAllByRole("heading", { level: 2 }).map((h) => h.textContent ?? "");
    const days = headings.filter((h) => /^Day \d\./.test(h));
    expect(days).toHaveLength(7);
    days.forEach((d, i) => expect(d.startsWith(`Day ${i + 1}.`)).toBe(true));
  });

  it("frames the week as a plan and says the platform is still being built", () => {
    render(<MethodPage />, { wrapper: BrowserRouter });
    expect(screen.getByText(/this is the plan for the week/i)).toBeInTheDocument();
    expect(screen.getByText(/the platform is still being built/i)).toBeInTheDocument();
  });

  it("describes the retainer without a price", () => {
    render(<MethodPage />, { wrapper: BrowserRouter });
    expect(screen.getByText(/a monthly retainer keeps the platform healthy/i)).toBeInTheDocument();
  });

  it("carries the honest 'cannot tell you yet' block and who it says no to", () => {
    render(<MethodPage />, { wrapper: BrowserRouter });
    expect(screen.getByRole("heading", { name: /what i cannot tell you yet/i })).toBeInTheDocument();
    expect(screen.getByText(/you would be one of the first three/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /who i say no to/i })).toBeInTheDocument();
  });

  it("renders the FAQ with a matching FAQPage JSON-LD schema", () => {
    const { container } = render(<MethodPage />, { wrapper: BrowserRouter });
    expect(screen.getByRole("heading", { name: /^questions$/i })).toBeInTheDocument();
    const schemaScript = container.querySelector('script[type="application/ld+json"]');
    expect(schemaScript).not.toBeNull();
    const schema = JSON.parse(schemaScript!.innerHTML);
    expect(schema["@type"]).toBe("FAQPage");
    expect(schema.mainEntity.length).toBeGreaterThanOrEqual(3);
  });

  it("FAQ answers are collapsed by default and expand on click", () => {
    render(<MethodPage />, { wrapper: BrowserRouter });
    const question = screen.getByRole("button", { name: /what does it cost/i });
    expect(question).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByText(/i do not publish prices/i)).not.toBeInTheDocument();
    fireEvent.click(question);
    expect(question).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText(/i do not publish prices/i)).toBeInTheDocument();
  });
});
