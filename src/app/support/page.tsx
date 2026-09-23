import Link from "next/link";

export const metadata = { title: "Help & Support" };

export default function SupportPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-4xl text-lg-navy">Help & Support</h1>
      <p className="mt-3 text-lg-muted">
        Get productive with LulaGazette on your machine. For legal strategy on a live brief, consult counsel.
      </p>
      <div className="mt-8 grid gap-4">
        {[
          {
            t: "Running locally",
            d: "From the project folder run npm install then npm run dev, and open the printed localhost URL.",
          },
          {
            t: "Search tips",
            d: "Use citations (Act 66 of 1995), topics (eviction, POPIA), or court names. Combine with category filters.",
          },
          {
            t: "Document pages",
            d: "Open any result for summary, full educational text, tags and related authorities.",
          },
          {
            t: "Still stuck?",
            d: "See FAQs or send a note via Contact — demo responses are on-screen only.",
          },
        ].map((x) => (
          <div key={x.t} className="rounded-2xl border border-lg-line bg-white p-5">
            <h2 className="font-semibold text-lg-navy">{x.t}</h2>
            <p className="mt-2 text-sm leading-6 text-lg-muted">{x.d}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/faq" className="rounded-full bg-lg-blue px-5 py-2.5 text-sm font-semibold text-white">
          View FAQs
        </Link>
        <Link
          href="/contact"
          className="rounded-full border border-lg-line bg-white px-5 py-2.5 text-sm font-semibold text-lg-navy"
        >
          Contact
        </Link>
      </div>
    </div>
  );
}
