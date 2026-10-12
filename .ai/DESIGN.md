# GCC Fieldbook — UI/UX Design System

> **Product:** GCC Fieldbook  
> **Tagline:** The working guide to India's GCC ecosystem.  
> **Document:** UI/UX and Design System  
> **Version:** 0.1 — assessment MVP  
> **Last updated:** 13 October 2026  
> **Status:** Proposed implementation specification  
> **Companion documents:** [`RESEARCH.md`](./RESEARCH.md), [`PRD.md`](./PRD.md), [`ARCHITECTURE.md`](./ARCHITECTURE.md)

---

## 1. Design intent

GCC Fieldbook is an evidence-first research workspace for people making consequential business decisions. Its interface should feel like a carefully designed analyst tool: calm, precise, legible, trustworthy, and fast to navigate. It should not look like a generic AI chatbot, a consumer finance app, or a marketing landing page.

The visual metaphor is a **modern field guide**: structured information, clear paths through complex material, and evidence that is easy to inspect. Use restrained editorial typography, a confident evergreen brand color, quiet neutral surfaces, and functional data visualization.

### 1.1 Design principles

1. **Evidence is a first-class object.** Sources, dates, units, definitions, and verification status must be visible near the claims they support.
2. **Hierarchy before decoration.** Use typography, spacing, alignment, and restrained color to establish hierarchy. Do not use gradient-filled cards, excessive shadows, glowing AI effects, or ornamental charts.
3. **Dense, but not cramped.** The product is a research tool; show useful detail while preserving readable rows and generous spacing.
4. **Confidence without false certainty.** Status labels must distinguish verified facts, estimates, conflicting evidence, and unknown information. Never use color alone to express confidence.
5. **One primary action per view.** The main task on a page should be visually clear; secondary actions should not compete with it.
6. **Functional polish.** Loading, empty, error, success, and disabled states are part of the design—not afterthoughts.
7. **Responsive by design.** The core workflow must work on desktop and remain usable on tablets and mobile screens.
8. **No fabricated data visualizations.** Charts and KPI cards must reflect seeded application data. If a metric is unavailable, show “Not available” or omit it rather than inventing a number.

### 1.2 Design success criteria

A first-time reviewer should be able to:
- Understand what GCC Fieldbook does within 10 seconds of entering the workspace.
- Find and open a GCC record without assistance.
- Locate the source for an important fact without searching elsewhere in the interface.
- Compare at least two cities and understand what the displayed indicators mean.
- Ask the copilot a question and recognize which claims are supported by retrieved records.
- Generate a decision brief with evidence, assumptions, limitations, and open questions.

These are usability goals to test, not already validated results.

---

## 2. Brand and visual direction

### 2.1 Brand personality

- **Credible:** looks appropriate for enterprise strategy and advisory teams.
- **Curious:** helps users explore and investigate instead of pushing a predetermined answer.
- **Grounded:** uses visible sources and clear definitions.
- **Practical:** helps users complete research tasks rather than merely browse dashboards.

### 2.2 Logo and wordmark

For the MVP, use a simple, reproducible wordmark rather than commissioning a complex logo:
- Mark: Lucide `BookOpenCheck` or `BookOpen` icon inside a small evergreen square with slightly rounded corners.
- Wordmark: `GCC Fieldbook` in the main interface font, medium or semibold weight.
- Small descriptor, where useful: `INDIA GCC INTELLIGENCE` in uppercase, compact lettering, and muted color.
- Do not use a literal globe icon as the primary mark; the name's “fieldbook” metaphor should remain recognizable.
- Keep the icon and wordmark crisp at 16–32 px. Do not add an animated logo.

Use the icon from the installed Lucide React package. Do not download or generate an external logo asset for the MVP unless there is a concrete need.

### 2.3 Color system

Default to a light theme. Research, tables, and evidence need high legibility, so the page canvas should be near-white rather than pure white; cards remain white for clear separation.

| Token | Hex | Use |
|---|---|---|
| `--canvas` | `#F5F7F5` | Overall application background |
| `--surface` | `#FFFFFF` | Cards, panels, tables, popovers |
| `--surface-subtle` | `#EEF2EF` | Subtle inset panels, hover backgrounds |
| `--surface-raised` | `#FFFFFF` | Dialogs and floating panels with border/shadow |
| `--ink` | `#182522` | Primary text and strong headings |
| `--ink-secondary` | `#4F605A` | Supporting text and descriptions |
| `--ink-muted` | `#6B7A74` | Metadata, helper copy, timestamps; verify contrast at actual size |
| `--border` | `#DCE4DE` | Card borders, dividers, table rules |
| `--border-strong` | `#C4D0C8` | Emphasized boundaries and input borders |
| `--brand` | `#1F6654` | Primary actions, active navigation, key links |
| `--brand-hover` | `#174F41` | Primary-action hover |
| `--brand-soft` | `#E5F1EB` | Selected states and subtle brand backgrounds |
| `--brand-ink` | `#16483B` | Text/icons on light brand backgrounds |
| `--focus` | `#2563EB` | Visible keyboard focus ring |
| `--success` | `#247448` | Confirmed successful actions or verified workflow state |
| `--success-soft` | `#E8F4EC` | Success background |
| `--warning` | `#8A5700` | Estimates, freshness warnings, and caution states |
| `--warning-soft` | `#FFF3D8` | Warning background |
| `--danger` | `#B42318` | Errors and destructive actions |
| `--danger-soft` | `#FDECEA` | Error background |
| `--info` | `#235FA4` | Neutral informational notices |
| `--info-soft` | `#EAF2FC` | Informational background |

