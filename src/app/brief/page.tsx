import { FileText, Copy, Download, AlertCircle, CheckCircle2 } from "lucide-react";
import { StatusBadge } from "@/components/shared/StatusBadge";

export default function DecisionBriefPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center">
            <FileText className="w-6 h-6 mr-2 text-slate-700" />
            Decision Brief Generator
          </h1>
          <p className="text-sm text-slate-600">
            Exportable executive synthesis with citations, assumptions, conflicts, and unanswered questions.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            disabled
            className="inline-flex items-center px-3 py-1.5 border border-slate-200 rounded text-xs font-medium text-slate-500 bg-slate-50 cursor-not-allowed"
          >
            <Copy className="w-3.5 h-3.5 mr-1" /> Copy Markdown
          </button>
          <button
            disabled
            className="inline-flex items-center px-3 py-1.5 border border-slate-200 rounded text-xs font-medium text-slate-500 bg-slate-50 cursor-not-allowed"
          >
            <Download className="w-3.5 h-3.5 mr-1" /> Download .md
          </button>
        </div>
      </div>

      {/* Decision Brief Container */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="border-b border-slate-200 pb-4 flex justify-between items-center">
          <div>
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              GCC Fieldbook Brief #2026-DEMO-01
            </span>
            <h2 className="text-xl font-bold text-slate-900 mt-1">
              Location Evaluation: Bengaluru vs Hyderabad for Banking Tech GCC
            </h2>
          </div>
          <StatusBadge status="verified" />
        </div>

        {/* Section 1: Executive Findings */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900 flex items-center">
            <CheckCircle2 className="w-4 h-4 mr-1.5 text-emerald-600" /> 1. Key Findings
          </h3>
          <p className="text-sm text-slate-700 leading-relaxed">
            Bengaluru provides a deeper specialized talent pool for senior quantitative finance and architecture roles, while Hyderabad offers competitive Grade-A commercial leasing discounts (~20–25% lower rent) and dedicated state single-window clearance under the Telangana ICT Policy.
          </p>
        </div>

        {/* Section 2: Transparent Conflicts & Unknowns */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900 flex items-center">
            <AlertCircle className="w-4 h-4 mr-1.5 text-amber-600" /> 2. Identified Conflicts & Unknowns (Data Trust)
          </h3>
          <div className="p-3 bg-amber-50 rounded border border-amber-200 text-xs text-amber-900 space-y-1">
            <p>
              &bull; <strong>Headcount discrepancy:</strong> Public company announcements cite ~9,000 employees; secondary industry reports cite ~8,200. Sourced as an estimate range.
            </p>
            <p>
              &bull; <strong>Power tariff benchmarks:</strong> Commercial utility tariffs for FY2026 are currently missing in the curated dataset and require local utility verification.
            </p>
          </div>
        </div>

        {/* Section 3: Next Open Research Questions */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900">
            3. Follow-up Advisory Questions
          </h3>
          <ul className="list-disc pl-5 text-xs text-slate-600 space-y-1">
            <li>What are the exact statutory audit filing dates for the local legal operating entity?</li>
            <li>Does the state fiscal incentive require a minimum job creation threshold within 36 months?</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
