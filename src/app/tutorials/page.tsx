import Link from "next/link";

export const metadata = { title: "Tutorials" };

const tutorials = [
  {
    title: "Research an unfair dismissal",
    steps: [
      "Search “unfair dismissal” or open the Labour Relations Act 66 of 1995.",
      "Read ss 187–189 summary themes and Sidumo review standard.",
      "Open CCMA Form 7.11 guidance for referral timelines (30 days).",
    ],
  },
  {
    title: "Housing / eviction problem",
    steps: [
      "Start with Constitution s 26 and the PIE Act 19 of 1998.",
      "Read Grootboom and Blue Moonlight summaries for reasonableness and emergency housing.",
      "Check High Court notice of motion template if drafting an application.",
    ],
  },
  {
    title: "POPIA compliance quickstart",
    steps: [
      "Open POPIA and the 2018 Regulations notes.",
      "Map the eight lawful processing conditions to your operator stack.",
      "Review the Privacy Policy page as a drafting reference aligned to RSA law.",
    ],
  },
];

export default function TutorialsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-4xl text-lg-navy">Tutorials</h1>
      <p className="mt-2 text-lg-muted">Short research playbooks for common South African matters.</p>
      <div className="mt-8 space-y-5">
        {tutorials.map((t, i) => (
          <div key={t.title} className="rounded-3xl border border-lg-line bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-lg-blue">Tutorial {i + 1}</p>
            <h2 className="mt-1 text-xl font-semibold text-lg-navy">{t.title}</h2>
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-6 text-lg-muted">
              {t.steps.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
          </div>
        ))}
      </div>
      <Link href="/s" className="mt-8 inline-flex text-sm font-semibold text-lg-blue hover:underline">
        Go to search →
      </Link>
    </div>
  );
}
