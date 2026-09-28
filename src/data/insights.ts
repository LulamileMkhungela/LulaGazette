import { africanCountries } from "./africanCountries";

export type InsightCard = {
  id: string;
  kind: "document" | "collection" | "explainer";
  title: string;
  /** Plain-language teaser */
  teaser: string;
  href: string;
  year?: number;
  countryCode: string;
  country?: string;
  audience: ("individual" | "lawyer" | "all")[];
};

export const curatedInsightCards: InsightCard[] = [
  // ==========================================
  // SOUTH AFRICA (ZA) - STRICTLY SOUTH AFRICAN
  // ==========================================
  {
    id: "nhi-act",
    kind: "document",
    title: "National Health Insurance Act 20 of 2023",
    teaser:
      "South Africa’s framework for universal health coverage through the NHI Fund — what it means for access to care, and why implementation regulations still matter day-to-day.",
    href: "/d/nhi-20-2023",
    year: 2023,
    countryCode: "ZA",
    country: "South Africa",
    audience: ["all"],
  },
  {
    id: "acts-since-2023",
    kind: "collection",
    title: "Key Acts signed or in focus since 2023",
    teaser:
      "Browse major national statutes shaping health, property, labour and privacy in South Africa — newest first.",
    href: "/s?c=acts&country=ZA&sort=year-desc&startDate=2023&limit=20&page=1",
    countryCode: "ZA",
    country: "South Africa",
    audience: ["all"],
  },
  {
    id: "popia-2025-regs",
    kind: "explainer",
    title: "POPIA 2025: you can object or fix your data by WhatsApp or SMS",
    teaser:
      "From 17 April 2025, amended POPIA Regulations make it easier for ordinary people in South Africa to object to processing and request correction or deletion — including by email, SMS and WhatsApp.",
    href: "/d/reg-popia-2025",
    year: 2025,
    countryCode: "ZA",
    country: "South Africa",
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
    countryCode: "ZA",
    country: "South Africa",
    audience: ["individual"],
  },
  {
    id: "expropriation-2024",
    kind: "document",
    title: "Expropriation Act 13 of 2024",
    teaser:
      "New national rules for expropriation of property for public purpose or public interest in South Africa, including how compensation debates fit under section 25 of the Constitution.",
    href: "/d/expropriation-13-2024",
    year: 2024,
    countryCode: "ZA",
    country: "South Africa",
    audience: ["all"],
  },
  {
    id: "pie-lockout",
    kind: "explainer",
    title: "Illegal lock-outs: you generally need a court order first",
    teaser:
      "Under the PIE Act and section 26(3) of the South African Constitution, no one may be evicted from their home without a court order after a just and equitable enquiry.",
    href: "/d/pie-19-1998",
    countryCode: "ZA",
    country: "South Africa",
    audience: ["individual"],
  },
  {
    id: "ccma-30-days",
    kind: "explainer",
    title: "Fired from work? The CCMA 30-day clock is running",
    teaser:
      "Unfair dismissal disputes under the South African LRA are generally referred within 30 days of dismissal (s 191). Late referrals require formal condonation applications.",
    href: "/guides/fired-from-job",
    countryCode: "ZA",
    country: "South Africa",
    audience: ["individual"],
  },
  {
    id: "const-bill",
    kind: "document",
    title: "Constitution of the Republic of South Africa, 1996",
    teaser:
      "The supreme law of South Africa — Bill of Rights, dignity, equality, housing, just administrative action and access to courts. Start here for any constitutional rights question.",
    href: "/d/const-1996",
    year: 1996,
    countryCode: "ZA",
    country: "South Africa",
    audience: ["all"],
  },
  {
    id: "blue-moonlight",
    kind: "document",
    title: "City of Johannesburg v Blue Moonlight Properties 2012 (2) SA 104 (CC)",
    teaser:
      "Constitutional Court: municipalities must plan for emergency housing even when eviction is from private property — cornerstone of urban PIE practice in SA.",
    href: "/d/blue-moonlight-2011",
    year: 2011,
    countryCode: "ZA",
    country: "South Africa",
    audience: ["lawyer"],
  },
  {
    id: "sidumo",
    kind: "document",
    title: "Sidumo v Rustenburg Platinum Mines 2008 (2) SA 24 (CC)",
    teaser:
      "The reasonableness test for reviewing CCMA arbitration awards in South African labour law: is the decision one that a reasonable decision-maker could not reach?",
    href: "/d/sidumo-2007",
    year: 2007,
    countryCode: "ZA",
    country: "South Africa",
    audience: ["lawyer"],
  },
  {
    id: "uniform-rules",
    kind: "document",
    title: "Uniform Rules of Court — High Court procedure map",
    teaser:
      "Rule 6 applications, actions, discovery and reviews in the High Court of South Africa — plus Court Online and CaseLines practice directives.",
    href: "/d/uniform-rules",
    countryCode: "ZA",
    country: "South Africa",
    audience: ["lawyer"],
  },

  // ==========================================
  // NAMIBIA (NA) - STRICTLY NAMIBIAN (NO SARS, NO SA ITEMS)
  // ==========================================
  {
    id: "na-const-card",
    kind: "document",
    title: "Constitution of the Republic of Namibia (1990)",
    teaser:
      "The supreme law of Namibia — Chapter 3 Bill of Fundamental Human Rights and Freedoms, Article 18 administrative justice, and the independence of the Namibian courts.",
    href: "/d/na-constitution",
    year: 1990,
    countryCode: "NA",
    country: "Namibia",
    audience: ["all"],
  },
  {
    id: "na-labour-card",
    kind: "document",
    title: "Labour Act 11 of 2007 (Namibia)",
    teaser:
      "Namibia’s cornerstone employment legislation — protection against unfair dismissal, conciliation through the Office of the Labour Commissioner, and statutory dispute arbitration.",
    href: "/d/na-primary-statute",
    year: 2007,
    countryCode: "NA",
    country: "Namibia",
    audience: ["all"],
  },
  {
    id: "na-tax-namra-card",
    kind: "explainer",
    title: "Namibia Revenue Agency (NamRA) Tax Compliance & ITAS",
    teaser:
      "In Namibian tax practice, individual income tax, corporate tax, and VAT are administered by NamRA under the Income Tax Act of Namibia via the Integrated Tax Administration System (ITAS).",
    href: "/d/na-official-gazette",
    year: 2024,
    countryCode: "NA",
    country: "Namibia",
    audience: ["individual"],
  },
  {
    id: "na-gazette-card",
    kind: "document",
    title: "Government Gazette of the Republic of Namibia",
    teaser:
      "Official statutory notices, ministerial regulations, proclamation notices, and High Court practice directives published by authority in Windhoek.",
    href: "/d/na-official-gazette",
    year: 2024,
    countryCode: "NA",
    country: "Namibia",
    audience: ["all"],
  },
  {
    id: "na-supreme-court-card",
    kind: "document",
    title: "Supreme Court of Namibia — Constitutional Review Jurisprudence",
    teaser:
      "The apex court of Namibia on constitutional legality, separation of powers, and the enforcement of Article 18 administrative justice requirements in Windhoek.",
    href: "/d/na-apex-judgment",
    year: 2023,
    countryCode: "NA",
    country: "Namibia",
    audience: ["lawyer"],
  },
  {
    id: "na-high-court-rules-card",
    kind: "explainer",
    title: "High Court of Namibia Rules & Judicial Case Management (JCM)",
    teaser:
      "Civil procedure in the Main Division (Windhoek) and Northern Local Division (Oshakati) — mandatory judicial case management, electronic filings via e-Justice, and mediation.",
    href: "/s?c=court-rules&country=NA",
    countryCode: "NA",
    country: "Namibia",
    audience: ["lawyer"],
  },
  {
    id: "na-acts-collection-card",
    kind: "collection",
    title: "Statutes & Legislation of the Republic of Namibia",
    teaser:
      "Browse the complete library of codified Acts, parliamentary statutes, and official gazettes of Namibia — newest enactments first.",
    href: "/s?c=acts&country=NA&sort=year-desc&limit=20&page=1",
    countryCode: "NA",
    country: "Namibia",
    audience: ["all"],
  },
  {
    id: "na-lac-rights-card",
    kind: "explainer",
    title: "Legal Assistance Centre (LAC) & Constitutional Human Rights",
    teaser:
      "Namibia’s public interest litigation precedents — indigenous land rights, gender equality, environmental protections, and equal protection under Article 10.",
    href: "/s?country=NA",
    countryCode: "NA",
    country: "Namibia",
    audience: ["individual"],
  },

  // ==========================================
  // KENYA (KE) - STRICTLY KENYAN
  // ==========================================
  {
    id: "ke-const-card",
    kind: "document",
    title: "Constitution of Kenya, 2010",
    teaser:
      "The supreme law of Kenya — Chapter 4 Bill of Rights, devolved government structure, judicial review, and the constitutional mandate of the Supreme Court in Nairobi.",
    href: "/d/ke-const-2010",
    year: 2010,
    countryCode: "KE",
    country: "Kenya",
    audience: ["all"],
  },
  {
    id: "ke-data-prot-card",
    kind: "document",
    title: "Data Protection Act, 2019 (Kenya)",
    teaser:
      "Kenya’s comprehensive data privacy statutory regime — rights of data subjects, cross-border data transfer limitations, and enforcement by the Office of the Data Protection Commissioner (ODPC).",
    href: "/d/ke-data-protection-2019",
    year: 2019,
    countryCode: "KE",
    country: "Kenya",
    audience: ["all"],
  },
  {
    id: "ke-employment-card",
    kind: "document",
    title: "Employment Act (Cap 226, Laws of Kenya)",
    teaser:
      "Substantive and procedural fairness standards in Kenyan employment disputes, notice periods, severance pay, and adjudication before the Employment and Labour Relations Court (ELRC).",
    href: "/d/ke-employment-act-2007",
    year: 2007,
    countryCode: "KE",
    country: "Kenya",
    audience: ["individual"],
  },
  {
    id: "ke-raila-sc-card",
    kind: "document",
    title: "Supreme Court of Kenya: Presidential Election Petition 2022",
    teaser:
      "Landmark apex court ruling analyzing constitutional election standards, digital transmission of result forms, and the evidentiary burden of proof under Article 140.",
    href: "/d/ke-cases-raila-2022",
    year: 2022,
    countryCode: "KE",
    country: "Kenya",
    audience: ["lawyer"],
  },
  {
    id: "ke-gazette-card",
    kind: "document",
    title: "The Kenya Gazette — Official Notices & Practice Directions",
    teaser:
      "Published by Authority of the Government of Kenya in Nairobi — statutory appointments, ministerial regulations, land registration notices, and Chief Justice directives.",
    href: "/d/scraped-ke-gazette-notice-2026",
    year: 2026,
    countryCode: "KE",
    country: "Kenya",
    audience: ["all"],
  },

  // ==========================================
  // NIGERIA (NG) - STRICTLY NIGERIAN
  // ==========================================
  {
    id: "ng-const-card",
    kind: "document",
    title: "Constitution of the Federal Republic of Nigeria 1999",
    teaser:
      "The supreme law of Nigeria — Chapter IV Fundamental Rights, federal legislative lists, and the appellate jurisdiction of the Supreme Court of Nigeria in Abuja.",
    href: "/d/ng-const-1999",
    year: 1999,
    countryCode: "NG",
    country: "Nigeria",
    audience: ["all"],
  },
  {
    id: "ng-cama-card",
    kind: "document",
    title: "Companies and Allied Matters Act (CAMA) 2020",
    teaser:
      "Nigeria's principal corporate statutory framework — single-member companies, virtual shareholder meetings, electronic share transfers, and CAC statutory compliance.",
    href: "/d/ng-cama-2020",
    year: 2020,
    countryCode: "NG",
    country: "Nigeria",
    audience: ["all"],
  },
  {
    id: "ng-ndpa-card",
    kind: "document",
    title: "Nigeria Data Protection Act (NDPA) 2023",
    teaser:
      "Nigeria's statutory personal data governance framework, data subject rights, mandatory DPO designations, and regulatory oversight by the NDPC.",
    href: "/d/ng-ndpa-2023",
    year: 2023,
    countryCode: "NG",
    country: "Nigeria",
    audience: ["individual"],
  },
  {
    id: "ng-vat-card",
    kind: "document",
    title: "Supreme Court of Nigeria: Federalism & VAT Jurisprudence",
    teaser:
      "Constitutional adjudication on the division of fiscal powers between the Federal Government (FIRS) and State Internal Revenue Services under the 1999 Constitution.",
    href: "/d/ng-cases-vat-2023",
    year: 2023,
    countryCode: "NG",
    country: "Nigeria",
    audience: ["lawyer"],
  },

  // ==========================================
  // GHANA (GH) - STRICTLY GHANAIAN
  // ==========================================
  {
    id: "gh-const-card",
    kind: "document",
    title: "Constitution of the Republic of Ghana, 1992",
    teaser:
      "The supreme law of Ghana — Chapter 5 Fundamental Human Rights and Freedoms, the Directive Principles of State Policy, and the original jurisdiction of the Supreme Court in Accra.",
    href: "/d/gh-const-1992",
    year: 1992,
    countryCode: "GH",
    country: "Ghana",
    audience: ["all"],
  },
  {
    id: "gh-companies-card",
    kind: "document",
    title: "Companies Act, 2019 (Act 992) — Ghana",
    teaser:
      "Ghana's modern corporate governance framework — beneficial ownership disclosures, abolition of ultra vires doctrine, and qualifications for company directors.",
    href: "/d/gh-companies-2019",
    year: 2019,
    countryCode: "GH",
    country: "Ghana",
    audience: ["all"],
  },
  {
    id: "gh-labour-card",
    kind: "document",
    title: "Labour Act, 2003 (Act 651) — Ghana",
    teaser:
      "Regulating employment relationships, unfair dismissals, collective bargaining agreements, and dispute resolution before the National Labour Commission (NLC) in Accra.",
    href: "/d/gh-labour-2003",
    year: 2003,
    countryCode: "GH",
    country: "Ghana",
    audience: ["individual"],
  },

  // ==========================================
  // BOTSWANA (BW) - STRICTLY BOTSWANA
  // ==========================================
  {
    id: "bw-const-card",
    kind: "document",
    title: "Constitution of the Republic of Botswana (1966)",
    teaser:
      "The supreme law of Botswana — fundamental human rights, constitutional supremacy, and the judicial authority of the Court of Appeal and High Court in Gaborone.",
    href: "/d/bw-constitution",
    year: 1966,
    countryCode: "BW",
    country: "Botswana",
    audience: ["all"],
  },
  {
    id: "bw-employment-card",
    kind: "document",
    title: "Employment Act (Cap 47:01, Laws of Botswana)",
    teaser:
      "Statutory protections regarding contracts of employment, termination procedures, severance benefits, and dispute settlement before the Industrial Court of Botswana.",
    href: "/d/bw-primary-statute",
    countryCode: "BW",
    country: "Botswana",
    audience: ["individual"],
  },

  // ==========================================
  // EGYPT (EG) - STRICTLY EGYPTIAN
  // ==========================================
  {
    id: "eg-const-card",
    kind: "document",
    title: "Constitution of the Arab Republic of Egypt (2014)",
    teaser:
      "The supreme law of Egypt — civil rights, social justice, the rule of law, and the constitutional review jurisdiction of the Supreme Constitutional Court in Cairo.",
    href: "/d/eg-constitution",
    year: 2014,
    countryCode: "EG",
    country: "Egypt",
    audience: ["all"],
  },
  {
    id: "eg-gazette-card",
    kind: "document",
    title: "Egyptian Official Gazette (Al-Jarida Al-Rasmiyya)",
    teaser:
      "Official government enactments, presidential decrees, ministerial orders, and judicial rulings published by authority in Cairo.",
    href: "/d/eg-official-gazette",
    year: 2024,
    countryCode: "EG",
    country: "Egypt",
    audience: ["all"],
  },

  // ==========================================
  // PAN-AFRICAN / AU (AU) - TREATIES & CONTINENTAL LAW
  // ==========================================
  {
    id: "au-afcfta-card",
    kind: "document",
    title: "AfCFTA Agreement & Dispute Settlement Protocol",
    teaser:
      "The Pan-African framework establishing the single continental market — tariff liberalization, rules of origin, and international trade arbitration mechanisms across 54 member states.",
    href: "/d/au-afcfta-2018",
    year: 2018,
    countryCode: "AU",
    country: "Pan-African",
    audience: ["all"],
  },
  {
    id: "au-banjul-card",
    kind: "document",
    title: "African Charter on Human and Peoples' Rights (Banjul Charter)",
    teaser:
      "Foundational regional human rights instrument protecting civil, political, economic, social, and collective developmental rights across the African continent.",
    href: "/d/au-banjul-charter",
    year: 1981,
    countryCode: "AU",
    country: "Pan-African",
    audience: ["all"],
  },
  {
    id: "au-court-ogiek-card",
    kind: "document",
    title: "African Court on Human & Peoples' Rights — Ogiek Reparations Ruling",
    teaser:
      "Landmark continental judicial ruling in Arusha affirming indigenous community land rights, reparations, and state conservation obligations under the Banjul Charter.",
    href: "/d/au-cases-ogiek-2022",
    year: 2022,
    countryCode: "AU",
    country: "Pan-African",
    audience: ["lawyer"],
  },
];

