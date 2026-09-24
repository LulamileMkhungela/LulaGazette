"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useAudience, type Audience } from "@/context/AudienceContext";
import { useAuth } from "@/context/AuthContext";
import { buildSearchHref } from "@/lib/search";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { audience, setAudience, isLawyer, label } = useAudience();
  const { user, isAuthenticated, logout } = useAuth();
  const [q, setQ] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [audOpen, setAudOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const audRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  const isHome = pathname === "/";

  const individualNav = [
    { href: "/guides", label: "I need help" },
    { href: "/s?c=acts&sort=year-desc&limit=20&page=1", label: "Acts" },
    { href: "/s?c=cases&sort=year-desc&limit=20&page=1", label: "Cases" },
    { href: "/s?c=court-forms&sort=year-desc&limit=20&page=1", label: "Forms" },
    { href: "/templates?aud=individual", label: "Templates" },
    { href: "/directory", label: "Directory" },
  ];

  const lawyerNav = [
    { href: "/s?c=acts&sort=year-desc&limit=20&page=1", label: "Acts" },
    { href: "/s?c=cases&sort=year-desc&limit=20&page=1", label: "Cases" },
    { href: "/s?c=court-rules&sort=year-desc&limit=20&page=1", label: "Rules" },
    { href: "/courts", label: "Courts" },
    { href: "/templates?aud=lawyer", label: "Drafts" },
    { href: "/lawyers", label: "Matters" },
    { href: "/directory", label: "Directory" },
  ];

  const nav = isLawyer ? lawyerNav : individualNav;

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!audRef.current?.contains(e.target as Node)) setAudOpen(false);
      if (!userRef.current?.contains(e.target as Node)) setUserOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  function onSearch(e: FormEvent) {
    e.preventDefault();
    const query = q.trim();
    router.push(buildSearchHref({ q: query || undefined, sort: "year-desc", limit: 20, page: 1 }));
    setMenuOpen(false);
  }

  function pickAudience(a: Audience) {
    setAudience(a);
    setAudOpen(false);
  }

  return (
    <header className="sticky top-0 z-[5] border-b border-[#E5EEF5] bg-white">
      <div className="py-3">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-4 lg:gap-8 lg:px-6">
          <div className="flex shrink-0 flex-row items-center gap-5">
            <Link href="/" className="w-28 cursor-pointer sm:w-32" aria-label="LulaGazette home">
              <Image
                src="/images/logo.svg"
                alt="LulaGazette"
                width={160}
                height={32}
                priority
                className="h-8 w-auto"
              />
            </Link>
          </div>

          {/* Audience-specific tabs on inner pages */}
          {!isHome && (
            <nav className="ml-2 hidden min-w-0 flex-1 items-center gap-0.5 lg:flex" aria-label="Main">
              {nav.map((n) => {
                const base = n.href.split("?")[0];
                const active =
                  pathname === base ||
                  pathname.startsWith(base + "/") ||
                  (base === "/s" && (pathname === "/s" || pathname.startsWith("/c/")));
                return (
                  <Link
                    key={n.href + n.label}
                    href={n.href}
                    className={`whitespace-nowrap rounded-lg px-2.5 py-1.5 text-sm font-medium transition ${
                      active
                        ? "bg-[#0C68BE]/10 text-[#0C68BE]"
                        : "text-[#1D2E40] hover:bg-[#F5F8FB] hover:text-[#0B151F]"
                    }`}
                  >
                    {n.label}
                  </Link>
                );
              })}
            </nav>
          )}

          {!isHome && (
            <form
              onSubmit={onSearch}
              className={`header-desktop-search hidden min-w-0 max-w-xl flex-1 justify-center md:flex ${
                isHome ? "" : "lg:max-w-xs"
              }`}
            >
              <div className="relative w-full">
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search for a document or ask a question"
                  className="w-full rounded-lg border border-[#E5EEF5] bg-white py-2.5 pl-4 pr-11 text-sm text-[#112130] outline-none placeholder:text-[#86929E] focus:border-[#0C68BE] focus:ring-2 focus:ring-[#0C68BE]/15"
                />
                <button
                  type="submit"
                  aria-label="Search"
                  className="absolute right-1.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md bg-[#0C68BE] text-white"
                >
                  <Image src="/icons/search.svg" alt="" width={14} height={14} className="invert" />
                </button>
              </div>
            </form>
          )}

          <div className={`flex shrink-0 items-center gap-3 sm:gap-5 ${isHome ? "ml-auto" : ""}`}>
            <div className="header-desktop-account hidden items-center gap-3 lg:flex">
              <div className="relative" ref={audRef}>
                <button
                  type="button"
                  onClick={() => setAudOpen((v) => !v)}
                  className="text-sm font-medium text-[#0C68BE] hover:underline"
                  aria-haspopup="listbox"
                  aria-expanded={audOpen}
                >
                  {label}
                </button>
                {audOpen && (
                  <ul
                    role="listbox"
                    className="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-lg border border-[#E5EEF5] bg-white py-1 shadow-lg"
                  >
                    <li>
                      <button
                        type="button"
                        role="option"
                        aria-selected={audience === "individual"}
                        onClick={() => pickAudience("individual")}
                        className={`flex w-full flex-col px-3 py-2.5 text-left hover:bg-[#F5F8FB] ${
                          audience === "individual" ? "bg-[#0C68BE]/5" : ""
                        }`}
                      >
                        <span className="text-sm font-semibold text-[#112130]">Individual</span>
                        <span className="text-xs text-[#677480]">Guides, plain forms, everyday laws</span>
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        role="option"
                        aria-selected={audience === "lawyer"}
                        onClick={() => pickAudience("lawyer")}
                        className={`flex w-full flex-col px-3 py-2.5 text-left hover:bg-[#F5F8FB] ${
                          audience === "lawyer" ? "bg-[#0C68BE]/5" : ""
                        }`}
                      >
                        <span className="text-sm font-semibold text-[#112130]">Lawyer</span>
                        <span className="text-xs text-[#677480]">Procedure, drafts, matter notes</span>
                      </button>
                    </li>
                  </ul>
                )}
              </div>

              {isAuthenticated && user ? (
                <div className="relative" ref={userRef}>
                  <button
                    type="button"
                    onClick={() => setUserOpen((v) => !v)}
                    className="flex items-center gap-1.5 rounded-md px-1 text-sm font-semibold text-[#0C68BE] hover:underline"
                  >
                    <span>{user.name.split(" ")[0]}</span>
                    <span className="text-xs">▼</span>
                  </button>
                  {userOpen && (
                    <div className="absolute right-0 z-50 mt-2 w-48 overflow-hidden rounded-lg border border-[#E5EEF5] bg-white py-1 shadow-lg">
                      <div className="border-b border-[#E5EEF5] px-3 py-2 text-xs text-[#677480]">
                        <p className="font-semibold text-[#112130]">{user.name}</p>
                        <p className="truncate">{user.email}</p>
                      </div>
                      <Link
                        href="/account"
                        onClick={() => setUserOpen(false)}
                        className="block px-3 py-2 text-xs text-[#112130] hover:bg-[#F5F8FB]"
                      >
                        My Account
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setUserOpen(false);
                        }}
                        className="block w-full px-3 py-2 text-left text-xs text-rose-600 hover:bg-rose-50"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link href="/sign-in" className="rounded-md px-1 text-sm font-semibold text-[#0C68BE] hover:underline">
                  Sign In
                </Link>
              )}
            </div>

            <button
              type="button"
              className="header-mobile-menu rounded-md p-2 text-[#112130] hover:bg-[#F5F8FB] lg:hidden"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-label="Menu"
            >
              {menuOpen ? (
                <span className="text-sm font-semibold">Close</span>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Always-visible mode strip so the switch is obvious */}
      <div
        className={`border-t px-4 py-1.5 text-[11px] sm:px-6 ${
          isLawyer ? "border-violet-100 bg-violet-50/80 text-violet-900" : "border-sky-100 bg-sky-50/80 text-sky-900"
        }`}
      >
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-2">
          <p>
            <span className="font-semibold">{label}</span>
            {isLawyer
              ? " — authorities, procedure, drafts and matter notes. Not a substitute for your professional judgment."
              : " — plain guides and everyday laws. Information only, not a free lawyer."}
          </p>
          <p className="hidden text-[10px] font-medium uppercase tracking-wide opacity-80 sm:block">
            Switch anytime (top right)
          </p>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-[#E5EEF5] bg-white px-4 py-3 lg:hidden">
          <form onSubmit={onSearch} className="mb-3">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search for a document or ask a question"
              className="w-full rounded-lg border border-[#E5EEF5] px-4 py-2.5 text-sm"
            />
          </form>
          <p className="mb-2 text-xs text-[#86929E]">Viewing as {label}</p>
          <div className="mb-3 flex gap-2">
            <button
              type="button"
              onClick={() => pickAudience("individual")}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                audience === "individual" ? "bg-[#0C68BE] text-white" : "bg-[#F5F8FB] text-[#112130]"
              }`}
            >
              Individual
            </button>
            <button
              type="button"
              onClick={() => pickAudience("lawyer")}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                audience === "lawyer" ? "bg-[#0C68BE] text-white" : "bg-[#F5F8FB] text-[#112130]"
              }`}
            >
              Lawyer
            </button>
          </div>
          <nav className="flex flex-col text-sm font-medium text-[#112130]">
            {nav.map((n) => (
              <Link key={n.href + n.label} href={n.href} className="py-2.5" onClick={() => setMenuOpen(false)}>
                {n.label}
              </Link>
            ))}
            <Link href="/pricing" className="py-2.5" onClick={() => setMenuOpen(false)}>
              Pricing
            </Link>
            <Link href="/contact" className="py-2.5" onClick={() => setMenuOpen(false)}>
              Contact Us
            </Link>
            {isAuthenticated && user ? (
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="py-2.5 text-left text-sm font-medium text-rose-600"
              >
                Sign Out ({user.name})
              </button>
            ) : (
              <Link href="/sign-in" className="py-2.5 text-[#0C68BE]" onClick={() => setMenuOpen(false)}>
                Sign In
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
