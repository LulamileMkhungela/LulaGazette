/** Homepage insight cards (SA content). */

export type InsightCard = {
  id: string;
  kind: "document" | "collection" | "explainer";
  title: string;
  /** Plain-language teaser */
  teaser: string;
  href: string;
  year?: number;
  audience: ("individual" | "lawyer" | "all")[];
};

export const insightCards: InsightCard[] = [
  {
    id: "nhi-act",
    kind: "document",
    title: "National Health Insurance Act 20 of 2023",
    teaser:
      "South Africa’s framework for universal health coverage through the NHI Fund — what it means for access to care, and why implementation regulations still matter day-to-day.",
    href: "/d/nhi-20-2023",
    year: 2023,
    audience: ["all"],
  },
  {
    id: "acts-since-2023",
    kind: "collection",
    title: "Key Acts signed or in focus since 2023",
    teaser:
      "Browse major national statutes shaping health, property, labour and privacy — newest first.",
    href: "/s?c=acts&sort=year-desc&startDate=2023&limit=20&page=1",
    audience: ["all"],
  },
  {
    id: "popia-2025-regs",
    kind: "explainer",
    title: "POPIA 2025: you can object or fix your data by WhatsApp or SMS",
    teaser:
      "From 17 April 2025, amended POPIA Regulations make it easier for ordinary people to object to processing and request correction or deletion — including by email, SMS and WhatsApp. Opt-out is not consent for direct marketing.",
    href: "/d/reg-popia-2025",
    year: 2025,
    audience: ["individual"],
  },
  {
    id: "crypto-tax-sa",
    kind: "explainer",
    title: "The taxman and your crypto wallet: CGT on virtual assets",
    teaser:
      "In South African tax practice, crypto and other virtual assets are generally treated as assets for capital gains — disposals can trigger CGT. Keep records of every trade. (Educational note — confirm on SARS.)",
    href: "/d/sars-crypto-note",
    year: 2025,
    audience: ["individual"],
  },
  {
    id: "expropriation-2024",
    kind: "document",
    title: "Expropriation Act 13 of 2024",
    teaser:
      "New national rules for expropriation of property for public purpose or public interest, including how compensation debates fit under section 25 of the Constitution.",
    href: "/d/expropriation-13-2024",
    year: 2024,
    audience: ["all"],
  },
  {
    id: "pie-lockout",
    kind: "explainer",
    title: "Illegal lock-outs: you generally need a court order first",
    teaser:
      "Under the PIE Act and section 26(3) of the Constitution, no one may be evicted from their home without a court order after a just and equitable enquiry. Changing locks overnight is high-risk.",
    href: "/d/pie-19-1998",
    audience: ["individual"],
  },
  {
    id: "ccma-30-days",
    kind: "explainer",
    title: "Fired from work? The CCMA 30-day clock is running",
    teaser:
      "Unfair dismissal disputes are generally referred within 30 days of dismissal (LRA s 191). Late referrals need condonation. Start with the plain guide and Form 7.11 helper.",
    href: "/guides/fired-from-job",
    audience: ["individual"],
  },
  {
    id: "const-bill",
    kind: "document",
    title: "Constitution of the Republic of South Africa, 1996",
    teaser:
      "The supreme law — Bill of Rights, dignity, equality, housing, just administrative action and access to courts. Start here for almost any rights question.",
    href: "/d/const-1996",
    year: 1996,
    audience: ["all"],
  },
  {
    id: "blue-moonlight",
    kind: "document",
    title: "City of Johannesburg v Blue Moonlight Properties 2012 (2) SA 104 (CC)",
    teaser:
      "Constitutional Court: municipalities must plan for emergency housing even when eviction is from private property — cornerstone of urban PIE practice.",
    href: "/d/blue-moonlight-2011",
    year: 2011,
    audience: ["lawyer"],
  },
  {
    id: "sidumo",
    kind: "document",
    title: "Sidumo v Rustenburg Platinum Mines 2008 (2) SA 24 (CC)",
    teaser:
      "The reasonableness test for reviewing CCMA arbitration awards: is the decision one that a reasonable decision-maker could not reach?",
    href: "/d/sidumo-2007",
    year: 2007,
    audience: ["lawyer"],
  },
  {
    id: "uniform-rules",
    kind: "document",
    title: "Uniform Rules of Court — High Court procedure map",
    teaser:
      "Rule 6 applications, actions, discovery and reviews — plus why Gauteng Court Online / CaseLines practice directives matter before set-down.",
    href: "/d/uniform-rules",
    audience: ["lawyer"],
  },
  {
    id: "nca-debt",
    kind: "explainer",
    title: "Over-indebted? Debt review under the National Credit Act",
    teaser:
      "Registered debt counsellors can place you under debt review. Know your rights when collectors call — and diary any summons deadlines.",
    href: "/guides/debt-stress",
    audience: ["individual"],
  },
  {
    id: "lpa-practice",
    kind: "document",
    title: "Legal Practice Act 28 of 2014 — profession map",
    teaser:
      "LPC, admissions, professional conduct and the framework every practitioner works under. Useful when onboarding juniors or checking compliance themes.",
    href: "/d/legal-practice-28-2014",
    year: 2014,
    audience: ["lawyer"],
  },
  {
    id: "carmichele",
    kind: "document",
    title: "Carmichele v Minister of Safety and Security 2001 (4) SA 938 (CC)",
    teaser:
      "Delict and the Constitution — how the Court developed the common law on state duties. Classic authority for delict pleadings.",
    href: "/d/carmichele-2001",
    year: 2001,
    audience: ["lawyer"],
  },
];

/**
 * Individual: citizen cards + shared.
 * Lawyer: practitioner cards + shared.
 * Exclusive cards for the other audience are hidden.
 */
export function insightsForAudience(audience: "individual" | "lawyer") {
  const list = insightCards.filter((c) => {
    if (c.audience.includes(audience)) return true;
    if (c.audience.includes("all")) return true;
    return false;
  });
  return [...list].sort((a, b) => {
    const score = (c: InsightCard) => {
      if (c.audience.includes(audience) && !c.audience.includes("all")) return 0;
      if (c.audience.includes(audience)) return 1;
      return 2;
    };
    return score(a) - score(b);
  });
}
