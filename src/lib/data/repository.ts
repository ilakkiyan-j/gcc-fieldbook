import {
  GccCentre,
  Company,
  City,
  CityIndicator,
  Source,
  EvidenceClaim,
  Policy,
  OverviewMetrics,
  GccFilterParams,
} from "@/types/domain";
import {
  SEED_CITIES,
  SEED_COMPANIES,
  SEED_CENTRES,
  SEED_SOURCES,
  SEED_CITY_INDICATORS,
  SEED_EVIDENCE_CLAIMS,
  SEED_POLICIES,
} from "./seed-data";
import { getSupabaseServerClient } from "@/lib/supabase/server";

// Helper to hydrate in-memory entities with relations
function hydrateCentre(centre: GccCentre): GccCentre {
  const company = SEED_COMPANIES.find((c) => c.id === centre.company_id);
  const city = SEED_CITIES.find((c) => c.id === centre.city_id);
  const claims = SEED_EVIDENCE_CLAIMS.filter(
    (claim) => claim.centre_id === centre.id || claim.company_id === centre.company_id
  ).map((claim) => ({
    ...claim,
    source: SEED_SOURCES.find((s) => s.id === claim.source_id),
  }));

  return {
    ...centre,
    company,
    city,
    claims,
  };
}

export class DataRepository {
  /**
   * Returns data-driven metrics for Dashboard
   */
  async getOverviewMetrics(): Promise<OverviewMetrics> {
    const supabase = getSupabaseServerClient();
    if (supabase) {
      try {
        const [{ count: centresCount }, { count: companiesCount }, { count: citiesCount }, { count: sourcesCount }, { count: claimsCount }] =
          await Promise.all([
            supabase.from("gcc_centres").select("*", { count: "exact", head: true }),
            supabase.from("companies").select("*", { count: "exact", head: true }),
            supabase.from("cities").select("*", { count: "exact", head: true }),
            supabase.from("sources").select("*", { count: "exact", head: true }),
            supabase.from("evidence_claims").select("*", { count: "exact", head: true }),
          ]);

        if (centresCount !== null && centresCount > 0) {
          return {
            gccCentreCount: centresCount,
            companyCount: companiesCount || 0,
            cityCount: citiesCount || 0,
            sourceCount: sourcesCount || 0,
            claimCount: claimsCount || 0,
            coverageLabel: "Hosted Supabase Curated Dataset",
          };
        }
      } catch (err) {
        console.warn("Supabase overview fetch failed, using canonical local seed:", err);
      }
    }

    return {
      gccCentreCount: SEED_CENTRES.length,
      companyCount: SEED_COMPANIES.length,
      cityCount: SEED_CITIES.length,
      sourceCount: SEED_SOURCES.length,
      claimCount: SEED_EVIDENCE_CLAIMS.length,
      coverageLabel: "Curated Prototype Dataset (Seed)",
    };
  }

  /**
   * Search and filter GCC centres
   */
  async getGccs(params: GccFilterParams = {}): Promise<{ data: GccCentre[]; total: number }> {
    const { q, city, sector, function: func, page = 1, pageSize = 20 } = params;

    const supabase = getSupabaseServerClient();
    if (supabase) {
      try {
        let query = supabase.from("gcc_centres").select("*, company:companies(*), city:cities(*)", { count: "exact" });

        if (q) {
          query = query.ilike("display_name", `%${q}%`);
        }
        if (city) {
          query = query.eq("city.slug", city);
        }
        if (sector) {
          query = query.eq("sector", sector);
        }

        const from = (page - 1) * pageSize;
        const to = from + pageSize - 1;
        const { data, count, error } = await query.range(from, to);

        if (!error && data && data.length > 0) {
          return { data: data as GccCentre[], total: count || data.length };
        }
      } catch (err) {
        console.warn("Supabase getGccs query failed, falling back to local dataset:", err);
      }
    }

    // In-memory deterministic fallback
    let filtered = SEED_CENTRES.map(hydrateCentre);

    if (q) {
      const term = q.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.display_name.toLowerCase().includes(term) ||
          c.company?.name.toLowerCase().includes(term) ||
          c.functions.some((f) => f.toLowerCase().includes(term))
      );
    }

    if (city) {
      filtered = filtered.filter((c) => c.city?.slug.toLowerCase() === city.toLowerCase());
    }

    if (sector) {
      filtered = filtered.filter((c) => c.sector?.toLowerCase() === sector.toLowerCase());
    }

    if (func) {
      filtered = filtered.filter((c) =>
        c.functions.some((f) => f.toLowerCase() === func.toLowerCase())
      );
    }

    const total = filtered.length;
    const startIndex = (page - 1) * pageSize;
    const paginated = filtered.slice(startIndex, startIndex + pageSize);