#### Color rules

- Evergreen is the main brand color. Reserve it for primary actions, current navigation, meaningful highlights, and selected elements.
- Avoid using the brand color for every icon, heading, border, and chart. Neutral surfaces should dominate.
- `Verified`, `Estimate`, `Conflicting`, and `Unknown` must each have a text label and icon or other shape cue; color is supplemental.
- Use warning tones for stale or estimated evidence, not for every secondary status.
- Do not place small low-contrast text on a colored surface. Validate token combinations using WCAG contrast checks; aim for at least 4.5:1 for normal text and 3:1 for large text and meaningful UI boundaries.
- Charts should use a restrained palette and include labels or legends. Do not rely on red/green alone to communicate a comparison.

### 2.4 Typography

Use **Geist Sans** for interface typography and **Geist Mono** for IDs, data provenance codes, and technical values where alignment helps. If the selected Next.js starter does not include Geist, use `next/font/google` only when build-time font access is available; otherwise use a close system sans-serif stack. Do not block the build on a remote font.

Recommended stack:

```css
font-family: var(--font-geist-sans), Inter, ui-sans-serif, system-ui,
  -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
```

Use monospace sparingly:

```css
font-family: var(--font-geist-mono), ui-monospace, SFMono-Regular, monospace;
```

#### Type scale

| Role | Desktop size / line height | Weight | Notes |
|---|---|---|---|
| Page title | 28–32 px / 1.2 | 600 | One per page; keep titles short |
| Section heading | 20–22 px / 1.3 | 600 | Primary content sections |
| Card heading | 15–17 px / 1.4 | 600 | Keep consistent across cards |
| Body | 14–16 px / 1.55 | 400 | Default readable copy |
| Table body | 13–14 px / 1.45 | 400 | Never reduce to fit excessive columns |
| Label | 12–13 px / 1.4 | 500 | Forms, table headers, status labels |
| Metadata | 12–13 px / 1.45 | 400 | Dates and secondary provenance |
| Eyebrow | 11–12 px / 1.3 | 600 | Uppercase only for short category labels |

Do not use oversized 56–72 px hero text inside the authenticated/workspace experience. This is a working application, not a campaign landing page. On narrow screens, reduce page titles to 24–26 px and allow headings to wrap naturally.

### 2.5 Spacing, borders, and elevation

Use a 4 px base spacing system. Prefer multiples of 4 for padding, gaps, and component dimensions.

| Token | Value | Typical use |
|---|---:|---|
| `space-1` | 4 px | Icon-to-label micro gap |
| `space-2` | 8 px | Tight component spacing |
| `space-3` | 12 px | Input content and compact lists |
| `space-4` | 16 px | Default component gap |
| `space-5` | 20 px | Dense card padding |
| `space-6` | 24 px | Standard card/content padding |
| `space-8` | 32 px | Page section separation |
| `space-10` | 40 px | Major layout separation |
| `space-12` | 48 px | Large section spacing |

- Card radius: 12 px (`rounded-xl`) by default.
- Input/button radius: 8–10 px.
- Compact status pill radius: full; height usually 22–24 px.
- Modal radius: 16 px.
- Default border: 1 px solid `--border`.
- Use shadows sparingly: popovers/dialogs may have a soft shadow; normal cards should rely on contrast, border, and spacing rather than floating shadows.
- Avoid nesting multiple bordered cards within one another unless the nested evidence group has a clear semantic purpose.

---

## 3. Application shell and navigation

### 3.1 Desktop layout

Use a persistent left sidebar with a content header and a scrollable main area.

- Sidebar width: 232–248 px expanded; 68–76 px collapsed if collapse is implemented.
- Top bar: approximately 64–72 px high.
- Main content maximum width: 1440 px; allow wide tables and comparison panels to use more space where necessary.
- Main content horizontal padding: 32 px on wide desktop; 24 px on smaller desktop.
- Keep page content aligned to a common left edge. Do not center each card independently.

