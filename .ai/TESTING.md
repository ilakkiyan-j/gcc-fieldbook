# GCC Fieldbook — Testing and Quality Plan

> **Product:** GCC Fieldbook  
> **Tagline:** The working guide to India's GCC ecosystem.  
> **Document:** Testing and Quality Plan  
> **Version:** 0.1 — assessment MVP  
> **Last updated:** 13 October 2026  
> **Status:** Test strategy and acceptance criteria; execution status must be recorded in `.ai/log.txt`  
> **Companion documents:** [`PRD.md`](./PRD.md), [`ARCHITECTURE.md`](./ARCHITECTURE.md), [`DATA_TRUST.md`](./DATA_TRUST.md), [`AI_COPILOT.md`](./AI_COPILOT.md), [`IMPLEMENTATION_PLAN.md`](./IMPLEMENTATION_PLAN.md)

---

## 1. Purpose

This document defines how we will prove that GCC Fieldbook's assessment MVP works, behaves honestly with incomplete evidence, handles errors safely, and can be demonstrated from a public deployment.

It is a **test plan, not proof that tests have already passed**. A test may be marked passed only after it has been run against the current code and its result is recorded. The coding agent must not invent test output or report success because code merely appears correct.

The release goal is one complete journey:

**Discover a GCC → inspect evidence → compare locations → ask the AI copilot → generate a decision brief.**

The app does not need comprehensive GCC coverage to pass. It does need honest coverage disclosures, internally consistent records, working source links, reliable core interactions, and AI output that does not fabricate evidence.

## 2. Quality principles

1. **Test user-visible outcomes.** Prioritize the actual workflow over maximizing test count.
2. **Prove evidence integrity.** Material factual claims must be traceable to records or be clearly identified as unknown, assumption, or inference.
3. **Treat missing data as missing.** Never allow missing cost, headcount, salary, or policy values to silently become zero.
4. **Test AI deterministically where possible.** Unit and integration tests use mocked model responses; live provider calls are separate smoke tests.
5. **Keep tests repeatable.** Automated tests must not depend on live news sites, random web search results, or the current state of third-party sites.
6. **Fail clearly.** Database outages, malformed model responses, rate limits, and unavailable AI keys must produce understandable error states, not fabricated fallback data.
7. **Record execution honestly.** Include commands run, exit status, failures, and remaining gaps in `.ai/log.txt` after each phase checkpoint.

## 3. Technology and test tooling

Use the tools selected in `ARCHITECTURE.md`:

- **Vitest** for unit and integration tests.
- **React Testing Library** for critical component interaction tests where practical.
- **Playwright** for the smallest high-value browser end-to-end path, if time permits. It is preferred for final release verification but must be installed and configured before running its command.
- **Zod** schemas for request and AI-response contract validation.
- **Mocked Supabase and Gemini boundaries** for deterministic tests that do not require credentials or network calls.

Keep compatible dependencies and the package lockfile committed. Do not add another testing library unless the existing stack cannot cover a required test.

### 3.1 Expected npm scripts

The coding agent should check `package.json` and use the scripts actually present. Add scripts that are missing only when configuring the corresponding tooling.

```bash
npm run lint
npm run typecheck
npm run test
npm run test:e2e
npm run build
```

Recommended script meanings:

| Script | Purpose | Required before release? |
|---|---|---|
| `lint` | Run ESLint on application and test code | Yes |
| `typecheck` | Run TypeScript without emitting build output | Yes |
| `test` | Run Vitest unit and integration suites | Yes |
| `test:e2e` | Run configured Playwright critical path | Yes for final release when configured; otherwise perform and record an equivalent manual walkthrough |
| `build` | Run production build | Yes |

Do not state that a script passed if it does not exist or if the command was not executed. Record unavailable scripts and why in the log.

## 4. Test layers

### Layer A — Static checks

Check lint rules, TypeScript contracts, production build errors, accidental client-side secret exposure, and invalid imports.

### Layer B — Unit tests

