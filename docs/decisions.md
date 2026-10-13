# GCC Fieldbook — Decision Register

> **Product:** GCC Fieldbook  
> **Tagline:** The working guide to India's GCC ecosystem.  
> **Document:** Architecture Decision Records (ADRs) and open decisions  
> **Version:** 0.1 — assessment MVP  
> **Status:** Initial decisions recorded; validate implementation-sensitive items during Phase 0  
> **Last updated:** 13 October 2026  
> **Related documents:** [`RESEARCH.md`](./RESEARCH.md), [`PRD.md`](./PRD.md), [`ARCHITECTURE.md`](./ARCHITECTURE.md), [`DESIGN.md`](./DESIGN.md), [`DATA_TRUST.md`](./DATA_TRUST.md), [`AI_COPILOT.md`](./AI_COPILOT.md), [`IMPLEMENTATION_PLAN.md`](./IMPLEMENTATION_PLAN.md), [`TESTING.md`](./TESTING.md), [`log.txt`](./log.txt)

---

## 1. Purpose and operating rules

This file is the durable record of material product, design, data, and engineering decisions for GCC Fieldbook. It prevents the coding agent from repeatedly reconsidering settled choices or silently changing architecture while implementing features.

### Decision statuses

- **Accepted** — approved baseline for the assessment MVP; implement unless the repository contains a concrete incompatibility.
- **Proposed** — current recommended choice but must be checked during Phase 0 before implementation.
- **Open** — requires evidence, an available credential, or a small technical experiment before it can be settled.
- **Superseded** — replaced by a later ADR; preserve the old record and link to its replacement.

### Change protocol

1. Read this register and the relevant source document before making a material change.
2. Do not change an **Accepted** decision silently. Explain the constraint or new evidence.
3. Add a new numbered ADR or append a dated amendment to the existing ADR. Do not erase the history of a decision.
4. If a decision affects scope, data trust, security, dependencies, or demo behavior, update the relevant source document and implementation checklist as well.
5. Record what changed, why, files affected, verification performed, and next action in `.ai/log.txt` at each phase checkpoint.
6. Do not record secrets, API keys, credentials, personal data, or full sensitive prompts in this file or in the development log.

### Precedence

Use the conflict-resolution hierarchy documented in `IMPLEMENTATION_PLAN.md`: `PRD.md` controls product scope; `DATA_TRUST.md` controls evidence semantics; `ARCHITECTURE.md` controls system boundaries; `AI_COPILOT.md` controls model behavior; `DESIGN.md` controls visual behavior; `IMPLEMENTATION_PLAN.md` controls phase order. If two documents materially conflict, stop work on the affected feature, record the conflict here, and reconcile it before proceeding.

---

## 2. Accepted decisions

### ADR-001 — Build a focused, evidence-first research workspace

**Status:** Accepted  
**Decision:** GCC Fieldbook will focus on a research workflow: **discover a GCC → inspect evidence → compare locations → ask the AI copilot → generate a decision brief**.

**Context:** A generic directory is easy to copy and a general chatbot cannot be trusted to supply the source of truth. The product's proposed value is making GCC research more traceable and comparable.

**Consequences:** Every major page must support this journey. Prioritize inspectable evidence, source references, methodology, and clear unknowns over breadth of coverage or decorative dashboards. The assessment dataset must be described honestly as curated rather than comprehensive.

**Revisit when:** User interviews or testing show that another repeated workflow has materially stronger urgency and value.

### ADR-002 — Use one Next.js application for UI and server API routes

**Status:** Accepted  
**Decision:** Use Next.js App Router with React and strict TypeScript. Use Server Components where they simplify data display and Route Handlers for application APIs.

**Context:** A single application and deployment unit minimizes integration and deployment work within the 72-hour assessment.

**Consequences:** Do not create a separate Python or Express backend for the MVP. Keep server-only services isolated from client components. Follow an existing repository's sound structure rather than regenerating it unnecessarily.

