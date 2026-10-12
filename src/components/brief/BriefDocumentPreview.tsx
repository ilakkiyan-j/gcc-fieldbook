"use client";

import React from "react";
import { FileText, ShieldCheck, Calendar, MapPin, CheckCircle2, GitCompare } from "lucide-react";
import { GeneratedBrief } from "@/lib/brief/generator";

interface BriefDocumentPreviewProps {
  brief: GeneratedBrief;
}

export function BriefDocumentPreview({ brief }: BriefDocumentPreviewProps) {
  // Simple markdown renderer tailored for the brief sections
  const renderFormattedMarkdown = (markdown: string) => {
    // Split into lines/paragraphs
    const lines = markdown.split("\n");

    return lines.map((line, idx) => {
      // H1 Header
      if (line.startsWith("# ")) {
        return (
          <h1
            key={idx}
            className="font-heading text-2xl sm:text-3xl font-extrabold text-ink pb-2 border-b border-border-neutral mt-4 mb-3"
          >
            {line.replace("# ", "")}
          </h1>
        );
      }
      // H2 Header
      if (line.startsWith("## ")) {
        return (
          <h2
            key={idx}
            className="font-heading text-lg sm:text-xl font-bold text-ink mt-6 mb-2.5 pb-1 border-b border-border-neutral/60 flex items-center gap-2"
          >
            {line.replace("## ", "")}
          </h2>
        );
      }
      // H3 Header
      if (line.startsWith("### ")) {
        return (
          <h3
            key={idx}
            className="font-heading text-sm sm:text-base font-bold text-ink mt-4 mb-2"
          >
            {line.replace("### ", "")}
          </h3>
        );
      }
      // Horizontal Rule
      if (line.trim() === "---") {
        return <hr key={idx} className="my-5 border-border-neutral" />;
      }
      // Table Row
      if (line.startsWith("|")) {
        // Simple detection of table header separator
        if (line.includes("---")) return null;
        const cells = line.split("|").slice(1, -1);
        const isHeader = idx > 0 && lines[idx + 1]?.includes("---");

        return (
          <div
            key={idx}
            className={`grid grid-cols-${cells.length} text-xs py-2 px-3 ${
              isHeader
                ? "bg-surface-subtle font-semibold text-ink border-b border-border-neutral"
                : "border-b border-border-neutral/40 hover:bg-surface-subtle/30"
            }`}
            style={{ display: "flex", gap: "1rem" }}
          >
            {cells.map((cell, cIdx) => (
              <div key={cIdx} className="flex-1 overflow-hidden truncate">
                {cell.trim()}
              </div>
            ))}
          </div>
        );
      }
      // Bullet point
      if (line.startsWith("- ") || line.startsWith("• ")) {
        const text = line.replace(/^[-•]\s*/, "");
        return (
          <li key={idx} className="ml-4 list-disc text-xs sm:text-sm text-ink-secondary py-0.5">
            {renderInlineMarkdown(text)}
          </li>
        );
      }
      // Numbered list
      if (/^\d+\.\s/.test(line)) {
        return (
          <div key={idx} className="text-xs sm:text-sm text-ink-secondary py-1 pl-1">
            {renderInlineMarkdown(line)}
          </div>
        );
      }
      // Empty line
      if (!line.trim()) {
        return <div key={idx} className="h-2" />;
      }
      // Standard paragraph
      return (
        <p key={idx} className="text-xs sm:text-sm text-ink-secondary leading-relaxed my-1">
          {renderInlineMarkdown(line)}
        </p>
      );
    });
  };

  // Helper for inline markdown like bold and citation badges
  const renderInlineMarkdown = (text: string) => {
    // Handle citations [CLM-...]
    const parts = text.split(/(\[CLM-[A-Za-z0-9_-]+\])/g);

    return parts.map((part, idx) => {
      if (/^\[CLM-[A-Za-z0-9_-]+\]$/.test(part)) {
        return (
          <span
            key={idx}
            className="inline-flex items-center px-1.5 py-0.5 mx-0.5 rounded text-[10px] font-mono font-bold bg-brand-soft text-brand-ink border border-brand/30"
          >
            {part}
          </span>
        );
      }
      // Bold text **bold**
      if (part.includes("**")) {
        const subParts = part.split(/(\*\*[^*]+\*\*)/g);
        return subParts.map((sp, spIdx) => {
          if (sp.startsWith("**") && sp.endsWith("**")) {
            return (
              <strong key={spIdx} className="font-semibold text-ink">
                {sp.slice(2, -2)}
              </strong>
            );
          }
          return <span key={spIdx}>{sp}</span>;
        });
      }
      return <span key={idx}>{part}</span>;
    });
  };

  return (
    <div className="rounded-xl border border-border-neutral bg-white p-6 sm:p-10 shadow-sm print:border-none print:shadow-none print:p-0">
      {/* Document Watermark & Metadata Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border-neutral text-xs text-ink-muted">
        <div className="flex items-center gap-2">
          <span className="font-heading font-extrabold text-brand tracking-wider uppercase text-[11px]">
            GCC FIELDBOOK
          </span>
          <span>&bull;</span>
          <span>Executive Intelligence Memo</span>
        </div>
        <div className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Curated Assessment Sample (ADR-005)</span>
        </div>
      </div>

      {/* Rendered Document Body */}
      <div className="prose prose-sm max-w-none text-ink pt-2">
        {renderFormattedMarkdown(brief.markdown)}
      </div>
    </div>
  );
}
