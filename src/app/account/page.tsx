"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { africanCountries } from "@/data/africanCountries";
import { documents } from "@/data/legal";

export default function AccountPage() {
  const router = useRouter();
  const { user, isAuthenticated, logout, selectedCountry, setSelectedCountry, savedDocIds, toggleSaveDoc, scrapedDocs } = useAuth();

  if (!isAuthenticated || !user) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-4 py-16 text-center">
        <span className="text-4xl">🔐</span>
        <h1 className="mt-4 font-display text-2xl font-semibold text-[#0B151F]">Sign In Required</h1>
        <p className="mt-2 text-xs leading-relaxed text-[#677480]">
          Please sign in or create a practitioner account to access your personalized Pan-African legal workspace.
        </p>
        <Link
          href="/sign-in"
          className="mt-6 rounded-full bg-[#0C68BE] px-6 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#0F80EB]"
        >
          Go to Sign In
        </Link>
      </div>
    );
  }

  const savedDocuments = documents.filter((d) => savedDocIds.includes(d.id));

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      {/* User Header Profile Card */}
      <div className="rounded-3xl border border-[#E5EEF5] bg-gradient-to-r from-sky-50 via-white to-sky-50/30 p-6 shadow-xs sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#0C68BE] text-xl font-bold text-white shadow-md">
              {user.avatarText}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display text-2xl font-semibold text-[#0B151F] sm:text-3xl">{user.name}</h1>
                <span className="text-2xl">{user.flag}</span>
              </div>
              <p className="text-xs font-medium text-[#0C68BE]">{user.roleTitle}</p>
              <p className="mt-0.5 text-xs text-[#677480]">
                {user.email} {user.organization ? `· ${user.organization}` : ""}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/sources"
              className="rounded-xl bg-[#0C68BE] px-4 py-2 text-xs font-semibold text-white hover:bg-[#0F80EB]"
            >
              Scraper Hub
            </Link>
            <button
              onClick={() => {
                logout();
                router.push("/");
              }}
              className="rounded-xl border border-[#E5EEF5] bg-white px-4 py-2 text-xs font-semibold text-[#112130] hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Primary Jurisdiction Preference */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[#E5EEF5] pt-5">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-[#112130]">Active Jurisdiction Preference:</span>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="rounded-xl border border-[#E5EEF5] bg-white px-3 py-1.5 text-xs font-medium text-[#112130] outline-none focus:border-[#0C68BE]"
            >
              <option value="all">🌍 All Africa (Pan-African)</option>
              {africanCountries.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.name} ({c.code})
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-2">
            <Link
              href={`/s?country=${selectedCountry}`}
              className="text-xs font-medium text-[#0C68BE] hover:underline"
            >
              Search in this jurisdiction →
            </Link>
          </div>
        </div>
      </div>

      {/* Main Account Tabs / Content */}
      <div className="mt-10 grid gap-8 lg:grid-cols-3">
        {/* Left 2 Cols: Saved Documents */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-semibold text-[#0B151F]">
              Saved Documents &amp; Gazettes ({savedDocIds.length})
            </h2>
            <Link href="/s" className="text-xs font-medium text-[#0C68BE] hover:underline">
              + Browse more documents
            </Link>
          </div>

          {savedDocuments.length === 0 ? (
            <div className="mt-4 rounded-2xl border border-[#E5EEF5] bg-white p-8 text-center">
              <span className="text-2xl">🔖</span>
              <p className="mt-2 text-xs font-semibold text-[#0B151F]">No saved documents yet.</p>
              <p className="mt-1 text-xs text-[#677480]">
                Bookmark Acts, court judgments, or gazettes while reading to access them here.
              </p>
              <Link
                href="/s"
                className="mt-4 inline-block rounded-xl bg-[#0C68BE] px-4 py-2 text-xs font-semibold text-white"
              >
                Search the Library
              </Link>
            </div>
          ) : (
            <div className="mt-4 space-y-3">
              {savedDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between rounded-2xl border border-[#E5EEF5] bg-white p-4 shadow-xs transition hover:border-[#0C68BE]"
                >
                  <div className="min-w-0 flex-1 pr-4">
                    <div className="flex items-center gap-2">
                      <span className="rounded-md bg-[#0C68BE]/10 px-2 py-0.5 text-[10px] font-bold text-[#0C68BE]">
                        {doc.jurisdiction}
                      </span>
                      <span className="text-[11px] font-semibold text-[#86929E]">{doc.year}</span>
                    </div>
                    <Link href={`/d/${doc.id}`} className="mt-1.5 block truncate text-xs font-semibold text-[#0B151F] hover:text-[#0C68BE]">
                      {doc.title}
                    </Link>
                    <p className="text-[11px] text-[#677480] truncate">{doc.citation}</p>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <Link
                      href={`/d/${doc.id}`}
                      className="rounded-lg bg-[#0C68BE] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#0F80EB]"
                    >
                      Read
                    </Link>
                    <button
                      onClick={() => toggleSaveDoc(doc.id)}
                      className="rounded-lg border border-[#E5EEF5] px-2.5 py-1.5 text-xs text-rose-600 hover:bg-rose-50"
                      title="Remove from saved"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Harvested Items in Session */}
          <div className="mt-10">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-semibold text-[#0B151F]">
                Recently Scraped Gazettes ({scrapedDocs.length})
              </h2>
              <Link href="/sources" className="text-xs font-medium text-[#0C68BE] hover:underline">
                Open Scraper Hub →
              </Link>
            </div>

            <div className="mt-4 space-y-3">
              {scrapedDocs.slice(0, 4).map((doc) => (
                <div
                  key={doc.id}
                  className="rounded-2xl border border-[#E5EEF5] bg-white p-4 shadow-xs"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-md bg-[#0C68BE]/10 px-2 py-0.5 text-[10px] font-bold text-[#0C68BE]">
                      {doc.country}
                    </span>
                    <span className="text-[10px] text-emerald-600 font-medium">● Harvested</span>
                  </div>
                  <h3 className="mt-2 text-xs font-semibold text-[#0B151F] line-clamp-1">{doc.title}</h3>
                  <p className="mt-1 text-[11px] text-[#677480] line-clamp-2">{doc.summary}</p>
                  <div className="mt-3 flex items-center justify-between border-t border-[#E5EEF5] pt-2 text-[11px]">
                    <span className="text-[#86929E]">Source: {doc.sourceName}</span>
                    <Link href={`/d/${doc.id}`} className="font-semibold text-[#0C68BE] hover:underline">
                      View details →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Quick Tools & Matter Workspace */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-[#E5EEF5] bg-white p-5 shadow-xs">
            <h3 className="text-sm font-semibold text-[#0B151F]">Practice &amp; Matter Tools</h3>
            <p className="mt-1 text-xs text-[#677480]">
              Prepare briefs, draft pleadings, and organize matter authorities.
            </p>

            <div className="mt-4 space-y-2">
              <Link
                href="/lawyers"
                className="flex items-center justify-between rounded-xl bg-[#F5F8FB] p-3 text-xs font-medium text-[#112130] transition hover:bg-[#E5EEF5]"
              >
                <span>📁 Matter Workspace &amp; Notes</span>
                <span className="text-[#0C68BE]">Open →</span>
              </Link>
              <Link
                href="/templates?aud=lawyer"
                className="flex items-center justify-between rounded-xl bg-[#F5F8FB] p-3 text-xs font-medium text-[#112130] transition hover:bg-[#E5EEF5]"
              >
                <span>📝 Legal Draft Starters</span>
                <span className="text-[#0C68BE]">Open →</span>
              </Link>
              <Link
                href="/courts"
                className="flex items-center justify-between rounded-xl bg-[#F5F8FB] p-3 text-xs font-medium text-[#112130] transition hover:bg-[#E5EEF5]"
              >
                <span>⚖️ Court Procedures &amp; Directives</span>
                <span className="text-[#0C68BE]">Open →</span>
              </Link>
              <Link
                href="/countries"
                className="flex items-center justify-between rounded-xl bg-[#F5F8FB] p-3 text-xs font-medium text-[#112130] transition hover:bg-[#E5EEF5]"
              >
                <span>🌍 African Countries Registry (54)</span>
                <span className="text-[#0C68BE]">Open →</span>
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-sky-100 bg-sky-50/60 p-5 text-xs text-sky-950">
            <h4 className="font-semibold text-sky-900">Verified Pan-African Coverage</h4>
            <p className="mt-1.5 leading-relaxed text-sky-800">
              LulaGazette connects official gazette publishers, supreme courts, and legal information institutes across
              all 54 African countries. Use the Scraper Hub to pull the latest notices anytime.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
