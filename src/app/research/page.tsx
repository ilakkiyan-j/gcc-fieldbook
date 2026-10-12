import { Sparkles, Send, ShieldCheck, Database, HelpCircle } from "lucide-react";
import { StatusBadge } from "@/components/shared/StatusBadge";

export default function ResearchPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center">
            <Sparkles className="w-6 h-6 mr-2 text-violet-600" />
            AI Research Copilot
          </h1>
          <p className="text-sm text-slate-600">
            Ask research questions across the curated GCC dataset. Every claim requires server-validated citations.
          </p>
        </div>
        <div className="text-xs bg-slate-100 text-slate-600 px-3 py-1.5 rounded border border-slate-200">
          Status: <span className="font-semibold text-slate-900">Phase 1 Neutral Placeholder</span>
        </div>
      </div>

      {/* Trust & Boundary Banner */}
      <div className="p-4 bg-white rounded-lg border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-600">
        <div className="flex items-start space-x-2">
          <Database className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
          <div>
            <span className="font-semibold text-slate-900">Deterministic Retrieval:</span> Relevant facts are queried before model synthesis.
          </div>
        </div>
        <div className="flex items-start space-x-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
          <div>
            <span className="font-semibold text-slate-900">Validated Citations:</span> Model citation IDs must match retrieved records.
          </div>
        </div>
        <div className="flex items-start space-x-2">
          <HelpCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
          <div>
            <span className="font-semibold text-slate-900">Explicit Unknowns:</span> Missing evidence is disclosed, not invented.
          </div>
        </div>
      </div>

      {/* Query input placeholder */}
      <div className="p-6 bg-white rounded-lg border border-slate-200 shadow-sm space-y-4">
        <div className="relative">
          <textarea
            disabled
            rows={3}
            placeholder="e.g. Which financial services GCCs have setup AI/ML engineering hubs in Bengaluru vs Hyderabad since 2020?"
            className="w-full p-3 border border-slate-200 rounded-md text-sm bg-slate-50 text-slate-500 cursor-not-allowed resize-none"
          />
        </div>
        <div className="flex justify-between items-center">
          <div className="text-xs text-slate-500">
            Connected Model: <span className="font-mono text-slate-700">gemini-2.5-flash (Server Module)</span>
          </div>
          <button
            disabled
            className="inline-flex items-center px-4 py-2 bg-slate-200 text-slate-500 text-sm font-medium rounded-md cursor-not-allowed"
          >
            <Send className="w-4 h-4 mr-1.5" /> Run Research Query
          </button>
        </div>
      </div>

      {/* Sample Synthesized Output Preview */}
      <div className="p-6 bg-white rounded-lg border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-sm font-semibold text-slate-900">Sample Grounded Response (Mock Demonstration)</h2>
          <StatusBadge status="verified" />
        </div>
        <div className="text-sm text-slate-700 space-y-3 leading-relaxed">
          <p>
            Based on retrieved evidence from the curated dataset, both Bengaluru and Hyderabad maintain major financial services technology hubs:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600">
            <li>
              <strong>Goldman Sachs:</strong> Bengaluru centre operates core quantitative engineering; Hyderabad centre launched in 2021 focused on global engineering. <span className="text-indigo-600 underline cursor-pointer">[Claim ID: #CLM-0104]</span>
            </li>
            <li>
              <strong>JPMorgan Chase:</strong> Tech centres in Bengaluru, Hyderabad, and Mumbai drive large-scale software engineering. <span className="text-indigo-600 underline cursor-pointer">[Claim ID: #CLM-0112]</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
