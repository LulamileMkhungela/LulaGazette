"use client";

import { useEffect, useMemo, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdfjs/pdf.worker.min.mjs";

type Props = {
  fileUrl: string;
  pageNumber: number;
  scale: number;
  onLoadSuccess: (numPages: number) => void;
  onPageChange?: (page: number) => void;
};

/**
 * Lexark-style PDF canvas:
 * full-width stage, min-height 90vh, "Loading document viewer..." overlay,
 * then continuous page stack (scrollable) — not the browser’s native PDF chrome.
 */
export function PdfStage({ fileUrl, pageNumber, scale, onLoadSuccess, onPageChange }: Props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [numPages, setNumPages] = useState(0);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setNumPages(0);
  }, [fileUrl]);

  useEffect(() => {
    function measure() {
      const el = document.getElementById("lg-pdf-stage");
      if (el) setWidth(Math.max(280, el.clientWidth - 48));
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Scroll requested page into view when toolbar changes page
  useEffect(() => {
    if (!numPages || !pageNumber) return;
    const el = document.getElementById(`lg-pdf-page-${pageNumber}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [pageNumber, numPages]);

  const pageWidth = useMemo(() => Math.min(860, width) * scale, [width, scale]);

  return (
    <div id="lg-pdf-stage" className="relative h-full w-full bg-[#FAFDFF]" style={{ minHeight: "90vh" }}>
      {loading && (
        <div className="pointer-events-none absolute inset-0 z-[1] flex items-center justify-center rounded border border-[#E5EEF5] bg-[#FAFDFF] text-sm text-[#677480]">
          Loading document viewer...
        </div>
      )}

      {error && (
        <div className="absolute inset-0 z-[2] flex flex-col items-center justify-center gap-3 bg-[#FAFDFF] p-6 text-center">
          <p className="text-sm text-[#677480]">{error}</p>
          <a href={fileUrl} target="_blank" rel="noreferrer" className="text-sm font-medium text-[#0C68BE] hover:underline">
            Open PDF in a new tab
          </a>
        </div>
      )}

      <div
        className="h-full w-full overflow-auto"
        style={{ minHeight: "90vh", maxHeight: "90vh" }}
        onScroll={(e) => {
          if (!onPageChange || !numPages) return;
          const root = e.currentTarget;
          let current = 1;
          for (let i = 1; i <= numPages; i++) {
            const page = document.getElementById(`lg-pdf-page-${i}`);
            if (!page) continue;
            const top = page.offsetTop - root.scrollTop;
            if (top < root.clientHeight * 0.35) current = i;
          }
          onPageChange(current);
        }}
      >
        <div className="flex w-full flex-col items-center gap-6 px-4 py-6">
          <Document
            file={fileUrl}
            loading={null}
            onLoadSuccess={(pdf) => {
              setNumPages(pdf.numPages);
              onLoadSuccess(pdf.numPages);
              setLoading(false);
            }}
            onLoadError={() => {
              setError("Could not render this PDF in the viewer.");
              setLoading(false);
            }}
            className="flex w-full flex-col items-center gap-6"
          >
            {width > 0 &&
              numPages > 0 &&
              Array.from({ length: numPages }, (_, i) => i + 1).map((n) => (
                <div
                  key={n}
                  id={`lg-pdf-page-${n}`}
                  className="bg-white shadow-[0_1px_4px_rgba(16,24,40,0.08)] ring-1 ring-[#E5EEF5]"
                >
                  <Page
                    pageNumber={n}
                    width={pageWidth}
                    renderTextLayer
                    renderAnnotationLayer
                    loading={
                      <div
                        className="flex items-center justify-center text-sm text-[#677480]"
                        style={{ width: pageWidth, height: pageWidth * 1.3 }}
                      >
                        Loading document viewer...
                      </div>
                    }
                  />
                </div>
              ))}
          </Document>
        </div>
      </div>
    </div>
  );
}