Test pure functions and schemas independently: input validation, city comparison logic, source status formatting, date handling, evidence relationships, citation allow-list validation, and AI output parsing.

### Layer C — Integration tests

Test API Route Handlers with mocked external dependencies or a controlled test database. Confirm response shapes, limits, error mapping, and data integrity. Automated integration tests must not call Gemini or arbitrary external source sites by default.

### Layer D — Component tests

Test only meaningful interactions: filters, clearing selections, opening evidence details, displaying empty/error states, submitting a copilot query, and generating/copying a brief. Avoid brittle tests coupled to every DOM class or layout detail.

### Layer E — End-to-end tests

Exercise the primary journey in a browser against a running app with a repeatable dataset. For the release, verify the deployed URL in a clean browser session as well as the local app.

### Layer F — Manual product and trust review

Review source links and claims, keyboard access, responsive layouts, content clipping, loading states, browser console errors, and the final demo story.

## 5. Proposed test file layout

Follow the current repository layout if it already has a testing convention. For a new codebase, prefer:

```text
src/
  lib/
    validation.test.ts
    evidence.test.ts
    citations.test.ts
    comparison.test.ts
  features/
    gccs/
      gccs-service.test.ts
    copilot/
      copilot-schema.test.ts
      retrieval.test.ts
  app/
    api/
      gccs/route.test.ts
      copilot/route.test.ts
tests/
  e2e/
    primary-workflow.spec.ts
    resilience.spec.ts
```

The examples above are proposed locations, not a requirement to copy this exact structure if the actual application differs. Test names should reveal the behavior under test and should avoid depending on undocumented implementation details.

## 6. Repeatable test fixtures and seed data

Create a small stable test fixture set with deliberately varied data states:

- At least one GCC record with a strong first-party source.
- At least one company/centre relationship represented without duplicating the same company.
- At least two cities with comparable indicators.
- At least one missing city indicator.
- At least one estimate or self-reported value that is labelled accordingly.
- At least one record with conflicting source claims or counts.
- At least one record with a stale or unknown `last_checked_at` value.
- At least one record with a source URL that is syntactically valid for schema testing but should not be used as evidence in the final demo.

Use explicit fixture IDs so AI citation tests are repeatable. Keep production seed records and test fixtures distinguishable. Never create convincing-looking fake source URLs, fabricate company facts, or treat illustrative test content as verified market data.

Mock external boundaries in automated tests. Unit tests should not require `GEMINI_API_KEY`, a production Supabase project, or an internet connection.

## 7. Test matrix and acceptance cases

The IDs in this section are canonical references for `.ai/log.txt`, issues, and implementation phase gates. Mark each as `PASS`, `FAIL`, `BLOCKED`, or `NOT RUN`; do not use an ambiguous status such as “mostly done.”

### 7.1 Foundation and configuration

| ID | Scenario | Expected result | Priority |
|---|---|---|---|
| TST-001 | Install dependencies from the committed lockfile | Install completes without an unresolved dependency error | P0 |
| TST-002 | Run lint, typecheck, unit tests, and production build | All configured required commands exit successfully; any warning is recorded | P0 |
| TST-003 | Required environment variable is missing | App fails with a clear, safe configuration message; no secret is printed | P0 |
| TST-004 | Inspect built client assets and browser network | Gemini API key and privileged database credentials are not exposed | P0 |
| TST-005 | Load a core route directly and refresh it | Route loads without relying on client-only navigation state | P0 |

### 7.2 Dataset, identity, and evidence

