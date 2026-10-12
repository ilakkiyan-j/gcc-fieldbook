import Link from "next/link";
import { Info, ArrowRight, ShieldCheck } from "lucide-react";

interface CoverageBannerProps {
  centreCount: number;
  cityCount: number;
}

export function CoverageBanner({ centreCount, cityCount }: CoverageBannerProps) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-emerald-200/80 bg-linear-to-r from-emerald-50/90 via-white to-surface-subtle p-4 sm:p-5 shadow-2xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-emerald-100 text-emerald-800 shrink-0 mt-0.5 sm:mt-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
                Curated Assessment Sample
              </span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-emerald-200/70 text-emerald-900">
                ADR-005 Transparent Disclosure
              </span>
            </div>
            <p className="text-xs sm:text-sm text-ink-secondary mt-1 max-w-3xl leading-relaxed">
              Tracking <strong className="text-ink font-semibold">{centreCount} verified Global Capability Centres</strong> across{" "}
              <strong className="text-ink font-semibold">{cityCount} tech hubs (Bengaluru & Hyderabad)</strong>. All parameters are cited to official corporate newsrooms, JLL reports, and state gazettes. Unverified estimates are flagged explicitly.
            </p>
          </div>
        </div>
        <div className="shrink-0">
          <Link
            href="/gccs"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand hover:text-brand-hover hover:underline"
          >
            <span>Explore directory</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
