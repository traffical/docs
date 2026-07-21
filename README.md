# Traffical docs

Public documentation for [Traffical](https://traffical.io) — the experimentation and
optimization platform. This repo is the source for the published docs site.

## Stack

- [Mintlify](https://mintlify.com) — pages are MDX files with YAML frontmatter
- `docs.json` — site configuration and the entire navigation tree (a page only appears
  on the site if it is listed there)

## Local preview

```sh
npm i -g mint   # one-time
mint dev        # preview at http://localhost:3000
```

Run `mint broken-links` before opening a PR to catch dead internal links. If the dev
server misbehaves, `mint update` brings the CLI current.

## Structure

| Path | Contents |
|---|---|
| `api/` | SDK API reference — config, resolve, decide, events endpoints |
| `concepts/` | Core concepts: parameters, layers, policies, surfaces, changes, warehouse-native |
| `connectors/` | Warehouse connector setup (Postgres, BigQuery, Snowflake, Databricks, ClickHouse) |
| `dashboard/` | Dashboard walkthrough pages, one per section |
| `experimentation/` | Feature flags, A/B testing, rollouts, optimization, algorithm choice |
| `governance/` | Measurement protocols, approvals and autonomy, roles and permissions |
| `guides/` | Task-oriented guides: first experiment, canonical patterns, type-safe events |
| `images/` | Static images; `images/placeholders/` holds dashboard screenshots (see below) |
| `logo/` | Site logo assets |
| `reference/` | Troubleshooting, FAQ, glossary |
| `sdks/` | Per-SDK pages (Node, JS, React, Svelte, React Native, PHP, …) plus patterns like SSR |
| `statistics/` | Statistical methodology: significance, sequential testing, CUPED, progress, impact |
| `tools/` | Developer tools: CLI, config file, MCP server, agent skill, visual editor, devtools |

Top-level `.mdx` files (`index`, `introduction`, `quickstart`, `how-it-works`,
`why-traffical`) are the getting-started pages.

## Screenshots

Dashboard pages reference screenshots at `/images/placeholders/*.png`.
`images/placeholders/README.md` is the shot manifest: one entry per required screenshot
with a description of what it must show, plus style notes (theme, viewport, size budget).

The screenshots are not captured by hand — a capture harness in the product repo
(`tools/docs-screenshots` in the platform monorepo) reads this manifest, drives a demo
project in the live dashboard, and writes compressed PNGs back into this repo. If you add
a screenshot reference to a page, add a matching entry to the manifest so the harness
picks it up.

## Contributing

- `CONTRIBUTING.md` — workflow, working conventions, and the pre-PR checklist
- `AGENTS.md` — the style contract, content boundaries, and the source-of-truth map
  used to verify pages against product code

`CHANGELOG.md` at the repo root is the running log of doc edits — add an entry when you
edit pages (see `CONTRIBUTING.md`). Content boundaries are part of the style contract in
`AGENTS.md`: the docs describe only the public product surface and never name internal
components, infrastructure, or hosting details.
