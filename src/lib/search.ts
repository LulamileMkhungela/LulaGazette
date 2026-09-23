import { categories, CategoryId, documents, LegalDocument, searchDocuments } from "@/data/legal";
import pdfMeta from "@/data/pdfMeta.json";

export type SortKey = "year-desc" | "year-asc" | "title-asc" | "title-desc";

export type SearchQuery = {
  q?: string;
  c?: string; // category id
  sort?: SortKey;
  limit?: number;
  page?: number;
  license?: "all" | "free" | "premium";
  startDate?: string; // year
  endDate?: string;
};

export function parseSearchParams(sp: Record<string, string | string[] | undefined> | undefined): SearchQuery {
  const g = (k: string) => {
    const v = sp?.[k];
    return Array.isArray(v) ? v[0] : v;
  };
  const limit = Math.min(50, Math.max(5, Number(g("limit") || 20) || 20));
  const page = Math.max(1, Number(g("page") || 1) || 1);
  const sort = (g("sort") as SortKey) || "year-desc";
  const license = (g("license") as SearchQuery["license"]) || "all";
  return {
    q: g("q") || "",
    c: g("c") || "",
    sort: ["year-desc", "year-asc", "title-asc", "title-desc"].includes(sort) ? sort : "year-desc",
    limit,
    page,
    license: ["all", "free", "premium"].includes(license || "") ? license : "all",
    startDate: g("startDate") || g("startYear") || "",
    endDate: g("endDate") || g("endYear") || "",
  };
}

export function runSearch(query: SearchQuery): {
  results: LegalDocument[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
} {
  const cat = categories.some((c) => c.id === query.c) ? (query.c as CategoryId) : undefined;
  let list = searchDocuments(query.q || "", cat || "all");

  // license: all free in demo except we mark none premium for now — premium empty unless tagged
  if (query.license === "premium") {
    list = list.filter((d) => d.tags.includes("premium"));
  } else if (query.license === "free") {
    list = list.filter((d) => !d.tags.includes("premium"));
  }

  const startY = query.startDate ? Number(query.startDate) : undefined;
  const endY = query.endDate ? Number(query.endDate) : undefined;
  if (startY && !Number.isNaN(startY)) list = list.filter((d) => d.year >= startY);
  if (endY && !Number.isNaN(endY)) list = list.filter((d) => d.year <= endY);

  switch (query.sort) {
    case "year-asc":
      list = [...list].sort((a, b) => a.year - b.year || a.title.localeCompare(b.title));
      break;
    case "title-asc":
      list = [...list].sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "title-desc":
      list = [...list].sort((a, b) => b.title.localeCompare(a.title));
      break;
    default:
      list = [...list].sort((a, b) => b.year - a.year || a.title.localeCompare(b.title));
  }

  const total = list.length;
  const limit = query.limit || 20;
  const page = query.page || 1;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const start = (page - 1) * limit;
  const results = list.slice(start, start + limit);
  return { results, total, page, limit, totalPages };
}

export function buildSearchHref(base: Partial<SearchQuery> & Record<string, string | number | undefined>) {
  const params = new URLSearchParams();
  Object.entries(base).forEach(([k, v]) => {
    if (v === undefined || v === null || v === "" || v === "all") return;
    params.set(k, String(v));
  });
  const s = params.toString();
  return s ? `/s?${s}` : "/s";
}

export function pageCountFor(docId: string, bodyLen: number) {
  const m = (pdfMeta as Record<string, { pages?: number }>)[docId];
  if (m?.pages) return m.pages;
  return Math.max(1, Math.ceil(bodyLen / 1800));
}

export function categoryLabel(id?: string) {
  return categories.find((c) => c.id === id)?.label || "All";
}

export { documents, categories };
