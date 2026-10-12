"use client";

import React from "react";
import Link from "next/link";
import { MapPin, Building2, Check, ExternalLink } from "lucide-react";
import { City } from "@/types/domain";

interface CitySelectorProps {
  cities: City[];
  selectedSlugs: string[];
  onToggleCity: (slug: string) => void;
}

export function CitySelector({
  cities,
  selectedSlugs,
  onToggleCity,
}: CitySelectorProps) {
  return (
    <div className="rounded-xl border border-border-neutral bg-white p-4 sm:p-5 shadow-2xs space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
            Active Hub Comparison Selection
          </span>
          <p className="text-xs text-ink-secondary mt-0.5">
            Select metropolitan corridors to benchmark side-by-side across commercial real estate, talent density, and state subsidies.
          </p>
        </div>
        <span className="text-[11px] font-mono text-ink-muted self-start sm:self-auto">
          {selectedSlugs.length} hubs active
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-2.5 pt-1">
        {cities.map((city) => {
          const isSelected = selectedSlugs.includes(city.slug);

          return (
            <button
              key={city.id}
              onClick={() => onToggleCity(city.slug)}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold border transition-all ${
                isSelected
                  ? "bg-brand-soft text-brand-ink border-brand shadow-2xs"
                  : "bg-surface-subtle text-ink-muted border-border-neutral hover:text-ink hover:border-border-strong"
              }`}
              aria-pressed={isSelected}
            >
              <div
                className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                  isSelected ? "bg-brand text-white" : "bg-border-strong text-transparent"
                }`}
              >
                <Check className="w-2.5 h-2.5" />
              </div>
              <span className="font-heading font-bold text-ink">
                {city.name}
              </span>
              <span className="text-[11px] font-normal text-ink-secondary">
                ({city.state_or_region})
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
