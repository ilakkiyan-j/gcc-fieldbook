# GCC Fieldbook — Product Requirements Document

> **Product:** GCC Fieldbook  
> **Tagline:** The working guide to India's GCC ecosystem.  
> **Document:** Product Requirements Document (PRD)  
> **Version:** 0.1 — MVP specification for the Flexiple Product Intern assessment  
> **Last updated:** 13 October 2026  
> **Status:** Proposed; subject to user validation and implementation checkpoints  
> **Companion document:** [`RESEARCH.md`](./RESEARCH.md)

---

## 1. Executive summary

GCC Fieldbook is an evidence-first research workspace for teams evaluating India's Global Capability Centre (GCC) ecosystem. It helps users discover relevant GCCs, inspect the evidence behind company and market claims, compare a small set of locations, use AI to synthesize retrieved information, and generate a decision brief that preserves sources, assumptions, unknowns, and open questions.

The initial user hypothesis is **GCC advisors and market-entry teams** that repeatedly research the ecosystem for client engagements. The prototype will focus on one end-to-end task rather than trying to become a comprehensive GCC marketplace or data platform within the assessment window.

### Product thesis

> GCC Fieldbook turns fragmented GCC market research into a repeatable, auditable decision workflow: discover → inspect evidence → compare options → prepare a defensible brief.

### Core product principle

**A useful answer is not just a confident answer; it is an answer that lets the user inspect the evidence and understand what remains uncertain.**

### MVP outcome

A reviewer should be able to ask a realistic question about establishing an AI engineering GCC in India, find relevant records, inspect source evidence, compare selected cities using transparent criteria, ask the copilot to summarize the evidence, and generate a concise decision brief without leaving the application.

The app must represent its dataset honestly. It is a curated prototype dataset, not a complete or officially authoritative registry of all GCCs in India.

---

## 2. Background and problem statement

### 2.1 Problem

A company evaluating India for a new GCC may need to research existing GCCs, city strengths, talent indicators, office-market conditions, policies, and potential service providers. Relevant information is scattered across company announcements, official policy pages, public filings, industry reports, property research, and service-provider websites. Users often need to find, normalize, date, reconcile, and compare this information before turning it into a recommendation.

The research document identifies two well-supported structural challenges:

1. **Fragmented discovery:** useful facts are distributed across different sources and formats.
2. **Differences in definitions and evidence:** GCC market totals can vary by date, methodology, and whether the source counts companies, GCCs, units, or sites.

Additional pain points—such as repeated manual work, slow brief production, and reliance on personal networks—are plausible user hypotheses that still need customer interviews.

### 2.2 Problem statement

**For GCC advisory and market-entry teams, it is difficult to turn fragmented and sometimes conflicting information about India's GCC ecosystem into a transparent, comparable, client-ready recommendation.** Existing alternatives include search engines, reports, spreadsheets, proprietary intelligence products, referrals, and general-purpose AI tools. GCC Fieldbook will test whether a source-linked workflow makes that research easier to reproduce and defend.

### 2.3 Why now / why this product

The category already has direct products advertising GCC directories, profiles, location intelligence, market signals, and AI insights. A generic directory or a chat interface alone is therefore not a sufficient product thesis. GCC Fieldbook will differentiate through the proposed workflow and product behavior: visible provenance, explicit definitions and dates, surfaced conflicts, configurable comparison criteria, and a decision brief that carries its evidence with it. These are proposed differentiators to test—not claims that competitors do not offer them.

---

## 3. Goals, non-goals, and product principles

### 3.1 Goals for the assessment MVP

1. Demonstrate a complete evidence-to-decision workflow from a user's question to a useful brief.
2. Let users search a curated set of GCC records by company, city, sector, parent company, and known functions.
3. Expose the source and freshness metadata behind material claims.
4. Compare a small set of cities using consistent, inspectable criteria and visible missing data.
5. Provide an AI copilot that answers from retrieved application records and cites those records.
6. Generate a brief that carries source links, assumptions, limitations, and unanswered questions.
7. Deploy a polished, responsive prototype with an accessible public link and no setup required for reviewers.

### 3.2 Non-goals for the assessment MVP

