import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { WorkWithUsPage } from "./WorkWithUsPage";
import * as inquiry from "../lib/inquiry";

describe("WorkWithUsPage", () => {
  beforeEach(() => {
    vi.spyOn(inquiry, "submitInquiry").mockResolvedValue({ ok: true });
  });

  it("requires the project description before submit", () => {
    render(<WorkWithUsPage />, { wrapper: BrowserRouter });
    const textarea = screen.getByLabelText(/tell us about your project/i);
    expect(textarea).toBeRequired();
  });

  it("submits all fields including the selected budget range", async () => {
    render(<WorkWithUsPage />, { wrapper: BrowserRouter });
    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: "Ada" } });
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: "Lovelace" } });
    fireEvent.change(screen.getByLabelText(/work email/i), { target: { value: "ada@example.com" } });
    fireEvent.change(screen.getByLabelText(/^company$/i), { target: { value: "Analytical Engines Ltd" } });
    fireEvent.change(screen.getByLabelText(/company website/i), { target: { value: "https://example.com" } });
    fireEvent.change(screen.getByLabelText(/your role/i), { target: { value: "ceo-founder" } });
    fireEvent.change(screen.getByLabelText(/company size/i), { target: { value: "1-50" } });
    fireEvent.click(screen.getByRole("button", { name: "$15K - $50K" }));
    fireEvent.change(screen.getByLabelText(/tell us about your project/i), {
      target: { value: "We need help." },
    });
    fireEvent.click(screen.getByRole("button", { name: /submit inquiry/i }));

    await waitFor(() =>
      expect(inquiry.submitInquiry).toHaveBeenCalledWith({
        first_name: "Ada",
        last_name: "Lovelace",
        email: "ada@example.com",
        company: "Analytical Engines Ltd",
        company_website: "https://example.com",
        role: "ceo-founder",
        company_size: "1-50",
        budget_range: "15k-50k",
        project_description: "We need help.",
      }),
    );
  });
});
