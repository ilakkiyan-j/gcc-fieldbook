# GCC Fieldbook — Market & Product Research

> **Product:** GCC Fieldbook  
> **Tagline:** The working guide to India's GCC ecosystem.  
> **Document:** Market and product research  
> **Version:** 0.1 — initial desk research  
> **Research checked:** 13 October 2026  
> **Status:** Research hypotheses and MVP direction proposed; customer validation pending.

---

## 1. Executive summary

GCC Fieldbook is a proposed evidence-first research workspace for people evaluating India's Global Capability Centre (GCC) ecosystem. It would help users discover GCCs, inspect evidence about companies and locations, compare options against stated criteria, and produce a source-linked decision brief.

The category is **not empty**. Current products already market GCC directories, verified profiles, location intelligence, policy research, market signals, benchmarks, and AI-generated insights. Examples include GCCPROs, SansoviGCC, and GCC Index. Therefore, “a single source of truth” or “an AI chatbot for GCC data” is not sufficiently differentiated by itself.

The strongest prototype hypothesis is narrower:

> **GCC Fieldbook helps GCC market-entry and advisory teams turn scattered market information into a repeatable, auditable decision brief—with source-level provenance, visible conflicts, explicit assumptions, and configurable comparisons.**

This is a hypothesis to validate, not a claim that existing products lack those capabilities. The project should demonstrate a useful workflow, not attempt to out-scale established databases within a 72-hour assessment.

### Recommended initial direction

- **Primary user hypothesis:** GCC advisors, strategy consultants, and market-entry teams preparing research for a client.
- **First job to be done:** Build and defend a shortlist of Indian cities and relevant GCC examples for a company planning a new centre.
- **Product wedge:** Evidence traceability and a custom decision workflow—not maximum record count.
- **MVP:** A curated GCC explorer, field-level evidence links, city comparison, AI research assistant grounded in the dataset, and a generated decision brief.
- **Initial data scope:** A small, carefully sourced sample of company/centre records, a handful of city indicators, selected state-policy references, and a limited number of provider examples. Do not imply nationwide coverage.
- **Success condition:** A reviewer can ask a real question, inspect source evidence, compare options, understand unknowns, and create a usable brief in one continuous flow.

## 2. Research approach and evidence labels

This document combines current desk research, competitor-product review, and product hypotheses. It does **not** claim that customer interviews or willingness-to-pay tests have been completed.

Use these labels throughout subsequent project documents:

- **[Reported fact]** A claim made by a named public source. Preserve that source's date and methodology.
- **[Observed product claim]** A feature or metric advertised by a competitor. It is not independently validated by this report.
- **[Hypothesis]** A product or customer assumption to test.
- **[Unknown]** Information not yet established by current evidence.
- **[Prototype target]** A goal for the MVP, not a result already achieved.

**Research limitation:** Market reports, company databases, and property reports may count different entities, centres, units, sites, and time periods. Values from different sources should not be combined as though they were measured on an identical basis.

---

## 3. What is a GCC?

A Global Capability Centre is an operation that a multinational company establishes to perform capabilities for its global business. Work may include software and product engineering, AI and analytics, research and development, finance, risk, cybersecurity, design, operations, and other specialist functions.

The market has evolved beyond a simple low-cost back-office model. Deloitte describes GCCs as strategic engines for innovation, digital transformation, and enterprise value creation. The 2026 Zinnov–NASSCOM landscape report also frames the sector as moving from delivery operations toward enterprise-level capability and ownership.

**Why the definition matters to GCC Fieldbook:** a company having an Indian office, a sales entity, a delivery vendor, a local subsidiary, or a technology team does not automatically prove that it has a GCC. The dataset must store evidence for why a record qualifies and should distinguish a parent company, its Indian legal entity, a GCC, and individual centres/sites.

Sources:

- [Deloitte — India’s Strategic GCC Play for Japanese Enterprises](https://www.deloitte.com/in/en/Industries/global-gcc/india-gcc-momentum-japanese-gcc-report.html)
- [Zinnov–NASSCOM — India GCC Landscape Report 2026](https://zinnov.com/centers-of-excellence/zinnov-nasscom-india-gcc-landscape-2026-report/)

## 4. Market context and evidence

### 4.1 Market scale is meaningful, but headline counts differ

The latest sources reviewed give different India GCC totals:

| Source | Published figure | Period / date | Important interpretation |
|---|---:|---|---|
| Zinnov–NASSCOM, *India GCC Landscape 2026* | 2,117 GCCs and 3,728 GCC units; US$98.4B reported revenue; 2.36M installed talent | FY2026; underlying data described as of March 2026 | Distinguishes GCCs from GCC units/sites. The report's definitions and estimation method should be read before reusing figures. |
| GCCPROs verified database | 2,550 GCCs in India; 4,658 worldwide | Live database page checked 12 October 2026 | A commercial database with its own record-level verification and counting method. Its city counts include centres with operations in each relevant city. |
| JLL, *India GCC Guide 2026* coverage | Over 2,500 expected / reported in its market framing; 2025 GCC leasing reached 31M sq. ft. | Published 17 February 2026 | Real-estate/market activity lens; leasing and GCC counts are different measures. |
| Zinnov–NASSCOM FY2025 mid-market report | 1,760+ GCCs; 480+ mid-market GCCs in the report's 2025 framing | Published 22 April 2025 | A prior-period estimate, not directly comparable with FY2026 or a live October 2026 database. |

These figures are **not a like-for-like trend series**. GCCPROs explicitly explains that sources differ because of date, definition, and the distinction between GCCs and their units. This is direct evidence for a core product requirement: Fieldbook must show *what a number means, who produced it, when it was measured, and how it was counted* instead of displaying a bare headline number.

Sources:

- [Zinnov–NASSCOM — India GCC Landscape 2026](https://zinnov.com/centers-of-excellence/zinnov-nasscom-india-gcc-landscape-2026-report/)
- [GCCPROs — How many GCCs are there in India? Methodology and source comparison](https://www.gccpros.com/how-many-gccs-in-india)
- [JLL — India GCC leasing hits record 31 million sq. ft in 2025](https://www.jll.com/en-in/newsroom/india-s-gcc-expansion-hits-record-31-million)
- [Zinnov–NASSCOM — Mid-Market GCC Report FY2025](https://zinnov.com/centers-of-excellence/zinnov-nasscom-mid-market-global-capability-centers-gccs-2025-report)

### 4.2 India has city-level specialization, not a single “best” location

JLL's 2026 market overview describes different city strengths: Bengaluru has a broad technology, engineering/R&D and financial-services base; Hyderabad has a notable healthcare and life-sciences specialisation; Chennai has manufacturing and automotive strengths; Pune has banking/financial-services and automotive activity; Delhi NCR has a broad corporate-services base; and Mumbai remains important for financial services.

The same overview reports that more than 90% of current GCC activity is concentrated in Tier I cities and that the top seven cities have more than 263 million sq. ft. of Grade A office stock. CBRE separately reported that GCC office leasing reached 29.2 million sq. ft. in 2024, up 29% year-on-year. These measures establish the relevance of a location-research workflow, but they do not by themselves say which city is best for a particular client.

**Product implication:** a location recommendation should be conditional on user requirements (function, hiring scale, budget, industry, timeline, existing footprint) and should reveal the evidence and weights behind comparisons. Avoid a universal city ranking without a defensible methodology.

Sources:

- [JLL — India GCC leasing hits record 31 million sq. ft in 2025](https://www.jll.com/en-in/newsroom/india-s-gcc-expansion-hits-record-31-million)
- [CBRE — GCCs Transforming India’s Office Landscape](https://www.cbre.co.in/insights/reports/gccs-transforming-india-s-office-landscape)

### 4.3 State policy is a real research input—and changes over time

Policy information is available across official state channels. Examples include Karnataka's GCC Policy 2024–2029 portal and Tamil Nadu's official notification for a special scheme to promote GCCs. Telangana's *Telangana Rising 2047* strategy also discusses a planned 2025–2030 GCC policy and related talent, infrastructure, and incentive initiatives.

A policy summary should not imply that every incentive automatically applies to every company. Eligibility can depend on the scheme, investment, location, employment, timing, approvals, and terms in the underlying order.

**Product implication:** store the official policy document, issuing authority, relevant state, publication/effective date where available, eligibility notes, last-checked date, and links to the original order. AI summaries should point back to the official policy and avoid legal/tax advice.

Sources:

- [Government of Karnataka — GCC Policy 2024–2029 portal](https://registration.eitbt.karnataka.gov.in/gcc/register)
- [Guidance Tamil Nadu — Special Scheme to promote GCCs in Tamil Nadu](https://investingintamilnadu.com/business-in-tamil-nadu/policy-notifications/special-scheme-to-promote-global-capability-centres-gccs-in-tamil-nadu)
- [Government of Telangana — Telangana Rising 2047 strategy (PDF)](https://tgswc.telangana.gov.in/wp-content/uploads/2025/12/TelanganaRising-2047.pdf)

### 4.4 GCC work is becoming more capability- and technology-intensive

EY's 2025 GCC Pulse Survey reported that 58% of surveyed GCCs were investing in agentic AI and another 29% planned to within a year. The survey also highlighted continuing focus on AI/ML, data engineering, cybersecurity, transfer pricing, and data privacy. This supports the relevance of tracking functions and capability areas—not just company presence or office address.

**Product implication:** data fields may include business functions, sector, capability/technology area, hiring signals, and source-backed expansion events. These fields must be populated only when supported by sources; they should not be guessed from the parent company's general business.

Source: [EY — 58% of India GCCs investing in agentic AI, GCC Pulse Survey 2025](https://www.ey.com/en_in/newsroom/2025/11/58-percent-gccs-in-india-investing-in-agentic-ai-two-third-creating-dedicated-innovation-teams-to-globalize-ideas-ey-gcc-pulse-survey-2025)

---

## 5. The problem to solve

### 5.1 Problem statement

When a company or advisor is evaluating India's GCC ecosystem, relevant information is distributed across industry reports, corporate announcements, official policy documents, location/real-estate research, company pages, job signals, and service-provider materials. Users must identify what is relevant, reconcile different definitions and dates, assess source quality, and turn it into a decision that colleagues or clients can inspect.

The opportunity is not merely to aggregate pages. It is to make market research **traceable, comparable, and reusable**.

### 5.2 Four related problem areas

1. **Discovery:** finding relevant GCCs, parent companies, city presence, functions, service providers, policies, and market signals is fragmented across sources.
2. **Trust and definitions:** counts can disagree because sources use different dates, definitions, and units. Many individual claims—such as centre headcount, launch date, and capability scope—may have different evidence quality.
3. **Decision comparison:** city and provider choices involve trade-offs. Information is often reported in different periods, formats, and levels of detail, making direct comparison difficult.
4. **Research production:** users may need to reproduce the research for different clients, keep source links, explain assumptions, and deliver a concise recommendation.

The first two are supported by current source review; the frequency, severity, and financial cost of the fourth problem are still hypotheses that need user interviews.

### 5.3 Likely current workarounds

- Search engines and manual browsing.
- Consulting and real-estate research reports.
- Spreadsheets and internal trackers.
- Company announcements, corporate filings, official policy pages, and job postings.
- Industry events, personal networks, and referrals.
- Commercial data products and service providers' own marketing material.
- General-purpose AI assistants used to summarize or compare information.

These are alternatives to investigate with users, not a claim that every stakeholder uses every workaround.

### 5.4 How to quantify the pain

Do not invent an unsupported number for money lost or time wasted. Collect a baseline from target users:

- Hours required to prepare a GCC market/locations brief.
- Number of sources opened and manually reconciled per brief.
- Percentage of claims with traceable sources.
- Time spent resolving contradictory numbers or updating old research.
- Cost of external reports or specialist research.
- Frequency of repeating a similar research task across different clients.
- Which decision errors would be materially costly or reputationally damaging.

A simple model for a future business case is:

`Research cost per brief = research hours × fully loaded hourly cost + external research cost`

Use measured interview results before claiming a specific time saving or ROI.

---

## 6. Stakeholders and initial customer hypothesis

| Stakeholder | Likely job / pain | Potential value from Fieldbook | Priority for first MVP |
|---|---|---|---|
| GCC advisory and market-entry teams | Research company presence, locations, policies, and options; prepare client deliverables | Reusable research workflow, source-linked comparisons, decision briefs | **Primary hypothesis** |
| Global companies considering a new GCC | Compare locations and identify relevant providers and examples | Faster initial research and clearer assumptions before engaging specialists | Secondary user |
| Existing GCC strategy/operations leaders | Benchmark talent, peers, cities, capability mix, and expansion choices | Market intelligence and evidence for internal planning | Later validation |
| GCC service providers (legal, talent, payroll, real estate, consulting) | Find relevant prospects and demonstrate credible experience | Discovery, signal monitoring, better visibility | Potential future customer segment; avoid marketplace dependency |
| State investment promotion agencies | Understand peer markets and explain local advantages | Policy comparison, market mapping, investor research | Later-stage use case |
| Researchers and ecosystem analysts | Reconcile published counts and track changes | Citable, structured data and reproducible methodology | Secondary user |

### Why begin with advisory / market-entry teams?

**[Hypothesis]** These users may repeat research across engagements, making a research workflow more valuable than a one-off directory. They also have a visible output—a client brief—that the prototype can demonstrate end to end.

**Important competitive caveat:** GCCPROs and GCC Index already address consultants/strategy users in their marketing. This target segment is not uncontested. Validate whether users need a bespoke evidence-and-deliverable workflow beyond current products before treating this segment as confirmed.

### Interview prompts

1. Tell me about the last time you evaluated a city, provider, or market for a GCC setup. What did you do first?
2. What sources did you use, and what data was hardest to trust or compare?
3. Where did two sources disagree? How did you decide which to use?
4. What did the final deliverable look like, and who needed to approve it?
5. How often do you repeat this work? Which parts are reusable?
6. What would you pay to improve this workflow—or what tool/vendor budget already covers it?
7. Looking at the current competitor products, what is missing from your workflow?

Record answers verbatim where possible; distinguish direct user evidence from our interpretation.

---

## 7. Competitive landscape

The most important research finding is that GCC intelligence already has direct competitors. Fieldbook should not position itself as the first GCC database, the only source of truth, or the only AI assistant for the ecosystem.

| Product / alternative | Publicly advertised focus | Implication for GCC Fieldbook |
|---|---|---|
| **GCCPROs** | Verified GCC database, GCC India Atlas, research and state-policy guides, practitioner council, consulting, events and talent. Its page says it verifies 4,658 centres worldwide and 2,550 in India as of 12 October 2026. | Strong direct competitor with a broad ecosystem approach and a published counting methodology. Fieldbook must differentiate by workflow and evidence handling, not only listing companies. |
| **SansoviGCC** | GCC directory and profiles with headcount history, functions, tech stack, leadership, vertical intelligence, location intelligence, benchmarks and job signals. | Direct competitor for searchable GCC profiles, analytics, and benchmarks. Do not simply reproduce the feature list. |
| **GCC Index** | Event and expansion feed, city/sector momentum, hiring signals, weekly AI insights, pipeline signals, and a natural-language query feature. | Direct competitor for market signals and AI research. An AI chat window alone is not a meaningful differentiator. |
| **Zinnov–NASSCOM reports** | Industry counts, GCC units, revenue/workforce estimates, maturity framework, sector and city trends. | Strong report-based alternative for market context. Fieldbook can focus on interactive, repeatable research after a report is read. |
| **JLL / CBRE research** | Office leasing, property-market data, city-level real-estate trends, and GCC location context. | Important specialist sources and competitors for parts of location intelligence; Fieldbook must cite their dates and definitions rather than imply it replaces their underlying research. |
| **Government and state investment portals** | Official policies, notifications, schemes, clearances, and investment information. | Primary sources for policy facts. Fieldbook should make them easier to find and compare but remain linked to the official documents. |
| **Company pages, announcements, corporate filings, job listings, general search and AI tools** | Distributed raw sources or broad answers across the web. | Major workflow substitutes. Fieldbook can structure, reconcile, and preserve source-level traceability across them. |

Competitor pages reviewed:

- [GCCPROs — About and product overview](https://www.gccpros.com/about)
- [GCCPROs — Research and intelligence](https://www.gccpros.com/research)
- [GCCPROs — How many GCCs are there in India?](https://www.gccpros.com/how-many-gccs-in-india)
- [SansoviGCC — GCC directory and intelligence](https://www.sansovi.com/gcc/)
- [SansoviGCC — Unified GCC platform](https://www.sansovi.com/products/gcc-unified-platform-overview/)
- [GCC Index — India GCC tracker and intelligence](https://gccindex.in/)
- [Zinnov–NASSCOM — India GCC Landscape 2026](https://zinnov.com/centers-of-excellence/zinnov-nasscom-india-gcc-landscape-2026-report/)
- [JLL — India GCC Guide 2026 overview](https://www.jll.com/en-in/newsroom/india-s-gcc-expansion-hits-record-31-million)
- [CBRE — GCCs Transforming India’s Office Landscape](https://www.cbre.co.in/insights/reports/gccs-transforming-india-s-office-landscape)

**Competitive research limitations:** This is a desk review of public-facing product pages, not a hands-on feature-by-feature product test. Advertised capabilities and statistics are vendor claims unless independently corroborated. Before final deck submission, capture dated screenshots or notes from a few live competitor flows if access permits.

---

## 8. Opportunity prioritization

Scores below are **team hypotheses for this assessment**, not external market measurements. Scale: 1 = low, 5 = high. “MVP feasibility” scores higher when achievable with a small curated dataset in the assessment window.

| Opportunity | User decision value | Feasibility in 72 hours | Differentiation potential | Data risk | Recommendation |
|---|---:|---:|---:|---:|---|
| Generic GCC directory | 3 | 4 | 1 | 3 | Do not make this the whole product; competitors are already established. |
| Source-linked GCC explorer | 4 | 4 | 3 | 3 | Build as a core foundation. |
| City comparison with transparent criteria | 5 | 4 | 3 | 4 | Include a small, defensible version; show source dates and unknowns. |
| AI research assistant over curated records | 4 | 4 | 2 | 4 | Build only when answers can cite retrieved records. AI itself is not the differentiator. |
| Evidence conflict and provenance workspace | 4 | 3 | 4 | 3 | **Potential product wedge to test.** Surface competing claims, counting rules, source dates, and field-level evidence. |
| Provider directory / delivery reputation marketplace | 4 | 2 | 2 | 5 | Defer. Delivery quality is hard to verify, and a marketplace requires supply and trust. |
| Automated new-GCC/expansion radar | 4 | 2 | 2 | 5 | Defer. GCC Index already markets event and pipeline intelligence; reliable monitoring adds complexity. |
| Client-specific decision brief | 5 | 4 | 4 | 3 | **Include in the prototype.** Turn evidence into an output with criteria, sources, assumptions, and open questions. |

### Recommended opportunity

Build a compact **evidence-to-decision workflow**:

1. Search or select a business question.
2. Retrieve relevant GCC, city, policy, and other available records.
3. Show source links, publication dates, last-checked dates, and verification status.
4. Expose contradictions, missing fields, and differences in definitions instead of hiding them.
5. Compare options using user-selected criteria and visible weights.
6. Generate a client-ready brief with claims linked to evidence and a section for limitations/open questions.

This gives the prototype a clear narrative and a functional end-to-end journey. It does not presume that competitors lack all of these features; user testing must identify whether the workflow is materially better for a specific audience.

---

## 9. Proposed positioning and product thesis

### Working positioning

> **GCC Fieldbook is an evidence-first GCC research workspace for teams evaluating India market entry. It connects company, location, policy, and provider information to source-level evidence, then helps users compare options and produce a defensible decision brief.**

### What it is—and what it is not

**It is:**

- A research workspace for a defined decision workflow.
- A structured sample of GCC ecosystem data with visible provenance.
- A way to compare options using explicit criteria and assumptions.
- An AI-assisted interface over retrieved evidence.
- A product that makes missing and conflicting information visible.

**It is not (in the MVP):**

- A complete registry of every GCC in India.
- A replacement for legal, tax, real-estate, or investment advice.
- A fully automated web crawler or an autonomous research agent.
- A verified ranking of service-provider delivery quality.
- A guaranteed source of live headcount, salary, rent, or incentive eligibility data.

### Proposed differentiators to validate

1. **Claim-level provenance:** users can open the source behind an important field or statement.
2. **Method transparency:** definitions, date, and counting basis appear alongside market metrics.
3. **Visible disagreement:** conflicting values remain visible with context instead of being collapsed into an unexplained number.
4. **Client-specific comparisons:** users can change criteria/weights, review evidence, and see why a recommendation changes.
5. **Decision-ready output:** the generated brief contains sources, assumptions, unknowns, and next research steps.

These are proposed product advantages, not verified gaps in competitor products.

---

## 10. MVP scope and research data plan

### 10.1 MVP user story

> As a GCC market-entry advisor, I want to investigate a client's location question, inspect the supporting evidence, compare a small set of Indian cities, and generate a sourced decision brief so I can explain my recommendation and its limitations.

### 10.2 Suggested demo scenario

A client wants to explore a 200-person AI engineering centre in India. The user asks: “Which two or three cities should we investigate first for an AI engineering GCC, and what evidence supports the shortlist?”

The prototype should help the user:

1. Search the curated database for relevant GCC examples.
2. Review company, location, and function records with source links.
3. Compare selected city indicators where data is available.
4. See missing values rather than silently receiving fabricated estimates.
5. Ask the AI copilot to summarize the retrieved evidence.
6. Generate a brief with a preliminary shortlist, rationale, source citations, assumptions, and questions requiring specialist validation.

The product should frame any resulting recommendation as preliminary research—not as definitive proof that one city is objectively best.

### 10.3 Initial dataset suggestion

Keep the first dataset small enough to validate carefully. A reasonable prototype target is:

- 25–40 well-sourced GCC/centre profiles across several sectors and major cities.
- 5–6 city profiles with indicators sourced to named publications and dates.
- A few primary state-policy records from official portals.
- A limited set of service-provider examples only where experience can be documented from credible public sources.
- A separate source registry so multiple claims can point to the same underlying source.

These are recommended scope targets, not claims about dataset coverage already achieved. If reliable evidence cannot be found for a field, store it as unknown rather than filling it from inference.

### 10.4 Suggested core entities

- **Company:** legal/brand name, parent company, home country, industry/sector, official domain.
- **GCC / centre:** centre identity, parent company, city/cities, known functions, setup year if sourced, size band if sourced, definition/qualification note.
- **Location:** city, state, indicator values, indicator units, time period, method, source references.
- **Policy:** issuing authority, policy name, state, publication/effective dates, official document URL, eligibility summary, caveats.
- **Provider:** name, category, service area, claimed GCC experience, public evidence of experience, evidence status.
- **Source:** URL, publisher, title, published date if available, accessed/checked date, source type, notes on authority and limitations.
- **Claim / evidence record:** subject, field, value, unit, valid period, source ID, confidence/status, verification note, conflict group where applicable.

### 10.5 Source hierarchy

Prefer sources in this order, while recording provenance for all useful sources:

1. Official government policy, notification, company filing, or regulator record for claims within its remit.
2. Official company announcement or company website for that company's own operations.
3. Named industry research/report from an established research, real-estate, or industry body—always retaining its publication date and definitions.
4. Reputable reporting that links to primary material.
5. Provider-authored marketing material or job listings, labeled as self-reported/indirect evidence rather than independent proof.
6. General web pages and social posts as leads for further research, not authoritative evidence by themselves.

Do not scrape or republish information in ways that violate a site's terms, access controls, privacy requirements, or applicable law. Prefer public, attributable facts and links to the original source.

---

## 11. Data trust rules

Data trust is a product feature, not a disclaimer added at the end.

### Required rules

- Each material fact should have at least one source reference; high-impact decisions should prefer a primary or corroborated source.
- Store the date a source was published, if known, separately from the date Fieldbook last checked it.
- Keep units and time periods: `GCCs`, `GCC units`, `sq. ft.`, `employees`, `₹/sq. ft./month`, etc. must not be silently combined.
- Separate `not found`, `not disclosed`, `not applicable`, `conflicting`, and `not yet verified` values.
- Do not treat a centre's city presence as proof of headcount, size, specific work, or provider performance.
- Do not convert a vendor claim into verified fact without corroboration.
- When sources conflict, display the values with source/date/context and record the reason if known.
- Avoid a single opaque confidence score. Start with simple statuses—`Verified`, `Corroborated`, `Single-source`, `Self-reported`, `Conflicting`, `Stale`, and `Unknown`—and define the evidence standard for each.
- AI output must not introduce new market facts not present in retrieved records or clearly label them as an unverified inference.
- City scores must expose their inputs, weights, missing data, and source dates. Do not imply objective precision where the data is sparse.

### Research example: counting GCCs

The FY2026 Zinnov–NASSCOM report says 2,117 GCCs operate 3,728 GCC units. GCCPROs reports 2,550 GCCs in its own verified database as of 12 October 2026 and explains that sources differ by date, definition, and whether a centre or unit is counted. Fieldbook should preserve those facts side by side with methodology metadata; it should not “resolve” them by selecting one number without explanation.

---

## 12. Prototype success metrics

These are **targets for testing**, not existing results.

| Metric | Proposed prototype target | Why it matters |
|---|---|---|
| End-to-end task completion | A reviewer can complete the GCC question → evidence → comparison → brief journey without manual database edits | Proves the product works as a workflow |
| Evidence coverage | 100% of material factual claims in a generated brief link to retrieved source records, or are visibly labeled as assumptions/unknowns | Reduces unsupported AI output |
| Search utility | Testers find relevant records using name, city, or sector filters | Validates the explorer basics |
| Conflict transparency | At least one designed example explains why two source counts differ without mixing their units | Demonstrates the key insight from research |
| Missing-data behavior | Unknown values remain unknown; no invented salaries, rents, headcounts, or incentives | Protects trust |
| Decision clarity | Testers can explain why the shortlist was produced and which assumptions could change it | Measures usefulness rather than visual polish alone |
| Access and reliability | Public demo link opens, API failures show an understandable error, and the core journey works on desktop and mobile | Ensures assessors can evaluate it |

For a short assessment, use a handful of realistic test scenarios rather than claiming statistically meaningful product validation.

---

## 13. Key assumptions and risks

| Assumption / risk | Why it matters | Mitigation / next test |
|---|---|---|
| A workflow gap remains despite existing competitors | GCCPROs, SansoviGCC, and GCC Index already offer overlapping capabilities | Inspect real competitor flows and interview target users; articulate a specific unmet workflow before claiming differentiation. |
| Advisors are the best first customer | They may already subscribe to incumbent research tools or prefer custom consultancy | Interview 3–5 target users if accessible; ask for an example of recent research and its workflow. |
| Public data is sufficient for a credible prototype | Headcount, provider delivery history, and cost data may be missing, stale, or commercial | Use a curated dataset; visibly label gaps; avoid provider rankings unless evidence supports them. |
| “Single source of truth” is achievable | A single definitive source may be unrealistic due to definitions and incomplete disclosure | Position Fieldbook as a traceable research layer that records competing claims and methods. |
| AI can reliably answer from the dataset | The model may hallucinate, overstate certainty, or mishandle conflicting sources | Use server-side retrieval, structured source payloads, citations, refusal/unknown behavior, and groundedness tests. |
| City comparison can look more precise than evidence permits | Mixed time periods and missing data can make scores misleading | Show raw indicators, dates, weights, and unavailable values; let users change criteria. |
| 72-hour scope is too large | Data collection and UI polish could consume the full window | Build a narrow vertical slice and defer automatic crawlers, marketplace features, accounts/billing, and complex analytics. |
| Current data and policies become stale | Market signals and state schemes change | Store dates and source URLs; make freshness part of the data model from the start. |

---

## 14. Next research actions

1. **Validate the user:** Speak with at least a few market-entry/advisory professionals, GCC leaders, or service providers if access is available. Do not represent these interviews as completed until they happen.
2. **Inspect competitors hands-on:** Run the same sample question in GCCPROs, SansoviGCC, and GCC Index. Note what is searchable, what is cited, what is paywalled, and whether the product can produce a custom source-linked brief.
3. **Make the competitor table specific:** Capture feature evidence and dates; do not rely only on homepage positioning.
4. **Build the source dataset:** Save exact URLs and relevant values; record publication and last-checked dates; keep raw notes for contradictory claims.
5. **Pick the demo decision:** Use the city-shortlist question or a similarly narrow client research scenario that can be answered with the dataset actually collected.
6. **Revisit the product wedge:** If competitor testing shows that the proposed evidence/brief workflow is already well served, narrow further based on user feedback rather than asserting an invented market gap.
7. **Quantify pain:** Collect real research-time, source-count, and update-workflow measurements before using ROI claims in the pitch deck.

---

## 15. Source bibliography

The links below were reviewed on **13 October 2026** unless the publication date noted in the table or article is earlier. They are the initial research library; new sources should be added with the same metadata and a note describing which claim they support.

### Industry landscape and trends

1. **Zinnov–NASSCOM.** *India GCC Landscape 2026 / The GCC Value Orbit.* FY2026 figures include 2,117 GCCs, 3,728 units, US$98.4B reported revenue, and 2.36M installed talent. [Report page](https://zinnov.com/centers-of-excellence/zinnov-nasscom-india-gcc-landscape-2026-report/)
2. **GCCPROs.** *How many GCCs are there in India?* Updated 10 October 2026; explains count differences and its own methodology. [Methodology and comparison](https://www.gccpros.com/how-many-gccs-in-india)
3. **Deloitte.** *India’s Strategic GCC Play for Japanese Enterprises.* Market and strategic role context. [Article/report page](https://www.deloitte.com/in/en/Industries/global-gcc/india-gcc-momentum-japanese-gcc-report.html)
4. **Deloitte.** *Deloitte India and Embark form a strategic alliance to offer end-to-end solutions for GCCs.* Published 6 August 2025; includes an earlier market framing and setup/service ecosystem context. [Press release](https://www.deloitte.com/in/en/about/press-room/deloitte-india-and-embark-form-a-strategic-alliance.html)
5. **Zinnov–NASSCOM.** *Mid-Market GCC Report FY2025.* Published 22 April 2025; previous-period mid-market GCC estimate. [Report page](https://zinnov.com/centers-of-excellence/zinnov-nasscom-mid-market-global-capability-centers-gccs-2025-report)
6. **ACCA.** *Global capability centres in India: trends, opportunities and the evolving role of talent.* Published 27 July 2025. [Report page](https://www.accaglobal.com/policy-and-insights/reports/2025/gcc-india.html)
7. **EY.** *GCC Pulse Survey 2025.* Published November 2025; AI investment, talent, and risk signals from surveyed GCC leaders. [Survey summary](https://www.ey.com/en_in/newsroom/2025/11/58-percent-gccs-in-india-investing-in-agentic-ai-two-third-creating-dedicated-innovation-teams-to-globalize-ideas-ey-gcc-pulse-survey-2025)

### Cities, real estate, and policy

8. **JLL.** *India GCC leasing hits record 31 million sq. ft in 2025, metros dominate.* Published 17 February 2026. [Market overview](https://www.jll.com/en-in/newsroom/india-s-gcc-expansion-hits-record-31-million)
9. **CBRE India.** *GCCs Transforming India’s Office Landscape.* Published 3 March 2025; reports 29.2 million sq. ft. of GCC leasing in 2024. [Report page](https://www.cbre.co.in/insights/reports/gccs-transforming-india-s-office-landscape)
10. **Government of Karnataka.** *GCC Policy 2024–2029* portal. [Official portal](https://registration.eitbt.karnataka.gov.in/gcc/register)
11. **Guidance Tamil Nadu.** *Special Scheme to promote Global Capability Centres (GCCs) in Tamil Nadu.* [Official policy/notification page](https://investingintamilnadu.com/business-in-tamil-nadu/policy-notifications/special-scheme-to-promote-global-capability-centres-gccs-in-tamil-nadu)
12. **Government of Telangana.** *Telangana Rising 2047* strategy document. [PDF](https://tgswc.telangana.gov.in/wp-content/uploads/2025/12/TelanganaRising-2047.pdf)

### Competitor products and alternatives

13. **GCCPROs.** Product overview, database, research, and ecosystem offerings. [About](https://www.gccpros.com/about) · [Research](https://www.gccpros.com/research) · [GCC India count/method](https://www.gccpros.com/how-many-gccs-in-india)
14. **SansoviGCC.** Directory, profiles, and intelligence product. [GCC intelligence](https://www.sansovi.com/gcc/) · [Unified platform](https://www.sansovi.com/products/gcc-unified-platform-overview/)
15. **GCC Index.** Event and expansion intelligence, city signals, and AI research features. [Product website](https://gccindex.in/)
16. **Zinnov–NASSCOM.** Industry landscape research. [2026 report page](https://zinnov.com/centers-of-excellence/zinnov-nasscom-india-gcc-landscape-2026-report/)
17. **JLL.** GCC and office-market research. [2026 overview](https://www.jll.com/en-in/newsroom/india-s-gcc-expansion-hits-record-31-million)
18. **CBRE India.** GCC office market research. [Report page](https://www.cbre.co.in/insights/reports/gccs-transforming-india-s-office-landscape)

---

## 16. Decision log for downstream documents

Carry these provisional decisions into `PRD.md`, `ARCHITECTURE.md`, and `IMPLEMENTATION_PLAN.md` unless new evidence changes them:

- Product name: **GCC Fieldbook**.
- Tagline: **The working guide to India's GCC ecosystem.**
- Initial positioning: evidence-first GCC research workspace for evaluating India market entry.
- Primary user hypothesis: GCC advisory and market-entry teams.
- Core workflow: question → retrieved evidence → transparent comparison → decision brief.
- Core differentiator to test: source-level provenance, conflict visibility, explicit assumptions, and reproducible decision outputs.
- Data strategy: small curated, source-backed dataset; no fabricated values or implied nationwide coverage.
- AI strategy: retrieval-grounded responses; important claims link to evidence; unknowns remain unknown.
- Defer: full crawler, large-scale live pipeline monitoring, public provider ratings, marketplace, subscription billing, and claims of complete coverage.
- Research status: desk research completed for this version; primary user interviews, hands-on competitor testing, and domain-specific demand validation remain pending.
