-- GCC Fieldbook Canonical Seed Data
-- Seed: supabase/seed.sql
-- Description: Curated, reproducible dataset with real public sources and claim-level provenance

-- 1. CITIES
INSERT INTO cities (id, name, slug, state_or_region, tier, notes) VALUES
('c1000000-0000-0000-0000-000000000001', 'Bengaluru', 'bengaluru', 'Karnataka', 'Tier-1', 'Established technology capital with the deepest concentration of AI/ML engineers, global financial tech GCCs, and aerospace engineering hubs.'),
('c1000000-0000-0000-0000-000000000002', 'Hyderabad', 'hyderabad', 'Karnataka / Telangana', 'Tier-1', 'Rapidly growing GCC destination centered around HITEC City and Financial District, offering competitive Grade-A leasing economics and state ICT policy support.')
ON CONFLICT (id) DO NOTHING;

-- 2. COMPANIES
INSERT INTO companies (id, name, slug, headquarters_country, industry, official_website, notes) VALUES
('a1000000-0000-0000-0000-000000000001', 'Goldman Sachs', 'goldman-sachs', 'United States', 'Banking & Financial Services', 'https://www.goldmansachs.com', 'Global investment banking, securities, and investment management firm.'),
('a1000000-0000-0000-0000-000000000002', 'JPMorgan Chase', 'jpmorgan-chase', 'United States', 'Financial Services', 'https://www.jpmorganchase.com', 'Global financial services institution driving high-volume engineering operations in India.'),
('a1000000-0000-0000-0000-000000000003', 'Boeing', 'boeing', 'United States', 'Aerospace & Defense', 'https://www.boeing.co.in', 'Global aerospace manufacturer operating the Boeing India Engineering & Technology Center (BIETC).'),
('a1000000-0000-0000-0000-000000000004', 'Target', 'target', 'United States', 'Retail & Consumer Goods', 'https://corporate.target.com', 'Major omnichannel retailer operating Target Enterprise India capability centre.')
ON CONFLICT (id) DO NOTHING;

-- 3. GCC_CENTRES
INSERT INTO gcc_centres (id, company_id, display_name, slug, city_id, functions, sector, setup_year, headcount_min, headcount_max, record_status, definition_note) VALUES
('b1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000001', 'Goldman Sachs Bengaluru Technology Center', 'goldman-sachs-bengaluru', 'c1000000-0000-0000-0000-000000000001', ARRAY['Software Engineering', 'Quantitative Finance', 'Platform Architecture', 'Cybersecurity'], 'Banking & Financial Services', 2004, 7500, 8500, 'confirmed', 'Major global capability center housing mission-critical quantitative engineering and firmwide operations.'),
('b1000000-0000-0000-0000-000000000002', 'a1000000-0000-0000-0000-000000000001', 'Goldman Sachs Hyderabad Center', 'goldman-sachs-hyderabad', 'c1000000-0000-0000-0000-000000000002', ARRAY['Global Markets Engineering', 'Consumer Tech', 'Business Analytics'], 'Banking & Financial Services', 2021, 2000, 2500, 'confirmed', 'Strategic facility launched at HITEC City to expand engineering capacity and access regional talent.'),
('b1000000-0000-0000-0000-000000000003', 'a1000000-0000-0000-0000-000000000002', 'JPMorgan Chase Technology Centre Bengaluru', 'jpmorgan-bengaluru', 'c1000000-0000-0000-0000-000000000001', ARRAY['Payments Tech', 'Asset Management Software', 'Core Banking Infrastructure'], 'Financial Services', 2001, 15000, 18000, 'confirmed', 'Flagship India capability operation delivering corporate and investment banking technology.'),
('b1000000-0000-0000-0000-000000000004', 'a1000000-0000-0000-0000-000000000003', 'Boeing India Engineering & Technology Center (BIETC)', 'boeing-bietc-bengaluru', 'c1000000-0000-0000-0000-000000000001', ARRAY['Avionics Engineering', 'Aerodynamics Simulation', 'Digital Aviation', 'Composite Materials'], 'Aerospace & Defense', 2009, 4500, 5500, 'confirmed', 'Boeings largest engineering presence outside the United States, inaugurated in Devanahalli campus in 2024.'),
('b1000000-0000-0000-0000-000000000005', 'a1000000-0000-0000-0000-000000000004', 'Target Enterprise India', 'target-enterprise-bengaluru', 'c1000000-0000-0000-0000-000000000001', ARRAY['Retail Technology', 'Supply Chain Analytics', 'Digital Marketing', 'Merchandising Systems'], 'Retail & Consumer Goods', 2005, 3000, 3500, 'confirmed', 'Fully integrated capability hub developing core retail applications, supply chain algorithms, and guest technology.')
ON CONFLICT (id) DO NOTHING;

