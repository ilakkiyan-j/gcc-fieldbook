"use client";

import React, { useState, useMemo, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Building2, ShieldCheck, Database, Info } from "lucide-react";
import { GccCentre } from "@/types/domain";
import { GccSearchBar } from "@/components/explorer/GccSearchBar";
import { GccFilterBar } from "@/components/explorer/GccFilterBar";
import { GccTable } from "@/components/explorer/GccTable";
import { GccEmptyState } from "@/components/explorer/GccEmptyState";
import { HelpTooltip } from "@/components/shared/HelpTooltip";

interface GccExplorerClientProps {
  centres: GccCentre[];
}

export function GccExplorerClient({ centres }: GccExplorerClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read initial filter values from URL or defaults
  const [query, setQuery] = useState(searchParams?.get("q") || "");
  const [selectedCity, setSelectedCity] = useState(searchParams?.get("city") || "all");
  const [selectedSector, setSelectedSector] = useState(searchParams?.get("sector") || "all");
  const [selectedStatus, setSelectedStatus] = useState(searchParams?.get("status") || "all");

  // Sync state to URL params cleanly
  const updateUrl = useCallback(
    (newParams: { q?: string; city?: string; sector?: string; status?: string }) => {
      const params = new URLSearchParams(searchParams?.toString() || "");

      const q = newParams.q !== undefined ? newParams.q : query;
      const city = newParams.city !== undefined ? newParams.city : selectedCity;
      const sector = newParams.sector !== undefined ? newParams.sector : selectedSector;
      const status = newParams.status !== undefined ? newParams.status : selectedStatus;

      if (q) params.set("q", q);
      else params.delete("q");

      if (city && city !== "all") params.set("city", city);
      else params.delete("city");

      if (sector && sector !== "all") params.set("sector", sector);
      else params.delete("sector");

      if (status && status !== "all") params.set("status", status);
      else params.delete("status");

      const queryStr = params.toString();
      const newPath = queryStr ? `/gccs?${queryStr}` : `/gccs`;
      router.replace(newPath, { scroll: false });
    },
    [router, searchParams, query, selectedCity, selectedSector, selectedStatus]
  );

  const handleQueryChange = (val: string) => {
    setQuery(val);
    updateUrl({ q: val });
  };

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    updateUrl({ city });
  };

  const handleSectorChange = (sector: string) => {
    setSelectedSector(sector);
    updateUrl({ sector });
  };

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
    updateUrl({ status });
  };

  const handleResetFilters = () => {
    setQuery("");
    setSelectedCity("all");
    setSelectedSector("all");
    setSelectedStatus("all");
    router.replace("/gccs", { scroll: false });
  };

  const hasActiveFilters =
    Boolean(query) ||
    selectedCity !== "all" ||
    selectedSector !== "all" ||
    selectedStatus !== "all";

  // Filter centres in-memory based on active criteria
  const filteredCentres = useMemo(() => {
    return centres.filter((centre) => {
      // 1. Text Query Filter
      if (query.trim()) {
        const term = query.toLowerCase().trim();
        const nameMatch = centre.display_name.toLowerCase().includes(term);
        const companyMatch = centre.company?.name.toLowerCase().includes(term);
        const sectorMatch = centre.sector?.toLowerCase().includes(term);
        const functionMatch = centre.functions.some((f) => f.toLowerCase().includes(term));

        if (!nameMatch && !companyMatch && !sectorMatch && !functionMatch) {
          return false;
        }
      }

      // 2. City Filter
      if (selectedCity !== "all") {
        if (centre.city?.slug.toLowerCase() !== selectedCity.toLowerCase()) {
          return false;
        }
      }

      // 3. Sector Filter
      if (selectedSector !== "all") {
        if (centre.sector?.toLowerCase() !== selectedSector.toLowerCase()) {
          return false;
        }
      }

      // 4. Status Filter
      if (selectedStatus !== "all") {
        const hasConflict = centre.claims?.some((c) => c.evidence_status === "conflicting");
        const hasEstimate = centre.claims?.some((c) => c.evidence_status === "estimated");
        const centreStatus = hasConflict ? "conflicting" : hasEstimate ? "estimated" : "verified";

        if (centreStatus !== selectedStatus) {
          return false;
        }
      }

      return true;
    });
  }, [centres, query, selectedCity, selectedSector, selectedStatus]);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b border-border-neutral/60">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-brand-soft text-brand-ink border border-brand/20 mb-2">
            <Building2 className="w-3.5 h-3.5 text-brand" />
            <span>Curated Directory &bull; Sourced Filings</span>
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-ink flex items-center flex-wrap">
            <span>GCC Explorer & Directory</span>
            <HelpTooltip content="Search, filter, and audit verified Global Capability Centres by functional domain, metro hub, setup year, and source claim verification status." />
          </h1>
          <p className="text-xs sm:text-sm text-ink-secondary mt-1 max-w-3xl leading-relaxed">
            Discover verified Global Capability Centres across Tier-1 corridors. Filter by functional capability, industry sector, or evidence audit status.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-subtle border border-border-neutral text-xs text-ink-secondary shrink-0">
          <Database className="w-3.5 h-3.5 text-brand" />
          <span><strong className="text-ink font-semibold">{centres.length}</strong> Curated Records</span>
        </div>
      </div>

      {/* Search Input Bar */}
      <GccSearchBar
        value={query}
        onChange={handleQueryChange}
        onClear={() => handleQueryChange("")}
      />

      {/* Multi-faceted Filter Bar */}
      <GccFilterBar
        selectedCity={selectedCity}
        onSelectCity={handleCityChange}
        selectedSector={selectedSector}
        onSelectSector={handleSectorChange}
        selectedStatus={selectedStatus}
        onSelectStatus={handleStatusChange}
        totalFiltered={filteredCentres.length}
        totalAvailable={centres.length}
        onResetFilters={handleResetFilters}
        hasActiveFilters={hasActiveFilters}
      />

      {/* Table or Empty State */}
      {filteredCentres.length > 0 ? (
        <GccTable centres={filteredCentres} />
      ) : (
        <GccEmptyState
          query={query}
          city={selectedCity}
          sector={selectedSector}
          status={selectedStatus}
          onReset={handleResetFilters}
        />
      )}

      {/* Methodology & Data Trust Footnote */}
      <div className="p-4 rounded-xl border border-border-neutral bg-white text-xs text-ink-secondary flex items-start gap-3 shadow-2xs">
        <Info className="w-4 h-4 text-brand shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-ink font-semibold">Entity vs. Centre Architecture:</strong> In accordance with ADR-003, parent corporate entities (e.g. Goldman Sachs, Boeing) and their discrete Indian capability centres are modeled separately to ensure accurate legal entity attribution and avoid double-counting multi-city footprints.
        </p>
      </div>
    </div>
  );
}
