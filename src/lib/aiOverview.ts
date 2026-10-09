import {
  CategoryId,
  documents,
  getDocument,
  LegalDocument,
  searchDocuments,
} from "@/data/legal";
import { problemGuides } from "@/data/guides";
import { courtGuides } from "@/data/courts";
import { templates } from "@/data/templates";

export type AiCitation = {
  id: string;
  title: string;
  citation: string;
  href: string;
  type: "document" | "guide" | "court" | "template";
};

export type AiOverviewResult = {
  query: string;
  headline: string;
  plainEnglish: string;
  legalPosition: string;
  whatYouCanDo: string[];
  nextSteps: { label: string; href: string; reason: string }[];
  warnings: string[];
  citations: AiCitation[];
  relatedDocs: LegalDocument[];
  confidence: "high" | "medium" | "low";
  audienceTips: { citizens: string; lawyers: string };
};

function uniqueDocs(list: LegalDocument[]) {
  const seen = new Set<string>();
  return list.filter((d) => {
    if (seen.has(d.id)) return false;
    seen.add(d.id);
    return true;
  });
}

export function buildAiOverview(
  rawQuery: string,
  category?: CategoryId | "all"
): AiOverviewResult {
  const query = rawQuery.trim() || "South African legal research";
  const q = query.toLowerCase();
  const docs = uniqueDocs(searchDocuments(query, category)).slice(0, 8);

  const guideHits = problemGuides.filter((g) => {
    const hay = `${g.title} ${g.summary} ${g.keywords.join(" ")} ${g.steps.join(" ")}`.toLowerCase();
    return q.split(/\s+/).some((t) => t.length > 2 && hay.includes(t));
  });

  const courtHits = courtGuides.filter((c) => {
    const hay = `${c.name} ${c.summary} ${c.keywords.join(" ")} ${c.whenToUse}`.toLowerCase();
    return q.split(/\s+/).some((t) => t.length > 2 && hay.includes(t));
  });

  const templateHits = templates.filter((t) => {
    const hay = `${t.title} ${t.description} ${t.category} ${t.tags.join(" ")}`.toLowerCase();
    return q.split(/\s+/).some((tkn) => tkn.length > 2 && hay.includes(tkn));
  });

  // Topic heuristics for richer SA answers
  const topics: { test: RegExp; boost: string[] }[] = [
    { test: /evict|pie|housing|homeless|informal settlement|landlord|tenant/, boost: ["pie-19-1998", "const-1996", "grootboom-2000", "blue-moonlight-2011"] },
    { test: /dismiss|ccma|labour|retrench|unfair labour|strike|employer|employee/, boost: ["lra-66-1995", "bcea-75-1997", "sidumo-2007", "form-ccma-7-11"] },
    { test: /popia|privacy|personal information|data protection|paia/, boost: ["popa-4-2013", "paia-2-2000", "reg-popia-regulations"] },
    { test: /consumer|refund|warranty|defective|ncc/, boost: ["cpa-68-2008"] },
    { test: /credit|debt review|reckless lend|ncr|loan/, boost: ["nca-34-2005"] },
    { test: /company|director|business rescue|cipc|moi/, boost: ["companies-71-2008"] },
    { test: /bail|arrest|criminal|charge sheet/, boost: ["criminal-procedure-51-1977", "const-1996"] },
    { test: /death penalty|makwanyane|dignity/, boost: ["makwanyane-1995", "const-1996"] },
    { test: /discriminat|equality|sexual orientation|employment equity/, boost: ["eea-55-1998", "national-coalition-1998", "const-1996"] },
    { test: /summons|particulars of claim|magistrates|high court|notice of motion/, boost: ["form-summons-mc", "form-n1", "uniform-rules", "magistrates-rules"] },
    { test: /constitution|bill of rights|section 26|section 27|section 34/, boost: ["const-1996"] },
    { test: /hiv|health|nevirapine|tac/, boost: ["treatment-action-campaign-2002", "const-1996"] },
    { test: /small claims|minor dispute/, boost: ["magistrates-rules"] },
  ];

  const boosted: LegalDocument[] = [];
  for (const t of topics) {
    if (t.test.test(q)) {
      for (const id of t.boost) {
        const d = getDocument(id);
        if (d) boosted.push(d);
      }
    }
  }

  const relatedDocs = uniqueDocs([...boosted, ...docs]).slice(0, 6);
  const primary = relatedDocs[0];

  const citations: AiCitation[] = [
    ...relatedDocs.map((d) => ({
      id: d.id,
      title: d.title,
      citation: d.citation,
      href: `/doc/${d.id}`,
      type: "document" as const,
    })),
    ...guideHits.slice(0, 3).map((g) => ({
      id: g.id,
      title: g.title,
      citation: "Citizen problem guide",
      href: `/guides/${g.id}`,
      type: "guide" as const,
    })),
    ...courtHits.slice(0, 2).map((c) => ({
      id: c.id,
      title: c.name,
      citation: c.level,
      href: `/courts/${c.id}`,
      type: "court" as const,
    })),
    ...templateHits.slice(0, 3).map((t) => ({
      id: t.id,
      title: t.title,
      citation: t.category,
      href: `/templates/${t.id}`,
      type: "template" as const,
    })),
  ];

  const confidence: AiOverviewResult["confidence"] =
    relatedDocs.length >= 3 || guideHits.length >= 1 ? "high" : relatedDocs.length >= 1 ? "medium" : "low";

  const plainEnglish = buildPlainEnglish(query, relatedDocs, guideHits[0]?.title);
  const legalPosition = buildLegalPosition(query, relatedDocs);
  const whatYouCanDo = buildActions(query, guideHits, templateHits, courtHits);
  const nextSteps = buildNextSteps(query, relatedDocs, guideHits, templateHits, courtHits);

  return {
    query,
    headline: primary
      ? `AI Overview: ${shorten(primary.title, 72)}`
      : `AI Overview for “${shorten(query, 60)}”`,
    plainEnglish,
    legalPosition,
    whatYouCanDo,
    nextSteps,
    warnings: [
      "This overview is generated from LulaGazette’s curated South African library for education and first-pass research.",
      "It is not legal advice and not a substitute for an attorney or advocate admitted in South Africa.",
      "Always verify the latest Government Gazette text, practice directives and full judgments before filing or relying on any point.",
      "Lexpro / Case Online / Court Online live feeds are not connected in this local demo — use Import notes under Lawyer tools for your own exports.",
    ],
    citations: citations.slice(0, 12),
    relatedDocs,
    confidence,
    audienceTips: {
      citizens:
        "Start with the plain-English steps and a matching problem guide. Use a template only as a draft, then have a lawyer review before you serve or file anything important.",
      lawyers:
        "Treat citations as a research trail: open full texts, check subsequent history, confirm local division directives, and adapt templates to your brief and court.",
    },
  };
}

