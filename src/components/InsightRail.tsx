"use client";

import Link from "next/link";
import { insightsForAudience } from "@/data/insights";
import { useAudience } from "@/context/AudienceContext";
import { useAuth } from "@/context/AuthContext";
import { getCountryByCode } from "@/data/africanCountries";

export function InsightRail() {
  const { audience, label, isLawyer } = useAudience();
  const { selectedCountry } = useAuth();
  const cards = insightsForAudience(audience, selectedCountry).slice(0, 10);
  const activeCountryObj = getCountryByCode(selectedCountry);

  const countryDisplayName =
    selectedCountry === "all"
      ? "Pan-Africa"
      : activeCountryObj
      ? `${activeCountryObj.flag} ${activeCountryObj.name}`
      : "Selected Jurisdiction";

  return (
    <div className="w-full max-w-5xl">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2 px-1">
        <p className="text-[11px] font-medium text-[#86929E]">
          Spotlight for{" "}
          <span className={isLawyer ? "font-semibold text-violet-700" : "font-semibold text-[#0C68BE]"}>
            {label.toLowerCase()}
          </span>{" "}
          in <span className="font-semibold text-[#112130]">{countryDisplayName}</span>
          {isLawyer ? " — authorities & local procedure" : " — key legislation & everyday rights"}
        </p>
        <span className="rounded-full bg-[#F5F8FB] px-2.5 py-0.5 text-[10px] font-semibold text-[#0C68BE] border border-[#E5EEF5]">
          {selectedCountry === "all" ? "🌍 Pan-African Scope" : `Strict ${activeCountryObj?.name || selectedCountry} Scope`}
        </span>
      </div>

      <div
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-3 pt-1 scroll-smooth"
        style={{ scrollbarWidth: "thin" }}
      >
        {cards.map((c) => (
          <Link
            key={c.id}
            href={c.href}
            className="group flex w-[min(85vw,300px)] shrink-0 snap-start flex-col rounded-2xl border border-black/5 bg-white p-4 text-left shadow-[0_8px_30px_rgba(11,21,31,0.08)] transition hover:-translate-y-1 hover:border-[#0C68BE]/30 hover:shadow-[0_12px_40px_rgba(12,104,190,0.15)] sm:w-[280px] sm:p-5"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="rounded-full bg-[#0C68BE]/[0.08] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#0C68BE]">
                {c.kind === "document" ? "Document" : c.kind === "collection" ? "Collection" : "Explainer"}
              </span>
              <div className="flex items-center gap-1.5">
                {c.countryCode && (
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#0C68BE]">
                    {c.countryCode}
                  </span>
                )}
                {c.year ? (
                  <span className="text-[11px] font-semibold tabular-nums text-[#86929E]">{c.year}</span>
                ) : null}
              </div>
            </div>
            <h3 className="mt-3 text-[15px] font-semibold leading-snug text-[#0B151F] group-hover:text-[#0C68BE] sm:text-base">
              {c.title}
            </h3>
            <p className="mt-2 line-clamp-5 flex-1 text-[13px] leading-5 text-[#677480]">{c.teaser}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