### ADR-003 — Use Supabase-hosted PostgreSQL as the canonical data store

**Status:** Accepted  
**Decision:** Store canonical companies, GCC centres, cities, indicators, policies, sources, and evidence claims in PostgreSQL hosted by Supabase.

**Context:** The domain has related entities, competing evidence, units, dates, and provenance requirements that suit a relational model.

**Consequences:** Define numbered SQL migrations and a reproducible seed dataset in version control. Avoid embedding the primary dataset in UI components or treating model responses as persisted facts. Preserve relationships and source metadata.

### ADR-004 — Server-side data access; no browser-side database writes

**Status:** Accepted  
**Decision:** The browser communicates with application pages and Next.js Route Handlers. The application may use a Supabase publishable/anon key on the server for intentionally public, curated records, protected by appropriate Row Level Security (RLS) policies. The browser has no insert, update, or delete path for the curated dataset.

**Security boundary:** Never expose a Supabase service-role/secret key or database password to client-side code. Do not prefix server secrets with `NEXT_PUBLIC_`. RLS must be enabled and policies reviewed for every public table.

**Consequences:** Public access means read-only demo records—not unrestricted database access. If repository inspection reveals a different working Supabase pattern, assess it against these security properties before adopting it.

### ADR-005 — Curated and source-backed data before broad coverage

**Status:** Accepted  
**Decision:** Begin with a small, deliberately curated dataset whose material claims have source references and dates where available. Do not attempt to list every Indian GCC during the assessment.

**Context:** A smaller verified sample is more useful for demonstrating the product thesis than a large unverified scrape.

**Consequences:** The dashboard must label dataset coverage honestly. Seed data must be reproducible. Do not manufacture facts, employee counts, launch dates, service-provider outcomes, source metadata, or verification states for visual completeness. A missing value is preferable to a fabricated value.

### ADR-006 — Evidence status attaches to individual claims

**Status:** Accepted  
**Decision:** Model evidence at the claim or indicator level. A company profile may contain verified, estimated, conflicting, and unknown fields simultaneously.

**Context:** Verifying one statement about a company does not validate every statement about it.

**Consequences:** The UI must show a status label and associated evidence at an appropriate field/claim level. Do not apply one global “verified” badge to an entire profile unless the product clearly explains the limited meaning of that badge.

### ADR-007 — Keep AI synthesis separate from the source of truth

**Status:** Accepted  
**Decision:** The AI copilot retrieves relevant records first, then asks the model to synthesize only the bounded evidence context provided by the application. AI is not authorized to run SQL or invent source links.

**Context:** The value of the product depends on traceability and on communicating when the evidence is insufficient.

**Consequences:** Data retrieval is deterministic application logic. Model output is parsed and validated against a schema. Citation IDs must resolve to evidence actually retrieved for the current request. Source titles, URLs, publication dates, and evidence states are resolved by application code, not trusted from model prose.

### ADR-008 — Use Google's supported JavaScript SDK through one server-only AI module

**Status:** Accepted  
**Decision:** Use `@google/genai` behind a narrow server-side interface. Configure the chosen model through `GEMINI_MODEL` rather than scattering model IDs through route handlers and UI code.

**Context:** The product needs an AI copilot, but must keep provider-specific details replaceable and credentials private.

**Consequences:** Validate the selected model's availability and structured-output support at implementation time. Use bounded prompts/context, validate output with Zod, handle quota/network/time-out failures, and keep non-AI features usable when the provider is unavailable. Do not claim the fallback is live AI.

### ADR-009 — Do not add a vector database for the MVP

**Status:** Accepted  
**Decision:** Begin with PostgreSQL queries and deterministic filters/search for retrieval. Add embeddings or a vector store only if a demonstrated retrieval requirement cannot be satisfied adequately by relational queries and simple text matching.

**Context:** The initial corpus is intentionally small and structured; another datastore adds setup, testing, and operational burden.

