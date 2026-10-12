"use client";

import React from "react";
import { Sliders, RefreshCw, MapPin, Target, Sparkles } from "lucide-react";
import { BriefConfig } from "@/lib/brief/generator";

interface BriefConfigPanelProps {
  config: BriefConfig;
  onChangeConfig: (config: BriefConfig) => void;
  onRegenerate: () => void;
  isLoading?: boolean;
}

export function BriefConfigPanel({
  config,
  onChangeConfig,
  onRegenerate,
  isLoading,
}: BriefConfigPanelProps) {
  const handleObjectiveChange = (obj: string) => {
    onChangeConfig({ ...config, objective: obj });
  };

  const handleToggleHub = (hub: string) => {
    let nextHubs: string[];
    if (config.selectedHubs.includes(hub)) {
      if (config.selectedHubs.length <= 1) return; // Keep at least 1
      nextHubs = config.selectedHubs.filter((h) => h !== hub);
    } else {
      nextHubs = [...config.selectedHubs, hub];
    }
    onChangeConfig({ ...config, selectedHubs: nextHubs });
  };

  return (
    <div className="rounded-xl border border-border-neutral bg-white p-5 shadow-2xs space-y-5">
      <div className="flex items-center gap-2 pb-3 border-b border-border-neutral/60">
        <Sliders className="w-4 h-4 text-brand" />
        <h3 className="font-heading font-bold text-sm sm:text-base text-ink">
          Briefing Parameters
        </h3>
      </div>

      {/* Strategic Objective Selector */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold uppercase tracking-wider text-ink-muted flex items-center gap-1.5">
          <Target className="w-3.5 h-3.5 text-brand" />
          <span>Strategic Objective</span>
        </label>
        <select
          value={config.objective}
          onChange={(e) => handleObjectiveChange(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-border-neutral bg-surface-subtle text-xs font-semibold text-ink focus:outline-hidden focus:ring-2 focus:ring-brand cursor-pointer"
        >
          <option value="ai-expansion">AI & Quantitative Hub Expansion</option>
          <option value="lease-optimization">Real Estate & Lease Optimization</option>
          <option value="policy-evaluation">State Policy & Subsidy Evaluation</option>
        </select>
      </div>

      {/* Target Hubs Toggle */}
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-ink-muted flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-brand" />
          <span>Target Metro Hubs</span>
        </label>
        <div className="space-y-1.5">
          {[
            { slug: "bengaluru", label: "Bengaluru (Karnataka)", desc: "ORR / Whitefield IT Parks" },
            { slug: "hyderabad", label: "Hyderabad (Telangana)", desc: "HITEC City / Financial Dist." },
          ].map((hub) => {
            const isChecked = config.selectedHubs.includes(hub.slug);
            return (
              <label
                key={hub.slug}
                className={`flex items-start gap-2.5 p-2.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                  isChecked
                    ? "bg-brand-soft/50 border-brand/40 text-ink"
                    : "bg-surface-subtle/50 border-border-neutral text-ink-secondary"
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleToggleHub(hub.slug)}
                  className="mt-0.5 rounded text-brand focus:ring-brand cursor-pointer"
                />
                <div>
                  <span className="font-semibold block">{hub.label}</span>
                  <span className="text-[11px] text-ink-muted">{hub.desc}</span>
                </div>
              </label>
            );
          })}
        </div>
      </div>

      {/* Capability Focus */}
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-ink-muted flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-brand" />
          <span>Functional Capabilities</span>
        </label>
        <div className="flex flex-wrap gap-1.5">
          {["Quantitative Finance", "Avionics Engineering", "Retail Supply Chain", "Cybersecurity"].map(
            (cap) => (
              <span
                key={cap}
                className="px-2 py-0.5 rounded text-[11px] font-medium bg-surface-subtle border border-border-neutral text-ink"
              >
                {cap}
              </span>
            )
          )}
        </div>
      </div>

      {/* Regenerate CTA */}
      <div className="pt-2">
        <button
          onClick={onRegenerate}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-brand text-white text-xs font-semibold hover:bg-brand-hover disabled:opacity-50 transition-colors shadow-2xs"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
          <span>Regenerate Brief</span>
        </button>
      </div>
    </div>
  );
}
