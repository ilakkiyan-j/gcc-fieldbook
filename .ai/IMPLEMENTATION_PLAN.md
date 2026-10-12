# GCC Fieldbook — Phased Implementation Plan

> **Product:** GCC Fieldbook  
> **Tagline:** The working guide to India's GCC ecosystem.  
> **Document:** Implementation plan and AI coding-agent operating protocol  
> **Version:** 0.2 — collaborative checkpoints and page-by-page UI approval  
> **Status:** Execute one approved phase at a time; pause for user approval at each phase and each UI-page checkpoint  
> **Primary references:** [`RESEARCH.md`](./RESEARCH.md), [`PRD.md`](./PRD.md), [`ARCHITECTURE.md`](./ARCHITECTURE.md), [`DESIGN.md`](./DESIGN.md), [`DATA_TRUST.md`](./DATA_TRUST.md), [`AI_COPILOT.md`](./AI_COPILOT.md)  
> **Operational log:** [`log.txt`](./log.txt)

---

## 1. Purpose

This document is the execution contract for building the GCC Fieldbook assessment MVP. It translates product, design, data, architecture, and AI requirements into ordered implementation phases, tasks, acceptance gates, and test evidence.

The agent must build a sequence of small, testable vertical slices. It must not attempt to implement the entire application in one pass, silently skip a failed checkpoint, or spend time on secondary features while a P0 journey is broken.

### Core outcome

Deliver a deployed, responsive, usable research workflow:

**Discover a GCC → inspect its evidence → compare locations → ask the AI copilot → generate a decision brief.**

The app must show a curated dataset honestly, preserve evidence provenance, expose limitations, and never pretend to cover every GCC in India.

### 1.1 Source-of-truth hierarchy

When instructions or details conflict, follow this order and record any material resolution in `DECISIONS.md`:

1. `PRD.md` — product scope, user journeys, and product acceptance criteria.
2. `DATA_TRUST.md` — evidence semantics and data-quality rules.
3. `ARCHITECTURE.md` — approved system boundaries, schema concepts, APIs, and security.
4. `AI_COPILOT.md` — AI retrieval, prompting, citation, and evaluation rules.
5. `DESIGN.md` — visual system and screen behavior.
6. This document — phase order and execution protocol.
7. `RESEARCH.md` — market context and research hypotheses.

This ordering does not mean lower-ranked documents may be ignored. It resolves conflicts only. Any apparent contradiction that changes scope, architecture, or trust behavior must be recorded and reconciled before implementing the affected feature.

### 1.2 Hard constraints

- The deadline is 72 hours from the assignment email. Prioritize the complete end-to-end core journey over breadth.
- Use a curated, source-backed dataset rather than attempting broad automated crawling.
- Use Next.js App Router, React, strict TypeScript, Tailwind CSS, shadcn/ui where helpful, Supabase PostgreSQL, the official `@google/genai` SDK, Zod, and Vercel unless the repository already contains a coherent setup that should be preserved.
- No vector database, separate Python service, autonomous multi-agent framework, paid marketplace, authentication, or elaborate background pipeline in the MVP unless a real P0 requirement proves it necessary.
- No fabricated records, fabricated citations, false validation claims, or invented market statistics.
- Do not expose Gemini API credentials, Supabase service-role credentials, or other server secrets to the browser or source control.
- Keep the application useful if the AI service is unavailable: explorer and comparison must still work.
- If a provider credential is unavailable, implement and test a clearly labeled deterministic demo fallback where appropriate; do not imply that fallback is live AI.

---

## 2. Definition of the MVP

### 2.1 P0 — required for submission

- [ ] Application shell and clear navigation.
- [ ] Overview dashboard with counts calculated from the actual dataset and clear coverage wording.
- [ ] GCC Explorer with search, working filters, result count, loading/empty/error states, and detail navigation.
- [ ] GCC/centre profile showing available fields and field-level evidence/source information.
- [ ] Evidence/source details: title, publisher, URL, type, publication date when known, and last-checked date.
- [ ] City comparison for at least two cities using sourced indicators and visible units, periods, source links, missing values, and comparison methodology.
- [ ] AI Research Copilot that retrieves relevant records before calling Gemini and validates citation IDs against retrieved evidence.
- [ ] Decision Brief generated from the user's question and the available comparison/evidence, with citations, assumptions, limitations, and open questions.
- [ ] Seed SQL/migrations and a reproducible way to initialize the curated dataset.
- [ ] Public deployment with server-side secrets and responsive layouts.
- [ ] P0 tests pass; the live demo is verified in a clean browser session.

### 2.2 P1 — only after all P0 gates pass

- [ ] Provider profiles with the distinction between self-reported and independently corroborated claims.
- [ ] Methodology explainer for differing GCC counts.
- [ ] Copy or download brief as Markdown; optional print/export.
- [ ] Suggested copilot prompts for the primary demo scenario.
- [ ] Simple source-freshness filter.
- [ ] Compare up to four cities if the interface remains readable and data is comparable.

### 2.3 Explicitly out of scope

- Comprehensive national database coverage.
- Automated, continuous web crawling or monitoring.
- Public provider quality rankings or reviews without defensible evidence.
- User accounts, workspace persistence, collaboration, billing, or paid subscriptions.
- Community editing, crowdsourced data, or marketplace transactions.
- Vector embeddings, a vector database, autonomous agents, or separate services without a demonstrated need.
- Complex maps that are decorative or use unsourced coordinates.

### 2.4 Scope-cut rule

If a phase slips, remove or postpone P1 work first. Do not reduce evidence integrity, security, source traceability, core error handling, or final demo verification to preserve decorative polish or extra features.

### 2.5 Mandatory phase workflow: PLAN → CREDENTIALS → APPROVAL → EXECUTE → VERIFY → UPDATE

**This workflow is mandatory for every phase, sub-phase, and meaningful UI-page checkpoint.** Do not silently skip any stage.

#### Step A — PLAN

Before changing files for a phase, prepare a compact plan that states:

- Phase/checkpoint ID and goal.
- Why the work is needed now and its dependencies.
- Exact tasks and intended scope.
- Files/directories likely to change.
- Technical, product, or visual decisions that need the user's input.
- Acceptance criteria and the commands/manual checks that will verify them.
- Estimated effort and impact on the 72-hour deadline.
- What will explicitly not be done in this checkpoint.

Inspect existing code and relevant documents before finalizing the plan. The plan should be specific to the current repository state, not a generic copy of this document.

#### Step B — CREDENTIAL AND ACCESS CHECK

For every phase, tell the user which credentials or external access are required **before attempting work that depends on them**. State:

- Service/provider and why it is needed.
- Exact environment variable name(s), where defined by the actual implementation.
- Whether each item is **Required now**, **Required later**, **Optional**, or **Not needed**.
- Where the user can obtain/configure it, without asking them to paste secret values into chat.
- Safe storage location and whether the value is server-only.
- What work/tests can proceed without it and what functionality will remain unverified.

Never ask the user to paste API keys into chat. Never place secrets in `.ai/`, source files, screenshots, Git, logs, client-side bundles, or `.env.example`. Use `.env.local` for local secrets and provider dashboard settings for deployment secrets. Do not log secret values. Do not request a Supabase service-role key unless an exact server-side administrative need has been demonstrated; never expose it in the browser.

Credential expectations by phase are conditional, not assumptions:

| Phase/checkpoint | Typical requirement | Can work continue without it? |
|---|---|---|
| Phase 0 — repository inspection | None for read-only inspection | Yes; inspect the repo first |
| Phase 1 — application foundation | Usually none | Yes; local scaffolding and build checks should proceed |
| Phase 2 — hosted data integration | Supabase project URL and publishable/anon key for configured client integration; database access or Supabase CLI for remote migrations as applicable | Local types, SQL review, and UI-independent work can proceed; hosted integration remains unverified |
| UI design discussion and UI page checkpoints | No API keys for design review itself | Yes; use real layout/design work without needing external credentials |
| AI Copilot | Gemini API key for live model requests | Yes; develop/review retrieval and a clearly labeled deterministic fallback, but do not claim live AI verification |
| QA and deployment | Vercel authorization or connected deployment environment; Supabase/Gemini secrets configured in deployment if those integrations are live | Local tests proceed; public deployment/live service checks remain blocked until configured |
| Submission | Public URLs and access to deck/prototype destinations | Prepare materials, but do not claim the links were tested until they have been opened in a clean session |

The exact credentials for a phase must be checked against the chosen implementation and actual environment. The table is a guide, not permission to invent variable names or request unnecessary privileges.

#### Step C — USER APPROVAL CHECKPOINT

After presenting the plan and credential requirements, **stop and wait for the user's explicit approval before executing that phase**. Accept clear instructions such as “approve”, “go ahead”, or a specific modification. If the user requests changes, revise the plan and seek approval again.

Do not bundle several unapproved phases into one execution. Approval of a phase authorizes only the scope described in that phase plan. It does not authorize subsequent phase execution.

Read-only inspection needed to prepare Phase 0 can be proposed first; after the initial repository findings are available, still present the Phase 0 execution plan and any access requirements before making changes.

#### Step D — EXECUTE

After approval:

- Implement only the approved scope.
- Preserve existing user work and follow the established project conventions.
- Avoid unrelated refactors or surprise design changes.
- If new scope, a new dependency, a schema change, a new credential, or a material design decision becomes necessary, stop the affected work, explain the reason and options, update the plan if approved, and wait for the user's decision.
- If a credential is missing, continue independent work only when safe; clearly mark the integration as blocked or in fallback mode.

#### Step E — VERIFY

Run the tests and manual checks planned for the checkpoint. Report actual commands and outcomes. Inspect the diff for accidental changes and secret leakage. Do not mark unrun checks as passed.

#### Step F — UPDATE THE CHECKLIST AND LOG

At the end of **every phase, failed phase, blocked phase, and approved UI-page checkpoint**, update both files:

1. `.ai/IMPLEMENTATION_PLAN.md` — check only verified tasks; mark tasks `IN PROGRESS`, `BLOCKED`, or `NOT RUN` when appropriate; add actual test outcome and the next checkpoint.
2. `.ai/log.txt` — append a timestamped entry with files changed, commands, test outcomes, manual verification, decisions, blockers, credential status (never values), gate result, and next action.

Do this even when a phase fails, is blocked by credentials, or results in no code changes. Never erase historical log entries. Then show the user a concise checkpoint report and **stop**. The next phase starts only after separate approval.

### 2.6 UI-first collaboration protocol

UI quality is a top priority. The agent must not silently choose the final design direction and implement all screens in one pass.

#### Global design direction — discussion required before final UI styling

Before implementing the final visual design, present a few clear, practical choices and trade-offs for:

- Typography/font family and scale.
- Color palette, light/dark theme strategy, and contrast.
- Information density and page layout style.
- Sidebar/header/navigation behavior.
- Icons (e.g., Lucide, custom SVG, or a deliberate mix).
- Component approach (e.g., shadcn/ui primitives with tailored product components versus fully custom components).
- Borders, radius, shadows, charts, tables, motion, and responsive behavior.
- Any product-specific visual details in `DESIGN.md` that need a decision.

Ask the user to choose or customize the direction. Do not force a long questionnaire: present the most consequential decisions together and allow the user to delegate choices to the agent. If the user delegates, choose a coherent direction, explain the choice briefly, and record it in `DECISIONS.md`.

The global direction approval covers tokens and shared visual language only. It does **not** automatically approve the detailed design of every page.

#### Page-by-page design and implementation

Implement one UI page at a time. Use this sequence for every page or major page-specific view:

1. **Discuss:** State the page goal, target user action, content hierarchy, layout proposal, components, typography, icons, interaction states, responsive behavior, and evidence/data details to display.
2. **Reference/source-code choice:** Ask whether the user wants to provide a screenshot, design reference, or component/source code, or whether the agent should implement it. The default is for the agent to develop and maintain the code itself; user-provided assets are optional, not a dependency.
3. **Preview plan:** Describe or show a wireframe, component breakdown, or visual direction before coding. If image/reference generation or screenshot rendering is available and useful, offer it as a design artifact; do not substitute a static image for a working interface.
4. **Approval:** Wait for explicit approval of that page's proposal.
5. **Implement:** Code only that page and the shared components it needs. Reuse approved design tokens; do not redesign the entire application without approval.
6. **Run and review:** Start the app, inspect the page at desktop and mobile sizes, and capture screenshots under `docs/ui-review/` when the environment supports it. Verify real interactions, loading/empty/error states, accessibility basics, and source/evidence behavior.
7. **Feedback and revision:** Show the actual result or screenshots, ask for feedback, and apply requested revisions within the approved scope. If a request materially changes the design system or another page, describe the impact and get approval first.
8. **Page acceptance gate:** Verify the page against its agreed acceptance criteria. A visual mockup alone does not pass if the page is meant to work with data.
9. **Checklist/log update:** Update `.ai/IMPLEMENTATION_PLAN.md` and `.ai/log.txt` before moving to another page.
10. **Stop:** Wait for the user's approval to proceed to the next page.

Required page checkpoints, in this order unless a documented dependency requires otherwise:

1. Application shell and navigation.
2. Dashboard.
3. GCC Explorer.
4. GCC/company detail profile and evidence panel.
5. Location comparison.
6. AI Research Copilot.
7. Decision Brief.

Page design discussion and approval are mandatory even when the page structure is described in `DESIGN.md`. The spec is the baseline, not a substitute for the user's page-specific visual approval.

---

## 3. Phase map and target time budget

The time allocations below are planning targets, not promises. Rebalance based on actual build status. Maintain a protected final release window and do not let feature work consume the entire 72 hours.

| Phase | Target window | Objective | Required checkpoint |
|---|---:|---|---|
| 0. Inspect and reconcile | 0–2 hours | Inspect repo and reconcile specifications | Plan + credential/access check + user approval before changes |
| 1. Foundation and skeleton | 2–7 hours | App boots, dependencies, neutral route scaffold, environment validation | Approve setup plan; no final visual styling before design discussion |
| 2. Data model and verified seed | 7–15 hours | Migrations, seed data, evidence relations, core read APIs | Disclose Supabase/DB access needs; approve data plan before execution |
| 3. UI direction and core pages | 15–36 hours | Global design discussion, then shell, dashboard, GCC Explorer, GCC profile | Approve global tokens; separately approve, implement, review, and log each page |
| 4. Location comparison | 36–42 hours | Indicator model and comparison workflow | Page-specific design approval; data and UI gate passes |
| 5. AI Copilot | 42–53 hours | Retrieval, Gemini integration, typed output, citation validation | Disclose Gemini credential needs; approve UI page and integration scope |
| 6. Decision Brief | 53–58 hours | Generate, inspect, copy/download a useful brief | Page-specific UI approval and grounded-output checks |
| 7. QA, polish, deployment | 58–67 hours | Regression, responsive/accessibility pass, public deploy | Disclose deployment credential needs; no release claims without verification |
| 8. Submission and buffer | 67–72 hours | Deck/product consistency, public-link test, email preparation | Verify reviewer access; final checklist and log update |

**Do not treat these windows as permission to advance after a failure.** A gate must pass. If the target is exceeded, write the actual status and revise remaining scope in `log.txt`.

---

## 4. Phase 0 — Repository inspection and specification reconciliation

### Objective

Understand the current working directory and existing files before changing anything. Avoid overwriting useful work or blindly regenerating a repository that already exists.

### Tasks

- [x] Inspect the root directory, Git status, branch, current source tree, package manager lockfiles, and existing scripts.
- [x] Read the six reference documents listed at the top, especially P0 acceptance criteria and the route/data contracts.
- [x] Check whether `README.md`, `DECISIONS.md`, `.env.example`, `.gitignore`, migrations, tests, or `log.txt` already exist.
- [x] Create `.ai/log.txt` if missing, using the template in Section 12.
- [x] Create `DECISIONS.md` if missing; record confirmed technology choices, repo assumptions, and unresolved decisions.
- [x] Identify required external credentials: Supabase project URL/publishable key and Gemini API key. Do not print or paste secret values into logs.
- [x] Record any spec contradictions in `DECISIONS.md`; resolve them before the relevant phase.

### Acceptance gate 0

- [x] Existing work is understood and preserved.
- [x] The active product scope remains P0-first.
- [x] `.ai/log.txt` exists and contains a timestamped start entry.
- [x] Missing credentials and external setup dependencies are listed without blocking local work unnecessarily.
- [x] No application feature code has been generated before confirming the repository state.

**Stop condition:** If no repository exists, create a clean Next.js TypeScript App Router project. If a project already exists, adapt it instead of replacing it. (Confirmed: Clean scaffolding approved for Phase 1).

---

## 5. Phase 1 — Application foundation and skeleton

### Objective

Create a stable, deployable application shell before connecting the full dataset or AI.

### Tasks

- [x] Set up or validate Next.js App Router with strict TypeScript.
- [x] Add Tailwind CSS and configure shadcn/ui only as needed; install Lucide icons and the required baseline UI dependencies.
- [x] Add the selected package scripts for development, linting, type checking, testing, and production build. Do not leave scripts pointing to tools that are not installed.
- [x] Use the existing package manager if a lockfile is present. If the repo is new, choose one package manager and commit only its lockfile.
- [x] Create neutral route placeholders for `/`, `/gccs`, `/gccs/[id]`, `/locations`, `/research`, and `/brief` as specified by the architecture and PRD.
- [x] Do not finalize the app shell, font, color tokens, icons, component style, charts, page layout, or motion until the user has approved the global UI direction in Section 2.6.
- [x] It is acceptable to implement a minimal temporary scaffold needed to verify routing/builds, but label it as temporary and do not treat it as approved design.
- [x] Add shared UI states: loading/skeleton, empty state, recoverable error, and not-found page.
- [x] Add typed environment-variable validation on the server. Keep `.env.local` ignored by Git and ensure `.env.example` contains names and safe placeholders only.
- [x] Add a minimal health/ready behavior appropriate to the app; do not expose environment secrets in the response.
- [x] Add initial README setup steps, marked as provisional until fully verified.

