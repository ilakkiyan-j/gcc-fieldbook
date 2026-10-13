# GCC Fieldbook — Data Sourcing, Evidence, and Trust Policy

> **Product:** GCC Fieldbook  
> **Tagline:** The working guide to India's GCC ecosystem.  
> **Document:** Data Trust Policy  
> **Version:** 0.1 — assessment MVP  
> **Last updated:** 13 October 2026  
> **Status:** Proposed baseline; enforce in data preparation, UI, APIs, and AI responses  
> **Companion documents:** [`RESEARCH.md`](./RESEARCH.md), [`PRD.md`](./PRD.md), [`ARCHITECTURE.md`](./ARCHITECTURE.md), [`DESIGN.md`](./DESIGN.md)

---

## 1. Purpose

GCC Fieldbook is useful only if users can understand where its information came from, what that information actually establishes, and what remains uncertain. Data trust is therefore a core product capability—not a footnote, decorative badge, or claim that the entire dataset is always correct.

This policy establishes how the assessment MVP discovers, captures, normalizes, verifies, stores, displays, compares, and updates information about India's Global Capability Centre (GCC) ecosystem.

It applies to:

- Company and parent-company identities.
- GCC operations, centres, sites, city presence, functions, and setup dates.
- City and talent indicators, office-market indicators, and cost estimates.
- State and central government policies or incentives.
- Service-provider capabilities and delivery claims.
- Aggregate market statistics, including reported GCC counts.
- AI-generated answers, comparisons, and decision briefs based on stored evidence.

### 1.1 Governing principle

> **Every material factual claim must be traceable to evidence, scoped to what the evidence supports, dated where possible, and clearly marked when uncertainty remains.**

“Evidence-backed” does not mean “guaranteed true.” It means that a user can inspect the source and understand the basis and limitations of a claim.

## 2. MVP scope and trade-offs

The assessment is time-constrained. The MVP will use a small, curated, reproducible dataset rather than pretending to cover every GCC in India.

Recommended research scope from `RESEARCH.md`:

- Approximately 25–40 well-sourced GCC or centre profiles across several sectors and cities, if available evidence permits.
- Approximately 5–6 city profiles with clearly sourced indicators.
- A small number of official policy records, preferably from state or government sources.
- A limited number of service-provider examples only where relevant experience can be documented.
- A shared source registry and evidence records so claims can be traced consistently.

These are planning targets, **not current coverage claims**. Reduce record count rather than lower evidence quality. If time allows only 12 fully supportable records, publish 12 transparent records—not 40 weakly supported ones.

### 2.1 Not in MVP

- Continuous web crawling or automatic source monitoring.
- A promise that every record is current or exhaustive.
- A universal numeric confidence percentage.
- An official or definitive register of every Indian GCC.
- Verified rankings of provider delivery quality without appropriate evidence.
- Legal, tax, or investment advice about eligibility for an incentive.
- Inference of personal contact details or collection of personal data without a clear lawful need.

## 3. Core trust concepts

The following concepts must remain separate in implementation and in the UI.

| Concept | Meaning | Example |
|---|---|---|
| **Entity** | A company, parent, GCC operation, physical centre/site, city, policy, or provider | A multinational parent and its Bengaluru centre are different entities |
| **Source** | A document, page, filing, or report that can be inspected | A dated company announcement |
| **Claim** | One specific assertion about an entity or indicator | “The company announced a new engineering centre in Chennai” |
| **Observation/value** | A measured or reported number, with unit, period, and method | Office rent range in INR per sq ft per month for Q2 2026 |
| **Evidence status** | How well the particular claim is supported | Single-source, corroborated, conflicting |
| **Freshness** | How recently the source was published or the claim was checked | Report published in March; checked in October |
| **Confidence** | Qualitative assessment of the evidence for a specific claim | High / medium / low only where methodology is documented |
| **Completeness** | How much of the relevant field or universe has been captured | Sample covers selected records, not the full market |

Do not use an entity-level label to imply that every claim about that entity has the same status. A company's city presence may be confirmed while its headcount remains unknown.

## 4. Source hierarchy and admissibility

Source authority is claim-specific. An official company page may be authoritative for the company's own announcement but not for an independent comparison with competitors. A government policy document may establish published eligibility rules but not whether a particular company qualifies in practice.