The sidebar contains:
1. **Overview** — `/`
2. **GCC Explorer** — `/gccs`
3. **Location Intelligence** — `/locations`
4. **Research Copilot** — `/research`
5. **Decision Brief** — `/brief`

At the bottom of the sidebar, include a small “Dataset & methodology” link to an in-app section or dialog. Add a simple build/version indicator only if useful for the demo; do not show fake account avatars or decorative workspace names.

### 3.2 Sidebar behavior

- Mark the current route using a soft evergreen background, a clear active icon, and a 3 px leading indicator or another accessible visual cue.
- Navigation items should have a minimum 40 px target height, with 8–10 px vertical gap.
- Tooltips are required if the sidebar is collapsed to icons only.
- On mobile, replace the persistent sidebar with a menu drawer or compact navigation sheet. The current page title and primary action must remain visible.

### 3.3 Top bar

The top bar should show:
- Breadcrumb or current section context on the left when useful.
- A compact global search or “Search GCCs…” entry point where it helps discovery.
- A dataset scope/coverage note or methodology shortcut when relevant.
- No nonfunctional notification bell, fake profile menu, or decorative toolbar actions.

The search control must work. If a global command palette is deferred, the field should navigate to the GCC Explorer with the query populated rather than pretending to search every entity type.

### 3.4 Page framing

Every main page should begin with:
- A page title.
- One short sentence describing the task or scope.
- One primary action if the page has a clear action.
- Optional breadcrumbs on detail pages.

Use a consistent page-header pattern. Do not add hero illustrations or large colored banners inside the workspace.

---

## 4. Page-by-page design specification

### 4.1 Overview dashboard — `/`

**Purpose:** Help a first-time reviewer understand the product and enter the main research workflow.

#### Layout

1. Page header: `GCC intelligence, grounded in evidence` or a similarly concise title.
2. Subheading explaining that the workspace contains a curated, source-linked sample of India's GCC ecosystem.
3. Prominent research question box or search field with example prompt: “We're exploring a 200-person AI engineering GCC in India. What should we compare?” This is an example scenario, not a claim about a real client.
4. Three or four compact metric cards derived from the live/seeded database, such as GCC records, cities represented, evidence sources, and records needing review. Use only values computed from real application records. Include a small caption explaining scope.
5. “Continue your research” workflow panel with links to Explore GCCs, Compare locations, and Ask the copilot.
6. A short “How to read this data” note explaining source dates and verification labels.

#### Rules

- Never hardcode impressive-looking counts such as “2,117 GCCs” if that number is not the actual count of the local dataset.
- Do not use a large pie chart simply to fill space. One useful chart is better than three decorative ones.
- If no recent evidence events are actually recorded, omit “Recent activity” rather than inventing activity.
- The main question field should navigate to the Research Copilot and carry the prompt, or prefill a supported input. It must not be an inert search mockup.

### 4.2 GCC Explorer — `/gccs`

**Purpose:** Find and inspect GCC records.

#### Layout

- Header: `GCC Explorer`; supporting text clarifying the current dataset scope.
- Search field with clear button.
- Filter row or filter popover for city, industry/sector, parent company, and business function. Only offer filters backed by stored fields.
- Result count based on current filtered results.
- Main results table on desktop; structured rows/cards on mobile.
- Empty state with filters reset action.

#### Suggested desktop columns

1. Company / GCC name — primary text, optional parent company as secondary text.
2. City — use canonical city value.
3. Function or sector — concise chips, limit visible chips and show overflow on demand.
4. Evidence status — text badge.
5. Last checked — date or `Not recorded`.
6. Open — row click or explicit `View record` action.

Do not show employee counts, founding dates, or headcount trends unless those values exist with an appropriate source, unit, period, and verification status.

#### Interactions

- Search is debounced only if needed; show a small pending state when the request is in progress.
- Filters combine predictably using AND across fields; document any OR behavior within a multi-select.
- Filter state should be reflected in the URL when practical, so a reviewer can refresh or share a search.
- Row hover is subtle and must not obscure selection or keyboard focus.
- Clicking a row opens `/gccs/[id]`; interactive elements within a row must not accidentally trigger the same navigation twice.

### 4.3 GCC profile — `/gccs/[id]`

**Purpose:** Show what is known about one GCC record and where that information came from.

#### Layout

- Breadcrumb: `GCC Explorer / [Company]`.
- Header with company name, parent company when known, location, and a clearly labeled record status.
- Summary section for known attributes only: sector, functions, Indian locations, and relevant dates.
- `Evidence` section as a core element, not a collapsed footnote. Each evidence item includes title, publisher, source type, source date if known, last checked, short claim or excerpt, and an `Open source` link.
- `Data gaps and conflicts` section when present. Explain what is unknown or why evidence differs.
- Related records only when supported by explicit relationships in the data model.

