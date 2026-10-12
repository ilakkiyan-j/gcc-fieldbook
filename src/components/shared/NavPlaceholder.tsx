import Link from "next/link";
import { Compass, Building2, MapPin, Sparkles, FileText, Activity } from "lucide-react";

export function NavPlaceholder() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
              GF
            </div>
            <div>
              <Link href="/" className="font-semibold text-slate-900 hover:text-slate-700">
                GCC Fieldbook
              </Link>
              <span className="ml-2 text-xs text-slate-500 font-mono">
                [Phase 1 Temporary Shell]
              </span>
            </div>
          </div>

          <nav className="flex items-center space-x-1 sm:space-x-2 text-sm">
            <Link
              href="/"
              className="flex items-center px-3 py-1.5 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
              <Compass className="w-4 h-4 mr-1.5" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/gccs"
              className="flex items-center px-3 py-1.5 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
              <Building2 className="w-4 h-4 mr-1.5" />
              <span>Explorer</span>
            </Link>
            <Link
              href="/locations"
              className="flex items-center px-3 py-1.5 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
              <MapPin className="w-4 h-4 mr-1.5" />
              <span>Locations</span>
            </Link>
            <Link
              href="/research"
              className="flex items-center px-3 py-1.5 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
              <Sparkles className="w-4 h-4 mr-1.5" />
              <span>Research Copilot</span>
            </Link>
            <Link
              href="/brief"
              className="flex items-center px-3 py-1.5 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
              <FileText className="w-4 h-4 mr-1.5" />
              <span>Decision Brief</span>
            </Link>
            <Link
              href="/api/health"
              target="_blank"
              className="flex items-center px-2 py-1 rounded text-xs text-slate-400 hover:text-slate-600"
              title="System Health API"
            >
              <Activity className="w-3.5 h-3.5 mr-1" />
              <span>Health</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