### 4.1 Preferred source order

| Tier | Source class | Examples | Default treatment |
|---|---|---|---|
| **Tier 1 — Primary / authoritative** | Official company announcement or company page; legal filing; government notification, policy or department page; regulator record | Company newsroom, MCA or relevant regulator record, official state policy PDF | Preferred for facts within the issuer's remit; still record date and scope |
| **Tier 2 — Named research** | Identifiable industry-body or research firm report; established real-estate research; named workforce or salary study | Zinnov–NASSCOM report, dated property-market report | Use with publication date, methodology, definitions, geography, and units |
| **Tier 3 — Reputable reporting** | Established news organization with named reporting and/or links to primary materials | Reported centre launch that quotes or links to a company statement | Use when primary evidence is unavailable; seek corroboration for consequential claims |
| **Tier 4 — Self-reported commercial source** | Provider website, vendor case study, sponsored page, job listing | Provider claims to have supported multiple GCC launches | Label as self-reported or indirect; do not present as independently verified delivery proof |
| **Tier 5 — Lead only** | Unsourced aggregators, snippets, social posts, forum posts, generic AI answers | Search result snippet without an inspectable source | Research lead only; do not use alone to support a material factual claim |

A source tier is a guide, not a mechanical truth score. Record why a source is relevant and what it cannot establish.

### 4.2 Minimum source requirements

For every source used in the product, capture whenever available:

- Canonical source URL.
- Title of the source.
- Publisher or issuer.
- Source type/tier.
- Publication date, if stated.
- Date last reviewed by GCC Fieldbook.
- Access notes, including paywall or inaccessible content if relevant.
- Short relevance/methodology note.
- The specific claims or observations supported by that source.

Do not fabricate missing metadata. If the publication date cannot be established, leave it null and show “Publication date not stated” or the appropriate equivalent. Do not substitute today's date for a source's publication date.

### 4.3 Source use, copyright, and collection boundaries

- Prefer public, attributable information and link users to the original source.
- Respect website terms, robots/access controls, paywalls, database rights, and applicable law.
- Do not bypass authentication, rate limits, or technical restrictions.
- Do not copy full proprietary reports or substantial copyrighted text into the database. Store necessary factual extracts and concise notes, plus links and bibliographic metadata.
- Store only the minimum excerpts needed to explain an evidence claim; record the excerpt origin and context.
- Do not treat model-generated research summaries as primary evidence.
- If a source is inaccessible, do not imply it was reviewed in full. Record the access limitation.

## 5. Define the GCC carefully

Different reports may define and count GCCs differently. GCC Fieldbook must not silently combine companies, Indian subsidiaries, GCC operations, campuses, centres, offices, or units as if they were the same thing.

### 5.1 Entity distinctions

- **Parent company:** The global business or corporate group.
- **Indian legal entity:** A locally incorporated entity, where identified by evidence. Its existence alone does not prove it is a GCC.
- **GCC operation:** The company's India-based capability operation serving the wider global business.
- **Centre/site:** A known city-level or physical operating location associated with that capability operation.
- **Office/branch:** A location that may or may not qualify as a GCC; do not classify it solely because an office exists.
- **GCC unit:** Use only when the source's unit definition is known or explicitly describe it as the source's own unit count.

### 5.2 Inclusion rule for a GCC record

Create a confirmed GCC/centre record only when credible evidence supports that the company has an India-based operation performing functions for the parent/global business or explicitly describes the facility as a GCC, global capability centre, global in-house centre, or equivalent capability operation.

If evidence indicates only a local sales office, a generic India office, an engineering job posting, or a subsidiary with unclear functions, do not automatically classify it as a confirmed GCC.

Where evidence is suggestive but incomplete, the record may be classified as `candidate` or `needs_review`, with a note explaining the reason. Candidate records must not be mixed into confirmed counts without an explicit filter and disclosure.

### 5.3 Count discipline