- A complete registry of all Indian GCCs or a claim of nationwide data completeness.
- Automated crawling or continuous web monitoring of every company, policy, or job listing.
- A legally authoritative source for eligibility, tax, investment, or incentive advice.
- A full service-provider marketplace, public reviews, or verified provider-performance rankings.
- An autonomous multi-agent research system.
- Real-time salary, rent, headcount, leasing, or incentive-eligibility predictions without sourced data.
- Enterprise billing, subscription management, multi-tenant administration, or complex user roles.
- A vector database unless later testing demonstrates a real retrieval need that PostgreSQL search cannot meet.

### 3.3 Product principles

- **Evidence before eloquence:** show why the product says something.
- **Unknown is a valid state:** do not fill gaps with plausible-looking values.
- **Definitions travel with numbers:** preserve unit, period, methodology, and publisher.
- **Show conflicts rather than silently resolving them:** different figures may measure different things.
- **Recommendations are conditional:** expose the criteria and weights that shape city comparisons.
- **Small and reliable beats broad and shallow:** curated records are acceptable for an MVP if coverage is disclosed.
- **AI assists; evidence decides:** the model can summarize and explain but must not fabricate underlying market facts.
- **Optimize for one coherent workflow:** do not build disconnected features just to increase feature count.

---

## 4. Target users and jobs to be done

### 4.1 Primary user hypothesis

**GCC advisor / market-entry consultant** preparing research for a client that is exploring or expanding a GCC in India.

Typical needs:
- Identify relevant companies and GCC examples.
- Understand how locations differ for a particular business function.
- Check whether figures or claims are trustworthy and current.
- Compare alternatives against a client's stated priorities.
- Produce a brief that can be reviewed by colleagues or presented to a client.

This is a hypothesis, not a validated customer segment. Research interviews and hands-on competitor testing remain outstanding.

### 4.2 Secondary users

- Global companies investigating a first or additional GCC in India.
- Strategy and operations leaders at existing GCCs.
- Researchers and analysts who need traceable information.
- Service providers seeking to understand the GCC landscape. Provider discovery is secondary in this MVP and will not drive the main workflow.

### 4.3 Jobs to be done

**Primary JTBD:**

> When I am asked to assess India's GCC options for a client, help me assemble relevant examples, compare a shortlist of cities against stated criteria, and generate a traceable brief so I can explain the recommendation and its limitations without rebuilding the research from scratch.

**Supporting jobs:**

- “Help me find relevant GCC examples by sector, city, or function.”
- “Show me where this figure came from and when it was published.”
- “Explain why two published GCC counts differ.”
- “Compare selected cities using the available evidence and show what is missing.”
- “Turn the evidence I inspected into a brief I can share.”

### 4.4 Primary demo scenario

A client is considering a **200-person AI engineering GCC in India** and asks:

> “Which two or three cities should we investigate first, and what evidence supports the shortlist?”

The app will help the advisor inspect GCC examples and available city indicators, compare selected locations, ask the copilot for a source-grounded synthesis, and generate a preliminary decision brief.

Important: 200 people is the scenario input, not a forecast of the right headcount or proof that a city can support that hiring plan. The result is a preliminary research shortlist, not a definitive city recommendation.

---

## 5. Product scope and prioritization

Use the following priority labels:

- **P0 — Must have:** required for the core demo to work end to end.
- **P1 — Should have:** add only after all P0 acceptance criteria pass.
- **P2 — Later:** explicitly deferred beyond the assessment.

### 5.1 P0 — Must have

1. **Dashboard / workspace home** with a clear product description, dataset coverage, search entry point, and links into the main workflows.
2. **GCC Explorer** with search, basic filters, result count, and record detail navigation.
3. **GCC / centre profile** showing available facts, evidence references, source dates, last-checked dates, and unknown/conflicting fields where applicable.
4. **Evidence record / source details** that let the user inspect a source title, publisher, URL, source type, publication date if known, and last-checked date.
5. **City comparison** for a limited set of cities and available indicators. Show values, units, dates, source links, missing data, criteria, and weights. A composite score is optional and must be transparent if included.
6. **AI Research Copilot** grounded in relevant database records and source references. The copilot must show citations that open the referenced records or sources.
7. **Decision Brief generation** using retrieved data and the current comparison. Include recommendation/shortlist, rationale, cited evidence, assumptions, limitations, and follow-up questions.
8. **Public deployed demo** with responsive behavior, understandable error states, and no exposed server secrets.
9. **Seeded source-backed dataset** sufficient to demonstrate the workflow without suggesting complete national coverage.

