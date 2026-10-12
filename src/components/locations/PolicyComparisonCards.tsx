import React from "react";
import { Landmark, Calendar, FileText, ExternalLink, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Policy } from "@/types/domain";

interface PolicyComparisonCardsProps {
  policies: Policy[];
}

export function PolicyComparisonCards({ policies }: PolicyComparisonCardsProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-heading font-bold text-base sm:text-lg text-ink flex items-center gap-2">
          <Landmark className="w-5 h-5 text-brand" />
          <span>State GCC Policy Frameworks & Fiscal Subsidies</span>
        </h3>
        <p className="text-xs text-ink-secondary mt-0.5">
          Comparative breakdown of state-level operational subsidies, patent grant matching, and single-window clearance frameworks.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {policies.map((policy) => (
          <div
            key={policy.id}
            className="rounded-xl border border-border-neutral bg-white p-5 sm:p-6 shadow-2xs flex flex-col justify-between space-y-4"
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-2 pb-3 border-b border-border-neutral/60">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-brand">
                    {policy.state_or_authority} State Gazette
                  </span>
                  <h4 className="font-heading font-bold text-base sm:text-lg text-ink mt-0.5">
                    {policy.title}
                  </h4>
                </div>
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 shrink-0">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  <span>Enacted</span>
                </span>
              </div>

              {/* Authority & Validity */}
              <div className="pt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-secondary">
                <div>
                  Authority: <strong className="text-ink font-medium">{policy.issuing_authority}</strong>
                </div>
                {policy.effective_from && policy.effective_to && (
                  <div className="flex items-center gap-1 text-ink-muted">
                    <Calendar className="w-3.5 h-3.5 text-ink-muted" />
                    <span>
                      {policy.effective_from} to {policy.effective_to}
                    </span>
                  </div>
                )}
              </div>

              {/* Policy Summary */}
              <div className="mt-3.5 p-3.5 rounded-lg bg-surface-subtle/70 text-xs text-ink-secondary leading-relaxed border border-border-neutral/60">
                <span className="font-semibold text-ink block mb-1">
                  Key Incentive Framework:
                </span>
                {policy.summary}
              </div>
            </div>

            {/* Source Footer */}
            <div className="pt-3 border-t border-border-neutral/50 flex items-center justify-between text-xs">
              <span className="text-[11px] text-ink-muted">
                Audited: {policy.last_checked_at}
              </span>

              {policy.source?.url && (
                <a
                  href={policy.source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-brand hover:text-brand-hover hover:underline"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Official State Document</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