    return { data: paginated, total };
  }

  /**
   * Get single GCC Centre profile by ID or slug with full claim-level evidence
   */
  async getGccByIdOrSlug(idOrSlug: string): Promise<GccCentre | null> {
    const supabase = getSupabaseServerClient();
    if (supabase) {
      try {
        const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(idOrSlug);
        const column = isUuid ? "id" : "slug";

        const { data: centre, error } = await supabase
          .from("gcc_centres")
          .select("*, company:companies(*), city:cities(*)")
          .eq(column, idOrSlug)
          .single();

        if (!error && centre) {
          // Fetch claims
          const { data: claims } = await supabase
            .from("evidence_claims")
            .select("*, source:sources(*)")
            .or(`centre_id.eq.${centre.id},company_id.eq.${centre.company_id}`);

          return {
            ...centre,
            claims: claims || [],
          } as GccCentre;
        }
      } catch (err) {
        console.warn("Supabase getGccByIdOrSlug failed, falling back to local dataset:", err);
      }
    }

    // Local fallback
    const target = SEED_CENTRES.find(
      (c) =>
        c.id === idOrSlug ||
        c.slug === idOrSlug ||
        c.slug.includes(idOrSlug) ||
        (c.company_id && SEED_COMPANIES.find((comp) => comp.id === c.company_id)?.slug === idOrSlug)
    );

    if (!target) return null;
    return hydrateCentre(target);
  }

  /**
   * Get all cities
   */
  async getCities(): Promise<City[]> {
    const supabase = getSupabaseServerClient();
    if (supabase) {
      try {
        const { data, error } = await supabase.from("cities").select("*").order("name");
        if (!error && data && data.length > 0) return data as City[];
      } catch (err) {
        console.warn("Supabase getCities failed, using seed:", err);
      }
    }
    return SEED_CITIES;
  }

  /**
   * Get Location Comparison Matrix for selected cities
   */
  async getCityComparison(citySlugs: string[] = ["bengaluru", "hyderabad"]): Promise<{
    cities: City[];
    indicators: Array<{
      key: string;
      label: string;
      unit: string;
      period: string;
      values: Record<string, { value: string; numeric?: number | null; comparability?: string | null }>;
      sourceTitle?: string;
      sourceUrl?: string;
    }>;
    policies: Policy[];
  }> {
    const activeCities = SEED_CITIES.filter((c) => citySlugs.includes(c.slug));

    // Indicators grouped by key
    const indicatorKeys = ["office_rent", "talent_pool"];
    const comparisonIndicators = indicatorKeys.map((key) => {
      const sample = SEED_CITY_INDICATORS.find((ind) => ind.indicator_key === key);
      const values: Record<string, { value: string; numeric?: number | null; comparability?: string | null }> = {};

      activeCities.forEach((city) => {
        const ind = SEED_CITY_INDICATORS.find(
          (i) => i.indicator_key === key && i.city_id === city.id
        );
        if (ind) {
          values[city.slug] = {
            value: ind.value_text,
            numeric: ind.value_numeric,
            comparability: ind.comparability_note,
          };
        } else {
          values[city.slug] = {
            value: "Insufficient comparable data",
            numeric: null,
          };
        }
      });

      // Find primary source
      const firstClaim = SEED_EVIDENCE_CLAIMS.find((c) =>
        sample ? c.city_indicator_id === sample.id : false
      );
      const source = firstClaim
        ? SEED_SOURCES.find((s) => s.id === firstClaim.source_id)
        : undefined;

      return {
        key,
        label: sample?.label || key,
        unit: sample?.unit || "",
        period: sample?.period_label || "",
        values,
        sourceTitle: source?.title,
        sourceUrl: source?.url,
      };
    });

    // Policies
    const activePolicies = SEED_POLICIES.map((p) => ({
      ...p,
      source: SEED_SOURCES.find((s) => s.id === p.source_id),
    }));

    return {
      cities: activeCities,
      indicators: comparisonIndicators,
      policies: activePolicies,
    };
  }

  /**
   * Get all sources
   */
  async getSources(): Promise<Source[]> {
    return SEED_SOURCES;
  }

  /**
   * Get evidence claims distribution stats for trust and confidence visualization
   */
  async getEvidenceStats(): Promise<{
    total: number;
    verified: number;
    estimated: number;
    conflicting: number;
    unknown: number;
    verifiedPercent: number;
    estimatedPercent: number;
    conflictingPercent: number;
    unknownPercent: number;
  }> {
    const claims = SEED_EVIDENCE_CLAIMS;
    const total = claims.length;
    const verified = claims.filter((c) => c.evidence_status === "verified").length;
    const estimated = claims.filter((c) => c.evidence_status === "estimated").length;
    const conflicting = claims.filter((c) => c.evidence_status === "conflicting").length;
    const unknown = claims.filter((c) => c.evidence_status === "unknown").length;

    return {
      total,
      verified,
      estimated,
      conflicting,
      unknown,
      verifiedPercent: total > 0 ? Math.round((verified / total) * 100) : 0,
      estimatedPercent: total > 0 ? Math.round((estimated / total) * 100) : 0,
      conflictingPercent: total > 0 ? Math.round((conflicting / total) * 100) : 0,
      unknownPercent: total > 0 ? Math.round((unknown / total) * 100) : 0,
    };
  }
}

export const repository = new DataRepository();
