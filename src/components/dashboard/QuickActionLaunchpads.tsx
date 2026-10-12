import Link from "next/link";
import { MapPin, Sparkles, ArrowRight, BarChart3, Search } from "lucide-react";

export function QuickActionLaunchpads() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Location Comparison Launchpad */}
      <div className="rounded-xl border border-border-neutral bg-linear-to-br from-white via-white to-sky-50/40 p-5 sm:p-6 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 text-sky-800 text-xs font-semibold uppercase tracking-wider">
            <MapPin className="w-4 h-4 text-sky-700" />
            <span>Site Selection Intelligence</span>
          </div>
          <h4 className="font-heading font-bold text-base sm:text-lg text-ink mt-2">
            Compare Bengaluru vs. Hyderabad Corridors
          </h4>
          <p className="text-xs sm:text-sm text-ink-secondary mt-1.5 leading-relaxed">
            Side-by-side benchmark of Outer Ring Road vs. HITEC City office rents (₹115 vs. ₹85/sq ft), professional tech talent pool (1.5M vs. 900K), and state GCC policy subsidies.
          </p>
        </div>
        <div className="mt-5 pt-3 border-t border-border-neutral/60">
          <Link
            href="/locations"
            className="inline-flex items-center gap-2 text-xs font-semibold text-brand hover:text-brand-hover"
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Open Location Matrix &rarr;</span>
          </Link>
        </div>
      </div>

      {/* Research Copilot Launchpad */}
      <div className="rounded-xl border border-border-neutral bg-linear-to-br from-white via-white to-emerald-50/40 p-5 sm:p-6 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 text-emerald-800 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-emerald-700" />
            <span>Evidence-Bound AI Assistant</span>
          </div>
          <h4 className="font-heading font-bold text-base sm:text-lg text-ink mt-2">
            AI Research Copilot
          </h4>
          <p className="text-xs sm:text-sm text-ink-secondary mt-1.5 leading-relaxed">
            Ask targeted questions across verified corporate filings. Every factual statement includes clickable primary citations. Questions unsupported by seed data are handled honestly.
          </p>
        </div>
        <div className="mt-5 pt-3 border-t border-border-neutral/60">
          <Link
            href="/research"
            className="inline-flex items-center gap-2 text-xs font-semibold text-brand hover:text-brand-hover"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Query Research Copilot &rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
