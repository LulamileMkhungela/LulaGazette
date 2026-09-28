import { africanCountries } from "./africanCountries";

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
  countryCode: string;
  country?: string;
  audience: ("individual" | "lawyer" | "all")[];
  phone?: string;
  email?: string;
  website?: string;
  address?: string;
  whenToContact: string;
};

export const baseDirectory: DirectoryEntry[] = [
  // ==========================================
  // SOUTH AFRICA (ZA)
  // ==========================================
  {
    id: "concourt",
    name: "Constitutional Court of South Africa",
    category: "Courts",
    description: "Apex court on constitutional matters; public information and judgments.",
    countryCode: "ZA",
    country: "South Africa",
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
    countryCode: "ZA",
    country: "South Africa",
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
    countryCode: "ZA",
    country: "South Africa",
    audience: ["lawyer", "all"],
    website: "https://www.judiciary.org.za/",
    address: "Pritchard Street / Von Brandis precinct, Johannesburg CBD",
    whenToContact: "Issuing, filing and roll enquiries via Registrar — practitioners usually file electronically.",
  },
  {
    id: "ccma-nat",
    name: "CCMA (Commission for Conciliation, Mediation and Arbitration)",
    category: "Labour",
    description: "National dispute resolution body for unfair dismissal, unfair labour practice, and mutual interest matters.",
    countryCode: "ZA",
    country: "South Africa",
    audience: ["all"],
    phone: "0861 16 16 16",
    website: "https://www.ccma.org.za/",
    whenToContact: "Within 30 days of dismissal (LRA s 191) using Form 7.11 referral.",
  },
  {
    id: "legal-aid-sa",
    name: "Legal Aid South Africa",
    category: "Legal aid & clinics",
    description: "State-funded legal aid in criminal matters and qualifying civil/family matters (means test applies).",
    countryCode: "ZA",
    country: "South Africa",
    audience: ["individual", "all"],
    phone: "0800 110 110",
    website: "https://legal-aid.co.za/",
    whenToContact: "When facing criminal charges or serious civil/family crises if you cannot afford a private attorney.",
  },
  {
    id: "sars",
    name: "South African Revenue Service (SARS)",
    category: "Regulators",
    description: "Tax administration, customs, electronic filing and taxpayer compliance in South Africa.",
    countryCode: "ZA",
    country: "South Africa",
    audience: ["all"],
    phone: "0800 00 7277",
    website: "https://www.sars.gov.za/",
    whenToContact: "Tax registration, eFiling, returns, disputes and voluntary disclosure in South Africa.",
  },
  {
    id: "info-reg-sa",
    name: "Information Regulator (South Africa)",
    category: "Regulators",
    description: "Independent regulator for POPIA and PAIA compliance.",
    countryCode: "ZA",
    country: "South Africa",
    audience: ["all"],
    website: "https://inforegulator.org.za/",
    whenToContact: "Data privacy breach notices, PAIA appeals, direct marketing complaints.",
  },
  {
    id: "lpc-nat",
    name: "Legal Practice Council (LPC)",
    category: "Professional bodies",
    description: "Regulator of legal practitioners (attorneys and advocates) in South Africa.",
    countryCode: "ZA",
    country: "South Africa",
    audience: ["all"],
    website: "https://lpc.org.za/",
    whenToContact: "Practitioner roll checks, professional misconduct complaints, trust account certificates.",
  },

  // ==========================================
  // NAMIBIA (NA) - STRICTLY NAMIBIAN (NO SARS, NO CCMA)
  // ==========================================
  {
    id: "na-supreme-court",
    name: "Supreme Court of Namibia",
    category: "Courts",
    description: "Apex judicial court of the Republic of Namibia with appellate and constitutional review jurisdiction.",
    countryCode: "NA",
    country: "Namibia",
    audience: ["all"],
    website: "https://e-justice.jud.na/",
    address: "Rev. Michael Scott Street, Windhoek, Namibia",
    whenToContact: "Appeals from the High Court, constitutional references, and apex jurisprudence.",
  },
  {
    id: "na-high-court",
    name: "High Court of Namibia (Main Division)",
    category: "Courts",
    description: "Superior court of record with general civil, commercial, and criminal jurisdiction, sitting in Windhoek and Oshakati.",
    countryCode: "NA",
    country: "Namibia",
    audience: ["all"],
    website: "https://e-justice.jud.na/",
    address: "Lüderitz Street, Windhoek, Namibia",
    whenToContact: "Civil actions, urgent applications, commercial injunctions, and Judicial Case Management (JCM).",
  },
  {
    id: "na-labour-commissioner",
    name: "Office of the Labour Commissioner (Namibia)",
    category: "Labour",
    description: "Statutory dispute resolution authority under the Labour Act 11 of 2007 for conciliation and arbitration of labour disputes.",
    countryCode: "NA",
    country: "Namibia",
    audience: ["all"],
    phone: "+264 61 206 6111",
    website: "https://mol.gov.na/",
    address: "Mercedes Street, Khomasdal, Windhoek",
    whenToContact: "Referring unfair dismissal, dispute of interest or right, and conciliation under the Namibian Labour Act.",
  },
  {
    id: "namra",
    name: "Namibia Revenue Agency (NamRA)",
    category: "Regulators",
    description: "Autonomous revenue administration agency responsible for domestic tax assessment, collection, and customs enforcement in Namibia.",
    countryCode: "NA",
    country: "Namibia",
    audience: ["all"],
    phone: "+264 61 290 8000",
    website: "https://www.namra.org.na/",
    address: "Moltke Street, Windhoek, Namibia",
    whenToContact: "Taxpayer registration, Integrated Tax Administration System (ITAS), income tax filings, customs, and VAT assessments in Namibia.",
  },
  {
    id: "na-lac",
    name: "Legal Assistance Centre (LAC) Namibia",
    category: "Legal aid & clinics",
    description: "Prominent public interest law centre in Namibia advocating for human rights, constitutional justice, and legal protections.",
    countryCode: "NA",
    country: "Namibia",
    audience: ["individual", "all"],
    phone: "+264 61 223 356",
    website: "https://www.lac.org.na/",
    address: "4 Körner Street, Windhoek, Namibia",
    whenToContact: "Public interest constitutional matters, human rights violations, and community legal education in Namibia.",
  },
  {
    id: "na-law-society",
    name: "Law Society of Namibia (LSN)",
    category: "Professional bodies",
    description: "Statutory professional regulatory body maintaining standards of practice, integrity, and ethical conduct for legal practitioners in Namibia.",
    countryCode: "NA",
    country: "Namibia",
    audience: ["all"],
    phone: "+264 61 230 263",
    website: "https://www.lawsocietynamibia.org/",
    address: "1st Floor, Namlex Chambers, 333 Independence Avenue, Windhoek",
    whenToContact: "Verification of admitted legal practitioners, professional ethical enquiries, and admission records.",
  },
  {
    id: "na-police",
    name: "Namibian Police Force (NAMPOL)",
    category: "Police & justice",
    description: "National police agency maintaining internal security, crime prevention, and law enforcement in Namibia.",
    countryCode: "NA",
    country: "Namibia",
    audience: ["all"],
    phone: "+264 61 209 3111",
    website: "https://www.nampol.gov.na/",
    address: "Galilei Street, Windhoek, Namibia",
    whenToContact: "Criminal complaints, police clearance certificates, reporting offences.",
  },
  {
    id: "na-windhoek-city",
    name: "City of Windhoek Municipal Council",
    category: "Municipal",
    description: "Local municipal government authority governing municipal services, planning, and urban bylaws in Windhoek.",
    countryCode: "NA",
    country: "Namibia",
    audience: ["individual", "all"],
    phone: "+264 61 290 2911",
    website: "https://www.windhoekcc.org.na/",
    address: "80 Independence Avenue, Windhoek",
    whenToContact: "Municipal rates, building plan compliance, local council regulations.",
  },

  // ==========================================
  // KENYA (KE) - STRICTLY KENYAN
  // ==========================================
  {
    id: "ke-supreme-court",
    name: "Supreme Court of Kenya",
    category: "Courts",
    description: "Apex court of Kenya with exclusive jurisdiction over presidential election petitions and constitutional appeals.",
    countryCode: "KE",
    country: "Kenya",
    audience: ["all"],
    website: "https://judiciary.go.ke/courts/supreme-court/",
    address: "Supreme Court Building, City Hall Way, Nairobi",
    whenToContact: "Presidential election disputes, advisory opinions, and appeals from Court of Appeal on constitutional matters.",
  },
  {
    id: "ke-elrc",
    name: "Employment and Labour Relations Court (ELRC Kenya)",
    category: "Labour",
    description: "Specialized superior court of record with jurisdiction over employment and labour relations disputes in Kenya.",
    countryCode: "KE",
    country: "Kenya",
    audience: ["all"],
    website: "https://judiciary.go.ke/",
    address: "Milimani Law Courts, Nairobi",
    whenToContact: "Unfair termination, trade union collective disputes, and breach of Employment Act.",
  },
  {
    id: "kra",
    name: "Kenya Revenue Authority (KRA)",
    category: "Regulators",
    description: "Assessment, collection, and accounting for all revenues in accordance with the laws of Kenya.",
    countryCode: "KE",
    country: "Kenya",
    audience: ["all"],
    phone: "+254 20 499 9999",
    website: "https://www.kra.go.ke/",
    address: "Times Tower, Haile Selassie Avenue, Nairobi",
    whenToContact: "iTax filings, KRA PIN registration, tax compliance certificates, and customs.",
  },
  {
    id: "ke-lsk",
    name: "Law Society of Kenya (LSK)",
    category: "Professional bodies",
    description: "Premier bar association regulating the legal profession and promoting the rule of law in Kenya.",
    countryCode: "KE",
    country: "Kenya",
    audience: ["all"],
    phone: "+254 111 045 300",
    website: "https://lsk.or.ke/",
    address: "Lavington, Opp Valley Arcade, Nairobi",
    whenToContact: "Search advocate directory, file professional conduct complaints, and continuing legal education.",
  },

  // ==========================================
  // NIGERIA (NG) - STRICTLY NIGERIAN
  // ==========================================
  {
    id: "ng-supreme-court",
    name: "Supreme Court of Nigeria",
    category: "Courts",
    description: "Apex court in Nigeria with final appellate jurisdiction in all legal matters.",
    countryCode: "NG",
    country: "Nigeria",
    audience: ["all"],
    website: "https://supremecourt.gov.ng/",
    address: "Three Arms Zone, Abuja",
    whenToContact: "Final appeals on federal statutes, state borders, and constitutional interpretation.",
  },
  {
    id: "ng-nicn",
    name: "National Industrial Court of Nigeria (NICN)",
    category: "Labour",
    description: "Specialized court with exclusive civil jurisdiction over labour, employment, and trade union disputes.",
    countryCode: "NG",
    country: "Nigeria",
    audience: ["all"],
    website: "https://nicn.gov.ng/",
    address: "Area 3, Garki, Abuja",
    whenToContact: "Wrongful termination, workplace discrimination, pensions, and trade union disputes.",
  },
  {
    id: "firs",
    name: "Federal Inland Revenue Service (FIRS)",
    category: "Regulators",
    description: "Federal agency responsible for assessing, collecting, and accounting for federal taxes in Nigeria.",
    countryCode: "NG",
    country: "Nigeria",
    audience: ["all"],
    website: "https://www.firs.gov.ng/",
    address: "Revenue House, 20 Sokode Crescent, Wuse Zone 5, Abuja",
    whenToContact: "Corporate income tax, federal VAT, withholding tax, and TaxPro-Max filings.",
  },
  {
    id: "nba-ng",
    name: "Nigerian Bar Association (NBA)",
    category: "Professional bodies",
    description: "Non-profit, umbrella association of all legal practitioners called to the Nigerian Bar.",
    countryCode: "NG",
    country: "Nigeria",
    audience: ["all"],
    website: "https://nigerianbar.org.ng/",
    address: "NBA House, Plot 1101 Muhammadu Buhari Way, Abuja",
    whenToContact: "Practitioner roll verification, stamp and seal applications, professional discipline.",
  },

  // ==========================================
  // PAN-AFRICAN / CONTINENTAL ORGANS
  // ==========================================
  {
    id: "achpr",
    name: "African Court on Human and Peoples' Rights",
    category: "Courts",
    description: "Continental court established by African Union member states to ensure protection of human and peoples' rights in Africa.",
    countryCode: "AU",
    country: "Pan-African",
    audience: ["all"],
    website: "https://www.african-court.org/",
    address: "Dodoma Road, Arusha, Tanzania",
    whenToContact: "Human rights violations, petitions under the Banjul Charter Protocol.",
  },
  {
    id: "afcfta-secretariat",
    name: "AfCFTA Secretariat",
    category: "Regulators",
    description: "Operational body overseeing implementation of the African Continental Free Trade Area Agreement.",
    countryCode: "AU",
    country: "Pan-African",
    audience: ["all"],
    website: "https://afcfta.au.int/",
    address: "Africa Trade House, Ambassadorial Enclave, Accra, Ghana",
    whenToContact: "Cross-border continental trade rules of origin, dispute settlement protocols, and trade barriers.",
  },
];