### Acceptance gate 1

- [x] App starts locally using documented commands.
- [x] All required routes load without runtime errors.
- [x] Production build and type checks pass.
- [x] No secret value is committed or referenced in client components.
- [x] Temporary route scaffolding is readable enough to test, without implying that final UI styling has been approved.
- [x] No final brand styling or page design was implemented before the design approval checkpoint.

**Gate evidence:** exact commands run and their results are written in `log.txt`. (Status: PASS).

---

## 6. Phase 2 — Database model, migrations, source-backed seed data

### Objective

Establish the canonical data layer before implementing screens that depend on facts.

### Tasks

- [x] Translate `ARCHITECTURE.md` into SQL migrations. Use foreign keys, stable UUIDs, useful indexes, constraints, and appropriate timestamp types.
- [x] Model companies separately from GCC centres; do not collapse a parent company, Indian legal entity, and individual centre into the same concept.
- [x] Implement source records and evidence claims with enough fields to preserve the source, claim/value, status, relevant period/unit, publication date if known, last-checked date, and conflict reference when applicable.
- [x] Implement cities and location indicators with unit, period, definition/method, source, and comparability note.
- [x] Implement policy records only if there are sourced policies ready for the demo; otherwise keep the interface explicit about unavailable policy data.
- [x] Keep optional provider tables/features secondary. Only implement them once the necessary evidence coverage exists or after P0 is secure.
- [x] Create SQL seed files or the migration/seed mechanism defined by the architecture so the demo dataset is reproducible.
- [x] Curate a deliberately small dataset that supports each demo workflow. Verify each material factual claim against its recorded source before including it.
- [x] Add examples of the intended evidence states where defensible: verified, estimated, conflicting, and unknown. Do not mislabel a source as authoritative merely to populate each status.
- [x] Add a real example of conflicting market counts only if the distinct figures, source dates, and definitions can be recorded accurately. Do not merge them into one “correct” number without methodological support.
- [x] Implement server-side repository/query functions with bounded result sizes and stable ordering.
- [x] Configure Supabase policies for intentionally public, curated demo records as defined in `ARCHITECTURE.md`. Browser-side insert, update, or delete must not be possible.
- [x] Add runtime validation for records used in UI/API responses, with clear handling of nullable and unknown fields.

### Acceptance gate 2

- [x] A clean database can be initialized from committed migrations and seed files.
- [x] Seed records use stable IDs and satisfy constraints.
- [x] All important factual claims are linked to a source or visibly represented as unknown/assumption.
- [x] Publication date, last-checked date, and validity period are not conflated.
- [x] Missing numbers remain `null`/unknown, never silently coerced to zero.
- [x] Public database policies allow only intended reads and no public writes.
- [x] Seed counts shown later in the UI can be derived from the database, not hardcoded.

**Gate evidence:** migration/seed command, row-count summary, and source-audit result in `log.txt` (do not dump sensitive environment values). (Status: PASS).

---

## 7. Phase 3 — UI direction and core UI pages

### Objective

Obtain user approval for the shared visual direction, then deliver the dashboard, GCC Explorer, and GCC profile as individually approved, implemented, reviewed, and verified UI-page checkpoints. A global design decision never automatically approves a specific page.

### Checkpoint 3.0 — Global UI direction (discussion and decision only)

- [x] Present practical choices and trade-offs for fonts/typography, palette/theme, information density, navigation/layout, icons, component approach, spacing, borders/radius/shadows, charts/tables, motion, and responsive behavior.
- [x] Ask whether the user has reference screenshots, websites, icons, design assets, or component/source code they want to supply, or whether the agent should create the UI. Agent implementation is the default; user-provided code/assets are optional.
- [x] Recommend a coherent visual direction with reasons, but allow the user to choose, customize, or delegate decisions.
- [x] Wait for explicit user approval before finalizing design tokens or shared visual styling. (Approved: Bricolage Grotesque, Option A Warm Evergreen palette, Option A Balanced Analyst density, Option A Dual Shell).
- [x] Record the approved direction in `DESIGN.md` and relevant decisions in `DECISIONS.md` (ADR-022 recorded).
- [x] Update this checklist and append to `log.txt`; stop and wait for approval to begin the application-shell page checkpoint.

### Page checkpoint 3A — Application shell and navigation

- [x] Present the layout, navigation hierarchy, active states, responsive collapse behavior, shared page frame, icon approach, and accessible interactions.
- [x] Ask whether the user wishes to provide a source component/reference or wants the agent to implement it.
- [x] Wait for page-specific approval, then implement the shell and shared components only.
- [x] Review all route placeholders at desktop and mobile widths; integrate official branding logos (`horizontal_logo.png` & `logo.png`).
- [x] Present the actual running result, apply requested revisions, run checks, update this plan and `log.txt`, and stop for approval before the dashboard.

### Page checkpoint 3B — Dashboard

- [x] Present content hierarchy, real dataset metrics, cards/charts, coverage disclaimer, icons, and loading/empty/error states.
- [x] Wait for page-specific approval before implementation.
- [x] Implement `GET /api/overview` or its server-side equivalent with counts derived from the data store.
- [x] Build only meaningful, data-backed indicators; omit anything unsupported by the schema or curated data.
- [x] Review desktop/mobile behavior and functional interactions; present the real page; apply feedback; test; update this plan and `log.txt`; stop for approval.

### Page checkpoint 3C — GCC Explorer

- [x] Present the search/table/list layout, information density, filters, result count, status labels, empty/loading/error states, and responsive behavior.
- [x] Wait for page-specific approval before implementation.
- [x] Implement the GCC query/API contract from `ARCHITECTURE.md`, including safe query validation, filters, pagination/limits, and stable IDs.
- [x] Build search by company/centre name and the filters supported by actual data (at minimum city plus one reliable sector/function filter if populated).
- [x] Show active filters, clear-filters action, empty/loading/error states, and an accurate result count.
- [x] Test a known seeded search and filters against actual data. Present the real page and apply feedback.
- [x] Update this plan and `log.txt`; stop for approval before the detail profile.