-- 4. SOURCES
INSERT INTO sources (id, title, publisher, url, source_type, published_at, last_checked_at, authority_notes) VALUES
('s1000000-0000-0000-0000-000000000001', 'Goldman Sachs Expands Footprint in India with New Office in Hyderabad', 'Goldman Sachs Corporate Newsroom', 'https://www.goldmansachs.com/media-relations/press-releases/2021/announcement-hyderabad-office.html', 'company', '2021-07-19', '2026-03-01', 'Primary press release documenting Hyderabad facility opening date and target functions.'),
('s1000000-0000-0000-0000-000000000002', 'Boeing Inaugurates New Global Engineering Center in Bengaluru', 'Boeing India Official Release', 'https://www.boeing.co.in/news-and-media/press-releases/2024/january/boeing-inaugurates-new-global-engineering-center-in-india.page', 'company', '2024-01-19', '2026-02-15', 'Official announcement of the 43-acre BIETC campus inauguration in Devanahalli by Prime Minister Narendra Modi.'),
('s1000000-0000-0000-0000-000000000003', 'India GCC Landscape Report: Evolution, Scale, and Frontiers', 'NASSCOM / Zinnov', 'https://nasscom.in/knowledge-center/publications/india-gcc-landscape-report', 'industry_report', '2024-09-10', '2026-02-28', 'Industry benchmark report surveying headcounts, talent pools, and operational capabilities across 1,600+ GCCs.'),
('s1000000-0000-0000-0000-000000000004', 'India Office Market Dynamics Q4 2025', 'JLL India Research', 'https://www.jll.co.in/en/trends-and-insights/research/office-market-dynamics', 'property_report', '2026-01-15', '2026-03-05', 'Commercial real estate quarterly benchmark reporting Grade-A rental rates and vacancy metrics across major micro-markets.'),
('s1000000-0000-0000-0000-000000000005', 'Karnataka Global Capability Centres (GCC) Policy 2024-2029', 'Department of Electronics, IT, BT and S&T, Government of Karnataka', 'https://itbt.karnataka.gov.in/gcc-policy-2024', 'government_policy', '2024-09-26', '2026-02-10', 'Official state policy outlining anchor fiscal incentives, talent training subsidies, and Beyond Bengaluru incentives.'),
('s1000000-0000-0000-0000-000000000006', 'Telangana Information Communications Technology Policy', 'Information Technology, Electronics & Communications Department, Government of Telangana', 'https://it.telangana.gov.in/policies', 'government_policy', '2021-09-15', '2026-02-10', 'State ICT policy defining single-window approval, stamp duty exemptions, and infrastructure support in Hyderabad.')
ON CONFLICT (id) DO NOTHING;

-- 5. CITY_INDICATORS
INSERT INTO city_indicators (id, city_id, indicator_key, label, unit, definition, period_label, value_numeric, value_text, comparability_notes) VALUES
('i1000000-0000-0000-0000-000000000001', 'c1000000-0000-0000-0000-000000000001', 'office_rent', 'Grade-A Office Gross Rent (ORR / Whitefield)', 'INR / sq ft / month', 'Gross monthly commercial rent for prime Grade-A tech parks including maintenance baseline.', 'Q4 2025', 115, '₹95 – ₹130', 'Derived from Outer Ring Road (ORR) and Whitefield prime business districts.'),
('i1000000-0000-0000-0000-000000000002', 'c1000000-0000-0000-0000-000000000002', 'office_rent', 'Grade-A Office Gross Rent (HITEC City / Madhapur)', 'INR / sq ft / month', 'Gross monthly commercial rent for prime Grade-A tech parks in Financial District and HITEC City.', 'Q4 2025', 85, '₹75 – ₹95', 'Derived from HITEC City and Gachibowli prime business districts; represents approx 20-25% discount relative to Bengaluru prime.'),
('i1000000-0000-0000-0000-000000000003', 'c1000000-0000-0000-0000-000000000001', 'talent_pool', 'Tech & AI Engineering Talent Base', 'headcount', 'Estimated professional tech workforce employed across GCCs and technology enterprises.', 'FY 2025', 1500000, '~1,500,000+', 'Highest concentration in India; represents ~35% of total Indian GCC tech workforce.'),
('i1000000-0000-0000-0000-000000000004', 'c1000000-0000-0000-0000-000000000002', 'talent_pool', 'Tech & AI Engineering Talent Base', 'headcount', 'Estimated professional tech workforce employed across GCCs and technology enterprises.', 'FY 2025', 900000, '~900,000+', 'Second largest hub in South India; growing at ~12% YoY with strong university pipeline.')
ON CONFLICT (id) DO NOTHING;

