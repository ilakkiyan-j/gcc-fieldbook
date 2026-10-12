import { MapPin, Info, ExternalLink } from "lucide-react";
import { StatusBadge } from "@/components/shared/StatusBadge";

export default function LocationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center">
            <MapPin className="w-6 h-6 mr-2 text-slate-700" />
            Location Intelligence & City Comparison
          </h1>
          <p className="text-sm text-slate-600">
            Compare Indian tech hubs on like-for-like office benchmarks, talent availability, and state policy incentives.
          </p>
        </div>
        <div className="text-xs bg-slate-100 text-slate-600 px-3 py-1.5 rounded border border-slate-200">
          Status: <span className="font-semibold text-slate-900">Phase 1 Neutral Placeholder</span>
        </div>
      </div>

      {/* Methodology notice */}
      <div className="p-4 bg-white rounded-lg border border-slate-200 shadow-sm flex items-start space-x-3 text-xs text-slate-600">
        <Info className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
        <div>
          <span className="font-semibold text-slate-800">Methodology & Comparability Notice (ADR-021):</span> Benchmarks reflect specific commercial micro-markets and observation periods. Indicators must not be compared across different unit definitions or unstated years.
        </div>
      </div>

      {/* Comparison Matrix Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-700 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3">Indicator & Unit</th>
              <th className="px-6 py-3">Observation Period</th>
              <th className="px-6 py-3">Bengaluru (ORR / Whitefield)</th>
              <th className="px-6 py-3">Hyderabad (HITEC City / Madhapur)</th>
              <th className="px-6 py-3">Source Reference</th>
            </tr>
          </thead>
        <tbody className="divide-y divide-slate-200">
          <tr>
            <td className="px-6 py-4 font-medium text-slate-900">
              Grade-A Office Gross Rent (INR / sq ft / mo)
            </td>
            <td className="px-6 py-4 text-xs font-mono text-slate-500">Q4 2025</td>
            <td className="px-6 py-4 font-semibold text-slate-900">₹95 – ₹130</td>
            <td className="px-6 py-4 font-semibold text-slate-900">₹75 – ₹95</td>
            <td className="px-6 py-4 text-xs">
              <span className="text-indigo-600 hover:underline cursor-pointer inline-flex items-center">
                JLL / CBRE Market Track <ExternalLink className="w-3 h-3 ml-1" />
              </span>
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 font-medium text-slate-900">
              Tech & AI Talent Concentration (Est. Pool)
            </td>
            <td className="px-6 py-4 text-xs font-mono text-slate-500">FY 2025</td>
            <td className="px-6 py-4 font-semibold text-slate-900">~1,500,000+</td>
            <td className="px-6 py-4 font-semibold text-slate-900">~900,000+</td>
            <td className="px-6 py-4 text-xs">
              <span className="text-indigo-600 hover:underline cursor-pointer inline-flex items-center">
                NASSCOM Talent Matrix <ExternalLink className="w-3 h-3 ml-1" />
              </span>
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 font-medium text-slate-900">
              State GCC / AI Incentive Policy Status
            </td>
            <td className="px-6 py-4 text-xs font-mono text-slate-500">Effective 2024-2029</td>
            <td className="px-6 py-4">
              <StatusBadge status="verified" />
              <div className="text-xs text-slate-500 mt-1">Karnataka GCC Policy 2024</div>
            </td>
            <td className="px-6 py-4">
              <StatusBadge status="verified" />
              <div className="text-xs text-slate-500 mt-1">Telangana ICT Policy 2.0</div>
            </td>
            <td className="px-6 py-4 text-xs">
              <span className="text-indigo-600 hover:underline cursor-pointer inline-flex items-center">
                Dept of Electronics & IT <ExternalLink className="w-3 h-3 ml-1" />
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  );
}
