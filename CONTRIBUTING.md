# Contributing to the Traffical docs

Thanks for helping improve the docs. This guide covers the workflow and the working
conventions this repo actually uses. The style contract — voice, formatting, content
boundaries, and the source-of-truth map — lives in [`AGENTS.md`](AGENTS.md); read it
before writing.

## Workflow

1. Clone the repo and install the Mintlify CLI: `npm i -g mint`
2. Create a branch for your changes
3. Edit pages (`.mdx` with YAML frontmatter); new pages must also be added to the
   navigation tree in `docs.json` or they won't appear on the site
4. Preview with `mint dev` at `http://localhost:3000`
5. Run the [pre-PR checklist](#before-opening-a-pr)
6. Open a pull request

## Writing guidelines

Follow the style preferences in [`AGENTS.md`](AGENTS.md) (active voice, second person,
concise sentences, sentence-case headings, bold for UI elements, code formatting for
files/commands/paths). Beyond those:

- **Lead with the goal**: start instructions with what the reader wants to accomplish
- **Use consistent terminology**: don't alternate between synonyms for the same concept
  — check the [glossary](reference/glossary.mdx) for the canonical term
- **Include examples**: show, don't just tell
- **Verify claims against source**: every documented parameter, endpoint, method, flag,
  or behavior must be checked against the source-of-truth map in `AGENTS.md`. Design
  docs describe intent, not necessarily what shipped — verify operationally
  consequential claims against the code that consumes them, not just type declarations.

## Working conventions

### Audit ledger (`.audit-progress.md`)

One row per page in `docs.json`, tracking whether the page has been verified against
source. When you create, correct, or source-verify a page, update its row (status, date,
what was checked). Statuses: `TODO`, `DONE`, `NEEDS-HUMAN-REVIEW` (ambiguous source or a
decision a human must make — flag rather than guess).

### Changelog discipline (`CHANGELOG.md`)

Every editing pass gets a dated entry: what was there before, what changed, why, and
which source files informed the change. This is the institutional memory that keeps
later passes from re-introducing corrected errors. Concise is fine; sourced is required.

### Sensitive-info policy

Published pages must never name internal infrastructure, hosting vendors, internal
service names, or non-public endpoints. The authoritative list of forbidden terms — and
what is fair game — is the "Sensitive info policy" section at the top of `CHANGELOG.md`,
alongside the content boundaries in `AGENTS.md`. Grep your edited files for the policy
list before opening a PR.

### Placeholder screenshots

Dashboard pages reference screenshots under `/images/placeholders/`. The manifest at
`images/placeholders/README.md` describes every required shot. If a page you write needs
a new screenshot, reference the path in the page **and** add a manifest entry describing
the shot — a capture harness in the product repo reads the manifest and fills in the
real images. Don't block a docs PR on the image existing.

## Before opening a PR

- [ ] `mint broken-links` passes (no dead internal links)
- [ ] `docs.json` is valid JSON and lists any new pages
- [ ] Edited files grep clean against the sensitive-info policy list
- [ ] `.audit-progress.md` rows updated for pages you verified
- [ ] `CHANGELOG.md` entry added for the pass
- [ ] New screenshot references have manifest entries in `images/placeholders/README.md`
