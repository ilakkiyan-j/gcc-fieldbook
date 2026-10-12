"use client";

import React from "react";
import { Search, X } from "lucide-react";

interface GccSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  placeholder?: string;
}

export function GccSearchBar({
  value,
  onChange,
  onClear,
  placeholder = "Search by company name, facility, or functional capability (e.g. Avionics, Payments)...",
}: GccSearchBarProps) {
  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-ink-muted">
        <Search className="w-4 h-4" />
      </div>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-20 py-2.5 rounded-lg border border-border-neutral bg-white text-xs sm:text-sm text-ink placeholder:text-ink-muted focus:outline-hidden focus:ring-2 focus:ring-brand focus:border-brand shadow-2xs transition-all"
        aria-label="Search capability centres"
      />

      <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center gap-1.5">
        {value && (
          <button
            onClick={onClear}
            className="p-1 rounded-md text-ink-muted hover:text-ink hover:bg-surface-subtle transition-colors"
            title="Clear search"
            aria-label="Clear search input"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
        <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono font-medium text-ink-muted bg-surface-subtle border border-border-neutral rounded shadow-2xs">
          ⌘K
        </kbd>
      </div>
    </div>
  );
}
