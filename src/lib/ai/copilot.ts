import { repository } from "@/lib/data/repository";
import { generateGeminiContent } from "@/lib/ai/gemini";
import { EvidenceClaim, GccCentre, City, Policy } from "@/types/domain";

export interface CopilotSynthesisResult {
  query: string;
  answer: string;
  citations: EvidenceClaim[];
  model: string;
  isFallback: boolean;
  retrievedCount: number;
}

/**
 * Validates bracketed citations in text against actual retrieved claims (ADR-008).
 * Ensures that only valid, retrieved claims are returned to the client.
 */
export function validateCitations(
  text: string,
  availableClaims: EvidenceClaim[]
): { validatedText: string; matchingClaims: EvidenceClaim[] } {
  const claimMap = new Map<string, EvidenceClaim>();
  availableClaims.forEach((c) => {
    claimMap.set(c.claim_code.toUpperCase(), c);
  });

  const citationRegex = /\[(CLM-[A-Za-z0-9_-]+)\]/g;
  const foundCodes = new Set<string>();

  // Replace invalid codes or collect valid ones
  const validatedText = text.replace(citationRegex, (match, code) => {
    const upperCode = code.toUpperCase();
    if (claimMap.has(upperCode)) {
      foundCodes.add(upperCode);
      return match;
    }
    // Strip hallucinated claim codes that were not in retrieval context
    return "";
  });

  const matchingClaims = Array.from(foundCodes)
    .map((code) => claimMap.get(code)!)
    .filter(Boolean);

  return { validatedText, matchingClaims };
}

/**
 * Deterministic evidence synthesizer used as resilient fallback
 * when Gemini API is offline, unconfigured, or returns empty response.
 */
function buildDeterministicSynthesis(
  query: string,
  centres: GccCentre[],
  claims: EvidenceClaim[],
  policies: Policy[]
): { answer: string; citations: EvidenceClaim[] } {
  const q = query.toLowerCase();

  // Out of scope check (e.g. Chennai, Pune, Mumbai, non-tracked entities)
  if (
    q.includes("chennai") ||
    q.includes("pune") ||
    q.includes("ncr") ||
    q.includes("delhi") ||
    q.includes("apple") ||
    q.includes("microsoft")
  ) {
    return {
      answer: `This query pertains to entities or locations currently outside GCC Fieldbook's curated assessment dataset.\n\nThe current dataset tracks **4 Global Capability Centres** across **Bengaluru and Hyderabad** (Goldman Sachs, JPMorgan Chase, Boeing, and Target). Information for other hubs is not yet verified against primary regulatory filings.`,
      citations: [],
    };
  }

  const sections: string[] = [];
  const usedClaims: EvidenceClaim[] = [];

  // 1. Centres matching query
  const matchedCentres = centres.filter((c) => {
    if (q.includes("all") || q.includes("gcc") || q.includes("centre")) return true;
    return (
      c.display_name.toLowerCase().includes(q) ||
      c.company?.name.toLowerCase().includes(q) ||
      c.functions.some((f) => q.includes(f.toLowerCase()) || f.toLowerCase().includes(q)) ||
      c.city?.name.toLowerCase().includes(q)
    );
  });

  if (matchedCentres.length > 0) {
    sections.push(`Based on our curated assessment sample, here are the verified findings:`);

    matchedCentres.forEach((centre) => {
      const centreClaims = claims.filter(
        (c) => c.centre_id === centre.id || c.company_id === centre.company_id
      );
      const claimTags = centreClaims.map((c) => {
        usedClaims.push(c);
        return `[${c.claim_code}]`;
      }).join(" ");

      const headcountText = centre.headcount_min
        ? `Headcount is recorded between ${centre.headcount_min.toLocaleString()} and ${centre.headcount_max?.toLocaleString() || "more"} professionals.`
        : "";

      sections.push(
        `• **${centre.display_name}** (${centre.city?.name}): ${centre.definition_note || centre.sector}. Focuses on ${centre.functions.join(", ")}. ${headcountText} ${claimTags}`
      );
    });
  }

  // 2. Policies matching query
  if (q.includes("policy") || q.includes("incentive") || q.includes("subsidy") || q.includes("stamp")) {
    sections.push(`\n**State Policy Frameworks:**`);
    policies.forEach((p) => {
      sections.push(`• **${p.title}** (${p.state_or_authority}): ${p.summary}`);
    });
  }

  // 3. Rent / Talent matching query
  if (q.includes("rent") || q.includes("talent") || q.includes("compare") || q.includes("office")) {
    const rentClaims = claims.filter((c) => c.field_key === "office_rent");
    if (rentClaims.length > 0) {
      sections.push(`\n**Commercial Real Estate Benchmarks:**`);
      rentClaims.forEach((c) => {
        usedClaims.push(c);
        sections.push(`• ${c.value_text} [${c.claim_code}] (${c.verification_note})`);
      });
    }
  }

  if (sections.length === 0) {
    sections.push(
      `GCC Fieldbook tracks verified operations for Goldman Sachs, JPMorgan Chase, Boeing, and Target across Bengaluru and Hyderabad. Please refine your query to focus on headcount, facility mandates, office rents, or state policies.`
    );
  }

  // Deduplicate used claims
  const uniqueClaims = Array.from(new Set(usedClaims.map((c) => c.id)))
    .map((id) => usedClaims.find((c) => c.id === id)!)
    .filter(Boolean);

  return {
    answer: sections.join("\n\n"),
    citations: uniqueClaims,
  };
}

/**
 * Execute Copilot RAG Pipeline
 */
