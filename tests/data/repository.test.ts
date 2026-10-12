import { describe, it, expect } from "vitest";
import { repository } from "@/lib/data/repository";

describe("DataRepository Integration & Contract Tests", () => {
  it("should return valid data-driven overview metrics", async () => {
    const metrics = await repository.getOverviewMetrics();
    expect(metrics.gccCentreCount).toBeGreaterThanOrEqual(4);
    expect(metrics.companyCount).toBeGreaterThanOrEqual(4);
    expect(metrics.cityCount).toBeGreaterThanOrEqual(2);
    expect(metrics.sourceCount).toBeGreaterThanOrEqual(4);
    expect(metrics.claimCount).toBeGreaterThanOrEqual(5);
    expect(metrics.coverageLabel).toBeDefined();
  });

  it("should query GCC centres with filtering and pagination", async () => {
    const all = await repository.getGccs();
    expect(all.total).toBeGreaterThanOrEqual(4);
    expect(all.data.length).toBeGreaterThanOrEqual(4);

    // Search filter
    const searchRes = await repository.getGccs({ q: "Goldman" });
    expect(searchRes.total).toBe(2);
    expect(searchRes.data[0].display_name).toContain("Goldman Sachs");

    // City filter
    const cityRes = await repository.getGccs({ city: "hyderabad" });
    expect(cityRes.data.length).toBe(1);
    expect(cityRes.data[0].city?.name).toBe("Hyderabad");

    // Sector filter
    const sectorRes = await repository.getGccs({ sector: "Aerospace & Defense" });
    expect(sectorRes.data.length).toBe(1);
    expect(sectorRes.data[0].display_name).toContain("Boeing");
  });

  it("should return a single GCC profile with claim-level evidence and joined sources", async () => {
    const centre = await repository.getGccByIdOrSlug("goldman-sachs-bengaluru");
    expect(centre).not.toBeNull();
    expect(centre?.display_name).toBe("Goldman Sachs Bengaluru Technology Center");
    expect(centre?.company?.name).toBe("Goldman Sachs");
    expect(centre?.city?.name).toBe("Bengaluru");

    // Verify claim-level evidence
    expect(centre?.claims).toBeDefined();
    expect(centre?.claims?.length).toBeGreaterThanOrEqual(2);

    const verifiedOrEstimatedClaim = centre?.claims?.[0];
    expect(verifiedOrEstimatedClaim?.source).toBeDefined();
    expect(verifiedOrEstimatedClaim?.source?.url).toMatch(/^https?:\/\//);
    expect(verifiedOrEstimatedClaim?.checked_at).toBeDefined();
  });

  it("should return null for non-existent GCC identifier", async () => {
    const nonExistent = await repository.getGccByIdOrSlug("non-existent-company-centre");
    expect(nonExistent).toBeNull();
  });

  it("should return like-for-like city comparison matrix without fabricating zeroes", async () => {
    const comparison = await repository.getCityComparison(["bengaluru", "hyderabad"]);
    expect(comparison.cities.length).toBe(2);
    expect(comparison.indicators.length).toBeGreaterThanOrEqual(2);

    const rentIndicator = comparison.indicators.find((i) => i.key === "office_rent");
    expect(rentIndicator).toBeDefined();
    expect(rentIndicator?.unit).toBe("INR / sq ft / month");
    expect(rentIndicator?.period).toBe("Q4 2025");
    expect(rentIndicator?.values["bengaluru"].value).toContain("₹95");
    expect(rentIndicator?.values["hyderabad"].value).toContain("₹75");
    expect(rentIndicator?.sourceUrl).toBeDefined();

    // Verify policy comparison
    expect(comparison.policies.length).toBe(2);
    const karnatakaPolicy = comparison.policies.find((p) => p.state_or_authority === "Karnataka");
    expect(karnatakaPolicy?.title).toContain("Karnataka GCC Policy");
  });

  it("should preserve conflicting and unknown evidence statuses (ADR-005, ADR-006)", async () => {
    const centre = await repository.getGccByIdOrSlug("goldman-sachs-bengaluru");
    const conflictingClaim = centre?.claims?.find((c) => c.evidence_status === "conflicting");
    expect(conflictingClaim).toBeDefined();
    expect(conflictingClaim?.conflict_group_id).toBe("CONF-GS-HC");
  });
});
