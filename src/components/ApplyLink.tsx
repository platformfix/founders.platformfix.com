import { APPLY_FORM_URL } from "../lib/apply";

const BASE = "inline-flex items-center justify-center gap-2 rounded-md bg-gold font-medium text-navy hover:opacity-90";

/** The one call to action. Opens the Google Form in a new tab. */
export function ApplyLink({ size = "lg" }: { size?: "lg" | "sm" }) {
  const sizing = size === "lg" ? "px-6 py-3" : "px-4 py-2";
  return (
    <a href={APPLY_FORM_URL} target="_blank" rel="noopener noreferrer" className={`${BASE} ${sizing}`}>
      Apply for a makeover
    </a>
  );
}