### 5.2 P1 — Should have if time permits

- Basic provider profiles with evidence type clearly distinguished (independently corroborated vs provider self-report).
- A methodology explainer for discrepant market counts.
- Save or copy a brief as Markdown, and optionally print/export it.
- Suggested copilot prompts and a few guided demo questions.
- A simple source freshness or verification status filter.
- Compare up to four cities, provided data remains readable and comparable.

### 5.3 P2 — Later

- Large-scale automated discovery and refresh pipelines.
- Alerts for potential GCC openings, expansions, or leadership changes.
- Public provider ratings or delivery-reputation rankings.
- Community-contributed edits and moderation.
- User workspaces, authentication, sharing permissions, and team collaboration.
- Paid plans, marketplace monetization, billing, lead generation, and analytics dashboard for customers.
- Embeddings/vector search, a separate Python service, agent orchestration, and background job queues unless justified by validated needs.

### 5.4 Scope cut rule

If delivery is at risk, preserve this order:

1. Source-backed search and record details.
2. Transparent city comparison.
3. Grounded AI answer with working citations.
4. Decision brief.
5. Visual polish beyond the core layout.
6. Provider examples and other enhancements.

Do not sacrifice source integrity or end-to-end functionality to add more modules.

---

## 6. Core user journeys

### Journey A — Discover a GCC and inspect its evidence

1. User opens the dashboard.
2. User navigates to GCC Explorer.
3. User searches for a company or applies city/sector/function filters.
4. Results show only fields supported by the current dataset.
5. User opens a record.
6. User inspects the profile and opens evidence sources.
7. User can distinguish verified, single-source, self-reported, conflicting, stale, and unknown information.

**Expected result:** The user understands what Fieldbook knows about a record and can inspect where material claims came from.

### Journey B — Compare cities for a client scenario

1. User opens Location Intelligence.
2. User chooses two to four cities.
3. User selects available comparison criteria or uses a clearly labeled default.
4. The app displays comparable indicator values with units, periods, source references, and missing-data states.
5. If a weighted fit score is offered, the app shows its inputs, normalization approach, weights, and missing indicators.
6. User adjusts a criterion or weight and can observe how the comparison changes.

**Expected result:** The user can explain the trade-offs without mistaking the score for an objective universal ranking.

### Journey C — Ask the AI Research Copilot

1. User selects a suggested prompt or types a question.
2. The app retrieves relevant structured records and linked evidence.
3. The model receives only relevant retrieved context and instructions for grounded output.
4. The response answers the question, cites its source records, and calls out gaps or conflicts.
5. Clicking a citation opens the relevant company profile or source detail.
6. If the dataset does not support an answer, the copilot says so and suggests what evidence is missing.

**Expected result:** The user gets a helpful summary without losing the ability to inspect its basis.

### Journey D — Generate a decision brief

1. User has a question and selected cities/records.
2. User chooses “Generate decision brief.”
3. The app produces a structured report from retrieved data and the current comparison.
4. The report includes the question, scope, preliminary shortlist, rationale, cited evidence, assumptions, unknowns, and next research steps.
5. User can inspect sources and copy or download the output if implemented.

**Expected result:** A brief that is useful for further research and review, with material claims traceable to application records.

---

## 7. Functional requirements

### FR-01 — Application navigation

**Requirement:** Provide consistent navigation to Dashboard, GCC Explorer, Location Intelligence, AI Copilot, and Decision Brief.

**Acceptance criteria:**
- The main destinations are visible on desktop and usable on mobile.
- Active navigation state is visible.
- No main navigation item leads to an unfinished or broken page.
- Any feature not implemented is either hidden or clearly marked as a future capability; it must not appear functional when it is not.

### FR-02 — Dashboard

**Requirement:** Introduce the product and route users into the core workflow.

**Acceptance criteria:**
- Shows product name and tagline.
- Provides a prominent search or research-question entry point.
- Shows only metrics computed from the actual seeded dataset (e.g., number of records and cities represented).
- Labels dataset coverage as curated/sample coverage, not total market coverage.
- Includes a clear route to start a location-comparison or research workflow.

