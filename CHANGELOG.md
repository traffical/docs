# Docs Changelog

Internal log of doc edits during the docs revamp. Each entry records what was there before, what changed, and which source-of-truth files informed the change.

Sources of truth:
- SDK (open source): `/Users/marcel/Code/traffical/sdk/{js-sdk/packages/*, cli, sdk-spec}`
- Platform (closed source — concepts only, no internals): `/Users/marcel/Code/traffical/ng/{OVERVIEW.md, docs/design/*, platform/, edge/}`

Sensitive info policy (must not leak):
- Infrastructure: Cloudflare, Workers, Containers, D1, KV, R2, Pipelines, Iceberg, Parquet, DuckDB
- Vendors: WorkOS (auth), Stripe (billing)
- Control plane: any `api.traffical.io` endpoints, bundle build internals, cron tiers
- Internal repo structure, KV key patterns, training pipeline cadence

What is fair game:
- Concepts: parameters, layers, policies, allocations, projects, environments, assignments, definitions, warehouse-native mode
- SDK public API surface (everything exposed in the published npm packages)
- Public edge URLs the SDKs hit: `sdk.traffical.io` (don't describe what's behind it)
- User-facing concepts of dashboard features (visual editor, devtools, config-as-code)

---

## Iteration 1 — 2026-05-21

### Goals
- Fix critical correctness errors (SDK init signature is wrong in every SDK page — missing `orgId` and `env`)
- Scrub infrastructure leakage (Cloudflare CDN, 200+ edge locations, control-plane internals)
- Bring the docs in line with the actual public SDK surface
- Add the missing React Native SDK page and the missing concept pages
- Restructure navigation around the user (not the internal product organisation)

### Edits

#### `docs.json`
**Before:** Sections were Getting started, Core concepts (parameters, layers, policies, events-and-metrics), Experimentation (ab-testing, rollouts, optimization), Developer tools (cli, visual-editor). SDKs tab had Node, JS, React, Svelte. API tab had get-config, post-events, post-decide.

**After:** Reorganised around audience. Added Guides tab for canonical experiments and best practices (mostly for PMs/marketers). Added React Native to SDKs. Added new concept pages (projects-and-environments, assignments, warehouse-native, decisions-and-attribution). Added DevTools page. Surfaced feature flags as a top-level use case. Added `/v1/resolve` to API reference.

**Why:** Current nav is product-team-internal ("Core concepts") not user-task oriented. Splitting events/metrics into separate pages also more navigable.

---

#### `how-it-works.mdx`
**Before:** Architecture diagram explicitly described "Edge API on global CDN with 200+ edge locations" and named "Control Plane" with its responsibilities. Mentioned `api.traffical.io`. Implementation details leaked through.

**After:** Reframed around what the user sees: SDK + the Traffical service. Hashing formula uses `bucketCount` (configurable) not the hardcoded 1000. Removed CDN claim, edge-location count, and any mention of `api.traffical.io`. Added evaluation modes (`bundle` vs `server`) since this is in the public SDK surface. Removed prescriptive POST endpoints (those are documented in API reference, not in concept overview).

**Why:** User wanted internal architecture reduced to a minimum. The hosting infra is not part of the product surface — only the conceptual model matters.

**Sources:** `/Users/marcel/Code/traffical/sdk/js-sdk/packages/js-client/src/client.ts:50-120` (evaluation modes, defaults). `ng/OVERVIEW.md` (concept of bucketCount being configurable, not just 1000).

---

#### `quickstart.mdx`
**Before:** `createTrafficalClient({ projectId, apiKey })` — incorrect.

**After:** Full required options: `orgId`, `projectId`, `env`, `apiKey`. Updated example with realistic ID prefixes (`org_`, `proj_`). Removed mention of `traffical.track(name, { value })` shape — actual SDK uses `properties` and `unitKey`/`decisionId`. Added a brief note about default values being typed.

**Why:** Current quickstart is wrong — code wouldn't compile against published SDK.

**Sources:** `sdk/js-sdk/packages/node/src/client.ts:153, 728`; `sdk/js-sdk/packages/js-client/src/client.ts:68-100`.

---

#### `concepts/parameters.mdx`
**Before:** YAML config example used the old flat `parameters:` array with a `key` field.

