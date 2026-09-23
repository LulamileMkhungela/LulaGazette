import { redirect } from "next/navigation";
import { buildSearchHref } from "@/lib/search";

/** Older /search URLs land on /s with the same filters. */
export default function SearchRedirectPage({
  searchParams,
}: {
  searchParams?: {
    q?: string;
    category?: string;
    c?: string;
    sort?: string;
    startYear?: string;
    startDate?: string;
    endDate?: string;
    endYear?: string;
    license?: string;
    limit?: string;
    page?: string;
  };
}) {
  const sp = searchParams || {};
  redirect(
    buildSearchHref({
      q: sp.q,
      c: sp.c || sp.category,
      sort: (sp.sort as "year-desc" | "year-asc" | "title-asc" | "title-desc") || "year-desc",
      startDate: sp.startDate || sp.startYear,
      endDate: sp.endDate || sp.endYear,
      license: (sp.license as "all" | "free" | "premium") || "all",
      limit: sp.limit ? Number(sp.limit) : 20,
      page: sp.page ? Number(sp.page) : 1,
    })
  );
}
