import { describe, it, expect } from "vitest";
import { repository } from "@/lib/data/repository";

describe("Dashboard Data Contracts & Calculations (Checkpoint 3B)", () => {
  it("should compute accurate evidence distribution statistics", async () => {
    const stats = await repository.getEvidenceStats();

    expect(stats.total).toBeGreaterThanOrEqual(7);
    expect(stats.verified).toBeGreaterThanOrEqual(1);
    expect(stats.estimated).toBeGreaterThanOrEqual(1);
    expect(stats.conflicting).toBeGreaterThanOrEqual(1);
    expect(stats.unknown).toBeGreaterThanOrEqual(1);

    // Verify percentages sum to 100% (within rounding tolerance)
    const sum =
      stats.verifiedPercent +
      stats.estimatedPercent +
      stats.conflictingPercent +
      stats.unknownPercent;
    expect(sum).toBeGreaterThanOrEqual(99);
    expect(sum).toBeLessThanOrEqual(101);
  });

  it("should supply non-empty featured GCC centres with city relations and functions", async () => {
    const { data } = await repository.getGccs({ pageSize: 4 });
    expect(data.length).toBeGreaterThanOrEqual(4);

    for (const centre of data) {
      expect(centre.id).toBeDefined();
      expect(centre.display_name).toBeTruthy();
      expect(centre.city).toBeDefined();
      expect(centre.city?.name).toBeTruthy();
      expect(centre.functions.length).toBeGreaterThan(0);
      expect(centre.setup_year).toBeGreaterThan(1990);
    }
  });

  it("should provide consistent overview metrics for metric cards", async () => {
    const metrics = await repository.getOverviewMetrics();
    expect(metrics.gccCentreCount).toBeGreaterThanOrEqual(4);
    expect(metrics.cityCount).toBe(2);
    expect(metrics.claimCount).toBeGreaterThanOrEqual(7);
    expect(metrics.sourceCount).toBeGreaterThanOrEqual(6);
  });
});
