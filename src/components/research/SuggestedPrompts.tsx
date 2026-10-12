"use client";

import React from "react";
import { Sparkles } from "lucide-react";

interface SuggestedPromptsProps {
  onSelectPrompt: (prompt: string) => void;
  disabled?: boolean;
}

const PROMPTS = [
  "Which GCCs in Bengaluru operate Quantitative Finance or Avionics labs?",
  "Compare Grade-A office rents between Bengaluru Outer Ring Road and Hyderabad HITEC City.",
  "What fiscal subsidies are provided under the Karnataka GCC Policy 2024-2029?",
  "What conflicting headcount estimates are recorded for Goldman Sachs in India?",
  "What facilities does Boeing operate in Bengaluru?",
];

export function SuggestedPrompts({ onSelectPrompt, disabled }: SuggestedPromptsProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1.5 text-xs text-ink-muted">
        <Sparkles className="w-3.5 h-3.5 text-brand" />
        <span className="font-semibold uppercase tracking-wider text-[11px]">
          Suggested Evidence Queries
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {PROMPTS.map((prompt) => (
          <button
            key={prompt}
            onClick={() => onSelectPrompt(prompt)}
            disabled={disabled}
            className="px-3 py-1.5 rounded-lg text-xs font-medium text-ink-secondary bg-white hover:text-brand hover:border-brand/50 border border-border-neutral shadow-2xs hover:shadow-xs transition-all text-left disabled:opacity-50"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
}
