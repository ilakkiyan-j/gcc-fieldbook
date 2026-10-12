# GCC Fieldbook — Production Deployment & Operations Guide

## 1. Overview & Architecture

**GCC Fieldbook** is an India GCC Intelligence workspace built with:
- **Framework:** Next.js 15 (App Router with React 19)
- **Styling:** Tailwind CSS 3.4 with custom design tokens (`brand: #1F6654`, warm off-white canvas `#F5F7F5`)
- **Typography:** `next/font/google` with Bricolage Grotesque (headings) and Inter (body)
- **Database Architecture:** Hybrid Repository Adapter (PostgreSQL / Supabase with automatic deterministic fallback to curated seed dataset)
- **AI Synthesis:** Google Gemini 2.5 Flash via server-side REST API with strict citation validation (ADR-008)
- **Hosting Target:** Vercel (Edge / Serverless Node.js 20+)

---

## 2. Environment Variables Specification

The application requires only 3 environment variables in production. None of the sensitive keys are ever exposed to client-side bundles.

| Variable Name | Required Scope | Target Environment | Description |
|---|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Public / Browser & Edge | Production, Preview, Local | Supabase project REST endpoint URL (e.g., `https://xyzcompany.supabase.co`). |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public / Browser & Edge | Production, Preview, Local | Supabase anonymous public client key with Row Level Security (RLS) enforcement. |
| `GEMINI_API_KEY` | **Server-Only** | Production, Preview, Local | Google AI Studio Gemini API key for server-side grounded synthesis (`copilotResearch`). |

> [!IMPORTANT]
> **Zero-Secrets Policy:**
> `GEMINI_API_KEY` and any Supabase service role keys must **never** be prefixed with `NEXT_PUBLIC_`. In `src/lib/ai/gemini.ts` and `src/app/api/research/route.ts`, the Gemini client executes strictly on the server or route handler boundary.

---

## 3. Resilience & Hybrid Fallback Mode

To guarantee 100% operational uptime during evaluations, reviews, or provider outages:
- If `NEXT_PUBLIC_SUPABASE_URL` or `NEXT_PUBLIC_SUPABASE_ANON_KEY` are not configured or the remote PostgreSQL instance is unreachable, the hybrid repository adapter automatically serves verified, auditable in-memory seed records (`SEED_CENTRES`, `SEED_POLICIES`, `SEED_CLAIMS`).
- If `GEMINI_API_KEY` is absent or rate-limited, the Research Copilot automatically activates the deterministic synthesizer fallback, presenting transparent limitation notices without crashing or hallucinating citations.

---

## 4. Vercel Deployment Instructions

### Option A: Deploy via Vercel CLI

```bash
# 1. Install or authenticate Vercel CLI
npx vercel login

# 2. Link repository
npx vercel link

# 3. Add production environment variables
npx vercel env add NEXT_PUBLIC_SUPABASE_URL production
npx vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
npx vercel env add GEMINI_API_KEY production

# 4. Trigger production build & deployment
npx vercel --prod
```

### Option B: Deploy via Vercel Web Dashboard (Git Push)

1. Connect the GitHub/Git repository to Vercel.
2. Select **Framework Preset:** `Next.js`.
3. Set **Root Directory:** `./`.
4. In **Settings → Environment Variables**, add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `GEMINI_API_KEY`
5. Click **Deploy**.

---

## 5. Supabase Remote Database Initialization (Optional)

If hosting on a live Supabase instance:
1. Create a new Supabase project at [supabase.com](https://supabase.com).
2. Navigate to **SQL Editor**.
3. Run the migration scripts in sequence:
   - `supabase/migrations/20260301000000_init_gcc_schema.sql` (Creates tables: `companies`, `cities`, `gcc_centres`, `sources`, `evidence_claims`, `location_indicators`, `state_policies`).
   - `supabase/seed.sql` (Inserts initial curated seed records with full evidence traces).
4. Verify Row Level Security (RLS) is enabled with public `SELECT` policies.

---

## 6. Post-Deployment Verification & Smoke Test Checklist

Once the production URL is generated (e.g., `https://gcc-fieldbook.vercel.app`), verify the following sequence in an incognito/clean browser window:

1. **System Health Endpoint:**
   - Navigate to `/api/health`.
   - Verify JSON payload: `{ status: "healthy", timestamp: "...", repository: "...", geminiConfigured: true }`.
2. **Dashboard Overview (`/`):**
   - Confirm coverage banner ("Curated Prototype Dataset").
   - Confirm all 3 ecosystem metrics render numerical counts without NaN or layout shifts.
3. **GCC Explorer (`/gccs`):**
   - Type `"Goldman"` into the search bar → verify instant client filtering.
   - Click "Hyderabad" filter pill → verify table updates.
   - Click "Clear all filters" → verify reset to 4+ records.
4. **GCC Profile (`/gccs/goldman-sachs-bengaluru`):**
   - Confirm Evidence Ledger renders verified, estimated, and conflicting claims.
   - Verify citation source URLs open in a new tab with `rel="noopener noreferrer"`.
5. **Location Intelligence (`/locations`):**
   - Verify indicator comparison table (Office Rent, Tech Talent Pool, Power Tariff).
   - Verify State Policy Framework cards (Karnataka vs Telangana).
6. **Research Copilot (`/research`):**
   - Click suggested prompt chip `"Which GCCs have quantitative finance operations?"`.
   - Verify grounded answer contains bracketed citation pills `[CLM-...]`.
   - Click citation pill to view matching evidence claim drawer.
7. **Decision Brief Generator (`/brief`):**
   - Select `"AI & Quantitative Finance Expansion"` objective.
   - Click **Generate Decision Brief**.
   - Test **Copy Markdown** (toast notification triggers).
   - Test **Download .md** (saves `gcc-decision-brief.md`).