| ID | Scenario | Expected result | Priority |
|---|---|---|---|
| TST-010 | Seed database from version-controlled migrations and seed files | Schema and demo data are recreated without manual database edits | P0 |
| TST-011 | Load a record with missing headcount | UI displays unknown/not reported; it does not display zero | P0 |
| TST-012 | Load a record with an estimate | Estimate label, date/period if known, and source context remain visible | P0 |
| TST-013 | Company has separate centres in different cities | Company and centre relationships remain distinct; city information is not collapsed incorrectly | P0 |
| TST-014 | Two sources report different market counts | Both claims and their source/methodology context can be represented; neither is silently overwritten | P0 |
| TST-015 | Source lacks a publication date | Publication date is shown as unknown; last-checked date is not substituted as publication date | P0 |
| TST-016 | Evidence is stale or its freshness is unknown | UI communicates the stale/unknown state according to `DATA_TRUST.md` | P0 |
| TST-017 | Source URL is malformed or absent for a material claim | Validation rejects it or the claim is visibly marked without a verified citation; the UI does not render a broken trusted link | P0 |
| TST-018 | Query returns no records | A helpful empty state appears; no fabricated result is displayed | P0 |

### 7.3 GCC Explorer and company profiles

| ID | Scenario | Expected result | Priority |
|---|---|---|---|
| TST-020 | Search using a known company name | Expected seeded record appears | P0 |
| TST-021 | Search using a partial name with mixed case | Matching is consistent with the documented search behavior | P0 |
| TST-022 | Apply city and sector/function filters | Results satisfy active filters and counts reflect the filtered result set where shown | P0 |
| TST-023 | Clear filters | Default result set returns and stale filter UI is removed | P0 |
| TST-024 | Open a company/centre profile | Correct identity, known attributes, evidence claims, and related sources appear | P0 |
| TST-025 | API receives invalid filter values or excessive page size | Request is validated and bounded; a safe error or normalized response is returned | P0 |
| TST-026 | Database is unavailable during Explorer use | User sees a recoverable error, not a false empty dataset or seeded fallback presented as live data | P0 |

### 7.4 Location comparison

| ID | Scenario | Expected result | Priority |
|---|---|---|---|
| TST-030 | Select at least two cities | Comparison displays a column/row or equivalent comparison for selected cities | P0 |
| TST-031 | Indicators use different units or time periods | Units and periods are visible; incompatible values are not compared as if directly equivalent | P0 |
| TST-032 | One city's value is missing | Missing value is shown as unavailable, not zero, and does not silently improve or reduce a score | P0 |
| TST-033 | A value is an estimate | Estimate label and source information remain visible | P0 |
| TST-034 | User adjusts comparison criteria or weights, if supported | Output changes deterministically and methodology remains inspectable | P1 unless implemented in P0 scope |
| TST-035 | A city lacks enough data for an overall score | Overall score is omitted or clearly marked insufficient evidence; no false precision | P0 |
| TST-036 | Comparison API receives duplicate or invalid city IDs | IDs are validated/deduplicated and invalid requests receive a predictable response | P0 |

### 7.5 AI Research Copilot

| ID | Scenario | Expected result | Priority |
|---|---|---|---|
| TST-040 | Valid supported question matches seeded evidence | Copilot returns a relevant answer with one or more validated evidence references when appropriate | P0 |
| TST-041 | Question is answerable only partially | Answer separates supported facts from unknowns and does not fill gaps with guesses | P0 |
| TST-042 | Question requires information absent from the dataset | Copilot clearly states the limitation and suggests useful next research; no invented factual answer | P0 |
| TST-043 | Model returns a citation ID not present in the request's retrieved evidence set | Server rejects/removes the invalid citation and does not link it to another source | P0 |
| TST-044 | Model returns malformed JSON or violates the response schema | Validation fails safely; one bounded retry may be used if specified, then a user-safe error is shown | P0 |
| TST-045 | Model includes a source URL not supplied by the retrieval packet | Server does not treat the URL as a validated citation | P0 |
| TST-046 | Retrieved source content contains instructions targeting the model | Source is handled as untrusted evidence; system and developer rules are not overridden | P0 |
| TST-047 | Question asks for two conflicting GCC counts | Copilot explains that definitions/methodologies may differ when evidence supports that explanation and cites both claims; it does not invent reconciliation | P0 |
| TST-048 | Question is empty, excessively long, or malformed | Request is rejected with a clear validation message before expensive provider work | P0 |
| TST-049 | Gemini times out, rate-limits, or returns a provider error | Application shows a recoverable message, preserves the question/context where possible, and does not fabricate fallback facts | P0 |
| TST-050 | Gemini credentials are unavailable | Core non-AI explorer still works; copilot explains that the service is unavailable | P0 |
| TST-051 | Rapid repeated copilot requests exceed configured guardrails | Rate/usage controls are applied and the user receives a clear response | P0 if public endpoint is deployed |

