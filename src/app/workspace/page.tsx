"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { getCountryByCode } from "@/data/africanCountries";

type Matter = {
  id: string;
  name: string;
  ref: string;
  court: string;
  status: "Active" | "Pending Hearing" | "Briefing" | "Concluded";
  notes: string;
  checklists: { text: string; done: boolean }[];
};

const INITIAL_MATTERS: Matter[] = [
  {
    id: "mat-1",
    name: "Commercial IP & Cross-Border Data Dispute",
    ref: "Matter #2026/01",
    court: "High Court (Commercial Division)",
    status: "Active",
    notes: "Reviewing applicability of AfCFTA Digital Trade Protocol Article 4 regarding cross-border transmission of company registration data.",
    checklists: [
      { text: "Particulars of claim settled with senior counsel", done: true },
      { text: "Notice of motion and founding affidavit served", done: true },
      { text: "File joint practice note on CaseLines / Court Online", done: false },
      { text: "Prepare indexed and paginated hearing bundle", done: false },
    ],
  },
  {
    id: "mat-2",
    name: "Unfair Retrenchment & Section 189 LRA Consultation",
    ref: "Matter #2026/04",
    court: "Labour Court / CCMA",
    status: "Pending Hearing",
    notes: "Employer failed to disclose audited financial statements prior to issuing notices of termination based on operational requirements.",
    checklists: [
      { text: "CCMA Form 7.11 referral filed within 30 days", done: true },
      { text: "Certificate of outcome received from commissioner", done: true },
      { text: "Statement of claim served in Labour Court", done: false },
    ],
  },
  {
    id: "mat-3",
    name: "Constitutional Review of Ministerial Gazette Proclamation",
    ref: "Matter #2026/09",
    court: "Constitutional / Apex Court",
    status: "Briefing",
    notes: "Challenging ministerial regulation enacted ultra vires the enabling parent statute under legality principle.",
    checklists: [
      { text: "Examine enabling statute delegation powers", done: true },
      { text: "Draft Rule 53 record requisition to Minister", done: false },
      { text: "Prepare heads of argument on legality and rationality", done: false },
    ],
  },
];

