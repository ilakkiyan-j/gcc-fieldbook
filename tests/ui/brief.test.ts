import { describe, it, expect } from "vitest";
import { generateDecisionBrief, BriefConfig } from "@/lib/brief/generator";
import { SEED_CENTRES, SEED_POLICIES } from "@/lib/data/seed-data";

describe("Executive Decision Brief Generation (Phase 6)", () => {
  const baseConfig: BriefConfig = {
    objective: "ai-expansion",
    selectedHubs: ["bengaluru", "hyderabad"],
    selectedCapabilities: ["Quantitative Finance", "Avionics Engineering"],
  };

  it("should generate a structured brief with all required executive sections", () => {
    const brief = generateDecisionBrief(baseConfig, SEED_CENTRES, SEED_POLICIES);

    expect(brief.title).toContain("AI & Quantitative");
    expect(brief.markdown).toContain("## 1. Executive Summary & Strategic Finding");
    expect(brief.markdown).toContain("## 2. Comparative Telemetry & Indicator Benchmark");
    expect(brief.markdown).toContain("## 3. Enacted State Policy Frameworks");
    expect(brief.markdown).toContain("## 4. Preserved Divergences & Data Trust Disclosures");
    expect(brief.markdown).toContain("## 5. Sourced Citations Ledger");
    expect(brief.markdown).toContain("## 6. Actionable 3-Phase Advisory Diligence Playbook");
  });

  it("should embed valid primary claim codes in the markdown body", () => {
    const brief = generateDecisionBrief(baseConfig, SEED_CENTRES, SEED_POLICIES);

    expect(brief.markdown).toContain("[CLM-GS-01]");
    expect(brief.markdown).toContain("[CLM-BA-01]");
    expect(brief.markdown).toContain("[CLM-IND-01]");
    expect(brief.markdown).toContain("[CLM-IND-02]");
    expect(brief.citations.length).toBeGreaterThanOrEqual(4);
  });

  it("should adapt strategic findings based on chosen objective", () => {
    const leaseConfig: BriefConfig = {
      ...baseConfig,
      objective: "lease-optimization",
    };
    const leaseBrief = generateDecisionBrief(leaseConfig, SEED_CENTRES, SEED_POLICIES);

    expect(leaseBrief.title).toContain("Real Estate");
    expect(leaseBrief.markdown).toContain("rental discount");

    const policyConfig: BriefConfig = {
      ...baseConfig,
      objective: "policy-evaluation",
    };
    const policyBrief = generateDecisionBrief(policyConfig, SEED_CENTRES, SEED_POLICIES);
    expect(policyBrief.title).toContain("State Fiscal Subsidy");
  });
});
