"use client";

import { useMemo, useState } from "react";
import type { DocTemplate } from "@/data/templates";

export function TemplateDraft({ template }: { template: DocTemplate }) {
  const initial = useMemo(() => {
    const o: Record<string, string> = {};
    for (const f of template.fields) o[f.key] = f.defaultValue ?? "";
    return o;
  }, [template]);

  const [values, setValues] = useState<Record<string, string>>(initial);
  const [copied, setCopied] = useState(false);

  const rendered = useMemo(() => {
    let body = template.body;
    for (const [k, v] of Object.entries(values)) {
      body = body.split(`{{${k}}}`).join(v.trim() || `«${k}»`);
    }
    return body;
  }, [template.body, values]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(rendered);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  function download() {
    const blob = new Blob([rendered], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${template.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function printDoc() {
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(`<!doctype html><html><head><title>${template.title}</title>
      <style>body{font-family:Georgia,serif;max-width:720px;margin:40px auto;white-space:pre-wrap;line-height:1.5;font-size:14px}</style>
      </head><body>${rendered.replace(/</g, "&lt;")}</body></html>`);
    w.document.close();
    w.focus();
    w.print();
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
      <div className="space-y-3 rounded-3xl border border-lg-line bg-white p-5 shadow-sm">
        <h2 className="text-sm font-bold uppercase tracking-wide text-lg-blue">Fill in details</h2>
        {template.fields.map((f) => (
          <label key={f.key} className="block text-sm font-medium text-lg-slate">
            {f.label}
            {f.multiline ? (
              <textarea
                value={values[f.key] ?? ""}
                onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
                rows={4}
                placeholder={f.placeholder}
                className="mt-1 w-full rounded-xl border border-lg-line bg-lg-wash px-3 py-2 text-sm outline-none focus:border-lg-blue focus:bg-white"
              />
            ) : (
              <input
                value={values[f.key] ?? ""}
                onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
                placeholder={f.placeholder}
                className="mt-1 w-full rounded-xl border border-lg-line bg-lg-wash px-3 py-2 text-sm outline-none focus:border-lg-blue focus:bg-white"
              />
            )}
          </label>
        ))}
        <div className="flex flex-wrap gap-2 pt-2">
          <button
            type="button"
            onClick={copy}
            className="rounded-full bg-lg-blue px-4 py-2 text-sm font-semibold text-white hover:bg-lg-blue-bright"
          >
            {copied ? "Copied" : "Copy text"}
          </button>
          <button
            type="button"
            onClick={download}
            className="rounded-full border border-lg-line bg-lg-wash px-4 py-2 text-sm font-semibold text-lg-navy"
          >
            Download .txt
          </button>
          <button
            type="button"
            onClick={printDoc}
            className="rounded-full border border-lg-line bg-white px-4 py-2 text-sm font-semibold text-lg-navy"
          >
            Print
          </button>
        </div>
      </div>

      <div className="rounded-3xl border border-lg-line bg-white p-5 shadow-sm sm:p-8">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-display text-2xl text-lg-navy">Live draft</h2>
          <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-medium text-amber-900">
            Review with a lawyer before serving or filing
          </span>
        </div>
        <pre className="whitespace-pre-wrap font-sans text-[14px] leading-7 text-lg-slate">{rendered}</pre>
        <ul className="mt-6 list-disc space-y-1 border-t border-lg-line pt-4 pl-5 text-sm text-lg-muted">
          {template.tips.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
