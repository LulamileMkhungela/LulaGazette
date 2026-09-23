"use client";

import Link from "next/link";
import { useAudience } from "@/context/AudienceContext";

export function HomeNextSteps() {
  const { isLawyer } = useAudience();

  const items = isLawyer
    ? [
        {
          href: "/lawyers",
          title: "Matter notes",
          body: "Paste licensed headnotes and keep procedure checklists on this device.",
        },
        {
          href: "/templates?aud=lawyer",
          title: "Draft templates",
          body: "Court-paper sketches and practice letters — always review before filing.",
        },
        {
          href: "/courts",
          title: "Courts & procedure",
          body: "Small Claims through High Court — fees mindset and filing maps.",
        },
      ]
    : [
        {
          href: "/guides",
          title: "I need help",
          body: "Fired, eviction, debt, consumer issues — step by step in plain language.",
        },
        {
          href: "/directory",
          title: "Where do I go?",
          body: "Courts, CCMA, Legal Aid, regulators — directory gallery.",
        },
        {
          href: "/contact",
          title: "System overview / integrate",
          body: "Not a lawyer — book a product walkthrough or integration chat.",
        },
      ];

  return (
    <section className="border-t border-[#E5EEF5] bg-white">
      <div className="mx-auto grid max-w-6xl gap-3 px-4 py-10 sm:grid-cols-3 sm:px-6">
        {items.map((x) => (
          <Link
            key={x.href + x.title}
            href={x.href}
            className="rounded-2xl border border-[#E5EEF5] bg-[#FAFDFF] p-5 text-left transition hover:border-[#0C68BE]/30 hover:bg-white hover:shadow-sm"
          >
            <h2 className="font-semibold text-[#0B151F]">{x.title}</h2>
            <p className="mt-1.5 text-sm leading-6 text-[#677480]">{x.body}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
