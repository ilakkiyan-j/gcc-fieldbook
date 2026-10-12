import Link from "next/link";
import { ArrowRight, Building2, MapPin, Sparkles, FileText, CheckCircle2 } from "lucide-react";
import { StatusBadge } from "@/components/shared/StatusBadge";

export default function HomePage() {
  return (
    <div className="space-y-8">
      {/* Scaffold Notification Banner */}
      <div className="p-4 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-sm flex items-center justify-between">
        <div>
          <span className="font-semibold">Phase 1 Route Scaffold:</span> Application foundation and neutral route placeholders verified. Global visual design will be finalized in Phase 3.
        </div>
        <StatusBadge status="verified" className="ml-4" />
      </div>

      {/* Main Title & Objective */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          GCC Fieldbook Dashboard
        </h1>
        <p className="text-slate-600 max-w-3xl">
          The working guide to India&apos;s GCC ecosystem. An evidence-first intelligence workspace designed for GCC consultants and market-entry advisory teams.
        </p>
      </div>

      {/* Core Journey Slices */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-5 bg-white rounded-lg border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center space-x-2 text-slate-900 font-semibold">
            <Building2 className="w-5 h-5 text-indigo-600" />
            <span>1. Discover GCCs</span>
          </div>
          <p className="text-xs text-slate-500">
            Search verified capability operations across Indian tech hubs with clear parent/entity distinctions.
          </p>
          <Link
            href="/gccs"
            className="inline-flex items-center text-xs font-medium text-indigo-600 hover:text-indigo-800 pt-2"
          >
            Open Explorer <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>

        <div className="p-5 bg-white rounded-lg border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center space-x-2 text-slate-900 font-semibold">
            <MapPin className="w-5 h-5 text-emerald-600" />
            <span>2. Compare Locations</span>
          </div>
          <p className="text-xs text-slate-500">
            Compare Tier-1 and Tier-2 hubs using sourced rent, talent, and policy indicators with visible units.
          </p>
          <Link
            href="/locations"
            className="inline-flex items-center text-xs font-medium text-emerald-600 hover:text-emerald-800 pt-2"
          >
            Compare Cities <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>

        <div className="p-5 bg-white rounded-lg border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center space-x-2 text-slate-900 font-semibold">
            <Sparkles className="w-5 h-5 text-violet-600" />
            <span>3. Ask Copilot</span>
          </div>
          <p className="text-xs text-slate-500">
            Synthesize retrieved facts with server-validated citations and explicit disclosure of unknowns.
          </p>
          <Link
            href="/research"
            className="inline-flex items-center text-xs font-medium text-violet-600 hover:text-violet-800 pt-2"
          >
            Start Research <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>

        <div className="p-5 bg-white rounded-lg border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center space-x-2 text-slate-900 font-semibold">
            <FileText className="w-5 h-5 text-amber-600" />
            <span>4. Decision Brief</span>
          </div>
          <p className="text-xs text-slate-500">
            Compile structured findings, assumptions, conflicts, and unanswered questions for client deliverables.
          </p>
          <Link
            href="/brief"
            className="inline-flex items-center text-xs font-medium text-amber-600 hover:text-amber-800 pt-2"
          >
            View Brief <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>
      </div>

      {/* Dataset Trust & Coverage Notice */}
      <div className="p-6 bg-white rounded-lg border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-lg font-semibold text-slate-900 flex items-center">
          <CheckCircle2 className="w-5 h-5 mr-2 text-slate-700" />
          Curated Dataset Coverage Principles (ADR-005)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-600">
          <div className="p-3 bg-slate-50 rounded border border-slate-200">
            <div className="font-semibold text-slate-900 mb-1">Traceable Provenance</div>
            Every material claim links to a public source, publisher date, and verification status.
          </div>
          <div className="p-3 bg-slate-50 rounded border border-slate-200">
            <div className="font-semibold text-slate-900 mb-1">Honest Completeness</div>
            Curated prototype dataset representing established GCC operations; not a nationwide scrape.
          </div>
          <div className="p-3 bg-slate-50 rounded border border-slate-200">
            <div className="font-semibold text-slate-900 mb-1">Transparent Conflict</div>
            Preserves differing market estimates and methodological definitions rather than fabricating precision.
          </div>
        </div>
      </div>
    </div>
  );
}
