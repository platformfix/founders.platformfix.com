# Founders

Landing microsite for Platform Fix's AI-native founder offer, hosted at [founders.platformfix.com](https://founders.platformfix.com). Structurally modeled on [morningside.ai](https://www.morningside.ai)'s home, `/services`, and `/work-with-us` pages, rebranded to Platform Fix's own design system. The offer's name, price, and niche are still open — see `platformfix/second-brain`'s `plans/2026-09-13-ai-native-founder-offer-design.md` — so this site ships with placeholder copy and exists to gauge interest via the work-with-us form.

## Architecture

```
┌──────────────────────────────────┐
│  Browser                         │
│  React app (/, /services,        │
│  /work-with-us)                  │
│  POSTs the inquiry form to ──────┼─┐
└──────────────────────────────────┘ │
                                     ▼
┌──────────────────────────────────────┐
│  Cloudflare Worker                   │
│  founders.platformfix.com/*          │
│                                      │
│  /api/inquiry    → Kit API           │
│  everything else → static assets     │
└──────────────────────────────────────┘
                ▼
        api.kit.com (v4)
```

All Kit API calls happen server-side in the Worker. The API key never reaches the browser. The frontend talks only to the same origin. The Worker route and DNS record are Terraform-managed (see "Infrastructure" below) — `wrangler.toml` deploys the script only and declares no `routes` of its own.

## Tech stack

- **React 19** with TypeScript
- **Vite** (dev server)
- **Tailwind CSS 4**, plain typed UI primitives (no component library — this form only needs five field types)
- **Cloudflare Worker** (TypeScript) for the `/api/inquiry` endpoint
- **Kit (ConvertKit) v4** for lead capture (subscriber upsert, custom fields, tags)
- **Terraform** for the Worker's DNS record and route binding
- **Framer Motion** for scroll-triggered entrance animation and the FAQ accordion
- **Vitest** for testing

## Getting started

```sh
npm install
npm run dev
```

### Local Worker development

To run the Worker locally with the same `/api/inquiry` route as production:

```sh
npm run build
npm run worker:dev
```

You will also need a `.dev.vars` file (gitignored) with the Worker secret:

```
KIT_API_KEY=<kit-api-key>
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build of the React app |
| `npm run preview` | Preview production build |
| `npm run worker:dev` | Run the Worker locally with `wrangler dev` |
| `npm run worker:typecheck` | Typecheck the Worker (`tsc -p tsconfig.worker.json`) |
| `npm run deploy` | Build + deploy via wrangler (typically only run by CI) |
| `npm test` | Run Vitest tests |
| `npm run test:watch` | Vitest in watch mode |
| `npm run lint` | Run Oxlint |

## Project structure

```
src/
├── components/
│   ├── Layout.tsx      Shared header/footer, wraps every route
│   └── ui/              Plain typed primitives (button, input, label, select, textarea)
├── pages/
│   ├── HomePage.tsx      /
│   ├── ServicesPage.tsx  /services
│   └── WorkWithUsPage.tsx /work-with-us (the inquiry form)
├── lib/
│   ├── inquiry.ts        InquiryPayload type + submitInquiry() fetch call
│   └── tokens.ts         Brand colour constants (mirrors platformfix/design-system)
└── worker/
    ├── index.ts          Cloudflare Worker entry (routes /api/inquiry, CORS, validation)
    ├── kit.ts             Kit v4 API calls (subscriber upsert, tag mint/apply)
    └── foundersTags.ts    The closed role/company-size/budget-range tag vocabulary
