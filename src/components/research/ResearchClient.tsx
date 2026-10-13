"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, ShieldCheck, CheckCircle2, FileText, ArrowRight, Info } from "lucide-react";
import { EvidenceClaim } from "@/types/domain";
import { ResearchChat } from "@/components/research/ResearchChat";
import { RetrievedEvidenceDrawer } from "@/components/research/RetrievedEvidenceDrawer";
import { HelpTooltip } from "@/components/shared/HelpTooltip";

export function ResearchClient() {
  const [activeCitations, setActiveCitations] = useState<EvidenceClaim[]>([]);
  const [highlightedCode, setHighlightedCode] = useState<string | null>(null);

  const handleCitationsUpdated = (citations: EvidenceClaim[]) => {
    setActiveCitations(citations);
  };

  const handleCitationClicked = (code: string) => {
    setHighlightedCode(code.toUpperCase());
    // Auto-scroll to citation card in drawer
    const el = document.getElementById(`citation-${code.toUpperCase()}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b border-border-neutral/60">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Zero-Hallucination Grounding</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-sky-50 text-sky-800 border border-sky-200">
              <span>Server-Validated Citations (ADR-008)</span>
            </span>
          </div>

          <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-ink flex items-center flex-wrap">
            <span>Evidence-Bound AI Research Copilot</span>
            <HelpTooltip content="Ask research questions strictly grounded in primary corporate filings and gazettes. Every factual assertion is tagged with auditable citation codes." />
          </h1>
          <p className="text-xs sm:text-sm text-ink-secondary mt-1.5 max-w-3xl leading-relaxed">
            Interrogate verified corporate filings, facility scales, real estate tariffs, and state policy gazettes. Every statement is strictly cross-referenced against primary citations.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/brief"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand text-white text-xs font-semibold hover:bg-brand-hover transition-colors shadow-2xs"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Generate Decision Brief</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* 2-Column Analyst Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Chat Conversation Column */}
        <div className="lg:col-span-7 xl:col-span-8">
          <ResearchChat
            onCitationsUpdated={handleCitationsUpdated}
            onCitationClicked={handleCitationClicked}
          />
        </div>

        {/* Retrieved Evidence Inspection Drawer */}
        <div className="lg:col-span-5 xl:col-span-4 h-[650px]">
          <RetrievedEvidenceDrawer
            citations={activeCitations}
            highlightedCode={highlightedCode}
          />
        </div>
      </div>

      {/* Grounding & Integrity Callout */}
      <div className="rounded-xl border border-border-neutral bg-surface-subtle/70 p-5 text-xs text-ink-secondary space-y-2 shadow-2xs">
        <div className="flex items-center gap-2 text-ink font-semibold text-sm">
          <Info className="w-4 h-4 text-brand" />
          <span>RAG Pipeline Architecture & Citation Contract (AI_COPILOT.md)</span>
        </div>
        <p className="leading-relaxed">
          The Copilot pipeline never submits ungrounded queries to language models. Prior to synthesis, relevant database records and primary source citations are retrieved server-side. The model is constrained to cite specific claim codes (<code className="font-mono text-brand">[CLM-XX-YY]</code>), and the server strips any fabricated codes before returning the response. If the Gemini API is unconfigured or unavailable, an offline deterministic synthesizer executes automatically.
        </p>
      </div>
    </div>
  );
}
