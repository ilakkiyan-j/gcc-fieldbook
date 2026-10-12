"use client";

import React from "react";
import { FileText, ExternalLink, Calendar, Clock, ShieldCheck, CheckCircle2, X } from "lucide-react";
import { EvidenceClaim } from "@/types/domain";
import { StatusBadge } from "@/components/shared/StatusBadge";

interface RetrievedEvidenceDrawerProps {
  citations: EvidenceClaim[];
  highlightedCode?: string | null;
  onClose?: () => void;
}

export function RetrievedEvidenceDrawer({
  citations,
  highlightedCode,
  onClose,
}: RetrievedEvidenceDrawerProps) {
  return (
    <div className="rounded-xl border border-border-neutral bg-white p-5 shadow-2xs space-y-4 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-border-neutral/60">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-brand" />
          <h3 className="font-heading font-bold text-sm sm:text-base text-ink">
            Retrieved Evidence Drawer
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            {citations.length} cited
          </span>
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden p-1 text-ink-muted hover:text-ink rounded"
              aria-label="Close evidence drawer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <p className="text-xs text-ink-secondary">
        Primary corporate filings and benchmark reports supporting the Copilot&apos;s active synthesis. Click any citation pill in the response to inspect it.
      </p>

      {/* Citations List */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1">
        {citations.length === 0 ? (
          <div className="py-8 text-center text-xs text-ink-muted border border-dashed border-border-neutral rounded-lg p-4">
            No specific claim codes cited in this response. Submit a query to inspect retrieved evidence.
          </div>
        ) : (
          citations.map((claim) => {
            const isHighlighted = highlightedCode === claim.claim_code.toUpperCase();

            return (
              <div
                key={claim.id}
                id={`citation-${claim.claim_code.toUpperCase()}`}
                className={`p-3.5 rounded-lg border text-xs transition-all ${
                  isHighlighted
                    ? "border-brand bg-brand-soft/40 ring-2 ring-brand/30 shadow-xs"
                    : "border-border-neutral bg-surface-subtle/50 hover:bg-white"
                }`}
              >
                {/* Code & Badge */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="font-mono text-[11px] font-bold text-brand bg-white px-2 py-0.5 rounded border border-border-neutral">
                    [{claim.claim_code}]
                  </span>
                  <StatusBadge status={claim.evidence_status} />
                </div>

                {/* Claim Statement */}
                <p className="font-semibold text-ink leading-snug">
                  {claim.value_text}
                </p>

                {/* Audit Note */}
                {claim.verification_note && (
                  <p className="text-[11px] text-ink-secondary mt-1.5 italic">
                    Audit: &ldquo;{claim.verification_note}&rdquo;
                  </p>
                )}

                {/* Source Info */}
                <div className="mt-2.5 pt-2 border-t border-border-neutral/60 text-[11px] text-ink-muted flex flex-col gap-1">
                  <div className="font-medium text-ink truncate">
                    {claim.source?.title || "Corporate Publication"}
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span>Publisher: {claim.source?.publisher || "Official"}</span>
                    {claim.source?.url && (
                      <a
                        href={claim.source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-semibold text-brand hover:underline"
                      >
                        <span>Link</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
