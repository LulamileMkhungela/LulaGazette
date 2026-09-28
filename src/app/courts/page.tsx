import Link from "next/link";
import { courtGuides } from "@/data/courts";

export const metadata = { title: "Courts & forums" };

export default function CourtsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-4xl text-lg-navy">South African courts & forums</h1>
      <p className="mt-3 max-w-2xl text-lg-muted">
        Filing processes, when to use which forum, checklists for citizens and practice notes for lawyers — from
        Small Claims and Magistrates’ Courts to the High Court, CCMA, Labour Court, SCA and Constitutional Court.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {courtGuides.map((c) => (
          <Link
            key={c.id}
            href={`/courts/${c.id}`}
            className="rounded-3xl border border-lg-line bg-white p-6 shadow-sm transition hover:border-lg-blue/40 hover:shadow-card"
          >
            <p className="text-xs font-bold uppercase tracking-wide text-lg-blue">{c.level}</p>
            <h2 className="mt-1 text-xl font-semibold text-lg-navy">{c.name}</h2>
            <p className="mt-2 text-sm leading-6 text-lg-muted">{c.summary}</p>
            <p className="mt-3 text-xs text-lg-soft">
              <span className="font-semibold text-lg-slate">When: </span>
              {c.whenToUse}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
