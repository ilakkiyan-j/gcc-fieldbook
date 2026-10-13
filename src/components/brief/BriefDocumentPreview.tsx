"use client";

import React from "react";
import { FileText, ShieldCheck, Calendar, MapPin, CheckCircle2, GitCompare } from "lucide-react";
import { GeneratedBrief } from "@/lib/brief/generator";

interface BriefDocumentPreviewProps {
  brief: GeneratedBrief;
}

export function BriefDocumentPreview({ brief }: BriefDocumentPreviewProps) {
  // Helper for inline markdown like bold, code, and citation badges
  const renderInlineMarkdown = (text: string) => {
    const parts = text.split(/(\[CLM-[A-Za-z0-9_-]+\]|`[^`]+`|\*\*[^*]+\*\*)/g);

    return parts.map((part, idx) => {
      // Citation pill
      if (/^\[CLM-[A-Za-z0-9_-]+\]$/.test(part)) {
        return (
          <span
            key={idx}
            className="inline-flex items-center px-1.5 py-0.5 mx-0.5 rounded text-[10px] font-mono font-bold bg-brand-soft text-brand-ink border border-brand/30 whitespace-nowrap"
          >
            {part}
          </span>
        );
      }

      // Bold text **...**
      if (part.startsWith("**") && part.endsWith("**") && part.length >= 4) {
        return (
          <strong key={idx} className="font-semibold text-ink">
            {part.slice(2, -2)}
          </strong>
        );
      }

      // Inline code `...`
      if (part.startsWith("`") && part.endsWith("`") && part.length >= 2) {
        return (
          <code
            key={idx}
            className="px-1.5 py-0.5 mx-0.5 rounded font-mono text-[11px] bg-surface-subtle text-brand border border-border-neutral/60 font-medium"
          >
            {part.slice(1, -1)}
          </code>
        );
      }

      return <span key={idx}>{part}</span>;
    });
  };

  // Semantic markdown renderer tailored for the executive brief
  const renderFormattedMarkdown = (markdown: string) => {
    const lines = markdown.split("\n");
    const elements: React.ReactNode[] = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];

      // Table block: lines starting with "|"
      if (line.trim().startsWith("|")) {
        const tableLines: string[] = [];
        while (i < lines.length && lines[i].trim().startsWith("|")) {
          tableLines.push(lines[i].trim());
          i++;
        }

        // Filter out markdown separator line (|---|---|...)
        const dataRows = tableLines.filter((tl) => {
          const stripped = tl.replace(/\|/g, "").replace(/[-:\s]/g, "");
          return !(stripped.length === 0 && tl.includes("-"));
        });

        if (dataRows.length > 0) {
          const headerRow = dataRows[0];
          const bodyRows = dataRows.slice(1);

          const headerCells = headerRow
            .split("|")
            .slice(1, -1)
            .map((c) => c.trim());

          elements.push(
            <div
              key={`table-${i}`}
              className="overflow-x-auto my-5 rounded-lg border border-border-neutral shadow-2xs"
            >
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-surface-subtle text-ink font-bold border-b border-border-neutral">
                  <tr>
                    {headerCells.map((th, hIdx) => (
                      <th
                        key={hIdx}
                        className="py-3 px-4 border-r border-border-neutral/40 last:border-r-0 whitespace-nowrap text-ink font-bold"
                      >
                        {renderInlineMarkdown(th)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-neutral/40 text-ink-secondary bg-white">
                  {bodyRows.map((rowStr, rIdx) => {
                    const rowCells = rowStr
                      .split("|")
                      .slice(1, -1)
                      .map((c) => c.trim());
                    return (
                      <tr
                        key={rIdx}
                        className="hover:bg-surface-subtle/40 transition-colors"
                      >
                        {rowCells.map((td, dIdx) => (
                          <td
                            key={dIdx}
                            className="py-2.5 px-4 border-r border-border-neutral/40 last:border-r-0 leading-relaxed font-normal"
                          >
                            {renderInlineMarkdown(td)}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          );
        }
        continue;
      }

      // H1 Header
      if (line.startsWith("# ")) {
        elements.push(
          <h1
            key={`h1-${i}`}
            className="font-heading text-2xl sm:text-3xl font-extrabold text-ink pb-2 border-b border-border-neutral mt-4 mb-3"
          >
            {line.replace("# ", "")}
          </h1>
        );
        i++;
        continue;
      }

      // H2 Header
      if (line.startsWith("## ")) {
        elements.push(
          <h2
            key={`h2-${i}`}
            className="font-heading text-lg sm:text-xl font-bold text-ink mt-6 mb-2.5 pb-1 border-b border-border-neutral/60 flex items-center gap-2"
          >
            {line.replace("## ", "")}
          </h2>
        );
        i++;
        continue;
      }

      // H3 Header
      if (line.startsWith("### ")) {
        elements.push(
          <h3
            key={`h3-${i}`}
            className="font-heading text-sm sm:text-base font-bold text-ink mt-4 mb-2"
          >
            {line.replace("### ", "")}
          </h3>
        );
        i++;
        continue;
      }

      // Horizontal Rule
      if (line.trim() === "---") {
        elements.push(
          <hr key={`hr-${i}`} className="my-5 border-border-neutral" />
        );
        i++;
        continue;
      }

      // Bullet list items
      if (line.trim().startsWith("- ") || line.trim().startsWith("• ")) {
        const text = line.trim().replace(/^[-•]\s*/, "");
        elements.push(
          <li
            key={`li-${i}`}
            className="ml-5 list-disc text-xs sm:text-sm text-ink-secondary py-1 leading-relaxed"
          >
            {renderInlineMarkdown(text)}
          </li>
        );
        i++;
        continue;
      }

      // Numbered list
      if (/^\d+\.\s/.test(line.trim())) {
        elements.push(
          <div
            key={`num-${i}`}
            className="text-xs sm:text-sm text-ink-secondary py-1 pl-1 leading-relaxed"
          >
            {renderInlineMarkdown(line.trim())}
          </div>
        );
        i++;
        continue;
      }

      // Empty line
      if (!line.trim()) {
        elements.push(<div key={`empty-${i}`} className="h-2" />);
        i++;
        continue;
      }

      // Standard paragraph
      elements.push(
        <p
          key={`p-${i}`}
          className="text-xs sm:text-sm text-ink-secondary leading-relaxed my-1.5"
        >
          {renderInlineMarkdown(line)}
        </p>
      );
      i++;
    }

    return elements;
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
