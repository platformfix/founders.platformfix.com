# Founders

Landing microsite for the AI-native founder offer at `founders.platformfix.com`. See `README.md` for architecture and deployment.

## Git

**Every commit must be signed.** This repo deploys to production on push to `main`, so the history is the audit trail for what went live and who put it there — an unsigned commit is a gap in it. Signing happens automatically from the global git config (`commit.gpgsign true`, SSH format); GitHub shows each commit as Verified. If a commit lands unsigned, fix the signing setup rather than pushing it and moving on.

**Commit subjects and pull request titles both follow [Conventional Commits](https://www.conventionalcommits.org/)** — `type(scope): subject`, e.g. `feat(worker): apply founders tag vocabulary on inquiry submit`. The scope is optional, the type is any lowercase word, and `!` after the type marks a breaking change. The PR title matters as much as the commit subject because a squash merge uses it as the subject that lands in `main`.

**Work reaches `main` through a pull request, never a direct push.** Because a push to `main` deploys straight to production, a direct commit ships unreviewed the moment it lands — there is no gate between writing it and it serving real traffic. Branch first, open a PR, and let the review happen before the deploy rather than after it. `terraform/**` changes go through the same PR gate, plus the `/apply` comment step described in `README.md`.

**Every commit also needs a DCO sign-off** — a `Signed-off-by:` trailer, added with `git commit -s`. To fix a branch whose commits lack the trailer: `git rebase HEAD~<n> --signoff`, then `git push --force-with-lease`.

## Karpathy Guidelines (Apply to All Output)

Behavioral guardrails to reduce common LLM mistakes. Apply to content, code, documents, and strategy. Bias toward caution over speed. For trivial tasks, use judgment.

### 1. Think Before Acting

Don't assume. Don't hide confusion. Surface tradeoffs.

- State assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them. Don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

### 2. Simplicity First

Minimum output that solves the problem. Nothing speculative.

- No features or sections beyond what was asked.
- No abstractions for single-use work.
- No "flexibility" or "configurability" that wasn't requested.
- If 200 lines could be 50, rewrite it.

The test: would a senior engineer say this is overcomplicated? If yes, simplify.

### 3. Surgical Changes

Touch only what you must. Clean up only your own mess.

When editing existing files:
- Don't "improve" adjacent content, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated issues, mention them. Don't fix them silently.

The test: every change should trace directly to the user's request.

### 4. Goal-Driven Execution

Define success criteria. Loop until verified.

Transform tasks into verifiable goals:
- "Add validation" becomes "Write tests for invalid inputs, then make them pass."
- "Fix the bug" becomes "Write a test that reproduces it, then make it pass."
- "Add a form field" becomes "Write the failing test, then make it pass, then confirm the Worker maps it correctly."

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

## Kit tag/field vocabulary is closed

The Worker's tag and custom-field vocabulary (`src/worker/foundersTags.ts`, `src/worker/kit.ts`) is fixed and confirmed against the live Kit account — see README.md's "Kit integration" section. Kit tag deletes do not work and custom field deletion is undocumented, so this vocabulary is a one-way door. Never add, rename, or free-form mint a tag or field without stopping and confirming with Steve first.

## Workflow Discipline (Superpowers)

For building anything non-trivial that doesn't have a dedicated skill, new repo, new skill, new automation, significant refactor, multi-file feature, follow the superpowers flow:

1. `/brainstorm` — clarify intent, get 2-3 approaches, approve a design
2. `/write-plan` — convert the design into a phased task list with acceptance criteria
3. Execute — subagent-driven (recommended) or inline with checkpoints

Never jump from "do X" to implementation when work spans multiple files or takes more than 30 minutes. The flow is mandatory.
