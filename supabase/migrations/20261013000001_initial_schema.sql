-- GCC Fieldbook Initial Schema Migration
-- Migration: 20261013000001_initial_schema.sql
-- Description: Core relational model for companies, gcc_centres, cities, indicators, sources, policies, and evidence_claims

-- Enable UUID extension if not already present
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. COMPANIES
CREATE TABLE IF NOT EXISTS companies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    parent_company_id UUID REFERENCES companies(id) ON DELETE SET NULL,
    headquarters_country TEXT,
    industry TEXT,
    official_website TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. CITIES
CREATE TABLE IF NOT EXISTS cities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    state_or_region TEXT NOT NULL,
    tier TEXT NOT NULL DEFAULT 'Tier-1',
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. GCC_CENTRES
CREATE TABLE IF NOT EXISTS gcc_centres (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    display_name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    city_id UUID REFERENCES cities(id) ON DELETE SET NULL,
    functions TEXT[] NOT NULL DEFAULT '{}',
    sector TEXT,
    setup_year INT,
    headcount_min INT,
    headcount_max INT,
    record_status TEXT NOT NULL DEFAULT 'confirmed' CHECK (record_status IN ('confirmed', 'candidate', 'needs_review')),
    definition_note TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. SOURCES
CREATE TABLE IF NOT EXISTS sources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    publisher TEXT NOT NULL,
    url TEXT NOT NULL,
    source_type TEXT NOT NULL CHECK (source_type IN ('official', 'company', 'government_policy', 'industry_report', 'news', 'property_report', 'provider_claim', 'other')),
    published_at DATE,
    last_checked_at DATE NOT NULL DEFAULT CURRENT_DATE,
    authority_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 5. CITY_INDICATORS
CREATE TABLE IF NOT EXISTS city_indicators (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    city_id UUID NOT NULL REFERENCES cities(id) ON DELETE CASCADE,
    indicator_key TEXT NOT NULL,
    label TEXT NOT NULL,
    unit TEXT NOT NULL,
    definition TEXT NOT NULL,
    period_label TEXT NOT NULL,
    value_numeric NUMERIC,
    value_text TEXT NOT NULL,
    comparability_note TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 6. POLICIES
CREATE TABLE IF NOT EXISTS policies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    state_or_authority TEXT NOT NULL,
    issuing_authority TEXT NOT NULL,
    source_id UUID REFERENCES sources(id) ON DELETE SET NULL,
    published_at DATE,
    effective_from DATE,
    effective_to DATE,
    summary TEXT NOT NULL,
    last_checked_at DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 7. EVIDENCE_CLAIMS
CREATE TABLE IF NOT EXISTS evidence_claims (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    claim_code TEXT UNIQUE,
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    centre_id UUID REFERENCES gcc_centres(id) ON DELETE CASCADE,
    city_indicator_id UUID REFERENCES city_indicators(id) ON DELETE CASCADE,
    policy_id UUID REFERENCES policies(id) ON DELETE CASCADE,
    source_id UUID NOT NULL REFERENCES sources(id) ON DELETE CASCADE,
    field_key TEXT NOT NULL,
    value_text TEXT NOT NULL,
    value_number NUMERIC,
    unit TEXT,
    period_label TEXT,
    evidence_status TEXT NOT NULL CHECK (evidence_status IN ('verified', 'corroborated', 'single_source', 'self_reported', 'conflicting', 'stale', 'unknown')),
    conflict_group_id TEXT,
    verification_note TEXT,
    checked_at DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT chk_single_evidence_target CHECK (
        num_nonnulls(company_id, centre_id, city_indicator_id, policy_id) = 1
    )
);

-- INDEXES
CREATE INDEX IF NOT EXISTS idx_companies_slug ON companies(slug);
CREATE INDEX IF NOT EXISTS idx_cities_slug ON cities(slug);
CREATE INDEX IF NOT EXISTS idx_gcc_centres_company_id ON gcc_centres(company_id);
CREATE INDEX IF NOT EXISTS idx_gcc_centres_city_id ON gcc_centres(city_id);
CREATE INDEX IF NOT EXISTS idx_gcc_centres_slug ON gcc_centres(slug);
CREATE INDEX IF NOT EXISTS idx_gcc_centres_record_status ON gcc_centres(record_status);
CREATE INDEX IF NOT EXISTS idx_city_indicators_city_id ON city_indicators(city_id);
CREATE INDEX IF NOT EXISTS idx_city_indicators_key ON city_indicators(indicator_key);
CREATE INDEX IF NOT EXISTS idx_evidence_claims_company_id ON evidence_claims(company_id);
CREATE INDEX IF NOT EXISTS idx_evidence_claims_centre_id ON evidence_claims(centre_id);
CREATE INDEX IF NOT EXISTS idx_evidence_claims_city_indicator_id ON evidence_claims(city_indicator_id);
CREATE INDEX IF NOT EXISTS idx_evidence_claims_source_id ON evidence_claims(source_id);
CREATE INDEX IF NOT EXISTS idx_evidence_claims_status ON evidence_claims(evidence_status);
CREATE INDEX IF NOT EXISTS idx_evidence_claims_conflict_group ON evidence_claims(conflict_group_id);

-- ROW LEVEL SECURITY (RLS) POLICIES
-- Read-only public access to curated records; zero write permissions from browser clients

ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE cities ENABLE ROW LEVEL SECURITY;
ALTER TABLE gcc_centres ENABLE ROW LEVEL SECURITY;
ALTER TABLE sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE city_indicators ENABLE ROW LEVEL SECURITY;
ALTER TABLE policies ENABLE ROW LEVEL SECURITY;
ALTER TABLE evidence_claims ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read companies') THEN
        CREATE POLICY "Public read companies" ON companies FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read cities') THEN
        CREATE POLICY "Public read cities" ON cities FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read gcc_centres') THEN
        CREATE POLICY "Public read gcc_centres" ON gcc_centres FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read sources') THEN
        CREATE POLICY "Public read sources" ON sources FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read city_indicators') THEN
        CREATE POLICY "Public read city_indicators" ON city_indicators FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read policies') THEN
        CREATE POLICY "Public read policies" ON policies FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read evidence_claims') THEN
        CREATE POLICY "Public read evidence_claims" ON evidence_claims FOR SELECT USING (true);
    END IF;
END $$;
