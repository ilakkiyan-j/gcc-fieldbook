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
    <div className="rounded-xl border border-border-neutral bg-white p-4 sm:p-5 shadow-2xs">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Parameters Controls */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 lg:gap-6 flex-1 flex-wrap">
          {/* Label / Badge */}
          <div className="flex items-center gap-2.5 text-ink shrink-0">
            <div className="w-8 h-8 rounded-lg bg-brand-soft flex items-center justify-center text-brand">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-xs sm:text-sm text-ink leading-tight">
                Briefing Parameters
              </h3>
              <span className="text-[11px] text-ink-muted">Tailor analysis factors</span>
            </div>
          </div>

          <div className="h-8 w-px bg-border-neutral/60 hidden md:block" />

          {/* Strategic Objective Selector */}
          <div className="flex flex-col gap-1 min-w-[200px] flex-1 max-w-xs">
            <label className="text-[10px] font-bold uppercase tracking-wider text-ink-muted flex items-center gap-1">
              <Target className="w-3 h-3 text-brand" />
              <span>Strategic Objective</span>
            </label>
            <select
              value={config.objective}
              onChange={(e) => handleObjectiveChange(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg border border-border-neutral bg-surface-subtle text-xs font-semibold text-ink focus:outline-hidden focus:ring-2 focus:ring-brand cursor-pointer"
            >
              <option value="ai-expansion">AI & Quantitative Hub Expansion</option>
              <option value="lease-optimization">Real Estate & Lease Optimization</option>
              <option value="policy-evaluation">State Policy & Subsidy Evaluation</option>
            </select>
          </div>

          {/* Target Metro Hubs */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-ink-muted flex items-center gap-1">
              <MapPin className="w-3 h-3 text-brand" />
              <span>Target Metro Hubs</span>
            </label>
            <div className="flex items-center gap-1.5">
              {[
                { slug: "bengaluru", label: "Bengaluru", state: "KA" },
                { slug: "hyderabad", label: "Hyderabad", state: "TG" },
              ].map((hub) => {
                const isChecked = config.selectedHubs.includes(hub.slug);
                return (
                  <button
                    key={hub.slug}
                    type="button"
                    onClick={() => handleToggleHub(hub.slug)}
                    className={`px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                      isChecked
                        ? "bg-brand text-white border-brand shadow-2xs"
                        : "bg-surface-subtle border-border-neutral text-ink-secondary hover:border-brand/40"
                    }`}
                  >
                    <span>{hub.label}</span>
                    <span
                      className={`text-[10px] px-1 py-0.2 rounded font-mono ${
                        isChecked
                          ? "bg-white/20 text-white"
                          : "bg-border-neutral/50 text-ink-muted"
                      }`}
                    >
                      {hub.state}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Functional Capabilities Tags */}
          <div className="hidden xl:flex flex-col gap-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-ink-muted flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-brand" />
              <span>Capabilities Focus</span>
            </label>
            <div className="flex flex-wrap gap-1">
              {["Quantitative Finance", "Avionics Engineering", "Retail Supply Chain"].map((cap) => (
                <span
                  key={cap}
                  className="px-2 py-1 rounded text-[10px] font-medium bg-surface-subtle border border-border-neutral text-ink"
                >
                  {cap}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Regenerate CTA */}
        <div className="shrink-0 self-start sm:self-end lg:self-center">
          <button
            onClick={onRegenerate}
            disabled={isLoading}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-brand text-white text-xs font-semibold hover:bg-brand-hover disabled:opacity-50 transition-colors shadow-2xs cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
            <span>Regenerate Brief</span>
          </button>
        </div>
      </div>
    </div>
  );
}