### Page checkpoint 3D — GCC/company profile and evidence panel

- [ ] Present the profile information hierarchy, company-vs-centre distinction, claim status treatment, evidence panel/drawer, dates, and safe external link behavior.
- [ ] Wait for page-specific approval before implementation.
- [ ] Implement `/gccs/[id]` with available company/centre details and distinctions between unknown, estimated, self-reported, verified, and conflicting information.
- [ ] Show source title, publisher, URL, source type, publication date when known, and last-checked date.
- [ ] Test stable profile routing, source links, unknown fields, conflicting claims, and not-found IDs.
- [ ] Present the real page, apply feedback, run checks, update this plan and `log.txt`, and stop for approval before Phase 4.

### Acceptance gate 3

- [ ] Global design direction was explicitly approved before final styling.
- [ ] Shell, dashboard, Explorer, and profile each passed their own page checkpoint.
- [ ] Search for a known seeded company returns the correct result.
- [ ] City and sector/function filters work against actual dataset fields; filters can be cleared.
- [ ] Result count matches filtered results.
- [ ] Clicking a result opens the correct stable profile route.
- [ ] A reviewer can inspect source details from the profile.
- [ ] Unknown fields are clearly labeled; empty or failed requests do not show fake success.
- [ ] Dashboard cards use live query results or are omitted if the data does not support them.
- [ ] Test outcomes, viewport checks, screenshot paths when available, feedback applied, and unresolved visual issues are recorded in the log.

**Gate evidence:** record IDs, test results, desktop/mobile viewport checks, screenshot paths where supported, and per-page approval status in `log.txt`.

---

## 8. Phase 4 — Location intelligence and comparison

### Objective

Support a defensible comparison of at least two locations without implying that incomplete or non-comparable metrics are equivalent.

**Page checkpoint:** Before coding, present the comparison page proposal (layout, selectors, table/chart choices, methodology disclosure, citation treatment, responsive behavior, and interaction states). Ask whether the user wants to provide reference/component source or have the agent implement it. Wait for explicit approval, then implement, review the real page, apply feedback, run checks, and update this plan plus `log.txt` before continuing.

### Tasks

- [ ] Implement the cities/indicators query and the comparison API/loader defined in `ARCHITECTURE.md`.
- [ ] Select at least two cities for which credible source-backed information is available. The list may include Bengaluru, Hyderabad, Chennai, Pune, or NCR depending on evidence quality; never force a metric to populate merely for symmetry.
- [ ] Choose a small set of indicators that have explicit definitions, units, and periods. Use fewer comparable indicators rather than more misleading ones.
- [ ] Build a comparison table or aligned cards based on `DESIGN.md` and `PRD.md`.
- [ ] Show the source and relevant dates near each value; support opening the source record.
- [ ] Represent missing values as “Not available” or equivalent. Do not display missing as zero or rank a city based on absence of data.
- [ ] If a composite score is implemented, document its inputs, weights, normalization, missing-data treatment, and limitations directly in the UI. The score is optional and should be cut if it introduces false precision.
- [ ] Add a “How this comparison works”/methodology affordance.
- [ ] Keep criteria selection small, comprehensible, and stable; do not add arbitrary sliders that do not affect computation.

### Acceptance gate 4

- [ ] At least two cities can be selected and compared.
- [ ] Values display units, periods, definitions or indicator descriptions, and source references where available.
- [ ] Non-comparable values are not presented as directly comparable without a caveat.
- [ ] Missing data is visually distinct from zero and from verified low values.
- [ ] The methodology can be inspected by a reviewer.
- [ ] Comparison controls work by keyboard and at mobile/tablet widths.

**Gate evidence:** one concrete comparison example with source IDs and a pass/fail note in `log.txt`.

---

## 9. Phase 5 — AI Research Copilot

### Objective

Deliver a useful AI interaction that grounds its response in retrieved product data and cannot create trusted citations on its own.

**Credential gate:** Before live Gemini integration, tell the user that `GEMINI_API_KEY` is needed for live model calls, explain safe configuration in `.env.local` and deployment settings, and never ask for the key in chat. State which retrieval/UI/tests can proceed without it; label any deterministic fallback clearly. Separately present the Copilot page proposal and wait for explicit page approval before coding it.

### Prerequisites

- Phase 2 source/evidence model passes.
- Phases 3 and 4 data queries are usable by server code.
- The Gemini key is available in server-only environment configuration, or the documented fallback path is used and disclosed.

### Tasks

- [ ] Implement the copilot request/response schemas from `AI_COPILOT.md` with Zod.
- [ ] Validate request length, allowed intent/scope, selected city/entity IDs, and request limits before retrieval.
- [ ] Build retrieval using PostgreSQL full-text/search filters and scoped joins. Do not let the model write or execute SQL.
- [ ] Assemble a bounded evidence packet with stable source IDs, claim IDs, source metadata, values, dates, and status.
- [ ] Treat source text as untrusted content; it must not override the system prompt or application policy.
- [ ] Call Gemini only from server-side code using `@google/genai`. Use the model/API configuration confirmed to be available at implementation time, kept in environment variables.
- [ ] Request structured output matching the response contract; validate the returned JSON at runtime.
- [ ] Validate every citation ID against the exact evidence/source IDs retrieved for that request. Drop or reject unknown IDs and mark unsupported output rather than showing fabricated sources.
- [ ] Distinguish citation existence from claim support. Where feasible, associate statements with specific evidence claims instead of merely appending a source list to a generic paragraph.
- [ ] Implement honest responses for zero retrieval, conflicting evidence, stale information, unsupported questions, model timeouts/rate limits, and malformed output.
- [ ] Preserve the user's prompt and relevant selected state on recoverable failure.
- [ ] Build the research interface with a clear question input, suggested prompts where helpful, loading/streaming or progress state, answer sections, source chips/cards, limitations, and error retry.
- [ ] Add evaluation cases from `AI_COPILOT.md`; start with citation fabrication, unknown headcount, conflicting market counts, unsupported question, prompt injection in source text, empty retrieval, and provider failure.
- [ ] Add a deterministic demo fallback only if the real API may not be available during review. It must be visually/labeled clearly and must not impersonate a live model response.

