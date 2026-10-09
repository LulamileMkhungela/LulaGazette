"use client";

import Link from "next/link";
import { useAudience } from "@/context/AudienceContext";
import { useAuth } from "@/context/AuthContext";
import { getCountryByCode } from "@/data/africanCountries";

export function HomeNextSteps() {
  const { isLawyer } = useAudience();
  const { selectedCountry } = useAuth();
  const countryCode = (selectedCountry || "ZA").toUpperCase();
  const countryObj = getCountryByCode(selectedCountry);

  function getDirectoryTeaser(): string {
    if (countryCode === "ZA") {
      return "Courts, CCMA, Legal Aid, regulators — directory gallery.";
    }
    if (countryCode === "NA") {
      return "Supreme Court, Labour Commissioner, Legal Assistance Centre, NamRA — directory gallery.";
    }
    if (countryCode === "KE") {
      return "Supreme Court, ELRC, National Legal Aid, KRA — directory gallery.";
    }
    if (countryCode === "NG") {
      return "Supreme Court, Industrial Court, Legal Aid Council, FIRS — directory gallery.";
    }
    if (countryCode === "GH") {
      return "Supreme Court, Labour Commission, Legal Aid Commission, GRA — directory gallery.";
    }
    if (countryObj) {
      return `${countryObj.apexCourt}, tribunals, legal aid, regulators — directory gallery.`;
    }
    return "Apex courts, tribunals, legal aid, regulators — Pan-African directory.";
  }

  const items = isLawyer
    ? [
        {
          href: "/workspace",
          title: "Matter notes",
          body: `Keep matter folders, headnotes and filing checklists for ${countryObj ? countryObj.name : "active matters"}.`,
        },
        {
          href: "/templates?aud=lawyer",
          title: "Draft templates",
          body: "Court-paper sketches and practice letters — always review before filing.",
        },
        {
          href: "/courts",
          title: "Courts & procedure",
          body: countryCode === "ZA"
            ? "Small Claims through High Court — fees mindset and filing maps."
            : `Apex courts through trial courts in ${countryObj ? countryObj.name : "jurisdiction"} — procedure and rules.`,
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
          body: getDirectoryTeaser(),
        },
        {
          href: "/contact",
          title: "System overview / integrate",
          body: "Book a product walkthrough or law firm integration chat.",
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
