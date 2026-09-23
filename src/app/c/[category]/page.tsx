import { redirect } from "next/navigation";
import { categories } from "@/data/legal";
import { buildSearchHref } from "@/lib/search";

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.id }));
}

export default function CollectionRedirect({
  params,
  searchParams,
}: {
  params: { category: string };
  searchParams?: { sort?: string; startYear?: string; startDate?: string; q?: string };
}) {
  const cat = categories.find((c) => c.id === params.category);
  const sort = (searchParams?.sort as "year-desc" | "year-asc" | "title-asc" | "title-desc") || "year-desc";
  redirect(
    buildSearchHref({
      c: cat?.id,
      q: searchParams?.q,
      sort,
      startDate: searchParams?.startDate || searchParams?.startYear,
      limit: 20,
      page: 1,
    })
  );
}
