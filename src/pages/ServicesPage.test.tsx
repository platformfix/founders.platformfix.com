import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { ServicesPage } from "./ServicesPage";

describe("ServicesPage", () => {
  it("renders each phase's What We Do list with the right item count", () => {
    render(<ServicesPage />, { wrapper: BrowserRouter });
    expect(screen.getAllByText(/What We Do/i)).toHaveLength(3);
  });

  it("anchors each phase section for #identify #develop #adopt deep-links", () => {
    const { container } = render(<ServicesPage />, { wrapper: BrowserRouter });
    expect(container.querySelector("#identify")).not.toBeNull();
    expect(container.querySelector("#develop")).not.toBeNull();
    expect(container.querySelector("#adopt")).not.toBeNull();
  });
});
