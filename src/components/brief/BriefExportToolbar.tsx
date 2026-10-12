"use client";

import React, { useState } from "react";
import { Copy, Download, Printer, Check, FileText } from "lucide-react";

interface BriefExportToolbarProps {
  markdown: string;
  title: string;
}

export function BriefExportToolbar({ markdown, title }: BriefExportToolbarProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleDownload = () => {
    const filename = `GCC_Fieldbook_Decision_Brief_${new Date().toISOString().split("T")[0]}.md`;
    const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 sm:p-4 rounded-xl border border-border-neutral bg-white shadow-2xs print:hidden">
      <div className="flex items-center gap-2">
        <FileText className="w-4 h-4 text-brand" />
        <span className="text-xs font-semibold text-ink">
          Executive Export Center
        </span>
        <span className="text-border-strong hidden sm:inline">&bull;</span>
        <span className="text-xs text-ink-muted hidden sm:inline">
          Markdown, Clipboard, or PDF
        </span>
      </div>

      <div className="flex items-center gap-2">
        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border-neutral bg-surface-subtle hover:bg-white text-xs font-semibold text-ink transition-colors shadow-2xs"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-700">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-ink-muted" />
              <span>Copy Markdown</span>
            </>
          )}
        </button>

        {/* Download Button */}
        <button
          onClick={handleDownload}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand text-white hover:bg-brand-hover text-xs font-semibold transition-colors shadow-2xs"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Download .md</span>
        </button>

        {/* Print Button */}
        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border-neutral hover:bg-surface-subtle text-xs font-semibold text-ink-secondary transition-colors"
          title="Print or Save as PDF"
        >
          <Printer className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Print / PDF</span>
        </button>
      </div>
    </div>
  );
}
