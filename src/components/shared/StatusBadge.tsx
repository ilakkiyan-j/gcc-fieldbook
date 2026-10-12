import { cn } from "@/lib/utils";
import { EvidenceStatus } from "@/types/domain";
import {
  CheckCircle2,
  AlertCircle,
  GitCompare,
  HelpCircle,
  CheckCheck,
  Clock,
  ShieldAlert,
} from "lucide-react";

interface StatusBadgeProps {
  status: EvidenceStatus;
  className?: string;
  showIcon?: boolean;
}

export function StatusBadge({ status, className, showIcon = true }: StatusBadgeProps) {
  const config: Record<
    EvidenceStatus,
    { label: string; bg: string; text: string; border: string; icon: React.ComponentType<{ className?: string }> }
  > = {
    verified: {
      label: "Verified",
      bg: "bg-emerald-50",
      text: "text-emerald-800",
      border: "border-emerald-300",
      icon: CheckCircle2,
    },
    corroborated: {
      label: "Corroborated",
      bg: "bg-teal-50",
      text: "text-teal-800",
      border: "border-teal-300",
      icon: CheckCheck,
    },
    estimated: {
      label: "Estimate",
      bg: "bg-amber-50",
      text: "text-amber-800",
      border: "border-amber-300",
      icon: AlertCircle,
    },
    conflicting: {
      label: "Conflicting",
      bg: "bg-rose-50",
      text: "text-rose-800",
      border: "border-rose-300",
      icon: GitCompare,
    },
    unknown: {
      label: "Unknown",
      bg: "bg-slate-100",
      text: "text-slate-700",
      border: "border-slate-300",
      icon: HelpCircle,
    },
    single_source: {
      label: "Single Source",
      bg: "bg-blue-50",
      text: "text-blue-800",
      border: "border-blue-300",
      icon: ShieldAlert,
    },
    self_reported: {
      label: "Self-Reported",
      bg: "bg-purple-50",
      text: "text-purple-800",
      border: "border-purple-300",
      icon: AlertCircle,
    },
    stale: {
      label: "Stale",
      bg: "bg-orange-50",
      text: "text-orange-800",
      border: "border-orange-300",
      icon: Clock,
    },
    candidate: {
      label: "Candidate",
      bg: "bg-slate-50",
      text: "text-slate-600",
      border: "border-slate-200",
      icon: HelpCircle,
    },
  };

  const item = config[status] || config.unknown;
  const IconComponent = item.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium border shadow-xs transition-colors",
        item.bg,
        item.text,
        item.border,
        className
      )}
      title={`Evidence Status: ${item.label}`}
    >
      {showIcon && <IconComponent className="w-3 h-3 flex-shrink-0" />}
      <span>{item.label}</span>
    </span>
  );
}