**Consequences:** Keep a retrieval interface so the underlying method could change later without coupling it to UI components. Test whether the curated records are retrievable for the agreed demo questions.

### ADR-010 — Generated briefs are session-only in the MVP

**Status:** Accepted  
**Decision:** Do not add user accounts, workspace persistence, conversation history, or persistent report storage for the assessment MVP. Generated briefs can be viewed in the browser and copied or downloaded.

**Context:** The assessment tests a working product workflow; persistent multi-user functionality is not required for that demonstration.

**Consequences:** Avoid authentication setup and data-retention obligations unless the core journey is already complete and a specific requirement makes persistence essential.

### ADR-011 — Public demo is read-only and must degrade gracefully

**Status:** Accepted  
**Decision:** Reviewers should be able to use the prototype without an account. The GCC Explorer and location comparison must remain useful when Gemini is unavailable.

**Consequences:** Keep public data read-only, validate and limit incoming requests, provide helpful loading/empty/error states, and handle AI failures without breaking the application. A public AI endpoint needs sensible request limits; any limitation in abuse protection must be disclosed rather than overstated.

### ADR-012 — Use Zod and typed contracts at trust boundaries

**Status:** Accepted  
**Decision:** Use TypeScript for application contracts and Zod (or an equivalent schema validator only if already established in the repository) to validate request inputs and untrusted model output.

**Context:** TypeScript types alone do not validate runtime JSON returned by an external model or client request.

**Consequences:** Treat all user input, source text, and model output as untrusted. Invalid content must not flow to trusted UI components without validation. Render model output as sanitized text/Markdown; never render arbitrary model-generated HTML.

### ADR-013 — Reproducible migrations and seed data are required

**Status:** Accepted  
**Decision:** Version database schema changes as numbered migration files and keep the demo seed dataset reproducible via SQL or a deterministic script.

**Consequences:** Do not rely on undocumented dashboard-only schema changes. Include setup instructions in `README.md`. A clean environment should be able to reconstruct the schema and seed data using documented steps, subject to configured Supabase credentials.

### ADR-014 — Adopt the “Fieldbook” editorial design system

**Status:** Accepted  
**Decision:** Use a light, research-oriented interface with warm/neutral surfaces, restrained evergreen accents, clear typography, data-dense but readable tables, and an inspectable evidence UI. Use Geist where practical and a readable system-sans fallback.

**Context:** Users must compare facts and inspect sources; decoration should not compete with legibility.

**Consequences:** Avoid excessive gradients, glow effects, unsupported charts, misleading map visuals, and status conveyed by color alone. Implement consistent design tokens and responsive behavior as described in `DESIGN.md`.

### ADR-015 — Strict P0-first delivery with explicit phase gates

**Status:** Accepted  
**Decision:** Follow `IMPLEMENTATION_PLAN.md` phase by phase. A phase is complete only when its acceptance criteria are met and relevant tests or manual checks are recorded.

**Consequences:** Defer P1 features until the end-to-end P0 journey works. Do not mark a test or deployment as successful unless it was actually run and observed. If time becomes constrained, cut breadth before reliability, evidence integrity, or the final release window.

### ADR-016 — Use Vitest and a small Playwright critical path when feasible

**Status:** Accepted  
**Decision:** Prefer Vitest for deterministic unit/integration tests and Playwright for a concise end-to-end demo journey if the environment and available time support it.

**Consequences:** Mock external Gemini and database boundaries where practical in automated tests. Keep a separate, explicit live smoke test for configured credentials. If Playwright cannot be installed or run reliably within the timebox, perform and record equivalent critical-path manual checks; do not claim automated E2E coverage that does not exist.

### ADR-017 — Vercel is the default application host

**Status:** Accepted  
**Decision:** Use Vercel as the default hosting target for the Next.js application and Supabase as the managed database, unless account access or deployment constraints require a documented alternative.

