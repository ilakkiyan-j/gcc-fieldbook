// GCC Fieldbook Domain Type Definitions
// Aligned with docs/data-dictionary.md and .ai/ARCHITECTURE.md

export type EvidenceStatus =
  | "verified"
  | "corroborated"
  | "single_source"
  | "self_reported"
  | "conflicting"
  | "stale"
  | "candidate"
  | "estimated"
  | "unknown";

export type SourceType =
  | "official"
  | "company"
  | "government_policy"
  | "industry_report"
  | "news"
  | "property_report"
  | "provider_claim"
  | "other";

export type CentreRecordStatus = "confirmed" | "candidate" | "needs_review";

export interface Source {
  id: string;
  title: string;
  publisher: string;
  url: string;
  source_type: SourceType;
  published_at?: string | null;
  last_checked_at: string;
  authority_notes?: string | null;
  created_at?: string;
}

export interface EvidenceClaim {
  id: string;
  claim_code: string;
  company_id?: string | null;
  centre_id?: string | null;
  city_indicator_id?: string | null;
  policy_id?: string | null;
  source_id: string;
  field_key: string;
  value_text: string;
  value_number?: number | null;
  unit?: string | null;
  period_label?: string | null;
  evidence_status: EvidenceStatus;
  conflict_group_id?: string | null;
  verification_note?: string | null;
  checked_at?: string | null;
  created_at?: string;
  source?: Source;
}

export interface Company {
  id: string;
  name: string;
  slug: string;
  parent_company_id?: string | null;
  headquarters_country?: string | null;
  industry?: string | null;
  official_website?: string | null;
  notes?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface City {
  id: string;
  name: string;
  slug: string;
  state_or_region: string;
  tier: string;
  notes?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface GccCentre {
  id: string;
  company_id: string;
  display_name: string;
  slug: string;
  city_id?: string | null;
  functions: string[];
  sector?: string | null;
  setup_year?: number | null;
  headcount_min?: number | null;
  headcount_max?: number | null;
  record_status: CentreRecordStatus;
  definition_note?: string | null;
  created_at?: string;
  updated_at?: string;
  // Expanded relations
  company?: Company;
  city?: City;
  claims?: EvidenceClaim[];
}

export interface CityIndicator {
  id: string;
  city_id: string;
  indicator_key: string;
  label: string;
  unit: string;
  definition: string;
  period_label: string;
  value_numeric?: number | null;
  value_text: string;
  comparability_note?: string | null;
  created_at?: string;
  updated_at?: string;
  city?: City;
  claims?: EvidenceClaim[];
}

export interface Policy {
  id: string;
  title: string;
  state_or_authority: string;
  issuing_authority: string;
  source_id?: string | null;
  published_at?: string | null;
  effective_from?: string | null;
  effective_to?: string | null;
  summary: string;
  last_checked_at: string;
  created_at?: string;
  source?: Source;
}

// Summary overview for Dashboard
export interface OverviewMetrics {
  gccCentreCount: number;
  companyCount: number;
  cityCount: number;
  sourceCount: number;
  claimCount: number;
  coverageLabel: string;
}

// Explorer search/filter query
export interface GccFilterParams {
  q?: string;
  city?: string;
  sector?: string;
  function?: string;
  page?: number;
  pageSize?: number;
}
