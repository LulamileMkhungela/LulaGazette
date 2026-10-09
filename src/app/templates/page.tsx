"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AudienceBadge } from "@/components/AudienceChrome";
import { useAudience } from "@/context/AudienceContext";
import { templates } from "@/data/templates";

export default function TemplatesPage() {
  const { audience, setAudience, isLawyer } = useAudience();
  const sp = useSearchParams();
  const audParam = sp.get("aud");
  // URL can force filter once
  const initial = audParam === "lawyer" || audParam === "individual" ? audParam : null;
  const [filter, setFilter] = useState<"all" | "individual" | "lawyer">(initial ?? "all");

  useEffect(() => {
    // Header Individual/Lawyer switch resets filter to follow mode
    setFilter("all");
  }, [audience]);

  const list = useMemo(() => {
    const mode = filter === "all" ? audience : filter;
    return templates.filter((t) => {
      if (mode === "lawyer") return t.audience.includes("lawyer") || t.audience.includes("business");
      // individual: citizen-focused + shared business basics
      return t.audience.includes("citizen") || t.audience.includes("business");
    });
  }, [filter, audience]);

  const byCat = useMemo(() => {
    const map = new Map<string, typeof templates>();
    for (const t of list) {
      const arr = map.get(t.category) ?? [];
      arr.push(t);
      map.set(t.category, arr);
    }
    return Array.from(map.entries());
  }, [list]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="font-display text-4xl text-lg-navy">Forms & templates</h1>
          <p className="mt-3 max-w-2xl text-sm text-lg-muted">
            Choose who the draft is for. Individuals get plain letters and helpers; lawyers get court-paper sketches and
            practice drafts. Always review before you serve or file.
          </p>
        </div>
        <AudienceBadge />
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {(
          [
            ["all", "Match my mode"],
            ["individual", "Individuals only"],
            ["lawyer", "Lawyers only"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => {
              setFilter(id);
              if (id === "individual" || id === "lawyer") setAudience(id);
            }}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
              filter === id
                ? "bg-lg-blue text-white"
                : "border border-lg-line bg-white text-lg-slate hover:border-lg-blue/40"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <p className="mt-4 text-sm text-lg-muted">
        Showing <span className="font-semibold text-lg-navy">{list.length}</span> templates for{" "}
        <span className="font-semibold">{isLawyer && filter !== "individual" ? "lawyers" : "individuals"}</span>
        {filter === "all" ? " (following top switch)" : ""}.
      </p>

      <div className="mt-8 space-y-10">
        {byCat.map(([cat, items]) => (
          <section key={cat}>
            <h2 className="text-lg font-semibold text-lg-navy">{cat}</h2>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              {items.map((t) => (
                <Link
                  key={t.id}
                  href={`/templates/${t.id}`}
                  className="rounded-2xl border border-lg-line bg-white p-5 shadow-sm transition hover:border-lg-blue/40 hover:shadow-card"
                >
                  <div className="flex flex-wrap gap-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wide text-lg-blue">{t.forum}</span>
                    {t.audience.map((a) => (
                      <span
                        key={a}
                        className="rounded-md bg-lg-wash px-2 py-0.5 text-[10px] font-semibold uppercase text-lg-soft"
                      >
                        {a === "citizen" ? "individual" : a}
                      </span>
                    ))}
                  </div>
                  <h3 className="mt-2 font-semibold text-lg-navy">{t.title}</h3>
                  <p className="mt-2 text-sm text-lg-muted">{t.description}</p>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
