import React from "react";
import Link from "next/link";
import { ArrowRight, MapPin, Building, ExternalLink, Calendar, Users } from "lucide-react";
import { GccCentre } from "@/types/domain";
import { StatusBadge } from "@/components/shared/StatusBadge";

interface GccTableProps {
  centres: GccCentre[];
}

export function GccTable({ centres }: GccTableProps) {
  return (
    <div className="rounded-xl border border-border-neutral bg-white overflow-hidden shadow-2xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-border-neutral bg-surface-subtle/80 text-[11px] font-semibold uppercase tracking-wider text-ink-muted select-none">
              <th className="py-3.5 px-4 sm:px-6">Centre & Parent Entity</th>
              <th className="py-3.5 px-4">Metro Hub</th>
              <th className="py-3.5 px-4 hidden md:table-cell">Core Capabilities</th>
              <th className="py-3.5 px-4 text-right">Headcount (Sourced)</th>
              <th className="py-3.5 px-4 hidden lg:table-cell text-center">Est.</th>
              <th className="py-3.5 px-4 text-center">Evidence Status</th>
              <th className="py-3.5 px-4 sm:px-6 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-neutral/60">
            {centres.map((centre) => {
              const hasConflict = centre.claims?.some((c) => c.evidence_status === "conflicting");
              const hasEstimate = centre.claims?.some((c) => c.evidence_status === "estimated");
              const status = hasConflict ? "conflicting" : hasEstimate ? "estimated" : "verified";
              const detailHref = `/gccs/${centre.slug || centre.id}`;

              return (
                <tr
                  key={centre.id}
                  className="hover:bg-surface-subtle/50 transition-colors group"
                >
                  {/* Centre Name & Legal Parent */}
                  <td className="py-4 px-4 sm:px-6">
                    <div className="flex flex-col">
                      <Link
                        href={detailHref}
                        className="font-heading font-bold text-ink group-hover:text-brand transition-colors text-xs sm:text-sm"
                      >
                        {centre.display_name}
                      </Link>
                      <div className="flex items-center gap-1.5 mt-0.5 text-[11px] text-ink-secondary">
                        <Building className="w-3 h-3 text-ink-muted shrink-0" />
                        <span className="font-medium text-brand">
                          {centre.company?.name || "Corporate Parent"}
                        </span>
                        <span className="text-border-strong">&bull;</span>
                        <span className="truncate max-w-[140px] sm:max-w-none text-ink-muted">
                          {centre.sector}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Metro Hub */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-surface-subtle text-ink font-medium text-xs border border-border-neutral/70">
                      <MapPin className="w-3 h-3 text-ink-muted" />
                      <span>{centre.city?.name}</span>
                      <span className="text-[10px] text-ink-muted font-normal">
                        ({centre.city?.state_or_region === "Karnataka" ? "KA" : "TG"})
                      </span>
                    </div>
                  </td>

                  {/* Core Capabilities */}
                  <td className="py-4 px-4 hidden md:table-cell">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {centre.functions.slice(0, 2).map((func) => (
                        <span
                          key={func}
                          className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-surface-subtle text-ink-secondary border border-border-neutral/60"
                        >
                          {func}
                        </span>
                      ))}
                      {centre.functions.length > 2 && (
                        <span className="px-1 py-0.5 rounded text-[10px] text-ink-muted">
                          +{centre.functions.length - 2}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Headcount */}
                  <td className="py-4 px-4 text-right whitespace-nowrap">
                    <div className="font-mono font-semibold text-ink text-xs sm:text-sm tabular-nums">
                      {centre.headcount_min?.toLocaleString()}
                      {centre.headcount_max ? ` – ${centre.headcount_max.toLocaleString()}` : ""}+
                    </div>
                    <span className="text-[10px] text-ink-muted">staff range</span>
                  </td>

                  {/* Setup Year */}
                  <td className="py-4 px-4 hidden lg:table-cell text-center whitespace-nowrap">
                    <span className="font-mono text-xs text-ink-secondary font-medium">
                      {centre.setup_year || "—"}
                    </span>
                  </td>

                  {/* Evidence Status Badge */}
                  <td className="py-4 px-4 text-center whitespace-nowrap">
                    <StatusBadge status={status} />
                  </td>

                  {/* Action Link */}
                  <td className="py-4 px-4 sm:px-6 text-right whitespace-nowrap">
                    <Link
                      href={detailHref}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-md text-xs font-semibold text-brand hover:text-white hover:bg-brand border border-brand/30 transition-all shadow-2xs"
                    >
                      <span>Evidence</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
