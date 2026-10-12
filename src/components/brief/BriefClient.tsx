"use client";

import React, { useState, useMemo } from "react";
import { FileText, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import { GccCentre, Policy } from "@/types/domain";
import { generateDecisionBrief, BriefConfig, GeneratedBrief } from "@/lib/brief/generator";
import { BriefConfigPanel } from "@/components/brief/BriefConfigPanel";
import { BriefExportToolbar } from "@/components/brief/BriefExportToolbar";
import { BriefDocumentPreview } from "@/components/brief/BriefDocumentPreview";

interface BriefClientProps {
  initialCentres: GccCentre[];
  policies: Policy[];
}

export function BriefClient({ initialCentres, policies }: BriefClientProps) {
  const [config, setConfig] = useState<BriefConfig>({
    objective: "ai-expansion",
    selectedHubs: ["bengaluru", "hyderabad"],
    selectedCapabilities: ["Quantitative Finance", "Avionics Engineering"],
  });

  const [isLoading, setIsLoading] = useState(false);

  // Generate brief dynamically from config and repository data
  const brief = useMemo(() => {
    return generateDecisionBrief(config, initialCentres, policies);
  }, [config, initialCentres, policies]);

  const handleRegenerate = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 250);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b border-border-neutral/60 print:hidden">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-brand-soft text-brand-ink border border-brand/20 mb-2">
            <FileText className="w-3.5 h-3.5 text-brand" />
            <span>Executive Diligence Deliverable &bull; Export Ready</span>
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-ink">
            Executive GCC Decision Brief Generator
          </h1>
          <p className="text-xs sm:text-sm text-ink-secondary mt-1.5 max-w-3xl leading-relaxed">
            Synthesize strategic objectives, corridor selections, and primary citations into an audit-ready executive intelligence memo. Export to Markdown, copy to clipboard, or print to PDF.
          </p>
        </div>
      </div>

      {/* Export Toolbar */}
      <BriefExportToolbar markdown={brief.markdown} title={brief.title} />

      {/* 2-Column Analyst Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Configuration Controls (hidden when printing) */}
        <div className="lg:col-span-4 print:hidden">
          <BriefConfigPanel
            config={config}
            onChangeConfig={setConfig}
            onRegenerate={handleRegenerate}
            isLoading={isLoading}
          />
        </div>

        {/* Right: Rendered Document Canvas */}
        <div className="lg:col-span-8">
          <BriefDocumentPreview brief={brief} />
        </div>
      </div>
    </div>
  );
}