### FR-03 — GCC Explorer

**Requirement:** Search and filter the available company/centre dataset.

**Minimum behaviors:**
- Search by company name and parent company.
- Filter by Indian city, sector, and known business function where those fields exist.
- Combine filters without producing contradictory UI states.
- Show active filters and allow them to be cleared.
- Display result count, empty state, and loading/error states.
- Use a stable detail link for each record.

**Acceptance criteria:**
- Search is case-insensitive for ordinary names.
- Filters work against database values, not a separately hardcoded frontend list.
- “No results” is distinguishable from a failed request.
- The interface never fills unknown values with inferred or invented facts.

### FR-04 — GCC / centre profile

**Requirement:** Show a structured profile for each seeded record.

**Minimum fields where supported:** company/brand name, parent company, sector, city, known functions, establishment/announcement date if sourced, short context, record definition/qualification note, and related sources.

**Acceptance criteria:**
- Unknown data is shown as “Not found in available sources,” “Not disclosed,” or another appropriate explicit state.
- Every material displayed fact has at least one linked source or is visibly marked as an unverified inference/assumption.
- The interface differentiates parent company, Indian legal entity, GCC, and individual centre/site where the available evidence permits.
- Clicking a source opens the original public URL safely in a new tab or opens the source detail view.

### FR-05 — Evidence and source transparency

**Requirement:** Make provenance inspectable at field or claim level.

**Source metadata fields:** source title, publisher/issuer, URL, source type, publication date if known, access/last-checked date, notes, and evidence status.

**Acceptance criteria:**
- Material records link to at least one source.
- Source metadata distinguishes publication date from last-checked date.
- Source types and evidence statuses are labeled consistently.
- Conflicting values can coexist with their sources and dates rather than being silently overwritten.
- No fake source links, placeholder citations, or generated URLs are shown as valid evidence.

### FR-06 — Location Intelligence and comparison

**Requirement:** Compare selected cities using sourced, comparable indicators.

**Initial candidate criteria:** talent or capability indicators, GCC presence/cluster evidence, office-market indicators, relevant industry specialisation, and official state-policy references. Only use a criterion when the evidence supports it and the metric can be explained.

**Acceptance criteria:**
- User can select at least two and up to four cities.
- Each value includes a unit and measurement period where relevant.
- Each indicator links to its source.
- Missing data is explicitly shown; it is not silently treated as zero.
- The UI identifies when two values use different periods or definitions and therefore are not directly comparable.
- If fit scores are calculated, the UI displays the inputs, relative weights, scaling/normalization rules, and limitations.
- A score is described as a comparison under the user's selected assumptions—not “the best city” as an absolute claim.
- Recalculating or changing a criterion updates the displayed comparison consistently.

### FR-07 — AI Research Copilot

**Requirement:** Answer questions by retrieving relevant records and asking the language model to synthesize only the supplied evidence.

**Minimum supported questions:**
- Find GCC records matching a city, sector, or function.
- Summarize evidence about a selected company or location.
- Explain conflicting headline counts when the relevant source records are in the dataset.
- Summarize a current city comparison.
- Identify missing information and propose targeted follow-up research.

**Acceptance criteria:**
- Data is retrieved by application code from permitted structured records; the LLM must not create SQL and execute it without safe validation.
- The system prompt and request payload instruct the model to use only supplied evidence for factual claims.
- Each material factual claim in the visible answer has one or more citations to retrieved evidence, or is visibly labeled as an assumption or unknown.
- Citations correspond to real records returned by the retrieval step.
- Clicking a citation opens a source or record that supports the associated claim.
- Unsupported questions receive an explicit limitation response rather than fabricated answers.
- Conflicting sources are represented with relevant dates/definitions, not collapsed into an unexplained average.
- API errors, timeouts, and empty retrieval results produce clear, recoverable UI messages.
- Provider/API secrets remain server-side.

### FR-08 — Decision Brief

**Requirement:** Generate a structured, reviewable output from the research question, retrieved data, and comparison.