- Store the source's reported count as the source reported it.
- Store the metric name/definition, unit (e.g. GCCs, GCC units, centres, companies, employees), reporting period, geography, publisher, and methodology notes.
- Do not add a source's GCC count to another source's unit count.
- Do not resolve conflicting counts by choosing the largest, newest-looking, or most convenient value without examining scope and methodology.
- If two counts are not directly comparable, label them “not directly comparable” and explain why where known.
- If GCC Fieldbook calculates its own count from the curated records, label it “Fieldbook dataset count,” disclose inclusion criteria and date checked, and never present it as the total Indian market count.

## 6. Evidence status taxonomy

Use controlled values in storage, API contracts, and UI. The status applies to a **specific claim/value**, not automatically to the whole company profile.

| Canonical status | Meaning | Requirements / display guidance |
|---|---|---|
| `verified` | Claim checked against an appropriate primary/authoritative source, or otherwise verified under a documented rule | Show the evidence and date checked; use sparingly |
| `corroborated` | Two or more sufficiently independent sources support substantially the same claim | Link each source; shared press releases syndicated by multiple outlets do not necessarily count as independent |
| `single_source` | One inspectable source supports the claim but it is not independently corroborated | Display “Single source”; this is not automatically a low-quality source |
| `self_reported` | Claim comes from the subject or provider's own marketing, profile, or case study | State “Self-reported”; do not imply independent validation |
| `conflicting` | Credible sources disagree or use materially different definitions/values | Preserve each observation and explain the differences; avoid selecting one silently |
| `stale` | Previously useful information is past its review/freshness threshold or is clearly superseded | Retain the source history where useful and do not present the value as current without qualification |
| `candidate` | Evidence suggests a record may belong in the dataset, but the inclusion criteria are not yet satisfied | Keep out of confirmed counts by default; show as under review if displayed |
| `unknown` | The value is not established by the evidence currently available | Display “Unknown” or “Not established”; never infer a value just to fill a card |

### 6.1 Do not confuse status with missingness

Where useful, a separate **value state** should distinguish:

- `unknown`: not established by collected evidence.
- `not_disclosed`: the source indicates the entity does not disclose the value, or no public disclosure was found after an explicitly defined search.
- `not_found`: the specified research process did not locate the value; do not use this to claim no disclosure exists across the entire web.
- `not_applicable`: the field does not apply to the record.
- `conflicting`: incompatible values exist in credible sources.
- `not_checked`: the field has not yet been researched.

Do not use a numeric zero, empty string, or a fabricated average to stand in for missing information. For example, an undisclosed headcount is not zero employees.

### 6.2 Confidence labels

A simple high/medium/low evidence confidence label is optional. Do not show it unless the project defines a consistent rubric. In all cases, show the status and the source itself; never imply that an uncalibrated score is a statistical probability of truth.

For the MVP, evidence status plus a source link and dates is preferred over an arbitrary numeric score.

## 7. Claim-level evidence model

A source registry alone is not enough. The system must associate sources with the individual claims they support.

### 7.1 Conceptual evidence claim fields

The implementation may use normalized SQL tables, JSON fields where justified, or a combination. Preserve these concepts even if the physical schema differs.

| Field | Purpose |
|---|---|
| `id` | Stable identifier for one claim/observation |
| `subject_type` | Company, GCC centre, city indicator, policy, provider, market statistic, etc. |
| `subject_id` | Stable ID of the subject, where applicable |
| `claim_key` | Controlled field name, e.g. `city_presence`, `function`, `setup_year`, `headcount`, `policy_effective_date` |
| `claim_value` | The value as reported or normalized, without hiding source wording when it matters |
| `raw_value` | Optional source-extracted wording/value for audit purposes |
| `unit` | Unit for numerical/quantified claims |
| `valid_from` / `valid_to` | Time period the claim applies to, if known |
| `source_id` | FK to the source registry |
| `evidence_status` | Controlled taxonomy from Section 6 |
| `value_state` | Missingness state where applicable |
| `last_checked_at` | Last date the Fieldbook team reviewed this claim/source |
| `verification_note` | Concise explanation of how the status was assigned |
| `conflict_group_id` | Optional link to related competing claims |
| `created_at` / `updated_at` | Audit timestamps for record maintenance |

Each claim should be atomic enough that its support is clear. If one announcement says a company opened a centre in Chennai and hired 300 engineers, treat city presence and headcount as separate claims because they may require different verification and freshness rules.