### 7.6 Decision brief

| ID | Scenario | Expected result | Priority |
|---|---|---|---|
| TST-060 | Generate a brief from a valid question/comparison | Brief contains a summary, findings, evidence references, assumptions/unknowns, and next questions according to the specification | P0 |
| TST-061 | Brief contains source references | Every displayed citation resolves to a source already validated by the server | P0 |
| TST-062 | Brief includes recommendations based on incomplete indicators | Limitations and missing inputs are stated; unsupported certainty is avoided | P0 |
| TST-063 | Brief generation fails | UI preserves existing selections and gives a retryable error | P0 |
| TST-064 | Copy/download output is implemented | Copied/downloaded content is readable and matches the on-screen content | P1 if time requires cutting this feature |

### 7.7 Usability, responsiveness, accessibility, and release

| ID | Scenario | Expected result | Priority |
|---|---|---|---|
| TST-070 | Main journey at desktop width | No blocking layout issues; key controls and evidence are discoverable | P0 |
| TST-071 | Main journey at narrow mobile width | No critical overflow; filters, tables/comparisons, and copilot remain usable | P0 |
| TST-072 | Navigate core journey using keyboard | Focus is visible; core inputs/buttons/links can be reached and activated | P0 |
| TST-073 | Loading, empty, and error states | States are distinct and readable; loading does not appear indefinitely | P0 |
| TST-074 | Source/external links | Correct destination opens; links are descriptive and use safe external-link behavior where applicable | P0 |
| TST-075 | Open deployed app in private/incognito window | Public app works without developer session/cookies and without unexpected access requirements | P0 |
| TST-076 | Check browser console and network on the critical path | No uncaught application errors or leaked secrets; failed external calls are understood | P0 |
| TST-077 | Run final regression after last code change | Required static checks and critical path are rerun after the last meaningful change | P0 |

## 8. Unit-test specifications

At minimum, create deterministic unit tests for these pure functions and schemas where they exist in the implementation:

### 8.1 Request validation

- Accept a valid search request and normalize allowable defaults.
- Reject malformed IDs, unsupported filter values, negative limits, and overlong strings.
- Enforce maximum query length and bounded result limits.
- Reject empty copilot questions without calling the model.

### 8.2 Evidence and source utilities

- Map each evidence status to the documented label, icon, and visual treatment.
- Distinguish `published_at`, `last_checked_at`, and any validity period.
- Format unknown and null values consistently.
- Preserve source/claim relationships and handle a claim with more than one source.
- Do not treat a syntactically valid URL as evidence of factual support.

### 8.3 Citation validation

- Accept an evidence ID included in the current retrieval packet.
- Reject unknown IDs and IDs that belong to another request.
- Reject citations to sources that were not retrieved for the request.
- Render only source metadata resolved by server-side lookup; never trust model-generated URLs or titles.
- Handle duplicate citations without duplicating the same source card unnecessarily.

### 8.4 Location comparison

- Respect indicator units, period, direction, and comparison eligibility.
- Keep missing values missing; never coerce `null` to zero.
- Normalize only when an explicit and tested conversion is defined.
- Make weighting and score calculation deterministic if scoring is implemented.
- Omit or flag a composite score where minimum evidence requirements are not met.

### 8.5 AI response contract

- Parse a valid response matching the Zod schema.
- Reject a malformed object, missing required fields, invalid enum values, and unexpected types.
- Ensure an invalid model response never bypasses citation validation.
- Ensure “insufficient evidence” is a supported response state.

