import Link from "next/link";
import { Building2, Search, Filter, ExternalLink } from "lucide-react";
import { StatusBadge } from "@/components/shared/StatusBadge";

export default function GccExplorerPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center">
            <Building2 className="w-6 h-6 mr-2 text-slate-700" />
            GCC Explorer
          </h1>
          <p className="text-sm text-slate-600">
            Browse and filter verified India Global Capability Centres with source-backed evidence.
          </p>
        </div>
        <div className="text-xs bg-slate-100 text-slate-600 px-3 py-1.5 rounded border border-slate-200">
          Status: <span className="font-semibold text-slate-900">Phase 1 Neutral Placeholder</span>
        </div>
      </div>

      {/* Mock Search and Filter Bar */}
      <div className="p-4 bg-white rounded-lg border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            disabled
            placeholder="Search company, GCC centre, or capability..."
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded text-sm bg-slate-50 text-slate-500 cursor-not-allowed"
          />
        </div>
        <div className="flex gap-2">
          <button
            disabled
            className="flex items-center px-3 py-2 border border-slate-200 rounded text-sm text-slate-500 bg-slate-50 cursor-not-allowed"
          >
            <Filter className="w-4 h-4 mr-1.5" />
            Filter by City
          </button>
          <button
            disabled
            className="flex items-center px-3 py-2 border border-slate-200 rounded text-sm text-slate-500 bg-slate-50 cursor-not-allowed"
          >
            Filter by Function
          </button>
        </div>
      </div>

      {/* Scaffold Table Preview */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
          <h2 className="text-sm font-semibold text-slate-900">Sample Curated Records (Demo Preview)</h2>
          <span className="text-xs text-slate-500">Showing 2 placeholder entries</span>
        </div>
        <div className="divide-y divide-slate-200">
          <div className="p-6 flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:bg-slate-50">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <Link
                  href="/gccs/goldman-sachs"
                  className="font-semibold text-slate-900 hover:text-indigo-600"
                >
                  Goldman Sachs Services India
                </Link>
                <StatusBadge status="verified" />
              </div>
              <p className="text-xs text-slate-500">
                Bengaluru & Hyderabad &bull; Banking & Financial Services &bull; Engineering & Asset Management
              </p>
            </div>
            <Link
              href="/gccs/goldman-sachs"
              className="inline-flex items-center text-xs font-medium text-slate-700 hover:text-indigo-600"
            >
              Inspect Claims & Evidence <ExternalLink className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>

          <div className="p-6 flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:bg-slate-50">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <Link
                  href="/gccs/jpmorgan-chase"
                  className="font-semibold text-slate-900 hover:text-indigo-600"
                >
                  JPMorgan Chase India Technology Centre
                </Link>
                <StatusBadge status="verified" />
              </div>
              <p className="text-xs text-slate-500">
                Bengaluru, Mumbai, Hyderabad &bull; Financial Technology &bull; AI/ML Operations
              </p>
            </div>
            <Link
              href="/gccs/jpmorgan-chase"
              className="inline-flex items-center text-xs font-medium text-slate-700 hover:text-indigo-600"
            >
              Inspect Claims & Evidence <ExternalLink className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
