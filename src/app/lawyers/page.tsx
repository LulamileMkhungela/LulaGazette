"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { externalSources } from "@/data/sources";

type MatterNote = {
  id: string;
  title: string;
  source: string;
  citation: string;
  notes: string;
  createdAt: string;
};

const STORAGE_KEY = "lulagazette-matter-notes";

export default function LawyersPage() {
  const [notes, setNotes] = useState<MatterNote[]>([]);
  const [title, setTitle] = useState("");
  const [source, setSource] = useState("Lexpro / Case Online export");
  const [citation, setCitation] = useState("");
  const [body, setBody] = useState("");
  const [savedMsg, setSavedMsg] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setNotes(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  function persist(next: MatterNote[]) {
    setNotes(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  function onSave(e: FormEvent) {
    e.preventDefault();
    if (!title.trim() || !body.trim()) {
      setSavedMsg("Title and notes are required.");
      return;
    }
    const item: MatterNote = {
      id: `${Date.now()}`,
      title: title.trim(),
      source,
      citation: citation.trim(),
      notes: body.trim(),
      createdAt: new Date().toISOString(),
    };
    persist([item, ...notes]);
    setTitle("");
    setCitation("");
    setBody("");
    setSavedMsg("Saved on this device only (localStorage).");
  }

  function remove(id: string) {
    persist(notes.filter((n) => n.id !== id));
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-4xl text-lg-navy">Lawyer & firm workspace</h1>
      <p className="mt-3 max-w-3xl text-lg-muted">
        LulaGazette does not scrape Lexpro, Case Online or paid law reports — those remain under your licences. This
        workspace helps you import citations and matter notes you are allowed to use, pair them with court procedure
        guides, Library search trails, and drafting templates for SA practice.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {[
          { href: "/s?sort=year-desc&limit=20&page=1", t: "Library search", d: "Search curated SA authorities by citation or topic." },
          { href: "/templates", t: "Court-ready drafts", d: "NOM, summons sketches, affidavits, labour forms." },
          { href: "/courts", t: "Forum & filing", d: "Checklists for MC, High Court, CCMA, CC." },
        ].map((x) => (
          <Link key={x.href} href={x.href} className="rounded-2xl border border-lg-line bg-white p-5 shadow-sm hover:border-lg-blue/40">
            <p className="font-semibold text-lg-navy">{x.t}</p>
            <p className="mt-1 text-sm text-lg-muted">{x.d}</p>
          </Link>
        ))}
      </div>

      <section className="mt-12 grid gap-8 lg:grid-cols-2">
        <div className="rounded-3xl border border-lg-line bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-lg-navy">Import matter note</h2>
          <p className="mt-1 text-sm text-lg-muted">
            Paste headnotes, Court Online index lines, or Lexpro citations you are licensed to use. Stored only in
            your browser.
          </p>
          <form onSubmit={onSave} className="mt-4 space-y-3">
            <Field label="Matter / note title" value={title} onChange={setTitle} placeholder="e.g. Smith v Jones — PIE urgency" />
            <label className="block text-sm font-medium text-lg-slate">
              Source system
              <select
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="mt-1 w-full rounded-xl border border-lg-line bg-lg-wash px-3 py-2 text-sm"
              >
                <option>Lexpro / Case Online export</option>
                <option>Juta / Lexis headnote</option>
                <option>SAFLII / court website</option>
                <option>Client instructions</option>
                <option>Other</option>
              </select>
            </label>
            <Field label="Citation(s)" value={citation} onChange={setCitation} placeholder="2022 (2) SA 104 (CC)" />
            <label className="block text-sm font-medium text-lg-slate">
              Notes / paste
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={8}
                className="mt-1 w-full rounded-xl border border-lg-line bg-lg-wash px-3 py-2 text-sm"
                placeholder="Paste permitted extract, to-do list, opposing counsel points…"
              />
            </label>
            <button type="submit" className="rounded-full bg-lg-blue px-5 py-2.5 text-sm font-semibold text-white">
              Save note
            </button>
            {savedMsg && <p className="text-sm text-lg-green">{savedMsg}</p>}
          </form>
        </div>

        <div className="rounded-3xl border border-lg-line bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-lg-navy">Saved notes ({notes.length})</h2>
          <div className="mt-4 max-h-[520px] space-y-3 overflow-y-auto">
            {notes.length === 0 && (
              <p className="text-sm text-lg-muted">No notes yet — import your first Lexpro/Case Online excerpt.</p>
            )}
            {notes.map((n) => (
              <div key={n.id} className="rounded-2xl border border-lg-line bg-lg-wash/40 p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold text-lg-navy">{n.title}</p>
                    <p className="text-xs text-lg-soft">
                      {n.source} · {new Date(n.createdAt).toLocaleString("en-ZA")}
                    </p>
                    {n.citation && <p className="mt-1 text-xs font-medium text-lg-blue">{n.citation}</p>}
                  </div>
                  <button type="button" onClick={() => remove(n.id)} className="text-xs text-red-600">
                    Delete
                  </button>
                </div>
                <pre className="mt-2 whitespace-pre-wrap font-sans text-xs leading-5 text-lg-slate">{n.notes}</pre>
                <Link
                  href={`/s?q=${encodeURIComponent(n.citation || n.title)}&sort=year-desc&limit=20&page=1`}
                  className="mt-2 inline-block text-xs font-semibold text-lg-blue hover:underline"
                >
                  Search library for this →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl text-lg-navy">Data sources registry</h2>
        <p className="mt-2 max-w-3xl text-sm text-lg-muted">
          How LulaGazette relates to official and commercial SA legal systems. Live bulk pull of proprietary databases
          is intentionally not implemented (licence + ethics).
        </p>
        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {externalSources.map((s) => (
            <div key={s.id} className="rounded-2xl border border-lg-line bg-white p-5">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-semibold text-lg-navy">{s.name}</h3>
                <span className="rounded-full bg-lg-wash px-2 py-0.5 text-[10px] font-bold uppercase text-lg-muted">
                  {s.kind}
                </span>
                {s.importSupported && (
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold uppercase text-lg-green">
                    import notes
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm text-lg-muted">{s.description}</p>
              <p className="mt-2 text-sm text-lg-slate">
                <span className="font-semibold">LulaGazette role: </span>
                {s.howHelps}
              </p>
              {s.url && (
                <a href={s.url} target="_blank" rel="noreferrer" className="mt-2 inline-block text-xs font-semibold text-lg-blue hover:underline">
                  Open source ↗
                </a>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block text-sm font-medium text-lg-slate">
      {label}
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1 w-full rounded-xl border border-lg-line bg-lg-wash px-3 py-2 text-sm"
      />
    </label>
  );
}
