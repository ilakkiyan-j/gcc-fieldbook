import { describe, it, expect } from "vitest";
import { repository } from "@/lib/data/repository";

describe("GCC Profile & Evidence Drawer Contracts (Checkpoint 3D)", () => {
  it("should resolve valid GCC profile by slug with company and city relations", async () => {
    const centre = await repository.getGccByIdOrSlug("goldman-sachs-bengaluru");
    expect(centre).not.toBeNull();
    expect(centre?.display_name).toBe("Goldman Sachs Bengaluru Technology Center");
    expect(centre?.company?.name).toBe("Goldman Sachs");
    expect(centre?.city?.name).toBe("Bengaluru");
    expect(centre?.sector).toBe("Banking & Financial Services");
    expect(centre?.setup_year).toBe(2004);
  });

  it("should hydrate claim-level evidence with verified and estimated statuses", async () => {
    const centre = await repository.getGccByIdOrSlug("goldman-sachs-bengaluru");
    expect(centre?.claims).toBeDefined();
    expect(centre?.claims?.length).toBeGreaterThanOrEqual(2);

    const statuses = centre?.claims?.map((c) => c.evidence_status);
    expect(statuses).toContain("estimated");
    expect(statuses).toContain("conflicting");

    // Check source join
    const claimWithSource = centre?.claims?.find((c) => c.source);
    expect(claimWithSource?.source?.title).toBeTruthy();
    expect(claimWithSource?.source?.url).toMatch(/^https?:\/\//);
    expect(claimWithSource?.checked_at).toBeTruthy();
  });

  it("should resolve Boeing profile and campus footprint claim", async () => {
    const boeing = await repository.getGccByIdOrSlug("boeing-bietc-bengaluru");
    expect(boeing).not.toBeNull();
    expect(boeing?.display_name).toContain("Boeing");
    expect(boeing?.company?.headquarters_country).toBe("United States");

    const footprintClaim = boeing?.claims?.find((c) => c.field_key === "campus_scale");
    expect(footprintClaim).toBeDefined();
    expect(footprintClaim?.evidence_status).toBe("verified");
    expect(footprintClaim?.value_text).toContain("43-acre");
  });

  it("should return null for non-existent centre ID or slug", async () => {
    const nonExistent = await repository.getGccByIdOrSlug("non-existent-facility-slug");
    expect(nonExistent).toBeNull();
  });
});
