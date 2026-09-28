import Link from "next/link";

export const metadata = { title: "Platform status" };

export default function StatusPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-4xl text-[#0B151F]">Platform status</h1>
      <p className="mt-2 text-sm text-[#677480]">From Lulamile Mkhungela — founder, LulaGazette</p>

      <div className="prose-legal mt-6 space-y-4 rounded-2xl border border-[#E5EEF5] bg-white p-6 sm:p-8">
        <p>
          LulaGazette is an <strong>active build</strong>. I’m shipping a usable South African library and reading
          experience first. It is not a law firm, not a full gazette mirror, and not certified legal-advice software.
        </p>

        <h2 className="font-display text-xl text-[#0B151F]">What works today</h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>Curated SA Acts, cases, rules, regulations, forms and provincial samples</li>
          <li>Search with filters, full document reader, guides, directory and templates</li>
          <li>Individual and lawyer modes so the same product serves both audiences</li>
          <li>Public data coverage page showing local corpus counts, source roles, and known gaps</li>
        </ul>

        <h2 className="font-display text-xl text-[#0B151F]">Data</h2>
        <p>
          I use publicly available South African legal material and clearly framed educational summaries. I do{" "}
          <strong>not</strong> claim a licence to republish proprietary commercial databases (for example paid
          Lexis/Juta/Lexpro full text), and I don’t encourage scraping paywalled systems. If you hold a licence, keep
          those extracts in your own notes.
        </p>

        <h2 className="font-display text-xl text-[#0B151F]">Compliance</h2>
        <p>
          POPIA and production SaaS compliance are <strong>in progress</strong>. Don’t upload confidential client files
          into this demo. Hosting, DPIAs and any LPC-adjacent workflows get scoped with counsel before scale.
        </p>

        <p>
          Roadmap or integrations?{" "}
          <Link href="/contact" className="font-semibold text-[#0C68BE] hover:underline">
            Contact me
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
