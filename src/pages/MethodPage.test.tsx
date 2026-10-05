import { render, screen } from "@testing-library/react";
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
});