**After:** Updated to the actual current CLI schema with the `namespaces:` block and `default:` (not `defaultValue:`) at the parameter level. Kept the flat form mentioned as a legacy convention. Tightened the "Constraints" table.

**Why:** The CLI's actual `traffical.yaml` schema groups parameters under `namespaces:` — current doc shows a syntax the CLI won't accept.

**Sources:** Agent survey of `sdk/cli/` — the canonical schema.

---

#### `concepts/layers.mdx`
**Before:** Hardcoded "1000 buckets" everywhere; described the hash formula as `% 1000`.

**After:** Generalised to `bucketCount` (project-level setting). Default is 10000 in the platform; the doc presents 10000 as the default while acknowledging it's configurable. Example bucket ranges updated proportionally.

**Why:** The platform uses a configurable `bucketCount`. The choice affects allocation granularity.

**Sources:** `ng/OVERVIEW.md` (config bundle structure section).

---

#### `concepts/policies.mdx`
**Before:** Lifecycle states listed `draft`, `running`, `paused`, `completed`. Adaptive policy section briefly mentioned algorithms but didn't cover per-entity or contextual bandits as policy shapes.

**After:** Added a clearer section on policy kinds (static vs adaptive) and how the same allocation primitives apply to both. Added subsections for: targeting conditions (existing, slightly trimmed), per-entity adaptive (`entityConfig`, `dynamicAllocations`), and contextual bandits (concept-level only, details in optimization page). Added a brief mention of rollouts living on top of static or adaptive policies (with link).

**Why:** The current page implies only static + plain adaptive. The platform supports more shapes — per-entity bandits and contextual bandits are real product capabilities, not just buzzwords.

**Sources:** `ng/docs/design/canonical-experiment-types.md` (Type 7, Type 10). SDK types: `sdk/js-sdk/packages/core/src/types.ts` (BundleAllocationCoefficients, EntityConfig).

---

#### `concepts/events-and-metrics.mdx` → split
**Before:** Single page covering exposures, track events, decision events, event definitions, value types, metrics, attribution, event pipeline.

**After:** Page kept and re-scoped to **events only** (exposure, track, decision). The metrics half was moved to a new `concepts/warehouse-native.mdx` page that introduces assignment definitions, fact definitions, metric definitions, and Traffical-native vs warehouse-native modes. The "Event pipeline" section was rewritten to remove infrastructure language.

**Why:** Events and metrics are two distinct concepts. Conflating them makes warehouse-native metrics invisible — and that's one of Traffical's biggest differentiators.

---

#### NEW — `concepts/projects-and-environments.mdx`
The platform hierarchy was never documented: Organization → Project → Environment. SDKs require `orgId`, `projectId`, and `env` — users can't follow the quickstart without knowing what these are. Explains unit-key choice (`userId` vs `companyId` etc.) which determines bucketing scope.

---

#### NEW — `concepts/assignments.mdx`
Concept-level page on assignments: a user-allocation record. Explains decision IDs, attribution (`cumulative` vs `decision`), the `decisionId` flow from SDK resolution through track events, and the bridge to warehouse-native (where assignments can come from SQL).

---

#### NEW — `concepts/warehouse-native.mdx`
Introduces entity definitions, assignment definitions, fact definitions, and metric definitions. Covers the two modes (Traffical-native events vs warehouse-native) and when to choose which. Includes the SQL template/column mapping pattern.

**Sources:** `ng/OVERVIEW.md` warehouse-native section; `ng/docs/design/canonical-experiment-types.md` Type 11.

---

#### NEW — `sdks/react-native.mdx`
Default `evaluationMode: "server"` with AsyncStorage cache. Covers cold-start strategy (localConfig → caller defaults → cached). Device-info enrichment via `DeviceInfoProvider`.

**Sources:** `sdk/js-sdk/packages/react-native/src/`; `ng/docs/design/canonical-experiment-types.md` Type 3.

---

#### NEW — `sdks/ssr.mdx`
SSR patterns for SvelteKit and Next.js. Server fetches bundle once via `loadTrafficalBundle()`, passes via load function, client hydrates without a second fetch. No FOOC.

**Sources:** `ng/docs/design/canonical-experiment-types.md` Type 4.

---

#### `sdks/overview.mdx`
**Before:** Listed four SDKs (node, js-client, react, svelte). Linked to a `js-sdk` repo on GitHub.