export default function WorkspacePage() {
  const { user, selectedCountry } = useAuth();
  const [matters, setMatters] = useState<Matter[]>(INITIAL_MATTERS);
  const [activeMatterId, setActiveMatterId] = useState<string>("mat-1");
  const [scratchpad, setScratchpad] = useState<string>("");
  const activeCountryObj = getCountryByCode(selectedCountry);

  useEffect(() => {
    try {
      const savedNotes = localStorage.getItem("lulagazette-scratchpad");
      if (savedNotes) setScratchpad(savedNotes);
    } catch {
      /* ignore */
    }
  }, []);

  function handleSaveScratchpad(val: string) {
    setScratchpad(val);
    try {
      localStorage.setItem("lulagazette-scratchpad", val);
    } catch {
      /* ignore */
    }
  }

  const activeMatter = matters.find((m) => m.id === activeMatterId) || matters[0];

  function toggleChecklist(matterId: string, index: number) {
    setMatters((prev) =>
      prev.map((m) => {
        if (m.id !== matterId) return m;
        const nextChecks = [...m.checklists];
        nextChecks[index].done = !nextChecks[index].done;
        return { ...m, checklists: nextChecks };
      })
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Top Banner */}
      <div className="rounded-3xl border border-[#E5EEF5] bg-gradient-to-r from-sky-50 via-white to-sky-50/40 p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#0C68BE] border border-[#E5EEF5]">
              <span>📁 Matter Workspace</span>
              <span>· {selectedCountry === "all" ? "All Africa" : activeCountryObj?.name}</span>
            </div>
            <h1 className="mt-3 font-display text-2xl font-semibold text-[#0B151F] sm:text-3xl">
              Matter Folders, Notes &amp; Court Checklists
            </h1>
            <p className="mt-1 text-xs text-[#677480]">
              Organize live case authorities, draft pleadings, and manage filing deadlines on this device.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/dashboard"
              className="rounded-xl border border-[#E5EEF5] bg-white px-4 py-2.5 text-xs font-semibold text-[#112130] hover:bg-[#F5F8FB]"
            >
              Dashboard
            </Link>
            <Link
              href={`/s?country=${selectedCountry}`}
              className="rounded-xl bg-[#0C68BE] px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#0F80EB]"
            >
              Research Authorities
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        {/* Left Col (4 cols): Matters List */}
        <div className="space-y-4 lg:col-span-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-[#0B151F]">
              Active Matters ({matters.length})
            </h2>
          </div>

          <div className="space-y-3">
            {matters.map((m) => {
              const active = m.id === activeMatterId;
              const completedCount = m.checklists.filter((c) => c.done).length;
              return (
                <button
                  key={m.id}
                  onClick={() => setActiveMatterId(m.id)}
                  className={`w-full rounded-2xl border p-4 text-left transition ${
                    active
                      ? "border-[#0C68BE] bg-sky-50/50 shadow-xs ring-2 ring-[#0C68BE]/20"
                      : "border-[#E5EEF5] bg-white hover:border-[#0C68BE]/40"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[11px] font-bold text-[#0C68BE]">{m.ref}</span>
                    <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-800">
                      {m.status}
                    </span>
                  </div>
                  <h3 className="mt-2 text-sm font-semibold text-[#0B151F]">{m.name}</h3>
                  <p className="mt-0.5 text-xs text-[#86929E]">{m.court}</p>
                  <div className="mt-3 flex items-center justify-between border-t border-[#E5EEF5] pt-2 text-[11px] text-[#677480]">
                    <span>Checklist:</span>
                    <span>
                      {completedCount} of {m.checklists.length} done
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quick Templates Link */}
          <div className="rounded-2xl border border-[#E5EEF5] bg-[#F5F8FB] p-4 text-xs">
            <p className="font-semibold text-[#112130]">Court Paper Draft Starters</p>
            <p className="mt-1 text-[#677480]">Use tested sketches for notices of motion, summons, and affidavits.</p>
            <Link
              href="/templates?aud=lawyer"
              className="mt-3 inline-block font-semibold text-[#0C68BE] hover:underline"
            >
              Open Template Starters →
            </Link>
          </div>
        </div>

        {/* Right Col (8 cols): Active Matter Detail & Scratchpad */}
        <div className="space-y-6 lg:col-span-8">
          {/* Active Matter Card */}
          <div className="rounded-3xl border border-[#E5EEF5] bg-white p-6 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="font-mono text-xs font-bold text-[#0C68BE]">{activeMatter.ref}</span>
                <h2 className="mt-1 font-display text-xl font-semibold text-[#0B151F]">{activeMatter.name}</h2>
                <p className="text-xs text-[#86929E]">{activeMatter.court}</p>
              </div>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800 border border-emerald-200">
                {activeMatter.status}
              </span>
            </div>

            {/* Notes on Matter */}
            <div className="mt-5 rounded-2xl bg-[#F5F8FB] p-4 border border-[#E5EEF5]">
              <p className="text-xs font-bold uppercase tracking-wider text-[#0C68BE]">Matter Strategy &amp; Authority Notes</p>
              <p className="mt-1.5 text-xs leading-relaxed text-[#112130]">{activeMatter.notes}</p>
            </div>

            {/* Checklist */}
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-[#0B151F]">Filing &amp; Procedure Checklist</h3>
              <div className="mt-3 space-y-2">
                {activeMatter.checklists.map((check, i) => (
                  <label
                    key={i}
                    className="flex items-center gap-3 rounded-xl border border-[#E5EEF5] p-3 text-xs text-[#112130] transition hover:bg-[#FAFDFF] cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={check.done}
                      onChange={() => toggleChecklist(activeMatter.id, i)}
                      className="h-4 w-4 rounded border-gray-300 text-[#0C68BE] focus:ring-[#0C68BE]"
                    />
                    <span className={check.done ? "line-through text-[#86929E]" : "font-medium"}>
                      {check.text}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Practitioner Scratchpad */}
          <div className="rounded-3xl border border-[#E5EEF5] bg-white p-6 shadow-xs">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-[#0B151F]">Practitioner Notes &amp; Citations Scratchpad</h3>
                <p className="mt-0.5 text-xs text-[#677480]">
                  Jot down case authorities, ratio citations, and counsel notes. Auto-saves locally.
                </p>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(scratchpad);
                  alert("Notes copied to clipboard!");
                }}
                className="rounded-lg border border-[#E5EEF5] px-3 py-1.5 text-xs font-medium text-[#112130] hover:bg-[#F5F8FB]"
              >
                Copy Notes
              </button>
            </div>

            <textarea
              rows={6}
              value={scratchpad}
              onChange={(e) => handleSaveScratchpad(e.target.value)}
              placeholder="Paste licensed headnotes, citations, statutory sections, or procedural reminders here..."
              className="mt-4 w-full rounded-2xl border border-[#E5EEF5] bg-[#F5F8FB] p-4 text-xs font-mono text-[#112130] outline-none focus:border-[#0C68BE] focus:bg-white"
            />
            <p className="mt-2 text-[11px] text-[#86929E]">
              Drafts remain confidential on your device storage only.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
