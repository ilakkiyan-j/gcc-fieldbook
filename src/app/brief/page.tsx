import React from "react";
import { Metadata } from "next";
import { repository } from "@/lib/data/repository";
import { BriefClient } from "@/components/brief/BriefClient";

export const metadata: Metadata = {
  title: "Executive Decision Brief Generator — GCC Fieldbook",
  description:
    "Generate and export audit-ready executive intelligence briefs for India's GCC corridors with transparent citations, benchmark tables, and state policy analyses.",
};

export default async function DecisionBriefPage() {
  const [gccsResult, comparison] = await Promise.all([
    repository.getGccs({ pageSize: 100 }),
    repository.getCityComparison(["bengaluru", "hyderabad"]),
  ]);

  return (
    <BriefClient
      initialCentres={gccsResult.data}
      policies={comparison.policies}
    />
  );
}
