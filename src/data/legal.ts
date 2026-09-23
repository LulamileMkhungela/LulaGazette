export type CategoryId =
  | "acts"
  | "cases"
  | "court-forms"
  | "court-rules"
  | "regulations"
  | "provincial-laws";

export type LegalDocument = {
  id: string;
  title: string;
  citation: string;
  category: CategoryId;
  year: number;
  jurisdiction: string;
  summary: string;
  body: string;
  tags: string[];
  status: "In force" | "Amended" | "Repealed" | "Reported";
  source: string;
};

export const categories: {
  id: CategoryId;
  label: string;
  description: string;
  icon: string;
  color: string;
}[] = [
  {
    id: "acts",
    label: "Acts",
    description: "Acts of Parliament of the Republic of South Africa",
    icon: "/icons/law.svg",
    color: "#0C68BE",
  },
  {
    id: "cases",
    label: "Cases",
    description: "Judgments of the Constitutional Court, SCA, High Courts & specialised courts",
    icon: "/icons/cases.svg",
    color: "#298D62",
  },
  {
    id: "court-forms",
    label: "Court Forms",
    description: "Prescribed forms for Magistrates' Courts, High Courts and labour forums",
    icon: "/icons/institution.svg",
    color: "#49A9C9",
  },
  {
    id: "court-rules",
    label: "Court Rules",
    description: "Uniform Rules, Constitutional Court Rules and practice directives",
    icon: "/icons/reg.svg",
    color: "#0F80EB",
  },
  {
    id: "regulations",
    label: "Regulations",
    description: "Regulations, notices and proclamations under primary legislation",
    icon: "/icons/reg.svg",
    color: "#5E7B99",
  },
  {
    id: "provincial-laws",
    label: "Provincial Laws",
    description: "Provincial Acts and ordinances across the nine provinces",
    icon: "/icons/law.svg",
    color: "#1E4D39",
  }
];