scripts/
└── setup-kit.mjs         One-time script that minted the live custom fields + tags (see below)
terraform/                 DNS record + Worker route (see "Infrastructure")
wrangler.toml               Worker config — no [vars], no routes (Terraform owns the route)
tsconfig.app.json           Frontend TS config (excludes src/worker)
tsconfig.worker.json        Worker TS config (uses @cloudflare/workers-types)
```

## Deployment

Deployed to **Cloudflare Workers** via GitHub Actions on push to `main`. The workflow (`.github/workflows/deploy.yml`) builds the Vite app, deploys the Worker + static assets, and pushes the `KIT_API_KEY` Worker secret in the same step.

### Branch protection

`main` requires `build-and-test`, `secret-scan`, `commit-lint`, and `DCO` to pass before any PR can merge, and blocks direct pushes and force-pushes outright. This is what actually enforces the PR-only workflow `CLAUDE.md` documents, rather than leaving it as an honor system.

### Required GitHub secrets

| Secret | Purpose | Sensitive? |
|---|---|---|
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare account identifier | Yes |
| `CLOUDFLARE_API_TOKEN` | Cloudflare API authentication for `wrangler deploy` (`cloudflare-founders-deploy` in the `Claude Code` 1Password vault) | Yes |
| `KIT_API_KEY` | Kit API key, pushed to the Worker as a runtime secret | Yes |
| `OP_SERVICE_ACCOUNT_TOKEN` | Lets `.github/workflows/terraform.yml` load credentials from 1Password at plan/apply time | Yes |

### Rotating the Kit API key

1. Rotate the key in the Kit dashboard.
2. Update the `kit` item in the `Claude Code` 1Password vault.
3. Update `KIT_API_KEY` in GitHub repo secrets.
4. Push any commit (or trigger the workflow manually). The deploy step rewrites the Worker secret with the new value.

## How inquiries work

1. Visitor submits the form on `founders.platformfix.com/work-with-us`.
2. Frontend `POST`s the full `InquiryPayload` (name, email, company, company website, role, company size, budget range, project description) to `/api/inquiry` on the same origin.
3. The Worker rejects the request if the `Origin` header doesn't match, or a required field is missing, then calls Kit in sequence:
   - Upsert the subscriber with the free-text fields as Kit custom fields (`POST /v4/subscribers`)
   - Resolve and apply the role/company-size/budget-range tags plus the `dest-founders` marker (mint-or-get via `POST /v4/tags`, matching `swade1987/newsletter.platformfix.com`'s pattern)
4. If the subscriber create fails, the Worker returns 502. Kit call failures are logged to `console.error` (viewable via `wrangler tail`), with any email address redacted first.

## Kit integration

The custom fields and the full tag vocabulary were minted once against the live Kit account by `scripts/setup-kit.mjs` — re-running it is safe (it skips fields/tags that already exist) but the vocabulary itself is closed and must not be extended without confirming with Steve first, since Kit tag deletes do not work and custom field deletion is undocumented.

| Form field | Kit representation |
|---|---|
| `company`, `company_website`, `project_description` | Custom fields (`src/worker/kit.ts`'s `FIELD_KEYS`) |
| `role` | One of `founders-role-ceo-founder`, `founders-role-coo-ops`, `founders-role-cfo-finance`, `founders-role-cto-data`, `founders-role-vp-director`, `founders-role-other` |
| `company_size` | One of `founders-size-1-50`, `founders-size-50-100`, `founders-size-100-500`, `founders-size-500-plus` |
| `budget_range` | One of `founders-budget-15k-50k`, `founders-budget-50k-150k`, `founders-budget-150k-500k`, `founders-budget-not-sure` |
| — | `dest-founders`, applied to every inquiry as a source marker |

`src/worker/foundersTags.ts`'s `tagsForInquiry()` drops any value it doesn't recognise rather than minting an unexpected tag — the vocabulary above is closed, not open, since every value comes from a fixed dropdown or button rather than free text.

## Infrastructure

The Worker script itself deploys via `wrangler` (see "Deployment" above), but the hostname binding — the DNS record and the Worker route for `founders.platformfix.com` — is entirely Terraform-managed, mirroring `platformfix/prs-dashboard` and `platformfix/tf-atuin-sync`:

- **State:** R2 (S3-compatible), bucket `workshop-platformfix-com`, key `terraform/founders-platformfix-com.tfstate`.
- **Credentials:** loaded from 1Password at plan/apply time (`cloudflare-founders-deploy` for Cloudflare, `workshop-r2` for the state backend) via the `OP_SERVICE_ACCOUNT_TOKEN` GitHub secret — never stored as raw GitHub secrets themselves.
- **Workflow (`.github/workflows/terraform.yml`), PR-driven and Atlantis-style:**
  1. Open a PR touching `terraform/**` → `plan` runs automatically and comments the plan on the PR.
  2. Review the plan, then comment `/apply` (only the repo owner, members, or collaborators can trigger it).
  3. `apply` runs `terraform apply` on the PR branch and, on success, merges it.
- **Ordering:** `terraform/main.tf`'s `cloudflare_workers_route` resource references the Worker script by name, so `wrangler deploy` must have run at least once (creating the script) before the first `terraform apply` can bind the hostname to it.

Local `terraform plan`/`apply` runs are not the intended path — Steve has asked for this to run through GitHub Actions, not from a local machine. Use the PR + `/apply` flow above.
