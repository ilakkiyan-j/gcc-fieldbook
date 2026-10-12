import React, { Suspense } from "react";
import { Metadata } from "next";
import { repository } from "@/lib/data/repository";
import { GccExplorerClient } from "@/components/explorer/GccExplorerClient";

export const metadata: Metadata = {
  title: "GCC Explorer & Directory — GCC Fieldbook",
  description:
    "Explore, search, and filter verified India Global Capability Centres with source citations and capability breakdowns.",
};

export default async function GccExplorerPage() {
  // Fetch all centres from repository with joined companies, cities, and evidence claims
  const { data: centres } = await repository.getGccs({ pageSize: 100 });

  return (
    <Suspense
      fallback={
        <div className="space-y-6 animate-pulse">
          <div className="h-20 bg-white rounded-xl border border-border-neutral" />
          <div className="h-12 bg-white rounded-xl border border-border-neutral" />
          <div className="h-96 bg-white rounded-xl border border-border-neutral" />
        </div>
      }
    >
      <GccExplorerClient centres={centres} />
    </Suspense>
  );
}