**Consequences:** Configure environment variables on the server side in the intended deployment environment, perform a production build, and test the public URL in a clean browser session before submission. A local-only URL is not an acceptable final deliverable.

### ADR-018 — Product claims and scores must expose limits

**Status:** Accepted  
**Decision:** Label estimates and inferences. A city score or provider assessment may be shown only if its criteria, units, weights (if any), evidence coverage, and missing data are visible.

**Context:** False precision can be more misleading than incomplete information.

**Consequences:** Do not rank cities or providers on unsourced or incomparable values. Avoid implying causal conclusions from correlation or limited examples. Where there is not enough comparable evidence, display “insufficient comparable data” instead of manufacturing a score.

### ADR-022 — Global UI Design Direction & Visual Tokens

**Status:** Accepted (Approved in Checkpoint 3.0)  
**Decision:** Adopt the "Fieldbook Editorial" visual system featuring:
1. **Typography:** Bricolage Grotesque (`next/font/google`) for high-impact editorial headings and brand wordmark; Inter for crisp interface body text and data tables; tabular monospace numerals for rents, headcounts, and metric benchmarks.
2. **Palette:** Light-first warm neutral surfaces (Canvas `#F5F7F5`, Surface `#FFFFFF`, Border `#DCE4DE`), restrained institutional Evergreen brand accent (`#1F6654`), and high-contrast, multi-cue evidence badges (`verified`, `estimated`, `conflicting`, `unknown`).
3. **Density:** Balanced Analyst Density (40–48px rows, visible gridlines, sticky table headers).
4. **Shell:** Dual navigation shell with collapsible left sidebar for primary journey routes and top context header with breadcrumbs and live "Curated Sample" indicator.

**Context:** Approved by the user following Section 9.1 discussion in MASTER_PROMPT.md.

**Consequences:** Configure Tailwind tokens and CSS custom properties in Checkpoint 3.0. Individual UI pages will be approved and implemented one by one against these tokens.

---

## 3. Proposed decisions to confirm in Phase 0

### ADR-019 — Initialize clean Next.js App Router project in repository

**Status:** Accepted (Settled in Phase 0)  
**Decision:** Phase 0 inspection verified that the root repository contains only `.ai/` and `docs/` documentation folders, with no existing application code, package manifests, or lockfiles. Therefore, initialize a clean Next.js App Router project with TypeScript, Tailwind CSS, and standard tooling directly in the repository root without overwriting or deleting `.ai/` or `docs/`.

**Why:** No preexisting application code exists to preserve or adapt. Scaffolding in place preserves specifications while establishing the approved architecture stack.

**Gate:** Phase 0 confirmed inventory. Phase 1 will execute the approved scaffolding.

### ADR-020 — Keep source evidence normalized but MVP-simple

**Status:** Proposed  
**Decision:** Use the core schema in `ARCHITECTURE.md`, simplifying joins only when a clear redundancy is avoided. Prefer source records plus `evidence_claims` for material claims over a complex generic knowledge graph.

**Why:** The product needs claim-level provenance without creating an overengineered ontology.

**Gate:** Before migration creation, confirm that each demo workflow can trace company facts and city indicators to a source, including units/date and status where applicable.

### ADR-021 — Use explicit deterministic city comparison first

**Status:** Proposed  
**Decision:** Compare cities with indicator-by-indicator values and source links. Do not introduce a composite score in the first working slice unless the PRD/demo scenario requires it and the weighting methodology can be transparently explained.

**Why:** A transparent table is more trustworthy and faster to implement than arbitrary weighted scoring.

**Gate:** Review the PRD acceptance criteria and seed data before implementing comparison logic.

---

## 4. Open decisions and required resolution

These are intentionally not guessed. Resolve them during the relevant implementation phase and append the result here.

