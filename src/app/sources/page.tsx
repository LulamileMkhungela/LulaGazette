"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { externalSources } from "@/data/sources";
import { africanCountries } from "@/data/africanCountries";
import { pullAllSources, scrapeSource, ScrapedDocument } from "@/lib/scraper";
import { useAuth } from "@/context/AuthContext";

export default function SourcesPage() {
  const { user, selectedCountry, setSelectedCountry, toggleSaveDoc, isDocSaved, addScrapedDocs } = useAuth();
  const [selectedSource, setSelectedSource] = useState<string>("all");
  const [countryFilter, setCountryFilter] = useState<string>(selectedCountry || "all");
  const [query, setQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [harvested, setHarvested] = useState<ScrapedDocument[]>([]);
  const [hasRun, setHasRun] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Update country when context changes
  useEffect(() => {
    if (selectedCountry && selectedCountry !== "all") {
      setCountryFilter(selectedCountry);
    }
  }, [selectedCountry]);

  // Initial load: pull initial data
  useEffect(() => {
    triggerPull(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryFilter]);

  // Available sources filtered by active country
  const availableSources = externalSources.filter((s) => {
    if (countryFilter && countryFilter !== "all") {
      const target = countryFilter.toUpperCase();
      return s.countryCode === target || s.countryCode === "AU";
    }
    return true;
  });

  async function triggerPull(showProgress = true) {
    if (showProgress) {
      setIsLoading(true);
      setProgress(25);
    }

    try {
      if (showProgress) setProgress(55);

      let docs: ScrapedDocument[] = [];

      if (selectedSource === "all") {
        const res = await pullAllSources({
          country: countryFilter === "all" ? undefined : countryFilter,
          query: query || undefined,
        });
        docs = res.documents;
      } else {
        const res = await scrapeSource(selectedSource, {
          country: countryFilter === "all" ? undefined : countryFilter,
          query: query || undefined,
        });
        docs = res.documents;
      }

      if (showProgress) {
        setProgress(90);
      }

      setHarvested(docs);
      addScrapedDocs(docs);
      setHasRun(true);

      if (showProgress) {
        setProgress(100);
        setTimeout(() => setIsLoading(false), 300);
      }
    } catch {
      if (showProgress) {
        setIsLoading(false);
      }
    }
  }

  function copyCitation(doc: ScrapedDocument) {
    navigator.clipboard.writeText(`${doc.title} (${doc.citation})`);
    setCopiedId(doc.id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Hero Header */}
      <div className="border-b border-[#E5EEF5] pb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Live Multi-Source Harvester Active
            </div>
            <h1 className="mt-3 font-display text-3xl font-semibold text-[#0B151F] sm:text-4xl">
              Pan-African Legal Harvester &amp; Scraper Hub
            </h1>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#677480] sm:text-base">
              Automated data extraction and live connectors pulling legal gazettes, constitutional judgments, statutory
              instruments, and acts across all 54 African countries and regional judicial tribunals.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/coverage"
              className="rounded-xl border border-[#E5EEF5] bg-white px-4 py-2.5 text-xs font-semibold text-[#112130] hover:bg-[#F5F8FB]"
            >
              Data Coverage Details
            </Link>
            <Link
              href="/countries"
              className="rounded-xl bg-[#0C68BE] px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#0F80EB]"
            >
              Browse 54 Countries
            </Link>
          </div>
        </div>

        {/* Top metrics bar */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-2xl border border-[#E5EEF5] bg-white p-4 shadow-sm">
            <p className="text-xs font-medium text-[#86929E]">Active Connectors</p>
            <p className="mt-1 text-2xl font-bold text-[#0B151F]">{externalSources.length}</p>
            <p className="mt-0.5 text-[11px] text-emerald-600">● 100% Operational</p>
          </div>
          <div className="rounded-2xl border border-[#E5EEF5] bg-white p-4 shadow-sm">
            <p className="text-xs font-medium text-[#86929E]">African Jurisdictions</p>
            <p className="mt-1 text-2xl font-bold text-[#0B151F]">54 Countries + AU</p>
            <p className="mt-0.5 text-[11px] text-[#0C68BE]">Pan-African scope</p>
          </div>
          <div className="rounded-2xl border border-[#E5EEF5] bg-white p-4 shadow-sm">
            <p className="text-xs font-medium text-[#86929E]">Harvested Gazettes &amp; Docs</p>
            <p className="mt-1 text-2xl font-bold text-[#0B151F]">{harvested.length}</p>
            <p className="mt-0.5 text-[11px] text-[#677480]">In active session</p>
          </div>
          <div className="rounded-2xl border border-[#E5EEF5] bg-white p-4 shadow-sm">
            <p className="text-xs font-medium text-[#86929E]">Connected User</p>
            <p className="mt-1 truncate text-base font-semibold text-[#0B151F]">
              {user ? `${user.flag} ${user.name}` : "Guest Researcher"}
            </p>
            <p className="mt-0.5 text-[11px] text-[#677480]">{user ? user.roleTitle : "Session workspace"}</p>
          </div>
        </div>
      </div>

      {/* Control Console */}
      <div className="mt-8 rounded-2xl border border-[#E5EEF5] bg-[#F5F8FB] p-5 sm:p-6">
        <h2 className="text-base font-semibold text-[#0B151F]">Scraper &amp; Pull Controller</h2>
        <p className="mt-1 text-xs text-[#677480]">
          Select target source and African jurisdiction to scrape and ingest official gazette records.
        </p>

        <div className="mt-4 grid gap-4 sm:grid-cols-12">
          {/* Source selection */}
          <div className="sm:col-span-4">
            <label className="block text-xs font-medium text-[#112130]">Target Source</label>
            <select
              value={selectedSource}
              onChange={(e) => setSelectedSource(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-[#E5EEF5] bg-white px-3 py-2.5 text-xs text-[#112130] outline-none focus:border-[#0C68BE] focus:ring-2 focus:ring-[#0C68BE]/20"
            >
              <option value="all">
                🌐 All Sources for {countryFilter === "all" ? "Africa" : countryFilter.toUpperCase()} ({availableSources.length})
              </option>
              {availableSources.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.country || "Pan-African"})
                </option>
              ))}
            </select>
          </div>

          {/* Country selection */}
          <div className="sm:col-span-3">
            <label className="block text-xs font-medium text-[#112130]">African Jurisdiction</label>
            <select
              value={countryFilter}
              onChange={(e) => {
                setCountryFilter(e.target.value);
                setSelectedCountry(e.target.value);
              }}
              className="mt-1.5 w-full rounded-xl border border-[#E5EEF5] bg-white px-3 py-2.5 text-xs text-[#112130] outline-none focus:border-[#0C68BE] focus:ring-2 focus:ring-[#0C68BE]/20"
            >
              <option value="all">🌍 All 54 African Countries</option>
              <option value="AU">🏛️ Pan-African / AU Bodies</option>
              {africanCountries.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Search query keyword */}
          <div className="sm:col-span-3">
            <label className="block text-xs font-medium text-[#112130]">Keyword / Gazette Subject</label>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. data protection, employment, vat"
              className="mt-1.5 w-full rounded-xl border border-[#E5EEF5] bg-white px-3 py-2 text-xs text-[#112130] outline-none placeholder:text-[#86929E] focus:border-[#0C68BE] focus:ring-2 focus:ring-[#0C68BE]/20"
            />
          </div>

          {/* Trigger button */}
          <div className="flex items-end sm:col-span-2">
            <button
              type="button"
              onClick={() => triggerPull(true)}
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0C68BE] py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#0F80EB] disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Scraping...</span>
                </>
              ) : (
                <>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                    <path d="M3 3v5h5" />
                    <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                    <path d="M16 21h5v-5" />
                  </svg>
                  <span>Pull Data</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Quick presets */}
        <div className="mt-4 flex flex-wrap items-center gap-2 pt-2 border-t border-[#E5EEF5]">
          <span className="text-[11px] font-semibold text-[#86929E]">Quick presets:</span>
          <button
            onClick={() => {
              setCountryFilter("ZA");
              setSelectedCountry("ZA");
              setSelectedSource("saflii");
              setQuery("");
            }}
            className="rounded-full bg-white px-2.5 py-1 text-[11px] font-medium text-[#112130] shadow-xs border border-[#E5EEF5] hover:border-[#0C68BE]"
          >
            🇿🇦 South Africa (SAFLII / Gov.za)
          </button>
          <button
            onClick={() => {
              setCountryFilter("KE");
              setSelectedCountry("KE");
              setSelectedSource("kenya-law");
              setQuery("");
            }}
            className="rounded-full bg-white px-2.5 py-1 text-[11px] font-medium text-[#112130] shadow-xs border border-[#E5EEF5] hover:border-[#0C68BE]"
          >
            🇰🇪 Kenya Law &amp; Gazette
          </button>
          <button
            onClick={() => {
              setCountryFilter("NG");
              setSelectedCountry("NG");
              setSelectedSource("lawnigeria");
              setQuery("");
            }}
            className="rounded-full bg-white px-2.5 py-1 text-[11px] font-medium text-[#112130] shadow-xs border border-[#E5EEF5] hover:border-[#0C68BE]"
          >
            🇳🇬 Nigeria CAMA &amp; NDPA
          </button>
          <button
            onClick={() => {
              setCountryFilter("GH");
              setSelectedCountry("GH");
              setSelectedSource("ghanalii");
              setQuery("");
            }}
            className="rounded-full bg-white px-2.5 py-1 text-[11px] font-medium text-[#112130] shadow-xs border border-[#E5EEF5] hover:border-[#0C68BE]"
          >
            🇬🇭 Ghana Labour &amp; Acts
          </button>
          <button
            onClick={() => {
              setCountryFilter("EG");
              setSelectedCountry("EG");
              setSelectedSource("all");
              setQuery("");
            }}
            className="rounded-full bg-white px-2.5 py-1 text-[11px] font-medium text-[#112130] shadow-xs border border-[#E5EEF5] hover:border-[#0C68BE]"
          >
            🇪🇬 Egypt Official Gazette
          </button>
          <button
            onClick={() => {
              setCountryFilter("BW");
              setSelectedCountry("BW");
              setSelectedSource("all");
              setQuery("");
            }}
            className="rounded-full bg-white px-2.5 py-1 text-[11px] font-medium text-[#112130] shadow-xs border border-[#E5EEF5] hover:border-[#0C68BE]"
          >
            🇧🇼 Botswana Gazette &amp; Apex
          </button>
          <button
            onClick={() => {
              setCountryFilter("AU");
              setSelectedCountry("AU");
              setSelectedSource("all");
              setQuery("afcfta");
            }}
            className="rounded-full bg-white px-2.5 py-1 text-[11px] font-medium text-[#112130] shadow-xs border border-[#E5EEF5] hover:border-[#0C68BE]"
          >
            🏛️ AU &amp; AfCFTA Treaties
          </button>
          <button
            onClick={() => {
              setCountryFilter("all");
              setSelectedCountry("all");
              setSelectedSource("all");
              setQuery("");
            }}
            className="rounded-full bg-white px-2.5 py-1 text-[11px] font-medium text-[#0C68BE] shadow-xs border border-[#E5EEF5] hover:underline"
          >
            🌍 Reset (All Africa)
          </button>
        </div>
      </div>

      {/* Subtle Progress Bar */}
      {isLoading && (
        <div className="mt-4 overflow-hidden rounded-2xl border border-sky-200 bg-sky-50/50 p-4">
          <div className="flex items-center justify-between text-xs font-semibold text-sky-900">
            <span>Harvesting data from African legal sources...</span>
            <span>{progress}%</span>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-sky-200">
            <div
              className="h-full bg-[#0C68BE] transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Harvested Documents Feed */}
      <section className="mt-10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-2xl font-semibold text-[#0B151F]">
              Harvested Legal Gazettes &amp; Records ({harvested.length})
            </h2>
            <p className="mt-1 text-xs text-[#677480]">
              Showing records pulled across active African legal databases and government printers.
            </p>
          </div>
          {harvested.length > 0 && (
            <button
              onClick={() => {
                const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(harvested, null, 2));
                const a = document.createElement("a");
                a.setAttribute("href", dataStr);
                a.setAttribute("download", `lulagazette-harvested-${Date.now()}.json`);
                a.click();
              }}
              className="rounded-lg border border-[#E5EEF5] bg-white px-3 py-1.5 text-xs font-semibold text-[#112130] hover:bg-[#F5F8FB]"
            >
              Export JSON
            </button>
          )}
        </div>

        {harvested.length === 0 && hasRun && (
          <div className="mt-6 rounded-2xl border border-[#E5EEF5] bg-white p-12 text-center">
            <p className="text-sm font-semibold text-[#0B151F]">No documents matched your specific filter.</p>
            <p className="mt-1 text-xs text-[#677480]">Try resetting filters or expanding keyword search.</p>
            <button
              onClick={() => {
                setCountryFilter("all");
                setSelectedCountry("all");
                setSelectedSource("all");
                setQuery("");
                triggerPull(true);
              }}
              className="mt-4 rounded-full bg-[#0C68BE] px-4 py-2 text-xs font-semibold text-white"
            >
              Reset All Filters
            </button>
          </div>
        )}

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {harvested.map((doc) => {
            const saved = isDocSaved(doc.id);
            return (
              <div
                key={doc.id}
                className="group flex flex-col justify-between rounded-2xl border border-[#E5EEF5] bg-white p-5 shadow-xs transition hover:border-[#0C68BE]/40 hover:shadow-md"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="rounded-md bg-[#0C68BE]/10 px-2.5 py-0.5 text-[11px] font-bold text-[#0C68BE]">
                        {doc.country}
                      </span>
                      <span className="text-xs font-semibold text-[#86929E]">{doc.year}</span>
                    </div>
                    <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-700">
                      {doc.status}
                    </span>
                  </div>

                  <h3 className="mt-3 font-semibold text-[#0B151F] group-hover:text-[#0C68BE] line-clamp-2">
                    {doc.title}
                  </h3>
                  <p className="mt-1 font-mono text-[11px] text-[#86929E]">{doc.citation}</p>
                  {doc.gazetteNumber && (
                    <p className="text-[11px] font-medium text-[#5E7B99]">Publication: {doc.gazetteNumber}</p>
                  )}

                  <p className="mt-3 text-xs leading-relaxed text-[#677480] line-clamp-3">{doc.summary}</p>
                </div>

                <div className="mt-5 border-t border-[#E5EEF5] pt-4">
                  <div className="flex items-center justify-between text-[11px] text-[#86929E]">
                    <span>Source: {doc.sourceName}</span>
                    <span className="text-[10px]">Verified: {doc.date}</span>
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/d/${doc.id}`}
                        className="rounded-lg bg-[#0C68BE] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#0F80EB]"
                      >
                        Read Document
                      </Link>
                      <button
                        onClick={() => copyCitation(doc)}
                        className="rounded-lg border border-[#E5EEF5] bg-white px-2.5 py-1.5 text-xs font-medium text-[#112130] hover:bg-[#F5F8FB]"
                      >
                        {copiedId === doc.id ? "✓ Copied" : "Copy citation"}
                      </button>
                    </div>

                    <button
                      onClick={() => toggleSaveDoc(doc.id)}
                      aria-label="Save to library"
                      className={`rounded-lg px-2.5 py-1.5 text-xs font-medium transition ${
                        saved ? "bg-amber-100 text-amber-900" : "text-[#677480] hover:bg-[#F5F8FB]"
                      }`}
                    >
                      {saved ? "★ Saved" : "☆ Save"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Sources Directory Grid */}
      <section className="mt-16 border-t border-[#E5EEF5] pt-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-semibold text-[#0B151F]">
              Connected Legal Sources {countryFilter === "all" ? `(All Africa: ${externalSources.length})` : `for ${countryFilter.toUpperCase()} (${availableSources.length})`}
            </h2>
            <p className="mt-1 text-xs text-[#677480]">
              Verified institutional sources, official gazette printers, and legal information institutes.
            </p>
          </div>
          {countryFilter !== "all" && (
            <button
              onClick={() => {
                setCountryFilter("all");
                setSelectedCountry("all");
                setSelectedSource("all");
              }}
              className="rounded-xl border border-[#E5EEF5] bg-white px-3 py-1.5 text-xs font-semibold text-[#0C68BE] hover:bg-[#F5F8FB]"
            >
              Show All African Sources ({externalSources.length})
            </button>
          )}
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {availableSources.map((s) => (
            <div key={s.id} className="rounded-2xl border border-[#E5EEF5] bg-white p-5 shadow-xs">
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-full bg-[#F5F8FB] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#0C68BE]">
                  {s.kind}
                </span>
                <span className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Live Sync
                </span>
              </div>

              <h3 className="mt-3 text-sm font-semibold text-[#0B151F]">{s.name}</h3>
              <p className="mt-1 text-xs font-medium text-[#86929E]">{s.country || "Pan-African"}</p>
              <p className="mt-2 text-xs leading-relaxed text-[#677480] line-clamp-2">{s.description}</p>

              <div className="mt-4 flex items-center justify-between border-t border-[#E5EEF5] pt-3 text-[11px]">
                <span className="text-[#86929E]">Available: ~{s.documentsAvailable?.toLocaleString() || "10,000+"}</span>
                {s.url && (
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-[#0C68BE] hover:underline"
                  >
                    Visit source ↗
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
