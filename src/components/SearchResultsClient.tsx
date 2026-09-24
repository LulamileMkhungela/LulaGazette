"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { categories, LegalDocument } from "@/data/legal";
import { getCountryByCode } from "@/data/africanCountries";
import { useAuth } from "@/context/AuthContext";
import { buildSearchHref, pageCountFor, SearchQuery, SortKey } from "@/lib/search";
import { MobileFilters, SearchFilters } from "@/components/SearchFilters";

type ViewMode = "list" | "grid";

const VIEW_KEY = "lg-results-view";

export function SearchResultsClient({
  query,
  results,
  total,
  totalPages,
}: {
  query: SearchQuery;
  results: LegalDocument[];
  total: number;
  totalPages: number;
}) {
  const router = useRouter();
  const { selectedCountry } = useAuth();
  const sort = query.sort || "year-desc";
  const limit = query.limit || 20;
  const page = query.page || 1;
  const catLabel = categories.find((c) => c.id === query.c)?.label;
  const activeCountryCode = query.country || (selectedCountry !== "all" ? selectedCountry : undefined);
  const activeCountryObj = getCountryByCode(activeCountryCode);

  // LulaGazette default is grid (grid segment selected in their HTML)
  const [view, setView] = useState<ViewMode>("grid");

  useEffect(() => {
    try {
      const v = localStorage.getItem(VIEW_KEY);
      if (v === "list" || v === "grid") setView(v);
    } catch {
      /* empty */
    }
  }, []);

  function setViewMode(mode: ViewMode) {
    setView(mode);
    try {
      localStorage.setItem(VIEW_KEY, mode);
    } catch {
      /* empty */
    }
  }

  return (
    <div className="lg-search-shell bg-white">
      <div className="container mx-auto flex max-w-[1200px] flex-row gap-5 px-4 py-4 lg:px-6">
        <SearchFilters query={query} />

        <div className="flex min-w-0 flex-1 flex-col">
          {/* Top search (mobile + tablet) */}
          <div className="mb-4 flex w-full flex-wrap items-center gap-2 lg:hidden">
            <form
              className="relative min-w-0 flex-1"
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                router.push(
                  buildSearchHref({
                    ...query,
                    q: String(fd.get("q") || ""),
                    page: 1,
                  })
                );
              }}
            >
              <input
                name="q"
                defaultValue={query.q || ""}
                placeholder="Search for a document or ask a question"
                className="w-full rounded-lg border border-[#E5EEF5] py-2.5 pl-3 pr-10 text-sm outline-none focus:border-[#0C68BE]"
              />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-[#0C68BE]" aria-label="Search">
                <SearchIcon />
              </button>
            </form>
          </div>

          {/* Results toolbar — LulaGazette: Showing results | sort | list/grid | Filter */}
          <div className="mb-4 flex w-full flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm text-gray-500">
                Showing results
                {query.q ? (
                  <>
                    {" "}
                    for &quot;<span className="font-medium text-[#112130]">{query.q}</span>&quot;
                  </>
                ) : null}
                {catLabel ? <span className="text-[#86929E]"> · {catLabel}</span> : null}
              </p>
              {activeCountryCode && activeCountryCode !== "all" ? (
                <div className="mt-1 flex flex-wrap items-center gap-1.5">
                  <span className="inline-flex items-center gap-1 rounded-md bg-[#0C68BE]/10 px-2 py-0.5 text-xs font-semibold text-[#0C68BE]">
                    <span>{activeCountryObj?.flag || "🌍"}</span>
                    <span>{activeCountryObj?.name || activeCountryCode.toUpperCase()}</span>
                  </span>
                  <span className="text-[11px] text-[#86929E]">
                    {activeCountryCode.toUpperCase() === "ZA"
                      ? "· Non-SA documents excluded"
                      : "· South African documents excluded"}
                  </span>
                  <span className="text-xs text-[#86929E]">
                    · {total} document{total === 1 ? "" : "s"}
                  </span>
                </div>
              ) : (
                <p className="text-xs text-[#86929E]">
                  {total} document{total === 1 ? "" : "s"} across all African jurisdictions
                </p>
              )}
            </div>

            <div className="ml-auto flex flex-wrap items-center justify-end gap-2">
              {/* Sort */}
              <div className="relative">
                <label className="sr-only" htmlFor="sort">
                  Sort
                </label>
                <select
                  id="sort"
                  className="appearance-none rounded-md border border-[#E5EEF5] bg-white py-1.5 pl-3 pr-8 text-sm font-medium text-[#112130]"
                  value={sort}
                  onChange={(e) =>
                    router.push(buildSearchHref({ ...query, sort: e.target.value as SortKey, page: 1 }))
                  }
                >
                  <option value="year-desc">Newest to oldest</option>
                  <option value="year-asc">Oldest to newest</option>
                  <option value="title-asc">Title A–Z</option>
                  <option value="title-desc">Title Z–A</option>
                </select>
                <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[#677480]">
                  <ChevronDown />
                </span>
              </div>

              {/* List / Grid segmented control — LulaGazette aria-label */}
              <div
                role="radiogroup"
                aria-label="Document results view"
                tabIndex={0}
                className="inline-flex rounded-md bg-[#f5f5f5] p-0.5"
              >
                <button
                  type="button"
                  role="radio"
                  aria-checked={view === "list"}
                  aria-label="List view"
                  title="List view"
                  onClick={() => setViewMode("list")}
                  className={`flex h-8 w-9 items-center justify-center rounded ${
                    view === "list"
                      ? "bg-white text-[#112130] shadow-sm"
                      : "text-[#677480] hover:text-[#112130]"
                  }`}
                >
                  <ListIcon />
                </button>
                <button
                  type="button"
                  role="radio"
                  aria-checked={view === "grid"}
                  aria-label="Grid view"
                  title="Grid view"
                  onClick={() => setViewMode("grid")}
                  className={`flex h-8 w-9 items-center justify-center rounded ${
                    view === "grid"
                      ? "bg-white text-[#112130] shadow-sm"
                      : "text-[#677480] hover:text-[#112130]"
                  }`}
                >
                  <GridIcon />
                </button>
              </div>

              {/* Mobile Filter button — LulaGazette "Open filters" */}
              <div className="lg:hidden">
                <MobileFilters query={query} />
              </div>
            </div>
          </div>

          {/* Results */}
          {results.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-[#E5EEF5] px-6 py-20 text-center text-gray-500">
              <p className="text-base font-semibold text-[#112130]">No results found</p>
              <p className="mt-2 text-sm">Try clearing filters or a broader search term.</p>
              <Link href="/s" className="mt-4 text-sm font-medium text-[#0C68BE] hover:underline">
                Reset search
              </Link>
            </div>
          ) : view === "grid" ? (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((doc) => (
                <ResultCard key={doc.id} doc={doc} layout="grid" />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {results.map((doc) => (
                <ResultCard key={doc.id} doc={doc} layout="list" />
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[#EBF0F5] pt-4">
            <ul className="flex flex-wrap items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 2)
                .reduce<(number | "…")[]>((acc, p, idx, arr) => {
                  if (idx > 0) {
                    const prev = arr[idx - 1];
                    if (typeof prev === "number" && p - prev > 1) acc.push("…");
                  }
                  acc.push(p);
                  return acc;
                }, [])
                .map((p, i) =>
                  p === "…" ? (
                    <li key={`e${i}`} className="px-2 text-sm text-[#86929E]">
                      …
                    </li>
                  ) : (
                    <li key={p}>
                      <Link
                        href={buildSearchHref({ ...query, page: p })}
                        className={`flex h-8 min-w-8 items-center justify-center rounded-md px-2 text-sm font-medium ${
                          p === page ? "bg-[#0C68BE] text-white" : "text-[#112130] hover:bg-[#F5F8FB]"
                        }`}
                      >
                        {p}
                      </Link>
                    </li>
                  )
                )}
            </ul>

            <div className="flex shrink-0 items-center gap-3">
              <p className="hidden text-sm sm:block">Items per page</p>
              <select
                aria-label="Items per page"
                className="rounded-md border border-[#E5EEF5] bg-white px-2 py-1.5 text-sm"
                value={limit}
                onChange={(e) =>
                  router.push(buildSearchHref({ ...query, limit: Number(e.target.value), page: 1 }))
                }
              >
                {[10, 20, 30, 50].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ResultCard({ doc, layout }: { doc: LegalDocument; layout: ViewMode }) {
  const cat = categories.find((c) => c.id === doc.category);
  const pages = pageCountFor(doc.id, doc.body.length);
  const pageLabel = pages === 1 ? "1 page" : `${pages} pages`;

  if (layout === "list") {
    return (
      <Link
        href={`/d/${doc.id}`}
        className="group flex items-start gap-4 rounded-xl border border-[#E5EEF5] bg-white p-3 transition hover:border-[#0C68BE]/35 hover:shadow-sm sm:p-4"
      >
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg text-[10px] font-bold uppercase text-white"
          style={{ backgroundColor: cat?.color || "#0C68BE" }}
        >
          {(cat?.label || "Doc").slice(0, 4)}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-[#0C68BE]">
              {cat?.label}
            </span>
            <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] font-semibold text-[#298D62]">
              Free
            </span>
            <span className="text-[11px] text-[#86929E]">{doc.year}</span>
            <span className="text-[11px] text-[#86929E]">· {pageLabel}</span>
          </div>
          <h3 className="mt-0.5 text-[15px] font-semibold text-[#0B151F] group-hover:text-[#0C68BE]">
            {doc.title}
          </h3>
          <p className="mt-0.5 text-xs font-medium text-[#0C68BE]">{doc.citation}</p>
          <p className="mt-1 line-clamp-1 text-sm text-[#677480]">{doc.summary}</p>
        </div>
      </Link>
    );
  }

  // Grid card
  return (
    <Link
      href={`/d/${doc.id}`}
      className="group flex h-full flex-col rounded-xl border border-[#E5EEF5] bg-white p-4 transition hover:border-[#0C68BE]/35 hover:shadow-sm sm:p-5"
    >
      <div className="flex items-start justify-between gap-2">
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-[10px] font-bold uppercase text-white"
          style={{ backgroundColor: cat?.color || "#0C68BE" }}
        >
          {(cat?.label || "Doc").slice(0, 4)}
        </div>
        <span className="rounded bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-[#298D62]">Free</span>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] text-[#86929E]">
        <span className="font-semibold uppercase tracking-wide text-[#0C68BE]">{cat?.label}</span>
        <span>{doc.year}</span>
        <span>· {pageLabel}</span>
      </div>
      <h3 className="mt-2 line-clamp-3 text-base font-semibold leading-snug text-[#0B151F] group-hover:text-[#0C68BE]">
        {doc.title}
      </h3>
      <p className="mt-1 line-clamp-1 text-xs font-medium text-[#0C68BE]">{doc.citation}</p>
      <p className="mt-2 line-clamp-3 flex-1 text-sm leading-5 text-[#677480]">{doc.summary}</p>
    </Link>
  );
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

/** Lucide list — matches LulaGazette */
function ListIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M3 5h.01" />
      <path d="M3 12h.01" />
      <path d="M3 19h.01" />
      <path d="M8 5h13" />
      <path d="M8 12h13" />
      <path d="M8 19h13" />
    </svg>
  );
}

/** Lucide grid-2x2 — matches LulaGazette */
function GridIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M12 3v18" />
      <path d="M3 12h18" />
      <rect x="3" y="3" width="18" height="18" rx="2" />
    </svg>
  );
}
