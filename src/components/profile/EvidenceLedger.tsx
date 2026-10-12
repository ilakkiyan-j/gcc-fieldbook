import React from "react";
import { CheckCircle2, Calendar, Clock, ExternalLink, GitCompare, FileText, ShieldAlert, Info } from "lucide-react";
import { EvidenceClaim } from "@/types/domain";
import { StatusBadge } from "@/components/shared/StatusBadge";

interface EvidenceLedgerProps {
  claims?: EvidenceClaim[];
}

export function EvidenceLedger({ claims = [] }: EvidenceLedgerProps) {
  if (claims.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border-neutral bg-white p-6 text-center text-xs text-ink-muted">
        No individual claim records linked to this centre yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="font-heading font-bold text-lg sm:text-xl text-ink flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-brand" />
            <span>Claim-Level Evidence Ledger & Citation Audit</span>
          </h3>
          <p className="text-xs text-ink-secondary mt-0.5">
            Transparent provenance for every quantitative and qualitative claim. Sources, publication dates, and verification notes are auditable.
          </p>
        </div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-brand-soft text-brand-ink border border-brand/20 text-xs font-semibold self-start sm:self-auto font-mono">
          <span>{claims.length} Citations Linked</span>
        </div>
      </div>

      {/* ADR-004 Freshness & Trust Notice */}
      <div className="p-3.5 rounded-lg border border-border-neutral bg-surface-subtle/80 text-xs text-ink-secondary flex items-start gap-2.5">
        <Info className="w-4 h-4 text-brand shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-ink font-semibold">Data Freshness Policy (ADR-004):</strong> Publication date and last-checked date are maintained separately. A claim verified in 2026 citing a 2021 release preserves both timestamps honestly without claiming retroactive freshness.
        </p>
      </div>

      {/* Claims List */}
      <div className="space-y-3">
        {claims.map((claim) => {
          const isConflicting = claim.evidence_status === "conflicting";

          return (
            <div
              key={claim.id}
              className={`rounded-xl border bg-white p-5 shadow-2xs transition-all ${
                isConflicting
                  ? "border-rose-300 bg-rose-50/20"
                  : "border-border-neutral hover:border-brand/40"
              }`}
            >
              {/* Claim Top Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-border-neutral/60">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-xs font-bold text-ink-muted bg-surface-subtle px-2 py-0.5 rounded border border-border-neutral">
                    {claim.claim_code}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-ink capitalize">
                    {claim.field_key.replace(/_/g, " ")}
                  </span>
                </div>
                <StatusBadge status={claim.evidence_status} />
              </div>

              {/* Claim Value */}
              <div className="py-3">
                <span className="text-xs text-ink-muted block font-medium mb-1">
                  Observed Value / Statement:
                </span>
                <p className="font-heading text-base sm:text-lg font-bold text-ink">
                  {claim.value_text}
                </p>
              </div>

              {/* Conflict Explanation if applicable */}
              {isConflicting && (
                <div className="mb-3 p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-900 flex items-start gap-2">
                  <GitCompare className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block">Conflicting Data Point Flagged:</span>
                    <span>
                      {claim.verification_note ||
                        "Multiple reputable sources report divergent metrics for this dimension. Divergent values are preserved rather than merged into a single inaccurate figure."}
                    </span>
                  </div>
                </div>
              )}

              {/* Source Provenance Block */}
              <div className="pt-3 border-t border-border-neutral/50 bg-surface-subtle/40 -mx-5 -mb-5 p-4 rounded-b-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <div className="flex items-center gap-1.5 font-semibold text-ink">
                    <FileText className="w-3.5 h-3.5 text-brand" />
                    <span>{claim.source?.title || "Primary Sourced Record"}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-ink-muted mt-1 text-[11px]">
                    {claim.source?.publisher && (
                      <span>Publisher: <strong className="text-ink font-medium">{claim.source.publisher}</strong></span>
                    )}
                    {claim.source?.published_at && (
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-ink-muted" />
                        <span>Published: {claim.source.published_at}</span>
                      </span>
                    )}
                    {claim.checked_at && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-ink-muted" />
                        <span>Audited: {claim.checked_at}</span>
                      </span>
                    )}
                  </div>
                  {claim.verification_note && !isConflicting && (
                    <p className="text-[11px] text-ink-secondary mt-1.5 italic">
                      Audit Note: &ldquo;{claim.verification_note}&rdquo;
                    </p>
                  )}
                </div>

                {claim.source?.url && (
                  <div className="shrink-0 self-start sm:self-center">
                    <a
                      href={claim.source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold text-brand bg-white border border-border-neutral hover:bg-brand-soft hover:border-brand/40 shadow-2xs transition-all"
                    >
                      <span>Open Source</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
