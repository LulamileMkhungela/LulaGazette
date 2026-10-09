import Link from "next/link";
import { categoryCoverage, coverageGaps, coverageHighlights, coverageReviewedAt, coverageSummary, sourceCoverage } from "@/data/coverage";

export const metadata = {
  title: "Data Coverage, Harvesters & Sources",
  description: "Live legal data scrapers, connected African jurisdictions, official gazette feeds, and provenance contracts.",
};

export default function CoveragePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-700">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          Active Scraper Architecture
        </div>
        <h1 className="mt-3 font-display text-4xl text-[#0B151F]">Pan-African Coverage &amp; Data Provenance</h1>
        <p className="mt-4 text-sm leading-relaxed text-[#5E7B99]">
          LulaGazette integrates automated legal scrapers, official gazette extractors, and open legal information
          institutes across all 54 African countries and regional bodies. Review source status, active connectors, and
          provenance standards below.
        </p>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-4">
        <Stat label="Total Local Documents" value={coverageSummary.documentCount} />
        <Stat label="African Nations Covered" value={coverageSummary.countryCount} />
        <Stat label="Connected Sources" value={coverageSummary.sourceCount} />
        <Stat label="Active Scrapers &amp; Connectors" value={coverageSummary.liveConnectors} isHighlight />
      </div>

      {/* Live Scraper Notice Banner */}
      <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-5 text-xs leading-6 text-emerald-950">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <strong className="text-emerald-900">Live Harvester Engine Enabled:</strong> Data pullers connect to
            AfricanLII, SAFLII, Kenya Law, LawNigeria, GhanaLII, and official gazette publishers. You can run automated
            gazette harvests on demand in the{" "}
            <Link href="/sources" className="font-bold underline hover:text-emerald-800">
              Scraper Hub
            </Link>{" "}
            or via API (<code>/api/scrape</code>). Last review: {coverageReviewedAt}.
          </div>
          <Link
            href="/sources"
            className="rounded-xl bg-emerald-700 px-3 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-emerald-800"
          >
            Launch Scraper Hub →
          </Link>
        </div>
      </div>

      {/* Architecture Highlights */}
      <section className="mt-10">
        <h2 className="font-display text-2xl text-[#0B151F]">Harvesting Architecture Highlights</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {coverageHighlights.map((item, i) => (
            <div key={i} className="flex gap-3 rounded-2xl border border-[#E5EEF5] bg-white p-4">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0C68BE]/10 text-xs font-bold text-[#0C68BE]">
                ✓
              </span>
              <p className="text-xs leading-relaxed text-[#1D2E40]">{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Corpus by category */}
      <section className="mt-10">
        <h2 className="font-display text-2xl text-[#0B151F]">Corpus by Category</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {categoryCoverage.map((category) => (
            <div key={category.id} className="rounded-2xl border border-[#E5EEF5] bg-white p-5">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-semibold text-[#0B151F]">{category.label}</h3>
                <span className="rounded-full bg-[#F5F8FB] px-3 py-1 text-xs font-bold text-[#0C68BE]">
                  {category.count} docs
                </span>
              </div>
              <p className="mt-2 text-xs leading-5 text-[#5E7B99]">{category.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sources Table */}
      <section className="mt-10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-2xl text-[#0B151F]">Connected Data Sources &amp; Gazette Printers</h2>
            <p className="mt-1 text-xs text-[#5E7B99]">
              Live connectors extract legislative notices, law reports, and gazetted statutory instruments.
            </p>
          </div>
          <Link href="/sources" className="text-xs font-semibold text-[#0C68BE] hover:underline">
            Open Interactive Scraper Hub →
          </Link>
        </div>

        <div className="mt-4 overflow-hidden rounded-2xl border border-[#E5EEF5] bg-white">
          <div className="hidden grid-cols-[1.5fr_1fr_1.5fr] gap-4 border-b border-[#E5EEF5] bg-[#F5F8FB] px-5 py-3 text-xs font-bold uppercase tracking-wide text-[#5E7B99] sm:grid">
            <span>Source &amp; Jurisdiction</span>
            <span>Connector Mode</span>
            <span>Harvest Role</span>
          </div>
          {sourceCoverage.map((source) => (
            <div
              key={source.id}
              className="grid gap-2 border-b border-[#E5EEF5] px-5 py-4 last:border-0 sm:grid-cols-[1.5fr_1fr_1.5fr] sm:gap-4"
            >
              <div>
                <p className="font-semibold text-[#0B151F]">{source.name}</p>
                <p className="mt-0.5 text-xs text-[#677480]">{source.country || "Pan-African"}</p>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span className="text-xs font-medium text-emerald-800">{source.mode}</span>
              </div>
              <p className="text-xs leading-5 text-[#5E7B99]">{source.howHelps}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Verification Guidelines */}
      <section className="mt-10 rounded-2xl border border-[#E5EEF5] bg-white p-6">
        <h2 className="font-display text-2xl text-[#0B151F]">Verification &amp; Safe Use Guidelines</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-xs leading-6 text-[#1D2E40]">
          {coverageGaps.map((gap) => (
            <li key={gap}>{gap}</li>
          ))}
        </ul>
        <p className="mt-5 text-xs leading-6 text-[#5E7B99]">
          For live litigation or formal court filings, practitioners should inspect official primary gazettes and verify
          commencement status. Consult our{" "}
          <Link href="/legal/status" className="font-semibold text-[#0C68BE] hover:underline">
            platform status
          </Link>{" "}
          and terms for additional licensing terms.
        </p>
      </section>
    </div>
  );
}

function Stat({ label, value, isHighlight = false }: { label: string; value: number; isHighlight?: boolean }) {
  return (
    <div className={`rounded-2xl border p-5 ${isHighlight ? "border-emerald-200 bg-emerald-50/50" : "border-[#E5EEF5] bg-white"}`}>
      <p className={`text-3xl font-bold ${isHighlight ? "text-emerald-700" : "text-[#0B151F]"}`}>{value}</p>
      <p className="mt-1 text-xs text-[#5E7B99]">{label}</p>
    </div>
  );
}
