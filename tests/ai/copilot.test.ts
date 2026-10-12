import { describe, it, expect } from "vitest";
import { validateCitations, executeResearchCopilot } from "@/lib/ai/copilot";
import { EvidenceClaim } from "@/types/domain";

describe("AI Research Copilot RAG & Citation Validation (Phase 5)", () => {
  const sampleClaims: EvidenceClaim[] = [
    {
      id: "e1000000-0000-0000-0000-000000000001",
      claim_code: "CLM-GS-01",
      source_id: "s1000000-0000-0000-0000-000000000001",
      field_key: "setup_year",
      value_text: "2021",
      evidence_status: "verified",
      checked_at: "2026-03-01",
    },
    {
      id: "e1000000-0000-0000-0000-000000000004",
      claim_code: "CLM-BA-01",
      source_id: "s1000000-0000-0000-0000-000000000002",
      field_key: "campus_scale",
      value_text: "43-acre campus in Devanahalli",
      evidence_status: "verified",
      checked_at: "2026-02-15",
    },
  ];

  it("should validate and retain existing citations in text", () => {
    const text = "Goldman Sachs expanded to Hyderabad in 2021 [CLM-GS-01] and Boeing opened a campus [CLM-BA-01].";
    const result = validateCitations(text, sampleClaims);

    expect(result.validatedText).toContain("[CLM-GS-01]");
    expect(result.validatedText).toContain("[CLM-BA-01]");
    expect(result.matchingClaims.length).toBe(2);
    expect(result.matchingClaims[0].claim_code).toBe("CLM-GS-01");
  });

  it("should strip hallucinated or invalid citation codes (ADR-008)", () => {
    const text = "A fake claim was made here [CLM-FAKE-99] and a real one [CLM-GS-01].";
    const result = validateCitations(text, sampleClaims);

    expect(result.validatedText).not.toContain("[CLM-FAKE-99]");
    expect(result.validatedText).toContain("[CLM-GS-01]");
    expect(result.matchingClaims.length).toBe(1);
  });

  it("should handle out-of-scope queries with transparent sample limitation disclosure", async () => {
    const result = await executeResearchCopilot("How many GCCs does Walmart have in Chennai or Pune?");

    expect(result.answer).toContain("curated assessment dataset");
    expect(result.answer).toContain("Bengaluru and Hyderabad");
    expect(result.isFallback).toBe(true);
  });

  it("should execute synthesis and return citations for valid queries", async () => {
    const result = await executeResearchCopilot("Which GCCs operate quantitative finance in Bengaluru?");

    expect(result.answer.length).toBeGreaterThan(20);
    expect(result.retrievedCount).toBeGreaterThanOrEqual(2);
    expect(result.model).toBeDefined();
  });
});
