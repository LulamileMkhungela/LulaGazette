import Link from "next/link";
import { notFound } from "next/navigation";
import { TemplateDraft } from "@/components/TemplateDraft";
import { getTemplate, templates } from "@/data/templates";

export function generateStaticParams() {
  return templates.map((t) => ({ id: t.id }));
}

export function generateMetadata({ params }: { params: { id: string } }) {
  const t = getTemplate(params.id);
  return { title: t?.title ?? "Template", description: t?.description };
}

export default function TemplateDetailPage({ params }: { params: { id: string } }) {
  const t = getTemplate(params.id);
  if (!t) notFound();

  const who = t.audience
    .map((a) => (a === "citizen" ? "Individuals" : a === "lawyer" ? "Lawyers" : "Business"))
    .join(" · ");

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-6 text-sm text-lg-muted">
        <Link href="/templates" className="hover:text-lg-blue">
          Templates
        </Link>{" "}
        / <span className="text-lg-ink">{t.title}</span>
      </div>

      <div className="mb-8 rounded-3xl border border-lg-line bg-white p-6 shadow-sm">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-lg-blue/10 px-2.5 py-0.5 text-[11px] font-bold uppercase text-lg-blue">
            {t.category}
          </span>
          <span className="rounded-full bg-lg-wash px-2.5 py-0.5 text-[11px] font-semibold text-lg-slate">
            Designed for: {who}
          </span>
        </div>
        <h1 className="mt-3 font-display text-3xl text-lg-navy">{t.title}</h1>
        <p className="mt-2 max-w-3xl text-sm text-lg-muted">{t.description}</p>
        <p className="mt-2 text-xs text-lg-soft">Forum: {t.forum}</p>
      </div>

      <TemplateDraft template={t} />
    </div>
  );
}
