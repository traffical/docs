# Dashboard screenshot placeholders

The docs pages reference screenshots at `/images/placeholders/*.png`. This file is the shot manifest: one entry per required screenshot, with a one-line description of what the shot should show.

The screenshot harness (`tools/docs-screenshots` in the platform monorepo) reads this manifest and captures each shot from a demo project. Recommended approach: use a demo project with a realistic-looking dataset and take consistent screenshots (same browser, same viewport, light theme).

## Required screenshots

### Top-level
- `dashboard-home.png` — landing page after sign-in showing the org list / picker

### Project overview
- `project-overview-impact.png` — the Impact section on the project overview: program strip, per-metric table, and in-flight block

### AI optimization
- `ai-optimization-page.png` — the AI Optimization page: summary strip plus the Converged and Learning policy groups

### Parameters
- `parameters-list.png` — the parameters list with several rows, mix of synced and dashboard-only
- `parameter-editor.png` — the two-pane parameter editor dialog (Basics/Constraints/Environments tabs, live preview pane)
- `parameter-detail.png` — a single parameter's detail page with type, default, active policies, history

### Layers & policies
- `layers-list.png` — list of layers in a project
- `layer-detail.png` — a layer's detail page: prioritized policies list plus the collapsible policy bucket overview (swim-lanes)
- `create-policy-modal.png` — the Create Policy modal with name, auto-generated key, kind, goal, and traffic allocation fields
- `policy-goal-selector.png` — the goal selector with the Event / Metric mode toggle and the resolved-metric preview
- `policy-detail-overview.png` — the policy detail Overview tab: verdict banner, KPI band, and live allocation
- `policy-measurement-tab.png` — the Measurement tab with per-metric significance results and the measurement progress card
- `policy-settings-analysis.png` — the Settings tab's per-policy CUPED and sequential-testing overrides (inherit / enabled / disabled)

### Surfaces
- `surfaces-list.png` — the Surfaces list (project sidebar → Surfaces) with name/key, kind, default layer, and binding-count columns; seed at least three surfaces of different kinds so the columns show variety
- `surface-detail-bindings.png` — a surface's detail page on the **Settings** tab: the parameter bindings table with a few rows in different roles, with the inline role/requirement legend visible

### Changes
- `changes-list.png` — the Changes list: the four process stat cards on top (Time to exposure, Clean activation rate, Guardrail catch rate, Decision-log completeness), the decision queue panel below them, and table rows in mixed states (a draft, an in-flight canary or experiment, a completed change)
- `change-wizard-strategy-step.png` — the New Change wizard on the **Strategy** step: the computed risk class with its reason line, the lifecycle template list with the **Recommended** badge, and the measurement protocol teaser; use a change whose parameters make the teaser show matched certified protocols
- `change-detail-overview.png` — a change detail page, **Overview** tab, mid-lifecycle: the lifecycle rail with the current phase highlighted and the next-transition hero card showing readiness-check counts and the button that opens the transition console
- `transition-console.png` — the transition console side panel for a traffic-exposing transition (e.g. Start canary or Advance to experiment): plan options (Run now / Run smaller / Overlay), the ramp-to-target shape controls, the readiness checks with pass/warn statuses, and the approval/decision footer at the bottom

### Experimentation / Choosing an algorithm
- `policy-goal-step-event-metric-toggle.png` — the adaptive policy goal step with the toggle between the goal event dropdown and the goal metric picker, showing the resolved optimizing metric

### Policy health
- `policy-health-hero.png` — the compact health hero on the policy Overview tab (six-check pills in pass/warn/fail states)

### Statistics / Measurement progress
- `measurement-progress-running.png` — the Measurement progress card on a running experiment: target chip, progress bar, detectable-now vs target, ETA line with "as of" stamp
- `measurement-whatif-planner.png` — the same card on a draft policy in what-if planner mode: baseline rate + target MDE inputs producing a users-per-variant estimate
- `measurement-progress-completed.png` — the Measurement summary on a completed policy showing the retrospective detectable-effect sentence

### Statistics / Impact methodology
- `impact-program-view.png` — the Impact section with program strip, per-metric groups, and the methodology disclaimer
- `impact-metric-group.png` — a per-metric impact group with discounted daily total, confidence interval, and contribution rows
- `impact-inflight-optimization.png` — in-flight experiment rows and the always-on optimization block, rendered apart from realized totals

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
- `create-metric-dialog.png` — two-pane create dialog with live preview
- `metric-composite-components.png` — composite component rows
- `metric-detail.png` — metric detail with trend over time
- `metric-attach.png` — attaching a metric to a policy
- `policy-metrics-scorecard.png` — role-grouped policy scorecard

