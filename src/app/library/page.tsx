"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getCountryByCode, africanCountries } from "@/data/africanCountries";
import { documents, LegalDocument, CategoryId } from "@/data/legal";

type UploadedDoc = {
  id: string;
  title: string;
  citation: string;
  category: CategoryId;
  country: string;
  countryCode: string;
  summary: string;
  uploader: string;
  uploadedAt: string;
  isCommunity: boolean;
};

const INITIAL_COMMUNITY_DOCS: UploadedDoc[] = [
  {
    id: "lib-com-1",
    title: "High Court Practice Directive 2 of 2026 — Urgent Court Roll & Electronic Filings",
    citation: "Practice Directive 2/2026 (GJ)",
    category: "court-rules",
    country: "South Africa",
    countryCode: "ZA",
    summary: "Standard operating procedure for urgent motion rolls, duty judges, and joint draft court orders.",
    uploader: "Adv. Nomsa Dlamini (Johannesburg Bar)",
    uploadedAt: "2026-09-20",
    isCommunity: true,
  },
  {
    id: "lib-com-2",
    title: "Commercial Court Division Electronic Hearing Directives & Evidence Submissions",
    citation: "Comm. Court Circular No. 4 of 2025",
    category: "court-rules",
    country: "Kenya",
    countryCode: "KE",
    summary: "Milimani Commercial Courts procedure for virtual trial hearings, bundle marking, and digital affidavits.",
    uploader: "Dr. Amina Ochieng (Kenya Law)",
    uploadedAt: "2026-09-18",
    isCommunity: true,
  },
  {
    id: "lib-com-3",
    title: "Corporate Insolvency Resolution Guidelines under CAMA 2020",
    citation: "Corporate Affairs Commission Circular CAC/2024/09",
    category: "regulations",
    country: "Nigeria",
    countryCode: "NG",
    summary: "Guidelines on company voluntary arrangements (CVA) and statutory moratoriums for distressed entities.",
    uploader: "Barr. Chinedu Adeleke (Lagos Bar)",
    uploadedAt: "2026-09-15",
    isCommunity: true,
  },
  {
    id: "lib-com-4",
    title: "Labour Commission Conciliation Protocols & Fair Severance Schedules",
    citation: "NLC Guidance Note 2025/11",
    category: "regulations",
    country: "Ghana",
    countryCode: "GH",
    summary: "Mandatory mediation timelines before strike notices and calculation tables for collective bargaining retrenchments.",
    uploader: "Kwame Mensah (Accra Chambers)",
    uploadedAt: "2026-09-12",
    isCommunity: true,
  },
];

