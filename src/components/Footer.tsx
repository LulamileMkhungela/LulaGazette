"use client";

import Image from "next/image";
import Link from "next/link";
import { useAudience } from "@/context/AudienceContext";

export function Footer() {
  const { isLawyer, label } = useAudience();

  const product = isLawyer
    ? [
        { href: "/lawyers", label: "Matter workspace" },
        { href: "/templates?aud=lawyer", label: "Draft templates" },
        { href: "/pricing", label: "Pro Features" },
      ]
    : [
        { href: "/guides", label: "I need help" },
        { href: "/s?sort=year-desc&limit=20&page=1", label: "Free trial" },
        { href: "/pricing", label: "Pro Features" },
      ];

  const explore = isLawyer
    ? [
        { href: "/s?c=acts&sort=year-desc&limit=20&page=1", label: "Acts" },
        { href: "/s?c=cases&sort=year-desc&limit=20&page=1", label: "Cases" },
        { href: "/s?c=court-rules&sort=year-desc&limit=20&page=1", label: "Court rules" },
        { href: "/courts", label: "Courts & procedure" },
        { href: "/directory", label: "Directory" },
      ]
    : [
        { href: "/guides", label: "Problem guides" },
        { href: "/s?c=acts&sort=year-desc&limit=20&page=1", label: "Acts" },
        { href: "/s?c=court-forms&sort=year-desc&limit=20&page=1", label: "Court forms" },
        { href: "/templates?aud=individual", label: "Everyday templates" },
        { href: "/directory", label: "Where do I go?" },
      ];

  return (
    <footer className="relative z-50 bg-[#112130]/95 py-5 text-white">
      <div className="container mx-auto max-w-[1200px] px-4 lg:px-6">
        <div className="flex flex-col items-stretch justify-between py-8 lg:flex-row">
          <div className="mb-8 flex flex-col justify-between gap-5 lg:mb-0">
            <Link href="/">
              <Image
                src="/images/logo.svg"
                alt="LulaGazette"
                width={140}
                height={28}
                className="h-7 w-auto brightness-0 invert"
              />
            </Link>
            <p className="max-w-xs text-sm text-[#86929E]">
              {isLawyer
                ? "Library and drafting support for South African practitioners — educational, not a practice-management suite."
                : "South African legal information for people with everyday questions — Acts, forms, guides and where to go next."}
            </p>
            <p className="text-xs font-semibold text-[#0C68BE]">{label}</p>
            <p className="text-sm text-[#86929E]">© {new Date().getFullYear()}. All Rights Reserved</p>
          </div>

          <div className="footer-navigation-groups flex flex-col items-start gap-10 lg:flex-row lg:gap-14">
            <FooterCol title="Product" links={product} />
            <FooterCol title="Explore" links={explore} />
            <FooterCol
              title="Company"
              links={[
                { href: "/pricing", label: "Pricing" },
                { href: "/faq", label: "FAQ(s)" },
                { href: "/support", label: "Help & Support" },
                { href: "/contact", label: "Contact Us" },
              ]}
            />
            <FooterCol
              title="Legal"
              links={[
                { href: "/terms", label: "Terms of service" },
                { href: "/privacy", label: "Privacy Policy" },
                { href: "/legal/status", label: "Platform status" },
              ]}
            />
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <p className="mb-3 text-sm text-[#86929E]">{title}</p>
      <ul className="flex flex-col gap-1">
        {links.map((l) => (
          <li key={l.href + l.label}>
            <Link href={l.href} className="text-sm text-white/90 hover:text-white hover:underline">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