## 9. Integration-test specifications

Use mocked `Supabase` and Gemini SDK boundaries or a dedicated test database with fixed fixtures. Keep live credentials out of normal CI/test runs.

### 9.1 API Route Handlers

For each route defined in `ARCHITECTURE.md`, test success, validation, empty results, and dependency failure as applicable:

- `GET /api/overview`
- `GET /api/gccs`
- `GET /api/gccs/[id]`
- `GET /api/cities`
- `GET /api/cities/compare`
- `POST /api/copilot`
- `POST /api/briefs/generate`

Assert status code and response shape. Never assert only that an endpoint returns `200`; assert that the response is semantically correct for the fixture used.

### 9.2 Database behavior

- Migrations apply from an empty schema in a reproducible order.
- Seed scripts can be rerun safely or explicitly fail safely when designed as one-time setup.
- Foreign keys prevent orphan evidence and centre relationships.
- Queries enforce documented bounds and sort behavior.
- No browser-side write path exists for public seed data.

### 9.3 AI boundary behavior

- The model receives only relevant, bounded evidence for the request.
- A user question cannot directly select arbitrary database tables or SQL fragments.
- Model errors are mapped to safe application errors without exposing provider internals or secrets.
- Structured output parsing and citation validation run for every successful model response.

## 10. End-to-end critical workflow

Create one Playwright test for the primary user journey. Use stable accessible labels or `data-testid` only when a semantic locator is impractical. The test must not rely on arbitrary sleeps; wait for defined UI state or network completion.

### E2E-001 — Discover, compare, research, brief

1. Navigate to the Overview page.
2. Confirm the dashboard's coverage figures reflect the seeded dataset.
3. Open GCC Explorer and search for a seeded company.
4. Open its profile and confirm at least one source/evidence item is visible.
5. Open the source link or assert its destination is the correct fixture source URL.
6. Navigate to Location Intelligence and select at least two fixture cities.
7. Confirm comparison values, labels, units, and a missing-value state are shown accurately.
8. Ask a supported copilot question whose answer is covered by fixtures.
9. Confirm the answer and its citation link are shown.
10. Ask an unsupported question and confirm the UI states the evidence limitation.
11. Generate a decision brief and confirm it displays the required sections and source references.
12. Reload a core route and confirm the application remains usable.

If live AI makes deterministic E2E assertions unreliable, use a test-mode model stub for CI and perform one separately documented live-model smoke test. Do not weaken tests so much that they stop checking grounding or citations.

### E2E-002 — Resilience (if time permits)

- Simulate a copilot API error or timeout.
- Confirm the error is understandable and user input is preserved where possible.
- Confirm the GCC Explorer still works when the AI provider is unavailable.
- Confirm no unhandled exception or infinite loading state occurs.

## 11. AI quality evaluation

AI evaluation is not just a response-quality opinion. Use a small, repeatable golden set with known expected behavior.

### 11.1 Minimum golden set

1. **Supported lookup:** identify a seeded company and city from evidence.
2. **Supported comparison:** summarize two cities based on known fixture indicators.
3. **Unknown headcount:** state that headcount is not available rather than guessing.
4. **Conflicting counts:** show the conflicting source claims and avoid false reconciliation.
5. **Unsupported city ranking:** explain that available evidence is insufficient for a definitive ranking.
6. **Prompt injection in source text:** ignore embedded instructions and treat the text as data.
7. **Fabricated citation:** reject a model-generated evidence ID that was not retrieved.
8. **Provider failure:** respond safely to timeout or rate limit.

### 11.2 Evaluation rubric

For each golden case, record `PASS` or `FAIL` for:

- **Grounding:** factual claims are supported by retrieved records.
- **Citation integrity:** every citation ID maps to retrieved evidence and every link is resolved by the server.
- **Uncertainty:** unknowns, estimates, conflicts, and limitations are appropriately communicated.
- **Task fit:** answer addresses the actual user question.
- **Safety:** source text and user input do not override system constraints or reveal secrets.

