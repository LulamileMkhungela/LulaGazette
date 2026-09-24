"use client";

import Link from "next/link";
import { useState } from "react";
import { africanCountries, regionalBodies, AfricanRegion } from "@/data/africanCountries";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function CountriesPage() {
  const router = useRouter();
  const { selectedCountry, setSelectedCountry } = useAuth();
  const [activeRegion, setActiveRegion] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const regions: (AfricanRegion | "All" | "Regional")[] = [
    "All",
    "Southern Africa",
    "East Africa",
    "West Africa",
    "North Africa",
    "Central Africa",
    "Regional",
  ];

  const filteredCountries = africanCountries.filter((country) => {
    if (activeRegion !== "All" && activeRegion !== "Regional" && country.region !== activeRegion) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        country.name.toLowerCase().includes(q) ||
        country.capital.toLowerCase().includes(q) ||
        country.code.toLowerCase().includes(q) ||
        country.legalSystem.toLowerCase().includes(q) ||
        country.gazetteName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  function selectAndSearch(countryCode: string) {
    setSelectedCountry(countryCode);
    router.push(`/s?country=${countryCode}&sort=year-desc`);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="border-b border-[#E5EEF5] pb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#0C68BE]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#0C68BE]">
              <span>🌍</span> 54 Sovereign African Nations &amp; Regional Bodies
            </div>
            <h1 className="mt-3 font-display text-3xl font-semibold text-[#0B151F] sm:text-4xl">
              Pan-African Legal Atlas &amp; Gazette Registry
            </h1>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#677480] sm:text-base">
              Explore national constitutions, apex courts, official government gazettes, and legal systems across all
              African jurisdictions. Select any country to filter research, pull latest gazettes, or run cross-border
              comparisons.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/sources"
              className="rounded-xl bg-[#0C68BE] px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#0F80EB]"
            >
              Live Scraper Hub
            </Link>
            <Link
              href="/s"
              className="rounded-xl border border-[#E5EEF5] bg-white px-4 py-2.5 text-xs font-semibold text-[#112130] hover:bg-[#F5F8FB]"
            >
              Search Library
            </Link>
          </div>
        </div>

        {/* Region filter pills & search */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-1.5 overflow-x-auto pb-1">
            {regions.map((region) => (
              <button
                key={region}
                onClick={() => setActiveRegion(region)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                  activeRegion === region
                    ? "bg-[#0C68BE] text-white shadow-xs"
                    : "bg-[#F5F8FB] text-[#1D2E40] hover:bg-[#E5EEF5]"
                }`}
              >
                {region === "Regional" ? "🏛️ Regional Bodies (AU, ECOWAS, EAC)" : region}
              </button>
            ))}
          </div>

          <div className="w-full sm:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search country, capital, system..."
              className="w-full rounded-xl border border-[#E5EEF5] bg-white px-3.5 py-2 text-xs text-[#112130] outline-none placeholder:text-[#86929E] focus:border-[#0C68BE] focus:ring-2 focus:ring-[#0C68BE]/20"
            />
          </div>
        </div>
      </div>

      {/* Regional Bodies Section (shown if Regional or All) */}
      {(activeRegion === "All" || activeRegion === "Regional") && !searchQuery && (
        <section className="mt-10">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-xl font-semibold text-[#0B151F]">
              Supranational &amp; Regional Economic Communities
            </h2>
            <span className="text-xs font-medium text-[#86929E]">5 Continental Frameworks</span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {regionalBodies.map((body) => (
              <div
                key={body.id}
                className="group flex flex-col justify-between rounded-2xl border border-sky-100 bg-gradient-to-br from-sky-50/50 to-white p-5 shadow-xs transition hover:border-[#0C68BE]/40 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{body.flag}</span>
                    <span className="rounded-full bg-[#0C68BE]/10 px-2.5 py-0.5 text-[10px] font-bold text-[#0C68BE]">
                      {body.shortName}
                    </span>
                  </div>
                  <h3 className="mt-3 font-semibold text-[#0B151F] group-hover:text-[#0C68BE]">{body.name}</h3>
                  <p className="mt-1 text-xs text-[#86929E]">Headquarters: {body.headquarters}</p>
                  <p className="mt-2 text-xs leading-relaxed text-[#677480] line-clamp-3">{body.description}</p>

                  <div className="mt-4 rounded-xl bg-white/80 p-3 border border-sky-100 text-xs">
                    <p className="font-semibold text-[#112130]">Judicial Body:</p>
                    <p className="mt-0.5 text-[#5E7B99]">{body.court}</p>
                  </div>
                </div>

                <div className="mt-5 border-t border-[#E5EEF5] pt-3 flex items-center justify-between">
                  <a
                    href={body.portalUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-medium text-[#0C68BE] hover:underline"
                  >
                    Treaty Portal ↗
                  </a>
                  <button
                    onClick={() => selectAndSearch("AU")}
                    className="rounded-lg bg-[#0C68BE] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#0F80EB]"
                  >
                    View Treaties
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Sovereign African Countries Grid */}
      {activeRegion !== "Regional" && (
        <section className="mt-10">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-xl font-semibold text-[#0B151F]">
              Sovereign African States ({filteredCountries.length})
            </h2>
            <span className="text-xs text-[#86929E]">
              Currently active jurisdiction: {selectedCountry === "all" ? "All Africa" : selectedCountry}
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCountries.map((c) => {
              const isSelected = selectedCountry?.toUpperCase() === c.code;
              return (
                <div
                  key={c.code}
                  className={`group flex flex-col justify-between rounded-2xl border p-5 transition ${
                    isSelected
                      ? "border-[#0C68BE] bg-sky-50/20 shadow-md ring-2 ring-[#0C68BE]/20"
                      : "border-[#E5EEF5] bg-white shadow-xs hover:border-[#0C68BE]/40 hover:shadow-md"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{c.flag}</span>
                        <div>
                          <h3 className="font-semibold text-[#0B151F] group-hover:text-[#0C68BE]">{c.name}</h3>
                          <span className="text-[11px] font-medium text-[#86929E]">{c.region}</span>
                        </div>
                      </div>
                      <span className="rounded-md bg-[#F5F8FB] px-2 py-0.5 font-mono text-xs font-bold text-[#112130]">
                        {c.code}
                      </span>
                    </div>

                    <div className="mt-4 space-y-2 text-xs">
                      <div>
                        <span className="font-medium text-[#86929E]">Capital: </span>
                        <span className="text-[#112130]">{c.capital}</span>
                      </div>
                      <div>
                        <span className="font-medium text-[#86929E]">Legal System: </span>
                        <span className="inline-block rounded-md bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-900">
                          {c.legalSystem}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium text-[#86929E]">Apex Court: </span>
                        <span className="text-[#112130] font-medium">{c.apexCourt}</span>
                      </div>
                      <div>
                        <span className="font-medium text-[#86929E]">Official Gazette: </span>
                        <p className="mt-0.5 font-medium text-[#0C68BE] italic line-clamp-1">{c.gazetteName}</p>
                      </div>
                    </div>

                    <p className="mt-3 text-xs leading-relaxed text-[#677480] line-clamp-2">{c.description}</p>
                  </div>

                  <div className="mt-5 border-t border-[#E5EEF5] pt-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <button
                        onClick={() => selectAndSearch(c.code)}
                        className="rounded-lg bg-[#0C68BE] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#0F80EB]"
                      >
                        Search Laws
                      </button>

                      <Link
                        href={`/sources?country=${c.code}`}
                        className="rounded-lg border border-[#E5EEF5] bg-white px-2.5 py-1.5 text-xs font-medium text-[#112130] hover:bg-[#F5F8FB]"
                      >
                        Scrape Gazettes
                      </Link>

                      <button
                        onClick={() => setSelectedCountry(c.code)}
                        className={`rounded-lg px-2 py-1.5 text-xs font-medium transition ${
                          isSelected
                            ? "bg-emerald-100 text-emerald-800"
                            : "text-[#677480] hover:bg-[#F5F8FB]"
                        }`}
                      >
                        {isSelected ? "✓ Active" : "Set Active"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
