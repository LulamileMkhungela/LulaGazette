"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { categories } from "@/data/legal";
import { buildSearchHref, SearchQuery } from "@/lib/search";

const TOP_JURISDICTIONS = [
  { code: "all", label: "All Africa (54 nations)", flag: "🌍" },
  { code: "ZA", label: "South Africa", flag: "🇿🇦" },
  { code: "KE", label: "Kenya", flag: "🇰🇪" },
  { code: "NG", label: "Nigeria", flag: "🇳🇬" },
  { code: "GH", label: "Ghana", flag: "🇬🇭" },
  { code: "UG", label: "Uganda", flag: "🇺🇬" },
  { code: "TZ", label: "Tanzania", flag: "🇹🇿" },
  { code: "RW", label: "Rwanda", flag: "🇷🇼" },
  { code: "ZW", label: "Zimbabwe", flag: "🇿🇼" },
  { code: "AU", label: "Pan-African / AU Bodies", flag: "🏛️" },
];

export function SearchFilters({ query }: { query: SearchQuery }) {
  const router = useRouter();
  const [from, setFrom] = useState(query.startDate || "");
  const [to, setTo] = useState(query.endDate || "");
  const [openCountry, setOpenCountry] = useState(true);
  const [openLicense, setOpenLicense] = useState(true);
  const [openDate, setOpenDate] = useState(true);
  const [openCat, setOpenCat] = useState(true);

  function applyDates(e: FormEvent) {
    e.preventDefault();
    router.push(
      buildSearchHref({
        ...query,
        startDate: from || undefined,
        endDate: to || undefined,
        page: 1,
      })
    );
  }

  const resetHref = buildSearchHref({
    q: query.q,
    c: query.c,
    sort: query.sort,
    limit: query.limit,
    page: 1,
  });

  return (
    <aside className="lg-filter-panel sticky top-20 hidden h-fit w-3/12 max-w-[280px] shrink-0 self-start overflow-hidden pb-5 lg:flex lg:flex-col">
      <div className="flex shrink-0 items-center justify-between p-3">
        <p className="font-medium text-[#112130]">Filters</p>
        <Link href={resetHref} className="p-0 text-sm font-medium text-[#0C68BE] hover:underline">
          Reset all
        </Link>
      </div>

      <div className="min-h-0 overflow-y-auto rounded-xl border border-[#EBF0F5] bg-white">
        {/* African Jurisdiction / Country Filter */}
        <section className="border-b border-[#EBF0F5]">
          <button
            type="button"
            className="flex w-full items-center justify-between px-3 py-3 text-left"
            onClick={() => setOpenCountry((v) => !v)}
          >
            <p className="text-sm font-medium text-[#0C68BE]">African Jurisdiction</p>
            <Chevron open={openCountry} />
          </button>
          {openCountry && (
            <div className="flex flex-col gap-1 px-3 pb-3">
              {TOP_JURISDICTIONS.map((j) => {
                const active = (query.country || "all").toUpperCase() === j.code.toUpperCase();
                return (
                  <Link
                    key={j.code}
                    href={buildSearchHref({ ...query, country: j.code === "all" ? undefined : j.code, page: 1 })}
                    className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs transition ${
                      active
                        ? "bg-[#0C68BE]/10 font-bold text-[#0C68BE]"
                        : "text-[#112130] hover:bg-[#F5F8FB]"
                    }`}
                  >
                    <span>{j.flag}</span>
                    <span className="truncate">{j.label}</span>
                  </Link>
                );
              })}
              <Link
                href="/countries"
                className="mt-1 pt-1 text-center text-[11px] font-semibold text-[#0C68BE] border-t border-[#EBF0F5] hover:underline"
              >
                View all 54 African countries →
              </Link>
            </div>
          )}
        </section>

        {/* License */}
        <section className="border-b border-[#EBF0F5]">
          <button
            type="button"
            className="flex w-full items-center justify-between px-3 py-3 text-left"
            onClick={() => setOpenLicense((v) => !v)}
          >
            <p className="text-sm font-medium text-[#0C68BE]">License</p>
            <Chevron open={openLicense} />
          </button>
          {openLicense && (
            <div className="flex flex-col gap-2 px-3 pb-3">
              {(
                [
                  ["all", "All"],
                  ["free", "Free"],
                  ["premium", "Premium"],
                ] as const
              ).map(([id, label]) => {
                const active = (query.license || "all") === id;
                return (
                  <div key={id} className="flex items-center justify-between">
                    <p className="text-sm text-[#112130]">{label}</p>
                    <Link
                      href={buildSearchHref({ ...query, license: id, page: 1 })}
                      aria-label={`Filter by ${label.toLowerCase()} license`}
                      className={`relative h-5 w-9 rounded-full transition ${
                        active ? "bg-[#0C68BE]" : "bg-[#D9D9D9]"
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition ${
                          active ? "left-4" : "left-0.5"
                        }`}
                      />
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Date published */}
        <section className="border-b border-[#EBF0F5]">
          <button
            type="button"
            className="flex w-full items-center justify-between px-3 py-3 text-left"
            onClick={() => setOpenDate((v) => !v)}
          >
            <p className="text-sm font-medium text-[#0C68BE]">Year published</p>
            <Chevron open={openDate} />
          </button>
          {openDate && (
            <form onSubmit={applyDates} className="px-3 pb-3">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="From"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="w-1/2 rounded border border-[#E5EEF5] px-2 py-1.5 text-xs text-[#112130] outline-none"
                />
                <span className="text-xs text-[#86929E]">—</span>
                <input
                  type="text"
                  placeholder="To"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="w-1/2 rounded border border-[#E5EEF5] px-2 py-1.5 text-xs text-[#112130] outline-none"
                />
              </div>
              <button
                type="submit"
                className="mt-2 w-full rounded bg-[#0C68BE] py-1 text-xs font-semibold text-white hover:bg-[#0F80EB]"
              >
                Apply
              </button>
            </form>
          )}
        </section>

        {/* Category */}
        <section>
          <button
            type="button"
            className="flex w-full items-center justify-between px-3 py-3 text-left"
            onClick={() => setOpenCat((v) => !v)}
          >
            <p className="text-sm font-medium text-[#0C68BE]">Category</p>
            <Chevron open={openCat} />
          </button>
          {openCat && (
            <div className="flex flex-col gap-1 px-3 pb-3">
              <Link
                href={buildSearchHref({ ...query, c: undefined, page: 1 })}
                className={`rounded px-2 py-1.5 text-xs ${
                  !query.c ? "bg-[#0C68BE]/10 font-bold text-[#0C68BE]" : "text-[#112130] hover:bg-[#F5F8FB]"
                }`}
              >
                All categories
              </Link>
              {categories.map((c) => {
                const active = query.c === c.id;
                return (
                  <Link
                    key={c.id}
                    href={buildSearchHref({ ...query, c: c.id, page: 1 })}
                    className={`rounded px-2 py-1.5 text-xs ${
                      active ? "bg-[#0C68BE]/10 font-bold text-[#0C68BE]" : "text-[#112130] hover:bg-[#F5F8FB]"
                    }`}
                  >
                    {c.label}
                  </Link>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </aside>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#86929E"
      strokeWidth="2"
      className={`transition ${open ? "rotate-180" : ""}`}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

/** Mobile filter drawer trigger + panel */
export function MobileFilters({ query }: { query: SearchQuery }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [from, setFrom] = useState(query.startDate || "");
  const [to, setTo] = useState(query.endDate || "");

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open filters"
        className="inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-[#E5EEF5] bg-white px-3 py-1.5 text-sm font-medium text-[#112130] lg:hidden"
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-gray-600"
          aria-hidden
        >
          <path d="M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z" />
        </svg>
        <span>Filter</span>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/40 lg:hidden" onClick={() => setOpen(false)}>
      <div
        className="absolute bottom-0 left-0 right-0 max-h-[85dvh] overflow-y-auto rounded-t-2xl bg-white p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-3 flex items-center justify-between">
          <p className="font-medium">Filters</p>
          <button type="button" className="text-sm text-[#0C68BE]" onClick={() => setOpen(false)}>
            Close
          </button>
        </div>

        <p className="mb-2 text-sm font-medium text-[#0C68BE]">African Jurisdiction</p>
        <div className="mb-4 flex flex-wrap gap-1.5">
          {TOP_JURISDICTIONS.map((j) => (
            <Link
              key={j.code}
              href={buildSearchHref({ ...query, country: j.code === "all" ? undefined : j.code, page: 1 })}
              onClick={() => setOpen(false)}
              className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                (query.country || "all").toUpperCase() === j.code.toUpperCase()
                  ? "bg-[#0C68BE] text-white"
                  : "bg-[#F5F8FB] text-[#112130]"
              }`}
            >
              {j.flag} {j.label.split(" ")[0]}
            </Link>
          ))}
        </div>

        <p className="mb-2 text-sm font-medium text-[#0C68BE]">License</p>
        <div className="mb-4 flex gap-2">
          {(["all", "free", "premium"] as const).map((id) => (
            <Link
              key={id}
              href={buildSearchHref({ ...query, license: id, page: 1 })}
              onClick={() => setOpen(false)}
              className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                (query.license || "all") === id ? "bg-[#0C68BE] text-white" : "bg-[#F5F8FB]"
              }`}
            >
              {id}
            </Link>
          ))}
        </div>

        <p className="mb-2 text-sm font-medium text-[#0C68BE]">Year published</p>
        <form
          className="mb-4 flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            router.push(
              buildSearchHref({ ...query, startDate: from || undefined, endDate: to || undefined, page: 1 })
            );
            setOpen(false);
          }}
        >
          <input
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            placeholder="From"
            className="flex-1 rounded-md border border-[#E5EEF5] px-2 py-1.5 text-sm"
          />
          <input
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="To"
            className="flex-1 rounded-md border border-[#E5EEF5] px-2 py-1.5 text-sm"
          />
          <button type="submit" className="rounded-md bg-[#0C68BE] px-3 text-xs font-semibold text-white">
            Go
          </button>
        </form>

        <p className="mb-2 text-sm font-medium text-[#0C68BE]">Category</p>
        <div className="flex flex-col gap-1 pb-6">
          {categories.map((c) => (
            <Link
              key={c.id}
              href={buildSearchHref({ ...query, c: c.id, page: 1 })}
              onClick={() => setOpen(false)}
              className={`rounded-md px-2 py-2 text-sm ${
                query.c === c.id ? "bg-[#0C68BE]/10 font-medium text-[#0C68BE]" : ""
              }`}
            >
              {c.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
