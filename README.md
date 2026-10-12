# GCC Fieldbook — The Working Guide to India's GCC Ecosystem

> **Status:** Phase 1 Verified (Provisional Scaffold)  
> **Product Journey:** Discover a GCC → Inspect Evidence → Compare Locations → Ask AI Copilot → Generate Decision Brief

GCC Fieldbook is an evidence-first intelligence workspace for GCC consultants and market-entry teams evaluating India's Global Capability Centre ecosystem.

---

## Prerequisites
- **Node.js:** v20+ (tested on Node v26.7.0)
- **Package Manager:** `npm` v11+
- **Git**

---

## Getting Started

### 1. Clone & Install Dependencies
```bash
git clone <repo-url>
cd gcc-fieldbook
npm install
```

### 2. Environment Setup (Provisional)
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
*(No API keys are required for Phase 1 local development and build).*

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## Available Scripts

| Command | Action |
|---|---|
| `npm run dev` | Starts Next.js development server |
| `npm run build` | Builds optimized Next.js production bundle |
| `npm run start` | Runs production server |
| `npm run type-check` | Runs strict TypeScript compiler check (`tsc --noEmit`) |
| `npm run test` | Runs Vitest unit test suite |
| `npm run lint` | Runs ESLint validation |

---

## Route Overview (P0 Journey)

- `/` — Overview Dashboard
- `/gccs` — GCC Explorer & Filter Catalog
- `/gccs/[id]` — GCC & Company Detail with Claim-level Evidence
- `/locations` — Location Benchmarking & City Comparison Matrix
- `/research` — AI Research Copilot with Grounded Citations
- `/brief` — Exportable Decision Brief
- `/api/health` — System Health Status Endpoint