**After:** Added React Native. Reframed "SDK behavior" around the resolution model (local resolution from a bundle, automatic refresh, graceful degradation) rather than describing what the edge serves. Clarified the `@traffical/core` shared package.

---

#### `sdks/node.mdx`, `sdks/javascript.mdx`, `sdks/react.mdx`, `sdks/svelte.mdx`
**Before:** All init examples were `{ projectId, apiKey }` only — won't compile.

**After:** Added required `orgId` and `env`. Updated options tables to match the actual `TrafficalClientOptions` interface. Removed misleading default-tracking docs and inaccurate descriptions where the README contradicted code.

---

#### `tools/cli.mdx`
**Before:** Listed commands `init, push, pull, sync, status` only. YAML format showed flat parameter array.

**After:** Full command list: `init`, `push`, `pull`, `sync`, `status`, `import`, `generate-types`, `integrate-ai-tools`. YAML format updated to use `namespaces:` block. Documented flags per command, env vars, exit codes, and the type-generation flow.

**Sources:** `sdk/cli/` — actual CLI surface.

---

#### `tools/visual-editor.mdx`
Minor: clarified that DOM bindings are applied via the JS client (and React/Svelte SDKs which wrap it). Added a note about the `bundle` mode + `localConfig` pattern as a way to avoid FOOC for SSR pages running visual experiments.

---

#### NEW — `tools/devtools.mdx`
Brief intro to the DevTools bookmarklet: live inspection of SDK state, current assignments, exposure events, and parameter overrides. No internal-API references.

---

#### `experimentation/ab-testing.mdx`
**Before:** SDK example used incomplete client config.

**After:** Same content, corrected example. Added a short "Pick your unit key" note pointing to projects-and-environments page.

---

#### `experimentation/rollouts.mdx`
**Before:** Documented control-plane `POST /v1/policies/:policyId/rollout/start` and friends as if they were public.

**After:** Reframed as a dashboard feature with a brief mention that rollouts are also automatable. Removed the raw control-plane endpoint documentation. Kept the conceptual model (proportional scaling, health checks, rollback strategies) since those are user-visible behaviours.

**Why:** User explicitly said the control-plane API is internal-only.

---

#### `experimentation/optimization.mdx`
**Before:** Algorithm list was brief, contextual section was thin.

**After:** Expanded contextual bandits with the actual scoring model concepts (softmax, action probability floor, gamma). Per-entity optimisation expanded with the two resolution modes (`bundle` vs `edge`). Updated examples to use the canonical SDK init signature.

---

#### NEW — `experimentation/feature-flags.mdx`
Many users come from a feature-flag mental model. This page positions feature flags as a special case of a boolean parameter under a rollout policy.

---

#### NEW — `guides/canonical-experiments.mdx`
The big one. Pattern catalog covering: backend algorithm test, web UI test, mobile app test, SSR + hydration, cross-surface flag, backend → frontends, per-entity bandit, email/batch, progressive rollout, contextual bandit, warehouse-native external assignments, multi-tenant SaaS. Each pattern has: use case, project shape (layer/policy/allocation diagram), SDK integration sketch, metric setup.

**Sources:** `ng/docs/design/canonical-experiment-types.md` (the design doc). Adapted into user-facing content with internals scrubbed.

---

#### NEW — `guides/experiment-design.mdx`
PM/marketer-oriented: how to frame a hypothesis, pick a goal metric, choose a unit key, decide on segment targeting, set guardrails, and read results. Vendor-neutral best practices.

---

#### `api/overview.mdx`
**Before:** Mentioned only three endpoints. Said "global CDN with 200+ edge locations."

**After:** Added `/v1/resolve`. Removed CDN claim. Tightened the API key types section.

---

#### `api/get-config.mdx`, `api/post-events.mdx`, `api/post-decide.mdx`
Mostly fine — only minor updates to align the example payloads with current schemas (e.g. `unitKeyValue` not `unitKey` in some places per current edge code; clarified `attribution` field on track events).

---

#### NEW — `api/post-resolve.mdx`
Documents `POST /v1/resolve` — server-side full-bundle resolution for SDKs running in `evaluationMode: "server"` (React Native default).

---

### Sensitivity audit (pass-through)
Grep'd every edited file for: `cloudflare`, `worker`, `kv`, `r2`, `d1`, `iceberg`, `parquet`, `duckdb`, `workos`, `stripe`, `pipelines`, `api.traffical.io`, `200+ edge locations`. Removed all hits.

