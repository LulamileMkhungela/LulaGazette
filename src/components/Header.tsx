"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useAudience, type Audience } from "@/context/AudienceContext";
import { useAuth } from "@/context/AuthContext";
import { buildSearchHref } from "@/lib/search";
import { africanCountries } from "@/data/africanCountries";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { audience, setAudience, isLawyer, label } = useAudience();
  const { user, isAuthenticated, logout, selectedCountry, setSelectedCountry, savedDocIds } = useAuth();

  const [q, setQ] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [audOpen, setAudOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [countryOpen, setCountryOpen] = useState(false);

  const audRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  const countryRef = useRef<HTMLDivElement>(null);
  const isHome = pathname === "/";

  // Top active African countries for quick dropdown
  const topCountries = [
    { code: "all", name: "All Africa", flag: "🌍" },
    { code: "ZA", name: "South Africa", flag: "🇿🇦" },
    { code: "KE", name: "Kenya", flag: "🇰🇪" },
    { code: "NG", name: "Nigeria", flag: "🇳🇬" },
    { code: "GH", name: "Ghana", flag: "🇬🇭" },
    { code: "UG", name: "Uganda", flag: "🇺🇬" },
    { code: "TZ", name: "Tanzania", flag: "🇹🇿" },
    { code: "RW", name: "Rwanda", flag: "🇷🇼" },
    { code: "ZW", name: "Zimbabwe", flag: "🇿🇼" },
    { code: "EG", name: "Egypt", flag: "🇪🇬" },
  ];

  const currentCountryObj =
    topCountries.find((c) => c.code.toUpperCase() === selectedCountry?.toUpperCase()) ||
    africanCountries.find((c) => c.code.toUpperCase() === selectedCountry?.toUpperCase()) ||
    topCountries[0];

  const individualNav = [
    { href: "/guides", label: "I need help" },
    { href: "/s?c=acts&sort=year-desc&limit=20&page=1", label: "Acts" },
    { href: "/s?c=cases&sort=year-desc&limit=20&page=1", label: "Cases" },
    { href: "/sources", label: "Gazettes & Scraper" },
    { href: "/countries", label: "Countries (54)" },
    { href: "/templates?aud=individual", label: "Templates" },
    { href: "/directory", label: "Directory" },
  ];

  const lawyerNav = [
    { href: "/s?c=acts&sort=year-desc&limit=20&page=1", label: "Acts" },
    { href: "/s?c=cases&sort=year-desc&limit=20&page=1", label: "Cases" },
    { href: "/s?c=court-rules&sort=year-desc&limit=20&page=1", label: "Rules" },
    { href: "/sources", label: "Gazettes & Scraper" },
    { href: "/countries", label: "Countries (54)" },
    { href: "/courts", label: "Courts" },
    { href: "/templates?aud=lawyer", label: "Drafts" },
    { href: "/lawyers", label: "Matters" },
  ];

  const nav = isLawyer ? lawyerNav : individualNav;

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!audRef.current?.contains(e.target as Node)) setAudOpen(false);
      if (!userRef.current?.contains(e.target as Node)) setUserMenuOpen(false);
      if (!countryRef.current?.contains(e.target as Node)) setCountryOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  function onSearch(e: FormEvent) {
    e.preventDefault();
    const query = q.trim();
    router.push(
      buildSearchHref({
        q: query || undefined,
        country: selectedCountry !== "all" ? selectedCountry : undefined,
        sort: "year-desc",
        limit: 20,
        page: 1,
      })
    );
    setMenuOpen(false);
  }

  function pickAudience(a: Audience) {
    setAudience(a);
    setAudOpen(false);
  }

  function pickCountry(code: string) {
    setSelectedCountry(code);
    setCountryOpen(false);
  }

  return (
    <header className="sticky top-0 z-[5] border-b border-[#E5EEF5] bg-white">
      <div className="py-2.5">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-4 px-4 lg:px-6">
          {/* Logo & Brand */}
          <div className="flex shrink-0 items-center gap-3">
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

            {/* Country Selector in Header */}
            <div className="relative hidden sm:block" ref={countryRef}>
              <button
                type="button"
                onClick={() => setCountryOpen((v) => !v)}
                className="flex items-center gap-1.5 rounded-full border border-[#E5EEF5] bg-[#F5F8FB] px-2.5 py-1 text-xs font-semibold text-[#112130] transition hover:border-[#0C68BE]"
                aria-haspopup="listbox"
                aria-expanded={countryOpen}
              >
                <span>{currentCountryObj.flag}</span>
                <span className="max-w-[100px] truncate">{currentCountryObj.name}</span>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>

              {countryOpen && (
                <div className="absolute left-0 z-50 mt-1.5 w-60 overflow-hidden rounded-2xl border border-[#E5EEF5] bg-white py-1.5 shadow-xl">
                  <div className="border-b border-[#E5EEF5] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#86929E]">
                    African Jurisdictions
                  </div>
                  <ul className="max-h-60 overflow-y-auto">
                    {topCountries.map((c) => (
                      <li key={c.code}>
                        <button
                          type="button"
                          onClick={() => pickCountry(c.code)}
                          className={`flex w-full items-center gap-2.5 px-3 py-2 text-left text-xs hover:bg-[#F5F8FB] ${
                            selectedCountry?.toUpperCase() === c.code.toUpperCase() ? "bg-[#0C68BE]/10 font-bold text-[#0C68BE]" : "text-[#112130]"
                          }`}
                        >
                          <span className="text-base">{c.flag}</span>
                          <span>{c.name}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div className="border-t border-[#E5EEF5] p-2 bg-[#F5F8FB]">
                    <Link
                      href="/countries"
                      onClick={() => setCountryOpen(false)}
                      className="block text-center text-[11px] font-semibold text-[#0C68BE] hover:underline"
                    >
                      Browse all 54 African countries →
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation on inner pages */}
          {!isHome && (
            <nav className="ml-2 hidden min-w-0 flex-1 items-center gap-0.5 xl:flex" aria-label="Main">
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
                    className={`whitespace-nowrap rounded-lg px-2.5 py-1.5 text-xs font-semibold transition ${
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

          {/* Search Bar in Header */}
          {!isHome && (
            <form
              onSubmit={onSearch}
              className={`header-desktop-search hidden min-w-0 max-w-sm flex-1 justify-center md:flex`}
            >
              <div className="relative w-full">
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search Acts, cases, gazettes across Africa..."
                  className="w-full rounded-xl border border-[#E5EEF5] bg-white py-2 pl-3.5 pr-10 text-xs text-[#112130] outline-none placeholder:text-[#86929E] focus:border-[#0C68BE] focus:ring-2 focus:ring-[#0C68BE]/15"
                />
                <button
                  type="submit"
                  aria-label="Search"
                  className="absolute right-1 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-lg bg-[#0C68BE] text-white hover:bg-[#0F80EB]"
                >
                  <Image src="/icons/search.svg" alt="" width={12} height={12} className="invert" />
                </button>
              </div>
            </form>
          )}

          {/* Right Action: Audience switcher + Auth menu */}
          <div className={`flex shrink-0 items-center gap-2.5 sm:gap-4 ${isHome ? "ml-auto" : ""}`}>
            {/* Quick Link to Scraper Hub */}
            <Link
              href="/sources"
              className="hidden lg:flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-800 hover:bg-emerald-100"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Scraper Hub</span>
            </Link>

            {/* Audience Toggle (Individual / Lawyer) */}
            <div className="relative hidden sm:block" ref={audRef}>
              <button
                type="button"
                onClick={() => setAudOpen((v) => !v)}
                className="text-xs font-semibold text-[#0C68BE] hover:underline"
                aria-haspopup="listbox"
                aria-expanded={audOpen}
              >
                {label}
              </button>
              {audOpen && (
                <ul
                  role="listbox"
                  className="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-2xl border border-[#E5EEF5] bg-white py-1 shadow-xl"
                >
                  <li>
                    <button
                      type="button"
                      role="option"
                      aria-selected={audience === "individual"}
                      onClick={() => pickAudience("individual")}
                      className={`flex w-full flex-col px-3.5 py-2.5 text-left hover:bg-[#F5F8FB] ${
                        audience === "individual" ? "bg-[#0C68BE]/5" : ""
                      }`}
                    >
                      <span className="text-xs font-bold text-[#112130]">Individual</span>
                      <span className="text-[11px] text-[#677480]">Guides, plain forms, everyday laws</span>
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      role="option"
                      aria-selected={audience === "lawyer"}
                      onClick={() => pickAudience("lawyer")}
                      className={`flex w-full flex-col px-3.5 py-2.5 text-left hover:bg-[#F5F8FB] ${
                        audience === "lawyer" ? "bg-[#0C68BE]/5" : ""
                      }`}
                    >
                      <span className="text-xs font-bold text-[#112130]">Lawyer / Scholar</span>
                      <span className="text-[11px] text-[#677480]">Procedure, drafts, matter workspace</span>
                    </button>
                  </li>
                </ul>
              )}
            </div>

            {/* Authentication Control */}
            {isAuthenticated && user ? (
              <div className="relative" ref={userRef}>
                <button
                  type="button"
                  onClick={() => setUserMenuOpen((v) => !v)}
                  className="flex items-center gap-2 rounded-full border border-[#E5EEF5] bg-white p-1 pr-2.5 hover:border-[#0C68BE]"
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0C68BE] text-xs font-bold text-white">
                    {user.avatarText}
                  </div>
                  <span className="text-xs font-semibold text-[#112130] hidden md:inline truncate max-w-[100px]">
                    {user.name.split(" ")[0]}
                  </span>
                  <span className="text-xs">{user.flag}</span>
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 z-50 mt-2 w-64 overflow-hidden rounded-2xl border border-[#E5EEF5] bg-white py-1.5 shadow-xl">
                    <div className="border-b border-[#E5EEF5] px-4 py-2.5">
                      <p className="text-xs font-bold text-[#0B151F]">{user.name}</p>
                      <p className="text-[11px] text-[#0C68BE] font-medium">{user.roleTitle}</p>
                      <p className="text-[11px] text-[#86929E] truncate">{user.email}</p>
                    </div>

                    <div className="py-1">
                      <Link
                        href="/account"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center justify-between px-4 py-2 text-xs font-medium text-[#112130] hover:bg-[#F5F8FB]"
                      >
                        <span>My Account &amp; Settings</span>
                      </Link>
                      <Link
                        href="/account#saved"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center justify-between px-4 py-2 text-xs font-medium text-[#112130] hover:bg-[#F5F8FB]"
                      >
                        <span>Saved Documents</span>
                        <span className="rounded-full bg-sky-100 px-2 py-0.5 text-[10px] font-bold text-[#0C68BE]">
                          {savedDocIds.length}
                        </span>
                      </Link>
                      <Link
                        href="/sources"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center justify-between px-4 py-2 text-xs font-medium text-[#112130] hover:bg-[#F5F8FB]"
                      >
                        <span>Scraper &amp; Gazettes</span>
                        <span className="text-[10px] text-emerald-600 font-semibold">Live</span>
                      </Link>
                      <Link
                        href="/countries"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center justify-between px-4 py-2 text-xs font-medium text-[#112130] hover:bg-[#F5F8FB]"
                      >
                        <span>African Countries (54)</span>
                      </Link>
                      <Link
                        href="/lawyers"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center justify-between px-4 py-2 text-xs font-medium text-[#112130] hover:bg-[#F5F8FB]"
                      >
                        <span>Matter Workspace</span>
                      </Link>
                    </div>

                    <div className="border-t border-[#E5EEF5] pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          logout();
                          setUserMenuOpen(false);
                          router.push("/");
                        }}
                        className="w-full px-4 py-2 text-left text-xs font-medium text-rose-600 hover:bg-rose-50"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/sign-in"
                className="rounded-full bg-[#0C68BE] px-4 py-1.5 text-xs font-semibold text-white shadow-xs transition hover:bg-[#0F80EB]"
              >
                Sign In
              </Link>
            )}

            {/* Mobile menu hamburger */}
            <button
              type="button"
              className="header-mobile-menu rounded-lg p-1.5 text-[#112130] hover:bg-[#F5F8FB] lg:hidden"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-label="Menu"
            >
              {menuOpen ? (
                <span className="text-xs font-bold">✕</span>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mode & Pan-African Notice Strip */}
      <div
        className={`border-t px-4 py-1 text-[11px] sm:px-6 ${
          isLawyer ? "border-violet-100 bg-violet-50/80 text-violet-900" : "border-sky-100 bg-sky-50/80 text-sky-900"
        }`}
      >
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-2">
          <p className="flex items-center gap-1.5">
            <span className="font-bold">{label}</span>
            <span>—</span>
            <span>
              {isLawyer
                ? "Pan-African authorities, official gazettes, drafts and matter notes across 54 nations."
                : "Official gazettes, plain guides, and everyday laws across South Africa and the continent."}
            </span>
          </p>
          <div className="flex items-center gap-3">
            <Link href="/sources" className="font-semibold underline hover:opacity-80">
              Live Scraper Active
            </Link>
            <span className="hidden sm:inline opacity-60">|</span>
            <Link href="/countries" className="hidden sm:inline hover:underline">
              {currentCountryObj.flag} {currentCountryObj.name}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="border-t border-[#E5EEF5] bg-white px-4 py-4 lg:hidden">
          <form onSubmit={onSearch} className="mb-3">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search Acts, cases, gazettes across Africa..."
              className="w-full rounded-xl border border-[#E5EEF5] px-3.5 py-2 text-xs"
            />
          </form>

          <div className="mb-3 flex items-center justify-between border-b border-[#E5EEF5] pb-3">
            <span className="text-xs text-[#86929E]">Audience:</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => pickAudience("individual")}
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  audience === "individual" ? "bg-[#0C68BE] text-white" : "bg-[#F5F8FB] text-[#112130]"
                }`}
              >
                Individual
              </button>
              <button
                type="button"
                onClick={() => pickAudience("lawyer")}
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  audience === "lawyer" ? "bg-[#0C68BE] text-white" : "bg-[#F5F8FB] text-[#112130]"
                }`}
              >
                Lawyer
              </button>
            </div>
          </div>

          <nav className="flex flex-col text-xs font-medium text-[#112130]">
            {nav.map((n) => (
              <Link key={n.href + n.label} href={n.href} className="py-2.5 border-b border-[#E5EEF5]" onClick={() => setMenuOpen(false)}>
                {n.label}
              </Link>
            ))}
            <Link href="/sources" className="py-2.5 border-b border-[#E5EEF5] text-emerald-700 font-semibold" onClick={() => setMenuOpen(false)}>
              ● Live Scraper &amp; Sources
            </Link>
            <Link href="/countries" className="py-2.5 border-b border-[#E5EEF5]" onClick={() => setMenuOpen(false)}>
              🌍 All African Countries (54)
            </Link>
            <Link href="/pricing" className="py-2.5 border-b border-[#E5EEF5]" onClick={() => setMenuOpen(false)}>
              Pricing
            </Link>
            <Link href="/contact" className="py-2.5 border-b border-[#E5EEF5]" onClick={() => setMenuOpen(false)}>
              Contact Us
            </Link>
            {isAuthenticated ? (
              <Link href="/account" className="py-2.5 text-[#0C68BE] font-bold" onClick={() => setMenuOpen(false)}>
                My Account ({user?.name})
              </Link>
            ) : (
              <Link href="/sign-in" className="py-2.5 text-[#0C68BE] font-bold" onClick={() => setMenuOpen(false)}>
                Sign In / Register
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