**Required sections:**
1. Research question and scope.
2. Preliminary shortlist or findings.
3. Rationale by option.
4. Evidence references and relevant dates.
5. Comparison criteria and weights, if used.
6. Assumptions and data limitations.
7. Conflicts or important unknowns.
8. Suggested next research steps.

**Acceptance criteria:**
- The brief uses the currently selected question, cities, and relevant records.
- Material factual claims are linked to actual source references or marked as assumptions/unknowns.
- It does not invent salary, rent, headcount, incentive amounts, provider delivery outcomes, or market totals.
- It includes a clear “preliminary research, not professional legal/tax/investment advice” note where policy/incentive information is discussed.
- User can copy the result; Markdown download or print-to-PDF may be added if time allows.
- A failed AI request does not erase the user's selected cities or question.

### FR-09 — Curated dataset and data disclosure

**Requirement:** Ship a small but credible sample dataset that supports the demo.

**Target:** Aim for 25–40 source-backed GCC/centre profiles, 5–6 city profiles with a limited set of sourced indicators, and a small selection of official state-policy records. These are target quantities, not claims of current coverage. Do not block release solely on hitting the top of a record-count range if the evidence quality would suffer.

**Release gate:** At least 20 usable GCC/centre records across at least four major city markets, and enough sourced indicators to make two-city comparison meaningful. If this minimum cannot be reached reliably, reduce the scope and disclose the smaller dataset honestly.

**Acceptance criteria:**
- Dataset size and city coverage are derived from the records in the database.
- Every seeded record has a stable identifier.
- Core fields have citations, or explicit unknown status.
- Seed files and migrations can recreate the local/demo dataset reproducibly.
- Dataset notes disclose that the app is a curated sample and explain its scope.
- Data licensing/terms and public-source restrictions are respected.

### FR-10 — Public deployment and reliability

**Requirement:** Make the MVP accessible to reviewers through a stable public URL.

**Acceptance criteria:**
- Public URL opens without requiring reviewers to configure local environment variables.
- Primary workflow is usable in current desktop Chrome and a narrow mobile viewport.
- Refreshing a core route does not result in a broken page.
- Loading, empty, success, and failure states exist for the critical flow.
- No secrets or privileged database credentials are shipped to the browser.
- README documents local setup and required environment variables without containing their secret values.

---

## 8. Information architecture and screen requirements

### 8.1 Proposed navigation

- **Overview** — product introduction, actual dataset coverage, entry points.
- **GCC Explorer** — search/filter results and GCC/centre profiles.
- **Location Intelligence** — city selection, indicators, comparison, weights.
- **AI Research** — question input, responses, citations, suggested prompts.
- **Decision Brief** — current generated report and copy/export actions.

Provider discovery may be added as a secondary area only if evidence-backed records are available and the P0 flow is complete.

### 8.2 Overview / dashboard

Must answer: “What is this product, what evidence does it contain, and how do I start?” Avoid decorative KPI cards that imply data completeness or business outcomes we have not measured.

### 8.3 GCC Explorer

Prioritize scanability, useful filters, meaningful empty states, and immediate evidence visibility. Search/filter functionality must be real, not decorative.

### 8.4 GCC profile

Use a clear hierarchy: company/centre identity, known functions/location, key facts, verification/unknown indicators, related sources, and relevant caveats. The evidence should be easy to inspect, not hidden in a deep modal sequence.

### 8.5 Location comparison

Use a table or aligned cards with consistent units, time windows, sources, and missing-data states. Include a “How this comparison works” affordance. Avoid a map unless it adds value and can be grounded in valid geographic data; a clear comparison table is acceptable for the MVP.

### 8.6 AI Research

Show the user’s question, concise response, source citations, conflicts/unknowns, and follow-up suggestions. Do not show generic decorative “thinking” states that imply research the application has not actually performed.

### 8.7 Decision Brief

Use a readable report layout with sections, source links, assumptions, and caveats. The brief should work as a screenshot or copied artifact in the assessment walkthrough.

---

## 9. Data requirements and conceptual model

The MVP should use PostgreSQL as the canonical structured store. Table names may change during architecture design, but the relationships and evidence behavior must remain intact.

### 9.1 Core entities

**Company**
- Stable ID, name, parent company, headquarters country if known, sector/industry, official website, notes.