#### Rules

- Do not show an invented logo; use a monogram placeholder when no approved logo asset is available.
- Do not label a company “Verified GCC” solely because a search result or directory mentions it. The status must follow `DATA_TRUST.md` verification criteria.
- Distinguish `Unknown`, `Not collected`, and `Conflicting evidence` where possible.
- External source links should open safely in a new tab with appropriate `rel` attributes.

### 4.4 Location Intelligence — `/locations`

**Purpose:** Compare locations for a stated business scenario without implying unsupported precision.

#### Layout

1. Header: `Location Intelligence` plus description of the selected comparison scope.
2. Scenario controls: target business function, headcount range if the data supports it, and priority criteria. Keep the default form short.
3. City selection: choose two to four cities from the available dataset.
4. Comparison table with rows representing indicators and columns representing cities.
5. Evidence drawer or expandable details for the selected indicator.
6. Summary of data coverage and missing indicators.

#### Comparison table behavior

- Each indicator row shows a label, value, unit, period/date, and evidence affordance.
- Do not compare values with different units or periods as if directly equivalent. Flag incompatible comparisons.
- Missing values show `No comparable data` or `Not available`, not zero.
- If a composite score is implemented, provide a visible `How scoring works` control with weights, direction, normalization method, and treatment of missing values. Provide a way to inspect raw data alongside any score.
- The AI may summarize the comparison but must not create absent rent, salary, talent, or incentive numbers.
- A map is optional. Do not include a map unless city locations and map behavior work and add genuine value.

### 4.5 Research Copilot — `/research`

**Purpose:** Help a user ask research questions and inspect the supporting evidence.

#### Layout

- Page title and one-line description that the copilot answers from the current GCC Fieldbook dataset.
- Compact suggested prompts, e.g. “Find GCCs with engineering functions in Chennai,” “What evidence supports comparing Bengaluru and Hyderabad?”, “Why do published GCC counts differ?” Include only prompts the data can reasonably support.
- Clear conversation/query input with send button and keyboard affordances.
- Answer area with readable paragraphs and short lists, not a wall of text.
- Inline citation chips such as `[1]` that open an evidence panel or source record.
- Evidence panel showing the retrieved records and source metadata.
- Clear `Insufficient evidence` treatment if the retrieved dataset cannot answer the query.

#### Interaction details

- Enter submits; Shift+Enter inserts a line break if a multiline composer is used.
- Disable the send button only while a request is in progress or the input is invalid; show why if disabled.
- Show a specific loading state such as “Retrieving relevant records…” followed by “Preparing evidence-backed answer…” only if these represent actual stages. Avoid fake streamed typing.
- Keep the user's question visible above its answer.
- Give the user a way to retry a failed request without losing the input.
- Any “Copy answer” action must copy real answer text and source links.
- If the AI response contains a citation ID not included in the server-provided evidence packet, reject or remove the citation and show a safe fallback; never display a fabricated source URL.
- User-submitted prompt and source text must be treated as untrusted data.

### 4.6 Decision Brief — `/brief`

**Purpose:** Turn the current research into a client-ready, preliminary decision document.

#### Layout

- Header: `Decision Brief` with description that the brief is preliminary and data-dependent.
- Input/context summary: the user's question and comparison configuration. Allow returning to adjust the inputs.
- Brief sections: question and scope, preliminary shortlist, rationale by location, supporting evidence, assumptions, data gaps, risks, and next questions.
- Sources section with numbered, clickable references.
- Actions: `Copy brief`, `Download Markdown`, and `Back to comparison` if those actions are implemented.

#### Rules

- The report must distinguish observations from recommendations and assumptions.
- Every material factual claim should include a clickable evidence reference or an explicit “not sourced in the current dataset” label.
- The product must not phrase a preliminary shortlist as a guaranteed optimal choice.
- If no supported comparison exists, offer to return to Location Intelligence rather than generate a confident empty report.
- If generated in the browser, preserve the output in session state while the user navigates through the demo where practical. Do not promise persistent cloud storage when none exists.

### 4.7 Dataset and methodology panel

Provide a simple page, drawer, or dialog accessible from the sidebar. It should explain:
- The current dataset is curated for the assessment prototype and is not a complete official registry.
- What constitutes a GCC record for this project and what it does not prove.
- Source types and how they are assessed.
- Meaning of `Verified`, `Estimate`, `Conflicting`, and `Unknown` labels.
- How city comparisons are constructed and how missing data is treated.
- The last refresh/verification dates where available.

This panel is an important trust feature, not legalistic fine print.

---

## 5. Reusable components

Build a small design system instead of styling every page separately. Reuse the installed shadcn/ui primitives and Lucide React icons where practical.

### 5.1 Core components

