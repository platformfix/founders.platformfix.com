import { describe, expect, it, vi, beforeEach } from "vitest";
import { upsertSubscriber, upsertTag, applyTag } from "./kit";

describe("kit.ts", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("upsertSubscriber sends fields and returns the subscriber id", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ subscriber: { id: 42 } }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const id = await upsertSubscriber("a@b.com", "Ada", { company: "Acme" }, { apiKey: "k" });

    expect(id).toBe(42);
    const [, options] = fetchMock.mock.calls[0];
    const body = JSON.parse(options.body as string);
    expect(body).toEqual({ email_address: "a@b.com", first_name: "Ada", fields: { company: "Acme" } });
  });

  it("upsertTag returns null on failure rather than throwing", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, json: async () => ({}) }));
    expect(await upsertTag("founders-role-other", "k")).toBeNull();
  });

  it("applyTag returns the response's ok flag", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true }));
    expect(await applyTag(1, 2, "k")).toBe(true);
  });
});
