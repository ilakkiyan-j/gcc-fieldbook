import { describe, it, expect } from "vitest";
import { repository } from "@/lib/data/repository";

describe("Location Intelligence & Comparison Matrix (Phase 4)", () => {
  it("should return side-by-side comparison for Bengaluru and Hyderabad", async () => {
    const comparison = await repository.getCityComparison(["bengaluru", "hyderabad"]);

    expect(comparison.cities.length).toBe(2);
    const citySlugs = comparison.cities.map((c) => c.slug);
    expect(citySlugs).toContain("bengaluru");
    expect(citySlugs).toContain("hyderabad");
  });

  it("should preserve units, periods, and distinct micro-market values for office rent", async () => {
    const comparison = await repository.getCityComparison(["bengaluru", "hyderabad"]);
    const rentInd = comparison.indicators.find((i) => i.key === "office_rent");

    expect(rentInd).toBeDefined();
    expect(rentInd?.unit).toBe("INR / sq ft / month");
    expect(rentInd?.period).toBe("Q4 2025");
    expect(rentInd?.sourceTitle).toBeTruthy();

    // Check Bengaluru
    const blrRent = rentInd?.values["bengaluru"];
    expect(blrRent?.value).toBe("₹95 – ₹130");
    expect(blrRent?.numeric).toBe(115);
    expect(blrRent?.comparability).toContain("Outer Ring Road");

    // Check Hyderabad
    const hydRent = rentInd?.values["hyderabad"];
    expect(hydRent?.value).toBe("₹75 – ₹95");
    expect(hydRent?.numeric).toBe(85);
    expect(hydRent?.comparability).toContain("HITEC City");
  });

  it("should preserve units and non-zero counts for talent pool density", async () => {
    const comparison = await repository.getCityComparison(["bengaluru", "hyderabad"]);
    const talentInd = comparison.indicators.find((i) => i.key === "talent_pool");

    expect(talentInd).toBeDefined();
    expect(talentInd?.unit).toBe("headcount");
    expect(talentInd?.period).toBe("FY 2025");

    const blrTalent = talentInd?.values["bengaluru"];
    expect(blrTalent?.numeric).toBe(1500000);

    const hydTalent = talentInd?.values["hyderabad"];
    expect(hydTalent?.numeric).toBe(900000);
  });

  it("should hydrate enacted state policy frameworks with authority and sources", async () => {
    const comparison = await repository.getCityComparison(["bengaluru", "hyderabad"]);
    expect(comparison.policies.length).toBeGreaterThanOrEqual(2);

    const kaPolicy = comparison.policies.find((p) => p.state_or_authority === "Karnataka");
    expect(kaPolicy).toBeDefined();
    expect(kaPolicy?.title).toContain("Karnataka GCC Policy");
    expect(kaPolicy?.issuing_authority).toContain("IT, BT");
    expect(kaPolicy?.source).toBeDefined();
    expect(kaPolicy?.source?.url).toMatch(/^https?:\/\//);

    const tgPolicy = comparison.policies.find((p) => p.state_or_authority === "Telangana");
    expect(tgPolicy).toBeDefined();
    expect(tgPolicy?.title).toContain("Telangana ICT Policy");
    expect(tgPolicy?.source).toBeDefined();
  });
});