- `AppShell` — responsive sidebar, topbar, content frame.
- `PageHeader` — title, description, breadcrumbs, primary action.
- `SearchInput` — label/placeholder, clear action, loading indicator, empty/error handling.
- `FilterBar` and `FilterPopover` — filters derived from available fields.
- `MetricCard` — value, label, context/date, optional trend only when actual temporal data exists.
- `GccTable` / `GccListItem` — responsive record display with keyboard-accessible navigation.
- `EvidenceCard` — claim or excerpt, publisher, type, dates, verification state, source link.
- `EvidenceStatusBadge` — text plus icon and color; never color alone.
- `SourceLink` — safe external link with external-link icon and accessible name.
- `DataCoverageNote` — visible note about sample scope, date coverage, and missingness.
- `EmptyState` — clear reason plus a useful next action.
- `ErrorState` — readable explanation, retry action where possible, and no raw stack traces.
- `LoadingSkeleton` — approximate final layout to prevent layout jumps.
- `CityComparisonTable` — shared labels/units/periods and missing-data treatment.
- `CitationChip` — clickable reference to a known evidence record.
- `EvidenceDrawer` — detailed source and claim panel.
- `ChatMessage` / `CopilotComposer` — answer formatting and query controls.
- `DecisionBriefView` — report sections and copy/download actions.
- `Toast` — transient confirmation for copy/save/retry actions; do not use it to hide persistent errors.

### 5.2 Component rules

- Use real `<button>`, `<a>`, `<input>`, `<table>`, and form semantics through the component library. Avoid clickable `div` elements.
- Every icon-only action needs an accessible label and tooltip where the purpose is not obvious.
- Every input needs a visible label or programmatic accessible name; placeholder text is not the label.
- Keep row heights comfortable: 48–56 px for standard data rows where feasible, and at least 40 px for compact interactive rows.
- Table headings should be sticky only if it improves long-list use and does not cause layout bugs.
- Avoid putting a button inside another button or nested interactive targets inside clickable table rows.

---

## 6. Data-status and evidence design

The design system must encode the data-trust model defined in `DATA_TRUST.md` once that document is written. Until then, use the provisional labels below consistently and avoid implying certification beyond the data rules.

| Status | Suggested icon | Visual treatment | Meaning |
|---|---|---|---|
| Verified | Check-circle | Green text on light green | Reviewed against the project's verification criteria |
| Estimate | Calculator or chart-no-axes-combined | Amber text on light amber | Approximate value, modeled value, or value reported as an estimate |
| Conflicting | Git-compare or triangle-alert | Amber/neutral with explicit label | Relevant sources disagree or may measure different things |
| Unknown | Circle-help | Neutral gray | Evidence is insufficient to substantiate a value |
| Not collected | Minus-circle | Neutral gray | This field has not been collected for the current dataset |
| Stale / review due | Clock-alert | Amber | The verification/refresh policy says the record should be reviewed |

A record may have individual fields with different evidence quality. Do not let one verified field make the entire record appear verified if other material fields remain uncertain. Prefer status at the **claim/field level** when data supports it.

### 6.1 Evidence card hierarchy

Each evidence card should present information in this order:
1. What claim or field the source supports.
2. Source title and publisher.
3. Source date and last-checked date, when known.
4. Evidence type/status.
5. Short relevant excerpt or explanation, when licensed and useful.
6. `Open source` action.

Do not reproduce long copyrighted passages in the UI. Use short excerpts only where appropriate, with a link to the original source.

### 6.2 Citation presentation in AI answers

- Place citations immediately after the sentence or paragraph they support.
- Use stable in-app evidence IDs for citation lookup; do not rely on the model generating raw URLs.
- Citation chips must open the exact source or in-app evidence record selected by the server.
- If one sentence contains multiple claims backed by different sources, cite each relevant source.
- Do not render citations as decoration. Every citation must function.

---

## 7. Tables, filters, and information density

GCC Fieldbook is a data-oriented product. Tables should support scanning before deep reading.

### 7.1 Table design

- Header background: `--surface-subtle` or plain surface with a bottom border.
- Header labels: 12–13 px, medium weight, muted ink, consistent casing.
- Rows: 48–56 px high; allow a row to grow for wrapped content where necessary.
- Numeric values: right-align where comparisons benefit; use tabular numerals (`font-variant-numeric: tabular-nums`).
- Units should appear alongside the value or in the header—not be hidden in a tooltip only.
- Use light horizontal dividers; avoid heavy grid borders around every cell.
- Keep the first identifying column visually stable on wide tables if the library supports it without harming mobile use.
- Use a clear `No results` state and a reset-filters action.
- Paginate or limit results rather than rendering hundreds of DOM rows at once.

### 7.2 Filtering

