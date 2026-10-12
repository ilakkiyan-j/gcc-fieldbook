"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/shell/Sidebar";
import { Header } from "@/components/shell/Header";

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

  // Global keyboard shortcut for ⌘K / Ctrl+K search trigger
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        router.push("/gccs");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  return (
    <div className="min-h-screen flex bg-surface-canvas text-ink antialiased">
      {/* Desktop & Mobile Responsive Sidebar */}
      <Sidebar
        isCollapsed={isCollapsed}
        onToggleCollapse={handleToggleCollapse}
        isMobileOpen={isMobileOpen}
        onCloseMobile={() => setIsMobileOpen(false)}
      />

      {/* Main Layout Area */}
      <div className="flex-1 flex flex-col min-w-0 transition-[margin] duration-300 ease-in-out">
        {/* Sticky Top Context Header */}
        <Header onOpenMobile={() => setIsMobileOpen(true)} />

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