### 7.2 Source and claim separation

- One source can support many claims.
- One claim may have several sources.
- One source may support a claim but not another nearby claim on the same profile.
- An evidence relationship must not imply that the source supports every field on the entity.
- Use stable UUIDs or stable internal identifiers; the AI must reference these IDs rather than inventing URLs or source identifiers.

### 7.3 Provider evidence

Provider profiles require extra care because providers have a commercial incentive to present themselves positively.

- Keep provider-authored claims marked `self_reported` unless independently corroborated.
- A case study establishes that the provider claims to have performed work; it does not necessarily establish the client's assessment of quality or outcome.
- Do not infer client endorsement from a logo on a provider's website.
- Do not publish an overall provider quality ranking in the MVP without comparable, independently supportable outcome data.
- Describe documented experience precisely (service, industry, geography, date, client attribution if public) and preserve caveats.
- Where attribution is confidential or ambiguous, omit the detail rather than guessing.

## 8. Freshness and revalidation policy

Freshness is claim-specific. A company's parent relationship may change infrequently; office rents, incentive rules, hiring signals, and headcount estimates can change more quickly.

The values below are **working MVP review targets**, not guarantees or automatic proof that data becomes false after a given interval.

| Claim/source category | Suggested review target | Display rule when past target |
|---|---|---|
| Company identity and parent relationship | 180 days | Show last-checked date; recheck when a major corporate event is known |
| Centre existence, city presence, and stated functions | 180 days | Mark `stale` where continued/current status matters and no newer evidence exists |
| Setup/opening announcement date | Historical fact; recheck only if corrected | Preserve as historical claim; do not rewrite the original date |
| Headcount and workforce-size estimate | 90 days for current-size claims; always retain original period | Label as dated estimate; do not show as current if out of date |
| Office rental or commercial property data | 90 days or the report's stated period | Show the period and mark stale if used to represent current market levels |
| Salary/talent-market indicators | 180 days or source period | Expose period, sample and method; avoid treating as exact current pay |
| State policy/incentive and eligibility details | Check official policy source before any eligibility-related answer; review at least every 90 days for active policy records | Show effective date and last checked; flag unconfirmed/current eligibility and link official source |
| Provider capabilities and service claims | 180 days | Mark self-reported and last checked; recheck before relying on them in a shortlist |
| New-entry/expansion/hiring signal | 30–90 days depending on signal type | Show event date; label old leads as historical, not a live signal |
| Aggregate market size/count | Use the publication's period; review each new release | Never display without named source, reporting period, unit, and definition |

### 8.1 Date fields must stay distinct

At minimum, use separate fields for:

- `published_at`: when the source was published, if known.
- `effective_from` / `effective_to`: when a policy/value applies, if relevant and available.
- `valid_from` / `valid_to`: the period a claim/measurement refers to.
- `last_checked_at`: when GCC Fieldbook reviewed the source/claim.
- `created_at` / `updated_at`: when the internal database row was created or changed.

Never show a row update timestamp as though it were the date the underlying fact occurred.

### 8.2 Revalidation procedure

When rechecking a record:

1. Open the current source URL and confirm it is the intended document/page.
2. Record the date checked.
3. Check for a replacement publication, amended policy, updated report, changed URL, or contradictory newer claim.
4. Keep earlier observations if they explain the record's history or a market trend; mark them historical or superseded rather than deleting evidence silently.
5. Update the current-status claim only when supported by new evidence.
6. If a source is dead or inaccessible, mark that limitation. Do not automatically conclude the underlying fact is false.

## 9. Conflict handling and source disagreement

Source disagreement is an expected property of a fragmented market, not a reason to hide data.

### 9.1 Conflict workflow

1. **Detect:** identify claims for the same subject/metric with incompatible values or definitions.
2. **Normalize carefully:** compare geography, entity level, unit, time period, sample, and definitions before deciding there is a real conflict.
3. **Preserve observations:** retain each reported value with its source and publication/valid dates.
4. **Classify:** mark claims `conflicting` if disagreement remains material and unresolved.
5. **Explain:** add a note describing the difference where known; say “reason not established” when it is not.
6. **Display:** show both values and links when relevant to a user decision. Do not silently average or overwrite.
7. **Resolve only with evidence:** if a new authoritative source clarifies a definition or supersedes a prior value, document why the current view favors it while preserving the history.

