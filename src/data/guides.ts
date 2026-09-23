export type ProblemGuide = {
  id: string;
  title: string;
  summary: string;
  audience: "everyone" | "citizen" | "employee" | "tenant" | "consumer" | "small-business";
  urgency: "low" | "medium" | "high";
  keywords: string[];
  symptoms: string[];
  doNow: string[];
  doNot: string[];
  steps: string[];
  documentsToGather: string[];
  relatedDocIds: string[];
  relatedTemplateIds: string[];
  relatedCourtIds: string[];
  whenToCallLawyer: string;
};

export const problemGuides: ProblemGuide[] = [
  {
    id: "fired-from-job",
    title: "I was fired or forced out of my job",
    summary:
      "Unfair dismissal and unfair labour practice pathways under the LRA — CCMA/bargaining council first, with strict time limits.",
    audience: "employee",
    urgency: "high",
    keywords: ["dismissal", "fired", "retrenchment", "ccma", "labour", "job", "employer"],
    symptoms: [
      "Told not to return to work",
      "Received a dismissal letter",
      "Retrenchment / restructuring",
      "Constructive dismissal (resigned because work became intolerable)",
    ],
    doNow: [
      "Write the exact dismissal date and keep the letter/WhatsApp/email.",
      "Diary 30 days from dismissal for an unfair dismissal referral (LRA s 191).",
      "List witnesses and save payslips, contract, warnings and policies.",
    ],
    doNot: [
      "Do not ignore the 30-day window — late referrals need condonation.",
      "Do not sign a full and final settlement you do not understand.",
      "Do not delete work emails or chat evidence.",
    ],
    steps: [
      "Check whether a bargaining council covers your sector; otherwise use the CCMA.",
      "Complete CCMA Form 7.11 (or council equivalent) and serve the employer.",
      "Attend conciliation — try to settle reinstate/compensate.",
      "If unresolved, use the certificate to go to arbitration (or Labour Court for certain disputes).",
      "Prepare a simple chronology for the commissioner.",
    ],
    documentsToGather: [
      "Employment contract / offer letter",
      "Dismissal letter and notice pay records",
      "Payslips (last 6–12 months)",
      "Warnings, hearing notices, minutes",
      "Job description and policies",
    ],
    relatedDocIds: ["lra-66-1995", "bcea-75-1997", "sidumo-2007", "form-ccma-7-11", "eea-55-1998"],
    relatedTemplateIds: ["tpl-ccma-711", "tpl-demand-employer", "tpl-settlement-labour"],
    relatedCourtIds: ["ccma", "labour-court"],
    whenToCallLawyer:
      "Automatically unfair dismissal (pregnancy, discrimination, protected strike), large packages, or complex retrenchments — instruct a labour attorney or union early.",
  },
  {
    id: "facing-eviction",
    title: "I am facing eviction or lock-out",
    summary:
      "PIE, ESTA (farms), Rental Housing processes and Constitution s 26(3) — no eviction without a court order after a just and equitable enquiry.",
    audience: "tenant",
    urgency: "high",
    keywords: ["eviction", "pie", "landlord", "lock out", "housing", "rental", "sheriff"],
    symptoms: [
      "Landlord changed locks",
      "Received eviction application / notice",
      "Municipality threatening removal",
      "Farm / rural occupation dispute",
    ],
    doNow: [
      "If locked out, contact SAPS / a housing advice office and note the time.",
      "Keep every notice, SMS and photo of the property.",
      "Check whether the case is under PIE (unlawful occupation) or ordinary lease cancellation.",
    ],
    doNot: [
      "Do not abandon the home without understanding the order.",
      "Do not ignore court papers — file a notice of intention to oppose if advised.",
      "Landlords: do not cut water/electricity as a pressure tactic without lawful process.",
    ],
    steps: [
      "Read any court papers carefully — note the return date.",
      "Open the PIE Act and Constitution housing notes in LulaGazette.",
      "Consider free legal aid / university law clinic / Housing Tribunal (rental disputes).",
      "If you are the owner seeking eviction, ensure PIE notice and municipal joinder where required.",
      "Ask the court about alternative accommodation where desperation is shown.",
    ],
    documentsToGather: [
      "Lease or proof of occupation",
      "Payment history",
      "Eviction application and annexures",
      "IDs and details of children / elderly / disabled occupants",
      "Photos of the dwelling",
    ],
    relatedDocIds: ["pie-19-1998", "const-1996", "grootboom-2000", "blue-moonlight-2011", "form-n1"],
    relatedTemplateIds: ["tpl-oppose-eviction", "tpl-notice-motion", "tpl-letter-landlord"],
    relatedCourtIds: ["magistrates-court", "high-court"],
    whenToCallLawyer:
      "Any lock-out, sheriff attendance, or High Court eviction — get urgent legal help the same day if possible.",
  },
  {
    id: "consumer-refund",
    title: "I bought something defective or was misled",
    summary:
      "Consumer Protection Act rights to fair marketing, quality goods, implied warranty and complaints to the NCC / ombuds / courts.",
    audience: "consumer",
    urgency: "medium",
    keywords: ["consumer", "refund", "defective", "warranty", "cpa", "shop", "ncc"],
    symptoms: [
      "Product broke within months",
      "Service not delivered as promised",
      "Hidden fees or unfair contract terms",
      "Direct marketing pressure",
    ],
    doNow: [
      "Keep till slips, contracts and photos/videos of the defect.",
      "Write a short complaint letter to the supplier with a clear remedy (repair / replace / refund).",
      "Diary response deadlines you give them (e.g. 10 business days).",
    ],
    doNot: [
      "Do not continue using a dangerous product.",
      "Do not rely only on verbal promises — confirm in writing.",
    ],
    steps: [
      "Send a written demand citing CPA quality/warranty themes.",
      "Escalate to the relevant industry ombud if available.",
      "Complain to the National Consumer Commission if unresolved.",
      "For lower value disputes, consider Small Claims Court.",
      "Keep a bundle of all correspondence for the hearing.",
    ],
    documentsToGather: ["Invoice/receipt", "Warranty card", "Photos", "Contract/Ts&Cs", "All emails"],
    relatedDocIds: ["cpa-68-2008", "nca-34-2005"],
    relatedTemplateIds: ["tpl-letter-demand-consumer", "tpl-small-claims-summons"],
    relatedCourtIds: ["small-claims", "magistrates-court"],
    whenToCallLawyer: "Large value goods, class-type issues, or personal injury from defective goods.",
  },
  {
    id: "debt-stress",
    title: "I cannot pay my debts / credit agreements",
    summary:
      "National Credit Act tools: affordability, reckless credit arguments, debt counselling and limits on certain collection practices.",
    audience: "citizen",
    urgency: "high",
    keywords: ["debt", "credit", "loan", "debt review", "nca", "emoluments", "garnishee"],
    symptoms: [
      "Multiple unpaid loans/store cards",
      "Emoluments attachment order on salary",
      "Harassment by collectors",
      "Threats of listing or legal action",
    ],
    doNow: [
      "List every creditor, balance, interest and account number.",
      "Stop taking new credit while you stabilise.",
      "Consider a registered debt counsellor for debt review (NCA s 86).",
    ],
    doNot: [
      "Do not ignore summons — default judgment can follow.",
      "Do not pay random ‘agents’ who promise to wipe debt without registration.",
    ],
    steps: [
      "Check statements for reckless lending red flags (no affordability check).",
      "Open NCA overview and note debt-review protections.",
      "If sued, diarise appearance-to-defend deadlines in the Magistrates’ Court.",
      "Negotiate written payment plans; keep proof of every payment.",
      "Seek legal aid if an EAO seems unlawful or excessive.",
    ],
    documentsToGather: ["Credit agreements", "Salary slips", "Bank statements", "Summons/J175", "AO documents"],
    relatedDocIds: ["nca-34-2005", "magistrates-rules", "form-summons-mc"],
    relatedTemplateIds: ["tpl-letter-creditor", "tpl-notice-defend", "tpl-small-claims-summons"],
    relatedCourtIds: ["magistrates-court", "small-claims"],
    whenToCallLawyer: "When summons is served, home is bonded, or EAOs threaten basic support.",
  },
  {
    id: "popia-breach",
    title: "My personal information was misused or leaked",
    summary:
      "POPIA data subject rights, complaints to the Information Regulator, and PAIA access requests.",
    audience: "everyone",
    urgency: "medium",
    keywords: ["popia", "privacy", "data leak", "id theft", "paia", "information officer"],
    symptoms: [
      "Unexpected marketing after sharing ID",
      "Data breach notice from a company",
      "Employer/school shared records without basis",
      "Refused access to your own file",
    ],
    doNow: [
      "Screenshot evidence and note dates.",
      "Email the responsible party’s information officer describing the issue and the remedy you want.",
      "Change passwords and monitor bank/credit accounts if IDs leaked.",
    ],
    doNot: [
      "Do not post full ID numbers publicly while complaining.",
      "Do not sign broad consents you do not understand.",
    ],
    steps: [
      "Identify the responsible party and operator (if any).",
      "Exercise POPIA rights: access, correction, objection, deletion where applicable.",
      "If ignored, complain to the Information Regulator with your bundle.",
      "Consider PAIA if you need records to enforce rights.",
      "For employees, also check EEA/LRA angles if discrimination is linked.",
    ],
    documentsToGather: ["IDs redacted copies", "Emails", "Contracts/privacy notices", "Breach letters"],
    relatedDocIds: ["popa-4-2013", "paia-2-2000", "reg-popia-regulations", "eea-55-1998"],
    relatedTemplateIds: ["tpl-popia-request", "tpl-paia-request", "tpl-letter-demand-consumer"],
    relatedCourtIds: ["high-court", "magistrates-court"],
    whenToCallLawyer: "Large-scale breaches, employer retaliation, or high-value commercial misuse of data.",
  },
  {
    id: "arrested-relative",
    title: "Someone was arrested — what now?",
    summary:
      "Constitution s 35 rights, first appearance, bail themes under the Criminal Procedure Act, and practical next steps for families.",
    audience: "citizen",
    urgency: "high",
    keywords: ["arrest", "bail", "police", "criminal", "charge", "saps"],
    symptoms: [
      "Relative detained at a station",
      "First court appearance pending",
      "Unsure about bail money / conditions",
    ],
    doNow: [
      "Get the police station name, CAS number and investigating officer.",
      "Ask whether the person has seen a doctor if injured.",
      "Contact Legal Aid SA or a criminal attorney before the first appearance if possible.",
    ],
    doNot: [
      "Do not discuss the facts of the case on social media.",
      "Do not try to ‘negotiate’ with complainants in a way that looks like interference.",
    ],
    steps: [
      "Confirm the charges and next court date.",
      "Read CPA bail overview and Constitution arrest rights notes.",
      "Prepare address, employment and community ties evidence for bail.",
      "Attend court early with ID and any surety documents.",
      "After release, diary all conditions (sign-ins, no-contact, passport).",
    ],
    documentsToGather: ["IDs", "Proof of address", "Employment letter", "Medical notes", "Previous bail receipts"],
    relatedDocIds: ["criminal-procedure-51-1977", "const-1996"],
    relatedTemplateIds: ["tpl-bail-affidavit", "tpl-letter-saps"],
    relatedCourtIds: ["magistrates-court", "high-court"],
    whenToCallLawyer: "Immediately for serious schedules, juveniles, or any allegation of assault in custody.",
  },
  {
    id: "start-business",
    title: "I am starting or running a small business",
    summary:
      "Companies Act basics, CIPC mindset, contracts, consumer-facing duties and employment onboarding.",
    audience: "small-business",
    urgency: "low",
    keywords: ["company", "business", "cipc", "contract", "startup", "director"],
    symptoms: [
      "Need a company / MOI thinking",
      "Hiring first employees",
      "Customer contract template needed",
      "Director duty questions",
    ],
    doNow: [
      "Separate personal and business finances.",
      "Write who owns what % and who can bind the company.",
      "Use written customer and supplier terms.",
    ],
    doNot: [
      "Do not ignore annual CIPC returns.",
      "Do not hire staff on a handshake only.",
    ],
    steps: [
      "Review Companies Act directors’ duties overview.",
      "Put employment contracts and BCEA minima in place.",
      "Align privacy notices with POPIA if you process customer data.",
      "Use CPA-aware terms if you sell to consumers.",
      "Keep board/owner resolutions for big decisions.",
    ],
    documentsToGather: ["ID/CIPC docs", "Lease", "Tax numbers", "Draft contracts", "Insurance"],
    relatedDocIds: ["companies-71-2008", "bcea-75-1997", "cpa-68-2008", "popa-4-2013", "lra-66-1995"],
    relatedTemplateIds: ["tpl-service-agreement", "tpl-employment-contract", "tpl-nda", "tpl-board-resolution"],
    relatedCourtIds: ["magistrates-court", "high-court"],
    whenToCallLawyer: "Investment rounds, business rescue stress, IP disputes, or multi-party shareholder fights.",
  },
  {
    id: "need-to-sue",
    title: "Someone owes me money or breached a contract",
    summary:
      "Choose Small Claims vs Magistrates’ vs High Court, send a letter of demand, then summons/application with proper service.",
    audience: "everyone",
    urgency: "medium",
    keywords: ["sue", "summons", "debt", "contract breach", "small claims", "letter of demand"],
    symptoms: [
      "Unpaid invoice",
      "Contract not performed",
      "Loan to a friend not repaid",
      "Need to know which court",
    ],
    doNow: [
      "Calculate capital, interest basis and dates.",
      "Send a clear letter of demand with a deadline.",
      "Check the other party’s full names and service address.",
    ],
    doNot: [
      "Do not invent facts on a summons — it is under oath/risk of costs.",
      "Do not miss appearance to defend if you are the defendant.",
    ],
    steps: [
      "Assess value → Small Claims (lower value), Magistrates’ Court, or High Court.",
      "Draft letter of demand; keep proof of delivery.",
      "Choose action (summons) vs application (notice of motion) with the court guides.",
      "Issue and serve via sheriff where required.",
      "Track dies (time limits) for plea or set-down.",
    ],
    documentsToGather: ["Contract", "Invoices", "Proof of delivery", "Bank records", "IDs/company docs"],
    relatedDocIds: ["form-summons-mc", "form-n1", "uniform-rules", "magistrates-rules", "cpa-68-2008"],
    relatedTemplateIds: ["tpl-letter-demand-general", "tpl-small-claims-summons", "tpl-summons-mc", "tpl-notice-motion"],
    relatedCourtIds: ["small-claims", "magistrates-court", "high-court"],
    whenToCallLawyer: "Opposed High Court litigation, urgent interdicts, or technical exceptions expected.",
  },
  {
    id: "workplace-discrimination",
    title: "Discrimination or harassment at work",
    summary:
      "EEA unfair discrimination, sexual harassment codes, LRA automatically unfair dismissal angles and CCMA/Labour Court routes.",
    audience: "employee",
    urgency: "high",
    keywords: ["discrimination", "harassment", "racism", "sexual harassment", "eea", "equality"],
    symptoms: [
      "Targeted by race/gender/pregnancy/disability",
      "Sexual harassment",
      "Pay inequality without justification",
      "Victimisation after complaining",
    ],
    doNow: [
      "Record incidents in a dated diary.",
      "Report in writing to HR/designated person per policy.",
      "Seek medical/counselling support if needed.",
    ],
    doNot: [
      "Do not confront alone in unsafe settings.",
      "Do not destroy copies of complaints.",
    ],
    steps: [
      "Use internal grievance procedures while preserving external rights.",
      "Refer unfair discrimination disputes within EEA/LRA time frames.",
      "Consider CCMA conciliation and further Labour Court paths.",
      "Keep the EEA and LRA pages open for definitions and remedies.",
    ],
    documentsToGather: ["Grievance emails", "Policies", "Witness names", "Medical notes", "Payslips"],
    relatedDocIds: ["eea-55-1998", "lra-66-1995", "const-1996", "national-coalition-1998"],
    relatedTemplateIds: ["tpl-grievance", "tpl-ccma-711", "tpl-demand-employer"],
    relatedCourtIds: ["ccma", "labour-court"],
    whenToCallLawyer: "Sexual harassment, constructive dismissal, or executive-level disputes.",
  },
  {
    id: "first-time-court",
    title: "I have never been to court — how does it work?",
    summary:
      "Orientation to SA courts: dress, time, rolls, respect, what a clerk/registrar/sheriff does, and how cases move.",
    audience: "citizen",
    urgency: "low",
    keywords: ["court", "first time", "how to", "procedure", "filing", "sheriff"],
    symptoms: [
      "Received papers",
      "Need to issue a case",
      "Nervous about attending",
      "Confused by legal words",
    ],
    doNow: [
      "Read your papers: court name, case number, date, what is asked.",
      "Arrive 45–60 minutes early with ID and copies.",
      "Turn phone on silent; stand when the magistrate/judge enters.",
    ],
    doNot: [
      "Do not argue with the other side in the corridor loudly.",
      "Do not miss your date — take-down or default can follow.",
    ],
    steps: [
      "Use the Courts section to learn your forum.",
      "Learn action vs application (summons vs notice of motion).",
      "Understand service (sheriff) and proof of service.",
      "Bring an indexed bundle of key documents.",
      "Ask the clerk about Legal Aid / help desk options at that building.",
    ],
    documentsToGather: ["All court papers", "ID", "Proof of address", "Two copy sets of annexures"],
    relatedDocIds: ["uniform-rules", "magistrates-rules", "const-court-rules", "form-n1", "form-summons-mc"],
    relatedTemplateIds: ["tpl-notice-defend", "tpl-notice-motion", "tpl-summons-mc"],
    relatedCourtIds: ["small-claims", "magistrates-court", "high-court", "constitutional-court"],
    whenToCallLawyer: "If liberty, children, home or significant money is at stake — do not go alone if you can help it.",
  },
];

export function getGuide(id: string) {
  return problemGuides.find((g) => g.id === id);
}