**GCC centre**
- Stable ID, company ID, public/display name, Indian city/state, known functions, setup year if sourced, size/headcount if sourced, type/definition notes, status, created/updated timestamps.

**Source**
- Stable ID, title, publisher/issuer, canonical URL, source type, publication date if known, last-checked date, access note, authority/limitations notes.

**Evidence claim**
- Stable ID, subject/entity ID, field/claim name, value, unit, valid period, source ID, evidence status, verification note, conflict group ID if applicable.

**City**
- Stable ID, city, state/region, descriptive notes.

**City indicator**
- Stable ID, city ID, indicator name, value, unit, period, definition/method, source ID, last-checked date, comparability note.

**Policy**
- Stable ID, title, issuing authority, state, official document URL/source ID, publication/effective dates if known, concise summary, eligibility caveat, last-checked date.

**Provider** (P1 unless evidence coverage allows)
- Stable ID, name, category, service area, public website, relevant claimed experience, claim/source links, evidence status.

**Decision brief** (persist only if useful and safe for the chosen implementation)
- Stable ID, generated time, question, selected cities/criteria, output content, source IDs, assumptions/limitations. Do not store sensitive user information in the prototype.

### 9.2 Data semantics

- Separate parent company, Indian entity, GCC, and individual centre/site when evidence allows.
- Keep source publication date separate from application verification date.
- Preserve values and units as published; do not coerce unlike measures into a common count without a documented method.
- Distinguish `unknown`, `not disclosed`, `not found`, `not applicable`, `conflicting`, and `stale`.
- Do not store a numeric zero to represent missing data.
- Evidence statuses should use an explicit controlled vocabulary, for example: `verified`, `corroborated`, `single_source`, `self_reported`, `conflicting`, `stale`, `unknown`.
- Avoid presenting a numeric confidence percentage unless a defensible calibration method has been established.

---

## 10. AI behavior requirements

### 10.1 Retrieval-first generation

The default request path is:

1. Parse/understand the user's question.
2. Retrieve relevant GCC, city, policy, source, and evidence records using application-defined search and filters.
3. Pass a bounded, structured set of retrieved records to the model.
4. Ask the model to produce a structured response and reference only the supplied record IDs.
5. Validate citation IDs against the retrieved records before rendering.
6. Render answers, citations, conflicting claims, and unknowns in the UI.

For the MVP, PostgreSQL text search, filters, and joins are sufficient. Do not add embeddings or a vector database without an observed retrieval failure that justifies the extra complexity.

### 10.2 Response contract

The model should return a structured result containing:
- `answer`: concise answer to the question.
- `key_findings`: list of claims/facts.
- `citations`: source or evidence record IDs attached to each finding.
- `assumptions`: assumptions made to organize the analysis.
- `unknowns`: important fields or facts not supported by the retrieved evidence.
- `conflicts`: source differences that materially affect interpretation.
- `next_questions`: targeted follow-up research questions.

The application must validate the response shape and citation IDs. If validation fails, render a safe error or a reduced answer with no unsupported citations, not raw malformed output.

### 10.3 Prohibited AI behavior

- Inventing source URLs, titles, dates, company records, figures, salary/rent values, headcounts, incentives, or provider outcomes.
- Claiming to have browsed or verified live information if no live-source tool was run.
- Describing the curated dataset as complete or official.
- Treating self-reported provider marketing as independently proven delivery.
- Treating a calculated location fit score as a universal objective ranking.
- Giving definitive legal, tax, or government-incentive eligibility advice.

### 10.4 Failure and fallback behavior

- **No relevant records:** explain that current Fieldbook data does not answer the question; suggest records or evidence that should be added.
- **Conflicting evidence:** show both values and sources with dates/definitions and explain the known basis of disagreement.
- **Missing citation:** block the unsupported claim from being presented as verified fact; label it as an assumption or remove it.
- **AI API error/timeout:** show a clear error and let the user retry; preserve question/selection state.
- **Empty source URL:** do not render a fake clickable source; mark the evidence reference incomplete and flag it for data review.

---

## 11. Technical constraints and product-quality requirements

The detailed architecture will be specified in `ARCHITECTURE.md`. Current stack hypothesis:

