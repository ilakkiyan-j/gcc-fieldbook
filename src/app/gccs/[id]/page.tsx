import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { ArrowLeft, Sparkles, ArrowRight } from "lucide-react";
import { repository } from "@/lib/data/repository";
import { ProfileHero } from "@/components/profile/ProfileHero";
import { ProfileKeyMetrics } from "@/components/profile/ProfileKeyMetrics";
import { EvidenceLedger } from "@/components/profile/EvidenceLedger";

interface GccDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: GccDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const centre = await repository.getGccByIdOrSlug(id);

  if (!centre) {
    return {
      title: "Centre Not Found — GCC Fieldbook",
    };
  }

  return {
    title: `${centre.display_name} — GCC Fieldbook`,
    description: `Verified intelligence profile, operational parameters, and citation ledger for ${centre.display_name} in ${centre.city?.name}.`,
  };
}

export default async function GccDetailPage({ params }: GccDetailPageProps) {
  const { id } = await params;
  const centre = await repository.getGccByIdOrSlug(id);

  if (!centre) {
    notFound();
  }

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      {/* Back Navigation Bar */}
      <div>
        <Link
          href="/gccs"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-secondary hover:text-brand transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to GCC Explorer</span>
        </Link>
      </div>

      {/* Hero Card */}
      <ProfileHero centre={centre} />

      {/* Parameter Cards Grid */}
      <ProfileKeyMetrics centre={centre} />

      {/* Claim-Level Evidence Ledger */}
      <EvidenceLedger claims={centre.claims} />

      {/* Cross-Module Synthesis Callout */}
      <div className="rounded-xl border border-border-neutral bg-linear-to-r from-emerald-50/60 via-white to-sky-50/40 p-5 sm:p-6 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-emerald-100 text-emerald-800 shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4 text-emerald-700" />
          </div>
          <div>
            <h4 className="font-heading font-bold text-sm sm:text-base text-ink">
              Query Evidence in AI Research Copilot
            </h4>
            <p className="text-xs text-ink-secondary mt-0.5">
              Ask deep questions comparing {centre.company?.name}&apos;s capability mandate against industry peers with transparent source validation.
            </p>
          </div>
        </div>
        <Link
          href="/research"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand text-white text-xs font-semibold hover:bg-brand-hover transition-colors shadow-2xs shrink-0 self-start sm:self-auto"
        >
          <span>Open Copilot</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
