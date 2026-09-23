import { SearchResultsClient } from "@/components/SearchResultsClient";
import { parseSearchParams, runSearch } from "@/lib/search";

export const metadata = {
  title: "Search",
  description: "Search South African Acts, cases, court forms, rules, regulations and provincial laws.",
};

export default function SearchPage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const query = parseSearchParams(searchParams);
  const { results, total, totalPages } = runSearch(query);

  return (
    <SearchResultsClient query={query} results={results} total={total} totalPages={totalPages} />
  );
}
