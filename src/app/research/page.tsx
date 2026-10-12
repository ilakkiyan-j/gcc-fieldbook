import React from "react";
import { Metadata } from "next";
import { ResearchClient } from "@/components/research/ResearchClient";

export const metadata: Metadata = {
  title: "AI Research Copilot — GCC Fieldbook",
  description:
    "Evidence-bound AI Copilot for interrogating India's GCC ecosystem with server-validated citations and zero-hallucination grounding.",
};

export default function ResearchPage() {
  return <ResearchClient />;
}
