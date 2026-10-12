import React from "react";
import Link from "next/link";
import { Building2, MapPin, Globe, Calendar, ExternalLink, ShieldCheck } from "lucide-react";
import { GccCentre } from "@/types/domain";
import { StatusBadge } from "@/components/shared/StatusBadge";

interface ProfileHeroProps {
  centre: GccCentre;
}

export function ProfileHero({ centre }: ProfileHeroProps) {
  const hasConflict = centre.claims?.some((c) => c.evidence_status === "conflicting");
  const hasEstimate = centre.claims?.some((c) => c.evidence_status === "estimated");
  const overallStatus = hasConflict ? "conflicting" : hasEstimate ? "estimated" : "verified";

  return (
    <div className="rounded-xl border border-border-neutral bg-white p-6 sm:p-8 shadow-2xs space-y-5">
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand">
              {centre.company?.name || centre.sector}
            </span>
            <span className="text-border-strong">&bull;</span>
            <span className="text-xs text-ink-muted">
              HQ: {centre.company?.headquarters_country || "Global"}
            </span>
            <span className="text-border-strong">&bull;</span>
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              <span>Sourced Record</span>
            </span>
          </div>

          <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-ink">
            {centre.display_name}
          </h1>
        </div>

        <div className="shrink-0 self-start">
          <StatusBadge status={overallStatus} />
        </div>
      </div>

      {/* Meta Pills & External Link */}
      <div className="flex flex-wrap items-center gap-3 pt-2 text-xs sm:text-sm">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-surface-subtle border border-border-neutral text-ink font-medium">
          <MapPin className="w-3.5 h-3.5 text-brand" />
          <span>
            {centre.city?.name}, {centre.city?.state_or_region}
          </span>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-surface-subtle border border-border-neutral text-ink font-medium">
          <Building2 className="w-3.5 h-3.5 text-ink-muted" />
          <span>{centre.sector}</span>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-surface-subtle border border-border-neutral text-ink font-medium">
          <Calendar className="w-3.5 h-3.5 text-ink-muted" />
          <span>Est. {centre.setup_year || "Unknown"}</span>
        </div>

        {centre.company?.official_website && (
          <a
            href={centre.company.official_website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-brand hover:text-brand-hover hover:bg-brand-soft border border-brand/30 font-semibold transition-colors"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Official Portal</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>

      {/* Strategic Definition Note */}
      {centre.definition_note && (
        <div className="pt-4 border-t border-border-neutral/60">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-ink-muted mb-1">
            Strategic Mission & Scope
          </h4>
          <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
            {centre.definition_note}
          </p>
        </div>
      )}
    </div>
  );
}
