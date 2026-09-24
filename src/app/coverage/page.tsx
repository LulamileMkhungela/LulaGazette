import Link from "next/link";
import { categoryCoverage, coverageGaps, coverageReviewedAt, coverageSummary, sourceCoverage } from "@/data/coverage";

export const metadata = {
  title: "Data coverage and freshness",
  description: "What LulaGazette contains, what it does not contain, and how its sources are used.",
};

export default function CoveragePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-lg-blue">Data transparency</p>
        <h1 className="mt-3 font-display text-4xl text-lg-navy">Coverage, sources & freshness</h1>
        <p className="mt-4 text-lg-muted">
          This page is the product&apos;s coverage contract. A source listed below is not automatically copied or kept
          current. Check the source and its licence before relying on any material.
        </p>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-4">
        <Stat label="Local documents" value={coverageSummary.documentCount} />
        <Stat label="Library categories" value={coverageSummary.categoryCount} />
        <Stat label="Referenced sources" value={coverageSummary.sourceCount} />
        <Stat label="Live connectors" value={coverageSummary.liveConnectors} />
      </div>

      <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-950">
        <strong>Important:</strong> LulaGazette currently has no live scraper, scheduled source sync, or external legal
        database API. The library is a curated educational corpus. Last transparency review: {coverageReviewedAt}.
      </div>

      <section className="mt-10">
        <h2 className="font-display text-2xl text-lg-navy">Local corpus by category</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {categoryCoverage.map((category) => (
            <div key={category.id} className="rounded-2xl border border-lg-line bg-white p-5">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-semibold text-lg-navy">{category.label}</h3>
                <span className="rounded-full bg-lg-wash px-3 py-1 text-sm font-semibold text-lg-blue">{category.count}</span>
              </div>
              <p className="mt-2 text-sm leading-5 text-lg-muted">{category.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl text-lg-navy">Referenced sources</h2>
        <p className="mt-2 text-sm text-lg-muted">
          These entries describe where users should verify material. They do not mean LulaGazette has a feed, licence,
          or complete mirror of the source.
        </p>
        <div className="mt-4 overflow-hidden rounded-2xl border border-lg-line bg-white">
          <div className="hidden grid-cols-[1.4fr_1fr_1.5fr] gap-4 border-b border-lg-line bg-lg-wash px-5 py-3 text-xs font-bold uppercase tracking-wide text-lg-muted sm:grid">
            <span>Source</span><span>Access mode</span><span>Product role</span>
          </div>
          {sourceCoverage.map((source) => (
            <div key={source.id} className="grid gap-2 border-b border-lg-line px-5 py-4 last:border-0 sm:grid-cols-[1.4fr_1fr_1.5fr] sm:gap-4">
              <div>
                <p className="font-semibold text-lg-navy">{source.name}</p>
                <p className="mt-1 text-xs uppercase text-lg-soft">{source.kind}</p>
              </div>
              <p className="text-sm text-lg-slate">{source.mode}</p>
              <p className="text-sm leading-5 text-lg-muted">{source.howHelps}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-lg-line bg-white p-6">
        <h2 className="font-display text-2xl text-lg-navy">Known gaps and safe use</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-lg-slate">
          {coverageGaps.map((gap) => <li key={gap}>{gap}</li>)}
        </ul>
        <p className="mt-5 text-sm leading-6 text-lg-muted">
          For a live matter, open the official source, confirm the current version and commencement status, and obtain
          professional advice where appropriate. See the <Link href="/legal/status" className="font-semibold text-lg-blue hover:underline">platform status</Link> page for the wider compliance position.
        </p>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-lg-line bg-white p-5">
      <p className="text-3xl font-semibold text-lg-navy">{value}</p>
      <p className="mt-1 text-sm text-lg-muted">{label}</p>
    </div>
  );
}
