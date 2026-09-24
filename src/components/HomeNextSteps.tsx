"use client";

import Link from "next/link";
import { useAudience } from "@/context/AudienceContext";

export function HomeNextSteps() {
  const { isLawyer } = useAudience();

  const items = isLawyer
    ? [
        {
          href: "/sources",
          title: "⚡ Live Scraper & Gazette Puller",
          body: "Pull latest gazettes, statutory notices and judgments across African legal databases.",
        },
        {
          href: "/countries",
          title: "🌍 54 African Countries Registry",
          body: "Compare legal systems, apex courts, and national gazette publications continent-wide.",
        },
        {
          href: "/lawyers",
          title: "📁 Matter notes workspace",
          body: "Keep procedure checklists, authorities, and case notes safely stored on this device.",
        },
        {
          href: "/templates?aud=lawyer",
          title: "📝 Draft starters & court forms",
          body: "Court-paper sketches and practice letters — always review before filing.",
        },
      ]
    : [
        {
          href: "/guides",
          title: "📋 I need help (Plain Guides)",
          body: "Fired, eviction, debt, consumer issues — step by step in plain language.",
        },
        {
          href: "/sources",
          title: "⚡ Scraper & Gazette Hub",
          body: "Automated data pullers extracting official gazettes and rulings across Africa.",
        },
        {
          href: "/countries",
          title: "🌍 All 54 African Countries",
          body: "Explore national laws, courts, and gazette portals for every African nation.",
        },
        {
          href: "/directory",
          title: "🏛️ Where do I go?",
          body: "Courts, CCMA, Legal Aid, bar associations and regulatory bodies across Africa.",
        },
      ];

  return (
    <section className="border-t border-[#E5EEF5] bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold text-[#0B151F]">
            {isLawyer ? "Practitioner & Research Tools" : "Where to Start"}
          </h2>
          <span className="text-xs text-[#86929E]">Pan-African legal coverage</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((x) => (
            <Link
              key={x.href + x.title}
              href={x.href}
              className="flex flex-col justify-between rounded-2xl border border-[#E5EEF5] bg-[#FAFDFF] p-5 text-left transition hover:border-[#0C68BE]/40 hover:bg-white hover:shadow-md"
            >
              <div>
                <h3 className="font-semibold text-[#0B151F] text-sm">{x.title}</h3>
                <p className="mt-2 text-xs leading-5 text-[#677480]">{x.body}</p>
              </div>
              <span className="mt-4 text-xs font-semibold text-[#0C68BE]">Explore →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