export default function LibraryPage() {
  const { user, selectedCountry, setSelectedCountry, savedDocIds } = useAuth();
  const [activeTab, setActiveTab] = useState<"all" | "uploads" | "saved" | "community">("all");
  const [userUploads, setUserUploads] = useState<UploadedDoc[]>([]);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [search, setSearch] = useState("");

  // Upload form state
  const [title, setTitle] = useState("");
  const [citation, setCitation] = useState("");
  const [category, setCategory] = useState<CategoryId>("acts");
  const [countryCode, setCountryCode] = useState(selectedCountry !== "all" ? selectedCountry : "ZA");
  const [summary, setSummary] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const activeCountryObj = getCountryByCode(selectedCountry);

  // Saved documents
  const savedList = documents.filter((d) => savedDocIds.includes(d.id));

  function handleUpload(e: FormEvent) {
    e.preventDefault();
    if (!title.trim() || !summary.trim()) return;

    const cObj = getCountryByCode(countryCode);
    const newDoc: UploadedDoc = {
      id: "upl-" + Date.now(),
      title,
      citation: citation || `${title} (${countryCode})`,
      category,
      country: cObj ? cObj.name : "South Africa",
      countryCode: countryCode.toUpperCase(),
      summary,
      uploader: user ? user.name : "Guest Contributor",
      uploadedAt: new Date().toISOString().split("T")[0],
      isCommunity: true,
    };

    setUserUploads((prev) => [newDoc, ...prev]);
    setMessage("Document uploaded successfully to your library and crowdsourced registry!");
    setTitle("");
    setCitation("");
    setSummary("");
    setTimeout(() => {
      setMessage(null);
      setIsUploadOpen(false);
    }, 1500);
  }

  // Combine list based on active tab and country filter
  let combinedDocs = [
    ...userUploads,
    ...INITIAL_COMMUNITY_DOCS,
  ];

  if (activeTab === "uploads") {
    combinedDocs = userUploads;
  } else if (activeTab === "community") {
    combinedDocs = INITIAL_COMMUNITY_DOCS;
  }

  // Filter by country
  if (selectedCountry && selectedCountry !== "all") {
    const target = selectedCountry.toUpperCase();
    combinedDocs = combinedDocs.filter((d) => d.countryCode === target);
  }

  // Filter by search keyword
  if (search.trim()) {
    const q = search.toLowerCase();
    combinedDocs = combinedDocs.filter(
      (d) =>
        d.title.toLowerCase().includes(q) ||
        d.citation.toLowerCase().includes(q) ||
        d.summary.toLowerCase().includes(q) ||
        d.uploader.toLowerCase().includes(q)
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Top Banner */}
      <div className="rounded-3xl border border-[#E5EEF5] bg-gradient-to-r from-sky-50 via-white to-sky-50/40 p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#0C68BE] border border-[#E5EEF5]">
              <span>📚 Crowdsourced Legal Library</span>
              <span>· {selectedCountry === "all" ? "All Africa" : activeCountryObj?.name}</span>
            </div>
            <h1 className="mt-3 font-display text-2xl font-semibold text-[#0B151F] sm:text-3xl">
              Personal Storage &amp; Community Precedents
            </h1>
            <p className="mt-1 text-xs text-[#677480]">
              Personal storage for your uploaded documents plus crowdsourced gazettes and pleadings shared by verified African practitioners.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsUploadOpen(true)}
              className="rounded-xl bg-[#0C68BE] px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#0F80EB]"
            >
              + Upload Document
            </button>
            <Link
              href="/dashboard"
              className="rounded-xl border border-[#E5EEF5] bg-white px-4 py-2.5 text-xs font-semibold text-[#112130] hover:bg-[#F5F8FB]"
            >
              Dashboard
            </Link>
          </div>
        </div>

        {/* Tab switcher & Search */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-t border-[#E5EEF5] pt-4">
          <div className="flex rounded-xl border border-[#E5EEF5] bg-white p-1">
            <button
              onClick={() => setActiveTab("all")}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                activeTab === "all" ? "bg-[#0C68BE] text-white" : "text-[#677480] hover:text-[#0B151F]"
              }`}
            >
              All Library
            </button>
            <button
              onClick={() => setActiveTab("uploads")}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                activeTab === "uploads" ? "bg-[#0C68BE] text-white" : "text-[#677480] hover:text-[#0B151F]"
              }`}
            >
              My Uploads ({userUploads.length})
            </button>
            <button
              onClick={() => setActiveTab("saved")}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                activeTab === "saved" ? "bg-[#0C68BE] text-white" : "text-[#677480] hover:text-[#0B151F]"
              }`}
            >
              Saved Bookmarks ({savedList.length})
            </button>
            <button
              onClick={() => setActiveTab("community")}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                activeTab === "community" ? "bg-[#0C68BE] text-white" : "text-[#677480] hover:text-[#0B151F]"
              }`}
            >
              Community Precedents
            </button>
          </div>

          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search library..."
              className="w-full sm:w-64 rounded-xl border border-[#E5EEF5] bg-white px-3 py-1.5 text-xs text-[#112130] outline-none focus:border-[#0C68BE]"
            />
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-[#0B151F]/60 backdrop-blur-xs" onClick={() => setIsUploadOpen(false)} />
          <div className="relative w-full max-w-lg rounded-3xl border border-[#E5EEF5] bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#E5EEF5] pb-3">
              <h3 className="font-display text-lg font-semibold text-[#0B151F]">Upload Legal Document</h3>
              <button onClick={() => setIsUploadOpen(false)} className="text-[#677480] hover:text-[#0B151F]">
                ✕
              </button>
            </div>

            {message ? (
              <div className="mt-4 rounded-xl bg-emerald-50 p-4 text-center text-xs font-semibold text-emerald-800 border border-emerald-200">
                {message}
              </div>
            ) : (
              <form onSubmit={handleUpload} className="mt-4 space-y-3.5">
                <div>
                  <label className="block text-xs font-medium text-[#112130]">Document Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. High Court Practice Direction on Electronic Summons"
                    required
                    className="mt-1 w-full rounded-xl border border-[#E5EEF5] bg-[#F5F8FB] px-3 py-2 text-xs text-[#112130] outline-none focus:border-[#0C68BE] focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-[#112130]">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as CategoryId)}
                      className="mt-1 w-full rounded-xl border border-[#E5EEF5] bg-[#F5F8FB] px-3 py-2 text-xs text-[#112130] outline-none focus:border-[#0C68BE]"
                    >
                      <option value="acts">Acts &amp; Statutes</option>
                      <option value="cases">Court Judgments</option>
                      <option value="court-rules">Court Rules &amp; Directives</option>
                      <option value="court-forms">Court Forms &amp; Pleadings</option>
                      <option value="regulations">Gazette Regulations</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#112130]">Jurisdiction</label>
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="mt-1 w-full rounded-xl border border-[#E5EEF5] bg-[#F5F8FB] px-3 py-2 text-xs text-[#112130] outline-none focus:border-[#0C68BE]"
                    >
                      {africanCountries.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.flag} {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#112130]">Citation / Neutral Reference</label>
                  <input
                    type="text"
                    value={citation}
                    onChange={(e) => setCitation(e.target.value)}
                    placeholder="e.g. Directive 4/2026 or [2026] ZAGPJHC 12"
                    className="mt-1 w-full rounded-xl border border-[#E5EEF5] bg-[#F5F8FB] px-3 py-2 text-xs text-[#112130] outline-none focus:border-[#0C68BE] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#112130]">Summary &amp; Key Headnote</label>
                  <textarea
                    rows={3}
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    placeholder="Brief explanation of the legal rule, ratio decidendi, or statutory procedure..."
                    required
                    className="mt-1 w-full rounded-xl border border-[#E5EEF5] bg-[#F5F8FB] px-3 py-2 text-xs text-[#112130] outline-none focus:border-[#0C68BE] focus:bg-white"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-[#E5EEF5]">
                  <button
                    type="button"
                    onClick={() => setIsUploadOpen(false)}
                    className="rounded-xl border border-[#E5EEF5] px-4 py-2 text-xs font-semibold text-[#112130] hover:bg-[#F5F8FB]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-[#0C68BE] px-4 py-2 text-xs font-semibold text-white hover:bg-[#0F80EB]"
                  >
                    Upload to Library
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Content Grid */}
      <div className="mt-8">
        {activeTab === "saved" ? (
          <div>
            <h2 className="font-display text-xl font-semibold text-[#0B151F]">
              Saved Bookmarks ({savedList.length})
            </h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {savedList.map((doc) => (
                <div
                  key={doc.id}
                  className="rounded-2xl border border-[#E5EEF5] bg-white p-5 shadow-xs transition hover:border-[#0C68BE]"
                >
                  <div className="flex items-center gap-2">
                    <span className="rounded-md bg-[#0C68BE]/10 px-2 py-0.5 text-[10px] font-bold text-[#0C68BE]">
                      {doc.category}
                    </span>
                    <span className="text-xs text-[#86929E]">{doc.year}</span>
                  </div>
                  <h3 className="mt-2 text-sm font-semibold text-[#0B151F]">{doc.title}</h3>
                  <p className="mt-0.5 font-mono text-xs text-[#0C68BE]">{doc.citation}</p>
                  <p className="mt-2 text-xs text-[#677480] line-clamp-2">{doc.summary}</p>
                  <div className="mt-4 flex justify-between items-center border-t border-[#E5EEF5] pt-3">
                    <span className="text-[11px] text-[#86929E]">{doc.source}</span>
                    <Link
                      href={`/d/${doc.id}`}
                      className="rounded-lg bg-[#0C68BE] px-3 py-1.5 text-xs font-semibold text-white"
                    >
                      Read
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-semibold text-[#0B151F]">
                {activeTab === "uploads"
                  ? `My Uploads (${combinedDocs.length})`
                  : activeTab === "community"
                  ? `Community Precedents (${combinedDocs.length})`
                  : `Library Documents (${combinedDocs.length})`}
              </h2>
              <span className="text-xs text-[#86929E]">
                Active Scope: {selectedCountry === "all" ? "All Africa" : activeCountryObj?.name}
              </span>
            </div>

            {combinedDocs.length === 0 ? (
              <div className="mt-6 rounded-2xl border border-dashed border-[#E5EEF5] bg-white p-12 text-center">
                <span className="text-3xl">📁</span>
                <p className="mt-2 text-sm font-semibold text-[#0B151F]">No documents found for this filter.</p>
                <p className="mt-1 text-xs text-[#677480]">
                  Upload a document or change the jurisdiction filter in the header.
                </p>
                <button
                  onClick={() => setIsUploadOpen(true)}
                  className="mt-4 rounded-full bg-[#0C68BE] px-5 py-2 text-xs font-semibold text-white"
                >
                  Upload First Document
                </button>
              </div>
            ) : (
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {combinedDocs.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex flex-col justify-between rounded-2xl border border-[#E5EEF5] bg-white p-5 shadow-xs transition hover:border-[#0C68BE]"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="rounded-md bg-[#0C68BE]/10 px-2 py-0.5 text-[10px] font-bold text-[#0C68BE]">
                            {doc.countryCode}
                          </span>
                          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
                            {doc.category}
                          </span>
                        </div>
                        <span className="text-[10px] text-[#86929E]">{doc.uploadedAt}</span>
                      </div>
                      <h3 className="mt-2.5 text-sm font-semibold text-[#0B151F]">{doc.title}</h3>
                      <p className="mt-0.5 font-mono text-xs text-[#0C68BE]">{doc.citation}</p>
                      <p className="mt-2 text-xs text-[#677480] line-clamp-3">{doc.summary}</p>
                    </div>

                    <div className="mt-4 border-t border-[#E5EEF5] pt-3 flex items-center justify-between text-[11px]">
                      <span className="text-[#86929E]">Shared by {doc.uploader}</span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(`${doc.title} (${doc.citation})`);
                          alert("Citation copied!");
                        }}
                        className="font-medium text-[#0C68BE] hover:underline"
                      >
                        Copy Citation
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
