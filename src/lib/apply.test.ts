import { describe, expect, it } from "vitest";
import { APPLY_FORM_URL } from "./apply";

describe("apply form link", () => {
  it("is a real Google Form URL, not the placeholder", () => {
    // Fails on purpose until Steve creates the form and pastes its public link.
    // A merge to main deploys to production, so a placeholder must never ship.
    expect(APPLY_FORM_URL).toMatch(/^https:\/\/(docs\.google\.com\/forms\/|forms\.gle\/)/);
    expect(APPLY_FORM_URL).not.toMatch(/REPLACE/);
  });
});
