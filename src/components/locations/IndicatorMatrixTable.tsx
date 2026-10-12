import React from "react";
import Link from "next/link";
import { ExternalLink, Info, Building2, MapPin, CheckCircle2 } from "lucide-react";
import { City } from "@/types/domain";

interface IndicatorRow {
  key: string;
  label: string;
  unit: string;
  period: string;
  values: Record<
    string,
    {
      value: string;
      numeric?: number | null;
      comparability?: string | null;
    }
  >;
  sourceTitle?: string;
  sourceUrl?: string;
}

interface IndicatorMatrixTableProps {
  cities: City[];
  indicators: IndicatorRow[];
}

export function IndicatorMatrixTable({ cities, indicators }: IndicatorMatrixTableProps) {
  return (
    <div className="rounded-xl border border-border-neutral bg-white overflow-hidden shadow-2xs space-y-0">
      <div className="p-4 sm:p-5 border-b border-border-neutral bg-surface-subtle/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="font-heading font-bold text-base sm:text-lg text-ink flex items-center gap-2">
            <span>Like-for-Like Metric Benchmark Matrix</span>
            <span className="text-[11px] font-sans font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              ADR-007 Strict Comparability
            </span>
          </h3>
          <p className="text-xs text-ink-secondary mt-0.5">
            Indicators are benchmarked side-by-side only when units, periods, and geographic micro-markets are verifiable.
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-border-neutral bg-surface-subtle/80 text-[11px] font-semibold uppercase tracking-wider text-ink-muted select-none">
              <th className="py-3.5 px-4 sm:px-6 min-w-[220px]">Indicator Dimension</th>
              <th className="py-3.5 px-4 min-w-[130px]">Unit & Period</th>
              {cities.map((city) => (
                <th key={city.slug} className="py-3.5 px-4 min-w-[180px]">
                  <div className="flex items-center justify-between">
                    <span>{city.name}</span>
                    <Link
                      href={`/gccs?city=${city.slug}`}
                      className="text-[10px] font-normal lowercase tracking-normal text-brand hover:underline"
                    >
                      view centres &rarr;
                    </Link>
                  </div>
                </th>
              ))}
              <th className="py-3.5 px-4 sm:px-6 min-w-[200px]">Audit Source Reference</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-neutral/60">
            {indicators.map((ind) => (
              <tr key={ind.key} className="hover:bg-surface-subtle/40 transition-colors">
                {/* Dimension & Definition */}
                <td className="py-4 px-4 sm:px-6">
                  <div className="font-heading font-bold text-ink text-xs sm:text-sm">
                    {ind.label}
                  </div>
                  <span className="text-[11px] font-mono text-ink-muted">
                    ID: {ind.key}
                  </span>
                </td>

                {/* Unit & Observation Period */}
                <td className="py-4 px-4 whitespace-nowrap">
                  <div className="font-medium text-ink text-xs">{ind.unit}</div>
                  <div className="text-[11px] font-mono text-ink-muted mt-0.5">
                    Period: {ind.period}
                  </div>
                </td>

                {/* City Values */}
                {cities.map((city) => {
                  const item = ind.values[city.slug];
                  return (
                    <td key={city.slug} className="py-4 px-4">
                      <div className="font-heading font-extrabold text-ink text-sm sm:text-base font-mono tabular-nums">
                        {item ? item.value : "Insufficient data"}
                      </div>
                      {item?.comparability && (
                        <p className="text-[11px] text-ink-secondary mt-1 leading-snug">
                          {item.comparability}
                        </p>
                      )}
                    </td>
                  );
                })}

                {/* Source Provenance */}
                <td className="py-4 px-4 sm:px-6">
                  <div className="text-xs font-semibold text-ink">
                    {ind.sourceTitle || "Audited Benchmark Report"}
                  </div>
                  {ind.sourceUrl && (
                    <a
                      href={ind.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand hover:text-brand-hover hover:underline mt-1"
                    >
                      <span>Inspect Source</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
