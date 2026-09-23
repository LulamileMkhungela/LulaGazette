export type TemplateField = {
  key: string;
  label: string;
  placeholder?: string;
  multiline?: boolean;
  defaultValue?: string;
};

export type DocTemplate = {
  id: string;
  title: string;
  category:
    | "Court papers"
    | "Letters"
    | "Labour"
    | "Contracts"
    | "Notices"
    | "Affidavits"
    | "Corporate";
  description: string;
  forum: string;
  tags: string[];
  audience: ("citizen" | "lawyer" | "business")[];
  fields: TemplateField[];
  body: string;
  tips: string[];
};

export const templates: DocTemplate[] = [
  {
    id: "tpl-letter-demand-general",
    title: "Letter of demand (general debt / contract)",
    category: "Letters",
    description: "Pre-litigation demand used before Small Claims or Magistrates’ Court summons.",
    forum: "Pre-litigation",
    tags: ["demand", "debt", "contract", "pre-action"],
    audience: ["citizen", "lawyer", "business"],
    fields: [
      { key: "senderName", label: "Your full name / company", placeholder: "Thabo Molefe" },
      { key: "senderAddress", label: "Your address", multiline: true, placeholder: "Street, suburb, city" },
      { key: "senderEmail", label: "Email", placeholder: "you@email.com" },
      { key: "senderPhone", label: "Phone", placeholder: "083…" },
      { key: "recipientName", label: "Recipient name", placeholder: "Debtors full names" },
      { key: "recipientAddress", label: "Recipient address", multiline: true },
      { key: "amount", label: "Amount claimed (ZAR)", placeholder: "R12 500.00" },
      { key: "cause", label: "Why they owe you", multiline: true, placeholder: "Unpaid invoice 1042 for…" },
      { key: "deadlineDays", label: "Days to pay", defaultValue: "10" },
      { key: "cityDate", label: "Place and date", placeholder: "Johannesburg, 13 September 2026" },
    ],
    body: `{{senderName}}
{{senderAddress}}
Email: {{senderEmail}} | Tel: {{senderPhone}}

{{cityDate}}

To: {{recipientName}}
{{recipientAddress}}

WITHOUT PREJUDICE — LETTER OF DEMAND

Dear {{recipientName}},

1. I/we refer to the following: {{cause}}

2. The amount of {{amount}} is due, owing and payable.

3. Demand is hereby made that you pay {{amount}} to me/us within {{deadlineDays}} (ten/specified) days of receipt of this letter, into the account/details to be provided on request, failing which I/we intend to institute legal proceedings against you in the appropriate court without further notice, and to seek interest and costs as allowed by law.

4. All my/our rights are strictly reserved.

Yours faithfully,

______________________________
{{senderName}}
`,
    tips: [
      "Send by email and tracked post or sheriff if strategic.",
      "Attach invoices and the contract.",
      "Keep proof of delivery for court.",
    ],
  },
  {
    id: "tpl-letter-demand-consumer",
    title: "CPA consumer complaint / refund demand",
    category: "Letters",
    description: "Demand repair, replacement or refund under Consumer Protection Act themes.",
    forum: "Supplier / ombud / NCC",
    tags: ["cpa", "refund", "consumer", "warranty"],
    audience: ["citizen"],
    fields: [
      { key: "consumerName", label: "Your name" },
      { key: "supplierName", label: "Supplier / shop name" },
      { key: "product", label: "Product or service" },
      { key: "purchaseDate", label: "Purchase date" },
      { key: "problem", label: "What went wrong", multiline: true },
      { key: "remedy", label: "Remedy sought", placeholder: "Full refund / replacement / repair" },
      { key: "deadlineDays", label: "Days to respond", defaultValue: "10" },
      { key: "cityDate", label: "Place and date" },
    ],
    body: `{{cityDate}}

To: {{supplierName}}

CONSUMER PROTECTION ACT — WRITTEN COMPLAINT AND DEMAND

I am {{consumerName}}. On {{purchaseDate}} I acquired {{product}}.

Problem: {{problem}}

In terms of the Consumer Protection Act 68 of 2008 (quality goods, fair dealing and supplier accountability themes), I demand the following remedy within {{deadlineDays}} business days: {{remedy}}.

If you fail to resolve this, I will escalate to the relevant ombud / National Consumer Commission and consider Small Claims or other court processes. Rights reserved.

______________________________
{{consumerName}}
`,
    tips: ["Attach slip and photos.", "Copy the branch manager and customer care email."],
  },
  {
    id: "tpl-small-claims-summons",
    title: "Small Claims Court — claim outline / summons guide",
    category: "Court papers",
    description: "Structured particulars to take to the Small Claims clerk when issuing.",
    forum: "Small Claims Court",
    tags: ["small claims", "summons", "civil"],
    audience: ["citizen"],
    fields: [
      { key: "plaintiff", label: "Plaintiff (you)" },
      { key: "defendant", label: "Defendant" },
      { key: "courtArea", label: "Court area", placeholder: "Johannesburg" },
      { key: "amount", label: "Amount" },
      { key: "facts", label: "What happened (chronology)", multiline: true },
      { key: "cause", label: "Legal basis in plain words", placeholder: "Breach of oral/written agreement to…" },
    ],
    body: `IN THE SMALL CLAIMS COURT
FOR THE AREA OF {{courtArea}}

Plaintiff: {{plaintiff}}
Defendant: {{defendant}}

PARTICULARS OF CLAIM (DRAFT FOR CLERK)

1. Parties: Plaintiff is {{plaintiff}}. Defendant is {{defendant}}.

2. Facts: {{facts}}

3. Cause: {{cause}}

4. Amount claimed: {{amount}} together with such interest and costs as the Court may allow.

5. Wherefore plaintiff claims judgment as above.

NOTE: Use the official SCC forms at the clerk’s office. This draft helps you speak clearly to the clerk.
`,
    tips: ["Confirm monetary ceiling before issue.", "Bring ID and proof of demand."],
  },
  {
    id: "tpl-summons-mc",
    title: "Magistrates’ Court — ordinary summons (particulars sketch)",
    category: "Court papers",
    description: "Skeleton particulars of claim for an action in the Magistrates’ Court.",
    forum: "Magistrates’ Court",
    tags: ["summons", "magistrates", "action", "particulars"],
    audience: ["lawyer", "citizen"],
    fields: [
      { key: "division", label: "District / court", placeholder: "Johannesburg Central" },
      { key: "plaintiff", label: "Plaintiff" },
      { key: "defendant", label: "Defendant" },
      { key: "domicilium", label: "Defendant service address" },
      { key: "facts", label: "Material facts", multiline: true },
      { key: "amount", label: "Capital amount" },
      { key: "interest", label: "Interest basis", defaultValue: "at the prescribed rate tempore morae" },
    ],
    body: `IN THE MAGISTRATES’ COURT FOR THE DISTRICT OF {{division}}
HELD AT {{division}}

In the matter between:

{{plaintiff}}                                                          Plaintiff

and

{{defendant}}                                                         Defendant

PARTICULARS OF CLAIM

1. The Plaintiff is {{plaintiff}}.
2. The Defendant is {{defendant}} of {{domicilium}}.
3. The above Honourable Court has jurisdiction because [insert residence / cause arose].
4. Material facts: {{facts}}
5. Despite demand, the Defendant fails/refuses to pay.
6. The Plaintiff claims:
   6.1 Payment of {{amount}};
   6.2 Interest {{interest}};
   6.3 Costs of suit;
   6.4 Further and/or alternative relief.

DATED at ______________ on this ____ day of ______________ 20__.

______________________________
Plaintiff / Plaintiff’s attorney
`,
    tips: [
      "Have an attorney settle particulars if possible.",
      "Facta probanda only — avoid evidence essays.",
      "Check current monetary jurisdiction.",
    ],
  },
  {
    id: "tpl-notice-motion",
    title: "High Court — Notice of Motion",
    category: "Court papers",
    description: "Uniform Rule 6 style notice of motion for application proceedings.",
    forum: "High Court",
    tags: ["notice of motion", "application", "high court", "rule 6"],
    audience: ["lawyer"],
    fields: [
      { key: "division", label: "Division", defaultValue: "GAUTENG DIVISION, JOHANNESBURG" },
      { key: "applicant", label: "Applicant" },
      { key: "respondent", label: "Respondent" },
      { key: "relief1", label: "Prayer 1", multiline: true },
      { key: "relief2", label: "Prayer 2 (optional)", multiline: true, defaultValue: "Costs of the application." },
      { key: "hearingDate", label: "Hearing date placeholder", defaultValue: "a date to be arranged with the Registrar" },
      { key: "attorneyAddress", label: "Address for service", multiline: true, defaultValue: "" },
    ],
    body: `IN THE HIGH COURT OF SOUTH AFRICA
{{division}}

Case No: ______________

In the matter between:

{{applicant}}                                                         Applicant

and

{{respondent}}                                                        Respondent

NOTICE OF MOTION

TAKE NOTICE that the Applicant intends making application to the above Honourable Court on {{hearingDate}} at 10h00 or so soon thereafter as the matter may be heard, for an order in the following terms:

1. {{relief1}}
2. {{relief2}}
3. Further and/or alternative relief.

TAKE NOTICE FURTHER that the affidavit of {{applicant}} annexed hereto will be used in support of this application.

TAKE NOTICE FURTHER that the Applicant has appointed the following address at which the Applicant will accept notice and service of all process in these proceedings:
{{attorneyAddress}}

TAKE NOTICE FURTHER that if you intend opposing this application you are required to:
(a) notify the Applicant’s attorney in writing within the time permitted by the Uniform Rules / practice directive; and
(b) within fifteen days after giving notice of intention to oppose, file your answering affidavit, if any;
and further that you are required to appoint in such notification an address referred to in rule 6(5)(b) at which you will accept notice and service of all documents in these proceedings.

If no such notice of intention to oppose be given, the application will be made on the date stated above.

DATED at JOHANNESBURG on this ____ day of ______________ 20__.

______________________________
Applicant’s Attorney
`,
    tips: ["Commission founding affidavit properly.", "Check Gauteng Court Online / CaseLines directives.", "Attach a clear draft order."],
  },
  {
    id: "tpl-founding-affidavit",
    title: "Founding affidavit (application)",
    category: "Affidavits",
    description: "Structure for a founding affidavit supporting a notice of motion.",
    forum: "High Court / Magistrates’ Court applications",
    tags: ["affidavit", "founding", "application"],
    audience: ["lawyer", "citizen"],
    fields: [
      { key: "deponent", label: "Deponent full names" },
      { key: "idNumber", label: "ID / passport" },
      { key: "residence", label: "Residential address" },
      { key: "facts", label: "Facts in chronological paragraphs", multiline: true },
      { key: "law", label: "Legal basis (short)", multiline: true },
      { key: "urgency", label: "Urgency (if any)", multiline: true, defaultValue: "Not applicable / set out facts showing urgency." },
    ],
    body: `I, the undersigned,

{{deponent}}

do hereby make oath and state:

1. I am an adult with identity number {{idNumber}}, residing at {{residence}}. I am the Applicant in this matter. The facts are true and within my personal knowledge unless otherwise stated.

2. PURPOSE
I depose to this affidavit in support of the relief in the notice of motion.

3. FACTS
{{facts}}

4. LEGAL BASIS
{{law}}

5. URGENCY
{{urgency}}

6. I respectfully request that the Court grant the relief sought.

______________________________
DEPONENT

I certify that the deponent acknowledged that he/she knows and understands the contents of this affidavit... [standard jurat]
`,
    tips: ["Number annexures FA1, FA2…", "Avoid hearsay without basis.", "Commissioner of oaths must complete jurat."],
  },
  {
    id: "tpl-notice-defend",
    title: "Notice of intention to defend",
    category: "Notices",
    description: "File after service of summons to avoid default judgment.",
    forum: "Magistrates’ Court / High Court",
    tags: ["defend", "summons", "default"],
    audience: ["citizen", "lawyer"],
    fields: [
      { key: "court", label: "Court", placeholder: "Magistrates’ Court, Johannesburg" },
      { key: "caseNo", label: "Case number" },
      { key: "plaintiff", label: "Plaintiff" },
      { key: "defendant", label: "Defendant" },
      { key: "addressService", label: "Your address for service", multiline: true },
    ],
    body: `IN THE {{court}}

Case No: {{caseNo}}

In the matter between:

{{plaintiff}}                                                          Plaintiff

and

{{defendant}}                                                         Defendant

NOTICE OF INTENTION TO DEFEND

BE PLEASED TO TAKE NOTICE that the Defendant hereby gives notice of intention to defend this action.

The Defendant appoints the following address for service: {{addressService}}.

DATED at ______________ on this ____ day of ______________ 20__.

______________________________
Defendant / Defendant’s attorney
`,
    tips: ["Diary the plea deadline after this notice.", "File and serve copies."],
  },
  {
    id: "tpl-ccma-711",
    title: "CCMA referral narrative (Form 7.11 helper)",
    category: "Labour",
    description: "Plain narrative to copy into official CCMA Form 7.11 fields.",
    forum: "CCMA / Bargaining council",
    tags: ["ccma", "7.11", "dismissal", "labour"],
    audience: ["citizen", "lawyer"],
    fields: [
      { key: "employee", label: "Employee name" },
      { key: "employer", label: "Employer name" },
      { key: "dismissDate", label: "Date of dismissal / dispute" },
      { key: "jobTitle", label: "Job title" },
      { key: "facts", label: "What happened", multiline: true },
      { key: "outcome", label: "Outcome sought", placeholder: "Reinstatement / compensation of…" },
      { key: "disputeType", label: "Dispute type", defaultValue: "Unfair dismissal" },
    ],
    body: `CCMA FORM 7.11 — NARRATIVE HELPER

Employee: {{employee}}
Employer: {{employer}}
Job title: {{jobTitle}}
Dispute type: {{disputeType}}
Date: {{dismissDate}}

Summary of facts:
{{facts}}

Relief sought:
{{outcome}}

Service: I will serve a copy on the employer and keep proof for the CCMA.

NOTE: Copy into the official Form 7.11 on www.ccma.org.za. Refer within 30 days for dismissal disputes unless condonation is sought.
`,
    tips: ["Attach dismissal letter.", "If late, complete condonation affidavit."],
  },
  {
    id: "tpl-condonation",
    title: "Condonation affidavit (late referral / filing)",
    category: "Affidavits",
    description: "Explain lateness, prospects of success, prejudice and interests of justice.",
    forum: "CCMA / Courts",
    tags: ["condonation", "late", "time limit"],
    audience: ["citizen", "lawyer"],
    fields: [
      { key: "deponent", label: "Your name" },
      { key: "daysLate", label: "How many days late" },
      { key: "explanation", label: "Explanation for delay", multiline: true },
      { key: "prospects", label: "Prospects of success", multiline: true },
      { key: "prejudice", label: "Prejudice to other party", multiline: true },
    ],
    body: `CONDONATION AFFIDAVIT (DRAFT)

I, {{deponent}}, state under oath:

1. Degree of lateness: approximately {{daysLate}} days.
2. Explanation: {{explanation}}
3. Prospects of success: {{prospects}}
4. Prejudice: {{prejudice}}
5. It is in the interests of justice that condonation be granted.

DEPONENT: __________________
`,
    tips: ["Be honest — weak explanations fail.", "Attach supporting proof (medical, emails)."],
  },
  {
    id: "tpl-settlement-labour",
    title: "Labour settlement agreement (full and final)",
    category: "Labour",
    description: "Settlement after CCMA conciliation or internal negotiation — use carefully.",
    forum: "CCMA / private",
    tags: ["settlement", "labour", "full and final"],
    audience: ["lawyer", "citizen"],
    fields: [
      { key: "employee", label: "Employee" },
      { key: "employer", label: "Employer" },
      { key: "amount", label: "Settlement amount" },
      { key: "payDate", label: "Payment date" },
      { key: "extra", label: "Extra terms", multiline: true, defaultValue: "Certificate of service; mutual non-disparagement." },
    ],
    body: `SETTLEMENT AGREEMENT

Between {{employer}} (“Employer”) and {{employee}} (“Employee”).

1. The parties settle all disputes arising from the Employee’s employment and its termination on a full and final basis.
2. Employer shall pay {{amount}} by {{payDate}} without admission of liability.
3. Additional terms: {{extra}}
4. Employee withdraws any pending CCMA/court referral on proof of payment.
5. This agreement constitutes the entire agreement.

SIGNED at ________ on ________

Employer: __________    Employee: __________
`,
    tips: ["Independent advice recommended before signing away rights.", "Check tax on packages."],
  },
  {
    id: "tpl-demand-employer",
    title: "Letter to employer before CCMA",
    category: "Labour",
    description: "Internal demand / grievance follow-up before referral.",
    forum: "Workplace / pre-CCMA",
    tags: ["employer", "grievance", "labour"],
    audience: ["citizen"],
    fields: [
      { key: "employee", label: "Employee" },
      { key: "employer", label: "Employer" },
      { key: "issue", label: "Issue", multiline: true },
      { key: "ask", label: "What you want", multiline: true },
    ],
    body: `Dear {{employer}},

I am {{employee}}. I write regarding: {{issue}}

I request the following by no later than 5 business days: {{ask}}

If unresolved I reserve my rights to refer a dispute to the CCMA/bargaining council.

Yours faithfully,
{{employee}}
`,
    tips: ["Send to HR and your manager copy."],
  },
  {
    id: "tpl-grievance",
    title: "Workplace grievance letter",
    category: "Labour",
    description: "Formal grievance for discrimination, harassment or policy breaches.",
    forum: "Workplace",
    tags: ["grievance", "harassment", "discrimination"],
    audience: ["citizen"],
    fields: [
      { key: "name", label: "Your name" },
      { key: "hr", label: "HR / recipient" },
      { key: "incidents", label: "Incidents (dated)", multiline: true },
      { key: "witnesses", label: "Witnesses" },
      { key: "outcome", label: "Outcome sought" },
    ],
    body: `GRIEVANCE LODGEMENT

To: {{hr}}
From: {{name}}

Incidents: {{incidents}}
Witnesses: {{witnesses}}
Outcome sought: {{outcome}}

Please investigate per company policy and the Employment Equity Act / LRA frameworks. I am available for a grievance hearing.

{{name}}
`,
    tips: ["Keep a personal copy. Consider parallel CCMA clocks."],
  },
  {
    id: "tpl-employment-contract",
    title: "Basic employment contract (simple)",
    category: "Contracts",
    description: "Starter contract aligning with BCEA headlines — have labour counsel review for your sector.",
    forum: "Workplace",
    tags: ["employment", "contract", "bcea"],
    audience: ["business", "lawyer"],
    fields: [
      { key: "employer", label: "Employer" },
      { key: "employee", label: "Employee" },
      { key: "title", label: "Job title" },
      { key: "start", label: "Start date" },
      { key: "salary", label: "Salary" },
      { key: "hours", label: "Hours", defaultValue: "45 ordinary hours per week unless agreed otherwise within law" },
      { key: "place", label: "Workplace" },
    ],
    body: `EMPLOYMENT AGREEMENT

1. Parties: {{employer}} employs {{employee}} as {{title}} from {{start}} at {{place}}.
2. Remuneration: {{salary}} payable monthly in arrears.
3. Hours: {{hours}}.
4. Leave: annual, sick, family responsibility leave per BCEA minima (or better).
5. Termination: notice per BCEA based on length of service, subject to LRA fair reason and procedure.
6. Confidentiality and return of property on termination.
7. Whole agreement; variations in writing.

SIGNED: Employer ________ Employee ________
`,
    tips: ["Sectoral determinations may impose higher minima.", "Add probation only if fair and clear."],
  },
  {
    id: "tpl-service-agreement",
    title: "Service level / independent contractor agreement",
    category: "Contracts",
    description: "Commercial services agreement outline for SMEs.",
    forum: "Commercial",
    tags: ["contract", "services", "sme"],
    audience: ["business", "lawyer"],
    fields: [
      { key: "client", label: "Client" },
      { key: "provider", label: "Service provider" },
      { key: "services", label: "Services", multiline: true },
      { key: "fee", label: "Fee" },
      { key: "term", label: "Term" },
    ],
    body: `SERVICE AGREEMENT

Client: {{client}}
Provider: {{provider}}
Services: {{services}}
Fee: {{fee}}
Term: {{term}}

Provider acts as independent contractor, not employee.
Invoices payable in 14 days.
IP in deliverables vests in Client on full payment unless agreed otherwise.
Confidentiality; POPIA operator clauses if personal information is processed.
Limitation of liability: cap at fees paid in prior 3 months (negotiate).
Governing law: Republic of South Africa; courts of Johannesburg (example).

SIGNED: ________
`,
    tips: ["Misclassified ‘contractors’ risk LRA/BCEA claims — assess control/economic reality."],
  },
  {
    id: "tpl-nda",
    title: "Non-disclosure agreement (mutual)",
    category: "Contracts",
    description: "Mutual NDA for negotiations and vendor diligence.",
    forum: "Commercial",
    tags: ["nda", "confidential"],
    audience: ["business", "lawyer"],
    fields: [
      { key: "partyA", label: "Party A" },
      { key: "partyB", label: "Party B" },
      { key: "purpose", label: "Purpose" },
      { key: "years", label: "Confidentiality period (years)", defaultValue: "3" },
    ],
    body: `MUTUAL NON-DISCLOSURE AGREEMENT

Between {{partyA}} and {{partyB}} for {{purpose}}.

Confidential Information excludes public domain, independently developed, or compelled by law (with notice if lawful).
Use limited to the purpose; no reverse engineering.
Term of confidentiality: {{years}} years from disclosure.
SA law applies.

SIGNED: ________
`,
    tips: ["Add POPIA clauses if personal information will be shared."],
  },
  {
    id: "tpl-board-resolution",
    title: "Directors’ / members’ resolution",
    category: "Corporate",
    description: "Simple resolution authorising a transaction or litigation.",
    forum: "Companies Act",
    tags: ["resolution", "directors", "cipc"],
    audience: ["business", "lawyer"],
    fields: [
      { key: "company", label: "Company name" },
      { key: "resolution", label: "Resolved that…", multiline: true },
      { key: "signatory", label: "Authorised signatory" },
    ],
    body: `{{company}}
WRITTEN RESOLUTION OF DIRECTORS

IT IS RESOLVED THAT: {{resolution}}

{{signatory}} is authorised to sign all documents to give effect to this resolution.

__________________ Director
Date: ________
`,
    tips: ["Check MOI for round-robin / quorum rules."],
  },
  {
    id: "tpl-oppose-eviction",
    title: "Opposing affidavit themes (PIE eviction)",
    category: "Affidavits",
    description: "Facts a respondent often needs in a PIE eviction — personal circumstances, children, offers to pay, alternative accommodation.",
    forum: "Magistrates’ / High Court",
    tags: ["pie", "eviction", "oppose"],
    audience: ["citizen", "lawyer"],
    fields: [
      { key: "name", label: "Your name" },
      { key: "occupants", label: "Who lives there (ages)" },
      { key: "history", label: "How you came to occupy", multiline: true },
      { key: "circumstances", label: "Personal circumstances", multiline: true },
      { key: "offer", label: "What you can offer (rent/time)", multiline: true },
    ],
    body: `ANSWERING AFFIDAVIT THEMES (PIE) — DRAFT

I, {{name}}, state:

1. Occupants: {{occupants}}
2. History of occupation: {{history}}
3. Circumstances (work, health, schools, disability, elderly): {{circumstances}}
4. I respectfully submit that eviction would not be just and equitable without suitable alternative accommodation / reasonable engagement.
5. Offer: {{offer}}
6. I ask that the application be dismissed or that any order be linked to alternative accommodation and a just date.

(Commissioner jurat)
`,
    tips: ["File on time. Attach school letters, clinic cards, payslips.", "Get Legal Aid / clinic help urgently."],
  },
  {
    id: "tpl-letter-landlord",
    title: "Letter to landlord (repairs / illegal lock-out)",
    category: "Letters",
    description: "Assert rights and demand restoration of occupation or repairs.",
    forum: "Rental / pre-litigation",
    tags: ["landlord", "tenant", "lockout"],
    audience: ["citizen"],
    fields: [
      { key: "tenant", label: "Tenant" },
      { key: "landlord", label: "Landlord" },
      { key: "address", label: "Property address" },
      { key: "issue", label: "Issue", multiline: true },
      { key: "demand", label: "Demand", multiline: true },
    ],
    body: `To: {{landlord}}
Re: {{address}}

I am {{tenant}}. {{issue}}

Demand: {{demand}}

Illegal lock-outs and constructive eviction tactics may violate the Constitution, PIE and rental housing frameworks. Rights reserved including urgent court relief.

{{tenant}}
`,
    tips: ["Photograph locks/utility meters. Call SAPS if locked out."],
  },
  {
    id: "tpl-popia-request",
    title: "POPIA data subject request",
    category: "Notices",
    description: "Access, correction, deletion or objection request to an information officer.",
    forum: "POPIA",
    tags: ["popia", "privacy", "data subject"],
    audience: ["citizen", "lawyer"],
    fields: [
      { key: "name", label: "Your name" },
      { key: "id", label: "ID number" },
      { key: "org", label: "Organisation" },
      { key: "requestType", label: "Request type", defaultValue: "Access to my personal information" },
      { key: "details", label: "Details", multiline: true },
    ],
    body: `POPIA DATA SUBJECT REQUEST

To: Information Officer, {{org}}

I am {{name}}, ID {{id}}. Pursuant to the Protection of Personal Information Act 4 of 2013 I request: {{requestType}}.

Details: {{details}}

Please respond within a reasonable time and confirm the lawful basis for any continued processing. I may escalate to the Information Regulator if needed.

{{name}}
`,
    tips: ["Send to the published information officer email.", "Keep proof."],
  },
  {
    id: "tpl-paia-request",
    title: "PAIA access request (Form outline)",
    category: "Notices",
    description: "Outline for a PAIA request for records from a public or private body.",
    forum: "PAIA",
    tags: ["paia", "access to information"],
    audience: ["citizen", "lawyer"],
    fields: [
      { key: "requester", label: "Requester" },
      { key: "body", label: "Public/private body" },
      { key: "records", label: "Records sought", multiline: true },
      { key: "reason", label: "Why needed (private body)", multiline: true },
    ],
    body: `PAIA REQUEST OUTLINE — {{body}}

Requester: {{requester}}
Records: {{records}}
Purpose / right to protect (if private body): {{reason}}

Please treat this as a request under the Promotion of Access to Information Act 2 of 2000. I will complete your prescribed form if different. Prefer electronic copies.

{{requester}}
`,
    tips: ["Use the body’s PAIA manual forms where prescribed."],
  },
  {
    id: "tpl-bail-affidavit",
    title: "Bail supporting affidavit (family / accused)",
    category: "Affidavits",
    description: "Facts on ties to community, address, employment and proposed conditions.",
    forum: "Magistrates’ Court criminal",
    tags: ["bail", "criminal", "affidavit"],
    audience: ["citizen", "lawyer"],
    fields: [
      { key: "accused", label: "Accused name" },
      { key: "deponent", label: "Deponent" },
      { key: "address", label: "Address where accused will stay" },
      { key: "ties", label: "Community ties / employment", multiline: true },
      { key: "conditions", label: "Proposed conditions", multiline: true, defaultValue: "Report to SAPS weekly; surrender passport; no contact with complainant." },
    ],
    body: `BAIL AFFIDAVIT (SUPPORTING)

I, {{deponent}}, state that {{accused}} will reside at {{address}}.

Ties: {{ties}}

I believe {{accused}} will stand trial. Proposed conditions: {{conditions}}.

I undertake to ensure compliance to the extent within my control.

DEPONENT ________
`,
    tips: ["Bring proof of address and employment letter to court.", "Instruct a criminal attorney for schedule offences."],
  },
  {
    id: "tpl-letter-saps",
    title: "Letter to SAPS (CAS follow-up)",
    category: "Letters",
    description: "Polite written follow-up on a case number or statement.",
    forum: "SAPS",
    tags: ["saps", "cas", "police"],
    audience: ["citizen"],
    fields: [
      { key: "name", label: "Your name" },
      { key: "station", label: "Police station" },
      { key: "cas", label: "CAS number" },
      { key: "request", label: "What you need", multiline: true },
    ],
    body: `To: Station Commander / IO, {{station}}
CAS: {{cas}}
From: {{name}}

Request: {{request}}

Kindly acknowledge and advise the next step. Contact number on record.

{{name}}
`,
    tips: ["Keep a stamped copy if hand-delivered."],
  },
  {
    id: "tpl-letter-creditor",
    title: "Letter to creditor / debt counsellor intro",
    category: "Letters",
    description: "Request affordability review, suspension of harassment, or debt-review cooperation.",
    forum: "NCA / credit",
    tags: ["debt", "nca", "creditor"],
    audience: ["citizen"],
    fields: [
      { key: "name", label: "Your name" },
      { key: "creditor", label: "Creditor" },
      { key: "account", label: "Account number" },
      { key: "ask", label: "Request", multiline: true },
    ],
    body: `To: {{creditor}}
Account: {{account}}
From: {{name}}

I am experiencing financial difficulty. {{ask}}

Please deal with me in writing. I reserve rights under the National Credit Act 34 of 2005.

{{name}}
`,
    tips: ["Consider a registered debt counsellor."],
  },
  {
    id: "tpl-draft-order",
    title: "Draft order (High Court)",
    category: "Court papers",
    description: "Executable draft order to attach to applications.",
    forum: "High Court",
    tags: ["draft order", "high court"],
    audience: ["lawyer"],
    fields: [
      { key: "division", label: "Division", defaultValue: "GAUTENG DIVISION, JOHANNESBURG" },
      { key: "caseNo", label: "Case No" },
      { key: "parties", label: "Parties short description" },
      { key: "orderLines", label: "Order lines", multiline: true },
    ],
    body: `IN THE HIGH COURT OF SOUTH AFRICA
{{division}}

Case No: {{caseNo}}
{{parties}}

DRAFT ORDER

Having read the papers and having heard counsel/attorney, it is ordered that:

{{orderLines}}

BY ORDER OF THE COURT
________________ REGISTRAR
`,
    tips: ["Use clear, sheriff-friendly language.", "Separate costs prayer."],
  },
];

export function getTemplate(id: string) {
  return templates.find((t) => t.id === id);
}

export function templatesByCategory() {
  const map = new Map<string, DocTemplate[]>();
  for (const t of templates) {
    const list = map.get(t.category) ?? [];
    list.push(t);
    map.set(t.category, list);
  }
  return map;
}