A syntactically valid citation can still be irrelevant to a claim. Human review of the final golden set must confirm that the source actually supports the statement; ID validation by itself is not enough.

### 11.3 Live-model smoke test

When valid Gemini credentials are configured, run at least one supported and one unsupported question against the live provider. Record model identifier/configuration, date, result, and any unexpected behavior in the log without logging API keys or sensitive request data. Keep normal automated tests mocked and repeatable.

## 12. Security and privacy checks

Before submission, confirm:

- Gemini credentials and privileged Supabase credentials exist only in server-side environment variables.
- `.env.local` and any secrets are ignored by Git; `.env.example` contains names/placeholders only.
- Copilot and brief endpoints have input size limits and reasonable request/usage controls.
- User text is rendered as text by default; Markdown/HTML rendering does not execute untrusted source content.
- External links are resolved from trusted database records, not arbitrary model-produced HTML or URLs.
- Database access for the public demo is read-only from the browser; server service-role keys are not used in a client bundle.
- Errors shown to the user do not expose API keys, stack traces, SQL, internal prompts, or provider payloads.
- Source content is treated as untrusted data and cannot mutate records or execute code.
- No unnecessary user question history or generated brief is persisted without an explicit product requirement.

Security tests should verify behavior, not merely search source code for a few strings. For example, inspect the production bundle and browser network activity for client-exposed credentials.

## 13. Accessibility and visual QA checklist

Perform a focused manual pass on the critical screens:

- All important interactive elements have accessible names.
- Keyboard focus is visible and logical.
- Buttons, inputs, selects, and dialogs can be used without a mouse for the primary journey.
- Text and status badges remain readable; color is not the only way to convey verification state.
- Tables/comparisons remain usable at narrow widths (horizontal scrolling is acceptable if clearly signposted).
- Loading, empty, success, and error states are visually distinct.
- Text doesn't clip in company names, source titles, or long evidence URLs.
- Reduced-motion preferences are respected if nonessential motion is used.
- The browser console contains no uncaught critical errors during the main journey.

This is a pragmatic assessment checklist, not a formal accessibility certification.

## 14. Per-phase quality gates

Use these gates alongside `IMPLEMENTATION_PLAN.md`:

| Phase | Required verification before marking complete |
|---|---|
| Phase 0 — Repository/spec review | Existing files/scripts/dependencies inspected; conflicts and open decisions logged |
| Phase 1 — Application foundation | App boots; lint/typecheck/build as configured; safe environment validation; direct route works |
| Phase 2 — Data foundation | Migrations and seed data are reproducible; evidence and relationships validate; TST-010 to TST-018 relevant cases pass |
| Phase 3 — GCC Explorer | TST-020 to TST-026 pass; search, filters, profile, sources, and failure states work |
| Phase 4 — Location comparison | TST-030 to TST-036 pass; missing data and methodology are transparent |
| Phase 5 — AI Copilot | TST-040 to TST-051 relevant cases pass with mocked provider; live smoke test is recorded if credentials exist |
| Phase 6 — Decision Brief | TST-060 to TST-064 relevant cases pass; evidence, assumptions, and limitations remain intact |
| Phase 7 — QA and deployment | Static checks pass; E2E or documented manual equivalent passes; public deployment verified |
| Phase 8 — Submission | TST-075 to TST-077 pass; deck and product claims align; final URLs and status recorded |

If a gate fails, fix it or explicitly document a scoped blocker and cut lower-priority work. Do not mark a failed or unrun test as passed simply to advance the phase.

## 15. Severity and prioritization

Use the following classifications:

- **P0 / Blocker:** core journey fails, material data fabrication, invalid evidence citation, exposed secret, unusable deployed URL, or unrecoverable app failure. Must fix before submission.
- **P1 / Major:** an important secondary behavior fails, but the primary journey remains possible. Fix if time permits; otherwise document.
- **P2 / Minor:** small visual polish issue or low-impact inconvenience with a practical workaround.

