import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { AboutPage } from "./AboutPage";

describe("AboutPage", () => {
  it("tells Steve's own story and states the figure he gave", () => {
    render(<AboutPage />, { wrapper: BrowserRouter });
    expect(screen.getByRole("heading", { name: /how i got here/i })).toBeInTheDocument();
    expect(screen.getByText(/about 60 to 70 percent of my business now runs on ai/i)).toBeInTheDocument();
    expect(screen.getByText(/i have always been fascinated by systems/i)).toBeInTheDocument();
  });

  it("states the certified credentials and who the audit figure applies to", () => {
    render(<AboutPage />, { wrapper: BrowserRouter });
    expect(screen.getByRole("heading", { name: /the record/i })).toBeInTheDocument();
    expect(screen.getByText(/fifteen years in production infrastructure/i)).toBeInTheDocument();
    expect(screen.getByText(/fifty-plus platform audits/i)).toBeInTheDocument();
    expect(screen.getByText(/about £276,000 a year for an engineering team/i)).toBeInTheDocument();
  });
});
