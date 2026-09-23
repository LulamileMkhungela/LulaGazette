export type ExternalSource = {
  id: string;
  name: string;
  kind: "official" | "commercial" | "court-system" | "regulator";
  description: string;
  url?: string;
  howHelps: string;
  importSupported: boolean;
};

/** Registry of SA legal data sources — live API pulls require licences; demo supports manual import notes. */
export const externalSources: ExternalSource[] = [
  {
    id: "saflii",
    name: "SAFLII",
    kind: "official",
    description: "Free access to a wide range of South African judgments and legislation materials.",
    url: "https://www.saflii.org/",
    howHelps: "Use AI Overview + paste judgment citations into Lawyer import notes for your matter file.",
    importSupported: true,
  },
  {
    id: "gov-gazette",
    name: "Government Gazette / gov.za",
    kind: "official",
    description: "Authoritative publication of Acts, regulations and proclamations.",
    url: "https://www.gov.za/",
    howHelps: "Cross-check curated Act summaries against the latest Gazette text before advice or filing.",
    importSupported: true,
  },
  {
    id: "concourt",
    name: "Constitutional Court judgments",
    kind: "official",
    description: "Official Constitutional Court website and media summaries.",
    url: "https://www.concourt.org.za/",
    howHelps: "Open curated CC case cards then verify full text on the official site.",
    importSupported: true,
  },
  {
    id: "judiciary",
    name: "Judiciary of South Africa",
    kind: "official",
    description: "Court structure, directives and public information.",
    url: "https://www.judiciary.org.za/",
    howHelps: "Pair with Courts guides for filing and forum selection.",
    importSupported: false,
  },
  {
    id: "court-online",
    name: "Court Online / CaseLines (Gauteng & others)",
    kind: "court-system",
    description:
      "Electronic filing and case bundles used in several High Court divisions. Access is account-based for practitioners.",
    howHelps:
      "LulaGazette cannot log into Court Online for you. Export indexes/PDFs you are permitted to use, then paste matter notes under Lawyer tools → Import.",
    importSupported: true,
  },
  {
    id: "lexpro",
    name: "Lexpro / commercial case research tools",
    kind: "commercial",
    description:
      "Subscription research products used by many SA firms for reported cases and headnotes. Content is licensed — not scrapable into this open demo.",
    howHelps:
      "Keep your Lexpro/Juta/Lexis subscription. Copy citations and headnotes you are licensed to use into Import notes; LulaGazette structures procedure, templates and citizen guidance around them.",
    importSupported: true,
  },
  {
    id: "juta-lexis",
    name: "Juta / LexisNexis law reports",
    kind: "commercial",
    description: "Authorised law reports and annotated statutes used in professional practice.",
    howHelps: "Treat LulaGazette extracts as maps, not substitutes, for authorised reports.",
    importSupported: true,
  },
  {
    id: "ccma",
    name: "CCMA",
    kind: "regulator",
    description: "Forms, rules and referrals for labour disputes.",
    url: "https://www.ccma.org.za/",
    howHelps: "Form 7.11 helper + LRA guides reduce repeat consultations before you file the official form.",
    importSupported: false,
  },
  {
    id: "info-reg",
    name: "Information Regulator",
    kind: "regulator",
    description: "POPIA/PAIA regulator — complaints and guidance.",
    url: "https://inforegulator.org.za/",
    howHelps: "POPIA request templates and privacy policy aligned to RSA law.",
    importSupported: false,
  },
  {
    id: "ncr",
    name: "National Credit Regulator",
    kind: "regulator",
    description: "Credit industry regulator under the NCA.",
    url: "https://www.ncr.org.za/",
    howHelps: "Debt-stress guide + NCA overview for first-pass consumer understanding.",
    importSupported: false,
  },
  {
    id: "cipc",
    name: "CIPC",
    kind: "regulator",
    description: "Companies and intellectual property commission filings.",
    url: "https://www.cipc.co.za/",
    howHelps: "Companies Act notes + board resolution templates for SMEs.",
    importSupported: false,
  },
  {
    id: "legal-aid",
    name: "Legal Aid South Africa",
    kind: "official",
    description: "State-funded legal assistance for qualifying persons.",
    url: "https://www.legal-aid.co.za/",
    howHelps: "Guides tell users when to stop DIY and seek Legal Aid or private counsel.",
    importSupported: false,
  },
];