### Acceptance gate 5

- [ ] The server retrieves evidence before invoking the model.
- [ ] No client-side Gemini API key or privileged database key exists.
- [ ] All displayed citation IDs correspond to retrieved source/claim IDs.
- [ ] Unknown or conflicting data is described honestly rather than silently resolved.
- [ ] An unsupported or zero-evidence question produces a clear limitation response.
- [ ] Malformed model output cannot break the page or become an unvalidated trusted result.
- [ ] Prompt-injection strings in source text are treated as data, not instructions.
- [ ] If Gemini fails, the UI preserves context and provides a useful error/retry or disclosed fallback.

**Gate evidence:** record the evaluation cases run, outcomes, and any failures. Never write API key values to `log.txt`.

---

## 10. Phase 6 — Decision Brief generation

### Objective

Turn the current research question, comparison selections, and retrieved sources into a useful, auditable output.

**Page checkpoint:** Present the page structure, report hierarchy, citations, assumptions/limitations display, and copy/download behavior. Ask whether the user wants to provide references/component code or have the agent implement it. Wait for approval, build one page, review the real output, apply feedback, verify, then update this plan and `log.txt` before continuing.

### Tasks

- [ ] Define a validated brief input contract: question/objective, selected records/cities, comparison criteria, and referenced evidence IDs.
- [ ] Reuse the retrieval and citation-validation pipeline rather than adding a separate ungrounded prompt flow.
- [ ] Generate a structured brief containing: title/objective, executive finding or shortlist, options considered, rationale, cited evidence, assumptions, data gaps/limitations, and next questions/actions.
- [ ] Make recommendations conditional on the evidence and stated priorities; don't present a universal “best city” if user goals or sourced data do not justify it.
- [ ] Display citations beside material claims and provide an inspectable source list.
- [ ] Include generated-at time and a clear note that the brief reflects the currently available curated dataset.
- [ ] Provide copy-to-clipboard and/or Markdown download if achievable with reliable behavior. Prefer session-only state; persistent user accounts/report storage are out of scope.
- [ ] Handle generation failures without erasing the user's inputs or the comparison state.

### Acceptance gate 6

- [ ] A brief can be generated for the primary demo scenario.
- [ ] The output has all required sections or clearly indicates when a section cannot be supported.
- [ ] Every displayed citation resolves to a source/evidence record and opens successfully.
- [ ] Assumptions, unknowns, and conflicting evidence are visible.
- [ ] Copy/download works and preserves readable formatting, if included.
- [ ] No brief claims that the dataset is exhaustive or the recommendation is guaranteed.

**Gate evidence:** save a representative anonymized demo output or test fixture in `docs/` if helpful, and record the smoke-test result in `log.txt`.

---

## 11. Phase 7 — QA, polish, and deployment

### Objective

Make the complete P0 journey reliable for someone who has never seen the project before.

**Credential gate:** Before public deployment, disclose the required deployment authorization (e.g. Vercel account/project access) and confirm which Supabase/Gemini environment variables must be configured in provider settings. Never ask for secrets in chat. Local QA must proceed if deployment credentials are unavailable, but public deployment remains blocked until verified.

### Tasks

- [ ] Run formatting/lint, type checks, unit tests, and production build. Run end-to-end tests if Playwright has been set up; do not claim tests were run if they were not.
- [ ] Complete the tests in `TESTING.md` once that file exists; until then, use the acceptance lists in this document and `PRD.md`.
- [ ] Test loading, empty, network/database failure, invalid route, missing ID, Gemini failure, rate limit, and malformed model output paths.
- [ ] Inspect the app at desktop, tablet, and narrow mobile sizes.
- [ ] Check keyboard navigation, visible focus, semantic headings, accessible input labels, table readability, and contrast.
- [ ] Verify external source links and that the citation UI never links to a fabricated URL.
- [ ] Verify all dashboard metrics are data-derived and accurately described.
- [ ] Check `.gitignore`, environment handling, server/client boundaries, and deployed environment variables.
- [ ] Run a secret scan appropriate to the available toolchain, and inspect the Git diff for accidental secrets, debug output, or unrelated files.
- [ ] Deploy to Vercel and confirm the build configuration/environment variables match the project.
- [ ] Initialize the hosted Supabase schema/seed reproducibly; confirm public data access rules work on the deployed site.
- [ ] Open the production URL in a clean browser session or private window, and complete the demo scenario without local-only state.
- [ ] Test the link on a second browser/device if feasible.
- [ ] Fix critical bugs before adding any P1 feature.

### Acceptance gate 7

- [ ] Production build succeeds.
- [ ] P0 automated and manual acceptance tests pass or clearly documented non-blocking exceptions are approved in `DECISIONS.md`.
- [ ] Public URL works without developer login or local configuration.
- [ ] Reviewer can complete the complete primary flow in a clean session.
- [ ] No secret is exposed in the repository, rendered client code, or application responses.
- [ ] Known limitations are written down.

**Release rule:** a missing critical P0 test is a blocker. Do not mark the MVP “ready” because it merely compiles.

---

## 12. Phase 8 — Submission and handoff

### Tasks

- [ ] Complete `README.md` with project purpose, live link, stack, setup, environment variables, migration/seed instructions, test commands, and known limitations.
- [ ] Verify the deck is consistent with the implemented product and with the researched evidence. Remove promises that aren't implemented or validated.
- [ ] Prepare the demo script using one realistic scenario. Keep the live walkthrough focused on: search a GCC → inspect evidence → compare cities → ask a question → generate a brief.
- [ ] Test the deck and prototype links with reviewer-accessible permissions and without requiring personal account access.
- [ ] Prepare the submission email to Flexiple with both links and a concise statement of the product and demo flow.
- [ ] Check the email addresses and assignment submission deadline against the original email.
- [ ] Make a final log entry with deployed URLs, release commit, test outcomes, known issues, and any handoff notes. Never include secrets or personal data.

