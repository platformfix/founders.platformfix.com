import { describe, expect, it } from "vitest";
import { tagsForInquiry } from "./foundersTags";

describe("tagsForInquiry", () => {
  it("resolves all three fields plus the dest marker", () => {
    expect(tagsForInquiry("ceo-founder", "1-50", "15k-50k")).toEqual([
      "founders-role-ceo-founder",
      "founders-size-1-50",
      "founders-budget-15k-50k",
      "dest-founders",
    ]);
  });

  it("drops an unrecognised value instead of minting it", () => {
    expect(tagsForInquiry("unknown-role", "1-50", "15k-50k")).toEqual([
      "founders-size-1-50",
      "founders-budget-15k-50k",
      "dest-founders",
    ]);
  });
});
