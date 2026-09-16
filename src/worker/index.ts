import { upsertSubscriber, upsertTag, applyTag, FIELD_KEYS } from "./kit";
import { tagsForInquiry } from "./foundersTags";

export interface Env {
  KIT_API_KEY: string;
  ASSETS: Fetcher;
}

interface InquiryBody {
  first_name?: string;
  last_name?: string;
  email?: string;
  company?: string;
  company_website?: string;
  role?: string;
  company_size?: string;
  budget_range?: string;
  project_description?: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === "/api/inquiry") {
      if (request.method !== "POST") return jsonError(405, "Method not allowed");
      return handleInquiry(request, env);
    }
    return env.ASSETS.fetch(request);
  },
};

async function handleInquiry(request: Request, env: Env): Promise<Response> {
  if (!isAllowedOrigin(request)) return jsonError(403, "Forbidden");

  let body: InquiryBody;
  try {
    body = (await request.json()) as InquiryBody;
  } catch {
    return jsonError(400, "Invalid JSON");
  }

  const email = (body.email || "").trim().toLowerCase();
  const firstName = (body.first_name || "").trim();
  const lastName = (body.last_name || "").trim();
  if (!email || !isValidEmail(email) || !firstName || !lastName) {
    return jsonError(400, "Missing required fields");
  }

  if (!env.KIT_API_KEY) return jsonError(500, "Server misconfigured");

  const fields: Record<string, string> = {
    [FIELD_KEYS.company]: (body.company || "").trim(),
    [FIELD_KEYS.companyWebsite]: (body.company_website || "").trim(),
    [FIELD_KEYS.projectDescription]: (body.project_description || "").slice(0, 5000),
  };

  const subscriberId = await upsertSubscriber(email, `${firstName} ${lastName}`.trim(), fields, {
    apiKey: env.KIT_API_KEY,
  });
  if (!subscriberId) return jsonError(502, "Subscription failed");

  const tagNames = tagsForInquiry(body.role || "", body.company_size || "", body.budget_range || "");
  const tagIds = await Promise.all(tagNames.map((name) => upsertTag(name, env.KIT_API_KEY)));
  await Promise.all(
    tagIds
      .filter((id): id is number => id !== null)
      .map((id) => applyTag(id, subscriberId, env.KIT_API_KEY)),
  );

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
}

function isAllowedOrigin(request: Request): boolean {
  const origin = request.headers.get("Origin");
  if (!origin) return false;
  const requestUrl = new URL(request.url);
  if (requestUrl.hostname === "localhost" || requestUrl.hostname === "127.0.0.1") {
    return origin.startsWith("http://localhost:") || origin.startsWith("http://127.0.0.1:");
  }
  return origin === `https://${requestUrl.hostname}`;
}

function jsonError(status: number, message: string): Response {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
