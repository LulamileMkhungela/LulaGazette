export type DirectoryEntry = {
  id: string;
  name: string;
  category:
    | "Courts"
    | "Regulators"
    | "Legal aid & clinics"
    | "Labour"
    | "Police & justice"
    | "Municipal"
    | "Professional bodies";
  description: string;
  audience: ("individual" | "lawyer" | "all")[];
  phone?: string;
  email?: string;
  website?: string;
  address?: string;
  whenToContact: string;
};

export const directory: DirectoryEntry[] = [
  {
    id: "concourt",
    name: "Constitutional Court of South Africa",
    category: "Courts",
    description: "Apex court on constitutional matters; public information and judgments.",
    audience: ["all"],
    website: "https://www.concourt.org.za/",
    address: "1 Hospital Street, Constitutional Hill, Braamfontein, Johannesburg",
    whenToContact: "Judgment access, directions, and constitutional litigation information — not walk-in legal advice.",
  },
  {
    id: "sca",
    name: "Supreme Court of Appeal",
    category: "Courts",
    description: "Appeals from the High Court (subject to leave).",
    audience: ["lawyer", "all"],
    website: "https://www.supremecourtofappeal.org.za/",
    address: "Bloemfontein",
    whenToContact: "Appeal enquiries via practitioners; check rules and practice directions.",
  },
  {
    id: "jhb-high-court",
    name: "Gauteng Local Division, Johannesburg (High Court)",
    category: "Courts",
    description: "High Court local division — civil, urgent court, commercial lists; Court Online/CaseLines practice.",
    audience: ["lawyer", "all"],
    website: "https://www.judiciary.org.za/",
    address: "Pritchard Street / Von Brandis precinct, Johannesburg CBD (confirm current public entrance)",
    whenToContact: "Issuing, filing and roll enquiries via Registrar — practitioners usually file electronically.",
  },
  {
    id: "jhb-mags",
    name: "Johannesburg Magistrates’ Court",
    category: "Courts",
    description: "District/regional magistrates’ matters — civil and criminal.",
    audience: ["all"],
    address: "Fox Street area, Johannesburg CBD (confirm court building for your case number)",
    whenToContact: "Clerk of the court for issuing small/ordinary process; bring case number and ID.",
  },
  {
    id: "small-claims-jhb",
    name: "Small Claims Court (Johannesburg area)",
    category: "Courts",
    description: "Lower-value civil claims with simplified procedure.",
    audience: ["individual", "all"],
    website: "https://www.justice.gov.za/",
    whenToContact: "After a letter of demand; clerk assists with forms. Confirm monetary ceiling.",
  },
  {
    id: "ccma",
    name: "CCMA",
    category: "Labour",
    description: "Commission for Conciliation, Mediation and Arbitration — unfair dismissal and labour disputes.",
    audience: ["all"],
    website: "https://www.ccma.org.za/",
    phone: "0861 16 16 16",
    whenToContact: "Refer Form 7.11 disputes; check bargaining council coverage first.",
  },
  {
    id: "dol",
    name: "Department of Employment and Labour",
    category: "Labour",
    description: "BCEA inspections, employment equity reporting themes, national minimum wage information.",
    audience: ["all"],
    website: "https://www.labour.gov.za/",
    whenToContact: "Workplace standards complaints; UIF queries via official channels.",
  },
  {
    id: "info-reg",
    name: "Information Regulator (South Africa)",
    category: "Regulators",
    description: "POPIA and PAIA regulator — complaints and guidance.",
    audience: ["all"],
    website: "https://inforegulator.org.za/",
    email: "enquiries@inforegulator.org.za",
    whenToContact: "After you tried the responsible party’s information officer; privacy and access complaints.",
  },
  {
    id: "ncr",
    name: "National Credit Regulator",
    category: "Regulators",
    description: "Credit industry regulator under the National Credit Act.",
    audience: ["individual", "all"],
    website: "https://www.ncr.org.za/",
    whenToContact: "Reckless lending complaints, unregistered credit providers, debt counselling system issues.",
  },
  {
    id: "ncc",
    name: "National Consumer Commission",
    category: "Regulators",
    description: "Consumer Protection Act complaints and enforcement themes.",
    audience: ["individual", "all"],
    website: "https://www.thencc.gov.za/",
    whenToContact: "After written complaint to the supplier; defective goods and unfair contract practice escalations.",
  },
  {
    id: "cipc",
    name: "CIPC",
    category: "Regulators",
    description: "Companies and Intellectual Property Commission — company registrations and disclosures.",
    audience: ["lawyer", "all"],
    website: "https://www.cipc.co.za/",
    whenToContact: "Company registration, annual returns, director changes.",
  },
  {
    id: "sars",
    name: "SARS",
    category: "Regulators",
    description: "South African Revenue Service — tax administration.",
    audience: ["all"],
    website: "https://www.sars.gov.za/",
    whenToContact: "Tax compliance, eFiling, crypto asset guidance pages.",
  },
  {
    id: "legal-aid",
    name: "Legal Aid South Africa",
    category: "Legal aid & clinics",
    description: "State-funded legal assistance for qualifying persons.",
    audience: ["individual", "all"],
    website: "https://www.legal-aid.co.za/",
    phone: "0800 110 110",
    whenToContact: "When you cannot afford a private lawyer and meet means tests — criminal, civil, and certain advice services.",
  },
  {
    id: "wits-clinic",
    name: "University law clinics (e.g. Wits Law Clinic)",
    category: "Legal aid & clinics",
    description: "Student clinics under supervision — civil matters for qualifying clients in Johannesburg.",
    audience: ["individual", "all"],
    website: "https://www.wits.ac.za/",
    address: "Braamfontein / university precinct (confirm intake days)",
    whenToContact: "Civil matters, labour and housing advice subject to clinic mandates and queues.",
  },
  {
    id: "probono",
    name: "ProBono.Org",
    category: "Legal aid & clinics",
    description: "Clears qualifying matters to volunteer practitioners.",
    audience: ["individual", "all"],
    website: "https://www.probono.org.za/",
    whenToContact: "When you need pro bono referral screening.",
  },
  {
    id: "lpc",
    name: "Legal Practice Council",
    category: "Professional bodies",
    description: "Regulator of legal practitioners — find an attorney, complaints about practitioners.",
    audience: ["all"],
    website: "https://lpc.org.za/",
    whenToContact: "Search for practising attorneys; lodge professional conduct complaints.",
  },
  {
    id: "jhb-bar",
    name: "Johannesburg Society of Advocates / Bar",
    category: "Professional bodies",
    description: "Referral advocacy profession — advocates briefed by attorneys.",
    audience: ["lawyer", "all"],
    website: "https://www.johannesburgbar.co.za/",
    whenToContact: "Attorneys brief counsel; individuals ordinarily go via an attorney.",
  },
  {
    id: "saps",
    name: "SAPS (South African Police Service)",
    category: "Police & justice",
    description: "Report crime, obtain CAS numbers, affidavits.",
    audience: ["individual", "all"],
    website: "https://www.saps.gov.za/",
    phone: "10111",
    whenToContact: "Emergencies 10111; local station for case follow-up and statements.",
  },
  {
    id: "doj",
    name: "Department of Justice and Constitutional Development",
    category: "Police & justice",
    description: "Courts administration, Masters, justice services information.",
    audience: ["all"],
    website: "https://www.justice.gov.za/",
    whenToContact: "General justice service information; Masters for deceased estates.",
  },
  {
    id: "coburg",
    name: "City of Johannesburg — customer service",
    category: "Municipal",
    description: "Municipal accounts, housing/engagment pathways, local by-law enforcement themes.",
    audience: ["individual", "all"],
    website: "https://www.joburg.org.za/",
    whenToContact: "Rates, emergency housing queries routed via city departments, planning counters.",
  },
  {
    id: "rental-tribunal-gp",
    name: "Gauteng Rental Housing Tribunal",
    category: "Municipal",
    description: "Residential lease unfair practice disputes in Gauteng.",
    audience: ["individual", "all"],
    website: "https://www.gauteng.gov.za/",
    whenToContact: "Deposit, repairs, unlawful lockout complaints in rental housing (alongside PIE where relevant).",
  },
];

export function directoryForAudience(audience: "individual" | "lawyer") {
  const list = directory.filter((d) => d.audience.includes("all") || d.audience.includes(audience));
  return [...list].sort((a, b) => {
    const score = (d: DirectoryEntry) => {
      if (d.audience.includes(audience) && !d.audience.includes("all")) return 0;
      if (d.audience.includes(audience)) return 1;
      return 2;
    };
    return score(a) - score(b) || a.name.localeCompare(b.name);
  });
}
