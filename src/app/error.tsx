"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error captured:", error);
  }, [error]);

  return (
    <div className="max-w-xl mx-auto my-12 p-6 bg-white rounded-lg border border-rose-200 shadow-sm space-y-4">
      <div className="flex items-center space-x-3 text-rose-600">
        <AlertTriangle className="w-6 h-6" />
        <h2 className="text-lg font-semibold">Something went wrong</h2>
      </div>
      <p className="text-sm text-slate-600">
        An error occurred while loading this view. The system handles errors gracefully without crashing the shell.
      </p>
      {error.message && (
        <div className="p-3 bg-slate-50 rounded border border-slate-200 font-mono text-xs text-slate-700">
          {error.message}
        </div>
      )}
      <div className="pt-2">
        <button
          onClick={() => reset()}
          className="inline-flex items-center px-4 py-2 border border-slate-300 rounded-md shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Try Again
        </button>
      </div>
    </div>
  );
}
