"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { buildSearchHref } from "@/lib/search";
import { useAuth } from "@/context/AuthContext";
import { useAudience } from "@/context/AudienceContext";

const POPULAR_INDIVIDUAL = [
  "CCMA unfair dismissal",
  "Consumer Protection refund",
  "PIE eviction notice",
  "POPIA data deletion",
  "Small Claims starter",
  "BCEA leave & hours",
];

const POPULAR_LAWYER = [
  "Uniform Rules of Court",
  "Rule 6 Notice of Motion",
  "Companies Act directors",
  "Section 189 retrenchment",
  "Superior Courts Act",
  "S v Makwanyane ratio",
];

export function SearchBox({
  large = false,
  initialQuery = "",
  category,
}: {
  large?: boolean;
  initialQuery?: string;
  category?: string;
}) {
  const router = useRouter();
  const { selectedCountry } = useAuth();
  const { audience } = useAudience();
  const [q, setQ] = useState(initialQuery);

  const popular = audience === "lawyer" ? POPULAR_LAWYER : POPULAR_INDIVIDUAL;

  function go(query: string) {
    const countryParam = selectedCountry && selectedCountry !== "all" ? selectedCountry : undefined;
    router.push(
      buildSearchHref({
        q: query.trim() || undefined,
        c: category && category !== "all" ? category : undefined,
        country: countryParam,
        aud: audience,
        sort: "year-desc",
        limit: 20,
        page: 1,
      })
    );
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    go(q);
  }

  return (
    <div className="w-full">
      <form onSubmit={onSubmit} className="relative mx-auto w-full max-w-3xl">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search for a document or ask a question"
          className={`w-full rounded-full border border-[#E5EEF5] bg-white text-[#112130] shadow-[0_10px_40px_rgba(11,21,31,0.08)] outline-none transition placeholder:text-[#86929E] focus:border-[#0C68BE] focus:ring-4 focus:ring-[#0C68BE]/20 ${
            large ? "px-6 py-4 pr-14 text-base sm:text-lg" : "px-5 py-3 pr-12 text-sm"
          }`}
        />
        <button
          type="submit"
          aria-label="Search"
          className={`absolute right-2 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-full bg-[#0C68BE] text-white shadow-md hover:bg-[#0F80EB] ${
            large ? "h-11 w-11" : "h-9 w-9"
          }`}
        >
          <Image src="/icons/search.svg" alt="" width={large ? 18 : 14} height={large ? 18 : 14} className="invert" />
        </button>
      </form>

      {large && (
        <div className="mx-auto mt-4 flex max-w-3xl flex-wrap justify-center gap-2">
          {popular.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => {
                setQ(s);
                go(s);
              }}
              className="rounded-full border border-[#E5EEF5] bg-white/90 px-3 py-1 text-xs text-[#677480] backdrop-blur transition hover:border-[#0C68BE] hover:text-[#0C68BE]"
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
