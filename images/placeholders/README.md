# Dashboard screenshot placeholders

The dashboard walkthrough pages reference screenshots at `/images/placeholders/*.png`. They need to be replaced with real shots from a demo project before publishing.

The dashboard source is at `/Users/marcel/Code/traffical/ng/ui`. Recommended approach: spin up a demo project with a realistic-looking dataset, take consistent screenshots (same browser, same viewport, light theme), and replace each placeholder.

## Required screenshots

### Top-level
- `dashboard-home.png` — landing page after sign-in showing the org list / picker

### Parameters
- `parameters-list.png` — the parameters list with several rows, mix of synced and dashboard-only
- `parameter-detail.png` — a single parameter's detail page with type, default, active policies, history

### Layers & policies
- `layers-list.png` — list of layers in a project
- `layer-detail.png` — a layer's detail page with parameters and policies tabs
- `policy-editor-basics.png` — new-policy form, name + kind + state fields
- `policy-editor-allocations.png` — allocation editor with two or three allocations
- `policy-editor-conditions.png` — conditions panel with a couple of rules
- `adaptive-config.png` — the adaptive policy configuration section (algorithm, goal event, window)
- `rollout-config.png` — rollout configuration with ramp + health check
- `policy-detail-metrics.png` — policy detail page showing per-allocation metric results

### Events
- `events-list.png` — list of event definitions with volume and schema columns
- `event-detail-overview.png` — event detail overview tab
- `event-detail-properties.png` — properties tab with declared property schema
- `violations.png` — schema violations diagnostics
- `property-groups.png` — property groups list
- `event-explorer.png` — event explorer with time range, filters, group-by

### Definitions
- `definitions-overview.png` — landing of the Definitions section
- `entities.png` — entities list
- `assignments.png` — assignment definitions list
- `assignment-editor.png` — assignment editor with SQL and preview
- `facts.png` — fact definitions list
- `fact-editor.png` — fact editor with SQL and preview

### Metrics
- `metrics-list.png` — metrics list
- `metric-editor.png` — metric editor (source, aggregation, value column)
- `metric-detail.png` — metric detail with trend over time
- `metric-attach.png` — attaching a metric to a policy
- `policy-metric-results.png` — per-allocation metric results inside a policy

### Pipeline
- `pipeline-overview.png` — pipeline section landing
- `pipeline-runs.png` — list of recent pipeline runs
- `run-detail.png` — single pipeline run detail with per-definition results and SQL
- `freshness.png` — freshness page

### Decisions
- `decisions-list.png` — decision log list
- `decision-detail.png` — single decision detail with evidence + outcome

### Settings
- `settings-overview.png` — settings landing
- `api-keys.png` — API keys management
- `warehouse-settings.png` — warehouse connection editor
- `sdk-sync.png` — SDK sync settings
- `hashing.png` — hashing configuration (unit key, bucket count)
- `maintenance.png` — maintenance actions

## Style notes for the screenshotter

- Light theme by default. Document one dark-theme variant in `reference/glossary.mdx` or somewhere if we want to advertise theme support.
- 1440-wide viewport is fine for most shots; crop tight to the meaningful UI.
- Use realistic but anonymized data (no real customer names). The demo project's data should look like an e-commerce dataset.
- Keep the chrome (sidebar, top bar) consistent across shots so the reader doesn't get disoriented.
- Save as PNG; aim for under 200 KB per file (compress).
