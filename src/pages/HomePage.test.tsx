import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { HomePage } from "./HomePage";
import { APPLY_FORM_URL } from "../lib/apply";

describe("HomePage (landing page)", () => {
  it("has exactly one apply button, opening the form in a new tab", () => {
    render(<HomePage />, { wrapper: BrowserRouter });
    const ctas = screen.getAllByRole("link", { name: /apply for a makeover/i });
    expect(ctas).toHaveLength(1);
    expect(ctas[0]).toHaveAttribute("href", APPLY_FORM_URL);
    expect(ctas[0]).toHaveAttribute("target", "_blank");
    expect(ctas[0]).toHaveAttribute("rel", expect.stringContaining("noopener"));
  });

  it("offers only two other links, to the method and the about page", () => {
    render(<HomePage />, { wrapper: BrowserRouter });
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(3);
    expect(screen.getByRole("link", { name: "The Method - How We Do It" })).toHaveAttribute("href", "/method");
    expect(screen.getByRole("link", { name: "The Host - About Steve" })).toHaveAttribute("href", "/about");
  });

  it("leads with the question and the seven-day offer", () => {
    render(<HomePage />, { wrapper: BrowserRouter });
    expect(
      screen.getByRole("heading", { level: 1, name: /who have you gone quiet on, and what is it worth/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/i spend seven days in your business/i)).toBeInTheDocument();
    expect(screen.getByText(/applying costs nothing and commits you to nothing/i)).toBeInTheDocument();
  });

  it("says plainly that there are no founder case studies yet", () => {
    render(<HomePage />, { wrapper: BrowserRouter });
    expect(screen.getByText(/i have no founder case studies yet/i)).toBeInTheDocument();
  });
});