### Acceptance gate 8

- [ ] Live prototype and deck URLs are both accessible.
- [ ] The app's primary workflow has been tested from the public URL.
- [ ] README and submission materials reflect the release version.
- [ ] Remaining limitations are clearly documented.
- [ ] `.ai/log.txt` identifies the final state and does not overstate completion.

---

## 13. Required `.ai/log.txt` protocol

The implementation log is mandatory. It allows an agent or developer to resume safely without re-reading every prior message or assuming unfinished work is complete.

### 13.1 When to update

Update `.ai/log.txt`:

1. At the start of work, after inspecting the repo.
2. At the end of every implementation checkpoint, including a failed checkpoint.
3. Immediately when a blocker changes the plan or requires external action.
4. After a meaningful architecture/schema decision.
5. After deployment or a release attempt.
6. At handoff/end of session.
7. After every approved UI-page checkpoint, including visual revision, failure, or blocker.
8. Whenever a phase plan is revised, before requesting approval for the revised plan.

Do not add a log entry for every tiny file edit. Log coherent checkpoints, and ensure the log's next action reflects the actual repository state. **At every such checkpoint, update this implementation plan/checklist and the log together.**

### 13.2 Required information per checkpoint

- Date/time and phase ID/name.
- Goal for this checkpoint.
- Files created/modified/deleted.
- Implementation completed.
- Commands/tests run and exact pass/fail results.
- Browser/manual checks performed and what was observed.
- Data/source work completed, where relevant.
- Decisions made and the reason.
- Known bugs, blockers, or unverified assumptions.
- Phase-gate status: `PASS`, `FAIL`, or `BLOCKED`.
- Next specific action (one to three concrete items).

### 13.3 Log template

Use plain text or Markdown-compatible text. Keep it concise and factual.

```text
GCC FIELDBOOK — IMPLEMENTATION LOG

[YYYY-MM-DD HH:MM TZ] — PHASE 0: Repository inspection
Goal:
Completed:
Files changed:
Commands/tests:
Manual checks:
Decisions:
Blockers/risks:
Gate: PASS | FAIL | BLOCKED
Next action:

[YYYY-MM-DD HH:MM TZ] — PHASE N: <name>
Goal:
Completed:
Files changed:
Commands/tests:
Manual checks:
Decisions:
Blockers/risks:
Gate: PASS | FAIL | BLOCKED
Next action:
```

### 13.4 Logging rules

- Never claim a test passed unless it was executed and passed.
- If a command could not run, state why and what substitute check was performed.
- Do not log `.env` contents, access tokens, API keys, or other secrets.
- Record test failures honestly and link them to the next action.
- If an attempted implementation is reverted, note it and why.
- Keep the latest phase/status easy to identify at the top or in the most recent entry.

---

## 14. AI coding-agent working protocol

The agent is a collaborative implementer, not an unattended generator. **Never automatically progress through multiple unapproved phases or UI pages.**

### Before every phase or page checkpoint

- [ ] Read the relevant specifications and latest `.ai/log.txt` entry.
- [ ] Inspect the current code, working tree, tests, and previous gate evidence.
- [ ] Present a phase-specific plan: goal, scope, dependencies, files likely to change, acceptance criteria, tests, effort, deadline impact, and non-goals.
- [ ] Present a credential/access audit: required now/later/optional/not needed; exact env var names if confirmed; where and how to configure values safely; what can proceed without them.
- [ ] List decisions requiring user input. For a UI page, include layout, type, components, icons, interaction states, responsiveness, and whether the user can provide source/reference assets or wants the agent to build them.
- [ ] **Stop and wait for explicit user approval.** Do not execute the phase/page before approval.

### During an approved phase

- Work only on the approved scope and one meaningful vertical slice at a time.
- Preserve existing files and user changes; inspect diffs before editing or reverting.
- Use shared typed contracts and runtime validation at boundaries.
- Prefer accessible reusable components without overengineering.
- Never add fabricated facts, source URLs, validation claims, or fake activity data.
- Never bypass evidence/citation validation to make a demo look smoother.
- Avoid unrelated refactors and unnecessary dependencies.
- If a new credential, scope expansion, schema change, breaking dependency, or material design decision appears, pause the affected work and explain options before proceeding.

### UI-specific rules

- Obtain explicit global design-direction approval before final shared visual styling.
- Approve, implement, review, and revise one page at a time, in the page sequence in Section 2.6.
- Do not treat an image or wireframe as the completed UI; the actual app must be implemented and functional.
- At each page checkpoint, show the real running page or available screenshots, include desktop/mobile review when possible, and solicit feedback before proceeding.
- The agent develops source code by default. User-provided components, screenshots, icons, or snippets are optional inputs. If supplied, inspect their license, accessibility, responsiveness, and compatibility before integrating them.
- Store review screenshots under `docs/ui-review/` when supported; do not claim screenshots exist if none were generated.

### After every phase/page checkpoint

- Run the targeted tests and manual checks planned for that checkpoint; then run broader checks when appropriate.
- Inspect `git diff` and working-tree status for accidental scope creep, deletion, or secret exposure.
- Verify acceptance criteria one by one and report actual outcomes.
- Update `.ai/IMPLEMENTATION_PLAN.md` and `.ai/log.txt` even when work fails or is blocked.
- Add or update `.ai/DECISIONS.md` when a durable decision changes.
- Show a concise summary: completed work, files changed, tests and results, visual review/feedback applied, credentials still missing (names/status only; never values), blockers, gate state, and next proposed checkpoint.
- **Stop and wait for explicit approval before proceeding to the next phase/page.**

### Do not do these things

