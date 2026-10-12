import React from "react";
import { SearchX, RotateCcw } from "lucide-react";

interface GccEmptyStateProps {
  query?: string;
  city?: string;
  sector?: string;
  status?: string;
  onReset: () => void;
}

export function GccEmptyState({
  query,
  city,
  sector,
  status,
  onReset,
}: GccEmptyStateProps) {
  return (
    <div className="rounded-xl border border-dashed border-border-neutral bg-white p-8 sm:p-12 text-center flex flex-col items-center justify-center">
      <div className="p-3 rounded-full bg-surface-subtle text-ink-muted mb-4">
        <SearchX className="w-8 h-8 text-ink-secondary" />
      </div>

      <h3 className="font-heading font-bold text-lg text-ink">
        No Matching Capability Centres Found
      </h3>

      <p className="text-xs sm:text-sm text-ink-secondary mt-1.5 max-w-md leading-relaxed">
        No records in our curated assessment sample matched your search criteria.
        {query && (
          <span className="block mt-1">
            Query: <strong className="text-ink font-semibold">&ldquo;{query}&rdquo;</strong>
          </span>
        )}
      </p>

      {/* Active filters pill display */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 mt-3 text-xs">
        {city && city !== "all" && (
          <span className="px-2 py-0.5 rounded bg-surface-subtle text-ink-muted border border-border-neutral">
            City: {city}
          </span>
        )}
        {sector && sector !== "all" && (
          <span className="px-2 py-0.5 rounded bg-surface-subtle text-ink-muted border border-border-neutral">
            Sector: {sector}
          </span>
        )}
        {status && status !== "all" && (
          <span className="px-2 py-0.5 rounded bg-surface-subtle text-ink-muted border border-border-neutral">
            Status: {status}
          </span>
        )}
      </div>

      <div className="mt-6">
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand text-white text-xs font-semibold hover:bg-brand-hover transition-colors shadow-2xs"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All Filters</span>
        </button>
      </div>
    </div>
  );
}
