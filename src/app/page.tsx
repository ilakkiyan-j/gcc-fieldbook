import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Building2, ShieldCheck, Database, CheckCircle2 } from "lucide-react";
import { repository } from "@/lib/data/repository";
import { CoverageBanner } from "@/components/dashboard/CoverageBanner";
import { OverviewMetrics } from "@/components/dashboard/OverviewMetrics";
import { ConfidenceBar } from "@/components/dashboard/ConfidenceBar";
import { FeaturedGccGrid } from "@/components/dashboard/FeaturedGccGrid";
import { QuickActionLaunchpads } from "@/components/dashboard/QuickActionLaunchpads";

export const metadata = {
  title: "Dashboard Overview — GCC Fieldbook",
  description:
    "High-level intelligence command center for India's Global Capability Centres ecosystem with verified sources and confidence metrics.",
};

export default async function HomePage() {
  // Fetch dynamic metrics from repository (hybrid: Supabase with local seed fallback)
  const [metrics, stats, gccsResult] = await Promise.all([
    repository.getOverviewMetrics(),
    repository.getEvidenceStats(),
    repository.getGccs({ pageSize: 4 }),
  ]);

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      {/* Hero / Command Center Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-border-neutral/60">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-brand-soft text-brand-ink border border-brand/20 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-brand" />
            <span>Executive Workspace &bull; India Ecosystem</span>
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-ink">
            India GCC Intelligence Command Center
          </h1>
          <p className="text-xs sm:text-sm text-ink-secondary mt-1.5 max-w-3xl leading-relaxed">
            Evidence-first intelligence workspace benchmarking Global Capability Centres across Tier-1 and Tier-2 corridors. Sourced directly from verifiable corporate filings, real estate benchmarks, and state policy gazettes.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/gccs"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand text-white text-xs font-semibold hover:bg-brand-hover transition-colors shadow-2xs"
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Explore All Centres</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Honest Coverage Notice Banner (ADR-005) */}
      <CoverageBanner
        centreCount={metrics.gccCentreCount}
        cityCount={metrics.cityCount}
      />

      {/* Core Ecosystem Metric Cards */}
      <OverviewMetrics
        metrics={metrics}
        verifiedPercent={stats.verifiedPercent}
      />

      {/* Evidence Confidence & Data Integrity Distribution */}
      <ConfidenceBar stats={stats} />

      {/* Featured GCC Intelligence Cards Grid */}
      <FeaturedGccGrid centres={gccsResult.data} />

      {/* Cross-Module Navigation Launchpads */}
      <QuickActionLaunchpads />

      {/* Research Methodology & Trust Callout */}
      <div className="rounded-xl border border-border-neutral bg-surface-subtle/70 p-5 sm:p-6 text-xs text-ink-secondary">
        <div className="flex items-center gap-2 text-ink font-semibold text-sm mb-3">
          <ShieldCheck className="w-4 h-4 text-brand" />
          <span>Evidence Governance Principles (ADR-005 / DATA_TRUST.md)</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-3.5 rounded-lg bg-white border border-border-neutral/70">
            <span className="font-semibold text-ink block mb-1">Traceable Provenance</span>
            Every material claim links to a public source, publisher date, URL, and verification status. No anonymous or unverified numbers are presented as fact.
          </div>
          <div className="p-3.5 rounded-lg bg-white border border-border-neutral/70">
            <span className="font-semibold text-ink block mb-1">Preserved Divergence</span>
            When independent industry reports disagree on headcounts or real estate absorption, conflicting figures are preserved rather than averaged into a false single figure.
          </div>
          <div className="p-3.5 rounded-lg bg-white border border-border-neutral/70">
            <span className="font-semibold text-ink block mb-1">Explicit Unknowns</span>
            Missing data fields (e.g. pending FY26 power tariff revisions) are marked explicitly as unknown rather than coerced to zero or omitted silently.
          </div>
        </div>
      </div>
    </div>
  );
}
