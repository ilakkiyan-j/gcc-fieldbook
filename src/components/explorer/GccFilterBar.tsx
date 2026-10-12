"use client";

import React from "react";
import { Filter, RotateCcw, MapPin, Briefcase, ShieldCheck } from "lucide-react";

interface GccFilterBarProps {
  selectedCity: string;
  onSelectCity: (city: string) => void;
  selectedSector: string;
  onSelectSector: (sector: string) => void;
  selectedStatus: string;
  onSelectStatus: (status: string) => void;
  totalFiltered: number;
  totalAvailable: number;
  onResetFilters: () => void;
  hasActiveFilters: boolean;
}

export function GccFilterBar({
  selectedCity,
  onSelectCity,
  selectedSector,
  onSelectSector,
  selectedStatus,
  onSelectStatus,
  totalFiltered,
  totalAvailable,
  onResetFilters,
  hasActiveFilters,
}: GccFilterBarProps) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 p-3 sm:p-4 rounded-xl border border-border-neutral bg-white shadow-2xs">
      {/* Filter Selectors */}
      <div className="flex flex-wrap items-center gap-2.5">
        {/* City Filter */}
        <div className="flex items-center gap-1.5 bg-surface-subtle border border-border-neutral rounded-lg px-2.5 py-1.5 text-xs">
          <MapPin className="w-3.5 h-3.5 text-ink-muted" />
          <span className="text-ink-muted font-medium">City:</span>
          <select
            value={selectedCity}
            onChange={(e) => onSelectCity(e.target.value)}
            className="bg-transparent text-ink font-semibold focus:outline-hidden cursor-pointer"
            aria-label="Filter by metro city"
          >
            <option value="all">All Cities</option>
            <option value="bengaluru">Bengaluru</option>
            <option value="hyderabad">Hyderabad</option>
          </select>
        </div>

        {/* Sector Filter */}
        <div className="flex items-center gap-1.5 bg-surface-subtle border border-border-neutral rounded-lg px-2.5 py-1.5 text-xs">
          <Briefcase className="w-3.5 h-3.5 text-ink-muted" />
          <span className="text-ink-muted font-medium">Sector:</span>
          <select
            value={selectedSector}
            onChange={(e) => onSelectSector(e.target.value)}
            className="bg-transparent text-ink font-semibold focus:outline-hidden cursor-pointer"
            aria-label="Filter by industry sector"
          >
            <option value="all">All Sectors</option>
            <option value="Banking & Financial Services">Banking & Financial Services</option>
            <option value="Financial Services">Financial Services</option>
            <option value="Aerospace & Defense">Aerospace & Defense</option>
            <option value="Retail & Consumer Goods">Retail & Consumer Goods</option>
          </select>
        </div>

        {/* Evidence Status Filter */}
        <div className="flex items-center gap-1.5 bg-surface-subtle border border-border-neutral rounded-lg px-2.5 py-1.5 text-xs">
          <ShieldCheck className="w-3.5 h-3.5 text-ink-muted" />
          <span className="text-ink-muted font-medium">Status:</span>
          <select
            value={selectedStatus}
            onChange={(e) => onSelectStatus(e.target.value)}
            className="bg-transparent text-ink font-semibold focus:outline-hidden cursor-pointer"
            aria-label="Filter by evidence status"
          >
            <option value="all">All Statuses</option>
            <option value="verified">Verified Only</option>
            <option value="estimated">Estimated Only</option>
            <option value="conflicting">Conflicting Flagged</option>
          </select>
        </div>

        {/* Reset Action */}
        {hasActiveFilters && (
          <button
            onClick={onResetFilters}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg border border-rose-200 transition-colors"
            title="Reset active filters"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset filters</span>
          </button>
        )}
      </div>

      {/* Result Counter Pill */}
      <div className="flex items-center justify-between sm:justify-end gap-2 text-xs">
        <span className="text-ink-secondary">
          Showing <strong className="text-ink font-semibold font-mono">{totalFiltered}</strong> of{" "}
          <span className="font-mono">{totalAvailable}</span> verified centres
        </span>
      </div>
    </div>
  );
}