export const directory: DirectoryEntry[] = baseDirectory;

function generateCountryDirectory(countryCode: string): DirectoryEntry[] {
  const c = africanCountries.find((item) => item.code.toUpperCase() === countryCode.toUpperCase());
  if (!c) return [];

  const cLower = c.code.toLowerCase();

  return [
    {
      id: `${cLower}-apex-court`,
      name: `${c.apexCourt} (${c.name})`,
      category: "Courts",
      description: `Apex judicial court of the Republic of ${c.name} exercising supreme constitutional and appellate review.`,
      countryCode: c.code,
      country: c.name,
      audience: ["all"],
      website: c.portalUrl || "https://africanlii.org",
      address: `${c.capital}, ${c.name}`,
      whenToContact: `Appellate filings, constitutional review, and authoritative jurisprudence in ${c.name}.`,
    },
    {
      id: `${cLower}-revenue`,
      name: `${c.name} National Tax & Revenue Authority`,
      category: "Regulators",
      description: `National statutory body responsible for taxation, customs duties, and taxpayer assessments in ${c.name}.`,
      countryCode: c.code,
      country: c.name,
      audience: ["all"],
      address: `${c.capital}, ${c.name}`,
      whenToContact: `Tax registration, statutory corporate filings, and compliance with the tax laws of ${c.name}.`,
    },
    {
      id: `${cLower}-labour`,
      name: `${c.name} Industrial & Labour Dispute Tribunal`,
      category: "Labour",
      description: `Statutory dispute resolution forum adjudicating workplace grievances, unfair termination, and collective bargaining in ${c.name}.`,
      countryCode: c.code,
      country: c.name,
      audience: ["all"],
      address: `${c.capital}, ${c.name}`,
      whenToContact: `Referral of unfair dismissals and employment disputes under the labour legislation of ${c.name}.`,
    },
    {
      id: `${cLower}-bar`,
      name: `Law Society / Bar Association of ${c.name}`,
      category: "Professional bodies",
      description: `Statutory regulator for legal practitioners, advocates, and solicitors practicing in ${c.name}.`,
      countryCode: c.code,
      country: c.name,
      audience: ["all"],
      address: `${c.capital}, ${c.name}`,
      whenToContact: `Verification of admitted legal practitioners, code of conduct enquiries, and roll admissions in ${c.name}.`,
    },
  ];
}

export function directoryForAudience(audience: "individual" | "lawyer", countryCode: string = "ZA"): DirectoryEntry[] {
  const targetCode = (countryCode || "ZA").toUpperCase();

  let pool: DirectoryEntry[] = [];

  if (targetCode === "ALL") {
    // Continental view: return Pan-African judicial and regulatory organs
    pool = baseDirectory.filter((d) => d.countryCode === "AU");
  } else {
    // Strict country filtering
    pool = baseDirectory.filter((d) => d.countryCode.toUpperCase() === targetCode);

    if (pool.length === 0) {
      pool = generateCountryDirectory(targetCode);
    }
  }

  const list = pool.filter((d) => d.audience.includes("all") || d.audience.includes(audience));

  return [...list].sort((a, b) => {
    const score = (d: DirectoryEntry) => {
      if (d.audience.includes(audience) && !d.audience.includes("all")) return 0;
      if (d.audience.includes(audience)) return 1;
      return 2;
    };
    return score(a) - score(b) || a.name.localeCompare(b.name);
  });
}
