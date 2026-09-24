"use client";

import { useEffect, useState } from "react";
import { africanCountries, AfricanCountry } from "@/data/africanCountries";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  selectedCountry: string;
  onSelectCountry: (code: string) => void;
};

const POPULAR_COUNTRIES = [
  { code: "all", name: "All Africa (Pan-African)", flag: "🌍" },
  { code: "ZA", name: "South Africa", flag: "🇿🇦" },
  { code: "KE", name: "Kenya", flag: "🇰🇪" },
  { code: "NG", name: "Nigeria", flag: "🇳🇬" },
  { code: "GH", name: "Ghana", flag: "🇬🇭" },
  { code: "EG", name: "Egypt", flag: "🇪🇬" },
  { code: "BW", name: "Botswana", flag: "🇧🇼" },
  { code: "NA", name: "Namibia", flag: "🇳🇦" },
  { code: "RW", name: "Rwanda", flag: "🇷🇼" },
  { code: "TZ", name: "Tanzania", flag: "🇹🇿" },
  { code: "UG", name: "Uganda", flag: "🇺🇬" },
  { code: "ZW", name: "Zimbabwe", flag: "🇿🇼" },
  { code: "AU", name: "Pan-African / AU", flag: "🏛️" },
];

export function CountrySelectorModal({ isOpen, onClose, selectedCountry, onSelectCountry }: Props) {
  const [search, setSearch] = useState("");

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) {
      window.addEventListener("keydown", onKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = search.trim().toLowerCase();
  const filtered = africanCountries.filter((c) => {
    if (!q) return true;
    return (
      c.name.toLowerCase().includes(q) ||
      c.code.toLowerCase().includes(q) ||
      c.apexCourt.toLowerCase().includes(q) ||
      c.region.toLowerCase().includes(q) ||
      c.gazetteName.toLowerCase().includes(q)
    );
  });

  function pick(code: string) {
    onSelectCountry(code);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0B151F]/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative flex max-h-[88vh] w-full max-w-4xl flex-col rounded-3xl border border-[#E5EEF5] bg-white shadow-2xl">
        {/* Header */}
        <div className="border-b border-[#E5EEF5] p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#0C68BE]/10 text-xl">
                🌍
              </span>
              <div>
                <h2 className="font-display text-xl font-semibold text-[#0B151F] sm:text-2xl">
                  Select African Jurisdiction
                </h2>
                <p className="mt-0.5 text-xs text-[#677480]">
                  Filter Acts, landmark cases, official gazettes, and court rules by sovereign nation across Africa.
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-xl text-[#677480] hover:bg-[#F5F8FB] hover:text-[#0B151F]"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          {/* Search bar */}
          <div className="relative mt-4">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by country name, code, apex court, or region (e.g. Kenya, Nigeria, SADC)..."
              autoFocus
              className="w-full rounded-2xl border border-[#E5EEF5] bg-[#F5F8FB] px-4 py-2.5 pl-10 text-xs text-[#112130] outline-none placeholder:text-[#86929E] focus:border-[#0C68BE] focus:bg-white focus:ring-2 focus:ring-[#0C68BE]/15"
            />
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-[#86929E]">🔍</span>
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#86929E] hover:text-[#112130]"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick presets */}
          <div className="mt-3 flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[11px] font-semibold text-[#86929E]">Quick jump:</span>
            {POPULAR_COUNTRIES.map((p) => {
              const active = selectedCountry.toUpperCase() === p.code.toUpperCase();
              return (
                <button
                  key={p.code}
                  onClick={() => pick(p.code)}
                  className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition ${
                    active
                      ? "bg-[#0C68BE] text-white shadow-xs"
                      : "border border-[#E5EEF5] bg-white text-[#112130] hover:border-[#0C68BE] hover:bg-[#F5F8FB]"
                  }`}
                >
                  <span className="mr-1">{p.flag}</span>
                  {p.name.split(" ")[0]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Scrollable Countries Grid */}
        <div className="min-h-0 flex-1 overflow-y-auto p-5 sm:p-6">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {/* All Africa Option */}
            <button
              onClick={() => pick("all")}
              className={`flex flex-col justify-between rounded-2xl border p-4 text-left transition ${
                selectedCountry === "all"
                  ? "border-[#0C68BE] bg-sky-50/50 shadow-xs ring-2 ring-[#0C68BE]/20"
                  : "border-[#E5EEF5] bg-white hover:border-[#0C68BE]/40 hover:shadow-xs"
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl">🌍</span>
                  <span className="rounded-full bg-[#0C68BE]/10 px-2 py-0.5 text-[10px] font-bold text-[#0C68BE]">
                    PAN-AFRICAN
                  </span>
                </div>
                <h3 className="mt-2 text-sm font-semibold text-[#0B151F]">All Africa (54 Nations)</h3>
                <p className="mt-1 text-xs text-[#677480]">
                  Search continent-wide legal instruments, AfCFTA treaties, and regional economic court rulings.
                </p>
              </div>
              <span className="mt-3 text-[11px] font-semibold text-[#0C68BE]">
                {selectedCountry === "all" ? "✓ Currently Active" : "Select All Africa →"}
              </span>
            </button>

            {/* Individual Countries */}
            {filtered.map((c: AfricanCountry) => {
              const active = selectedCountry.toUpperCase() === c.code.toUpperCase();
              return (
                <button
                  key={c.code}
                  onClick={() => pick(c.code)}
                  className={`group flex flex-col justify-between rounded-2xl border p-4 text-left transition ${
                    active
                      ? "border-[#0C68BE] bg-sky-50/50 shadow-xs ring-2 ring-[#0C68BE]/20"
                      : "border-[#E5EEF5] bg-white hover:border-[#0C68BE]/40 hover:shadow-xs"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{c.flag}</span>
                        <span className="text-sm font-semibold text-[#0B151F] group-hover:text-[#0C68BE]">
                          {c.name}
                        </span>
                      </div>
                      <span className="rounded-md bg-[#F5F8FB] px-1.5 py-0.5 text-[10px] font-bold text-[#677480]">
                        {c.code}
                      </span>
                    </div>

                    <div className="mt-2.5 space-y-1 text-[11px]">
                      <p className="text-[#677480]">
                        <span className="font-medium text-[#112130]">Apex Court:</span> {c.apexCourt}
                      </p>
                      <p className="text-[#677480] truncate" title={c.gazetteName}>
                        <span className="font-medium text-[#112130]">Gazette:</span> {c.gazetteName}
                      </p>
                      <p className="text-[#86929E]">
                        {c.region} · {c.legalSystem}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3.5 flex items-center justify-between border-t border-[#E5EEF5] pt-2 text-[11px]">
                    <span className="font-semibold text-[#0C68BE]">
                      {active ? "✓ Active Jurisdiction" : "Filter Laws →"}
                    </span>
                    <span className="text-[10px] text-[#86929E]">{c.capital}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-sm font-semibold text-[#0B151F]">No African nation matched &ldquo;{search}&rdquo;</p>
              <p className="mt-1 text-xs text-[#677480]">Check spelling or browse the quick presets above.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-[#E5EEF5] bg-[#F5F8FB] px-5 py-3 text-xs text-[#677480]">
          <span>54 African Sovereign Jurisdictions Supported</span>
          <button
            onClick={() => pick("all")}
            className="font-semibold text-[#0C68BE] hover:underline"
          >
            Reset to All Africa (54 nations)
          </button>
        </div>
      </div>
    </div>
  );
}
