import React from "react";
import { Info, ShieldAlert, CheckCircle2 } from "lucide-react";

export function ComparabilityDisclosure() {
  return (
    <div className="rounded-xl border border-border-neutral bg-surface-subtle/70 p-5 sm:p-6 text-xs text-ink-secondary space-y-3 shadow-2xs">
      <div className="flex items-center gap-2 text-ink font-semibold text-sm">
        <Info className="w-4 h-4 text-brand" />
        <span>Location Comparability & Micro-Market Disclosures (ADR-007)</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
        <div className="p-3.5 rounded-lg bg-white border border-border-neutral/70">
          <span className="font-semibold text-ink block mb-1">Commercial Real Estate Scope</span>
          Gross office rental figures represent prime Grade-A IT parks in Outer Ring Road / Whitefield for Bengaluru, and HITEC City / Financial District for Hyderabad. They do not represent citywide blended commercial averages.
        </div>

        <div className="p-3.5 rounded-lg bg-white border border-border-neutral/70">
          <span className="font-semibold text-ink block mb-1">Talent Concentration Baseline</span>
          Engineering talent figures reflect full-time tech professionals surveyed across GCCs and Tier-1 IT services operations by NASSCOM / Zinnov. Cross-city talent comparisons use consistent survey periods.
        </div>

        <div className="p-3.5 rounded-lg bg-white border border-border-neutral/70">
          <span className="font-semibold text-ink block mb-1">Honest Handling of Incomplete Tariffs</span>
          Where state electricity regulatory commissions have pending tariff schedule revisions (e.g. FY26 industrial power), indicators are explicitly flagged as unknown rather than populated with outdated or fabricated figures.
        </div>
      </div>
    </div>
  );
}
