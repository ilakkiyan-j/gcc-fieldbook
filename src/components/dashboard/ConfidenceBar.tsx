import { CheckCircle2, Clock, AlertTriangle, HelpCircle, Info } from "lucide-react";

interface ConfidenceBarProps {
  stats: {
    total: number;
    verified: number;
    estimated: number;
    conflicting: number;
    unknown: number;
    verifiedPercent: number;
    estimatedPercent: number;
    conflictingPercent: number;
    unknownPercent: number;
  };
}

export function ConfidenceBar({ stats }: ConfidenceBarProps) {
  return (
    <div className="rounded-xl border border-border-neutral bg-white p-5 sm:p-6 shadow-2xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <h3 className="font-heading font-bold text-base sm:text-lg text-ink flex items-center gap-2">
            <span>Evidence Confidence Distribution</span>
            <span className="text-xs font-normal font-sans text-ink-muted">
              ({stats.total} total claims evaluated)
            </span>
          </h3>
          <p className="text-xs text-ink-secondary mt-0.5">
            Transparent breakdown of factual reliability across headcount, campus footprint, and rent indicators.
          </p>
        </div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-subtle border border-border-neutral text-[11px] font-medium text-ink-secondary self-start sm:self-auto">
          <Info className="w-3.5 h-3.5 text-brand" />
          <span>Strict Citation Gate</span>
        </div>
      </div>

      {/* Segmented Distribution Bar */}
      <div className="h-4 w-full rounded-full bg-slate-100 flex overflow-hidden border border-border-neutral/60 shadow-inner">
        {stats.verifiedPercent > 0 && (
          <div
            style={{ width: `${stats.verifiedPercent}%` }}
            className="bg-emerald-600 transition-all duration-500 hover:brightness-110"
            title={`Verified: ${stats.verified} claims (${stats.verifiedPercent}%)`}
          />
        )}
        {stats.estimatedPercent > 0 && (
          <div
            style={{ width: `${stats.estimatedPercent}%` }}
            className="bg-amber-500 transition-all duration-500 hover:brightness-110"
            title={`Estimated: ${stats.estimated} claims (${stats.estimatedPercent}%)`}
          />
        )}
        {stats.conflictingPercent > 0 && (
          <div
            style={{ width: `${stats.conflictingPercent}%` }}
            className="bg-rose-500 transition-all duration-500 hover:brightness-110"
            title={`Conflicting: ${stats.conflicting} claims (${stats.conflictingPercent}%)`}
          />
        )}
        {stats.unknownPercent > 0 && (
          <div
            style={{ width: `${stats.unknownPercent}%` }}
            className="bg-slate-400 transition-all duration-500 hover:brightness-110"
            title={`Unknown: ${stats.unknown} claims (${stats.unknownPercent}%)`}
          />
        )}
      </div>

      {/* Legend & Count Badges */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-border-neutral/50">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-600 shrink-0" />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-ink">Verified</span>
              <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-1 rounded font-medium">
                {stats.verifiedPercent}%
              </span>
            </div>
            <span className="text-[11px] text-ink-muted">{stats.verified} claims &bull; Primary filings</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-ink">Estimated</span>
              <span className="text-[11px] font-mono text-amber-800 bg-amber-50 px-1 rounded font-medium">
                {stats.estimatedPercent}%
              </span>
            </div>
            <span className="text-[11px] text-ink-muted">{stats.estimated} claims &bull; Industry surveys</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0" />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-ink">Conflicting</span>
              <span className="text-[11px] font-mono text-rose-800 bg-rose-50 px-1 rounded font-medium">
                {stats.conflictingPercent}%
              </span>
            </div>
            <span className="text-[11px] text-ink-muted">{stats.conflicting} claims &bull; Divergent figures</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-400 shrink-0" />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-ink">Unknown</span>
              <span className="text-[11px] font-mono text-slate-700 bg-slate-100 px-1 rounded font-medium">
                {stats.unknownPercent}%
              </span>
            </div>
            <span className="text-[11px] text-ink-muted">{stats.unknown} claims &bull; Explicit gap</span>
          </div>
        </div>
      </div>
    </div>
  );
}
