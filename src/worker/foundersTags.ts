/**
 * The founders.platformfix.com tag vocabulary. Fixed and closed, unlike
 * newsletter.platformfix.com's open UTM-derived tags: every value here comes
 * from a dropdown or button, not free text, so there is no "new value we've
 * never seen" case to handle. Confirmed with Steve before Task 7 mints these
 * against the live Kit account — do not add or rename without re-confirming,
 * since Kit tag deletes do not work (see kit-reference skill).
 *
 * Tag IDs are filled in by Task 7 once minted, mirroring how
 * newsletter.platformfix.com's tags.ts records "Tag IDs minted in Kit on
 * <date>. Verified present via GET /v4/tags."
 */
export const ROLE_TAGS: Record<string, string> = {
  "ceo-founder": "founders-role-ceo-founder",
  "coo-ops": "founders-role-coo-ops",
  "cfo-finance": "founders-role-cfo-finance",
  "cto-data": "founders-role-cto-data",
  "vp-director": "founders-role-vp-director",
  other: "founders-role-other",
};

export const SIZE_TAGS: Record<string, string> = {
  "1-50": "founders-size-1-50",
  "50-100": "founders-size-50-100",
  "100-500": "founders-size-100-500",
  "500-plus": "founders-size-500-plus",
};

export const BUDGET_TAGS: Record<string, string> = {
  "15k-50k": "founders-budget-15k-50k",
  "50k-150k": "founders-budget-50k-150k",
  "150k-500k": "founders-budget-150k-500k",
  "not-sure": "founders-budget-not-sure",
};

export const DEST_TAG = "dest-founders";

/** Resolves the three dropdown/button values to tag names, dropping any value not in the fixed vocabulary rather than minting an unexpected tag. */
export function tagsForInquiry(role: string, companySize: string, budgetRange: string): string[] {
  const names = [ROLE_TAGS[role], SIZE_TAGS[companySize], BUDGET_TAGS[budgetRange], DEST_TAG];
  return names.filter((n): n is string => Boolean(n));
}