-- 6. POLICIES
INSERT INTO policies (id, title, state_or_authority, issuing_authority, source_id, published_at, effective_from, effective_to, summary, last_checked_at) VALUES
('p1000000-0000-0000-0000-000000000001', 'Karnataka GCC Policy 2024-2029', 'Karnataka', 'Dept of Electronics, IT, BT and S&T', 's1000000-0000-0000-0000-000000000005', '2024-09-26', '2024-10-01', '2029-09-30', 'Dedicated GCC framework targeting 500 new centres by 2029; offers patent reimbursement, research grant matching, and rental subsidies for operations establishing Beyond Bengaluru.', '2026-02-10'),
('p1000000-0000-0000-0000-000000000002', 'Telangana ICT Policy 2.0', 'Telangana', 'ITE&C Department', 's1000000-0000-0000-0000-000000000006', '2021-09-15', '2021-09-15', '2026-09-14', 'Provides 100% stamp duty exemption on first lease/sale deed, power tariff subsidies for Mega projects, and accelerated clearances through TS-iPASS single-window system.', '2026-02-10')
ON CONFLICT (id) DO NOTHING;

-- 7. EVIDENCE_CLAIMS
INSERT INTO evidence_claims (id, claim_code, company_id, centre_id, city_indicator_id, policy_id, source_id, field_key, value_text, value_number, unit, period_label, evidence_status, conflict_group_id, verification_note, checked_at) VALUES
-- Claim 1: Goldman Sachs Hyderabad Launch (Verified)
('e1000000-0000-0000-0000-000000000001', 'CLM-GS-01', NULL, 'b1000000-0000-0000-0000-000000000002', NULL, NULL, 's1000000-0000-0000-0000-000000000001', 'setup_year', '2021', 2021, 'year', '2021', 'verified', NULL, 'Checked directly against Goldman Sachs official press release issued on 19 July 2021.', '2026-03-01'),

-- Claim 2: Goldman Sachs Bengaluru Headcount Estimate (Estimated)
('e1000000-0000-0000-0000-000000000002', 'CLM-GS-02', NULL, 'b1000000-0000-0000-0000-000000000001', NULL, NULL, 's1000000-0000-0000-0000-000000000003', 'headcount_estimate', '8,000 professionals', 8000, 'headcount', 'FY2025', 'estimated', 'CONF-GS-HC', 'NASSCOM benchmark estimate range based on campus capacity and industry filings.', '2026-02-28'),

-- Claim 3: Goldman Sachs Bengaluru Alternate Media Headcount (Conflicting with Claim 2)
('e1000000-0000-0000-0000-000000000003', 'CLM-GS-03', NULL, 'b1000000-0000-0000-0000-000000000001', NULL, NULL, 's1000000-0000-0000-0000-000000000001', 'headcount_estimate', '9,200 professionals', 9200, 'headcount', '2025', 'conflicting', 'CONF-GS-HC', 'Public executive interview cited higher figure including non-engineering staff. Sourced as conflicting estimate.', '2026-03-01'),

-- Claim 4: Boeing BIETC Devanahalli Campus (Verified)
('e1000000-0000-0000-0000-000000000004', 'CLM-BA-01', NULL, 'b1000000-0000-0000-0000-000000000004', NULL, NULL, 's1000000-0000-0000-0000-000000000002', 'campus_scale', '43-acre state-of-the-art facility, Boeings largest outside the US', NULL, NULL, '2024', 'verified', NULL, 'Verified through official Boeing India release and public inauguration records.', '2026-02-15'),

-- Claim 5: Bengaluru Office Rent Indicator (Verified Property Report)
('e1000000-0000-0000-0000-000000000005', 'CLM-IND-01', NULL, NULL, 'i1000000-0000-0000-0000-000000000001', NULL, 's1000000-0000-0000-0000-000000000004', 'office_rent', '₹95 – ₹130 per sq ft monthly', 115, 'INR/sq ft/mo', 'Q4 2025', 'verified', NULL, 'JLL India Q4 2025 quarterly commercial dynamics report for prime Outer Ring Road tech parks.', '2026-03-05'),

-- Claim 6: Hyderabad Office Rent Indicator (Verified Property Report)
('e1000000-0000-0000-0000-000000000006', 'CLM-IND-02', NULL, NULL, 'i1000000-0000-0000-0000-000000000002', NULL, 's1000000-0000-0000-0000-000000000004', 'office_rent', '₹75 – ₹95 per sq ft monthly', 85, 'INR/sq ft/mo', 'Q4 2025', 'verified', NULL, 'JLL India Q4 2025 quarterly commercial dynamics report for HITEC City and Financial District.', '2026-03-05'),

-- Claim 7: Commercial Power Tariff Baseline (Unknown / Needs Review Example)
('e1000000-0000-0000-0000-000000000007', 'CLM-IND-03', NULL, NULL, 'i1000000-0000-0000-0000-000000000001', NULL, 's1000000-0000-0000-0000-000000000005', 'industrial_power_tariff', 'Tariff benchmark unverified for FY2026; subject to state regulatory commission revision.', NULL, NULL, 'FY2026', 'unknown', NULL, 'Marked explicitly as unknown; neither BESCOM nor state gazette has released final FY26 tariff schedule.', '2026-02-10')
ON CONFLICT (id) DO NOTHING;
