#!/usr/bin/env node
// One-time setup: creates the three custom fields and the closed tag
// vocabulary this repo depends on. POST is idempotent for tags (mint-or-get
// by name) but NOT documented as idempotent for custom fields, so this
// script checks GET /v4/custom_fields first and skips any label that
// already exists, rather than risking a duplicate field.
const KIT_API_KEY = process.env.KIT_API_KEY;
if (!KIT_API_KEY) throw new Error("KIT_API_KEY not set");

const FIELDS = ["Company", "Company Website", "Project Description"];
const TAGS = [
  "founders-role-ceo-founder", "founders-role-coo-ops", "founders-role-cfo-finance",
  "founders-role-cto-data", "founders-role-vp-director", "founders-role-other",
  "founders-size-1-50", "founders-size-50-100", "founders-size-100-500", "founders-size-500-plus",
  "founders-budget-15k-50k", "founders-budget-50k-150k", "founders-budget-150k-500k", "founders-budget-not-sure",
  "dest-founders",
];

async function api(method, path, body) {
  const res = await fetch(`https://api.kit.com/v4${path}`, {
    method,
    headers: { "Content-Type": "application/json", "X-Kit-Api-Key": KIT_API_KEY },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, data };
}

async function main() {
  const existing = await api("GET", "/custom_fields");
  const existingLabels = new Set((existing.data.custom_fields || []).map((f) => f.label));

  console.log("Custom fields:");
  for (const label of FIELDS) {
    if (existingLabels.has(label)) {
      const field = existing.data.custom_fields.find((f) => f.label === label);
      console.log(`  SKIP (exists) ${label} -> key "${field.key}", id ${field.id}`);
      continue;
    }
    const created = await api("POST", "/custom_fields", { label });
    if (!created.ok) {
      console.error(`  FAILED ${label}:`, created.data);
      continue;
    }
    console.log(`  CREATED ${label} -> key "${created.data.custom_field.key}", id ${created.data.custom_field.id}`);
  }

  console.log("\nTags:");
  for (const name of TAGS) {
    const res = await api("POST", "/tags", { name });
    console.log(`  ${res.ok ? (res.status === 201 ? "CREATED" : "EXISTS") : "FAILED"} ${name}${res.ok ? ` -> id ${res.data.tag.id}` : ""}`);
  }
}

main();