/**
 * Generate country-specific insight cards dynamically for any of the 54 African countries
 * if not already explicitly hardcoded in curatedInsightCards.
 */
function generateCountryCards(countryCode: string): InsightCard[] {
  const c = africanCountries.find((item) => item.code.toUpperCase() === countryCode.toUpperCase());
  if (!c) return [];

  const cLower = c.code.toLowerCase();
  const primaryAct = c.keyActs && c.keyActs.length > 0 ? c.keyActs[0] : `${c.name} Primary Codified Statute`;

  return [
    {
      id: `${cLower}-const-card`,
      kind: "document",
      title: `Constitution of the Republic of ${c.name}`,
      teaser: `The supreme law of ${c.name} — fundamental human rights, constitutional supremacy, and the judicial authority of the ${c.apexCourt} in ${c.capital}.`,
      href: `/d/${cLower}-constitution`,
      year: 2018,
      countryCode: c.code,
      country: c.name,
      audience: ["all"],
    },
    {
      id: `${cLower}-act-card`,
      kind: "document",
      title: primaryAct,
      teaser: `Statutory framework of ${c.name} regulating legal rights, compliance duties, and procedural remedies under the ${c.legalSystem}.`,
      href: `/d/${cLower}-primary-statute`,
      year: 2021,
      countryCode: c.code,
      country: c.name,
      audience: ["all"],
    },
    {
      id: `${cLower}-gazette-card`,
      kind: "document",
      title: `${c.gazetteName} — Official Publication`,
      teaser: `Official national publication issuing statutory notices, ministerial instruments, and judicial directives published by authority in ${c.capital}.`,
      href: `/d/${cLower}-official-gazette`,
      year: 2024,
      countryCode: c.code,
      country: c.name,
      audience: ["all"],
    },
    {
      id: `${cLower}-apex-card`,
      kind: "document",
      title: `${c.apexCourt} Landmark Adjudication`,
      teaser: `Apex judicial determination in ${c.name} on constitutional supremacy, procedural fairness, and judicial review of administrative action.`,
      href: `/d/${cLower}-apex-judgment`,
      year: 2023,
      countryCode: c.code,
      country: c.name,
      audience: ["lawyer"],
    },
    {
      id: `${cLower}-collection-card`,
      kind: "collection",
      title: `Codified Acts & Legislation of ${c.name}`,
      teaser: `Browse the complete collection of Acts, court rules, and gazettes for ${c.name} — newest enactments first.`,
      href: `/s?c=acts&country=${c.code}&sort=year-desc&limit=20&page=1`,
      countryCode: c.code,
      country: c.name,
      audience: ["all"],
    },
  ];
}

