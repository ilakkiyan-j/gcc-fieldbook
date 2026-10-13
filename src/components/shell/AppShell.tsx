"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Menu, Search } from "lucide-react";
import { Sidebar } from "@/components/shell/Sidebar";
import { CommandPalette } from "@/components/shell/CommandPalette";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const router = useRouter();

  // Load sidebar collapsed state from localStorage if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem("gcc_fieldbook_sidebar_collapsed");
      if (saved !== null) {
        setIsCollapsed(saved === "true");
      }
    } catch {
      // Ignore localStorage errors (e.g., SSR or incognito mode)
    }
  }, []);

  const handleToggleCollapse = () => {
    setIsCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("gcc_fieldbook_sidebar_collapsed", String(next));
      } catch {
        // Ignore
      }
      return next;
    });
  };

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Global keyboard shortcut for ⌘K / Ctrl+K search trigger
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen flex bg-surface-canvas text-ink antialiased">
      {/* Global Command Palette Modal (Ctrl+K / Cmd+K) */}
      <CommandPalette
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* Desktop & Mobile Responsive Sidebar */}
      <Sidebar
        isCollapsed={isCollapsed}
        onToggleCollapse={handleToggleCollapse}
        isMobileOpen={isMobileOpen}
        onCloseMobile={() => setIsMobileOpen(false)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Layout Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile-Only Header (< lg) */}
        <div className="lg:hidden sticky top-0 z-20 h-14 bg-white/95 backdrop-blur-xs border-b border-border-neutral px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileOpen(true)}
              className="p-2 rounded-lg text-ink-secondary hover:text-ink hover:bg-surface-subtle"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <Link href="/" className="flex items-center">
              <Image
                src="/images/horizontal_logo.png"
                alt="GCC Fieldbook"
                width={140}
                height={32}
                className="h-7 w-auto object-contain"
              />
            </Link>
          </div>
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2 rounded-lg text-ink-muted hover:text-ink hover:bg-surface-subtle"
            aria-label="Quick search"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>

        {/* Dynamic Page Content */}
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {children}
        </main>

        {/* Global Evidence & Provenance Footer */}
        <footer className="border-t border-border-neutral bg-white/70 backdrop-blur-xs py-5 px-4 sm:px-8 text-xs text-ink-muted">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div>
              <span className="font-semibold text-ink">GCC Fieldbook</span>
              <span className="mx-2 text-border-strong">&bull;</span>
              <span>Evidence-First Intelligence Workspace for India&apos;s GCC Ecosystem</span>
            </div>
            <div className="flex items-center gap-4 text-[11px]">
              <span className="inline-flex items-center gap-1.5 text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                Curated Assessment Sample
              </span>
              <span>Every claim verified or flagged transparently</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
