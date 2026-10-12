"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { MapPin, Sparkles, ArrowRight, Building2, FileText } from "lucide-react";
import { City, Policy } from "@/types/domain";
import { CitySelector } from "@/components/locations/CitySelector";
import { IndicatorMatrixTable } from "@/components/locations/IndicatorMatrixTable";
import { PolicyComparisonCards } from "@/components/locations/PolicyComparisonCards";
import { ComparabilityDisclosure } from "@/components/locations/ComparabilityDisclosure";

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

interface LocationsClientProps {
  allCities: City[];
  comparison: {
    cities: City[];
    indicators: IndicatorRow[];
    policies: Policy[];
  };
}

export function LocationsClient({ allCities, comparison }: LocationsClientProps) {
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>(["bengaluru", "hyderabad"]);

  const handleToggleCity = (slug: string) => {
    setSelectedSlugs((prev) => {
      if (prev.includes(slug)) {
        // Prevent removing all cities
        if (prev.length <= 1) return prev;
        return prev.filter((s) => s !== slug);
      } else {
        return [...prev, slug];
      }
    });
  };

  const activeCities = useMemo(() => {
    return comparison.cities.filter((c) => selectedSlugs.includes(c.slug));
  }, [comparison.cities, selectedSlugs]);

  const activePolicies = useMemo(() => {
    const states = activeCities.map((c) => c.state_or_region.toLowerCase());
    return comparison.policies.filter((p) =>
      states.some((s) => p.state_or_authority.toLowerCase().includes(s))
    );
  }, [comparison.policies, activeCities]);

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b border-border-neutral/60">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-brand-soft text-brand-ink border border-brand/20 mb-2">
            <MapPin className="w-3.5 h-3.5 text-brand" />
            <span>Site Selection Intelligence &bull; Metro Corridors</span>
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-ink">
            India GCC Metro Hub Comparison Matrix
          </h1>
          <p className="text-xs sm:text-sm text-ink-secondary mt-1.5 max-w-3xl leading-relaxed">
            Side-by-side benchmark of prime Grade-A commercial leasing tariffs, tech talent concentration, and state GCC policy subsidies. Sourced directly from JLL quarterly reports, NASSCOM surveys, and state gazettes.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/brief"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand text-white text-xs font-semibold hover:bg-brand-hover transition-colors shadow-2xs"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Executive Brief</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Active City Selection Bar */}
      <CitySelector
        cities={allCities}
        selectedSlugs={selectedSlugs}
        onToggleCity={handleToggleCity}
      />

      {/* Indicator Comparison Matrix Table */}
      <IndicatorMatrixTable
        cities={activeCities}
        indicators={comparison.indicators}
      />

      {/* State Policy Frameworks */}
      <PolicyComparisonCards policies={activePolicies} />

      {/* Methodology & Comparability Disclosures */}
      <ComparabilityDisclosure />
    </div>
  );
}
