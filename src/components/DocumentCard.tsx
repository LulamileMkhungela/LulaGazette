import Link from "next/link";
import { categories, LegalDocument } from "@/data/legal";
import { pageCountFor } from "@/lib/search";

export function DocumentCard({
  doc,
  audienceLabel,
}: {
  doc: LegalDocument;
  audienceLabel?: string;
}) {
  const cat = categories.find((c) => c.id === doc.category);
  const pages = pageCountFor(doc.id, doc.body.length);

  return (
    <Link
      href={`/d/${doc.id}`}
      className="group block rounded-xl border border-[#E5EEF5] bg-white p-5 transition hover:border-[#0C68BE]/30 hover:shadow-sm"
    >
      <div className="flex flex-wrap items-center gap-2">
        <span
          className="rounded px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-white"
          style={{ backgroundColor: cat?.color ?? "#0C68BE" }}
        >
          {cat?.label ?? doc.category}
        </span>
        <span className="rounded bg-[#F5F8FB] px-2.5 py-0.5 text-[11px] font-medium text-[#677480]">
          {doc.year}
        </span>
        <span className="rounded bg-emerald-50 px-2.5 py-0.5 text-[11px] font-medium text-[#298D62]">Free</span>
        <span className="text-[11px] text-[#86929E]">
          {pages} {pages === 1 ? "page" : "pages"}
        </span>
        {audienceLabel && (
          <span className="rounded bg-slate-50 px-2.5 py-0.5 text-[11px] font-medium text-[#86929E] ring-1 ring-[#E5EEF5]">
            {audienceLabel}
          </span>
        )}
      </div>
      <h3 className="mt-3 text-lg font-semibold text-[#0B151F] group-hover:text-[#0C68BE]">{doc.title}</h3>
      <p className="mt-1 text-sm font-medium text-[#0C68BE]">{doc.citation}</p>
      <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#677480]">{doc.summary}</p>
    </Link>
  );
}
