export type CourtGuide = {
  id: string;
  name: string;
  level: string;
  summary: string;
  whenToUse: string;
  keywords: string[];
  jurisdictionNotes: string[];
  filingChecklist: string[];
  typicalDocuments: string[];
  timelines: string[];
  feesMindset: string;
  serviceNotes: string;
  tipsCitizens: string[];
  tipsLawyers: string[];
  relatedTemplateIds: string[];
  officialHint: string;
};

export const courtGuides: CourtGuide[] = [
  {
    id: "small-claims",
    name: "Small Claims Court",
    level: "Lower civil · limited value",
    summary:
      "Faster, cheaper civil claims for lower monetary values. No attorneys appear as of right in the same way as higher courts; procedures are simplified.",
    whenToUse:
      "Unpaid loans, poor workmanship, deposit disputes and similar lower-value civil claims between natural persons (check current monetary ceiling).",
    keywords: ["small claims", "cheap court", "low value", "commissioner"],
    jurisdictionNotes: [
      "Monetary jurisdiction is capped by Ministerial notice — always confirm the current ceiling before issuing.",
      "Certain claims (e.g. divorce, some defamation, some government claims) are excluded.",
      "Usually the defendant must reside or carry on business in the area, or the cause must arise there.",
    ],
    filingChecklist: [
      "Letter of demand first (often required / best practice).",
      "Complete the summons/form at the Small Claims clerk.",
      "Pay the prescribed fee if any and get a case number.",
      "Arrange service as directed (often sheriff or prescribed method).",
      "Diary the hearing date and bring originals + copies.",
    ],
    typicalDocuments: ["Letter of demand", "Contract/invoice", "Proof of payment", "Photos", "ID"],
    timelines: [
      "Demand period before issue (commonly ~14 days in practice letters).",
      "Hearing date allocated by the clerk — arrive early.",
    ],
    feesMindset: "Designed to be affordable. Still budget for sheriff/service and travel.",
    serviceNotes: "Follow the clerk’s instructions precisely; improper service delays matters.",
    tipsCitizens: [
      "Speak simply and stick to dates and documents.",
      "Practice a 3-minute version of your story.",
      "If you settle, get it in writing before you leave.",
    ],
    tipsLawyers: [
      "You generally do not appear for parties in Small Claims — coach clients on bundles instead.",
      "Screen whether the claim is truly within jurisdiction to avoid wasted issue.",
    ],
    relatedTemplateIds: ["tpl-small-claims-summons", "tpl-letter-demand-general"],
    officialHint: "Department of Justice Small Claims information + local magistrate’s office clerk.",
  },
  {
    id: "magistrates-court",
    name: "Magistrates’ Court (Civil & Criminal)",
    level: "District / Regional",
    summary:
      "Workhorse court for most South Africans: civil actions and applications within monetary limits, and the bulk of criminal first appearances and trials.",
    whenToUse:
      "Civil debts and delicts within jurisdiction; protection-type applications as provided; criminal cases from petty to regional court serious matters.",
    keywords: ["magistrates", "district", "regional", "summons", "bail"],
    jurisdictionNotes: [
      "Civil monetary ceilings differ for district vs regional — confirm before choosing forum.",
      "Divorce and some status matters have specific paths; not everything belongs here.",
      "Criminal: schedule offences affect bail onus and forum.",
    ],
    filingChecklist: [
      "Choose summons (action) vs notice of motion (application).",
      "Draft particulars of claim with facta probanda.",
      "Issue with the clerk; pay fees; obtain case number.",
      "Serve via sheriff; file return of service.",
      "Track dies for notice of intention to defend / plea.",
      "Set down and prepare discovery where applicable.",
    ],
    typicalDocuments: [
      "Summons and particulars",
      "Notice of intention to defend",
      "Plea / affidavit",
      "Discovery notices",
      "Sheriff returns",
    ],
    timelines: [
      "Appearance to defend after service — count court days carefully.",
      "Plea after NOITD — diary or risk default.",
      "Criminal first appearance often soon after arrest.",
    ],
    feesMindset: "Scale fees + sheriff + possible expert costs. Fee estimates help clients.",
    serviceNotes: "Personal service / domicilium rules matter. Defective service = wasted costs.",
    tipsCitizens: [
      "If served with summons, get advice before the deadline expires.",
      "Default judgment can lead to warrants and EAOs.",
      "Dress neatly; address the magistrate as ‘Your Worship’.",
    ],
    tipsLawyers: [
      "Check practice directives of the cluster and CaseLines requirements if any.",
      "Particulars must avoid vague cause of action — exception risk.",
      "For criminal, prepare bail affidavits with ties to community.",
    ],
    relatedTemplateIds: [
      "tpl-summons-mc",
      "tpl-notice-defend",
      "tpl-letter-demand-general",
      "tpl-bail-affidavit",
    ],
    officialHint: "Magistrates’ Courts Act 32 of 1944 + Magistrates’ Courts Rules + local clerk.",
  },
  {
    id: "high-court",
    name: "High Court (Divisions)",
    level: "Superior Court",
    summary:
      "Unlimited civil jurisdiction (subject to cost proportionality), reviews, constitutional issues of first instance in some matters, serious criminal trials, and appeals from lower courts.",
    whenToUse:
      "Complex commercial disputes, urgent interdicts, reviews of administrative action, high-value claims, and many public law matters.",
    keywords: ["high court", "gauteng", "notice of motion", "urgent court", "review"],
    jurisdictionNotes: [
      "Divisions include Gauteng (Johannesburg & Pretoria), Western Cape, KZN, etc.",
      "Inherent jurisdiction + Superior Courts Act frameworks.",
      "Uniform Rules + strict local practice directives (e.g. Court Online / CaseLines in Gauteng).",
    ],
    filingChecklist: [
      "Issue application or action per Uniform Rules.",
      "Comply with electronic filing directives where mandatory.",
      "Index and paginate bundles; comply with practice note.",
      "Serve and file original affidavits with commissioned oaths.",
      "Set down on the correct roll (opposed / unopposed / urgent).",
      "Heads of argument where required.",
    ],
    typicalDocuments: [
      "Notice of motion + founding affidavit",
      "Answering / replying affidavits",
      "Rule 53 record (reviews)",
      "Practice note and chronology",
      "Draft order",
    ],
    timelines: [
      "Opposed motion timetables per directive.",
      "Urgent court: Rule 6(12) — show true urgency, not self-created.",
      "Appeals: petition/leave pathways differ.",
    ],
    feesMindset: "Significantly higher. Early case assessment and settlement windows matter.",
    serviceNotes: "Service on state respondents may engage prescribed state attorney rules.",
    tipsCitizens: [
      "High Court papers are technical — budget for representation.",
      "University clinics and Legal Aid may assist in qualifying matters.",
    ],
    tipsLawyers: [
      "Read the latest division directive before every set-down.",
      "Draft orders must be executable and clear for the registrar.",
      "Check whether magisterial jurisdiction still makes commercial sense on quantum.",
    ],
    relatedTemplateIds: ["tpl-notice-motion", "tpl-founding-affidavit", "tpl-draft-order"],
    officialHint: "Uniform Rules of Court + your Division’s practice directives.",
  },
  {
    id: "labour-court",
    name: "Labour Court & Labour Appeal Court",
    level: "Specialist superior · labour",
    summary:
      "Specialist courts for many LRA/EEA disputes, reviews of arbitration awards, and certain strikes/interdicts.",
    whenToUse:
      "After CCMA/bargaining council processes where the statute points to the Labour Court; reviews under LRA s 145; large-scale interdicts.",
    keywords: ["labour court", "review", "sidumo", "strike"],
    jurisdictionNotes: [
      "Not every labour dispute starts here — many go to CCMA arbitration first.",
      "Sidumo reasonableness standard guides reviews of awards.",
    ],
    filingChecklist: [
      "Confirm the correct originating process and time limits.",
      "For reviews: complete record, grounds, and condonation if late.",
      "Serve union/employer representatives properly.",
      "Comply with Labour Court practice manual.",
    ],
    typicalDocuments: ["Review application", "Arbitration award", "Record", "Condonation affidavit"],
    timelines: ["Review periods are short — diary from award date."],
    feesMindset: "Specialist counsel often briefed; cost-benefit vs settlement is key.",
    serviceNotes: "Service on nominated labour representatives as per rules.",
    tipsCitizens: ["Start at CCMA/union help desk unless urgency requires court."],
    tipsLawyers: ["Frame review grounds tightly; avoid re-arguing the merits wholesale."],
    relatedTemplateIds: ["tpl-ccma-711", "tpl-notice-motion", "tpl-founding-affidavit"],
    officialHint: "LRA + Labour Court Rules / practice manual.",
  },
  {
    id: "ccma",
    name: "CCMA (and Bargaining Councils)",
    level: "Statutory dispute resolution forum",
    summary:
      "Primary forum for unfair dismissal, unfair labour practices, organisational rights and many mutual interest disputes — conciliation then arbitration (or con-arb).",
    whenToUse: "Most individual labour disputes after internal procedures fail.",
    keywords: ["ccma", "conciliation", "arbitration", "7.11", "condonation"],
    jurisdictionNotes: [
      "Bargaining council may have exclusive jurisdiction in a sector.",
      "Time limits: typically 30 days (dismissal) / 90 days (ULP).",
    ],
    filingChecklist: [
      "Complete Form 7.11 accurately.",
      "Serve employer and keep proof.",
      "Apply for condonation if late with full explanation.",
      "Attend con-arb unless valid objection.",
      "Bring bundle: contract, letters, minutes, payslips.",
    ],
    typicalDocuments: ["Form 7.11", "Service proof", "Employer response", "Settlement agreements"],
    timelines: ["Referral clocks run from dismissal/awareness — not from when you ‘feel ready’."],
    feesMindset: "Generally no hearing fee like ordinary courts; costs are time and representation rules.",
    serviceNotes: "Fax/email/hand service per CCMA rules — keep transmission reports.",
    tipsCitizens: [
      "You can often appear in person; unions help members.",
      "Settlement at conciliation is common — know your bottom line.",
    ],
    tipsLawyers: [
      "Legal representation in misconduct/incapacity arbitration is restricted — prepare arguments for leave to appear.",
      "Draft referral facts neutrally but completely.",
    ],
    relatedTemplateIds: ["tpl-ccma-711", "tpl-settlement-labour", "tpl-condonation"],
    officialHint: "www.ccma.org.za forms and rules.",
  },
  {
    id: "constitutional-court",
    name: "Constitutional Court",
    level: "Apex constitutional jurisdiction",
    summary:
      "Final court on constitutional matters and arguable points of law of general public importance — leave to appeal, direct access (exceptional), confirmation of invalidity.",
    whenToUse:
      "After High Court/SCA pathways, or exceptional direct access; confirmation of orders of constitutional invalidity.",
    keywords: ["constitutional court", "leave to appeal", "bill of rights"],
    jurisdictionNotes: [
      "Not a court of first instance for ordinary disputes.",
      "Interests of justice and prospects of success guide leave.",
    ],
    filingChecklist: [
      "Prepare application for leave with clear constitutional issue.",
      "Comply with Constitutional Court Rules and page limits.",
      "File electronic sets as directed.",
      "Await directions from the Chief Justice.",
    ],
    typicalDocuments: ["Leave application", "Judgment a quo", "Written argument", "Authorities"],
    timelines: ["Strict filing windows from lower court orders."],
    feesMindset: "Senior counsel teams typical; public interest organisations sometimes support.",
    serviceNotes: "Service on state respondents per rules.",
    tipsCitizens: ["Ordinary matters almost never start here — fix the record in lower courts."],
    tipsLawyers: ["Frame the constitutional issue crisply; avoid factual retrials."],
    relatedTemplateIds: ["tpl-notice-motion", "tpl-founding-affidavit"],
    officialHint: "www.concourt.org.za rules and directions.",
  },
  {
    id: "sca",
    name: "Supreme Court of Appeal",
    level: "Apex on non-constitutional appeals (general)",
    summary:
      "Hears appeals from the High Court (subject to leave). Often the last stop on ordinary legal questions before or alongside Constitutional Court pathways.",
    whenToUse: "Appeals on law/facts as permitted after High Court.",
    keywords: ["sca", "appeal", "bloemfontein"],
    jurisdictionNotes: ["Leave to appeal requirements apply.", "Sits in Bloemfontein."],
    filingChecklist: [
      "Obtain leave where required.",
      "Prepare record on appeal.",
      "Heads of argument and practice notes.",
    ],
    typicalDocuments: ["Notice of appeal", "Record", "Heads"],
    timelines: ["Appeal periods are unforgiving — diary from judgment."],
    feesMindset: "High — settle if principle is not worth the candle.",
    serviceNotes: "Per SCA rules.",
    tipsCitizens: ["Appeals are not automatic re-hearings of all facts."],
    tipsLawyers: ["Clean record wins cases; fix transcription early."],
    relatedTemplateIds: ["tpl-notice-motion"],
    officialHint: "Superior Courts Act + SCA rules.",
  },
];

export function getCourt(id: string) {
  return courtGuides.find((c) => c.id === id);
}
