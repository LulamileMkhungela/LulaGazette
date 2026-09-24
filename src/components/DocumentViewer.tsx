"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { LegalDocument } from "@/data/legal";
import { categories } from "@/data/legal";
import { pageCountFor } from "@/lib/search";
import { useAuth } from "@/context/AuthContext";
import { getCountryFlag } from "@/data/africanCountries";

const PdfStage = dynamic(() => import("@/components/PdfStage").then((m) => m.PdfStage), {
  ssr: false,
  loading: () => (
    <div
      className="pointer-events-none absolute inset-0 z-[1] flex items-center justify-center rounded border border-[#E5EEF5] bg-[#FAFDFF] text-sm text-[#677480]"
      style={{ minHeight: "90vh" }}
    >
      Loading document viewer...
    </div>
  ),
});

/**
 * Document reading chrome aligned to Lexark /d/[slug]:
 * breadcrumb → title row (icon, meta, Library / Copy link / Ask / panel toggle)
 * → flex row: PDF stage (min-height 90vh, bordered) + details rail (~20vw)
 */
export function DocumentViewer({ doc }: { doc: LegalDocument }) {
  const { isDocSaved, toggleSaveDoc } = useAuth();
  const cat = categories.find((c) => c.id === doc.category);
  const pagesMeta = pageCountFor(doc.id, doc.body.length);
  const pdfUrl = `/pdfs/${doc.id}.pdf`;

  const [detailsOpen, setDetailsOpen] = useState(true);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [libOpen, setLibOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  const [pageCount, setPageCount] = useState(pagesMeta);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1);
  const [viewFormat, setViewFormat] = useState<"pdf" | "text">("pdf");
  const [textSearch, setTextSearch] = useState("");

  const libRef = useRef<HTMLDivElement>(null);

  const noteKey = `lg-notes-${doc.id}`;
  const [notes, setNotes] = useState("");
  const [savedNote, setSavedNote] = useState(false);

  const flag = doc.flag || getCountryFlag(doc.countryCode);
  const countryName = doc.country || doc.jurisdiction || "South Africa";
  const inLibrary = isDocSaved(doc.id);

  useEffect(() => {
    try {
      const n = localStorage.getItem(noteKey);
      if (n) setNotes(n);
    } catch {
      /* empty */
    }
    setPageNumber(1);
    setSummaryOpen(false);
  }, [doc.id, noteKey]);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!libRef.current?.contains(e.target as Node)) setLibOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const preview = useMemo(() => truncate(doc.summary || doc.body.replace(/\s+/g, " "), 220), [doc]);

  function copyCitation() {
    navigator.clipboard.writeText(`${doc.title} (${doc.citation})`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function copyFullText() {
    navigator.clipboard.writeText(`${doc.title}\n${doc.citation}\n\n${doc.body}`);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  }

  function saveNotes() {
    try {
      localStorage.setItem(noteKey, notes);
      setSavedNote(true);
      setTimeout(() => setSavedNote(false), 2000);
    } catch {
      /* empty */
    }
  }

  const pagesLabel = useMemo(() => {
    return `${pageCount} ${pageCount === 1 ? "page" : "pages"}`;
  }, [pageCount]);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-[1400px] px-4 py-4 sm:px-6 lg:px-8">
        {/* Breadcrumb row */}
        <nav aria-label="Breadcrumb" className="mb-4 text-xs text-[#86929E]">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-[#0C68BE]">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href={`/s?country=${doc.countryCode || "ZA"}`} className="hover:text-[#0C68BE]">
                {flag} {countryName}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href={`/s?c=${doc.category}`} className="hover:text-[#0C68BE]">
                {cat?.label || doc.category}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="max-w-[200px] truncate text-[#112130] sm:max-w-md" aria-current="page">
              {doc.title}
            </li>
          </ol>
        </nav>

        {/* Title row */}
        <div className="mb-6 flex flex-col gap-4 border-b border-[#E5EEF5] pb-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="rounded px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-white"
                style={{ backgroundColor: cat?.color ?? "#0C68BE" }}
              >
                {cat?.label ?? doc.category}
              </span>
              <span className="inline-flex items-center gap-1 rounded bg-[#F5F8FB] px-2.5 py-0.5 text-[11px] font-medium text-[#112130]">
                <span>{flag}</span>
                <span>{countryName}</span>
              </span>
              <span className="rounded bg-[#F5F8FB] px-2.5 py-0.5 text-[11px] font-medium text-[#677480]">
                {doc.year}
              </span>
              <span className="rounded bg-emerald-50 px-2.5 py-0.5 text-[11px] font-medium text-[#298D62]">
                {doc.status || "In force"}
              </span>
              <span className="text-xs text-[#86929E]">{pagesLabel}</span>
            </div>

            <h1 className="mt-2 font-display text-2xl font-semibold text-[#0B151F] sm:text-3xl">{doc.title}</h1>
            <p className="mt-0.5 font-mono text-xs text-[#0C68BE]">{doc.citation}</p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {/* View Format Switcher (PDF vs Official Gazette Text) */}
            <div className="flex rounded-xl border border-[#E5EEF5] bg-[#F5F8FB] p-0.5">
              <button
                type="button"
                onClick={() => setViewFormat("pdf")}
                className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
                  viewFormat === "pdf" ? "bg-white text-[#0B151F] shadow-xs" : "text-[#677480] hover:text-[#0B151F]"
                }`}
              >
                PDF View
              </button>
              <button
                type="button"
                onClick={() => setViewFormat("text")}
                className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
                  viewFormat === "text" ? "bg-white text-[#0B151F] shadow-xs" : "text-[#677480] hover:text-[#0B151F]"
                }`}
              >
                Gazette Full Text
              </button>
            </div>

            {/* Save to library */}
            <button
              type="button"
              onClick={() => toggleSaveDoc(doc.id)}
              className={`rounded-xl border px-3 py-1.5 text-xs font-semibold transition ${
                inLibrary
                  ? "border-amber-300 bg-amber-50 text-amber-900"
                  : "border-[#E5EEF5] bg-white text-[#112130] hover:bg-[#F5F8FB]"
              }`}
            >
              {inLibrary ? "★ Saved to Account" : "☆ Save to Account"}
            </button>

            {/* Copy citation */}
            <button
              type="button"
              onClick={copyCitation}
              className="rounded-xl border border-[#E5EEF5] bg-white px-3 py-1.5 text-xs font-medium text-[#112130] hover:bg-[#F5F8FB]"
            >
              {copied ? "✓ Copied" : "Copy citation"}
            </button>

            {/* Copy full text */}
            <button
              type="button"
              onClick={copyFullText}
              className="rounded-xl border border-[#E5EEF5] bg-white px-3 py-1.5 text-xs font-medium text-[#112130] hover:bg-[#F5F8FB]"
            >
              {copiedText ? "✓ Text Copied" : "Copy text"}
            </button>

            {/* Toggle Details Rail */}
            <button
              type="button"
              onClick={() => setDetailsOpen((v) => !v)}
              className="rounded-xl border border-[#E5EEF5] bg-white px-3 py-1.5 text-xs font-medium text-[#112130] hover:bg-[#F5F8FB]"
            >
              {detailsOpen ? "Hide panel" : "Show panel"}
            </button>
          </div>
        </div>

        {/* Reading Stage + Details Rail */}
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Main Stage */}
          <div className="min-w-0 flex-1">
            {viewFormat === "pdf" ? (
              <div>
                {/* PDF Toolbar */}
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2 rounded-t-xl border border-b-0 border-[#E5EEF5] bg-white px-4 py-2 text-xs">
                  <div className="flex items-center gap-1.5">
                    <span>Page {pageNumber} of {pageCount}</span>
                    <button
                      disabled={pageNumber <= 1}
                      onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
                      className="rounded border border-[#E5EEF5] px-2 py-0.5 hover:bg-[#F5F8FB] disabled:opacity-40"
                    >
                      ‹
                    </button>
                    <button
                      disabled={pageNumber >= pageCount}
                      onClick={() => setPageNumber((p) => Math.min(pageCount, p + 1))}
                      className="rounded border border-[#E5EEF5] px-2 py-0.5 hover:bg-[#F5F8FB] disabled:opacity-40"
                    >
                      ›
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setScale((s) => Math.max(0.6, +(s - 0.1).toFixed(2)))}
                      className="rounded border border-[#E5EEF5] px-2 py-0.5 hover:bg-[#F5F8FB]"
                    >
                      −
                    </button>
                    <span className="tabular-nums">{Math.round(scale * 100)}%</span>
                    <button
                      onClick={() => setScale((s) => Math.min(1.8, +(s + 0.1).toFixed(2)))}
                      className="rounded border border-[#E5EEF5] px-2 py-0.5 hover:bg-[#F5F8FB]"
                    >
                      +
                    </button>
                    <button
                      onClick={() => setScale(1)}
                      className="rounded border border-[#E5EEF5] px-2 py-0.5 hover:bg-[#F5F8FB]"
                    >
                      Reset
                    </button>
                    <a
                      href={pdfUrl}
                      download={`${doc.id}.pdf`}
                      className="rounded bg-[#0C68BE] px-2.5 py-0.5 text-white hover:bg-[#0F80EB]"
                    >
                      Download PDF
                    </a>
                  </div>
                </div>

                {/* PDF Stage with graceful text fallback */}
                <div className="relative min-h-[85vh] rounded-b-xl border border-[#E5EEF5] bg-[#FAFDFF] overflow-hidden">
                  <PdfStage
                    fileUrl={pdfUrl}
                    pageNumber={pageNumber}
                    scale={scale}
                    onLoadSuccess={(n) => setPageCount(n || pagesMeta)}
                    onPageChange={setPageNumber}
                  />
                </div>
              </div>
            ) : (
              /* Official Gazette Text View */
              <div className="rounded-2xl border border-[#E5EEF5] bg-white p-6 sm:p-8">
                {/* Text View Controls */}
                <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-[#E5EEF5] pb-4">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">
                      ✓ Official Gazette &amp; Statute Extract
                    </span>
                    <span className="text-xs text-[#86929E]">Verified Text Source</span>
                  </div>

                  <div className="w-full sm:w-64">
                    <input
                      type="text"
                      value={textSearch}
                      onChange={(e) => setTextSearch(e.target.value)}
                      placeholder="Find within text..."
                      className="w-full rounded-xl border border-[#E5EEF5] bg-[#F5F8FB] px-3 py-1.5 text-xs outline-none focus:border-[#0C68BE] focus:bg-white"
                    />
                  </div>
                </div>

                {/* Gazette Text Content */}
                <div className="prose max-w-none text-xs sm:text-sm font-sans text-[#112130] leading-relaxed whitespace-pre-wrap">
                  {doc.body}
                </div>
              </div>
            )}
          </div>

          {/* Details Rail */}
          {detailsOpen && (
            <aside className="w-full shrink-0 space-y-6 lg:w-80">
              <div className="rounded-2xl border border-[#E5EEF5] bg-[#F5F8FB] p-5">
                <h2 className="text-sm font-semibold text-[#0B151F]">Document Information</h2>
                <dl className="mt-3 divide-y divide-[#E5EEF5] text-xs">
                  <div className="flex justify-between py-2">
                    <dt className="text-[#86929E]">Jurisdiction</dt>
                    <dd className="font-semibold text-[#112130]">
                      {flag} {countryName}
                    </dd>
                  </div>
                  <div className="flex justify-between py-2">
                    <dt className="text-[#86929E]">Category</dt>
                    <dd className="font-semibold text-[#0C68BE]">{cat?.label}</dd>
                  </div>
                  <div className="flex justify-between py-2">
                    <dt className="text-[#86929E]">Year Enacted</dt>
                    <dd className="font-semibold text-[#112130]">{doc.year}</dd>
                  </div>
                  <div className="flex justify-between py-2">
                    <dt className="text-[#86929E]">Status</dt>
                    <dd className="font-semibold text-emerald-700">{doc.status || "In force"}</dd>
                  </div>
                  <div className="flex justify-between py-2">
                    <dt className="text-[#86929E]">Official Source</dt>
                    <dd className="max-w-[160px] truncate text-right font-medium text-[#112130]">
                      {doc.source}
                    </dd>
                  </div>
                </dl>

                {/* Plain-Language Summary */}
                <div className="mt-4 border-t border-[#E5EEF5] pt-4">
                  <h3 className="text-xs font-semibold text-[#0B151F]">Summary &amp; Purpose</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#677480]">
                    {summaryOpen ? doc.summary : preview}
                  </p>
                  {doc.summary && doc.summary.length > 220 && (
                    <button
                      type="button"
                      onClick={() => setSummaryOpen((v) => !v)}
                      className="mt-1 text-xs font-medium text-[#0C68BE] hover:underline"
                    >
                      {summaryOpen ? "Show less" : "Read full summary"}
                    </button>
                  )}
                </div>

                {/* Matter Notes */}
                <div className="mt-6 border-t border-[#E5EEF5] pt-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-semibold text-[#0B151F]">Practitioner Matter Notes</h3>
                    {savedNote && <span className="text-[10px] font-semibold text-emerald-600">Saved</span>}
                  </div>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Type client or brief notes for this document..."
                    rows={4}
                    className="mt-2 w-full rounded-xl border border-[#E5EEF5] bg-white p-2.5 text-xs text-[#112130] outline-none focus:border-[#0C68BE]"
                  />
                  <button
                    type="button"
                    onClick={saveNotes}
                    className="mt-2 w-full rounded-xl bg-[#0C68BE] py-1.5 text-xs font-semibold text-white hover:bg-[#0F80EB]"
                  >
                    Save Notes
                  </button>
                </div>
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}

function truncate(str: string, maxLen: number) {
  if (!str || str.length <= maxLen) return str;
  return str.slice(0, maxLen).trim() + "…";
}
