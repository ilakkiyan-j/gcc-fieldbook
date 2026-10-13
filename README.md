# GCC Fieldbook — The Working Guide to India's GCC Ecosystem

[![Live Deployment](https://img.shields.io/badge/Vercel-Live%20Demo-emerald?style=flat-square&logo=vercel)](https://gcc-fieldbook.vercel.app/)
[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-blue?style=flat-square&logo=github)](https://github.com/ilakkiyan-j/gcc-fieldbook.git)
[![TypeScript Strict](https://img.shields.io/badge/TypeScript-Strict%20ES2022-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Next.js 15](https://img.shields.io/badge/Next.js-15.5-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![Tests](https://img.shields.io/badge/Vitest-40%2F40%20Passing-success?style=flat-square&logo=vitest)](https://vitest.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

> **Live Deployment:** [https://gcc-fieldbook.vercel.app/](https://gcc-fieldbook.vercel.app/)  
> **Source Repository:** [https://github.com/ilakkiyan-j/gcc-fieldbook.git](https://github.com/ilakkiyan-j/gcc-fieldbook.git)

**GCC Fieldbook** is an evidence-first intelligence workspace for GCC advisors, site selectors, and leadership teams evaluating India's Global Capability Centre ecosystem. It replaces hearsay and unsourced slide decks with auditable primary sources, granular real estate benchmarks, conflicting claim disclosures, and an evidence-grounded AI copilot.

---

## The Core Executive Journey

```text
Discover a GCC → Inspect Evidence → Compare Locations → Ask AI Copilot → Generate Decision Brief
```

1. **Discover:** Search and filter verified Global Capability Centres across Tier-1 and Tier-2 corridors by domain, function, and verification tier.
2. **Inspect Evidence:** Trace every headcount number, lease area, and setup year directly to primary filings (JLL reports, NASSCOM surveys, SEC filings, state gazettes).
3. **Compare Locations:** Benchmark commercial office rentals, talent pool depth, power tariffs, and state policy subsidies across metro corridors with defined units and measurement periods.
4. **Research Copilot:** Query India's GCC ecosystem with strictly grounded AI that validates every citation `[CLM-...]` against retrieved evidence packets and refuses to hallucinate facts.
5. **Decision Brief:** Synthesize strategic objectives into a full-width, exportable executive diligence memo with risk matrices and auditable citation ledgers.

---

## Key Features & Architecture

### 1. Evidence Trust & Provenance Model
- **No Hallucinated Claims:** Every factual assertion is linked to an auditable source claim with distinct `published_date` vs. `last_checked_date` timestamps.
- **Conflict Transparency:** Conflicting market data (e.g. conflicting headcount estimates between corporate filings and industry surveys) is displayed side-by-side rather than artificially harmonized.
- **Transparent Data Statuses:** Claims are categorized as `VERIFIED`, `ESTIMATED`, `SELF_REPORTED`, `CONFLICTING`, or `UNKNOWN`. Missing data is never coerced to zero.

### 2. Micro-Market Location Intelligence
- Prime corridor benchmarking (e.g. Outer Ring Road & Whitefield in Bengaluru vs. HITEC City & Financial District in Hyderabad).
- Rigorous indicator telemetry: Grade-A Base Rent (`₹/sq.ft/mo`), Tech Talent Headcount, Commercial Power Tariffs (`₹/kWh`), and Vacancy Rates (`%`).
- Enacted state policy summaries with gazette notifications (Karnataka GCC Policy 2024-2029, Telangana ICT Policy 2021-2026).

### 3. Evidence-Bound AI Copilot (RAG)
- Powered by the Google Gemini API with deterministic fallback when credentials are not configured.
- Server-side retrieval-augmented generation: fetches source claims *before* querying the model.
- Strict token validation: citation tokens like `[CLM-GS-01]` or `[CLM-ORR-01]` are verified against the retrieved packet; unrecognized tokens are stripped.
- Explicit limitation notices when queries exceed the curated dataset scope.

### 4. Executive Decision Brief Generator
- Tailor strategic parameters: AI & Quantitative Hub Expansion, Real Estate & Lease Optimization, or State Policy Evaluation.
- Horizontal parameter configuration bar maximizing memo canvas width.
- 100% full-width semantic tables with inline citation pills, exportable to Markdown, clipboard, or printable PDF.

---

## System Documentation

Comprehensive technical specifications and decision records are maintained in [`docs/`](docs/):

- **[Technical Architecture](docs/architecture.md):** System topology, security boundaries, and data access models.
- **[Data Trust & Provenance](docs/data-trust.md):** Evidence verification rules, conflicting claim handling, and audit timestamps.
- **[Data Dictionary](docs/data-dictionary.md):** Field-level PostgreSQL schema, controlled statuses, and nullability contracts.
- **[Design System](docs/design-system.md):** Typography, color system, component architecture, and responsive breakpoints.
- **[Architectural Decisions (ADRs)](docs/decisions.md):** Durable design records (ADR-001 through ADR-022).
- **[Testing Strategy](docs/testing.md):** Quality gates, evaluation matrices, and prompt-injection defenses.

---

## Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 15.5 (App Router, Server Components & Client Workspaces) |
| **Language** | TypeScript 5.7+ (Strict mode, ES2022 target) |
| **Styling** | Tailwind CSS v4, Lucide Icons, Custom Bricolage Grotesque typography |
| **Data Layer** | Supabase PostgreSQL + Deterministic offline seed repository fallback |
| **Validation** | Zod runtime schema validation |
| **AI Synthesis** | Google Generative AI SDK (`@google/genai`) with deterministic fallback |
| **Testing** | Vitest 3.2, 40 automated tests across 9 test suites |
| **Deployment** | Vercel Serverless Edge Platform |

---

## Getting Started Locally

### Prerequisites
- **Node.js:** v20+ (developed on Node v20/v26)
- **npm:** v10+
- **Git**

### 1. Clone & Install
```bash
git clone https://github.com/ilakkiyan-j/gcc-fieldbook.git
cd gcc-fieldbook
npm install
```

### 2. Environment Configuration
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Configure your environment variables in `.env.local`:
```env
# Optional: Live Gemini Model Integration (Deterministic fallback active if omitted)
GEMINI_API_KEY=your_gemini_api_key_here

# Optional: Hosted Supabase Integration (Offline seed active if omitted)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```
> **Note:** The application includes a self-contained offline repository. If no Supabase or Gemini keys are provided, it operates 100% functionally with curated offline data and deterministic RAG synthesis.

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Database Migrations & Seed Data

The complete canonical schema and verified evidence seed data are located in `supabase/`:

- **Initial Schema Migration:** [`supabase/migrations/20261013000001_initial_schema.sql`](supabase/migrations/20261013000001_initial_schema.sql)
- **Curated Evidence Seed:** [`supabase/seed.sql`](supabase/seed.sql)

To apply to your hosted Supabase instance:
```bash
supabase db push
# or run the SQL scripts directly in the Supabase SQL Editor
```

---

## Quality Assurance & Verification

The project enforces strict automated verification:

| Command | Action | Current Status |
|---|---|---|
| `npm run type-check` | Strict TypeScript check (`tsc --noEmit`) | ✅ **0 errors** |
| `npm run lint` | Next.js ESLint validation | ✅ **0 warnings / 0 errors** |
| `npm test` | Automated Vitest test suite | ✅ **40/40 tests passing (9 suites)** |
| `npm run build` | Next.js production build bundle | ✅ **13/13 routes compiled** |

### Test Suite Highlights
- `tests/data/repository.test.ts`: Database query filters, ID stability, and offline fallback guarantees.
- `tests/ui/*.test.ts`: Component tests across Overview, Explorer, Location Matrix, and Decision Brief.
- `tests/ai/copilot.test.ts`: Citation validation, prompt-injection defense, and out-of-scope boundaries.
- `tests/e2e/e2e-workflow.test.ts`: End-to-end multi-step executive consultant journey across all 6 views.

---

## Known Boundaries & Disclosures

1. **Curated Sample Coverage:** GCC Fieldbook intentionally tracks a curated sample of Tier-1 and Tier-2 GCC centres (e.g. Goldman Sachs, Boeing, Walmart Global Tech) rather than claiming exhaustive national coverage.
2. **Explicit Data Gaps:** Fields without verified primary source documentation are displayed as `Not Available` or `Unknown` rather than coerced to placeholder numbers.
3. **Session-Scoped Diligence:** The application operates without user authentication or persistent server sessions; export briefs to Markdown or PDF to preserve deliverables.

---

## License

This project is licensed under the [MIT License](LICENSE).