### 9.2 Common causes of apparent conflict

- Counting GCC companies versus physical centres/units.
- Different fiscal years, survey periods, or publication dates.
- Different definitions of “GCC,” “centre,” “unit,” or “global in-house centre.”
- One source covering a particular sector or city rather than all India.
- Reported versus independently estimated headcount.
- Rent quoted for different micro-markets, building grades, lease conditions, or units.
- Policy announcements versus final notifications or operational guidelines.
- Different exchange rates, inflation adjustments, or measurement methodologies.

### 9.3 No silent overwrite rule

Do not replace a conflicting historical record with the preferred current number without preserving enough metadata to reproduce the decision. If the MVP cannot implement a full version history, at minimum keep separate evidence rows and a concise resolution note in the repository seed data.

## 10. Normalization, duplicates, and entity resolution

Normalization should make records searchable without erasing meaningful distinctions.

### 10.1 Company identity

- Maintain one canonical display name per company record, plus aliases where useful.
- Preserve brand name versus legal entity name when they differ.
- Store a parent-company relationship only when supported by credible evidence.
- Do not assume two similar names identify the same legal entity.
- Treat mergers, acquisitions, renames, and spin-offs as relationship/history changes, not merely string updates where that history matters.

### 10.2 GCC and centre identity

- A multinational may have multiple GCC operations, sites, legal entities, or functions in India.
- Do not create a separate company for every centre unless it is a distinct company identity.
- Do not merge separate sites merely because the parent and city are the same.
- If the evidence supports only one city presence and does not establish the exact site or centre naming, use a cautious display label and record the uncertainty.
- Avoid double counting a parent, subsidiary, capability operation, and centre in one market count.

### 10.3 Geography

- Use canonical city and state names for filters, while preserving the source's wording where relevant.
- Do not treat “NCR,” “Delhi NCR,” “Gurugram,” “Noida,” and “Delhi” as interchangeable geographic values.
- A broader geography may be stored as a region only if the source uses or defines that region; do not assign a centre to a precise city based on a broad NCR mention.
- Keep city boundaries, metro-area definitions, and report geographies explicit for cost and talent comparisons.

### 10.4 Duplicate review

Potential duplicates should be flagged using normalized name, official domain, parent relationship, city and source—not merged automatically on name similarity alone. Manual review is acceptable for the curated MVP. Record the merge rationale or maintain an alias if the apparent duplicate is actually a separate entity.

## 11. Numeric indicators and comparisons

Numbers can create a false impression of precision. Every material indicator must be interpreted with its unit, reference period, definition, scope, and source.

### 11.1 Required metadata for quantitative claims

Where applicable, retain:

- Numeric or text value as reported.
- Unit and unit conversion method if normalized.
- Measurement period and publication date.
- Geography and geographic scope.
- Definition and methodology.
- Sample or coverage note, if provided.
- Source(s) and last-checked date.
- Currency and whether nominal or inflation-adjusted, where relevant.
- Whether the value is measured, forecast, estimate, range, or self-reported.

### 11.2 City comparisons

- Show raw sourced indicators before any computed score.
- Compare only values whose units, time periods, geographic scopes, and definitions are sufficiently compatible.
- Normalize values only through a documented, deterministic method.
- If using a weighted fit score, expose the criteria, weights, scoring direction, normalization, source dates, and missing-data treatment.
- Do not treat missing information as a zero or score a city as worse simply because its public data is less complete.
- Do not rank cities on a metric with incomparable samples or unsupported data.
- Show “insufficient comparable data” when appropriate.
- Treat outputs as screening aids, not definitive location recommendations or investment advice.

### 11.3 Salaries, headcount, costs, and ranges

- Preserve ranges as ranges; do not silently collapse them to a single point estimate.
- If an average or midpoint is computed for a specific visualization, label it as a derived value and document the formula.
- Do not infer a company's headcount from job listings or office size unless the method is explicitly supported and the result is clearly labeled as an estimate.
- Keep monthly versus annual amounts and area units explicit.
- Do not mix salary cost, fully loaded employment cost, and consulting rates.