- **Application:** Next.js + React + TypeScript.
- **UI:** Tailwind CSS, shadcn/ui, Lucide icons.
- **Database:** Supabase-hosted PostgreSQL.
- **AI provider:** Gemini API through server-side application routes.
- **Charts:** Recharts where charts add real explanatory value.
- **Deployment:** Vercel for the Next.js app; Supabase for managed database hosting.

### 11.1 Security and privacy

- Keep Gemini and privileged database credentials on the server.
- Commit `.env.example`, never real secrets.
- Do not expose service-role database keys to the browser.
- Validate and constrain inputs for search and AI endpoints.
- Do not collect personal or confidential client information in the demo.
- If user accounts are not needed for the prototype, omit authentication rather than building an incomplete auth flow. Publicly accessible demo data should be read-only from the browser.
- If brief persistence is implemented, define what is stored and protect it; otherwise keep generated content in the current session and provide copy/download.

### 11.2 Performance and resilience

- Use server-side pagination or bounded result sets if the dataset grows.
- Avoid unnecessary network calls and redundant AI requests.
- Use visible loading states for database and model requests.
- Provide graceful handling for slow/failed AI API calls.
- Keep core browsing useful when AI is unavailable.

### 11.3 Accessibility and responsiveness

- Semantic headings and buttons, visible keyboard focus, readable contrast, and labels for form controls.
- Tables should have clear headers and remain usable on narrow screens.
- The primary user journeys must work at desktop and mobile widths.
- Do not rely on color alone to communicate verification/conflict state.

---

## 12. Success metrics and validation plan

These are **prototype targets**, not results already achieved.

| Metric | MVP target | How to verify |
|---|---|---|
| End-to-end task completion | A reviewer can complete question → evidence → comparison → brief | Run the prepared demo scenario on the deployed URL |
| Citation integrity | 100% of material factual claims in generated briefs have valid retrieved citations or are clearly marked as assumptions/unknowns | Inspect generated output and run citation-validation tests |
| Record discovery | Users can find a seeded record by name, city, and sector/function where data exists | Execute search/filter test cases |
| Conflict transparency | At least one seeded example explains a difference in reported GCC counts without conflating units or periods | Ask the copilot and inspect citations |
| Missing-data handling | Unknown values remain unknown and are not presented as zero or estimated facts | Test sparse records and an unsupported question |
| Decision clarity | A reviewer can explain the shortlist's criteria and identify at least one limitation | Ask the reviewer to narrate the generated brief |
| Reliability | Public app loads, core routes refresh, failures are understandable | Test deployed routes and deliberate API errors |
| Accessibility basics | Keyboard focus and readable responsive layouts work on core screens | Manual keyboard and viewport check |

### Validation plan

Before final submission:
1. Complete a clean browser walkthrough from the public URL.
2. Test at least five user questions, including one unsupported question and one conflicting-data question.
3. Open every citation in the sample brief and verify it supports the associated claim.
4. Compare two cities with at least one missing indicator and confirm missingness is visible.
5. Ask one or more people unfamiliar with the project to use the product, if time permits; record actual observations rather than claiming formal validation.

---

## 13. Acceptance test checklist

The release is ready for the assessment only when all P0 criteria below pass.

### Dataset and evidence
- [ ] Each seeded record has a stable ID and required fields validated by the application.
- [ ] Material facts link to valid source records or are visibly marked unknown/assumption.
- [ ] Source URL, publisher/title, publication date if known, and last-checked date are represented separately.
- [ ] A market-count example retains both reported figures with their sources and methodology notes.
- [ ] The interface does not claim full India-wide coverage.

### Explorer and profiles
- [ ] Search by company name returns the expected seeded record.
- [ ] City and sector/function filters work and can be cleared.
- [ ] Empty, loading, and failed-query states are distinguishable.
- [ ] Profile source links open correctly.

### City comparison
- [ ] At least two cities can be compared using available indicators.
- [ ] Units, periods, and source references are visible.
- [ ] Missing data is not treated as zero.
- [ ] Any composite score exposes its criteria, weights, and limitations.

### AI copilot and brief
- [ ] Answer references only source/evidence IDs actually retrieved for the request.
- [ ] Citation IDs are validated before display.
- [ ] Unsupported requests result in an explicit limitation response.
- [ ] Generated brief includes findings, citations, assumptions, unknowns, and next questions.
- [ ] AI failure does not erase the user's query or current city selections.

