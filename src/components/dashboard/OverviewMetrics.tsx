import { Building2, MapPin, FileCheck, ShieldCheck } from "lucide-react";
import { OverviewMetrics as OverviewMetricsType } from "@/types/domain";

interface OverviewMetricsProps {
  metrics: OverviewMetricsType;
  verifiedPercent: number;
}

export function OverviewMetrics({ metrics, verifiedPercent }: OverviewMetricsProps) {
  const cards = [
    {
      label: "Tracked GCCs",
      value: metrics.gccCentreCount.toString(),
      description: "Active enterprise facilities",
      context: "Across Tier-1 hubs",
      icon: Building2,
      badge: "Sourced",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    {
      label: "Metro Hubs",
      value: metrics.cityCount.toString(),
      description: "Primary tech corridors",
      context: "Bengaluru, Hyderabad",
      icon: MapPin,
      badge: "Deep Data",
      badgeColor: "bg-sky-50 text-sky-700 border-sky-200",
    },
    {
      label: "Evidence Claims",
      value: `${metrics.claimCount}+`,
      description: "Source-linked data points",
      context: "Headcount, rents, setups",
      icon: FileCheck,
      badge: "Traceable",
      badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
    },
    {
      label: "Primary Verification",
      value: `${verifiedPercent}%`,
      description: "Filed or officially released",
      context: "Zero fabricated claims",
      icon: ShieldCheck,
      badge: "Audited",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const IconComponent = card.icon;
        return (
          <div
            key={card.label}
            className="rounded-xl border border-border-neutral bg-white p-5 shadow-2xs hover:shadow-xs transition-shadow"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-wider text-ink-muted">
                {card.label}
              </span>
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold border ${card.badgeColor}`}
              >
                {card.badge}
              </span>
            </div>

            <div className="mt-3 flex items-baseline justify-between">
              <span className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight text-ink font-mono tabular-nums">
                {card.value}
              </span>
              <div className="p-2 rounded-lg bg-surface-subtle text-ink-secondary">
                <IconComponent className="w-5 h-5 text-brand" />
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-border-neutral/60 flex items-center justify-between text-xs">
              <span className="text-ink-secondary truncate">{card.description}</span>
              <span className="text-ink-muted text-[11px] font-medium shrink-0 ml-2">
                {card.context}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
