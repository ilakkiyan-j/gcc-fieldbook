import { cn } from "@/lib/utils";

export type EvidenceStatus = "verified" | "estimated" | "conflicting" | "unknown" | "unverified";

interface StatusBadgeProps {
  status: EvidenceStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const styles: Record<EvidenceStatus, string> = {
    verified: "bg-emerald-50 text-emerald-700 border-emerald-200",
    estimated: "bg-amber-50 text-amber-700 border-amber-200",
    conflicting: "bg-rose-50 text-rose-700 border-rose-200",
    unknown: "bg-slate-100 text-slate-600 border-slate-200",
    unverified: "bg-slate-50 text-slate-500 border-slate-200",
  };

  const labels: Record<EvidenceStatus, string> = {
    verified: "Verified Evidence",
    estimated: "Market Estimate",
    conflicting: "Conflicting Sources",
    unknown: "Unknown / Missing",
    unverified: "Needs Review",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border",
        styles[status],
        className
      )}
    >
      {labels[status]}
    </span>
  );
}
