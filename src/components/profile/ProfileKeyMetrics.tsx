import React from "react";
import { Users, Building, Sparkles, Layers, Info } from "lucide-react";
import { GccCentre } from "@/types/domain";

interface ProfileKeyMetricsProps {
  centre: GccCentre;
}

export function ProfileKeyMetrics({ centre }: ProfileKeyMetricsProps) {
  // Sourced campus footprint claim if available
  const scaleClaim = centre.claims?.find(
    (c) => c.field_key === "campus_scale" || c.field_key.includes("footprint")
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Sourced Headcount Tile */}
      <div className="rounded-xl border border-border-neutral bg-white p-5 shadow-2xs">
        <div className="flex items-center justify-between text-xs text-ink-muted">
          <span className="font-semibold uppercase tracking-wider">Sourced Headcount</span>
          <Users className="w-4 h-4 text-brand" />
        </div>
        <div className="mt-3">
          <span className="font-heading text-2xl sm:text-3xl font-extrabold text-ink font-mono tabular-nums">
            {centre.headcount_min?.toLocaleString()}
            {centre.headcount_max ? ` – ${centre.headcount_max.toLocaleString()}` : ""}+
          </span>
          <span className="block text-xs text-ink-secondary mt-1">
            Professional engineering & analytics workforce
          </span>
        </div>
      </div>

      {/* Facility Scale / Footprint Tile */}
      <div className="rounded-xl border border-border-neutral bg-white p-5 shadow-2xs">
        <div className="flex items-center justify-between text-xs text-ink-muted">
          <span className="font-semibold uppercase tracking-wider">Facility Scale</span>
          <Building className="w-4 h-4 text-sky-700" />
        </div>
        <div className="mt-3">
          <span className="font-heading text-lg sm:text-xl font-bold text-ink">
            {scaleClaim ? scaleClaim.value_text : `${centre.city?.name} Tech Hub`}
          </span>
          <span className="block text-xs text-ink-secondary mt-1">
            {scaleClaim
              ? "Verified infrastructure & real estate scale"
              : "Integrated capability operation"}
          </span>
        </div>
      </div>

      {/* Capabilities Tag Cloud Tile */}
      <div className="rounded-xl border border-border-neutral bg-white p-5 shadow-2xs md:col-span-1">
        <div className="flex items-center justify-between text-xs text-ink-muted mb-2.5">
          <span className="font-semibold uppercase tracking-wider">Functional Mandate</span>
          <Sparkles className="w-4 h-4 text-amber-600" />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {centre.functions.map((func) => (
            <span
              key={func}
              className="px-2 py-0.5 rounded text-xs font-medium bg-surface-subtle text-ink border border-border-neutral"
            >
              {func}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
