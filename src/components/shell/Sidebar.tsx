"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Compass,
  Building2,
  MapPin,
  Sparkles,
  FileText,
  ChevronLeft,
  ChevronRight,
  Database,
  ExternalLink,
  X,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

const NAV_ITEMS = [
  {
    label: "Dashboard",
    href: "/",
    icon: Compass,
    description: "Overview and ecosystem metrics",
  },
  {
    label: "GCC Explorer",
    href: "/gccs",
    icon: Building2,
    description: "Directory of verified centres & claims",
  },
  {
    label: "Locations",
    href: "/locations",
    icon: MapPin,
    description: "City comparison and state policies",
  },
  {
    label: "Research Copilot",
    href: "/research",
    icon: Sparkles,
    description: "Evidence retrieval and AI synthesis",
  },
  {
    label: "Decision Brief",
    href: "/brief",
    icon: FileText,
    description: "Exportable executive briefing",
  },
];

export function Sidebar({
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onCloseMobile,
}: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const isItemActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white border-r border-border-neutral select-none">
      {/* Brand Header */}
      <div
        className={cn(
          "flex items-center justify-center h-[88px] px-3 border-b border-border-neutral transition-all relative",
          isCollapsed ? "px-2" : "px-3"
        )}
      >
        <Link
          href="/"
          onClick={onCloseMobile}
          className="flex items-center justify-center w-full transition-opacity hover:opacity-90"
        >
          {isCollapsed ? (
            <div className="w-11 h-11 relative flex items-center justify-center">
              <Image
                src="/images/logo.png"
                alt="GCC Fieldbook"
                width={44}
                height={44}
                priority
                className="rounded-lg shadow-2xs object-contain"
              />
            </div>
          ) : (
            <div className="w-full flex items-center justify-center px-1">
              <Image
                src="/images/horizontal_logo.png"
                alt="GCC Fieldbook — Evidence. Context. Better decisions."
                width={220}
                height={94}
                priority
                className="w-[215px] max-w-[220px] h-auto object-contain"
              />
            </div>
          )}
        </Link>

        {/* Mobile close button */}
        <button
          onClick={onCloseMobile}
          className="lg:hidden absolute right-3 p-1.5 rounded-md text-ink-muted hover:text-ink hover:bg-surface-subtle"
          aria-label="Close navigation"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Integrated Quick Search Bar */}
      <div className="px-3 pt-3 pb-1">
        {!isCollapsed ? (
          <button
            onClick={() => {
              router.push("/gccs");
              onCloseMobile();
            }}
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg border border-border-neutral bg-surface-subtle/80 text-xs text-ink-muted hover:text-ink hover:border-border-strong hover:bg-white transition-all shadow-2xs group"
            title="Quick search GCCs (⌘K or Ctrl+K)"
            aria-label="Quick search GCCs"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <Search className="w-4 h-4 text-ink-muted group-hover:text-brand flex-shrink-0 transition-colors" />
              <span className="truncate">Quick search...</span>
            </div>
            <kbd className="inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono font-medium text-ink-muted bg-white border border-border-neutral rounded shadow-2xs flex-shrink-0">
              ⌘K
            </kbd>
          </button>
        ) : (
          <button
            onClick={() => router.push("/gccs")}
            className="w-full flex items-center justify-center p-2 rounded-lg text-ink-muted hover:text-ink hover:bg-surface-subtle transition-colors"
            title="Quick search GCCs (⌘K)"
            aria-label="Quick search GCCs"
          >
            <Search className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation List */}
      <nav className="flex-1 py-4 px-3 space-y-1.5 overflow-y-auto">
        {!isCollapsed && (
          <div className="px-3 pb-2 text-[11px] font-semibold tracking-wider uppercase text-ink-muted">
            Workspace Navigation
          </div>
        )}

        {NAV_ITEMS.map((item) => {
          const active = isItemActive(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onCloseMobile}
              title={isCollapsed ? item.label : undefined}
              className={cn(
                "group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors relative",
                active
                  ? "bg-brand text-white font-medium shadow-xs"
                  : "text-ink-secondary hover:text-ink hover:bg-surface-subtle",
                isCollapsed && "justify-center px-2"
              )}
            >
              <Icon
                className={cn(
                  "w-5 h-5 flex-shrink-0 transition-transform group-hover:scale-105",
                  active ? "text-white" : "text-ink-muted group-hover:text-ink"
                )}
              />

              {!isCollapsed && (
                <div className="flex flex-col min-w-0">
                  <span className="truncate leading-tight">{item.label}</span>
                </div>
              )}

              {/* Active pill indicator for collapsed view */}
              {isCollapsed && active && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-white rounded-r-full" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer / Dataset Metadata Pill & Desktop Collapse */}
      <div className="p-3 border-t border-border-neutral bg-surface-subtle/50 space-y-2">
        {!isCollapsed ? (
          <div className="p-2.5 rounded-md bg-white border border-border-neutral text-xs space-y-1.5 shadow-2xs">
            <div className="flex items-center justify-between text-ink-secondary">
              <span className="flex items-center gap-1.5 font-medium text-[11px] text-brand">
                <Database className="w-3.5 h-3.5" />
                Curated Dataset
              </span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <p className="text-[11px] text-ink-muted leading-snug">
              4 verified GCC centres &bull; 2 Tier-1 cities with traceable evidence claims.
            </p>
            <div className="pt-1 flex justify-between items-center text-[10px] text-ink-muted border-t border-border-neutral/60">
              <Link
                href="/api/health"
                target="_blank"
                className="hover:text-brand flex items-center gap-0.5"
              >
                System API <ExternalLink className="w-2.5 h-2.5" />
              </Link>
              <span>ADR-005 Baseline</span>
            </div>
          </div>
        ) : (
          <div className="flex justify-center" title="Curated Dataset (4 GCCs, 2 Cities)">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse my-1" />
          </div>
        )}

        {/* Desktop Collapse Toggle */}
        <button
          onClick={onToggleCollapse}
          className="hidden lg:flex w-full items-center justify-center gap-2 py-2 px-3 rounded-md text-xs font-medium text-ink-muted hover:text-ink hover:bg-white border border-transparent hover:border-border-neutral transition-all"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <>
              <ChevronLeft className="w-4 h-4" />
              <span>Collapse Sidebar</span>
            </>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside
        className={cn(
          "hidden lg:flex flex-col flex-shrink-0 sticky top-0 h-screen z-30 transition-[width] duration-300 ease-in-out",
          isCollapsed ? "w-16" : "w-64"
        )}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer (Slide-over with Backdrop) */}
      <div
        className={cn(
          "lg:hidden fixed inset-0 z-50 transition-opacity duration-200",
          isMobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        {/* Backdrop */}
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-ink/40 backdrop-blur-2xs transition-opacity"
        />

        {/* Slide-over panel */}
        <div
          className={cn(
            "fixed inset-y-0 left-0 w-72 max-w-[85vw] shadow-xl transform transition-transform duration-200 ease-in-out",
            isMobileOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          {sidebarContent}
        </div>
      </div>
    </>
  );
}