## 12. Policy and incentive data

Government policies can change and eligibility often depends on details that a short summary may omit.

For each policy record, capture where available:

- Official policy or scheme title.
- Issuing government body and state/central jurisdiction.
- Official source URL/document.
- Publication, notification, effective, expiry, and amendment dates as available.
- Relevant sector, investment, employment, or location conditions stated in the policy.
- Eligibility language and material exclusions.
- Application/approval process reference when present.
- Date last checked and the official source's current status, if it can be established.

Display a concise summary with a clear link to the official document. Never state that a specific company qualifies for an incentive solely because it operates in a state or sector. The app should say that eligibility requires checking the official policy terms and the company's facts. If no official current source can be verified, label the policy record accordingly or exclude it from current recommendations.

## 13. Display rules in the product

Trust controls must be visible where users consume a claim—not hidden on a separate policy page only.

### 13.1 Claim/source display

Where practical, each profile field or indicator can reveal:

- Claim/value and unit.
- Evidence status label.
- Source title/publisher and clickable URL.
- Publication date and last-checked date.
- Relevant qualification or conflict note.
- “Unknown” or “Not established” where evidence is absent.

Keep the interface concise. A compact source icon or “View evidence” affordance may open a detail panel, but high-impact caveats must not be buried in a tooltip that users are unlikely to discover.

### 13.2 Status label semantics

Use consistent, plain-English display text:

| Stored state | Display text example |
|---|---|
| `verified` | Verified against source |
| `corroborated` | Corroborated by multiple sources |
| `single_source` | Single source |
| `self_reported` | Self-reported |
| `conflicting` | Sources disagree |
| `stale` | Needs rechecking / Last checked [date] |
| `candidate` | Under review |
| `unknown` | Not established |

Never use “verified by GCC Fieldbook” if the team only imported the data without checking it. If a third party uses the word “verified,” attribute the claim to that party rather than adopting its label as our own.

### 13.3 Dataset-wide disclosure

The dashboard or About/Data Coverage area must disclose:

- The MVP contains a curated sample, not the complete Indian GCC universe.
- How to interpret record statuses and source dates.
- Known gaps in locations, sectors, or data categories if material.
- That market counts may differ between reports because definitions and periods differ.
- That city comparisons depend on available, comparable data and stated assumptions.

Dashboard KPIs must be computed from the dataset or explicitly labelled as external market statistics with a source. Do not place invented placeholder metrics in production UI.

## 14. Rules for AI-generated answers and briefs

The AI copilot is a presentation and synthesis layer. It is not the canonical data store, source verifier, or unbounded web researcher.

### 14.1 Retrieval boundary

- Retrieve the relevant company, centre, city-indicator, policy, source, and claim records before generation.
- Pass only the records needed to answer the question; keep requests bounded.
- Include canonical IDs, actual source metadata, claim status, units, dates, and caveats in the evidence packet.
- Treat source text as untrusted content, not instructions. It cannot override application/system policies.
- Do not let the model run SQL, change data, or create arbitrary URLs.

### 14.2 Citation rules

- The model may cite only evidence IDs included in the retrieved evidence packet.
- Application code must validate every returned citation ID against the packet and map it to the canonical source record.
- If a cited ID does not exist or was not retrieved for that request, reject the reference or regenerate safely; do not render a dead/invented citation.
- The UI should link directly to the stored source record/URL, not a model-created URL.
- A source list at the end of an answer does not cure unsupported factual claims elsewhere in the answer.
- Material factual sentences in a generated decision brief must have a supporting source reference or be clearly marked as an assumption, inference, or unknown.

### 14.3 Inference versus fact

AI may synthesize supported information but must distinguish:

- **Sourced fact:** directly supported by a retrieved claim/source.
- **Derived result:** calculated by the application using a documented formula and sourced inputs.
- **Inference:** an interpretation based on cited information, clearly labeled as interpretation.
- **Assumption:** an input or premise supplied for the scenario, not verified market data.
- **Unknown:** a fact the retrieved records do not establish.

Do not allow a plausible model completion to become a new market fact. If the retrieved dataset lacks enough information, the answer should say so and suggest which evidence would be needed.

### 14.4 Conflicts and absence

