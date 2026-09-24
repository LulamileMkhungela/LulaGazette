"use client";

import { useMemo, useState } from "react";
import { AudienceBadge } from "@/components/AudienceChrome";
import { useAudience } from "@/context/AudienceContext";
import { useAuth } from "@/context/AuthContext";
import { getCountryByCode } from "@/data/africanCountries";
import { directoryForAudience } from "@/data/directory";

export default function DirectoryPage() {
  const { audience } = useAudience();
  const { selectedCountry } = useAuth();
  const [cat, setCat] = useState<string>("all");

  const countryCode = (selectedCountry || "ZA").toUpperCase();
  const activeCountryObj = getCountryByCode(selectedCountry);
  const base = directoryForAudience(audience, selectedCountry);

  const categories = useMemo(
    () => ["all", ...Array.from(new Set(base.map((d) => d.category)))],
    [base]
  );
  const list = cat === "all" ? base : base.filter((d) => d.category === cat);

  const countryDisplayName =
    countryCode === "ALL"
      ? "Pan-African Organs & Tribunals"
      : activeCountryObj
      ? `${activeCountryObj.flag} ${activeCountryObj.name}`
      : "Selected Country";

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="rounded-full bg-[#0C68BE]/10 px-3 py-1 text-xs font-semibold text-[#0C68BE]">
              {countryDisplayName}
            </span>
            <span className="text-xs text-[#86929E]">
              {countryCode === "ZA"
                ? "· Non-SA institutions excluded"
                : `· Other jurisdictions excluded`}
            </span>
          </div>
          <h1 className="font-display text-4xl text-lg-navy">Legal Directory</h1>
          <p className="mt-3 max-w-2xl text-sm text-lg-muted">
            Where to go, who to call, and where documents often get sent — apex courts, regulatory authorities,
            labour tribunals, legal aid and professional bar councils in {countryCode === "ALL" ? "Africa" : activeCountryObj?.name || countryCode}.
          </p>
        </div>
        <AudienceBadge />
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCat(c)}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
              cat === c ? "bg-lg-blue text-white" : "border border-lg-line bg-white text-lg-slate"
            }`}
          >
            {c === "all" ? "All" : c}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {list.map((d) => (
          <article key={d.id} className="rounded-2xl border border-lg-line bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-2">
              <p className="text-[11px] font-bold uppercase tracking-wide text-lg-blue">{d.category}</p>
              <span className="text-[10px] font-bold uppercase text-[#86929E]">{d.countryCode}</span>
            </div>
            <h2 className="mt-1 text-lg font-semibold text-lg-navy">{d.name}</h2>
            <p className="mt-2 text-sm leading-6 text-lg-muted">{d.description}</p>
            <p className="mt-3 text-sm text-lg-slate">
              <span className="font-semibold">When: </span>
              {d.whenToContact}
            </p>
            <div className="mt-3 space-y-1 text-sm">
              {d.address && <p className="text-lg-muted">{d.address}</p>}
              {d.phone && (
                <p>
                  <a className="font-medium text-lg-blue hover:underline" href={`tel:${d.phone.replace(/\s/g, "")}`}>
                    {d.phone}
                  </a>
                </p>
              )}
              {d.email && (
                <p>
                  <a className="font-medium text-lg-blue hover:underline" href={`mailto:${d.email}`}>
                    {d.email}
                  </a>
                </p>
              )}
              {d.website && (
                <p>
                  <a className="font-medium text-lg-blue hover:underline" href={d.website} target="_blank" rel="noreferrer">
                    Website ↗
                  </a>
                </p>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