/**
 * Filter cards strictly by audience AND strictly by selected country jurisdiction.
 * When on Namibia (NA), ONLY Namibian cards are returned (0 South African items).
 * When on South Africa (ZA), ONLY South African cards are returned.
 * When on Pan-Africa (all), Pan-African and continental treaties are returned.
 */
export function insightsForAudience(audience: "individual" | "lawyer", countryCode: string = "ZA"): InsightCard[] {
  const targetCode = (countryCode || "ZA").toUpperCase();

  let pool: InsightCard[] = [];

  if (targetCode === "ALL") {
    // Pan-African / Continental view: return AU and Pan-African regional cards
    pool = curatedInsightCards.filter((c) => c.countryCode === "AU");
  } else {
    // Specific nation: strictly filter by that country code
    pool = curatedInsightCards.filter((c) => c.countryCode.toUpperCase() === targetCode);

    // If country is not in curated list, generate dedicated cards for that nation
    if (pool.length === 0) {
      pool = generateCountryCards(targetCode);
    }
  }

  // Audience filtering: individual vs lawyer
  const filtered = pool.filter((c) => {
    if (c.audience.includes(audience)) return true;
    if (c.audience.includes("all")) return true;
    return false;
  });

  return [...filtered].sort((a, b) => {
    const score = (c: InsightCard) => {
      if (c.audience.includes(audience) && !c.audience.includes("all")) return 0;
      if (c.audience.includes(audience)) return 1;
      return 2;
    };
    return score(a) - score(b);
  });
}