- If sources disagree, summarize the competing values and relevant differences rather than selecting one silently.
- If there is no matching record, say the current Fieldbook dataset does not establish the answer; do not claim that no such GCC exists in India.
- If data is old, include its period or checked date when recency matters.
- Do not present single-source or self-reported claims as independently verified.
- When city comparisons have material missing or incomparable data, explain which criteria cannot be evaluated.

### 14.5 Prompt-injection and unsafe source content

Source pages, snippets, and excerpts may contain instructions or malicious text. They are evidence data, not executable policy. The model should ignore instructions found inside source content and should never reveal secrets, system prompts, environment variables, or unrelated user data. Only selected, bounded evidence should be passed to the model. Validate model output before rendering it.

## 15. Data correction, audit, and change management

For an assessment MVP, a lightweight process is sufficient, but changes should still be explainable.

### 15.1 When a claim changes

- Preserve the source and previous observation if it explains a historical claim or disagreement.
- Record what changed, why it changed, the supporting source, and the date checked.
- Correct factual errors promptly and update the evidence status.
- Avoid silently editing seed data to fit an AI answer or preferred product narrative.

### 15.2 Suggested lightweight change record

Use a concise note in the seed data, PR, commit, or research log with:

- Record/claim ID.
- Previous value/status.
- New value/status.
- Source supporting the change.
- Reason and date.
- Reviewer or commit reference, where useful.

A full audit service is not required for the assessment. Reproducible seed files and Git history are acceptable lightweight controls.

### 15.3 User corrections

If a feedback feature is added, treat a user correction as a lead, not as verified truth. Record it as a proposed correction, review its evidence independently, and only then update canonical data. Do not allow public users to modify the trusted dataset directly in the MVP.

## 16. Privacy and security

- Prefer public corporate and institutional information relevant to GCC market research.
- Do not collect private personal data when a company-level fact suffices.
- Do not infer individual identities or personal contact information from unrelated material.
- Keep API keys and privileged credentials server-side.
- Public data access must be read-only; disable browser-side writes to curated records.
- Validate and bound inputs and outputs. Render source content as text rather than executable HTML.
- Do not store raw AI conversations or generated briefs in the database by default.
- Do not send unnecessary personal or confidential user input to the AI provider.
- Respect source-site terms, copyright, and applicable data-protection rules.

## 17. Operational checklist for every seeded record

A record is ready for the public MVP only when the applicable checks below pass.

### Entity / centre

- [ ] Canonical company/centre identity is not a duplicate of another record.
- [ ] Available parent-company relationship is supported or explicitly unknown.
- [ ] Classification as a GCC/centre meets the inclusion rule or is marked candidate.
- [ ] City/state specificity does not exceed the evidence.
- [ ] Unknown headcount, setup year, functions, and size are left unknown rather than guessed.

### Source

- [ ] The URL is canonical and opens to the intended public source, where accessible.
- [ ] Title and publisher match the source.
- [ ] Publication date is recorded only if known.
- [ ] Last-checked date reflects an actual review.
- [ ] Source tier/authority and key limitations are recorded.
- [ ] Collection and use are within access, copyright, and legal boundaries.

### Claim / indicator

- [ ] Claim is atomic and tied to the correct subject.
- [ ] Value, unit, period, and geographic scope are preserved where relevant.
- [ ] Evidence status reflects the real source support.
- [ ] Conflicting claims remain visible and linked where material.
- [ ] Freshness is appropriate for the claim type.
- [ ] Any derived value has a documented calculation method.

### AI and user-facing output

- [ ] Material factual claims have resolvable source references or explicit uncertainty labels.
- [ ] Model citations are validated against retrieved IDs.
- [ ] No score or KPI is invented for visual completeness.
- [ ] Dataset limitations are disclosed where users make decisions.

## 18. Acceptance tests for the MVP

These tests must be reflected in `TESTING.md` and checked before the prototype is submitted.

