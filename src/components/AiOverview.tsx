"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { AiOverviewResult } from "@/lib/aiOverview";

export function AiOverviewPanel({
  result,
  compact = false,
}: {
  result: AiOverviewResult;
  compact?: boolean;
}) {
  const [tab, setTab] = useState<"overview" | "position" | "actions" | "cites">("overview");
  const confColor =
    result.confidence === "high" ? "bg-emerald-500" : result.confidence === "medium" ? "bg-amber-400" : "bg-slate-400";

  return (
    <section className="overflow-hidden rounded-3xl border border-lg-blue/20 bg-gradient-to-br from-[#0C68BE]/[0.07] via-white to-emerald-50/40 shadow-soft">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-lg-blue/10 px-5 py-4 sm:px-6">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl bg-lg-blue text-sm font-bold text-white shadow-soft">
            AI
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-semibold text-lg-navy sm:text-xl">{result.headline}</h2>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-lg-muted ring-1 ring-lg-line">
                <span className={`h-1.5 w-1.5 rounded-full ${confColor}`} />
                {result.confidence} match
              </span>
            </div>
            <p className="mt-1 text-xs text-lg-muted">
              Grounded in LulaGazette’s South African library · not live Lexis/Lexpro · verify before filing
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-1 overflow-x-auto border-b border-lg-line/80 px-3 pt-2 sm:px-4">
        {(
          [
            ["overview", "Plain English"],
            ["position", "Legal position"],
            ["actions", "What to do"],
            ["cites", "Citations"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={`whitespace-nowrap rounded-t-xl px-3 py-2 text-sm font-semibold transition ${
              tab === id
                ? "bg-white text-lg-blue shadow-[0_-1px_0_#fff]"
                : "text-lg-muted hover:text-lg-navy"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="bg-white/80 px-5 py-5 sm:px-6">
        {tab === "overview" && (
          <div className="space-y-4">
            <p className="text-[15px] leading-7 text-lg-slate">{result.plainEnglish}</p>
            {!compact && (
              <div className="grid gap-3 sm:grid-cols-2">
                <Tip title="For everyone" body={result.audienceTips.citizens} />
                <Tip title="For lawyers" body={result.audienceTips.lawyers} />
              </div>
            )}
          </div>
        )}

        {tab === "position" && (
          <pre className="whitespace-pre-wrap font-sans text-[15px] leading-7 text-lg-slate">
            {result.legalPosition}
          </pre>
        )}

        {tab === "actions" && (
          <div className="space-y-4">
            <ol className="list-decimal space-y-2 pl-5 text-[15px] leading-7 text-lg-slate">
              {result.whatYouCanDo.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ol>
            <div className="grid gap-2 sm:grid-cols-2">
              {result.nextSteps.map((s) => (
                <Link
                  key={s.href + s.label}
                  href={s.href}
                  className="rounded-2xl border border-lg-line bg-lg-wash/70 p-3 transition hover:border-lg-blue/40 hover:bg-white"
                >
                  <p className="text-sm font-semibold text-lg-navy">{s.label}</p>
                  <p className="mt-1 text-xs text-lg-muted">{s.reason}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {tab === "cites" && (
          <ul className="space-y-2">
            {result.citations.map((c) => (
              <li key={c.type + c.id}>
                <Link
                  href={c.href}
                  className="flex flex-wrap items-baseline gap-2 rounded-xl border border-lg-line bg-white px-3 py-2 hover:border-lg-blue/40"
                >
                  <span className="rounded-md bg-lg-blue/10 px-1.5 py-0.5 text-[10px] font-bold uppercase text-lg-blue">
                    {c.type}
                  </span>
                  <span className="text-sm font-semibold text-lg-navy">{c.title}</span>
                  <span className="text-xs text-lg-muted">{c.citation}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-5 rounded-xl border border-amber-200/80 bg-amber-50/90 px-3 py-2.5 text-[11px] leading-5 text-amber-950">
          {result.warnings[0]} {result.warnings[1]}
        </div>
      </div>
    </section>
  );
}

function Tip({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-lg-line bg-lg-wash/60 p-3">
      <p className="text-xs font-bold uppercase tracking-wide text-lg-blue">{title}</p>
      <p className="mt-1 text-sm leading-6 text-lg-muted">{body}</p>
    </div>
  );
}

/** Client search box that can optionally show a live AI overview preview via callback URL navigation */
export function AiAskBar({ initialQuery = "" }: { initialQuery?: string }) {
  const [q, setQ] = useState(initialQuery);
  const placeholder = useMemo(
    () => "Ask in plain English — e.g. “my landlord locked me out” or “CCMA unfair dismissal 30 days”",
    []
  );

  return (
    <form action="/search" method="get" className="w-full">
      <input type="hidden" name="ai" value="1" />
      <div className="relative">
        <input
          name="q"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-full border border-lg-line bg-white py-4 pl-5 pr-28 text-sm shadow-card outline-none ring-lg-blue/20 focus:border-lg-blue focus:ring-4 sm:text-base"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-lg-blue px-4 py-2.5 text-sm font-semibold text-white hover:bg-lg-blue-bright"
        >
          AI Overview
        </button>
      </div>
    </form>
  );
}
