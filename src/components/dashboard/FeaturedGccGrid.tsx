import Link from "next/link";
import { Building2, MapPin, Users, Calendar, ArrowRight, ExternalLink } from "lucide-react";
import { GccCentre } from "@/types/domain";
import { StatusBadge } from "@/components/shared/StatusBadge";

interface FeaturedGccGridProps {
  centres: GccCentre[];
}

export function FeaturedGccGrid({ centres }: FeaturedGccGridProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="font-heading font-bold text-lg sm:text-xl text-ink">
            Featured Global Capability Centres
          </h3>
          <p className="text-xs text-ink-secondary mt-0.5">
            Deep-dive profiles with verified corporate filings, facility scales, and operational capabilities.
          </p>
        </div>
        <Link
          href="/gccs"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand hover:text-brand-hover self-start sm:self-auto"
        >
          <span>View all {centres.length} centres in Explorer</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {centres.map((centre) => {
          // Determine representative claim status from claims or record
          const hasConflict = centre.claims?.some((c) => c.evidence_status === "conflicting");
          const hasEstimate = centre.claims?.some((c) => c.evidence_status === "estimated");
          const status = hasConflict ? "conflicting" : hasEstimate ? "estimated" : "verified";

          return (
            <div
              key={centre.id}
              className="group rounded-xl border border-border-neutral bg-white p-5 shadow-2xs hover:shadow-sm hover:border-brand/40 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header: Company & Status */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-brand">
                      {centre.company?.name || centre.sector}
                    </span>
                    <h4 className="font-heading font-bold text-base sm:text-lg text-ink group-hover:text-brand transition-colors mt-0.5">
                      <Link href={`/gccs/${centre.slug || centre.id}`}>
                        {centre.display_name}
                      </Link>
                    </h4>
                  </div>
                  <StatusBadge status={status} />
                </div>

                {/* Subtitle / Definition Note */}
                {centre.definition_note && (
                  <p className="text-xs text-ink-secondary mt-2 line-clamp-2 leading-relaxed">
                    {centre.definition_note}
                  </p>
                )}

                {/* Key Indicators Grid */}
                <div className="mt-4 grid grid-cols-2 gap-3 py-3 border-y border-border-neutral/60 text-xs">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-ink-muted shrink-0" />
                    <span className="text-ink font-medium truncate">
                      {centre.city?.name}, {centre.city?.state_or_region}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-ink-muted shrink-0" />
                    <span className="text-ink-secondary">
                      Est. <strong className="text-ink font-medium">{centre.setup_year || "Unknown"}</strong>
                    </span>
                  </div>

                  <div className="flex items-center gap-2 col-span-2">
                    <Users className="w-3.5 h-3.5 text-ink-muted shrink-0" />
                    <span className="text-ink-secondary">
                      Headcount:{" "}
                      <strong className="text-ink font-medium">
                        {centre.headcount_min?.toLocaleString()}
                        {centre.headcount_max ? ` – ${centre.headcount_max.toLocaleString()}` : ""}+
                      </strong>{" "}
                      <span className="text-ink-muted text-[11px]">(sourced)</span>
                    </span>
                  </div>
                </div>

                {/* Capability Badges */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {centre.functions.slice(0, 3).map((func) => (
                    <span
                      key={func}
                      className="px-2 py-0.5 rounded text-[11px] font-medium bg-surface-subtle text-ink-secondary border border-border-neutral/70"
                    >
                      {func}
                    </span>
                  ))}
                  {centre.functions.length > 3 && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-medium text-ink-muted bg-surface-subtle">
                      +{centre.functions.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Action Link Footer */}
              <div className="mt-4 pt-3 border-t border-border-neutral/40 flex items-center justify-between">
                <span className="text-[11px] text-ink-muted font-mono">
                  {centre.claims?.length || 0} citations linked
                </span>
                <Link
                  href={`/gccs/${centre.slug || centre.id}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-brand hover:text-brand-hover group-hover:translate-x-0.5 transition-transform"
                >
                  <span>Evidence Profile</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
