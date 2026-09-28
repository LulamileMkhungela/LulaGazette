"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getCountryByCode } from "@/data/africanCountries";
import { documents, LegalDocument } from "@/data/legal";

export default function DashboardPage() {
  const { user, selectedCountry, setSelectedCountry, savedDocIds, toggleSaveDoc, isDocSaved } = useAuth();
  const [lastViewed, setLastViewed] = useState<LegalDocument | null>(null);
  const [recentSearches, setRecentSearches] = useState<string[]>([
    "unfair dismissal CCMA",
    "POPIA data breach compliance",
    "High Court notice of motion",
    "Companies Act director duties",
  ]);

  const activeCountryObj = getCountryByCode(selectedCountry);

  // Load last viewed document
  useEffect(() => {
    try {
      const storedLast = localStorage.getItem("lulagazette-last-viewed-id");
      if (storedLast) {
        const found = documents.find((d) => d.id === storedLast);
        if (found) setLastViewed(found);
      }
      if (!lastViewed) {
        // default to first document matching jurisdiction
        const match = documents.find(
          (d) =>
            selectedCountry === "all" ||
            d.countryCode?.toUpperCase() === selectedCountry.toUpperCase()
        );
        if (match) setLastViewed(match);
      }
    } catch {
      /* ignore */
    }
  }, [selectedCountry, lastViewed]);

  const savedDocuments = documents.filter((d) => savedDocIds.includes(d.id));

  // Quick jurisdiction documents
  const jurisdictionDocs = documents
    .filter(
      (d) =>
        selectedCountry === "all" ||
        d.countryCode?.toUpperCase() === selectedCountry.toUpperCase()
    )
    .slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Top Banner / Welcome */}
      <div className="rounded-3xl border border-[#E5EEF5] bg-gradient-to-r from-sky-50 via-white to-sky-50/40 p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#0C68BE] border border-[#E5EEF5]">
              <span>{selectedCountry === "all" ? "🌍" : activeCountryObj?.flag || "🇿🇦"}</span>
              <span>Jurisdiction: {selectedCountry === "all" ? "All Africa" : activeCountryObj?.name}</span>
            </div>
            <h1 className="mt-3 font-display text-2xl font-semibold text-[#0B151F] sm:text-3xl">
              Welcome back, {user ? user.name.split(" ")[0] : "Practitioner"}
            </h1>
            <p className="mt-1 text-xs text-[#677480]">
              Everything you touched last, one glance away. Saved matters, recent research, and active court rules.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href={`/s?country=${selectedCountry}`}
              className="rounded-xl bg-[#0C68BE] px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#0F80EB]"
            >
              Browse {selectedCountry === "all" ? "Africa" : activeCountryObj?.name} Laws
            </Link>
            <Link
              href="/library"
              className="rounded-xl border border-[#E5EEF5] bg-white px-4 py-2.5 text-xs font-semibold text-[#112130] hover:bg-[#F5F8FB]"
            >
              My Library
            </Link>
          </div>
        </div>

        {/* 4 Quick Counters */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 border-t border-[#E5EEF5] pt-5">
          <div className="rounded-2xl border border-[#E5EEF5] bg-white p-3.5 shadow-xs">
            <p className="text-[11px] font-medium text-[#86929E]">Saved Matters &amp; Gazettes</p>
            <p className="mt-1 text-xl font-bold text-[#0B151F]">{savedDocIds.length}</p>
            <p className="mt-0.5 text-[10px] text-[#0C68BE]">Quick bookmarks</p>
          </div>
          <div className="rounded-2xl border border-[#E5EEF5] bg-white p-3.5 shadow-xs">
            <p className="text-[11px] font-medium text-[#86929E]">Active Jurisdiction</p>
            <p className="mt-1 truncate text-base font-bold text-[#0B151F]">
              {selectedCountry === "all" ? "🌍 54 Nations" : `${activeCountryObj?.flag} ${activeCountryObj?.name}`}
            </p>
            <p className="mt-0.5 text-[10px] text-emerald-600">● Live Connected</p>
          </div>
          <div className="rounded-2xl border border-[#E5EEF5] bg-white p-3.5 shadow-xs">
            <p className="text-[11px] font-medium text-[#86929E]">Available Authorities</p>
            <p className="mt-1 text-xl font-bold text-[#0B151F]">{jurisdictionDocs.length * 10}+</p>
            <p className="mt-0.5 text-[10px] text-[#86929E]">In current scope</p>
          </div>
          <div className="rounded-2xl border border-[#E5EEF5] bg-white p-3.5 shadow-xs">
            <p className="text-[11px] font-medium text-[#86929E]">Subscription Tier</p>
            <p className="mt-1 text-base font-bold text-emerald-700">Free Researcher</p>
            <Link href="/go-pro" className="mt-0.5 block text-[10px] text-[#0C68BE] hover:underline">
              Upgrade to Go Pro →
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        {/* Left Column (8 cols): Last Viewed + Saved Documents */}
        <div className="space-y-6 lg:col-span-8">
          {/* One-Click Return: Last Document Open */}
          {lastViewed && (
            <div className="rounded-3xl border border-[#0C68BE]/30 bg-white p-6 shadow-xs ring-1 ring-[#0C68BE]/10">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-[#0C68BE]/10 px-2.5 py-0.5 text-[10px] font-bold text-[#0C68BE] uppercase tracking-wider">
                  One-Click Return · Last Viewed
                </span>
                <span className="text-xs text-[#86929E]">{lastViewed.year}</span>
              </div>
              <h2 className="mt-3 text-lg font-semibold text-[#0B151F]">{lastViewed.title}</h2>
              <p className="mt-0.5 font-mono text-xs text-[#0C68BE]">{lastViewed.citation}</p>
              <p className="mt-2 text-xs leading-relaxed text-[#677480] line-clamp-2">{lastViewed.summary}</p>
              <div className="mt-4 flex items-center justify-between border-t border-[#E5EEF5] pt-3">
                <span className="text-[11px] text-[#86929E]">Source: {lastViewed.source}</span>
                <Link
                  href={`/d/${lastViewed.id}`}
                  className="rounded-xl bg-[#0C68BE] px-4 py-2 text-xs font-semibold text-white hover:bg-[#0F80EB]"
                >
                  Resume Reading →
                </Link>
              </div>
            </div>
          )}

          {/* Saved Documents */}
          <div className="rounded-3xl border border-[#E5EEF5] bg-white p-6 shadow-xs">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display text-lg font-semibold text-[#0B151F]">
                  Saved Documents &amp; Precedents ({savedDocuments.length})
                </h2>
                <p className="mt-0.5 text-xs text-[#677480]">
                  Authorities and gazettes pinned for your matters and briefs.
                </p>
              </div>
              <Link href={`/s?country=${selectedCountry}`} className="text-xs font-semibold text-[#0C68BE] hover:underline">
                Browse More →
              </Link>
            </div>

            {savedDocuments.length === 0 ? (
              <div className="mt-6 rounded-2xl border border-dashed border-[#E5EEF5] bg-[#FAFDFF] p-8 text-center">
                <span className="text-3xl">🔖</span>
                <p className="mt-2 text-xs font-semibold text-[#0B151F]">No saved documents yet</p>
                <p className="mt-1 text-xs text-[#677480]">
                  Click the bookmark or &ldquo;Save&rdquo; button while reading any Act or ruling to keep it here.
                </p>
                <Link
                  href={`/s?country=${selectedCountry}`}
                  className="mt-4 inline-block rounded-full bg-[#0C68BE] px-4 py-2 text-xs font-semibold text-white"
                >
                  Search {selectedCountry === "all" ? "Africa" : activeCountryObj?.name} Library
                </Link>
              </div>
            ) : (
              <div className="mt-4 space-y-3">
                {savedDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between rounded-2xl border border-[#E5EEF5] bg-white p-4 transition hover:border-[#0C68BE]"
                  >
                    <div className="min-w-0 flex-1 pr-3">
                      <div className="flex items-center gap-2">
                        <span className="rounded-md bg-[#0C68BE]/10 px-2 py-0.5 text-[10px] font-bold text-[#0C68BE]">
                          {doc.category}
                        </span>
                        <span className="text-[11px] text-[#86929E]">{doc.year}</span>
                      </div>
                      <Link
                        href={`/d/${doc.id}`}
                        className="mt-1 block truncate text-xs font-semibold text-[#0B151F] hover:text-[#0C68BE]"
                      >
                        {doc.title}
                      </Link>
                      <p className="text-[11px] text-[#677480] truncate">{doc.citation}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/d/${doc.id}`}
                        className="rounded-lg bg-[#0C68BE] px-3 py-1.5 text-xs font-semibold text-white"
                      >
                        Read
                      </Link>
                      <button
                        onClick={() => toggleSaveDoc(doc.id)}
                        className="rounded-lg border border-[#E5EEF5] px-2.5 py-1.5 text-xs text-rose-600 hover:bg-rose-50"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Featured in Active Jurisdiction */}
          <div className="rounded-3xl border border-[#E5EEF5] bg-white p-6 shadow-xs">
            <h2 className="font-display text-lg font-semibold text-[#0B151F]">
              Primary Authorities in {selectedCountry === "all" ? "Pan-African Scope" : activeCountryObj?.name}
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {jurisdictionDocs.map((doc) => (
                <Link
                  key={doc.id}
                  href={`/d/${doc.id}`}
                  className="group rounded-2xl border border-[#E5EEF5] bg-[#FAFDFF] p-4 transition hover:border-[#0C68BE]/40 hover:bg-white"
                >
                  <span className="rounded-md bg-[#0C68BE]/10 px-2 py-0.5 text-[10px] font-bold text-[#0C68BE]">
                    {doc.countryCode || "AF"}
                  </span>
                  <h3 className="mt-2 text-xs font-semibold text-[#0B151F] group-hover:text-[#0C68BE] line-clamp-1">
                    {doc.title}
                  </h3>
                  <p className="mt-1 font-mono text-[11px] text-[#86929E]">{doc.citation}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Recent Searches, Tools & Help */}
        <div className="space-y-6 lg:col-span-4">
          {/* Recent Searches */}
          <div className="rounded-3xl border border-[#E5EEF5] bg-white p-6 shadow-xs">
            <h3 className="text-sm font-semibold text-[#0B151F]">Recent Searches</h3>
            <p className="mt-0.5 text-xs text-[#677480]">One-click repeat of your previous inquiries.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {recentSearches.map((s, i) => (
                <Link
                  key={i}
                  href={`/s?q=${encodeURIComponent(s)}&country=${selectedCountry}`}
                  className="rounded-full border border-[#E5EEF5] bg-[#F5F8FB] px-3 py-1 text-xs text-[#112130] transition hover:border-[#0C68BE] hover:bg-white"
                >
                  🔍 {s}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Practice Tools */}
          <div className="rounded-3xl border border-[#E5EEF5] bg-white p-6 shadow-xs">
            <h3 className="text-sm font-semibold text-[#0B151F]">Practice Workspaces</h3>
            <div className="mt-4 space-y-2.5">
              <Link
                href="/workspace"
                className="flex items-center justify-between rounded-xl bg-[#F5F8FB] p-3 text-xs font-semibold text-[#112130] hover:bg-[#E5EEF5]"
              >
                <span>📁 Matter Folders &amp; Case Notes</span>
                <span className="text-[#0C68BE]">Open →</span>
              </Link>
              <Link
                href="/library"
                className="flex items-center justify-between rounded-xl bg-[#F5F8FB] p-3 text-xs font-semibold text-[#112130] hover:bg-[#E5EEF5]"
              >
                <span>📚 Personal Library &amp; Uploads</span>
                <span className="text-[#0C68BE]">Open →</span>
              </Link>
              <Link
                href="/sources"
                className="flex items-center justify-between rounded-xl bg-[#F5F8FB] p-3 text-xs font-semibold text-[#112130] hover:bg-[#E5EEF5]"
              >
                <span>⚡ Live Multi-Source Scrapers</span>
                <span className="text-[#0C68BE]">Open →</span>
              </Link>
              <Link
                href="/support"
                className="flex items-center justify-between rounded-xl bg-[#F5F8FB] p-3 text-xs font-semibold text-[#112130] hover:bg-[#E5EEF5]"
              >
                <span>💬 Support &amp; Matter Escalation</span>
                <span className="text-[#0C68BE]">Open →</span>
              </Link>
            </div>
          </div>

          {/* Go Pro Promo Card */}
          <div className="rounded-3xl border border-emerald-200 bg-gradient-to-b from-emerald-50 to-white p-6 text-xs text-emerald-950 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-emerald-600 px-2 py-0.5 text-[10px] font-bold uppercase text-white">
                Go Pro
              </span>
              <span className="text-emerald-700 font-bold">From R299 / $19</span>
            </div>
            <h4 className="mt-3 text-sm font-semibold text-emerald-950">Full Document Downloads &amp; AI Citations</h4>
            <p className="mt-1 text-emerald-800 leading-relaxed">
              Unlock offline gazette sync, unlimited crowdsourced uploads, and cross-jurisdictional precedent matching.
            </p>
            <Link
              href="/go-pro"
              className="mt-4 block w-full rounded-xl bg-emerald-700 py-2.5 text-center text-xs font-semibold text-white transition hover:bg-emerald-800"
            >
              Start 14-Day Free Pro Trial
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
