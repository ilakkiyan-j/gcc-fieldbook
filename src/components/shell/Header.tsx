"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Menu, Search, Sparkles, ShieldCheck } from "lucide-react";

interface HeaderProps {
  onOpenMobile: () => void;
}

export function Header({ onOpenMobile }: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();

  // Compute breadcrumb trail
  const getBreadcrumbs = () => {
    if (pathname === "/") return [{ label: "Dashboard", href: "/" }];
    if (pathname === "/gccs") return [{ label: "GCC Explorer", href: "/gccs" }];
    if (pathname.startsWith("/gccs/")) {
      const id = pathname.replace("/gccs/", "");
      return [
        { label: "GCC Explorer", href: "/gccs" },
        { label: decodeURIComponent(id).replace(/-/g, " "), href: pathname },
      ];
    }
    if (pathname === "/locations") return [{ label: "Location Intelligence", href: "/locations" }];
    if (pathname === "/research") return [{ label: "Research Copilot", href: "/research" }];
    if (pathname === "/brief") return [{ label: "Decision Brief", href: "/brief" }];
    return [{ label: "GCC Fieldbook", href: "/" }];
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <header className="sticky top-0 z-20 h-18 bg-white/95 backdrop-blur-xs border-b border-border-neutral px-4 sm:px-6 lg:px-8 flex items-center justify-between">
      {/* Left: Mobile trigger & Breadcrumbs */}
      <div className="flex items-center gap-3">
        {/* Mobile Hamburger */}
        <button
          onClick={onOpenMobile}
          className="lg:hidden p-2 rounded-lg text-ink-secondary hover:text-ink hover:bg-surface-subtle"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Mobile Logo Mark */}
        <div className="lg:hidden flex items-center">
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="GCC Fieldbook"
              width={30}
              height={30}
              className="rounded-md object-contain"
            />
          </Link>
        </div>

        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center space-x-1.5 text-xs sm:text-sm">
          <span className="text-ink-muted font-medium hidden sm:inline">Workspace</span>
          <span className="text-ink-muted hidden sm:inline">/</span>
          {breadcrumbs.map((crumb, idx) => (
            <div key={crumb.href} className="flex items-center space-x-1.5">
              {idx > 0 && <span className="text-ink-muted">/</span>}
              {idx === breadcrumbs.length - 1 ? (
                <span className="font-semibold text-ink capitalize truncate max-w-[180px] sm:max-w-none">
                  {crumb.label}
                </span>
              ) : (
                <Link
                  href={crumb.href}
                  className="text-ink-secondary hover:text-brand transition-colors"
                >
                  {crumb.label}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Right: Quick Search & Coverage Badge */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Search Shortcut Trigger */}
        <button
          onClick={() => router.push("/gccs")}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border-neutral bg-surface-subtle text-xs text-ink-muted hover:text-ink hover:border-border-strong hover:bg-white transition-all shadow-2xs"
          title="Search GCCs (shortcut: / or click)"
        >
          <Search className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Quick search GCCs...</span>
          <kbd className="hidden md:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono font-medium text-ink-muted bg-white border border-border-neutral rounded shadow-2xs">
            ⌘K
          </kbd>
        </button>

        {/* Live Coverage Disclosure Pill (ADR-005) */}
        <div
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-2xs"
          title="Curated assessment dataset with verifiable source evidence."
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
          <span className="hidden xs:inline">Curated Sample</span>
        </div>
      </div>
    </header>
  );
}
