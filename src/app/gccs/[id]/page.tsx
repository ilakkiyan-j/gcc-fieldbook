import Link from "next/link";
import { ArrowLeft, Building2, CheckCircle2, ExternalLink, Calendar } from "lucide-react";
import { StatusBadge } from "@/components/shared/StatusBadge";

interface GccDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function GccDetailPage({ params }: GccDetailPageProps) {
  const { id } = await params;
  const decodedId = decodeURIComponent(id);

  return (
    <div className="space-y-8">
      {/* Back button */}
      <div>
        <Link
          href="/gccs"
          className="inline-flex items-center text-xs font-medium text-slate-500 hover:text-slate-900"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to GCC Explorer
        </Link>
      </div>

      {/* Header Profile */}
      <div className="p-6 bg-white rounded-lg border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold text-slate-900 capitalize">
                {decodedId.replace(/-/g, " ")}
              </h1>
              <StatusBadge status="verified" />
            </div>
            <p className="text-sm text-slate-500">
              Parent Entity: <span className="font-medium text-slate-800">{decodedId.replace(/-/g, " ").toUpperCase()} Global</span> &bull; Indian Legal Unit: Services Private Limited
            </p>
          </div>
          <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded border border-slate-200">
            Phase 1 Neutral Detail View
          </span>
        </div>
      </div>

      {/* Claim-Level Evidence Panel */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-900 flex items-center">
          <CheckCircle2 className="w-5 h-5 mr-2 text-emerald-600" />
          Field-Level Claims & Sourced Evidence (Data Trust ADR-006)
        </h2>

        <div className="bg-white rounded-lg border border-slate-200 shadow-sm divide-y divide-slate-200">
          {/* Claim 1 */}
          <div className="p-5 space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Setup Year & Operations Start
              </div>
              <StatusBadge status="verified" />
            </div>
            <div className="text-sm text-slate-900 font-medium">
              Established Bengaluru technology centre in 2004; expanded to Hyderabad in 2021.
            </div>
            <div className="text-xs text-slate-500 flex items-center gap-4 pt-1">
              <span className="flex items-center">
                <Calendar className="w-3.5 h-3.5 mr-1" /> Checked: 2026-02-15
              </span>
              <a
                href="https://example.com/company-announcement"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center text-indigo-600 hover:underline"
              >
                Official Corporate Release <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </div>
          </div>

          {/* Claim 2 */}
          <div className="p-5 space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                India Headcount
              </div>
              <StatusBadge status="estimated" />
            </div>
            <div className="text-sm text-slate-900 font-medium">
              Estimated 8,500 – 9,200 professionals across Bengaluru and Hyderabad facilities.
            </div>
            <div className="text-xs text-slate-500 flex items-center gap-4 pt-1">
              <span className="flex items-center">
                <Calendar className="w-3.5 h-3.5 mr-1" /> Checked: 2026-03-01
              </span>
              <a
                href="https://example.com/industry-report"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center text-indigo-600 hover:underline"
              >
                NASSCOM / Industry Sourced Benchmark <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </div>
          </div>

          {/* Claim 3 */}
          <div className="p-5 space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Specialized AI/ML Capabilities
              </div>
              <StatusBadge status="verified" />
            </div>
            <div className="text-sm text-slate-900 font-medium">
              Core quantitative architecture, algorithmic model development, and cloud platform engineering.
            </div>
            <div className="text-xs text-slate-500 flex items-center gap-4 pt-1">
              <span className="flex items-center">
                <Calendar className="w-3.5 h-3.5 mr-1" /> Checked: 2026-01-20
              </span>
              <a
                href="https://example.com/tech-symposium"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center text-indigo-600 hover:underline"
              >
                Global Engineering Center Overview <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
