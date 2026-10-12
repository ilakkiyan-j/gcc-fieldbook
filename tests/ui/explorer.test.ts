import { describe, it, expect } from "vitest";
import { repository } from "@/lib/data/repository";

describe("GCC Explorer Search & Filter Contracts (Checkpoint 3C)", () => {
  it("should fetch all seeded centres when no filter is applied", async () => {
    const res = await repository.getGccs({ pageSize: 100 });
    expect(res.data.length).toBeGreaterThanOrEqual(4);
    expect(res.total).toBeGreaterThanOrEqual(4);
  });

  it("should filter centres by keyword across centre name, company, and functions", async () => {
    // 1. Company name query
    const boeingRes = await repository.getGccs({ q: "Boeing" });
    expect(boeingRes.total).toBe(1);
    expect(boeingRes.data[0].display_name).toContain("Boeing");

    // 2. Multi-centre company query
    const gsRes = await repository.getGccs({ q: "Goldman" });
    expect(gsRes.total).toBe(2);

    // 3. Capability function query
    const avionicsRes = await repository.getGccs({ q: "Avionics" });
    expect(avionicsRes.total).toBe(1);
    expect(avionicsRes.data[0].display_name).toContain("Boeing");
  });

  it("should filter centres by city slug accurately", async () => {
    const hydRes = await repository.getGccs({ city: "hyderabad" });
    expect(hydRes.data.length).toBe(1);
    expect(hydRes.data[0].city?.slug).toBe("hyderabad");
    expect(hydRes.data[0].city?.name).toBe("Hyderabad");

    const blrRes = await repository.getGccs({ city: "bengaluru" });
    expect(blrRes.data.length).toBeGreaterThanOrEqual(3);
    blrRes.data.forEach((c) => {
      expect(c.city?.slug).toBe("bengaluru");
    });
  });

  it("should filter centres by sector", async () => {
    const aeroRes = await repository.getGccs({ sector: "Aerospace & Defense" });
    expect(aeroRes.total).toBe(1);
    expect(aeroRes.data[0].sector).toBe("Aerospace & Defense");

    const retailRes = await repository.getGccs({ sector: "Retail & Consumer Goods" });
    expect(retailRes.total).toBe(1);
    expect(retailRes.data[0].company?.name).toBe("Target");
  });

  it("should return empty array for non-matching queries without crashing", async () => {
    const emptyRes = await repository.getGccs({ q: "NonExistentCompanyXYZ123" });
    expect(emptyRes.total).toBe(0);
    expect(emptyRes.data.length).toBe(0);
  });
});
