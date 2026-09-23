import Link from "next/link";
import { notFound } from "next/navigation";
import { getDocument } from "@/data/legal";
import { getGuide, problemGuides } from "@/data/guides";
import { getCourt } from "@/data/courts";
import { getTemplate } from "@/data/templates";

export function generateStaticParams() {
  return problemGuides.map((g) => ({ id: g.id }));
}

export function generateMetadata({ params }: { params: { id: string } }) {
  const g = getGuide(params.id);
  return { title: g?.title ?? "Guide", description: g?.summary };
}

export default function GuideDetailPage({ params }: { params: { id: string } }) {
  const g = getGuide(params.id);
  if (!g) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-6 text-sm text-lg-muted">
        <Link href="/guides" className="hover:text-lg-blue">
          Guides
        </Link>{" "}
        / <span className="text-lg-ink">{g.title}</span>
      </div>

      <div className="rounded-3xl border border-lg-line bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-lg-blue/10 px-2.5 py-0.5 text-[11px] font-bold uppercase text-lg-blue">
            Problem guide
          </span>
          <span className="rounded-full bg-lg-wash px-2.5 py-0.5 text-[11px] font-medium text-lg-muted">
            {g.audience}
          </span>
          <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-[11px] font-medium text-amber-900">
            {g.urgency} urgency
          </span>
        </div>
        <h1 className="mt-3 font-display text-3xl text-lg-navy sm:text-4xl">{g.title}</h1>
        <p className="mt-3 max-w-3xl text-lg-muted">{g.summary}</p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Box title="Do this now" items={g.doNow} tone="good" />
          <Box title="Do not" items={g.doNot} tone="bad" />
        </div>

        <h2 className="mt-8 font-display text-2xl text-lg-navy">Does this sound like you?</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-lg-slate">
          {g.symptoms.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>

        <h2 className="mt-8 font-display text-2xl text-lg-navy">Step-by-step</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-7 text-lg-slate">
          {g.steps.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>

        <h2 className="mt-8 font-display text-2xl text-lg-navy">Documents to gather</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {g.documentsToGather.map((d) => (
            <span key={d} className="rounded-full bg-lg-wash px-3 py-1 text-xs font-medium text-lg-slate">
              {d}
            </span>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-lg-blue/20 bg-lg-blue/5 p-4">
          <p className="text-sm font-semibold text-lg-navy">When to call a lawyer</p>
          <p className="mt-1 text-sm leading-6 text-lg-muted">{g.whenToCallLawyer}</p>
          <p className="mt-3 text-sm text-lg-slate">
            Need the product team? Use{" "}
            <Link href="/contact" className="font-semibold text-lg-blue hover:underline">
              Contact Us
            </Link>
            . For legal advice, instruct an admitted attorney or advocate.
          </p>
        </div>
      </div>

      <section className="mt-10 grid gap-6 lg:grid-cols-3">
        <Related
          title="Read the law"
          links={g.relatedDocIds.map((id) => {
            const d = getDocument(id);
            return d ? { href: `/doc/${d.id}`, label: d.title } : null;
          })}
        />
        <Related
          title="Draft something"
          links={g.relatedTemplateIds.map((id) => {
            const t = getTemplate(id);
            return t ? { href: `/templates/${t.id}`, label: t.title } : null;
          })}
        />
        <Related
          title="Courts & forums"
          links={g.relatedCourtIds.map((id) => {
            const c = getCourt(id);
            return c ? { href: `/courts/${c.id}`, label: c.name } : null;
          })}
        />
      </section>
    </div>
  );
}

function Box({ title, items, tone }: { title: string; items: string[]; tone: "good" | "bad" }) {
  return (
    <div
      className={`rounded-2xl border p-4 ${
        tone === "good" ? "border-emerald-200 bg-emerald-50/60" : "border-red-200 bg-red-50/50"
      }`}
    >
      <p className="text-sm font-bold text-lg-navy">{title}</p>
      <ul className="mt-2 list-disc space-y-1 pl-4 text-sm leading-6 text-lg-slate">
        {items.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
    </div>
  );
}

function Related({
  title,
  links,
}: {
  title: string;
  links: ({ href: string; label: string } | null)[];
}) {
  const clean = links.filter(Boolean) as { href: string; label: string }[];
  return (
    <div className="rounded-2xl border border-lg-line bg-white p-5">
      <h3 className="font-semibold text-lg-navy">{title}</h3>
      <ul className="mt-3 space-y-2">
        {clean.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-sm text-lg-blue hover:underline">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