| ID | Question | Resolution method | Owner checkpoint | Current stance |
|---|---|---|---|---|
| OPEN-001 | Which Gemini model is available to the configured API key and supports the required structured output at acceptable latency/cost? | Check current official model documentation and run a minimal server-side smoke test after credentials are configured. | Phase 1 / Phase 5 | Keep model in `GEMINI_MODEL`; do not hard-code until verified. |
| OPEN-002 | Which Supabase project and credentials are available, and are RLS policies correct? | Inspect environment setup; create/choose a dedicated demo project, apply migration, query public demo records, verify browser cannot write. | Phase 0 / Phase 2 | Never use or expose service-role credentials in the client. |
| OPEN-003 | What exact sample records can be source-verified within the deadline? | Gather credible public sources; record URLs and dates; prioritize a compact set of companies/cities supporting the main demo scenario. | Phase 2 | Quality and traceability before volume. |
| OPEN-004 | What persistent rate limiter is available for the public AI endpoint? | Inspect deployment/account constraints; use a supported persistent store/provider if feasible. If not, apply provider quotas and low request/context limits, document residual risk, and avoid claiming robust abuse protection. | Phase 5 / Phase 7 | In-memory limits alone are best-effort in serverless environments. |
| OPEN-005 | Can Playwright run reliably within the project setup and deadline? | Check existing dependencies/browser availability, try a minimal smoke test, then decide. | Phase 1 / Phase 7 | Keep core validation possible with manual steps and deterministic unit tests. |
| OPEN-006 | Which package manager and compatible dependency versions should be used? | Checked environment: Node v26.7.0 and npm 11.6.0 installed; no preexisting lockfile. | Phase 0 (Resolved) | Use `npm` with standard `package-lock.json`. |
| OPEN-007 | Does the product need any authentication at all for the submitted demo? | Reconciled repository/security requirements and confirmed public read-only model supports every required workflow. | Phase 0 (Resolved) | Confirmed: No authentication or user accounts in MVP. |
| OPEN-008 | Which current external source can responsibly substantiate every seeded claim? | Verify claim by claim; record primary source, access date, publication date if available, and conflict status. | Phase 2 | Never invent evidence metadata to fill gaps. |

---

## 5. Decision checklist for the implementation agent

Before starting a phase:

- [ ] Read the relevant section of the PRD and implementation plan.
- [ ] Check whether this register contains a related ADR or open question.
- [ ] Confirm dependencies and required credentials actually exist.
- [ ] Identify files that will change and keep the scope limited to the current phase.

Before marking a phase complete:

- [ ] Record decisions made or changed since the previous checkpoint.
- [ ] Run the specified commands/tests and record exact outcomes.
- [ ] Distinguish automated tests, manual checks, and untested assumptions.
- [ ] Update `.ai/log.txt` with files changed, test evidence, blockers, gate status, and the next action.
- [ ] Update the relevant ADR status if a proposed/open choice is settled.

Before final submission:

- [ ] Confirm the public deployment and source-backed demo journey work in a clean browser session.
- [ ] Recheck that there are no secrets in source control or client bundles.
- [ ] Ensure the deck describes the product that actually exists, not planned-but-unbuilt features.
- [ ] State known limitations honestly.

---

## 6. Short decision summary for quick agent context

- **Build:** one Next.js App Router app with strict TypeScript, Tailwind, PostgreSQL/Supabase, server-side `@google/genai`, Zod, and Vercel.
- **Data:** curated, reproducible, source-backed records; claim-level evidence; no false completeness.
- **AI:** retrieval first; bounded context; schema validation; citation IDs resolved by the app; no model-written links or SQL.
- **Security:** public read-only demo; RLS; no client-side privileged credentials; validate inputs; limit the public AI endpoint.
- **UX:** light editorial “field guide”; evidence and missingness visible; city comparisons transparent.
- **Scope:** finish the core P0 workflow and public deployment before any P1 extras.
- **Process:** follow phase gates; never claim unrun tests; append truthful checkpoint information to `.ai/log.txt`.
