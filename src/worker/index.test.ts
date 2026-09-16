import { describe, expect, it, vi, beforeEach } from "vitest";
import worker, { type Env } from "./index";

const ORIGIN = "https://founders.platformfix.com";
const ENDPOINT = "https://founders.platformfix.com/api/inquiry";

const VALID_PAYLOAD = {
  first_name: "Ada",
  last_name: "Lovelace",
  email: "ada@example.com",
  company: "Acme",
  company_website: "https://acme.example.com",
  role: "ceo-founder",
  company_size: "1-50",
  budget_range: "15k-50k",
  project_description: "We need help scaling.",
};

function makeEnv(overrides: Partial<Env> = {}): Env {
  return {
    KIT_API_KEY: "test-key",
    ASSETS: { fetch: vi.fn() } as unknown as Fetcher,
    ...overrides,
  };
}

function makeRequest(body: unknown, headers: Record<string, string> = { Origin: ORIGIN }): Request {
  return new Request(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify(body),
  });
}

/** Kit-call fetch mock: routes by URL shape so subscriber upsert, tag upsert, and tag apply can each be asserted independently. */
function stubKitFetch(subscriberOk = true) {
  const fetchMock = vi.fn(async (url: string | URL | Request) => {
    const href = url.toString();
    if (href === "https://api.kit.com/v4/subscribers") {
      if (!subscriberOk) {
        return { ok: false, status: 500, json: async () => ({}) } as Response;
      }
      return { ok: true, json: async () => ({ subscriber: { id: 99 } }) } as Response;
    }
    if (href === "https://api.kit.com/v4/tags") {
      return { ok: true, json: async () => ({ tag: { id: 1 } }) } as Response;
    }
    if (href.includes("/tags/") && href.includes("/subscribers/")) {
      return { ok: true } as Response;
    }
    throw new Error(`Unexpected fetch URL in test: ${href}`);
  });
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

describe("worker fetch — /api/inquiry", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("rejects a request with no Origin header (403)", async () => {
    stubKitFetch();
    const request = makeRequest(VALID_PAYLOAD, {});
    const res = await worker.fetch(request, makeEnv());
    expect(res.status).toBe(403);
  });

  it("rejects a request with a mismatched Origin (403)", async () => {
    stubKitFetch();
    const request = makeRequest(VALID_PAYLOAD, { Origin: "https://evil.example.com" });
    const res = await worker.fetch(request, makeEnv());
    expect(res.status).toBe(403);
  });

  it("rejects a valid-origin request missing a required field (400)", async () => {
    stubKitFetch();
    const request = makeRequest({ ...VALID_PAYLOAD, email: "" });
    const res = await worker.fetch(request, makeEnv());
    expect(res.status).toBe(400);
  });

  it("returns 200 {ok: true} on a successful request", async () => {
    stubKitFetch();
    const request = makeRequest(VALID_PAYLOAD);
    const res = await worker.fetch(request, makeEnv());
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
  });

  it("returns 502 when upsertSubscriber fails (Kit create failed)", async () => {
    stubKitFetch(false);
    const request = makeRequest(VALID_PAYLOAD);
    const res = await worker.fetch(request, makeEnv());
    expect(res.status).toBe(502);
  });
});