- Use inline filters for the two or three most important dimensions; move secondary filters into a popover.
- Display active filters as removable chips and provide `Clear all`.
- Preserve selected filter values when opening a record and returning to the list where practical.
- Do not offer filters for fields that are absent, empty for all records, or not normalized.
- On mobile, show active filter count and use a full-width filter sheet with Apply/Reset actions.

### 7.3 Numeric and date formatting

- Use one date presentation style consistently, preferably `13 Oct 2026` in visible metadata and ISO `YYYY-MM-DD` for machine-readable IDs/records.
- Explicitly label periods for metrics: for example, `FY2025` or `as of Mar 2026`, not merely `2025` when the distinction matters.
- Do not mix lakh/crore and million/billion formats within one comparison without explaining the unit.
- Display `—` only for truly inapplicable values; use `Not available` or `Unknown` when the value is relevant but missing.
- Use `~` or an `Estimate` badge only if the underlying data is actually estimated and the method/source is documented.

---

## 8. Forms and interaction patterns

### 8.1 Forms

- Use persistent labels above inputs for short forms and scenario controls.
- Add helper text when a field has non-obvious meaning, units, or a constraint.
- Validate on blur or submission; avoid aggressive error messages on every keystroke.
- Put field errors beside the relevant control and summarize form-level errors at the top when needed.
- Preserve valid input after API failures.
- Disable an action only when necessary; explain unavailable actions through nearby helper text or `aria-describedby`.

### 8.2 Buttons

- Primary: solid `--brand` background, white text; one main primary button per major panel where possible.
- Secondary: white/transparent surface with a clear border.
- Tertiary/ghost: low emphasis for minor actions such as opening source detail.
- Destructive: use danger treatment only for destructive operations; the MVP should have few or none.
- Button labels should describe outcomes: `Compare cities`, `Ask copilot`, `Generate brief`, `Open source`—not vague labels such as `Go` or `Submit`.
- Every button must work or be omitted. No inert visual controls.

### 8.3 Loading and feedback

- Use skeletons for dashboard cards, tables, and evidence panels when the final layout is known.
- For AI actions, show a localized pending state, prevent accidental duplicate submissions, and provide a timeout/failure message with a retry action.
- On copy/download, show brief confirmation and handle browser restrictions/errors.
- Do not fabricate progress percentages for unknown processing time.
- Use `aria-live` for important asynchronous status changes when appropriate.

### 8.4 Empty states

A useful empty state has three parts: what happened, why it may have happened, and what the user can do next.

Examples:
- Search results empty: “No GCCs match these filters.” Actions: `Clear filters`, edit search.
- Evidence absent: “No source has been recorded for this field yet.” Do not display a verified badge.
- Copilot insufficient evidence: “The current dataset does not contain enough evidence to answer this confidently.” Actions: inspect related records or broaden the question.
- Comparison incomplete: “These cities do not have comparable data for all selected indicators.” Actions: view available fields or remove unavailable indicators.

---

## 9. AI response and generated-report presentation

### 9.1 AI answer format

Prefer a predictable answer structure:
1. **Direct answer** — brief, conditional, and grounded.
2. **Why** — two to five key points where useful.
3. **Evidence** — inline source citations, openable by the user.
4. **Limitations / missing data** — explicit where material.
5. **Next question** — optional and only when it helps continue the workflow.

Do not force every answer into all five sections when a two-sentence factual response is sufficient. The goal is clarity, not template verbosity.

### 9.2 Visual distinction

- The AI message must be visually integrated with the workspace, not displayed as a floating cartoon robot.
- User prompts and generated responses should be visually distinguishable but both remain readable.
- Use a small AI label/icon, not a large glow or animated gradient.
- Source citations should be part of the content flow.
- Label generated recommendations as `Preliminary` or `Evidence-based synthesis` where appropriate; don't use a badge that implies a recommendation is objectively proven.

### 9.3 Decision brief

The generated brief should resemble a concise analyst memo:
- Report title and preparation date.
- Research question and stated scope.
- Executive finding / preliminary shortlist.
- Comparison criteria and evidence-backed rationale.
- Sources close to relevant claims, plus a numbered references section.
- Assumptions, missing information, risks, and questions to resolve next.

Use a restrained printable style with white background, black/ink text, clear headings, and visible source links. When exporting Markdown, preserve real URLs and source names. Do not make “Export PDF” visible until it works reliably.

---

## 10. Responsive behavior

### 10.1 Breakpoint guidance

Use Tailwind's configured breakpoints by default unless layout testing provides a reason to adjust them. Design against these practical ranges:

- **Mobile:** below 640 px.
- **Tablet:** 640–1023 px.
- **Desktop:** 1024–1439 px.
- **Wide desktop:** 1440 px and above.

### 10.2 Desktop

- Expanded sidebar remains visible.
- Filter controls and tables use available width.
- Comparison table may scroll horizontally if necessary, with the row labels kept legible.
- Copilot answer and evidence panel may use two columns on wide screens.