- Do not regenerate or overwrite all files in one shot.
- Do not assume global design approval also approves every page.
- Do not skip user approval because the design is described in `DESIGN.md`.
- Do not ask the user to paste secrets into chat or commit secrets.
- Do not mark tasks complete unless verified.
- Do not erase prior log entries or omit checklist/log updates when blocked.
- Do not use broad `any`, blanket `@ts-ignore`, or relaxed compiler settings to hide unresolved errors.
- Do not add dependencies without explaining the need.
- Do not add features while the production build is broken.
- Do not describe the product as comprehensive, fully verified, or commercially validated unless evidence supports it.

## 15. Test strategy and command discipline

Exact commands must match the project's installed scripts. The typical target is:

- `npm run dev` — local development server.
- `npm run lint` — lint source files.
- `npm run typecheck` — TypeScript type check (add a matching script if this is part of the chosen toolchain).
- `npm run test` — unit tests.
- `npm run build` — production build.
- `npm run test:e2e` — only if an E2E runner such as Playwright has actually been configured.

If the project uses pnpm/yarn or existing scripts, follow the committed lockfile and scripts. Do not invent a successful result from a command that does not exist.

### Validation layers

1. **Static:** lint, type checking, and production build.
2. **Unit:** input schemas, normalization, comparison/missing-data handling, citation validation, and utility logic.
3. **Integration:** API handlers with controlled database/model responses where feasible.
4. **End-to-end:** the primary user journey on a running app; cover source links and AI errors as time allows.
5. **Manual:** responsive layouts, keyboard navigation, blank/error states, and live deployment.

The primary demo may not be considered complete until its core path has at least one end-to-end/manual pass against the deployed URL.

---

## 16. Primary demo scenario

Use a single consistent scenario across development, testing, the deck, and the final demo:

> “A market-entry consultant is evaluating India's GCC ecosystem for a client planning an AI engineering centre. They need to find relevant existing GCCs, compare two or more cities using available evidence, understand what is known versus unknown, and produce a concise decision brief.”

### Demo steps

1. Open the dashboard and explain the actual dataset coverage.
2. Search the GCC Explorer for a seeded company or filter by city/function.
3. Open the company/centre profile and inspect at least one evidence claim.
4. Navigate to Location Intelligence and compare at least two cities using supported indicators.
5. Open the comparison methodology and point out missing or conflicting values.
6. Ask the copilot a question answerable from the seeded dataset; inspect citations.
7. Ask a question that the dataset cannot support; demonstrate the explicit limitation response.
8. Generate a decision brief and inspect assumptions, citations, and open questions.
9. Copy/download the brief if that feature is implemented.

Do not use a demonstration question that requires unsupported live browsing or data not present in the curated dataset. The app should gracefully state its limits rather than improvise facts.

---

## 17. Final release checklist

### Product
- [ ] Primary user and product promise are clear.
- [ ] Every P0 workflow exists and works.
- [ ] The UI distinguishes facts, estimates, conflicts, and unknowns.
- [ ] Dashboard counts and charts derive from actual records.

### Data trust
- [ ] Every material factual claim has evidence or is marked as unknown/assumption.
- [ ] Sources, publication dates, last-checked dates, and validity periods are kept distinct.
- [ ] Conflicting source values are preserved and explained.
- [ ] Seed data can be recreated from version-controlled files.

### AI
- [ ] Evidence retrieval precedes generation.
- [ ] Citation IDs are validated server-side.
- [ ] Unknown and unsupported questions are handled honestly.
- [ ] Gemini key and privileged credentials remain server-side.
- [ ] AI error/fallback mode is clear and tested.

### Engineering
- [ ] Lint, typecheck, unit tests, and production build are recorded.
- [ ] No known critical console/runtime errors remain in the demo flow.
- [ ] No secrets or generated data dumps are committed.
- [ ] Deployment uses the documented environment variables and repeatable schema setup.

### Delivery
- [ ] Public app URL works in a clean session.
- [ ] Pitch deck claims match the implemented product and sourced research.
- [ ] Public deck URL is accessible to reviewers.
- [ ] README instructions and known limitations are accurate.
- [ ] Final status and deployment URLs are recorded in `.ai/log.txt`.

---

## 18. Final interaction contract

For clarity, every phase/page follows this exact sequence:

**PLAN → CREDENTIALS/ACCESS → USER APPROVAL → EXECUTE → VERIFY → UPDATE IMPLEMENTATION CHECKLIST + LOG → REPORT → WAIT FOR NEXT APPROVAL.**

A failed or blocked checkpoint follows the same ending: update both files, report the blocker and available alternatives, and wait. No automatic progression to another phase is allowed.

For UI work, add this page-specific sequence:

**DISCUSS PAGE DESIGN → ASK ABOUT USER-PROVIDED REFERENCES/SOURCE OR AGENT IMPLEMENTATION → PRESENT PREVIEW PLAN → PAGE APPROVAL → IMPLEMENT → RUN/REVIEW → COLLECT FEEDBACK → REVISE → VERIFY → UPDATE CHECKLIST + LOG → WAIT FOR NEXT PAGE APPROVAL.**

The user may explicitly delegate a decision or authorize a clearly defined set of safe tasks, but such delegation does not waive credential disclosure, security requirements, verification, or checklist/log updates.

---

## 19. Related documents

- [`RESEARCH.md`](./RESEARCH.md) — market context, competition, and hypotheses.
- [`PRD.md`](./PRD.md) — user needs, scope, requirements, and product acceptance criteria.
- [`ARCHITECTURE.md`](./ARCHITECTURE.md) — system architecture, database concepts, and API contracts.
- [`DESIGN.md`](./DESIGN.md) — visual system and screen behavior.
- [`DATA_TRUST.md`](./DATA_TRUST.md) — source hierarchy, evidence model, verification, conflict handling, and data freshness.
- [`AI_COPILOT.md`](./AI_COPILOT.md) — retrieval, prompt, response contracts, citation validation, and AI evaluation.
- [`TESTING.md`](./TESTING.md) — to be created; detailed test cases will operationalize the gates in this plan.
- [`DECISIONS.md`](./DECISIONS.md) — decisions, trade-offs, and resolved spec conflicts.
- [`log.txt`](./log.txt) — chronological checkpoint log; mandatory during development.
