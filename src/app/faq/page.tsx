import Link from "next/link";

export const metadata = { title: "FAQs" };

const faqs = [
  {
    q: "What is AI Overview?",
    a: "When you search or ask a question, LulaGazette builds a plain-English overview with a first-pass legal position, action steps, and citations into Acts, cases, guides, courts and templates — similar in spirit to LulaGazette’s intelligent search experience, grounded in our South African library.",
  },
  {
    q: "I am not a lawyer. Can I still use this?",
    a: "Yes. Start at “I need help” problem guides (fired, eviction, debt, arrest, consumer, POPIA, etc.). Each guide shows do/don’t lists, documents to gather, forums, templates, and when to call a lawyer — so you prepare once instead of paying for many basic consultations.",
  },
  {
    q: "Does it replace my attorney?",
    a: "No. It reduces wasted consultations by organising research and first drafts. High-stakes matters (home, children, criminal charges, large money) still need an admitted SA attorney or advocate.",
  },
  {
    q: "Can it pull live data from Lexpro or Case Online?",
    a: "Not automatically — those systems are licensed. Under For lawyers → Import matter notes, paste citations/headnotes you are allowed to use. We also link official sources (SAFLII, courts, CCMA, Information Regulator).",
  },
  {
    q: "What drafting templates exist?",
    a: "Letters of demand, Small Claims and Magistrates’ summons sketches, High Court notice of motion and founding affidavit, CCMA 7.11 helper, condonation, settlements, employment and service contracts, NDAs, POPIA/PAIA requests, bail affidavit themes, and more.",
  },
  {
    q: "Which courts are covered?",
    a: "Small Claims, Magistrates’ Court, High Court, CCMA, Labour Court, SCA and Constitutional Court — with filing checklists, service notes and tips for citizens and practitioners.",
  },
  {
    q: "How do I contact LulaGazette?",
    a: "Open Contact Us in the app — address, email and phone are listed only on that page.",
  },
  {
    q: "Is this legal advice?",
    a: "No. Educational research and drafting assistance only. Verify Gazette texts and authorised reports before filing.",
  },
];

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-4xl text-lg-navy">Frequently asked questions</h1>
      <p className="mt-2 text-lg-muted">
        Quick answers about LulaGazette.{" "}
        <Link href="/contact" className="font-medium text-lg-blue hover:underline">
          Contact support
        </Link>
      </p>
      <div className="mt-8 space-y-4">
        {faqs.map((f) => (
          <details key={f.q} className="group rounded-2xl border border-lg-line bg-white p-5 open:shadow-sm">
            <summary className="cursor-pointer list-none font-semibold text-lg-navy marker:content-none">
              <span className="flex items-center justify-between gap-3">
                {f.q}
                <span className="text-lg-blue transition group-open:rotate-45">+</span>
              </span>
            </summary>
            <p className="mt-3 text-sm leading-6 text-lg-muted">{f.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
