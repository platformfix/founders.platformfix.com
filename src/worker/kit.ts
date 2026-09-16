/**
 * Kit v4 API calls specific to this Worker: subscriber upsert with custom
 * fields, and the same idempotent tag mint-or-get pattern
 * newsletter.platformfix.com's src/worker/index.ts uses.
 *
 * CUSTOM FIELD KEYS BELOW ARE PLACEHOLDERS UNTIL TASK 7 RUNS THE CREATE
 * SCRIPT AND CONFIRMS THE REAL KEYS KIT ASSIGNS (Kit derives a field's `key`
 * from its label; do not assume the derivation before verifying it with a
 * GET). Task 7 updates this file's FIELD_KEYS constant with the confirmed
 * values before this code is ever run against the live account.
 */
const KIT_BASE = "https://api.kit.com/v4";

export const FIELD_KEYS = {
  company: "company",
  companyWebsite: "company_website",
  projectDescription: "project_description",
} as const;

export interface KitEnv {
  apiKey: string;
}

export async function upsertSubscriber(
  email: string,
  firstName: string,
  fields: Record<string, string>,
  env: KitEnv,
): Promise<number | null> {
  const res = await fetch(`${KIT_BASE}/subscribers`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Kit-Api-Key": env.apiKey },
    body: JSON.stringify({ email_address: email, first_name: firstName, fields }),
  });
  if (!res.ok) {
    console.error("Kit upsert subscriber failed", await safeErrorPayload(res));
    return null;
  }
  const data = (await res.json()) as { subscriber?: { id?: number } };
  return data.subscriber?.id ?? null;
}

/** Idempotent mint-or-get by name — identical contract to newsletter.platformfix.com's upsertTag. */
export async function upsertTag(name: string, apiKey: string): Promise<number | null> {
  const res = await fetch(`${KIT_BASE}/tags`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Kit-Api-Key": apiKey },
    body: JSON.stringify({ name }),
  });
  if (!res.ok) {
    console.error(`Kit tag upsert failed for ${name}`, await safeErrorPayload(res));
    return null;
  }
  const data = (await res.json()) as { tag?: { id?: number } };
  return data.tag?.id ?? null;
}

export async function applyTag(tagId: number, subscriberId: number, apiKey: string): Promise<boolean> {
  const res = await fetch(`${KIT_BASE}/tags/${tagId}/subscribers/${subscriberId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Kit-Api-Key": apiKey },
  });
  if (!res.ok) {
    console.error(`Kit tag ${tagId} apply failed for subscriber ${subscriberId}`, await safeErrorPayload(res));
  }
  return res.ok;
}

/** Strips email addresses out of a string before it reaches the log, matching newsletter.platformfix.com's redactEmails discipline. */
function redactEmails(s: string): string {
  return s.replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g, "[email]");
}

/** Reads a failed Kit response's error payload for logging, redacting any email it echoes back. Never throws on a non-JSON body. */
async function safeErrorPayload(response: Response): Promise<{ status: number; errors?: string[] }> {
  try {
    const data = (await response.json()) as { errors?: unknown };
    if (Array.isArray(data.errors)) {
      const errors = data.errors.filter((e): e is string => typeof e === "string").map(redactEmails);
      return { status: response.status, errors };
    }
  } catch {
    // body wasn't JSON; status code alone
  }
  return { status: response.status };
}
