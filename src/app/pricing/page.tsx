import Link from "next/link";

export const metadata = { title: "Pricing" };

const plans = [
  {
    name: "Free library",
    price: "R0",
    period: "",
    blurb: "Search curated SA materials, guides, directory and standard templates.",
    features: [
      "Acts, cases, forms library (curated)",
      "Individual & lawyer viewing modes",
      "Problem guides & court checklists",
      "Standard drafting templates",
      "Directory of forums & regulators",
    ],
    cta: "Start searching",
    href: "/search",
    highlight: false,
  },
  {
    name: "Pro research",
    price: "R499",
    period: "/month (illustrative)",
    blurb: "Adds AI-assisted research overview packages when enabled for your workspace.",
    features: [
      "Everything in Free",
      "AI Overview packages (paid add-on)",
      "Saved searches (roadmap)",
      "Priority onboarding call",
      "Email support",
    ],
    cta: "Contact to enable",
    href: "/contact",
    highlight: true,
  },
  {
    name: "Business integrate",
    price: "Custom",
    period: "",
    blurb: "For firms, clinics and product teams that want LulaGazette embedded or integrated.",
    features: [
      "System overview workshop",
      "API / embed discussion",
      "SSO and workspace options (roadmap)",
      "Training for staff",
      "Named integration contact",
    ],
    cta: "Book an overview",
    href: "/contact",
    highlight: false,
  },
];

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="font-display text-4xl text-lg-navy">Pricing & packages</h1>
        <p className="mt-3 text-lg-muted">
          Core library stays simple. <strong>AI research</strong> sits in paid packages — contact me to enable or to
          integrate LulaGazette with your business systems.
        </p>
      </div>
      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {plans.map((p) => (
          <div
            key={p.name}
            className={`flex flex-col rounded-3xl border bg-white p-6 shadow-sm ${
              p.highlight ? "border-lg-blue shadow-soft ring-2 ring-lg-blue/15" : "border-lg-line"
            }`}
          >
            {p.highlight && (
              <span className="mb-3 w-fit rounded-full bg-lg-blue px-2.5 py-0.5 text-[11px] font-semibold uppercase text-white">
                Includes AI packages
              </span>
            )}
            <h2 className="text-xl font-semibold text-lg-navy">{p.name}</h2>
            <p className="mt-3 font-display text-4xl text-lg-navy">
              {p.price}
              {p.period && <span className="text-base font-sans font-medium text-lg-muted"> {p.period}</span>}
            </p>
            <p className="mt-3 text-sm leading-6 text-lg-muted">{p.blurb}</p>
            <ul className="mt-6 flex-1 space-y-2">
              {p.features.map((f) => (
                <li key={f} className="flex gap-2 text-sm text-lg-slate">
                  <span className="text-lg-green">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href={p.href}
              className={`mt-8 block rounded-full py-3 text-center text-sm font-semibold ${
                p.highlight
                  ? "bg-lg-blue text-white hover:bg-lg-blue-bright"
                  : "bg-lg-wash text-lg-navy hover:bg-lg-line"
              }`}
            >
              {p.cta}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