export async function executeResearchCopilot(query: string): Promise<CopilotSynthesisResult> {
  const cleanQuery = query.trim();

  // 1. Retrieve all active evidence from repository
  const [gccsResult, comparison, allSources] = await Promise.all([
    repository.getGccs({ pageSize: 100 }),
    repository.getCityComparison(["bengaluru", "hyderabad"]),
    repository.getSources(),
  ]);

  const allCentres = gccsResult.data;
  const allClaims = allCentres.flatMap((c) => c.claims || []);
  const allPolicies = comparison.policies;

  // Add city indicator claims from seed
  const comparisonClaims: EvidenceClaim[] = [
    {
      id: "e1000000-0000-0000-0000-000000000005",
      claim_code: "CLM-IND-01",
      source_id: "s1000000-0000-0000-0000-000000000004",
      field_key: "office_rent",
      value_text: "₹95 – ₹130 per sq ft monthly (Bengaluru ORR/Whitefield)",
      unit: "INR/sq ft/mo",
      period_label: "Q4 2025",
      evidence_status: "verified",
      verification_note: "JLL India Q4 2025 quarterly commercial dynamics report.",
      checked_at: "2026-03-05",
      source: allSources.find((s) => s.id === "s1000000-0000-0000-0000-000000000004"),
    },
    {
      id: "e1000000-0000-0000-0000-000000000006",
      claim_code: "CLM-IND-02",
      source_id: "s1000000-0000-0000-0000-000000000004",
      field_key: "office_rent",
      value_text: "₹75 – ₹95 per sq ft monthly (Hyderabad HITEC City)",
      unit: "INR/sq ft/mo",
      period_label: "Q4 2025",
      evidence_status: "verified",
      verification_note: "JLL India Q4 2025 quarterly commercial dynamics report.",
      checked_at: "2026-03-05",
      source: allSources.find((s) => s.id === "s1000000-0000-0000-0000-000000000004"),
    },
  ];

  const candidateClaims = [...allClaims, ...comparisonClaims];

  // 2. Format grounding evidence for prompt
  const evidenceLines: string[] = [];

  evidenceLines.push("=== VERIFIED CENTRES & CLAIMS ===");
  candidateClaims.forEach((c) => {
    evidenceLines.push(
      `- Claim [${c.claim_code}]: Field "${c.field_key}" = "${c.value_text}". Status: ${c.evidence_status}. Source: ${c.source?.title || "Filing"} (${c.source?.publisher || ""}). Checked: ${c.checked_at}`
    );
  });

  evidenceLines.push("\n=== VERIFIED CENTRES MANDATES ===");
  allCentres.forEach((centre) => {
    evidenceLines.push(
      `- Facility: "${centre.display_name}", Company: "${centre.company?.name}", City: "${centre.city?.name}", Sector: "${centre.sector}", Est: ${centre.setup_year}, Functions: [${centre.functions.join(", ")}]. Note: ${centre.definition_note}`
    );
  });

  evidenceLines.push("\n=== STATE POLICY FRAMEWORKS ===");
  allPolicies.forEach((p) => {
    evidenceLines.push(
      `- Policy: "${p.title}" (${p.state_or_authority}). Authority: ${p.issuing_authority}. Summary: ${p.summary}`
    );
  });

  const systemInstruction = `You are the GCC Fieldbook Research Copilot, an evidence-bound assistant for India's Global Capability Centres ecosystem.
CRITICAL INTEGRITY INSTRUCTIONS:
1. Grounding: Answer ONLY using facts explicitly given in the grounding evidence below. Do not use external pre-trained knowledge about GCCs or fabricate details.
2. Citation: Whenever you assert a factual claim (headcount, campus size, rent figure, setup year), append the bracketed claim code, e.g. [CLM-GS-01] or [CLM-BA-01] or [CLM-IND-01]. Every claim code you use MUST be listed in the evidence.
3. Divergence/Conflicts: If conflicting claims exist for an entity (like Goldman Sachs headcount), mention both estimates transparently.
4. Out-of-scope: If the user asks about an entity or city NOT in the evidence (such as Chennai, Pune, or non-tracked companies), clearly explain that this information is outside the current curated assessment sample (4 GCCs, 2 Cities).
5. Tone: Concise, professional, executive-analyst tone. Format with clear markdown bullet points.`;

  const userPrompt = `GROUNDING EVIDENCE:\n${evidenceLines.join("\n")}\n\nUSER QUESTION:\n${cleanQuery}`;

  // 3. Attempt Gemini Generative AI Call
  const geminiResult = await generateGeminiContent(systemInstruction, userPrompt);

  if (!geminiResult.error && geminiResult.text) {
    // 4. Validate citations server-side (ADR-008)
    const { validatedText, matchingClaims } = validateCitations(
      geminiResult.text,
      candidateClaims
    );

    return {
      query: cleanQuery,
      answer: validatedText,
      citations: matchingClaims,
      model: geminiResult.model,
      isFallback: false,
      retrievedCount: candidateClaims.length,
    };
  }

  // 5. Fallback to Deterministic Synthesizer if Gemini fails or is unconfigured
  console.info("Using deterministic synthesizer fallback:", geminiResult.error);
  const fallback = buildDeterministicSynthesis(cleanQuery, allCentres, candidateClaims, allPolicies);

  return {
    query: cleanQuery,
    answer: fallback.answer,
    citations: fallback.citations,
    model: "deterministic-evidence-synthesizer",
    isFallback: true,
    retrievedCount: candidateClaims.length,
  };
}
