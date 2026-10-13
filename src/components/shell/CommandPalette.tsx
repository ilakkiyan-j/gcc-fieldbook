"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Building2,
  MapPin,
  Sparkles,
  FileText,
  Compass,
  ArrowRight,
  X,
  CornerDownLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchItem {
  id: string;
  category: "Centres" | "Locations" | "Tools";
  title: string;
  subtitle: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  tags?: string[];
}

const SEARCH_DATABASE: SearchItem[] = [
  // GCC Centres & Companies
  {
    id: "gs-blr",
    category: "Centres",
    title: "Goldman Sachs Bengaluru Technology Center",
    subtitle: "Quantitative Finance & Software Engineering • Bengaluru",
    href: "/gccs/goldman-sachs-bengaluru",
    icon: Building2,
    tags: ["goldman", "sachs", "bengaluru", "finance", "quant", "banking", "tech"],
  },
  {
    id: "gs-hyd",
    category: "Centres",
    title: "Goldman Sachs Hyderabad Center",
    subtitle: "Global Markets Engineering & Analytics • HITEC City",
    href: "/gccs/goldman-sachs-hyderabad",
    icon: Building2,
    tags: ["goldman", "sachs", "hyderabad", "markets", "hitec", "telangana"],
  },
  {
    id: "jpmc-blr",
    category: "Centres",
    title: "JPMorgan Chase Technology Centre",
    subtitle: "Core Banking Infrastructure & Asset Management Software • Bengaluru",
    href: "/gccs/jpmorgan-bengaluru",
    icon: Building2,
    tags: ["jpmorgan", "chase", "bengaluru", "payments", "banking", "finance"],
  },
  {
    id: "boeing-blr",
    category: "Centres",
    title: "Boeing India Engineering & Technology Center (BIETC)",
    subtitle: "Avionics, Aerodynamics & Composite Materials • Devanahalli",
    href: "/gccs/boeing-bietc-bengaluru",
    icon: Building2,
    tags: ["boeing", "bietc", "bengaluru", "aerospace", "defense", "avionics", "aviation"],
  },
  {
    id: "target-blr",
    category: "Centres",
    title: "Target Enterprise India",
    subtitle: "Retail Supply Chain, AI Forecasting & Merchandising • Manyata",
    href: "/gccs/target-enterprise-bengaluru",
    icon: Building2,
    tags: ["target", "retail", "bengaluru", "supply chain", "e-commerce"],
  },

  // Locations & Corridors
  {
    id: "loc-blr",
    category: "Locations",
    title: "Bengaluru Metro Hub (ORR & Whitefield)",
    subtitle: "Commercial rent ₹145–195/sq.ft/mo • Deepest AI/ML engineering pool",
    href: "/locations",
    icon: MapPin,
    tags: ["bengaluru", "karnataka", "orr", "whitefield", "rent", "talent", "location"],
  },
  {
    id: "loc-hyd",
    category: "Locations",
    title: "Hyderabad Metro Hub (HITEC City & Financial Dist.)",
    subtitle: "Commercial rent ₹85–110/sq.ft/mo • Fast-growing technology destination",
    href: "/locations",
    icon: MapPin,
    tags: ["hyderabad", "telangana", "hitec", "financial district", "rent", "subsidies"],
  },

  // Workspaces & Tools
  {
    id: "tool-copilot",
    category: "Tools",
    title: "Evidence-Bound AI Research Copilot",
    subtitle: "Ask research queries with auditable primary citations",
    href: "/research",
    icon: Sparkles,
    tags: ["copilot", "ai", "research", "chat", "citations", "rag", "query"],
  },
  {
    id: "tool-brief",
    category: "Tools",
    title: "Executive GCC Decision Brief Generator",
    subtitle: "Generate and export strategic diligence deliverables (Markdown/PDF)",
    href: "/brief",
    icon: FileText,
    tags: ["brief", "decision", "memo", "executive", "export", "pdf", "generator"],
  },
  {
    id: "tool-explorer",
    category: "Tools",
    title: "GCC Explorer & Directory",
    subtitle: "Browse and filter all verified Global Capability Centres",
    href: "/gccs",
    icon: Building2,
    tags: ["explorer", "directory", "filter", "search", "companies", "centres"],
  },
  {
    id: "tool-dashboard",
    category: "Tools",
    title: "Overview Command Center",
    subtitle: "Ecosystem KPIs, sample coverage, and confidence distribution",
    href: "/",
    icon: Compass,
    tags: ["dashboard", "home", "overview", "metrics", "command center"],
  },
];

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Filter items matching query across title, subtitle, and tags
  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SEARCH_DATABASE;

    return SEARCH_DATABASE.filter((item) => {
      const titleMatch = item.title.toLowerCase().includes(q);
      const subMatch = item.subtitle.toLowerCase().includes(q);
      const tagMatch = item.tags?.some((t) => t.toLowerCase().includes(q));
      const catMatch = item.category.toLowerCase().includes(q);
      return titleMatch || subMatch || tagMatch || catMatch;
    });
  }, [query]);

  // Reset index when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Focus input on open & prevent body scrolling
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Scroll selected item into view
  useEffect(() => {
    if (!listRef.current) return;
    const selectedEl = listRef.current.querySelector<HTMLElement>(`[data-index="${selectedIndex}"]`);
    if (selectedEl) {
      selectedEl.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex]);

  // Keyboard navigation inside palette
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const selected = filteredItems[selectedIndex];
      if (selected) {
        onClose();
        router.push(selected.href);
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[120] flex items-start justify-center pt-16 sm:pt-24 px-4 bg-ink/50 backdrop-blur-xs animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-xl border border-border-neutral shadow-2xl overflow-hidden flex flex-col max-h-[80vh] sm:max-h-[600px] animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-border-neutral/70 bg-surface-subtle/30">
          <Search className="w-5 h-5 text-ink-muted mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search companies, locations, capabilities, or tools..."
            className="flex-1 bg-transparent text-sm sm:text-base text-ink placeholder:text-ink-muted focus:outline-hidden"
          />
          {query ? (
            <button
              onClick={() => setQuery("")}
              className="p-1 rounded-md text-ink-muted hover:text-ink hover:bg-surface-subtle"
              aria-label="Clear query"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-[10px] font-mono font-medium text-ink-muted bg-white border border-border-neutral rounded shadow-2xs">
              ESC
            </kbd>
          )}
        </div>

        {/* Results List */}
        <div ref={listRef} className="flex-1 overflow-y-auto p-2 space-y-1">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-sm text-ink-muted">
              <Building2 className="w-8 h-8 mx-auto text-ink-muted/50 mb-2" />
              <p>No results found matching &ldquo;<span className="font-semibold text-ink">{query}</span>&rdquo;</p>
              <p className="text-xs text-ink-muted mt-1">Try searching for Goldman, Boeing, ORR, Rent, or Copilot</p>
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const isSelected = index === selectedIndex;
              const Icon = item.icon;

              return (
                <div
                  key={item.id}
                  data-index={index}
                  onClick={() => {
                    onClose();
                    router.push(item.href);
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={cn(
                    "flex items-center justify-between p-3 rounded-lg text-left cursor-pointer transition-colors border border-transparent",
                    isSelected
                      ? "bg-brand-soft text-brand-ink border-brand/20 shadow-2xs"
                      : "hover:bg-surface-subtle/60 text-ink"
                  )}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors",
                        isSelected ? "bg-brand text-white" : "bg-surface-subtle text-ink-secondary"
                      )}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs sm:text-sm truncate">
                          {item.title}
                        </span>
                        <span
                          className={cn(
                            "text-[10px] uppercase font-bold px-1.5 py-0.2 rounded shrink-0",
                            isSelected
                              ? "bg-brand text-white"
                              : "bg-surface-subtle text-ink-muted border border-border-neutral/60"
                          )}
                        >
                          {item.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-ink-secondary truncate mt-0.5">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 pl-3 shrink-0">
                    {isSelected && (
                      <CornerDownLeft className="w-3.5 h-3.5 text-brand hidden sm:block animate-pulse" />
                    )}
                    <ArrowRight className="w-4 h-4 text-ink-muted/60" />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Shortcut Bar */}
        <div className="px-4 py-2.5 border-t border-border-neutral/60 bg-surface-subtle/40 text-[11px] text-ink-muted flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 font-mono text-[10px] bg-white border border-border-neutral rounded">↑↓</kbd>
              <span>to navigate</span>
            </span>
            <span className="inline-flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 font-mono text-[10px] bg-white border border-border-neutral rounded">↵</kbd>
              <span>to open</span>
            </span>
            <span className="inline-flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 font-mono text-[10px] bg-white border border-border-neutral rounded">esc</kbd>
              <span>to close</span>
            </span>
          </div>
          <span className="font-semibold text-[10px] text-brand uppercase tracking-wider hidden sm:inline">
            GCC Fieldbook
          </span>
        </div>
      </div>
    </div>
  );
}