When a P0 test fails, stop adding features until the cause is understood. Prefer correcting the root cause instead of adding a demo-only workaround that hides the problem.

## 16. Bug report template

Use this format in issues or the checkpoint log:

```text
ID:
Severity: P0 | P1 | P2
Related test ID:
Environment: local | test | deployed
Steps to reproduce:
Expected behavior:
Actual behavior:
Evidence: console output, screenshot, or sanitized response
Likely cause (if known):
Fix:
Regression test added:
Status: OPEN | FIXED | VERIFIED
```

Do not include API keys, tokens, private user information, or unsanitized secret-bearing logs.

## 17. Required test reporting in `.ai/log.txt`

At each implementation phase checkpoint, add:

- Phase and checkpoint identifier.
- Exact commands executed and pass/fail/exit status.
- Test IDs executed and status.
- Tests not run and reason.
- Failures found and how they were addressed.
- Manual checks performed.
- Remaining known risks and blockers.
- Next action.

Use precise wording. Example:

```text
Tests:
- `npm run lint` — PASS (exit 0)
- `npm run typecheck` — PASS (exit 0)
- `npm run test` — FAIL (TST-043 citation allow-list assertion)
- `npm run build` — NOT RUN (blocked by failing typecheck)
Manual:
- TST-024 profile/source inspection — PASS
- TST-071 mobile layout — NOT RUN
```

Do not paste large raw logs into `.ai/log.txt`; summarize them and link to a file if one is intentionally retained in the repository. Never include secrets.

## 18. Final release checklist

### Functional correctness
- [ ] Core dashboard and GCC Explorer load.
- [ ] Search, filters, company profile, and source details work.
- [ ] City comparison shows units, periods, missing data, and method limitations.
- [ ] Copilot answers are grounded in retrieved evidence.
- [ ] Unsupported questions are handled honestly.
- [ ] Decision brief contains evidence, assumptions, unknowns, and next questions.

### Quality and security
- [ ] Lint passes.
- [ ] Typecheck passes.
- [ ] Unit/integration suite passes.
- [ ] Production build passes.
- [ ] Playwright critical path passes, or a manual equivalent is recorded if tooling cannot be configured in time.
- [ ] No client-visible secrets or privileged database credentials.
- [ ] No known P0 issue remains.

### Deployment and submission
- [ ] Public URL works in an incognito/clean browser.
- [ ] Core journey was tested against the deployed build after the final code change.
- [ ] Important source links work and support the claims they accompany.
- [ ] Mobile and desktop layouts are usable.
- [ ] Deck statements match the actual product and data coverage.
- [ ] Final deployment URL, test summary, and remaining limitations are recorded in `.ai/log.txt` and `README.md`/`SUBMISSION.md` as appropriate.

**Release rule:** GCC Fieldbook is ready to submit only when the P0 journey works, the deployed URL is accessible to reviewers, evidence integrity checks pass, and the test status is reported truthfully.

## 19. Related documents

- [`RESEARCH.md`](./RESEARCH.md) — market hypotheses, competitors, and research sources.
- [`PRD.md`](./PRD.md) — target user, MVP scope, functional requirements, and product acceptance criteria.
- [`ARCHITECTURE.md`](./ARCHITECTURE.md) — components, API contracts, data flows, security, and architecture decisions.
- [`DESIGN.md`](./DESIGN.md) — visual system, interactions, responsive layout, and screen states.
- [`DATA_TRUST.md`](./DATA_TRUST.md) — source standards, verification, uncertainty, and conflicts.
- [`AI_COPILOT.md`](./AI_COPILOT.md) — retrieval, prompts, response contracts, citation validation, and AI evaluations.
- [`IMPLEMENTATION_PLAN.md`](./IMPLEMENTATION_PLAN.md) — phase tasks, acceptance gates, schedule, and coding-agent protocol.
- [`log.txt`](./log.txt) — authoritative development/test execution history.
