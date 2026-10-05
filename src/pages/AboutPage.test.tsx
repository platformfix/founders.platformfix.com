import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { AboutPage } from "./AboutPage";

describe("AboutPage", () => {
  it("states the certified credentials and the transfer from engineering teams to founders", () => {
    render(<AboutPage />, { wrapper: BrowserRouter });
    expect(screen.getByText(/fifteen years in production infrastructure/i)).toBeInTheDocument();
    expect(screen.getByText(/fifty-plus platform audits/i)).toBeInTheDocument();
    expect(screen.getByText(/about £276,000 a year for an engineering team/i)).toBeInTheDocument();
    expect(screen.getByText(/pointed at one founder/i)).toBeInTheDocument();
  });
});
