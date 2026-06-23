# Documentation project instructions

## About this project

- This is a documentation site built on [Mintlify](https://mintlify.com)
- Pages are MDX files with YAML frontmatter
- Configuration and navigation live in `docs.json`
- Run `mint dev` to preview locally
- Run `mint broken-links` to check links

## Style preferences

- Use active voice and second person ("you")
- Keep sentences concise — one idea per sentence
- Use sentence case for headings
- Bold for UI elements: Click **Settings**
- Code formatting for file names, commands, paths, and code references

## Content boundaries

- Document only the **public, stable** surface: published SDK methods, public HTTP
  endpoints, shipped CLI commands/flags, documented config keys, dashboard features.
- Do **not** document internal-only engines, experimental code, or private helpers
  (e.g. `ng/training-engine`, `ng/analysis-engine` internals, `ng/cli` admin commands).
- If the source is ambiguous about whether something is public or how it behaves,
  flag it for human review rather than guessing.

## Source-of-truth map

Source code lives in sibling repos, added as working dirs: `../ng` (platform/backend),
`../sdk` (client/server SDKs + CLI + spec), `../skills` (agent skills). When verifying a
docs page, open the corresponding source below.

| Docs area | Source of truth |
|---|---|
| `api/get-config` | `../ng/edge/src/routes/config.ts` |
| `api/post-resolve` | `../ng/edge/src/routes/resolve.ts`, `resolve-helpers.ts` |
| `api/post-decide` | `../ng/edge/src/routes/decide.ts` |
| `api/post-events` | `../ng/edge/src/routes/events.ts` |
| `api/overview` | `../ng/edge/src/index.ts`, `auth.ts` |
| `sdks/javascript` | `../sdk/js-sdk/packages/js-client` (+ `core`, `core-io`) |
| `sdks/node` | `../sdk/js-sdk/packages/node` |
| `sdks/react` | `../sdk/js-sdk/packages/react` |
| `sdks/react-native` | `../sdk/js-sdk/packages/react-native` |
| `sdks/svelte` | `../sdk/js-sdk/packages/svelte` |
| `sdks/php` | `../sdk/php-sdk/src`, `../sdk/php-sdk/docs` |
| `sdks/ssr` | `../sdk/js-sdk/packages/node` + `react` (SSR hydration path) |
| `sdks/overview` | `../sdk/js-sdk/README.md`, `../sdk/sdk-spec/README.md` |
| `tools/cli` | `../sdk/cli/src`, `../sdk/cli/README.md` (public CLI) |
| `tools/config-file` | `../sdk/sdk-spec/schemas/traffical-config.schema.json` |
| `tools/mcp-server` | `../ng/control-plane/src/mcp` |
| `tools/agent-skill` | `../skills/traffical`, `../skills/traffical-changes`, `../skills/traffical-workspace` (`SKILL.md`) |
| `tools/visual-editor` | `../ng/tools/visual-editor/src` |
| `tools/devtools` | `../ng/tools/devtools/src` |
| `connectors/*` | `../ng/integrations/src`, `../ng/warehouse/src`, `../ng/warehouse-ingest` |
| `dashboard/*` | `../ng/web` (app UI), `../ng/dashboard-engine/src` |
| `concepts/*` | `../ng/platform/src`, `../ng/control-plane/src`, `../sdk/sdk-spec/schemas` |
| `experimentation/*` | `../ng/platform/src`, `../ng/stats-engine`, `../ng/control-plane/src` |
| `concepts/events-and-metrics` | `../sdk/sdk-spec/schemas/events.schema.json`, `../ng/warehouse-ingest` |
| `concepts/assignments`, `concepts/layers`, `concepts/policies` | `../sdk/sdk-spec` (bucketing/resolve semantics), `../ng/platform/src` |

The canonical config/bundle/event shapes are defined once in
`../sdk/sdk-spec/schemas/` — treat those JSON Schemas as authoritative when docs and an
individual SDK disagree.
