import Link from "next/link";
import { notFound } from "next/navigation";
import { courtGuides, getCourt } from "@/data/courts";
import { getTemplate } from "@/data/templates";

export function generateStaticParams() {
  return courtGuides.map((c) => ({ id: c.id }));
}

export function generateMetadata({ params }: { params: { id: string } }) {
  const c = getCourt(params.id);
  return { title: c?.name ?? "Court", description: c?.summary };
}

export default function CourtDetailPage({ params }: { params: { id: string } }) {
  const c = getCourt(params.id);
  if (!c) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <div className="mb-6 text-sm text-lg-muted">
        <Link href="/courts" className="hover:text-lg-blue">
          Courts
        </Link>{" "}
        / <span className="text-lg-ink">{c.name}</span>
      </div>

      <article className="rounded-3xl border border-lg-line bg-white p-6 shadow-sm sm:p-10">
        <p className="text-xs font-bold uppercase tracking-wide text-lg-blue">{c.level}</p>
        <h1 className="mt-2 font-display text-4xl text-lg-navy">{c.name}</h1>
        <p className="mt-3 text-lg-muted">{c.summary}</p>

        <Section title="When to use">{c.whenToUse}</Section>

        <Section title="Jurisdiction notes">
          <ul className="list-disc space-y-1 pl-5">
            {c.jurisdictionNotes.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </Section>

        <Section title="Filing checklist">
          <ol className="list-decimal space-y-1 pl-5">
            {c.filingChecklist.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ol>
        </Section>

        <Section title="Typical documents">
          <div className="flex flex-wrap gap-2">
            {c.typicalDocuments.map((d) => (
              <span key={d} className="rounded-full bg-lg-wash px-3 py-1 text-xs font-medium">
                {d}
              </span>
            ))}
          </div>
        </Section>

        <Section title="Timelines">
          <ul className="list-disc space-y-1 pl-5">
            {c.timelines.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </Section>

        <Section title="Fees mindset">{c.feesMindset}</Section>
        <Section title="Service">{c.serviceNotes}</Section>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-lg-line bg-lg-wash/50 p-4">
            <p className="text-sm font-bold text-lg-navy">Tips for citizens</p>
            <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-lg-slate">
              {c.tipsCitizens.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-lg-line bg-lg-wash/50 p-4">
            <p className="text-sm font-bold text-lg-navy">Tips for lawyers</p>
            <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-lg-slate">
              {c.tipsLawyers.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        </div>

        <Section title="Related templates">
          <ul className="space-y-2">
            {c.relatedTemplateIds.map((id) => {
              const t = getTemplate(id);
              if (!t) return null;
              return (
                <li key={id}>
                  <Link href={`/templates/${id}`} className="text-sm font-medium text-lg-blue hover:underline">
                    {t.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </Section>

        <p className="mt-8 text-xs text-lg-soft">Official hint: {c.officialHint}</p>
      </article>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-8">
      <h2 className="font-display text-2xl text-lg-navy">{title}</h2>
      <div className="mt-2 text-sm leading-7 text-lg-slate">{children}</div>
    </div>
  );
}