function shorten(s: string, n: number) {
  return s.length <= n ? s : s.slice(0, n - 1) + "…";
}

function buildPlainEnglish(query: string, docs: LegalDocument[], guideTitle?: string) {
  if (!docs.length && !guideTitle) {
    return `We could not tightly match “${query}” in the local library. Try simpler words (for example “eviction”, “CCMA”, “POPIA”, “summons”) or browse Problem guides and Courts.`;
  }
  const names = docs.slice(0, 3).map((d) => d.title).join("; ");
  const lead = guideTitle
    ? `Your question looks related to “${guideTitle}”. `
    : "";
  return (
    lead +
    `In plain terms: South African law on this topic is shaped by the Constitution and the specific Acts or cases below. ` +
    `The most relevant materials currently ranked for your wording are: ${names || "see guides and court pages"}. ` +
    `Read the short summaries first, then open the full pages for procedure, forms and next steps.`
  );
}

function buildLegalPosition(query: string, docs: LegalDocument[]) {
  if (!docs.length) {
    return "No primary authority was ranked highly enough to state a settled legal position. Refine the query or open the Courts / Guides sections.";
  }
  const bits = docs.slice(0, 4).map((d) => `• ${d.citation}: ${d.summary}`);
  return `Research position (first pass for “${query}”):\n${bits.join("\n")}`;
}

function buildActions(
  query: string,
  guides: { title: string }[],
  tpls: { title: string }[],
  courts: { name: string }[]
) {
  const actions = [
    "Write down dates, names, amounts and what you want as an outcome.",
    "Identify the correct forum (CCMA, Small Claims, Magistrates’ Court, High Court, etc.).",
  ];
  if (guides[0]) actions.push(`Follow the citizen guide: ${guides[0].title}.`);
  if (tpls[0]) actions.push(`Draft with template: ${tpls[0].title} (review before use).`);
  if (courts[0]) actions.push(`Check filing basics for: ${courts[0].name}.`);
  if (/evict/i.test(query)) actions.push("Do not lock anyone out without a court order — PIE and s 26(3) of the Constitution apply.");
  if (/dismiss|ccma|labour/i.test(query)) actions.push("Diary the 30-day unfair dismissal referral window (LRA s 191) or apply for condonation if late.");
  if (/popia|privacy|data/i.test(query)) actions.push("Preserve evidence of processing and contact the responsible party’s information officer in writing.");
  actions.push("If stakes are high (home, children, criminal charge, large money), book a qualified SA lawyer sooner rather than later.");
  return actions;
}

function buildNextSteps(
  query: string,
  docs: LegalDocument[],
  guides: { id: string; title: string }[],
  tpls: { id: string; title: string }[],
  courts: { id: string; name: string }[]
) {
  const steps: AiOverviewResult["nextSteps"] = [];
  if (guides[0]) {
    steps.push({
      label: `Open guide: ${guides[0].title}`,
      href: `/guides/${guides[0].id}`,
      reason: "Step-by-step help for non-lawyers",
    });
  }
  if (docs[0]) {
    steps.push({
      label: `Read: ${docs[0].title}`,
      href: `/doc/${docs[0].id}`,
      reason: "Primary authority / curated extract",
    });
  }
  if (tpls[0]) {
    steps.push({
      label: `Draft: ${tpls[0].title}`,
      href: `/templates/${tpls[0].id}`,
      reason: "Court- or party-ready starting draft",
    });
  }
  if (courts[0]) {
    steps.push({
      label: courts[0].name,
      href: `/courts/${courts[0].id}`,
      reason: "Forum, fees mindset and filing checklist",
    });
  }
  steps.push({
    label: "Search full library",
    href: `/s?q=${encodeURIComponent(query)}&sort=year-desc&limit=20&page=1`,
    reason: "See every ranked Act, case and form",
  });
  steps.push({
    label: "Contact LulaGazette",
    href: "/contact",
    reason: "System overview or integrations — Contact Us",
  });
  return steps;
}

export function overviewForDocument(doc: LegalDocument): AiOverviewResult {
  return buildAiOverview(`${doc.title} ${doc.tags.join(" ")} ${doc.category}`, doc.category);
}

// Ensure documents import used for side effects in tree shaking edge cases
void documents.length;
