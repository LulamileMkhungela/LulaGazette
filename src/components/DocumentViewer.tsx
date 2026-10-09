"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { LegalDocument } from "@/data/legal";
import { categories } from "@/data/legal";
import { pageCountFor } from "@/lib/search";

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
  const cat = categories.find((c) => c.id === doc.category);
  const pagesMeta = pageCountFor(doc.id, doc.body.length);
  const pdfUrl = `/pdfs/${doc.id}.pdf`;

  const [detailsOpen, setDetailsOpen] = useState(true);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [libOpen, setLibOpen] = useState(false);
  const [inLibrary, setInLibrary] = useState(false);
  const [copied, setCopied] = useState(false);
  const [pageCount, setPageCount] = useState(pagesMeta);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1);
  const libRef = useRef<HTMLDivElement>(null);

  const noteKey = `lg-notes-${doc.id}`;
  const [notes, setNotes] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const lib = JSON.parse(localStorage.getItem("lg-library") || "[]") as string[];
      setInLibrary(lib.includes(doc.id));
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

  const toggleLibrary = useCallback(() => {
    try {
      const lib = JSON.parse(localStorage.getItem("lg-library") || "[]") as string[];
      let next: string[];
      if (lib.includes(doc.id)) {
        next = lib.filter((id) => id !== doc.id);
        setInLibrary(false);
      } else {
        next = [doc.id, ...lib];
        setInLibrary(true);
      }
      localStorage.setItem("lg-library", JSON.stringify(next));
    } catch {
      /* empty */
    }
    setLibOpen(false);
  }, [doc.id]);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* empty */
    }
  }

  function saveNotes() {
    try {
      localStorage.setItem(noteKey, notes);
      setSaved(true);
      setTimeout(() => setSaved(false), 1500);
    } catch {
      /* empty */
    }
  }

  const pagesLabel = `${pageCount} ${pageCount === 1 ? "page" : "pages"}`;

  return (
    <div className="overflow-x-clip bg-white">
      <main className="flex flex-col bg-white py-7">
        <div className="container mx-auto max-w-[1200px] px-4 lg:px-6">
          {/* Breadcrumb — Lexark: Home / Search Result / title */}
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-sm">
              <li>
                <Link href="/">
                  <span className="text-[#0F80EB] hover:underline">Home</span>
                </Link>
              </li>
              <li className="text-[#86929E]" aria-hidden>
                /
              </li>
              <li>
                <Link href={`/s?c=${doc.category}&sort=year-desc&limit=20&page=1`}>
                  <span className="text-[#0F80EB] hover:underline">Search Result</span>
                </Link>
              </li>
              <li className="text-[#86929E]" aria-hidden>
                /
              </li>
              <li className="min-w-0">
                <span className="line-clamp-1 text-[#112130]">{doc.title}</span>
              </li>
            </ol>
          </nav>

          <div className="my-4 h-px w-full bg-[#E5EEF5]" role="separator" />

          {/* Title header + actions */}
          <header className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-3">
              <CategoryIcon color={cat?.color || "#0C68BE"} label={cat?.label || "Doc"} />
              <div className="min-w-0">
                <p className="text-sm text-gray-500">{shortAuthor(doc.source)}</p>
                <p className="text-xl font-semibold text-[#0B151F]">{doc.title}</p>
              </div>
            </div>

            <div className="flex shrink-0 flex-wrap items-center justify-end gap-2">
              {/* Library dropdown */}
              <div className="relative" ref={libRef}>
                <button
                  type="button"
                  onClick={() => setLibOpen((v) => !v)}
                  className="inline-flex items-center gap-1 rounded-md border border-[#d9d9d9] bg-white px-2 py-1.5 text-sm text-[#112130] hover:border-[#0C68BE]/40 hover:text-[#0C68BE]"
                  style={{ paddingLeft: 6, paddingRight: 6 }}
                >
                  <LibraryIcon />
                  <span className="flex items-center gap-1">
                    Library
                    <ChevronDown />
                  </span>
                </button>
                {libOpen && (
                  <div className="absolute right-0 z-30 mt-1 w-52 overflow-hidden rounded-lg border border-[#E5EEF5] bg-white py-1 shadow-lg">
                    <button
                      type="button"
                      onClick={toggleLibrary}
                      className="block w-full px-3 py-2 text-left text-sm hover:bg-[#F5F8FB]"
                    >
                      {inLibrary ? "Remove from library" : "Add to library"}
                    </button>
                    <Link
                      href="/lawyers"
                      className="block w-full px-3 py-2 text-left text-sm hover:bg-[#F5F8FB]"
                      onClick={() => setLibOpen(false)}
                    >
                      Open my library
                    </Link>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={copyLink}
                className="inline-flex items-center gap-1 rounded-md border border-[#d9d9d9] bg-white px-2 py-1.5 text-sm text-[#112130] hover:border-[#0C68BE]/40"
                style={{ paddingLeft: 6, paddingRight: 6 }}
              >
                <LinkIcon />
                <span>{copied ? "Copied" : "Copy link"}</span>
              </button>

              <Link
                href="/pricing"
                className="inline-flex items-center gap-1 rounded-md border border-[#d9d9d9] bg-white px-2 py-1.5 text-sm text-[#112130] hover:border-[#0C68BE]/40"
                style={{ paddingLeft: 6, paddingRight: 6 }}
                title="AI assistant is part of paid packages"
              >
                <ChatIcon />
                <span>Ask Lula</span>
              </Link>

              <button
                type="button"
                aria-label={detailsOpen ? "Hide document details" : "Show document details"}
                aria-expanded={detailsOpen}
                aria-controls="lg-document-details"
                onClick={() => setDetailsOpen((v) => !v)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[#d9d9d9] bg-white text-[#112130] hover:border-[#0C68BE]/40"
              >
                {detailsOpen ? <PanelCloseIcon /> : <PanelOpenIcon />}
              </button>
            </div>
          </header>

          {/* PDF stage + details — Lexark flex row gap-5 */}
          <div
            className={`flex flex-row transition-[gap] duration-300 ease-in-out motion-reduce:transition-none ${
              detailsOpen ? "gap-5" : "gap-0"
            }`}
          >
            <div className="min-w-0 flex-1">
              <div className="flex border border-[#E5EEF5]">
                <div className="flex min-w-0 flex-1 flex-col gap-4">
                  {/* In-viewer chrome (page/zoom) sits above the canvas like a reader toolbar */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E5EEF5] bg-[#FAFDFF] px-3 py-2">
                    <div className="flex items-center gap-1">
                      <ToolBtn
                        label="Previous page"
                        disabled={pageNumber <= 1}
                        onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
                      >
                        ‹
                      </ToolBtn>
                      <span className="min-w-[5.5rem] text-center text-xs tabular-nums text-[#677480]">
                        {pageNumber} / {pageCount}
                      </span>
                      <ToolBtn
                        label="Next page"
                        disabled={pageNumber >= pageCount}
                        onClick={() => setPageNumber((p) => Math.min(pageCount, p + 1))}
                      >
                        ›
                      </ToolBtn>
                    </div>
                    <div className="flex items-center gap-1">
                      <ToolBtn label="Zoom out" onClick={() => setScale((s) => Math.max(0.6, +(s - 0.1).toFixed(2)))}>
                        −
                      </ToolBtn>
                      <span className="min-w-[3rem] text-center text-xs tabular-nums text-[#677480]">
                        {Math.round(scale * 100)}%
                      </span>
                      <ToolBtn label="Zoom in" onClick={() => setScale((s) => Math.min(1.8, +(s + 0.1).toFixed(2)))}>
                        +
                      </ToolBtn>
                      <ToolBtn label="Reset zoom" onClick={() => setScale(1)}>
                        Reset
                      </ToolBtn>
                      <a
                        href={pdfUrl}
                        download={`${doc.id}.pdf`}
                        className="ml-1 rounded border border-[#E5EEF5] bg-white px-2 py-1 text-xs font-medium text-[#112130] hover:border-[#0C68BE]"
                      >
                        Download
                      </a>
                    </div>
                  </div>

                  <div style={{ position: "relative", width: "100%", minHeight: "90vh" }}>
                    <PdfStage
                      fileUrl={pdfUrl}
                      pageNumber={pageNumber}
                      scale={scale}
                      onLoadSuccess={(n) => {
                        setPageCount(n || pagesMeta);
                      }}
                      onPageChange={setPageNumber}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Details rail — Lexark w-[20vw] max-w-[20vw] border-l */}
            <section
              id="lg-document-details"
              aria-label="Document details"
              aria-hidden={!detailsOpen}
              className={`shrink-0 overflow-hidden border-gray-200 transition-[width,max-width,opacity,padding,border-color] duration-300 ease-in-out motion-reduce:transition-none ${
                detailsOpen
                  ? "w-full max-w-full border-l px-5 opacity-100 sm:w-[20vw] sm:max-w-[20vw]"
                  : "w-0 max-w-0 border-l-0 px-0 opacity-0"
              }`}
            >
              {detailsOpen && (
                <div className="w-full shrink-0">
                  <dl className="mb-5 divide-y divide-gray-100 border-y border-gray-100">
                    <div className="flex justify-between gap-4 py-3 text-sm">
                      <dt className="shrink-0 font-medium text-gray-600">Author</dt>
                      <dd className="min-w-0 break-words text-right text-gray-800">{shortAuthor(doc.source)}</dd>
                    </div>
                    <div className="flex justify-between gap-4 py-3 text-sm">
                      <dt className="shrink-0 font-medium text-gray-600">Year</dt>
                      <dd className="min-w-0 break-words text-right text-gray-800">{doc.year}</dd>
                    </div>
                    <div className="flex justify-between gap-4 py-3 text-sm">
                      <dt className="shrink-0 font-medium text-gray-600">Pages</dt>
                      <dd className="min-w-0 break-words text-right text-gray-800">{pagesLabel}</dd>
                    </div>
                  </dl>

                  <div>
                    <p className="text-justify text-sm leading-6 text-[#112130]">
                      {summaryOpen ? doc.summary : preview}
                    </p>
                    <button
                      type="button"
                      className="mt-1 text-sm font-medium text-[#0C68BE] hover:underline"
                      onClick={() => setSummaryOpen((v) => !v)}
                    >
                      {summaryOpen ? "See less" : "See more"}
                    </button>
                  </div>

                  <div className="mt-6 border-t border-gray-100 pt-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-600">My Notes</p>
                      <button
                        type="button"
                        onClick={saveNotes}
                        className="text-sm font-medium text-[#0C68BE] hover:underline"
                      >
                        {saved ? "Saved" : "Save"}
                      </button>
                    </div>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={5}
                      placeholder="Private notes on this device…"
                      className="mt-2 w-full rounded-md border border-[#E5EEF5] bg-[#FAFDFF] px-3 py-2 text-sm outline-none focus:border-[#0C68BE]"
                    />
                  </div>

                  <p className="mt-4 text-[11px] leading-4 text-[#86929E]">
                    {cat?.label} · {doc.citation}
                  </p>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

function ToolBtn({
  children,
  onClick,
  label,
  disabled,
}: {
  children: React.ReactNode;
  onClick: () => void;
  label: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="flex h-7 min-w-7 items-center justify-center rounded border border-[#E5EEF5] bg-white px-2 text-sm font-medium text-[#112130] hover:bg-white disabled:opacity-40"
    >
      {children}
    </button>
  );
}

function CategoryIcon({ color, label }: { color: string; label: string }) {
  return (
    <div
      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl"
      style={{ backgroundColor: `${color}18` }}
      aria-hidden
    >
      <div
        className="flex h-10 w-10 items-center justify-center rounded-lg text-[10px] font-bold uppercase text-white"
        style={{ backgroundColor: color }}
      >
        {label.slice(0, 4)}
      </div>
    </div>
  );
}

function truncate(s: string, n: number) {
  const t = s.trim();
  if (t.length <= n) return t;
  return t.slice(0, n).trimEnd() + "…";
}

function shortAuthor(source: string) {
  // Prefer a short “Author” label like Lexark’s NIMC chip
  if (!source) return "—";
  if (source.length <= 48) return source;
  return source.slice(0, 46) + "…";
}

function LibraryIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <rect width="8" height="18" x="3" y="3" rx="1" />
      <path d="M7 3v18" />
      <path d="M20.4 18.9c.2.5-.1 1.1-.6 1.3l-1.9.7c-.5.2-1.1-.1-1.3-.6L11.1 5.1c-.2-.5.1-1.1.6-1.3l1.9-.7c.5-.2 1.1.1 1.3.6Z" />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M9 17H7A5 5 0 0 1 7 7h2" />
      <path d="M15 7h2a5 5 0 1 1 0 10h-2" />
      <line x1="8" x2="16" y1="12" y2="12" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" />
    </svg>
  );
}

function PanelCloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M15 3v18" />
      <path d="m8 9 3 3-3 3" />
    </svg>
  );
}

function PanelOpenIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M15 3v18" />
      <path d="m10 15-3-3 3-3" />
    </svg>
  );
}