### 10.3 Tablet

- Sidebar may collapse to icon navigation or a drawer.
- Cards can use two-column layout.
- Tables may scroll horizontally; do not shrink every column until values become unreadable.
- Copilot evidence panel may appear below the answer instead of beside it.

### 10.4 Mobile

- Use drawer/sheet navigation and a single-column content flow.
- Page margins: approximately 16 px; card padding: 16 px.
- Tables should become structured rows/cards for simple records or use a clearly indicated horizontal scroll for true comparisons.
- Move secondary filters into a full-screen or bottom-sheet experience.
- Copilot composer should remain reachable without obscuring content; account for the on-screen keyboard.
- Primary actions should be reachable, ideally near the relevant content; use sticky bottom actions only when they do not cover information.
- Touch targets should be about 44 × 44 px where practical.

### 10.5 Responsive acceptance criteria

- No horizontal overflow at 360 px for general pages, excluding a deliberately scrollable table region.
- Search, filters, citations, source links, and brief actions remain usable at narrow widths.
- Focus rings are visible in both desktop and mobile navigation.
- Text does not overlap icons or clip inside status badges.

---

## 11. Accessibility requirements

Target **WCAG 2.2 AA** practices where feasible for the assessment prototype.

- Semantic heading hierarchy: one `h1` per page; sections use sensible `h2`/`h3` levels.
- Full keyboard support for navigation, filters, tables, drawers, dialogs, and copilot composer.
- Visible focus indicators; do not remove the browser outline without a clear replacement.
- Sufficient color contrast for text, control boundaries, and states.
- Status must not be conveyed by color alone; always show a readable label or equivalent text.
- Label inputs and provide understandable error messages.
- Use `aria-label` only when a visible label is not available or a control needs additional context.
- Provide accessible names for icon-only buttons.
- Dialogs/drawers should trap focus appropriately while open, close on Escape where expected, and return focus to the trigger.
- Respect reduced-motion preferences and avoid relying on motion to convey state.
- Charts need a visible legend and a textual summary or data table for key values.
- Do not make tiny text the only place a critical source date or limitation appears.

---

## 12. Motion and transitions

Motion should help people understand state changes, not make the product feel busy.

- Use brief transitions around 120–180 ms for hover, focus, disclosure, and navigation state changes.
- Use subtle opacity/transform changes for menus and drawers.
- Do not animate chart values in a way that makes the data appear more dramatic.
- Avoid parallax, floating gradients, animated noise, looping skeleton shimmer, and decorative motion.
- Honor `prefers-reduced-motion: reduce`.
- Use a spinner only for short indeterminate actions; use skeletons for known page structures.

---

## 13. Charts and data visualizations

Use charts only when they clarify a comparison or trend supported by available data.

- Use Recharts only for charts that the chosen MVP actually needs.
- Always show the metric name, units, source period, and a legend when there are multiple series.
- Include accessible textual values or a table alternative.
- Avoid 3D charts, pie charts with many slices, dual axes, truncated bars that exaggerate differences, and unlabeled color legends.
- Bar charts should normally begin at zero when bar length encodes magnitude. If a non-zero baseline is justified, make it explicit.
- Use consistent scale and units when comparing cities.
- Never graph fabricated sample values as if they were market data. If placeholder content is needed during development, mark it visibly as sample/illustrative and remove it from the final demo unless it is explicitly part of the disclosed seed dataset.
- Small KPI cards should report counts or coverage only when computed from current stored records.

---

## 14. Content and microcopy

### 14.1 Voice

Clear, analytical, grounded, and helpful. Avoid exaggerated claims such as “revolutionary AI,” “perfect recommendations,” or “the definitive source of truth.” The product is building trust through transparency.

### 14.2 Preferred terms

- `GCC` or `Global Capability Centre` on first mention in explanatory copy.
- `Evidence` for a source-backed claim or claim-supporting record.
- `Source` for the publisher/document/page that can be opened.
- `Last checked` for our verification timestamp.
- `Published` for the source's own publication date.
- `Estimate` only for a value explicitly identified as estimated.
- `Preliminary shortlist` for early recommendations.
- `Not available` for a relevant value missing from the data.
- `Unknown` when there is not enough evidence to establish a fact.

### 14.3 Avoid

- “Verified” without an established process.
- “Real-time” unless the data truly refreshes in real time.
- “Complete database” or “all Indian GCCs” for a curated prototype.
- “AI found” without identifying the source and retrieval process where material.
- Arbitrary percentage indicators such as `92% confidence` unless a meaningful, validated methodology supports them.
- Fake testimonials, company logos implying endorsement, or fabricated provider ratings.

### 14.4 Example microcopy

**Dataset notice:** “This is a curated research dataset for the GCC Fieldbook prototype. Coverage varies by city, field, and source date.”