export const documents: LegalDocument[] = [
  {
    id: "const-1996",
    title: "Constitution of the Republic of South Africa, 1996",
    citation: "Constitution of the Republic of South Africa, 1996",
    category: "acts",
    year: 1996,
    jurisdiction: "National",
    summary:
      "The supreme law of the Republic. It establishes the Bill of Rights, the structure of government, co-operative governance, and the Constitutional Court as the final arbiter on constitutional matters.",
    body: `PREAMBLE

We, the people of South Africa, recognise the injustices of our past; honour those who suffered for justice and freedom in our land; respect those who have worked to build and develop our country; and believe that South Africa belongs to all who live in it, united in our diversity.

We therefore, through our freely elected representatives, adopt this Constitution as the supreme law of the Republic so as to—

• Heal the divisions of the past and establish a society based on democratic values, social justice and fundamental human rights;
• Lay the foundations for a democratic and open society in which government is based on the will of the people and every citizen is equally protected by law;
• Improve the quality of life of all citizens and free the potential of each person; and
• Build a united and democratic South Africa able to take its rightful place as a sovereign state in the family of nations.

CHAPTER 1 — FOUNDING PROVISIONS

1. Republic of South Africa
The Republic of South Africa is one, sovereign, democratic state founded on the following values:
(a) Human dignity, the achievement of equality and the advancement of human rights and freedoms.
(b) Non-racialism and non-sexism.
(c) Supremacy of the constitution and the rule of law.
(d) Universal adult suffrage, a national common voters roll, regular elections and a multi-party system of democratic government, to ensure accountability, responsiveness and openness.

2. Supremacy of Constitution
This Constitution is the supreme law of the Republic; law or conduct inconsistent with it is invalid, and the obligations imposed by it must be fulfilled.

CHAPTER 2 — BILL OF RIGHTS (selected)

7. Rights
(1) This Bill of Rights is a cornerstone of democracy in South Africa. It enshrines the rights of all people in our country and affirms the democratic values of human dignity, equality and freedom.

9. Equality
(1) Everyone is equal before the law and has the right to equal protection and benefit of the law.
(3) The state may not unfairly discriminate directly or indirectly against anyone on one or more grounds, including race, gender, sex, pregnancy, marital status, ethnic or social origin, colour, sexual orientation, age, disability, religion, conscience, belief, culture, language and birth.

10. Human dignity
Everyone has inherent dignity and the right to have their dignity respected and protected.

12. Freedom and security of the person
(1) Everyone has the right to freedom and security of the person, which includes the right—
(a) not to be deprived of freedom arbitrarily or without just cause;
(b) not to be detained without trial;
(c) to be free from all forms of violence from either public or private sources;
(d) not to be tortured in any way; and
(e) not to be treated or punished in a cruel, inhuman or degrading way.

25. Property
(1) No one may be deprived of property except in terms of law of general application, and no law may permit arbitrary deprivation of property.

26. Housing
(1) Everyone has the right to have access to adequate housing.
(2) The state must take reasonable legislative and other measures, within its available resources, to achieve the progressive realisation of this right.
(3) No one may be evicted from their home, or have their home demolished, without an order of court made after considering all the relevant circumstances. No legislation may permit arbitrary evictions.

33. Just administrative action
(1) Everyone has the right to administrative action that is lawful, reasonable and procedurally fair.

34. Access to courts
Everyone has the right to have any dispute that can be resolved by the application of law decided in a fair public hearing before a court or, where appropriate, another independent and impartial tribunal or forum.

36. Limitation of rights
(1) The rights in the Bill of Rights may be limited only in terms of law of general application to the extent that the limitation is reasonable and justifiable in an open and democratic society based on human dignity, equality and freedom, taking into account all relevant factors...

NOTE: This is a curated educational extract for local research demonstration. Consult the official text published by the Government Printer / Juta / LexisNexis for authoritative use.`,
    tags: ["constitution", "bill of rights", "supreme law", "chapter 2"],
    status: "In force",
    source: "Government of the Republic of South Africa",
  },
  {
    id: "lra-66-1995",
    title: "Labour Relations Act 66 of 1995",
    citation: "Act 66 of 1995",
    category: "acts",
    year: 1995,
    jurisdiction: "National",
    summary:
      "Primary statute governing collective bargaining, organisational rights, unfair dismissal, unfair labour practices, strikes and lock-outs, and the CCMA, Labour Court and Labour Appeal Court.",
    body: `LABOUR RELATIONS ACT 66 OF 1995

Purpose (s 1)
The purpose of this Act is to advance economic development, social justice, labour peace and the democratisation of the workplace by fulfilling the primary objects of this Act, which are—
(a) to give effect to and regulate the fundamental rights conferred by section 23 of the Constitution;
(b) to give effect to obligations incurred by the Republic as a member state of the International Labour Organisation;
(c) to provide a framework within which employees and their trade unions, employers and employers' organisations can—
    (i) collectively bargain to determine wages, terms and conditions of employment and other matters of mutual interest; and
    (ii) formulate industrial policy; and
(d) to promote—
    (i) orderly collective bargaining;
    (ii) collective bargaining at sectoral level;
    (iii) employee participation in decision-making in the workplace; and
    (iv) the effective resolution of labour disputes.

Unfair dismissal (Chapter VIII)
A dismissal is unfair if the employer fails to prove that the reason for dismissal is a fair reason related to the employee's conduct or capacity, or based on the employer's operational requirements, and that the dismissal was effected in accordance with a fair procedure (s 188).

Automatically unfair dismissals (s 187) include dismissal for participation in a protected strike, pregnancy, or discrimination on listed grounds.

Dispute resolution
• Conciliation at the Commission for Conciliation, Mediation and Arbitration (CCMA) or a bargaining council.
• Arbitration or adjudication in the Labour Court depending on the nature of the dispute.
• Review of arbitration awards under s 145 on limited grounds.

Organisational rights (Chapter III)
Registered trade unions that are sufficiently representative may acquire rights of access, deduction of subscriptions, election of shop stewards and disclosure of information.

NOTE: Educational summary for SA research demo. Use the official amended Act for practice.`,
    tags: ["labour", "ccma", "unfair dismissal", "strike", "collective bargaining"],
    status: "Amended",
    source: "Department of Employment and Labour",
  },
  {
    id: "bcea-75-1997",
    title: "Basic Conditions of Employment Act 75 of 1997",
    citation: "Act 75 of 1997",
    category: "acts",
    year: 1997,
    jurisdiction: "National",
    summary:
      "Sets minimum standards for working time, leave, notice, remuneration particulars and employment of children, enforced by the Department of Employment and Labour and labour inspectors.",
    body: `BASIC CONDITIONS OF EMPLOYMENT ACT 75 OF 1997

Application
Applies to all employees and employers except members of the National Defence Force, National Intelligence Agency, South African Secret Service and unpaid volunteers working for charitable organisations (with further limited exclusions).

Working time (Chapter 2)
• Maximum ordinary hours: 45 hours in any week.
• Overtime only by agreement, limited and paid at 1.5 times the ordinary wage (or time off by agreement).
• Meal intervals of at least one continuous hour after five hours' work (may be reduced by written agreement to 30 minutes).

Leave (Chapter 3)
• Annual leave: at least 21 consecutive days on full remuneration in respect of each annual leave cycle, or one day for every 17 days worked.
• Sick leave: in a 36-month cycle, paid sick leave equal to the number of days the employee would normally work during six weeks.
• Maternity leave: at least four consecutive months' maternity leave.
• Family responsibility leave: three days paid leave per annual leave cycle when the employee's child is born or sick, or in the event of death of a close family member.

Termination (Chapter 5)
Notice periods scale with length of service (one week / two weeks / four weeks). Employers must provide a certificate of service.

Sectoral determinations and ministerial determinations may vary conditions for specific sectors.

NOTE: Educational summary for SA research demo.`,
    tags: ["employment", "working time", "leave", "minimum standards"],
    status: "Amended",
    source: "Department of Employment and Labour",
  },
  {
    id: "eea-55-1998",
    title: "Employment Equity Act 55 of 1998",
    citation: "Act 55 of 1998",
    category: "acts",
    year: 1998,
    jurisdiction: "National",
    summary:
      "Prohibits unfair discrimination in employment and requires designated employers to implement affirmative action measures to achieve equitable representation.",
    body: `EMPLOYMENT EQUITY ACT 55 OF 1998

Purpose
To achieve equity in the workplace by—
(a) promoting equal opportunity and fair treatment through elimination of unfair discrimination; and
(b) implementing affirmative action measures to redress the disadvantages in employment experienced by designated groups (black people, women and people with disabilities).

Unfair discrimination (Chapter II)
No person may unfairly discriminate, directly or indirectly, against an employee in any employment policy or practice on one or more grounds, including race, gender, sex, pregnancy, marital status, family responsibility, ethnic or social origin, colour, sexual orientation, age, disability, religion, HIV status, conscience, belief, political opinion, culture, language, birth or on any other arbitrary ground.

It is not unfair discrimination to—
• take affirmative action measures consistent with the purpose of the Act; or
• distinguish, exclude or prefer any person on the basis of an inherent requirement of a job.

Medical testing is prohibited unless legislation permits or it is justifiable in the light of medical facts, employment conditions, social policy, the fair distribution of employee benefits or the inherent requirements of a job. HIV testing requires Labour Court authorisation.

Affirmative action (Chapter III)
Designated employers must prepare and implement an employment equity plan, consult with employees, conduct analysis of employment policies and workforce profile, and report to the Director-General.

NOTE: Educational summary for SA research demo.`,
    tags: ["employment equity", "discrimination", "affirmative action", "designated groups"],
    status: "Amended",
    source: "Department of Employment and Labour",
  },
  {
    id: "popa-4-2013",
    title: "Protection of Personal Information Act 4 of 2013",
    citation: "Act 4 of 2013 (POPIA)",
    category: "acts",
    year: 2013,
    jurisdiction: "National",
    summary:
      "South Africa's principal data protection statute. Establishes conditions for lawful processing of personal information and creates the Information Regulator.",
    body: `PROTECTION OF PERSONAL INFORMATION ACT 4 OF 2013 (POPIA)

Purpose
To give effect to the constitutional right to privacy by safeguarding personal information when processed by a responsible party, subject to justifiable limitations aimed at balancing the right to privacy against other rights, particularly the right of access to information, and to regulate the flow of personal information across the borders of the Republic.

Eight conditions for lawful processing (Chapter 3)
1. Accountability
2. Processing limitation (lawfulness, minimality, consent / justification)
3. Purpose specification
4. Further processing limitation
5. Information quality
6. Openness
7. Security safeguards
8. Data subject participation

Special personal information (s 26–33)
Processing of information concerning religious or philosophical beliefs, race or ethnic origin, trade union membership, political persuasion, health or sex life, biometric information, or criminal behaviour is prohibited unless a ground in s 27 applies (e.g. consent, establishment of a right or obligation in law, medical treatment by a health professional).

Information Regulator
An independent juristic person with powers to monitor and enforce compliance, handle complaints, and issue codes of conduct and enforcement notices.

Direct marketing by electronic means requires opt-in consent except for existing customers under limited conditions (s 69).

Cross-border transfers (s 72)
Personal information may only be transferred outside the Republic if the third party is subject to a law, binding corporate rules or binding agreement providing an adequate level of protection, or another ground in s 72 applies.

NOTE: Educational summary for SA research demo. Not a substitute for the official Act or legal advice.`,
    tags: ["popia", "privacy", "data protection", "information regulator"],
    status: "In force",
    source: "Information Regulator (South Africa)",
  },
  {
    id: "paia-2-2000",
    title: "Promotion of Access to Information Act 2 of 2000",
    citation: "Act 2 of 2000 (PAIA)",
    category: "acts",
    year: 2000,
    jurisdiction: "National",
    summary:
      "Gives effect to the constitutional right of access to any information held by the State and information held by another person that is required for the exercise or protection of any rights.",
    body: `PROMOTION OF ACCESS TO INFORMATION ACT 2 OF 2000

Constitutional foundation
Section 32 of the Constitution guarantees everyone the right of access to—
(a) any information held by the state; and
(b) any information that is held by another person and that is required for the exercise or protection of any rights.

Public and private bodies
PAIA applies to public bodies (organs of state) and private bodies. Requesters lodge Form 2 / Form C requests with the information officer. Grounds of refusal are listed (national security, commercial information, privacy of third parties, privileged information, etc.).

PAIA manuals
Public and private bodies must compile manuals describing their records and how to request access. The Information Regulator oversees compliance together with POPIA functions.

Relationship with POPIA
Access rights under PAIA interact with data subject access under POPIA. Where both apply, the statutes are read together.

NOTE: Educational summary for SA research demo.`,
    tags: ["paia", "access to information", "transparency", "section 32"],
    status: "In force",
    source: "Information Regulator (South Africa)",
  },
  {
    id: "cpa-68-2008",
    title: "Consumer Protection Act 68 of 2008",
    citation: "Act 68 of 2008",
    category: "acts",
    year: 2008,
    jurisdiction: "National",
    summary:
      "Comprehensive consumer protection framework covering marketing, agreements, quality of goods and services, unfair contract terms, and the National Consumer Commission.",
    body: `CONSUMER PROTECTION ACT 68 OF 2008

Fundamental consumer rights
• Equality in the consumer market
• Privacy
• Choice
• Disclosure and information
• Fair and responsible marketing
• Fair and honest dealing
• Fair, just and reasonable terms and conditions
• Fair value, good quality and safety
• Supplier accountability

Section 48 — Unfair, unreasonable or unjust contract terms
A supplier must not supply, offer to supply or enter into an agreement to supply goods or services on terms that are unfair, unreasonable or unjust, or require a consumer to waive any rights, assume any obligation, or waive any liability of the supplier on terms that are unfair, unreasonable or unjust.

Section 55–56 — Quality and implied warranty
Consumers have a right to safe, good quality goods. Goods are accompanied by an implied warranty of quality for at least six months, entitling the consumer to repair, replacement or refund at the supplier's election in certain circumstances.

Cooling-off and direct marketing
Consumers may rescind a transaction resulting from direct marketing within five business days without reason or penalty (s 16).

Enforcement
National Consumer Commission, National Consumer Tribunal, provincial consumer protection authorities, and ordinary courts.

NOTE: Educational summary for SA research demo.`,
    tags: ["consumer", "cpa", "unfair terms", "warranty", "ncc"],
    status: "In force",
    source: "Department of Trade, Industry and Competition",
  },
  {
    id: "companies-71-2008",
    title: "Companies Act 71 of 2008",
    citation: "Act 71 of 2008",
    category: "acts",
    year: 2008,
    jurisdiction: "National",
    summary:
      "Modern company law statute governing incorporation, governance, directors' duties, business rescue, fundamental transactions and the CIPC.",
    body: `COMPANIES ACT 71 OF 2008

Key features
• Profit and non-profit companies; state-owned companies.
• Memorandum of Incorporation (MOI) as the founding document.
• Solvency and liquidity tests for distributions.
• Codified directors' duties (ss 75–77) including fiduciary duties and the duty of care, skill and diligence, with a business judgment safe harbour.
• Business rescue (Chapter 6) as an alternative to liquidation for financially distressed companies.
• Appraisal rights and fundamental transactions (schemes, mergers, disposals).
• Enhanced shareholder protections and social and ethics committee requirements for certain companies.

CIPC
The Companies and Intellectual Property Commission administers incorporation, annual returns and compliance.

NOTE: Educational summary for SA research demo.`,
    tags: ["companies", "directors duties", "business rescue", "cipc", "moi"],
    status: "Amended",
    source: "CIPC / DTIC",
  },
  {
    id: "pie-19-1998",
    title: "Prevention of Illegal Eviction from and Unlawful Occupation of Land Act 19 of 1998",
    citation: "Act 19 of 1998 (PIE)",
    category: "acts",
    year: 1998,
    jurisdiction: "National",
    summary:
      "Gives effect to s 26(3) of the Constitution by regulating eviction of unlawful occupiers and requiring courts to consider all relevant circumstances, including the rights and needs of the elderly, children, disabled persons and households headed by women.",
    body: `PREVENTION OF ILLEGAL EVICTION FROM AND UNLAWFUL OCCUPATION OF LAND ACT 19 OF 1998

Section 4 — Eviction of unlawful occupiers
Notwithstanding anything to the contrary contained in any law or the common law, no proceedings for eviction of an unlawful occupier may be instituted without written notice of at least 14 days to the unlawful occupier and the municipality.

The court must be satisfied that it is just and equitable to grant an order after considering all the relevant circumstances, including—
• the rights and needs of the elderly, children, disabled persons and households headed by women;
• whether land has been made available or can reasonably be made available by a municipality or other organ of state or another land owner for the relocation of the unlawful occupier.

Section 6 — Urgent proceedings
Special procedure for urgent eviction where there is a real and imminent danger of substantial injury or damage.

Relationship with common law rei vindicatio and ESTA (Extension of Security of Tenure Act 62 of 1997) for occupiers on farms.

Landmark cases interpreting PIE include Port Elizabeth Municipality v Various Occupiers 2005 (1) SA 217 (CC) and City of Johannesburg v Blue Moonlight Properties 2012 (2) SA 104 (CC).

NOTE: Educational summary for SA research demo.`,
    tags: ["pie", "eviction", "housing", "section 26", "unlawful occupation"],
    status: "In force",
    source: "Department of Human Settlements",
  },
  {
    id: "nca-34-2005",
    title: "National Credit Act 34 of 2005",
    citation: "Act 34 of 2005",
    category: "acts",
    year: 2005,
    jurisdiction: "National",
    summary:
      "Regulates consumer credit, reckless lending, debt counselling, credit bureaux and the National Credit Regulator and National Consumer Tribunal.",
    body: `NATIONAL CREDIT ACT 34 OF 2005

Purpose
To promote a fair, transparent, competitive, sustainable, responsible, efficient, effective and accessible credit market and industry, and to protect consumers.

Reckless credit (ss 80–84)
A credit agreement is reckless if, at the time it was made, the credit provider failed to conduct an assessment as required, or entered into the agreement despite the information available indicating the consumer did not understand the risks or would be over-indebted.

Debt review (ss 86–88)
Over-indebted consumers may apply to a debt counsellor. The Magistrate's Court may rearrange obligations. During debt review, credit providers are restricted from enforcement in specified ways.

Interest, fees and credit marketing are regulated. Credit bureaux must ensure accurate consumer credit information.

NOTE: Educational summary for SA research demo.`,
    tags: ["credit", "nca", "reckless lending", "debt counselling", "ncr"],
    status: "Amended",
    source: "National Credit Regulator",
  },
  {
    id: "criminal-procedure-51-1977",
    title: "Criminal Procedure Act 51 of 1977",
    citation: "Act 51 of 1977",
    category: "acts",
    year: 1977,
    jurisdiction: "National",
    summary:
      "Core criminal procedure statute covering arrest, bail, charge, plea, trial, evidence, sentence and appeals in South African criminal courts.",
    body: `CRIMINAL PROCEDURE ACT 51 OF 1977

Selected themes
• Arrest without warrant (s 40) and with warrant.
• Bail and release on warning (Chapter 9) — constitutionalised through s 35 of the Constitution and case law such as S v Dlamini; S v Dladla; S v Joubert; S v Schietekat 1999 (4) SA 623 (CC).
• Charge sheets and indictments.
• Plea and sentence agreements (s 105A).
• Trial procedure in lower and superior courts.
• Competent and compellable witnesses; privilege.
• Sentence options including imprisonment, fine, correctional supervision, suspended sentences and diversion frameworks interacting with the Child Justice Act 75 of 2008.

NOTE: Educational summary for SA research demo. Always verify current amendments.`,
    tags: ["criminal procedure", "bail", "arrest", "trial", "sentence"],
    status: "Amended",
    source: "Department of Justice and Constitutional Development",
  },
  {
    id: "makwanyane-1995",
    title: "S v Makwanyane and Another",
    citation: "1995 (3) SA 391 (CC)",
    category: "cases",
    year: 1995,
    jurisdiction: "Constitutional Court",
    summary:
      "Landmark Constitutional Court judgment holding that the death penalty is unconstitutional as inconsistent with the right to life, dignity and the prohibition on cruel, inhuman or degrading punishment.",
    body: `S v MAKWANYANE AND ANOTHER 1995 (3) SA 391 (CC)

Court: Constitutional Court of South Africa
Coram: Chaskalson P et al.
Date: 6 June 1995

Holding
The death penalty, as provided for in s 277(1)(a) of the Criminal Procedure Act 51 of 1977, is inconsistent with the interim Constitution and invalid. Capital punishment violates the right to life, the right to dignity, and the right not to be subjected to cruel, inhuman or degrading punishment.

Key reasoning (Chaskalson P)
• The Constitution is the supreme law; all law and conduct must conform to it.
• Public opinion, while relevant, is not a substitute for the Court's duty to interpret the Constitution.
• The death penalty is a form of punishment that is irreversible and allows for the risk of error.
• Proportionality and the values of ubuntu inform the Bill of Rights analysis.

Significance
Foundational judgment on constitutional values, ubuntu, and the interpretive approach of the Constitutional Court. Frequently cited on dignity and the limitation analysis.

NOTE: Case summary for educational SA research use. Read the full judgment for authoritative content.`,
    tags: ["death penalty", "dignity", "ubuntu", "constitutional court", "criminal"],
    status: "Reported",
    source: "Constitutional Court of South Africa",
  },
  {
    id: "grootboom-2000",
    title: "Government of the Republic of South Africa v Grootboom",
    citation: "2001 (1) SA 46 (CC)",
    category: "cases",
    year: 2000,
    jurisdiction: "Constitutional Court",
    summary:
      "Seminal socio-economic rights case on the right of access to adequate housing under s 26. The Court required the state to have a reasonable programme that includes relief for those in desperate need.",
    body: `GOVERNMENT OF THE REPUBLIC OF SOUTH AFRICA AND OTHERS v GROOTBOOM AND OTHERS 2001 (1) SA 46 (CC)

Court: Constitutional Court
Judgment: Yacoob J (unanimous)

Facts
Irene Grootboom and others, including children, were evicted from informal homes on private land earmarked for formal housing and left in intolerable conditions on a sports field.

Holding
Section 26 obliges the state to take reasonable legislative and other measures, within available resources, to achieve progressive realisation of the right of access to adequate housing. A housing programme that leaves out of account those in desperate need is not reasonable.

Key principles
• Reasonableness review of socio-economic rights measures.
• Context-sensitive assessment of state programmes.
• Children's rights under s 28 considered but the primary vehicle was s 26.
• International law (ICESCR) used as interpretive aid.

Impact
Blueprint for socio-economic rights adjudication in South Africa; cited in subsequent housing, health and social security cases.

NOTE: Educational case summary.`,
    tags: ["housing", "socio-economic rights", "section 26", "reasonableness", "grootboom"],
    status: "Reported",
    source: "Constitutional Court of South Africa",
  },
  {
    id: "treatment-action-campaign-2002",
    title: "Minister of Health v Treatment Action Campaign (No 2)",
    citation: "2002 (5) SA 721 (CC)",
    category: "cases",
    year: 2002,
    jurisdiction: "Constitutional Court",
    summary:
      "Constitutional Court ordered government to remove restrictions on nevirapine for prevention of mother-to-child transmission of HIV and to devise a comprehensive PMTCT programme.",
    body: `MINISTER OF HEALTH AND OTHERS v TREATMENT ACTION CAMPAIGN AND OTHERS (NO 2) 2002 (5) SA 721 (CC)

Holding
The government's policy restricting nevirapine to pilot sites was unreasonable and breached s 27(1)(a) and (2) of the Constitution (right of access to health care services). The Court ordered government to permit and facilitate the use of nevirapine where medically indicated and to roll out a comprehensive programme.

Significance
Demonstrates justiciability of socio-economic rights and the Court's willingness to craft structural remedies while respecting separation of powers.

NOTE: Educational case summary.`,
    tags: ["health", "hiv", "section 27", "tac", "socio-economic rights"],
    status: "Reported",
    source: "Constitutional Court of South Africa",
  },
  {
    id: "carmichele-2001",
    title: "Carmichele v Minister of Safety and Security",
    citation: "2001 (4) SA 938 (CC)",
    category: "cases",
    year: 2001,
    jurisdiction: "Constitutional Court",
    summary:
      "Developed delictual law in light of the Constitution, recognising potential state liability where police and prosecutors failed to protect a woman from a known dangerous accused.",
    body: `CARMICHELE v MINISTER OF SAFETY AND SECURITY AND ANOTHER 2001 (4) SA 938 (CC)

Holding
Courts are obliged to develop the common law in accordance with the spirit, purport and objects of the Bill of Rights (s 39(2)). The delictual rules on wrongfulness and the state's duty to protect must be reconsidered in light of constitutional rights to life, dignity and freedom and security of the person, and the state's duty to prevent gender-based violence.

Significance
Foundational for constitutional development of private law and state liability for failures to protect against violent crime.

NOTE: Educational case summary.`,
    tags: ["delict", "state liability", "gender-based violence", "section 39(2)", "police"],
    status: "Reported",
    source: "Constitutional Court of South Africa",
  },
  {
    id: "blue-moonlight-2011",
    title: "City of Johannesburg v Blue Moonlight Properties",
    citation: "2012 (2) SA 104 (CC)",
    category: "cases",
    year: 2011,
    jurisdiction: "Constitutional Court",
    summary:
      "On eviction of unlawful occupiers from private property: municipalities must plan and budget for emergency accommodation; private owners' rights are not absolute against constitutional housing obligations.",
    body: `CITY OF JOHANNESBURG METROPOLITAN MUNICIPALITY v BLUE MOONLIGHT PROPERTIES 39 (PTY) LTD AND ANOTHER 2012 (2) SA 104 (CC)

Holding
It is not enough for a municipality to refuse emergency housing to persons evicted from private property on the basis that its policy only covers persons evicted from state-owned property. The City's housing policy was unconstitutional to that extent. Courts must balance property rights and housing rights under PIE and the Constitution; dates of eviction may be linked to provision of alternative accommodation.

NOTE: Educational case summary.`,
    tags: ["pie", "eviction", "emergency housing", "johannesburg", "property"],
    status: "Reported",
    source: "Constitutional Court of South Africa",
  },
  {
    id: "national-coalition-1998",
    title: "National Coalition for Gay and Lesbian Equality v Minister of Justice",
    citation: "1999 (1) SA 6 (CC)",
    category: "cases",
    year: 1998,
    jurisdiction: "Constitutional Court",
    summary:
      "Struck down the offence of sodomy as unconstitutional discrimination on the ground of sexual orientation, affirming equality and dignity.",
    body: `NATIONAL COALITION FOR GAY AND LESBIAN EQUALITY AND ANOTHER v MINISTER OF JUSTICE AND OTHERS 1999 (1) SA 6 (CC)

Holding
The common-law offence of sodomy and related statutory provisions are unconstitutional. They violate equality (s 9), dignity (s 10) and privacy. Sexual orientation is an express prohibited ground of discrimination in the Constitution.

Significance
Landmark equality jurisprudence; foundation for later cases on same-sex partnership and marriage equality leading to the Civil Union Act 17 of 2006.

NOTE: Educational case summary.`,
    tags: ["equality", "sexual orientation", "dignity", "criminal law"],
    status: "Reported",
    source: "Constitutional Court of South Africa",
  },
  {
    id: "sidumo-2007",
    title: "Sidumo v Rustenburg Platinum Mines Ltd",
    citation: "2008 (2) SA 24 (CC)",
    category: "cases",
    year: 2007,
    jurisdiction: "Constitutional Court",
    summary:
      "Leading case on review of CCMA arbitration awards: the question is whether the decision is one that a reasonable decision-maker could not reach.",
    body: `SIDUMO AND ANOTHER v RUSTENBURG PLATINUM MINES LTD AND OTHERS 2008 (2) SA 24 (CC)

Holding
The PAJA standard and the s 145 LRA review grounds must be read consistently with the Constitution. The core enquiry on review of a CCMA award is: Is the decision reached by the commissioner one that a reasonable decision-maker could not reach? Commissioners must consider the totality of circumstances in unfair dismissal disputes, including the Code of Good Practice: Dismissal.

NOTE: Educational case summary.`,
    tags: ["labour", "ccma", "review", "sidumo", "unfair dismissal"],
    status: "Reported",
    source: "Constitutional Court of South Africa",
  },
  {
    id: "form-n1",
    title: "Form N1 — Notice of Motion (High Court)",
    citation: "Uniform Rules of Court — Form 2 (illustrative Notice of Motion)",
    category: "court-forms",
    year: 2024,
    jurisdiction: "High Court",
    summary:
      "Template structure for a notice of motion in application proceedings in the High Court of South Africa, aligned to Uniform Rule 6 practice.",
    body: `IN THE HIGH COURT OF SOUTH AFRICA
[GAUTENG DIVISION, JOHANNESBURG]

Case No: ________________

In the matter between:

APPLICANT                                          Applicant

and

RESPONDENT                                         Respondent

NOTICE OF MOTION

TAKE NOTICE that the Applicant intends making application to the above Honourable Court on ____________ at 10h00 or so soon thereafter as the matter may be heard, for an order in the following terms:

1. ________________________________________________;
2. ________________________________________________;
3. Costs of the application;
4. Further and/or alternative relief.

TAKE NOTICE FURTHER that the affidavit of ________________ annexed hereto will be used in support of this application.

TAKE NOTICE FURTHER that the Applicant has appointed ________________, Johannesburg, as the address at which the Applicant will accept notice and service of all process in these proceedings.

TAKE NOTICE FURTHER that if you intend opposing this application you are required to:
(a) notify the Applicant's attorney in writing on or before ____________; and
(b) within fifteen (15) days after you have so given notice of intention to oppose, file your answering affidavit, if any;

and further that you are required to appoint in such notification an address referred to in rule 6(5)(b) at which you will accept notice and service of all documents in these proceedings.

If no such notice of intention to oppose be given, the application will be made on the date stated above.

DATED at JOHANNESBURG on this ____ day of __________ 20__.

_________________________
Applicant's Attorney
[Address]
[Tel / Email / Ref]

TO: The Registrar of the above Honourable Court
AND TO: Respondent / Respondent's Attorney

NOTE: Template for educational / practice-management demo. Confirm current Uniform Rules forms and local division practice directives before filing.`,
    tags: ["high court", "notice of motion", "rule 6", "application"],
    status: "In force",
    source: "Uniform Rules of Court (template)",
  },
  {
    id: "form-summons-mc",
    title: "Ordinary Summons — Magistrates' Court",
    citation: "Magistrates' Courts Rules — Summons (illustrative)",
    category: "court-forms",
    year: 2024,
    jurisdiction: "Magistrates' Court",
    summary:
      "Illustrative ordinary summons structure for actions in the Magistrates' Court, including particulars of claim pointers under the Magistrates' Courts Act 32 of 1944.",
    body: `IN THE MAGISTRATES' COURT FOR THE DISTRICT OF ________________
HELD AT ________________

Case No: ________________

In the matter between:

PLAINTIFF                                            Plaintiff

and

DEFENDANT                                            Defendant

SUMMONS

To the sheriff or deputy:

INFORM:

________________ (Defendant) of ________________

that ________________ (Plaintiff) hereby institutes action against the Defendant in which action the Plaintiff claims the relief and on the grounds set out in the particulars of claim annexed hereto.

INFORM the Defendant further that if the Defendant disputes the claim and wishes to defend the action, the Defendant shall—
(a) within 10 days of the service upon the Defendant of this summons file with the clerk of the court a notice of intention to defend and serve a copy thereof on the Plaintiff or the Plaintiff's attorney; and
(b) thereafter, within 20 days after filing notice of intention to defend, deliver a plea (with or without a claim in reconvention), exception or application to strike out.

INFORM the Defendant further that if the Defendant fails to file and serve notice as aforesaid, judgment as claimed may be given against the Defendant without further notice.

DATED at ____________ this ____ day of __________ 20__.

_________________________
Clerk of the Court

_________________________
Plaintiff / Plaintiff's Attorney

PARTICULARS OF CLAIM (annexure)
1. Parties and locus standi
2. Jurisdiction facts
3. Cause of action (contract / delict / unjustified enrichment)
4. Quantum and interest (prescribed rate under Prescribed Rate of Interest Act 55 of 1975)
5. Costs

NOTE: Educational template only.`,
    tags: ["magistrates court", "summons", "action", "particulars of claim"],
    status: "In force",
    source: "Magistrates' Courts Rules (template)",
  },
  {
    id: "form-ccma-7-11",
    title: "CCMA Form 7.11 — Referring a Dispute",
    citation: "CCMA Form 7.11",
    category: "court-forms",
    year: 2024,
    jurisdiction: "CCMA",
    summary:
      "Referral form used to refer unfair dismissal, unfair labour practice and other disputes to the CCMA or a bargaining council under the LRA.",
    body: `CCMA / BARGAINING COUNCIL REFERRAL — FORM 7.11 (GUIDE)

Purpose
Refer a labour dispute for conciliation (and where applicable subsequent arbitration) under the Labour Relations Act 66 of 1995.

Typical contents
1. Details of employee / trade union referring the dispute
2. Details of employer
3. Nature of dispute (e.g. unfair dismissal — misconduct / incapacity / operational requirements; unfair labour practice; organisational rights; mutual interest)
4. Date of dismissal or act/omission
5. Summary of facts
6. Relief sought (reinstatement, re-employment, compensation)
7. Confirmation of service on the other party

Time limits (critical)
• Unfair dismissal: generally 30 days from date of dismissal (s 191 LRA).
• Unfair labour practice: 90 days from act or awareness.
Late referrals require an application for condonation with a full explanation.

After referral
The CCMA sets the matter down for conciliation. If unresolved, a certificate is issued and the matter may proceed to arbitration or the Labour Court depending on the dispute type.

NOTE: Use the official CCMA form from www.ccma.org.za for actual filings. This is an educational outline.`,
    tags: ["ccma", "form 7.11", "unfair dismissal", "conciliation"],
    status: "In force",
    source: "CCMA",
  },
  {
    id: "uniform-rules",
    title: "Uniform Rules of Court (High Court) — Overview",
    citation: "Uniform Rules of Court",
    category: "court-rules",
    year: 2024,
    jurisdiction: "High Court",
    summary:
      "Overview of key Uniform Rules governing High Court civil procedure in South Africa, including applications, actions, discovery and trial.",
    body: `UNIFORM RULES OF COURT — PRACTITIONER OVERVIEW (SA)

Rule 6 — Applications
Application proceedings are brought on notice of motion supported by affidavit. Opposed applications follow timelines for answering and replying affidavits. Urgent applications engage Rule 6(12).

Rule 17–18 — Action procedure
Summons, appearance to defend, plea, replication. Particulars of claim must comply with facta probanda requirements; technical exceptions under Rule 23.

Rule 35 — Discovery
Parties discover documents relating to any matter in question. Privilege (legal advice, litigation) may be claimed. Failure to discover has serious consequences.

Rule 36–37 — Expert notices and pre-trial
Expert summaries, joint minutes, and pre-trial conferences to narrow issues.

Rule 53 — Reviews
Reviews of administrative action / lower court proceedings on the record, with reasons.

Practice directives
Each Division (e.g. Gauteng, Western Cape) issues practice directives on CaseLines/Court Online, roll allocation, and opposed motion court procedure. Always check the local directive.

NOTE: Educational overview — consult the official Uniform Rules and current practice directives.`,
    tags: ["uniform rules", "high court", "civil procedure", "rule 6", "discovery"],
    status: "In force",
    source: "Rules Board for Courts of Law",
  },
  {
    id: "const-court-rules",
    title: "Rules of the Constitutional Court",
    citation: "Constitutional Court Rules",
    category: "court-rules",
    year: 2024,
    jurisdiction: "Constitutional Court",
    summary:
      "Procedural rules for applications for leave to appeal, direct access, confirmation of orders of constitutional invalidity, and directions by the Chief Justice.",
    body: `RULES OF THE CONSTITUTIONAL COURT — OVERVIEW

Jurisdiction pathways
• Appeals from the Supreme Court of Appeal or a High Court on constitutional matters / arguable points of law of general public importance (s 167 Constitution; Superior Courts Act).
• Direct access in the interests of justice (exceptional).
• Confirmation of declarations of constitutional invalidity made by the High Court or SCA (s 172(2)).

Applications for leave to appeal
Must set out the constitutional matter or point of law of general public importance, prospects of success, and interests of justice. Written argument follows directions.

Practice
Electronic filing and strict page limits apply. The Court often decides leave and merits together or issues directions for further argument.

NOTE: Educational overview. Use the official Constitutional Court Rules and practice directions.`,
    tags: ["constitutional court", "leave to appeal", "direct access", "confirmation"],
    status: "In force",
    source: "Constitutional Court of South Africa",
  },
  {
    id: "magistrates-rules",
    title: "Magistrates' Courts Rules — Overview",
    citation: "Rules Regulating the Conduct of Proceedings of the Magistrates' Courts of South Africa",
    category: "court-rules",
    year: 2024,
    jurisdiction: "Magistrates' Court",
    summary:
      "Rules governing civil procedure in the district and regional magistrates' courts, including actions, applications, debt proceedings and execution.",
    body: `MAGISTRATES' COURTS RULES — OVERVIEW

Actions and applications
Ordinary and provisional sentence summons; applications on notice. Monetary jurisdiction limits are set by the Minister and must be checked for the year of issue.

Default judgment and rescission
Rules provide for default judgment where appearance is not entered, and rescission on good cause.

Execution
Warrants of execution against movable and immovable property; emoluments attachment orders (subject to National Credit Act and case law limits on emoluments).

Small claims interaction
Separate Small Claims Court procedures apply for lower value disputes under the Small Claims Courts Act 61 of 1984.

NOTE: Educational overview.`,
    tags: ["magistrates court", "civil procedure", "execution", "jurisdiction"],
    status: "In force",
    source: "Rules Board for Courts of Law",
  },
  {
    id: "reg-lra-ccma",
    title: "CCMA Rules and LRA Regulations",
    citation: "CCMA Rules (GN R1448 / as amended)",
    category: "regulations",
    year: 2024,
    jurisdiction: "National",
    summary:
      "Rules regulating conciliation, arbitration, con-arb, representation, postponements and certification of outcomes at the CCMA.",
    body: `CCMA RULES — KEY POINTS FOR PRACTITIONERS

Referral and service
Disputes are referred on prescribed forms with proof of service. Time periods in the LRA are strict; condonation applications require full affidavits covering degree of lateness, explanation, prospects of success, prejudice and interests of justice.

Conciliation
Held in private. Commissioners attempt settlement. If unresolved, a certificate of outcome is issued.

Arbitration
More formal but inquisitorial elements remain. Representation rules restrict legal representation in misconduct/incapacity dismissal arbitrations unless the commissioner and parties consent or the commissioner rules that it is unreasonable to expect a party to deal with the dispute without legal representation (complexity, comparative ability, etc.).

Con-arb
Unless a party objects timeously, conciliation may be followed immediately by arbitration on the same day for certain dismissal disputes.

NOTE: Educational summary of regulatory practice.`,
    tags: ["ccma rules", "arbitration", "conciliation", "condonation"],
    status: "In force",
    source: "CCMA",
  },
  {
    id: "reg-popia-regulations",
    title: "POPIA Regulations, 2018",
    citation: "GN 1383 of 14 December 2018",
    category: "regulations",
    year: 2018,
    jurisdiction: "National",
    summary:
      "Regulations under POPIA dealing with consent forms, objection, correction, complaints to the Information Regulator and responsibilities of information officers.",
    body: `REGULATIONS RELATING TO THE PROTECTION OF PERSONAL INFORMATION, 2018

Highlights
• Manner of dealing with data subject objections and correction requests.
• Additional responsibilities of information officers, including impact assessments and awareness.
• Prescribed forms for complaints to the Information Regulator.
• Requirements supporting consent where relied upon as a lawful ground.

Practical compliance
Responsible parties should align PAIA manuals, privacy notices, operator agreements and security measures with both the Act and these Regulations, and register information officers as required.

NOTE: Educational summary.`,
    tags: ["popia", "regulations", "information officer", "consent"],
    status: "In force",
    source: "Information Regulator",
  },
  {
    id: "reg-national-minimum-wage",
    title: "National Minimum Wage annual adjustment notices",
    citation: "National Minimum Wage Act 9 of 2018 — annual notices",
    category: "regulations",
    year: 2025,
    jurisdiction: "National",
    summary:
      "Annual notices published under the National Minimum Wage Act adjust the national minimum wage and related schedules for farm, domestic and expanded public works workers.",
    body: `NATIONAL MINIMUM WAGE — REGULATORY FRAMEWORK

The National Minimum Wage Act 9 of 2018 establishes a national minimum wage. Annual reviews by the National Minimum Wage Commission culminate in ministerial notices adjusting rates.

Categories commonly scheduled
• General national minimum wage (hourly)
• Farm workers
• Domestic workers
• Workers in the expanded public works programme

Employers must still comply with BCEA schedules, sectoral determinations and bargaining council agreements where more favourable.

Enforcement
Labour inspectors; claims via CCMA / Labour Court pathways depending on nature of claim.

NOTE: Always verify the latest Government Gazette notice for current rand amounts. Figures change annually.`,
    tags: ["minimum wage", "bcea", "employment", "gazette"],
    status: "Amended",
    source: "Department of Employment and Labour",
  },
  {
    id: "gauteng-liquor",
    title: "Gauteng Liquor Act 2 of 2003",
    citation: "Act 2 of 2003 (Gauteng)",
    category: "provincial-laws",
    year: 2003,
    jurisdiction: "Gauteng",
    summary:
      "Provincial statute regulating the retail sale and micro-manufacture of liquor in Gauteng, licensing, and the Gauteng Liquor Board.",
    body: `GAUTENG LIQUOR ACT 2 OF 2003 — OVERVIEW

Purpose
Regulate the liquor industry in Gauteng to reduce socio-economic and other costs of alcohol abuse and to facilitate contribution of the industry to economic growth.

Licensing
Applications for various licence categories (restaurant, tavern, hotel, liquor store, micro-manufacture, etc.) are considered by the Board with public participation and municipal input. Zoning and proximity to schools/places of worship are material.

Compliance
Trading hours, conditions of licence, prohibitions on sale to minors, and enforcement by liquor inspectors.

NOTE: Educational provincial law summary. Confirm current provincial amendments and regulations.`,
    tags: ["gauteng", "liquor", "licensing", "provincial"],
    status: "Amended",
    source: "Gauteng Provincial Government",
  },
  {
    id: "wc-liquor",
    title: "Western Cape Liquor Act 4 of 2008",
    citation: "Act 4 of 2008 (Western Cape)",
    category: "provincial-laws",
    year: 2008,
    jurisdiction: "Western Cape",
    summary:
      "Western Cape provincial liquor regulation framework, including the Western Cape Liquor Authority and licensing processes.",
    body: `WESTERN CAPE LIQUOR ACT 4 OF 2008 — OVERVIEW

Establishes licensing for retail sale and micro-production of liquor in the Western Cape, with emphasis on public interest, harm reduction and local government participation.

Applications, objections, hearings and appeals follow provincial procedures. Licence conditions may address trading hours, security and nuisance control.

NOTE: Educational summary.`,
    tags: ["western cape", "liquor", "licensing", "provincial"],
    status: "Amended",
    source: "Western Cape Government",
  },
  {
    id: "kzn-planning",
    title: "KwaZulu-Natal Planning and Development Act 6 of 2008",
    citation: "Act 6 of 2008 (KZN)",
    category: "provincial-laws",
    year: 2008,
    jurisdiction: "KwaZulu-Natal",
    summary:
      "Provincial planning framework interacting with SPLUMA (Spatial Planning and Land Use Management Act 16 of 2013) for municipal land use management in KZN.",
    body: `KWAZULU-NATAL PLANNING AND DEVELOPMENT ACT 6 OF 2008 — OVERVIEW

Provides institutional and procedural mechanisms for development planning in KZN. Must be read with the national Spatial Planning and Land Use Management Act 16 of 2013 (SPLUMA) and municipal planning by-laws.

Key themes
• Development applications and appeals
• Alignment with municipal spatial development frameworks
• Cooperative governance between province and municipalities

NOTE: Educational summary. Check SPLUMA by-laws of the relevant municipality (e.g. eThekwini) for operational rules.`,
    tags: ["kzn", "planning", "spluma", "land use", "provincial"],
    status: "Amended",
    source: "KwaZulu-Natal Provincial Government",
  },
  {
    id: "gp-schools",
    title: "Gauteng School Education Act 6 of 1995",
    citation: "Act 6 of 1995 (Gauteng)",
    category: "provincial-laws",
    year: 1995,
    jurisdiction: "Gauteng",
    summary:
      "Provincial education statute governing public schools in Gauteng, school governing bodies, admissions and related matters, read with the South African Schools Act 84 of 1996.",
    body: `GAUTENG SCHOOL EDUCATION ACT 6 OF 1995 — OVERVIEW

Complements the South African Schools Act 84 of 1996 in the provincial sphere. Addresses establishment and governance of public schools, duties of the MEC and Head of Department, and school governing body functions within provincial competence.

Admissions, language policy and fee regulations must also comply with national norms, the Constitution (ss 29, 9 and 28) and judgments such as MEC for Education v Governing Body of the Rivonia Primary School 2013 (6) SA 582 (CC).

NOTE: Educational summary.`,
    tags: ["gauteng", "education", "schools", "sgb", "provincial"],
    status: "Amended",
    source: "Gauteng Department of Education",
  },

  {
    id: "nhi-20-2023",
    title: "National Health Insurance Act 20 of 2023",
    citation: "Act 20 of 2023",
    category: "acts",
    year: 2023,
    jurisdiction: "National",
    summary:
      "Establishes the National Health Insurance Fund as a vehicle toward universal access to quality health care services in South Africa, subject to phased implementation and regulations.",
    body: `NATIONAL HEALTH INSURANCE ACT 20 OF 2023 — OVERVIEW (EDUCATIONAL)

Purpose
To achieve progressive realisation of the right of access to health care services under section 27 of the Constitution by establishing a National Health Insurance Fund and related institutional arrangements.

Key themes
• NHI Fund as a purchaser of health care services
• Registration of users and certification of providers (as implemented over time)
• Governance, advisory committees and accountability structures
• Interaction with existing public and private health arrangements during transition

Practical note
Many day-to-day effects depend on commencement dates, regulations and pilot phases. Always check the latest Government Gazette notices before advising clients or making personal decisions about medical schemes.

Related case law themes: Minister of Health v Treatment Action Campaign (access to health care; reasonableness).

NOTE: Curated educational summary for LulaGazette. Not a substitute for the official Act or legal advice.`,
    tags: ["nhi", "health", "section 27", "universal health", "fund"],
    status: "In force",
    source: "Government Gazette / Department of Health",
  },
  {
    id: "expropriation-13-2024",
    title: "Expropriation Act 13 of 2024",
    citation: "Act 13 of 2024",
    category: "acts",
    year: 2024,
    jurisdiction: "National",
    summary:
      "National statute governing expropriation of property for a public purpose or in the public interest, including procedures, compensation principles and dispute pathways, read with section 25 of the Constitution.",
    body: `EXPROPRIATION ACT 13 OF 2024 — OVERVIEW (EDUCATIONAL)

Constitutional frame (s 25)
Property may be expropriated only in terms of law of general application for a public purpose or in the public interest, subject to compensation. Compensation must be just and equitable, reflecting an equitable balance between the public interest and the interests of those affected.

Act themes
• Powers and procedures for expropriating authorities
• Notices, investigation and opportunity to be heard
• Compensation — including debates around circumstances where nil compensation may be just and equitable for land
• Court review and dispute resolution

For individuals
If you receive an expropriation notice, diary deadlines, keep all papers, and get advice quickly — time limits and valuation issues are technical.

For lawyers
Read the Act with the Property Valuation Act frameworks, municipal planning, and recent academic/practice commentary; verify commencement and regulations.

NOTE: Educational summary for LulaGazette demo library.`,
    tags: ["expropriation", "section 25", "property", "land", "compensation"],
    status: "In force",
    source: "Government Gazette",
  },
  {
    id: "reg-popia-2025",
    title: "Protection of Personal Information Regulations — 2025 amendments",
    citation: "POPIA Regulations amendments (GG, 17 April 2025)",
    category: "regulations",
    year: 2025,
    jurisdiction: "National",
    summary:
      "Amended POPIA Regulations effective 17 April 2025 expand how data subjects may object, request correction/deletion, and how direct marketing consent must be obtained — including modern channels such as SMS and WhatsApp.",
    body: `POPIA REGULATIONS 2025 AMENDMENTS — PLAIN OVERVIEW

What changed for ordinary people
• You may object to certain processing free of charge on a form substantially similar to the prescribed form, via hand, fax, post, email, SMS, WhatsApp, or other expedient means.
• Telephonic objections can be valid if recorded by the responsible party and made available on request.
• Requests to correct, delete or destroy personal information follow similar accessible channels; responsible parties should notify you of outcomes (including within stated timelines in the Regulations).
• Direct marketing by electronic communications requires explicit consent; opt-out alone is not consent under s 69(2) themes.

What changed for organisations / lawyers
• Information officer compliance frameworks must be continually improved.
• Complaints processes to the Information Regulator clarified (acknowledgement / reference within prescribed periods).
• Administrative fines may be payable in instalments based on financial circumstances (new Regulation themes).

Steps if your data was misused
1. Write to the information officer (use LulaGazette POPIA template).
2. Keep proof of sending.
3. Escalate to the Information Regulator if ignored: https://inforegulator.org.za

NOTE: Summary based on publicly reported 2025 amendments for educational use. Verify Gazette text.`,
    tags: ["popia", "regulations", "2025", "direct marketing", "information regulator"],
    status: "In force",
    source: "Information Regulator / Government Gazette",
  },
  {
    id: "sars-crypto-note",
    title: "SARS treatment of crypto assets (CGT overview)",
    citation: "SARS crypto assets guidance (educational note)",
    category: "regulations",
    year: 2025,
    jurisdiction: "National",
    summary:
      "Educational note: South African Revenue Service generally treats crypto assets as assets that can trigger capital gains tax on disposal — keep full trade records.",
    body: `SARS & CRYPTO ASSETS — EDUCATIONAL NOTE

Core idea
Crypto assets (including cryptocurrencies) are typically not treated as South African legal tender, but disposals can be taxable events. Depending on facts, gains may fall under capital gains tax rules (or revenue treatment if you trade as a business).

Practical checklist for individuals
• Keep records of acquisition date, cost, disposal date and proceeds for every trade or spend.
• “Disposal” can include selling for Rand, swapping one token for another, or using crypto to pay for goods.
• Declare correctly on your return; penalties apply for non-disclosure.

When to get advice
High-volume traders, offshore platforms, and estate planning with crypto need professional tax advice.

NOTE: Not SARS official text. Confirm on www.sars.gov.za before filing.`,
    tags: ["sars", "crypto", "cgt", "tax", "virtual assets"],
    status: "In force",
    source: "SARS public guidance themes (educational)",
  },
  {
    id: "rental-housing-50-1999",
    title: "Rental Housing Act 50 of 1999",
    citation: "Act 50 of 1999",
    category: "acts",
    year: 1999,
    jurisdiction: "National",
    summary:
      "Regulates relationships between tenants and landlords, unfair practices, and Rental Housing Tribunals — often the first stop before PIE eviction litigation in residential leases.",
    body: `RENTAL HOUSING ACT 50 OF 1999 — OVERVIEW

Themes
• Rights and duties of tenants and landlords
• Unfair practices
• Rental Housing Tribunals in provinces
• Interaction with lease law and PIE when occupation becomes contested

For tenants
Deposit refunds, locked-out scenarios, and habitability complaints often start with written demand + Tribunal pathways.

For landlords
Follow lawful cancellation and PIE where required — self-help lockouts create legal risk.

NOTE: Educational summary.`,
    tags: ["rental", "tenant", "landlord", "tribunal", "housing"],
    status: "Amended",
    source: "Department of Human Settlements",
  },
  {
    id: "esta-62-1997",
    title: "Extension of Security of Tenure Act 62 of 1997",
    citation: "Act 62 of 1997 (ESTA)",
    category: "acts",
    year: 1997,
    jurisdiction: "National",
    summary:
      "Protects occupiers of farmland and rural land from unfair eviction — distinct from PIE urban occupation disputes.",
    body: `ESTA 62 OF 1997 — OVERVIEW

If you live on a farm with consent, ESTA may regulate when and how you can be evicted. Courts must consider just and equitable factors. Different from PIE (often urban unlawful occupation).

NOTE: Educational summary. Get advice for farm evictions urgently.`,
    tags: ["esta", "farm", "rural", "eviction", "occupier"],
    status: "Amended",
    source: "Department of Agriculture / land reform frameworks",
  },
  {
    id: "legal-practice-28-2014",
    title: "Legal Practice Act 28 of 2014",
    citation: "Act 28 of 2014",
    category: "acts",
    year: 2014,
    jurisdiction: "National",
    summary:
      "Regulates the legal profession, Legal Practice Council, admissions and professional conduct — essential context for lawyer-mode users of LulaGazette.",
    body: `LEGAL PRACTICE ACT 28 OF 2014 — OVERVIEW

Establishes the Legal Practice Council and frameworks for attorneys and advocates, including discipline and community service themes. Non-lawyers should still use admitted practitioners for court representation.

NOTE: Educational summary for practitioner context.`,
    tags: ["legal practice", "lpc", "attorneys", "advocates"],
    status: "Amended",
    source: "Legal Practice Council",
  },
  {
    id: "superior-courts-10-2013",
    title: "Superior Courts Act 10 of 2013",
    citation: "Act 10 of 2013",
    category: "acts",
    year: 2013,
    jurisdiction: "National",
    summary:
      "Structure and functioning of the Constitutional Court, SCA and High Court — jurisdiction and administration themes for superior court practice.",
    body: `SUPERIOR COURTS ACT 10 OF 2013 — OVERVIEW

Supports constitutional court structure: Constitutional Court, Supreme Court of Appeal, High Court divisions. Read with Uniform Rules and local practice directives (e.g. Court Online).

NOTE: Educational summary.`,
    tags: ["superior courts", "high court", "sca", "jurisdiction"],
    status: "In force",
    source: "Department of Justice",
  },
  {
    id: "pe-municipality-2004",
    title: "Port Elizabeth Municipality v Various Occupiers",
    citation: "2005 (1) SA 217 (CC)",
    category: "cases",
    year: 2004,
    jurisdiction: "Constitutional Court",
    summary:
      "Foundational PIE judgment: courts must infuse grace and compassion, balance owner and occupier interests, and ensure humane, just and equitable eviction processes.",
    body: `PORT ELIZABETH MUNICIPALITY v VARIOUS OCCUPIERS 2005 (1) SA 217 (CC)

Holding themes
PIE requires a humanised enquiry. Eviction is not a purely technical ownership claim; circumstances of occupiers, engagement, and alternative accommodation loom large.

Significance
Cited in almost every serious PIE matter.

NOTE: Educational case summary.`,
    tags: ["pie", "eviction", "constitutional court", "housing"],
    status: "Reported",
    source: "Constitutional Court of South Africa",
  },
  {
    id: "olivia-road-2008",
    title: "Occupiers of 51 Olivia Road v City of Johannesburg",
    citation: "2008 (3) SA 208 (CC)",
    category: "cases",
    year: 2008,
    jurisdiction: "Constitutional Court",
    summary:
      "Meaningful engagement required before eviction of vulnerable inner-city occupiers; cities cannot rely on blunt health-and-safety processes alone.",
    body: `OCCUPIERS OF 51 OLIVIA ROAD v CITY OF JOHANNESBURG 2008 (3) SA 208 (CC)

Meaningful engagement between municipality and occupiers is constitutionally required in eviction contexts affecting the vulnerable.

NOTE: Educational case summary.`,
    tags: ["engagement", "eviction", "johannesburg", "housing"],
    status: "Reported",
    source: "Constitutional Court of South Africa",
  }
];