### Deployment and presentation
- [ ] Public URL works in a clean browser session.
- [ ] No secret keys are present in client bundles or committed source.
- [ ] Dashboard metrics derive from actual data.
- [ ] Core layout works on desktop and mobile.
- [ ] README setup steps have been tested by following them from a clean environment, if time permits.

---

## 14. Delivery checkpoints for the 72-hour assessment

Implementation phases and task-level logging live in `IMPLEMENTATION_PLAN.md`. This section defines the required outcomes at each checkpoint.

### Checkpoint 1 — Requirements and data model locked
- User journey, navigation, P0 scope, core entities, and evidence semantics are agreed.
- Seed-data schema and source policy are documented.
- No coding begins on secondary features before this checkpoint is met.

### Checkpoint 2 — Explorer vertical slice works
- Database migration and seed process work.
- Dashboard, search/filter, profile, and source links work against real records.
- Empty/error states are visible.

### Checkpoint 3 — Location comparison works
- At least two cities can be compared using sourced indicators.
- Missing/conflicting values are represented correctly.
- Scoring methodology, if present, is inspectable.

### Checkpoint 4 — AI workflow works
- AI endpoint retrieves relevant records before generation.
- Citations validate against retrieved sources.
- Unsupported and conflicting-data tests pass.

### Checkpoint 5 — Decision brief and deploy
- Brief can be generated from selected evidence and comparison.
- Public deployment works with server-side secrets.
- Demo scenario completes without manual database editing.

### Checkpoint 6 — Submission ready
- P0 test checklist passes.
- Deck claims match the current product and sourced research.
- Prototype and deck links are accessible to reviewers.
- Known limitations are explicitly documented.

---

## 15. Known assumptions and open questions

| Item | Current status | How it will be resolved |
|---|---|---|
| Primary user is GCC advisory / market-entry teams | Hypothesis | Interview target users and inspect competitor workflows |
| Evidence-first workflow is differentiated enough | Hypothesis | Hands-on competitor comparison and user reactions |
| Public sources will cover enough fields for the demo | Uncertain | Curate records and disclose gaps instead of fabricating values |
| City indicators are comparable across a useful set of cities | Depends on sources | Store periods/units and omit invalid comparisons |
| Users will pay for this workflow | Unknown | Do not claim validated willingness to pay; interview target users and explore current budgets |
| Which Gemini model/API access is available and cost-effective | Implementation-dependent | Confirm available API access, quotas, price, and response quality before integrating |
| Whether to persist briefs | Open implementation choice | Prefer copy/download and session state unless persistence adds clear value |
| Whether providers belong in the initial walkthrough | Secondary scope | Include only after P0 core workflow passes and supporting evidence is adequate |

---

## 16. Definition of done

The MVP is done for this assessment when:

1. It implements the question → evidence → comparison → brief workflow described in this document.
2. Core facts are traceable to real source records or explicitly labeled as unknown/assumption.
3. City comparisons show the basis of their conclusions and treat missing values honestly.
4. The AI can answer from retrieved records, validate citations, and decline unsupported factual claims.
5. A public, responsive deployment is accessible to reviewers.
6. The P0 acceptance checklist passes and the known limitations are recorded.
7. The pitch deck accurately describes what the prototype demonstrates, without overstating coverage, validation, or business impact.

**The goal is not to build the largest GCC database in 72 hours. The goal is to demonstrate a credible, coherent product that helps a real user make one important research decision with better evidence.**

---

## 17. Reference documents

- [`RESEARCH.md`](./RESEARCH.md) — market context, competitors, research sources, data-trust rationale, and product hypotheses.
- `ARCHITECTURE.md` — detailed technical design (next document).
- `DESIGN.md` — visual system and page-level behavior (next document).
- `DATA_TRUST.md` — source hierarchy and evidence status rules (next document).
- `AI_COPILOT.md` — prompts, retrieval/response contract, and grounding tests (next document).
- `IMPLEMENTATION_PLAN.md` — phased tasks, gates, and development log protocol (next document).
- `TESTING.md` — executable acceptance, regression, and demo test plan (next document).