1. **Unknown headcount:** A company with no credible headcount source displays “Unknown” / “Not established,” never `0` or a made-up estimate.
2. **Source separation:** A source published in March and last checked in October shows those as separate dates.
3. **Single-source claim:** A claim with one supporting source displays “Single source,” not “Corroborated.”
4. **Self-reported provider claim:** A provider's own case study is identified as self-reported unless independently corroborated.
5. **Conflicting counts:** Two market counts with different units/definitions are displayed with their respective dates and caveats; the app does not silently average them.
6. **GCC inclusion:** A generic company office or job listing alone does not automatically create a confirmed GCC record.
7. **City comparison gap:** A missing or incomparable indicator is shown as unavailable and is not silently treated as zero.
8. **Stale value:** A current-rent estimate past the configured review target is dated/flagged rather than presented as current without qualification.
9. **Invalid AI citation:** A model-generated citation ID not present in the retrieved evidence packet is not rendered as a source link.
10. **No data found:** A copilot query with no matching records says the current dataset does not establish the answer, not that the market contains no such company.
11. **Prompt injection:** Instructions embedded in source text do not override the AI's system rules or reveal secrets.
12. **Dataset disclosure:** The product states that the initial collection is curated and does not represent complete national coverage.
13. **Policy eligibility:** The product links to an official policy source and does not guarantee a user qualifies based only on location/sector.
14. **Source outage:** An inaccessible URL is shown as currently inaccessible/needs review, not automatically as proof that the fact is false.
15. **Reproducibility:** Seed data can be rebuilt from version-controlled migrations/seed files without manually entering records in the UI.

## 19. Implementation guidance

Use this policy as a design constraint across the repository rather than implementing it as a standalone disclaimer page.

- Store canonical data in Supabase PostgreSQL through the server-side data access layer described in `ARCHITECTURE.md`.
- Use controlled enums or validation schemas for source type, evidence status, and value state.
- Keep source metadata and claim records separate enough that a single report can support several claims without implying it supports every field.
- Maintain a small `docs/data-dictionary.md` that describes implemented columns and permitted values; keep it aligned with database migrations.
- Put concise `source_url`, `source_title`, status, and date fields on the evidence data passed to the frontend.
- Implement citation validation in server-side AI code, not only in the UI.
- Keep seed records reproducible, with source URLs and verification notes next to the values they support.
- If a deadline forces simplification, preserve the trust behaviors that affect user interpretation first: clickable source, source/checked dates, evidence status, unknown/conflicting states, and no invented values.

### Priority order if implementation time is tight

1. Source registry and claim/source linkage.
2. Status and missing-value taxonomy.
3. Visible source link, status, and relevant dates in the UI.
4. Citation ID validation for AI responses.
5. Conflict display and city-indicator comparability notes.
6. Lightweight update history and revalidation helpers.

Do not build an elaborate trust-scoring engine before the MVP can correctly display source links and uncertainty.

## 20. Open questions

These decisions may be revisited after initial user research, but changes must be documented in `DECISIONS.md`.

- Should source excerpts be stored, or should the MVP store only metadata and a short verification note? Default: store minimal factual excerpts only when necessary and permitted.
- Should status be claim-level only or also summarized at entity level? Default: claim-level canonical status; derive any profile summary transparently.
- What evidence is sufficient to call an entity a GCC where sources use broad or inconsistent terminology? Default: apply the inclusion rule and keep ambiguous records as candidates.
- Which indicators can be compared fairly across target cities? Default: compare only when units, period, geography, and methodology are compatible; otherwise show the raw values separately.
- Which review targets should apply to each source category after the MVP? Default: use the provisional targets in Section 8 and revise when operational evidence supports it.

## 21. Definition of done

`DATA_TRUST.md` is considered implemented for the assessment when:

- [ ] The data model captures source metadata and atomic evidence claims.
- [ ] The seed dataset contains credible sources and actual last-checked dates.
- [ ] Confirmed GCC/centre records are distinct from candidates and ambiguous office records.
- [ ] The UI shows a source, status, and relevant date for material facts.
- [ ] Unknown, not disclosed, conflicting, and stale values are not collapsed into zero or blank.
- [ ] City comparisons expose unavailable data and methodology where needed.
- [ ] AI answers and briefs can only link to retrieved, canonical evidence IDs.
- [ ] Dataset coverage and limits are disclosed in the interface.
- [ ] The acceptance tests above are included in `TESTING.md` or in equivalent automated/manual test records.

---

**End of document.**