export function getCategory(id: string) {
  return categories.find((c) => c.id === id);
}

export function getDocument(id: string) {
  return documents.find((d) => d.id === id);
}

export function getDocumentsByCategory(category: CategoryId) {
  return documents
    .filter((d) => d.category === category)
    .sort((a, b) => b.year - a.year);
}

export function searchDocuments(query: string, category?: CategoryId | "all") {
  const q = query.trim().toLowerCase();
  const list =
    category && category !== "all"
      ? documents.filter((d) => d.category === category)
      : [...documents];

  if (!q) {
    return list.sort((a, b) => b.year - a.year);
  }

  const terms = q.split(/\s+/).filter(Boolean);

  const scored = list
    .map((doc) => {
      const hay = [
        doc.title,
        doc.citation,
        doc.summary,
        doc.jurisdiction,
        doc.source,
        ...doc.tags,
        doc.body.slice(0, 1500),
      ]
        .join(" ")
        .toLowerCase();

      let score = 0;
      for (const t of terms) {
        if (doc.title.toLowerCase().includes(t)) score += 8;
        if (doc.citation.toLowerCase().includes(t)) score += 6;
        if (doc.tags.some((tag) => tag.includes(t))) score += 5;
        if (doc.summary.toLowerCase().includes(t)) score += 3;
        if (hay.includes(t)) score += 1;
      }
      return { doc, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || b.doc.year - a.doc.year);

  return scored.map((s) => s.doc);
}
