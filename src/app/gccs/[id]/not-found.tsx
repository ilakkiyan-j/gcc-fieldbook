import Link from "next/link";
import { ArrowLeft, Building2, Search } from "lucide-react";

export default function GccNotFound() {
  return (
    <div className="rounded-xl border border-border-neutral bg-white p-8 sm:p-12 text-center max-w-xl mx-auto space-y-4 shadow-2xs">
      <div className="p-3 rounded-full bg-surface-subtle text-ink-muted w-fit mx-auto">
        <Building2 className="w-8 h-8 text-ink-secondary" />
      </div>
      <h2 className="font-heading font-bold text-xl text-ink">
        Capability Centre Not Found
      </h2>
      <p className="text-xs sm:text-sm text-ink-secondary max-w-md mx-auto leading-relaxed">
        We could not find an enterprise capability centre matching this identifier in our curated assessment dataset.
      </p>
      <div className="pt-2">
        <Link
          href="/gccs"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand text-white text-xs font-semibold hover:bg-brand-hover transition-colors shadow-2xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to GCC Explorer</span>
        </Link>
      </div>
    </div>
  );
}