**AI limitation:** “I couldn't substantiate that from the records currently available. Try a broader query or inspect the related sources.”

**City comparison gap:** “No comparable value is available for this indicator in one or more selected cities.”

**Evidence status:** “Last checked 13 Oct 2026” only when this is the true application verification date.

---

## 15. Design implementation guidance

### 15.1 Recommended primitives

- Next.js App Router and React Server Components where appropriate.
- Tailwind CSS design tokens via CSS variables.
- shadcn/ui components for accessible dialogs, dropdowns, tables, inputs, select menus, tooltips, and toasts.
- Lucide React for consistent line icons.
- Recharts for selected data visualizations only.

Avoid adding a second component framework or icon library. Use the project's installed package versions rather than copying setup commands from stale tutorials.

### 15.2 CSS token example

```css
:root {
  --canvas: #f5f7f5;
  --surface: #ffffff;
  --surface-subtle: #eef2ef;
  --ink: #182522;
  --ink-secondary: #4f605a;
  --ink-muted: #6b7a74;
  --border: #dce4de;
  --border-strong: #c4d0c8;
  --brand: #1f6654;
  --brand-hover: #174f41;
  --brand-soft: #e5f1eb;
  --focus: #2563eb;
  --success: #247448;
  --warning: #8a5700;
  --danger: #b42318;
}
```

The actual `globals.css` should map these values to the installed Tailwind/shadcn semantic variables (e.g. background, foreground, card, border, primary, secondary, muted, destructive, ring). Do not copy a separate shadcn theme blindly if it overrides this palette.

### 15.3 Code organization

Keep UI components close to the feature they serve. Reusable visual primitives belong in shared UI components; domain components such as `EvidenceCard` and `CityComparisonTable` should live in feature/shared product components. Keep database and AI server code out of client components.

### 15.4 Do not overengineer

- Do not build a custom charting system or a complex animation layer.
- Do not create a full design-token package; CSS variables and Tailwind are enough.
- Do not build dark mode unless all main views, charts, contrast states, and dialogs can be tested.
- Do not create a landing page, pricing page, or login UI unless the PRD changes.
- Do not create a fake multi-tenant workspace or fake account controls for visual completeness.

---

## 16. Definition of done for the design phase

The design phase is complete when:

- [ ] Color, typography, spacing, border, radius, and focus tokens are implemented centrally.
- [ ] App shell and responsive navigation work at desktop, tablet, and mobile widths.
- [ ] All P0 pages have a consistent title, description, and content hierarchy.
- [ ] GCC table/profile surfaces make source evidence and record limitations discoverable.
- [ ] City comparison labels values, units, source periods, and missing fields correctly.
- [ ] Copilot answers display useful citations and insufficient-evidence states.
- [ ] Decision brief reads like a concise analyst memo and preserves source links when copied/downloaded.
- [ ] Loading, empty, error, selected, hover, focus, and disabled states are implemented for the critical journey.
- [ ] No visible control is inert or misleading.
- [ ] No fabricated counts, fake data freshness, fake ratings, or unsupported confidence scores appear in the final demo.
- [ ] Basic keyboard navigation and contrast checks are complete.
- [ ] Screenshots of the main workflow are reviewed at desktop width and at a narrow mobile width.

## 17. Review checklist for each new screen

Before marking a screen complete, ask:

1. Is the main task obvious within a few seconds?
2. Is every visible action functional?
3. Are facts, estimates, unknowns, and conflicting claims distinguished correctly?
4. Can the user find the underlying source for important claims?
5. Does the layout remain readable at narrow widths?
6. Are keyboard focus and control labels accessible?
7. Are loading, empty, and error states handled?
8. Is any chart or metric purely decorative or unsupported? Remove it if so.
9. Does the screen follow the PRD instead of introducing scope creep?
10. Does the screen help the user progress toward a defensible decision?

---

## 18. Implementation priority

Implement the design system in this order:

1. **Foundation:** fonts, CSS variables, color/spacing tokens, base layout, buttons, inputs, badges, typography, focus styles.
2. **App shell:** sidebar, topbar, page framing, responsive navigation.
3. **Explorer surfaces:** GCC table, filters, empty/loading states, profile layout, EvidenceCard and source links.
4. **Location comparison:** criteria controls, comparison table, missing-data and methodology presentation.
5. **Copilot:** composer, message layout, citation chips, evidence drawer, insufficient-evidence and failure states.
6. **Decision brief:** memo styling, references, copy/download actions, print-friendly presentation if supported.
7. **Polish and test:** keyboard pass, mobile layout, contrast checks, no-overflow checks, remove placeholders and inert controls.

Do not polish the dashboard while the core evidence-to-decision workflow is still broken. Functional credibility takes priority over decorative perfection.
