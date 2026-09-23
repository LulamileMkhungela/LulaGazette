import Link from "next/link";
import { problemGuides } from "@/data/guides";

export const metadata = { title: "Problem guides" };

export default function GuidesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="max-w-2xl">
        <p className="text-xs font-bold uppercase tracking-wide text-lg-blue">For everyone</p>
        <h1 className="mt-1 font-display text-4xl text-lg-navy">What problem are you facing?</h1>
        <p className="mt-3 text-lg-muted">
          No legal training needed. Each guide shows what to do now, what not to do, which court or forum, which
          documents to gather, and when to call a lawyer — so you spend less on repeat consultations.
        </p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {problemGuides.map((g) => (
          <Link
            key={g.id}
            href={`/guides/${g.id}`}
            className="rounded-3xl border border-lg-line bg-white p-6 shadow-sm transition hover:border-lg-blue/40 hover:shadow-card"
          >
            <div className="flex flex-wrap gap-2">
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                  g.urgency === "high"
                    ? "bg-red-50 text-red-700"
                    : g.urgency === "medium"
                      ? "bg-amber-50 text-amber-800"
                      : "bg-slate-100 text-slate-600"
                }`}
              >
                {g.urgency} urgency
              </span>
              <span className="rounded-full bg-lg-wash px-2 py-0.5 text-[10px] font-semibold uppercase text-lg-muted">
                {g.audience}
              </span>
            </div>
            <h2 className="mt-3 text-xl font-semibold text-lg-navy">{g.title}</h2>
            <p className="mt-2 text-sm leading-6 text-lg-muted">{g.summary}</p>
            <p className="mt-4 text-sm font-semibold text-lg-blue">Open step-by-step guide →</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