### Pipeline
- `workflow-runs-list.png` — the Workflow Runs page: list of recent runs with the duration chart and type/status filters
- `workflow-run-detail.png` — a single workflow run's detail with the per-step table and durations
- `data-freshness.png` — the Data Freshness page: per-definition watermarks and age

### Decisions
- `decisions-list.png` — decision log list
- `decision-detail.png` — single decision detail with evidence + outcome

### Notifications
- `notifications-feed.png` — the org Notifications page feed with All / Unread / Needs ack tabs, a mix of read and unread rows, one Needs-ack row
- `notification-preferences.png` — the personal notification preferences matrix (categories × in-app/email/Slack) in account settings
- `notifications-routing.png` — the Settings tab of the org Notifications page: shared destinations list plus the routing-rule builder

### Settings
- `settings-overview.png` — settings landing (General tab: project basics + randomization unit)
- `settings-change-defaults.png` — the Change defaults card on the General tab (target days to significance, allocation and canary bounds)
- `pipeline-scheduling.png` — the Pipelines scheduling card with per-pipeline interval dropdowns (also referenced from `dashboard/pipeline.mdx`)
- `sdk-settings.png` — the SDK tab: config bundle status per environment + SDK event sync section
- `warehouse-settings.png` — warehouse connection editor
- `maintenance.png` — maintenance actions

### Usage & billing
- `billing-overview.png` — the Billing page: plan status card and monthly usage
- `billing-usage-by-project.png` — the usage table with per-project MTU line items

### Governance
- `protocols-list.png` — the Protocols list (Metrics → Protocols) with the state filter chips (certified / draft / deprecated) and per-row version badges; seed at least one protocol in each state (`governance/measurement-protocols.mdx`)
- `change-plan-tab.png` — a change's **Plan** tab with a resolved plan: the plan state badge, source protocols with pinned versions, primary/secondary metrics, guardrails with thresholds, at least one unresolved risk, and the **Approve plan** button (`governance/measurement-protocols.mdx`)
- `change-wizard-risk-class.png` — a close crop of the wizard's Strategy step focused on the computed risk class badge and its one-line reason (e.g. "high — AI surface, decision binding"); use a change whose parameters bind to a high-risk surface so the reason line is informative (`governance/approvals-and-autonomy.mdx`)
- `transition-console-approval-card.png` — the transition console cropped to the **Approval** card: approver role, status badge, and the **Request approval** button next to the transition-labeled combined button (e.g. "Approve & Advance to experiment"); needs a medium-or-higher-risk change awaiting an advance (`governance/approvals-and-autonomy.mdx`)
- `change-phase-automation.png` — a change's **Settings** tab scrolled to the Phase automation section, showing the three per-phase selectors (On advance recommendation / On blocking breach / On warning breach) with at least one selector marked *default* (`governance/approvals-and-autonomy.mdx`)
- `teams-page.png` — the organization's **Teams** page with two or three teams and the members dialog open over one of them, showing per-person team roles (`governance/roles-and-permissions.mdx`)
- `create-api-key-dialog.png` — the **Create API Key** dialog (org API Keys page) with the key-type preset dropdown open, showing the SDK Key, Management Key, Lifecycle Operate Key, and Full Access presets (`governance/roles-and-permissions.mdx`)

### Reference / FAQ
- `faq-winning-traffic-banner.png` — adaptive policy verdict banner reading "winning traffic" with the measured lift still pending significance
- `faq-start-blocked-measurement-plan.png` — transition console showing the "Measurement plan not approved" panel blocking a traffic start

### Reference / Troubleshooting
- `troubleshooting-policy-health-warning.png` — the policy health hero with a warning pill expanded to show per-check detail
- `troubleshooting-test-connection.png` — the warehouse settings page with a Test Connection result
- `troubleshooting-plan-tab-blocked.png` — a change's Plan tab with a draft plan, unresolved risks, and the Approve plan button

## Style notes for the screenshotter

- Light theme by default. Document one dark-theme variant in `reference/glossary.mdx` or somewhere if we want to advertise theme support.
- 1440-wide viewport is fine for most shots; crop tight to the meaningful UI.
- Use realistic but anonymized data (no real customer names). The demo project's data should look like an e-commerce dataset.
- Keep the chrome (sidebar, top bar) consistent across shots so the reader doesn't get disoriented.
- Save as PNG; aim for under 200 KB per file (compress).