### Iteration 1 status: complete

33 .mdx files total. Sensitivity grep clean (no Cloudflare/Workers/D1/KV/R2/Iceberg/Parquet/DuckDB/WorkOS/Stripe/api.traffical.io/control-plane references). `docs.json` validated. All internal links resolve.

### Pages touched
- Rewritten: index, introduction, quickstart, how-it-works, concepts/parameters, concepts/layers, concepts/policies, concepts/events-and-metrics, sdks/overview, sdks/node, sdks/javascript, sdks/react, sdks/svelte, tools/cli, tools/visual-editor, experimentation/ab-testing, experimentation/rollouts, experimentation/optimization, api/overview, api/get-config, api/post-events, api/post-decide
- Unchanged: why-traffical (still solid as a vision page)
- New: concepts/projects-and-environments, concepts/assignments, concepts/warehouse-native, sdks/react-native, sdks/ssr, tools/devtools, experimentation/feature-flags, guides/canonical-experiments, guides/experiment-design, api/post-resolve

### Deferred to iteration 2+

**High-impact next:**
- A "first experiment, end-to-end" tutorial that walks from CLI init → dashboard policy → SDK code → reading results. Cross-references everything we have.
- Type-safe events end-to-end guide (currently it's just a sub-section in the CLI page).
- Per-warehouse-connector setup pages (Postgres, BigQuery, Snowflake, Databricks, ClickHouse) — what credentials, what permissions, anything connector-specific.
- A "concept: experiment lifecycle" page that ties together draft → running → paused → completed → archived with screenshots.

**Medium-impact:**
- Migration guides — vendor-neutral phrasing of "you have assignments from another tool, here's how warehouse-native picks them up".
- Best-practices for statistical power, sample-size estimation (the current `experiment-design.mdx` only covers it lightly).
- Dashboard walkthrough pages with screenshots (depends on dashboard stability).
- Self-host / private deployment docs (if/when that becomes a thing publicly).

**Polish:**
- Code examples in every SDK page tested against the real published packages (CI: typecheck doc snippets).
- More canonical experiment patterns: holdout groups, switchback experiments, geo-randomized tests.
- Glossary page (parameter, layer, policy, allocation, decision, exposure, unit key, attribution window).
- Visual diagrams for layer/policy/allocation relationships and the warehouse-native pipeline.

### Open questions for the user before iteration 2
- Is there a per-policy "experiment lifecycle" model worth documenting beyond what's already covered? The current OVERVIEW.md mentions "archive, complete" — should there be a dedicated lifecycle page?
- Are there features in `ng/docs/design/*.md` beyond what was surfaced via the survey agent that you'd want me to document? (I read `canonical-experiment-types.md`; the others were only referenced indirectly.)
- The `/v1/resolve` endpoint shape — confirmed conceptually but I didn't dig into the wire schema. Worth verifying before publishing the API page.
- Self-hosting / private-deployment — is that on the near roadmap, or skip it for now?

---

## Iteration 2 — 2026-05-21

### Goals
- End-to-end first-experiment tutorial
- Per-connector warehouse pages (Postgres / BigQuery / Snowflake / Databricks / ClickHouse)
- Type-safe events end-to-end guide (deeper than iteration 1's section in the CLI page)
- Dashboard walkthrough pages with screenshot placeholders
- More canonical patterns: holdout groups, switchback, geo-randomized
- Glossary page
- Visual diagrams (mermaid) for the layer/policy/allocation hierarchy and the warehouse-native pipeline

### New sources I drew on this iteration
- `/Users/marcel/Code/traffical/.cursor/plans/` — the 20 most recent plans, especially the **event schema** series (7 plans, all completed). These showed me the type-safe events surface is *substantially* deeper than the survey agent's report. Property schemas, property groups, schema enforcement modes, `onSchemaWarnings` callback, generic `TEvents` on every SDK client — all real and shipped.
- `/Users/marcel/Code/traffical/ng/ui/src/routes` — the dashboard route structure mapped 1:1 to the walkthrough pages I wrote.
- `/Users/marcel/Code/traffical/ng/warehouse-native-pipeline/src/warehouse/{postgres,bigquery,snowflake,databricks,clickhouse}/index.ts` — connection field shapes (host, account, projectId, httpPath, etc.) verified from source.
- `/Users/marcel/Code/traffical/ng/web/src/routes/features/+page.svelte` — landing page features section (used for tone calibration; nothing copied directly). Noted the marketing site says "200+ edge locations" — kept that out of the docs as discussed.
- `decision_log_feature_2afa9716.plan.md` — this is a real shipped feature (5 endpoints, 4 actor types, audit-trail use cases) and informed `dashboard/decisions.mdx`.

### Pages new in this iteration

**Guides:**
- `guides/first-experiment.mdx` — twenty-minute walkthrough from `traffical init` to reading results, with common stumbles section.
- `guides/type-safe-events.mdx` — property schemas → property groups → CLI codegen → SDK `TEvents` generic → edge validation → dashboard violation diagnostics. The piece the iteration-1 CLI page only hinted at.

**Connectors:**
- `connectors/overview.mdx` — credential model, permissions philosophy, cost considerations.
- `connectors/postgres.mdx` — `host/port/database/username/password` fields. Read-only role creation SQL. Network access. Schema design tips (indexes on time columns). Gotchas (timezones, pgbouncer, read replicas).
- `connectors/bigquery.mdx` — `projectId/datasetId/serviceAccountJson`. IAM roles (`bigquery.dataViewer` + `bigquery.jobUser`). Cost-control tips. Partitioning + clustering schema design.
- `connectors/snowflake.mdx` — key-pair auth (`account/username/privateKey/warehouse/database`). Read-only user setup. RSA key generation. Warehouse sizing.
- `connectors/databricks.mdx` — `host/httpPath/token/catalog`. Unity Catalog grants. Service principal vs PAT. ZORDER schema design.
- `connectors/clickhouse.mdx` — `host/port/username/password/database`. HTTPS API. `MergeTree` partitioning. `LowCardinality` tips.

**Dashboard:**
- `dashboard/overview.mdx` — tour with the URL hierarchy and section-by-section card layout.
- `dashboard/parameters.mdx` — list, detail, synced vs dashboard-only, layer moves, archiving.
- `dashboard/layers-and-policies.mdx` — layer list, policy editor (basics → allocations → conditions → adaptive → rollouts), policy detail tabs, manual actions.
- `dashboard/events.mdx` — events list, event detail, properties, violations, property groups, event explorer.
- `dashboard/definitions.mdx` — entities, assignments, facts; SQL editor + previews.
- `dashboard/metrics.mdx` — metric editor, attaching to policies, reading per-allocation results with cluster-robust significance.
- `dashboard/pipeline.mdx` — runs list, run detail with rendered SQL, freshness, cost monitoring.
- `dashboard/decisions.mdx` — decision log feature (from the cursor plan). Decision types, actor types, annotations, API access.
- `dashboard/settings.mdx` — API keys, warehouse connection, SDK sync, hashing, environments, maintenance.

**Reference:**
- `reference/glossary.mdx` — A–W glossary, every term cross-linked.

### Pages updated this iteration

- `concepts/events-and-metrics.mdx` — added a substantial **Property schemas** subsection covering schema declaration, enforcement modes, property groups. Cross-linked to the new type-safe events guide.
- `concepts/layers.mdx` — added a Mermaid diagram showing the project → layer → policy → allocation hierarchy.
- `concepts/policies.mdx` — added a Mermaid diagram of the resolution flow (context → bucket → policy → allocation → overrides).
- `concepts/warehouse-native.mdx` — added a Mermaid diagram of the pipeline (assignments + facts → join + aggregate → significance → dashboard).
- `guides/canonical-experiments.mdx` — appended three new patterns (Holdout group, Switchback, Geo-randomized) plus updated the summary matrix.
- `docs.json` — added Guides → first-experiment tutorial linked from Getting Started; added Dashboard group; added Warehouse connectors group; added Reference group with glossary; added `guides/type-safe-events` to Guides.

### New assets
- `/images/placeholders/README.md` — full inventory of screenshots needed for the dashboard walkthrough, with style notes for the screenshotter. The walkthrough pages reference paths like `/images/placeholders/parameters-list.png` so once real screenshots replace them, the pages will pick them up automatically.

### Iteration 2 status: complete

**File counts:**
- 51 total `.mdx` files (was 33 at end of iteration 1)
- 20 new files this iteration
- 5 existing files updated this iteration

**Audits:**
- Sensitivity grep clean (no Cloudflare / Workers / D1 / KV / R2 / Iceberg / Parquet / DuckDB / DuckLake / WorkOS / Stripe / api.traffical.io / 200+ edge locations references in published content). Note: `placeholders/README.md` is internal and references `/Users/marcel/Code/traffical/ng/ui`, which is fine — that file isn't part of the published site.
- `docs.json` validates as JSON
- Cross-link check passes (no broken internal links)

### Deferred to iteration 3+

**Content:**
- Migration guides (vendor-neutral — "you have assignments from another tool, here's how warehouse-native picks them up"). Worth doing once a couple of customers have actually migrated and we know what they hit.
- Statistical depth — sample-size planning calculator, sequential testing notes, common pitfalls with cluster-robust analysis. The `experiment-design.mdx` covers it lightly; a deeper page would help data-scientist readers.
- AI agent integration deep-dive — the decision log captures `actor: agent`, and `integrate-ai-tools` plugs Traffical into CLAUDE.md/.cursorrules/etc. A short page on the "your AI assistant can run experiments" story would land well, but I want to wait until the agent flow is more concrete.
- Type-safe events in non-TypeScript languages — the CLI codegen architecture is multi-language-ready (per `event_schema_config_cli` plan); when Python/Go/Swift codegen ships, document it.

**Quality:**
- Replace placeholder screenshots with real ones (depends on user having a demo project ready).
- CI typecheck doc code snippets against the real published SDK packages.
- Mermaid diagrams render fine in Mintlify but the styling defaults are basic — worth a custom theme block in `docs.json` eventually.

### Fix-up — fact-check pass (2026-05-21)

Two correctness errors flagged by the user and fixed against the code.

#### 1. Warehouse permissions were not read-only

**What I wrote:** every connector page said the role "should be read-only" and the overview said "Traffical needs a read-only connection". The implication was that Traffical only `SELECT`s.

**The truth:** the pipeline writes substantial intermediate data into the warehouse. Confirmed in:
- `ng/warehouse-native-pipeline/src/pipeline/persistent/ddl.ts` — `CREATE TABLE IF NOT EXISTS` for per-policy materialized tables and staging tables.
- `ng/warehouse-native-pipeline/src/pipeline/persistent/ingest.ts` — overlap pattern: `DELETE FROM ... WHERE batch_date >= ...`, `INSERT INTO ... SELECT * FROM staging`, plus `DROP TABLE IF EXISTS` for staging cleanup.
- `ng/warehouse-native-pipeline/src/pipeline/transpile.ts` — `ensureTrafficalSchema()` issues `CREATE DATABASE IF NOT EXISTS` (ClickHouse) or `CREATE SCHEMA IF NOT EXISTS` (Postgres) on first run.
- `ng/warehouse-native-pipeline/src/sdk-sync/writer.ts` — `INSERT INTO ${schema}.sdk_assignments` and `INSERT INTO ${schema}.sdk_tracks`.
- `ng/warehouse-native-pipeline/src/sdk-sync/ddl.ts` — `CREATE TABLE IF NOT EXISTS pipeline.sdk_assignments` / `pipeline.sdk_tracks`.

So Traffical owns a schema/database/dataset (the "Traffical schema") in your warehouse where it freely creates, writes, deletes, and drops. The role needs:
- `SELECT` on your source schemas
- `CREATE TABLE`, `INSERT`, `DELETE`, `DROP TABLE`, `SELECT` on the Traffical schema
- `CREATE SCHEMA` or `CREATE DATABASE` at the level above (Postgres / ClickHouse) — or pre-create the Traffical schema and grant `USAGE` + `CREATE` (other dialects)

**Pages updated:**
- `connectors/overview.mdx` — rewrote "Permissions" and "How connections work" sections to describe the read-only-on-source + read-write-on-Traffical-schema model. Replaced the "read-only credentials" line in the intro. Updated the optional SDK sync section to reflect that the tables (`sdk_assignments`, `sdk_tracks`) land in the same Traffical schema, not a separately-configured destination.
- `connectors/postgres.mdx` — replaced the "Creating a read-only role" section with one that grants the role full DDL/DML on a `traffical` schema plus `CREATE` on the database (so the pipeline can `CREATE SCHEMA IF NOT EXISTS` on first run). Updated the `username` row in the connection table.
- `connectors/bigquery.mdx` — replaced the IAM section. Now correctly grants `roles/bigquery.dataViewer` on source datasets but `roles/bigquery.dataEditor` on a pre-created `traffical` dataset, plus `roles/bigquery.jobUser` at the project level. BigQuery doesn't auto-create datasets so I made that explicit.
- `connectors/snowflake.mdx` — replaced "Creating a read-only user" with a script that grants `CREATE TABLE`, `CREATE VIEW`, `SELECT`/`INSERT`/`UPDATE`/`DELETE` on a `ANALYTICS.TRAFFICAL` schema. Updated the `username` row.
- `connectors/databricks.mdx` — replaced the Unity Catalog grants. Now grants `MODIFY` and `CREATE TABLE` on a pre-created `analytics.traffical` schema in addition to read access on source schemas.
- `connectors/clickhouse.mdx` — replaced the read-only setup. Now grants `CREATE TABLE`, `DROP TABLE`, `INSERT`, `ALTER`, `SELECT` on a `traffical` database. Called out that `ALTER` specifically is needed because the overlap-delete pattern on ClickHouse uses `ALTER TABLE ... DELETE WHERE ...` (point `DELETE` isn't supported on `MergeTree` engines). Updated the `username` row.
- `concepts/warehouse-native.mdx` — line that said "read-only credentials" updated to describe the actual access pattern.

#### 2. Policies are NOT environment-scoped

**What I wrote:** "You can pause a policy in `staging` without affecting `production`" (in `concepts/projects-and-environments.mdx` and `dashboard/settings.mdx`).

**The truth:** policies live at the project level — not the environment level. Confirmed in:
- `ng/control-plane/src/types/domain.ts:665+` — the `Policy` interface has `projectId` and `layerId` but no `envId` field. The `state` field (`running`/`paused`/`completed`/`draft`) is on the policy itself.
- `ng/control-plane/src/config/bundle-builder.ts:122-128` — the bundle builder fetches policies by layer (`policies.listByLayer(layer.id)`) and filters by `state === "running"`. There's no environment filter on policy lookup.
- `ng/control-plane/src/types/domain.ts:943+` — `EnvironmentOverride` exists but it specifically overrides **parameter default values** per environment ("per-environment parameter value override"), not policy state.

So what environments *actually* let you do per-env is:
- Override a parameter's default value (via `EnvironmentOverride`)
- Issue separate API keys

Pausing a policy pauses it in every environment. To scope an experiment to one environment, the correct approach is a [targeting condition](/concepts/policies#targeting-conditions) on a context field the SDK sends (e.g. `env`).

**Pages updated:**
- `concepts/projects-and-environments.mdx` — rewrote the "Environment" subsection. Replaced the incorrect "pause in staging without affecting production" claim with a precise list of what environments *do* and *don't* let you do per-env. Pointed at targeting conditions as the right tool for env-scoped experiments.
- `dashboard/settings.mdx` — fixed the same claim in the "Environments" section.

#### Lesson for future iterations

I shipped both claims in iteration 1 without verifying against the code, and the iteration 2 audit didn't catch them either. Pattern to avoid: don't state operational claims about what users can do without checking the type definitions and the bundle builder. The two are the ground truth — what the type has fields for, and what the bundle builder reads.

For iteration 3: add a "claims-to-verify" pass that grep-hunts patterns like "you can X in Y without Z" and pairs each with a source-of-truth file reference before publishing.

### Open questions before iteration 3
- Is there a separate audit/compliance story (SOC 2, GDPR, data residency) worth its own page? The landing-page features section mentions "data residency options"; if there's a real story there, docs should reflect it.
- The rollout endpoint documentation (`POST /v1/policies/:id/rollout/*`) was scrubbed in iteration 1 because they're control-plane endpoints. If teams want to script rollouts via CI, they'll need *some* documented API surface for it. Worth deciding what the supported automation story is.
- For the dashboard walkthrough pages: there's a `/{orgKey}/{projectKey}/ai` route I noticed but didn't document. What's that for? If it's the AI-optimization views referenced in OVERVIEW.md, that's worth surfacing.
- The `/{orgKey}/{projectKey}/editor` route — is that the visual editor target? If so, a screenshot on the existing visual-editor page would help.
