import Link from "next/link";
import { notFound } from "next/navigation";
import { africanCountries, getCountryByCode } from "@/data/africanCountries";
import { documents } from "@/data/legal";
import { externalSources } from "@/data/sources";
import { harvestedCorpus, convertToLegalDocument } from "@/lib/scraper";

export function generateStaticParams() {
  return africanCountries.map((c) => ({ code: c.code.toLowerCase() }));
}

export function generateMetadata({ params }: { params: { code: string } }) {
  const country = getCountryByCode(params.code);
  if (!country) return { title: "African Country" };
  return {
    title: `${country.name} Legal System, Gazettes & Courts`,
    description: `Official gazettes, apex courts, constitutional acts, and legal information for ${country.name}.`,
  };
}

export default function CountryDetailPage({ params }: { params: { code: string } }) {
  const country = getCountryByCode(params.code);
  if (!country) notFound();

  const countryDocs = [
    ...documents.filter((d) => d.countryCode?.toUpperCase() === country.code.toUpperCase()),
    ...harvestedCorpus
      .filter((d) => d.countryCode?.toUpperCase() === country.code.toUpperCase())
      .map(convertToLegalDocument),
  ];

  const countrySources = externalSources.filter(
    (s) => s.countryCode?.toUpperCase() === country.code.toUpperCase() || s.countryCode === "AU"
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-4 text-xs text-[#86929E]">
        <ol className="flex items-center gap-1.5">
          <li>
            <Link href="/" className="hover:text-[#0C68BE]">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/countries" className="hover:text-[#0C68BE]">
              African Countries (54)
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="font-semibold text-[#112130]">{country.name}</li>
        </ol>
      </nav>

      {/* Hero Country Card */}
      <div className="rounded-3xl border border-[#E5EEF5] bg-gradient-to-r from-sky-50 via-white to-sky-50/40 p-6 sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span className="text-5xl sm:text-6xl">{country.flag}</span>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display text-3xl font-semibold text-[#0B151F] sm:text-4xl">{country.name}</h1>
                <span className="rounded-md bg-[#F5F8FB] px-2 py-0.5 font-mono text-xs font-bold text-[#112130]">
                  {country.code}
                </span>
              </div>
              <p className="mt-1 text-xs font-semibold text-[#0C68BE]">{country.region} · {country.legalSystem}</p>
              <p className="mt-0.5 text-xs text-[#677480]">Capital: {country.capital} · Currency: {country.currency}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              href={`/s?country=${country.code}`}
              className="rounded-xl bg-[#0C68BE] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#0F80EB]"
            >
              Search {country.name} Laws
            </Link>
            <Link
              href={`/sources?country=${country.code}`}
              className="rounded-xl border border-[#E5EEF5] bg-white px-4 py-2.5 text-xs font-semibold text-[#112130] hover:bg-[#F5F8FB]"
            >
              Scrape Gazettes
            </Link>
          </div>
        </div>

        <p className="mt-6 text-xs leading-relaxed text-[#5E7B99] sm:text-sm">{country.description}</p>
      </div>

      {/* Country Profile Grid */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Gazette Information */}
        <div className="rounded-2xl border border-[#E5EEF5] bg-white p-5 shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-[#0C68BE]">Official Gazette</p>
          <h3 className="mt-2 text-base font-semibold text-[#0B151F] italic">{country.gazetteName}</h3>
          <p className="mt-2 text-xs leading-relaxed text-[#677480]">
            The official government publication of record for acts, statutory instruments, proclamations, and judicial notices.
          </p>
        </div>

        {/* Apex Court */}
        <div className="rounded-2xl border border-[#E5EEF5] bg-white p-5 shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-[#0C68BE]">Apex Court</p>
          <h3 className="mt-2 text-base font-semibold text-[#0B151F]">{country.apexCourt}</h3>
          <p className="mt-2 text-xs leading-relaxed text-[#677480]">
            Final court of appeal and constitutional interpreter in {country.name}.
          </p>
        </div>

        {/* Primary Legal Portal */}
        <div className="rounded-2xl border border-[#E5EEF5] bg-white p-5 shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-[#0C68BE]">Legal Portal &amp; Source</p>
          <h3 className="mt-2 text-base font-semibold text-[#0B151F]">{country.portalName}</h3>
          {country.portalUrl && (
            <a
              href={country.portalUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-block text-xs font-semibold text-[#0C68BE] hover:underline"
            >
              Visit Source Repository ↗
            </a>
          )}
        </div>
      </div>

      {/* Landmark Statutes and Acts */}
      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold text-[#0B151F]">Landmark Acts &amp; Enactments</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {country.keyActs.map((act, i) => (
            <div key={i} className="flex items-center gap-3 rounded-2xl border border-[#E5EEF5] bg-white p-4">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-[#0C68BE]/10 text-xs font-bold text-[#0C68BE]">
                {i + 1}
              </span>
              <p className="text-xs font-semibold text-[#112130]">{act}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Available Documents in LulaGazette */}
      <section className="mt-12">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl font-semibold text-[#0B151F]">
            Documents in LulaGazette Library ({countryDocs.length})
          </h2>
          <Link
            href={`/s?country=${country.code}`}
            className="text-xs font-semibold text-[#0C68BE] hover:underline"
          >
            Open in Search →
          </Link>
        </div>

        {countryDocs.length === 0 ? (
          <div className="mt-4 rounded-2xl border border-[#E5EEF5] bg-[#F5F8FB] p-8 text-center">
            <p className="text-xs font-semibold text-[#0B151F]">
              No local documents yet for {country.name}.
            </p>
            <p className="mt-1 text-xs text-[#677480]">
              You can trigger a live gazette harvest to extract latest legal records for {country.name}.
            </p>
            <Link
              href={`/sources?country=${country.code}`}
              className="mt-4 inline-block rounded-xl bg-[#0C68BE] px-4 py-2 text-xs font-semibold text-white"
            >
              Pull Gazettes for {country.name}
            </Link>
          </div>
        ) : (
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {countryDocs.map((doc) => (
              <div
                key={doc.id}
                className="flex flex-col justify-between rounded-2xl border border-[#E5EEF5] bg-white p-5 shadow-xs transition hover:border-[#0C68BE]"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-md bg-[#0C68BE]/10 px-2 py-0.5 text-[10px] font-bold text-[#0C68BE]">
                      {doc.category}
                    </span>
                    <span className="text-xs font-semibold text-[#86929E]">{doc.year}</span>
                  </div>
                  <h3 className="mt-2 text-sm font-semibold text-[#0B151F] line-clamp-1">{doc.title}</h3>
                  <p className="mt-0.5 font-mono text-[11px] text-[#86929E]">{doc.citation}</p>
                  <p className="mt-2 text-xs leading-relaxed text-[#677480] line-clamp-2">{doc.summary}</p>
                </div>
                <div className="mt-4 border-t border-[#E5EEF5] pt-3 flex justify-between items-center">
                  <span className="text-[11px] text-[#86929E]">{doc.source}</span>
                  <Link
                    href={`/d/${doc.id}`}
                    className="rounded-lg bg-[#0C68BE] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#0F80EB]"
                  >
                    Read Document
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Connected Legal Institutes */}
      <section className="mt-12 border-t border-[#E5EEF5] pt-8">
        <h2 className="font-display text-xl font-semibold text-[#0B151F]">Connected Sources &amp; Harvesters</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {countrySources.map((s) => (
            <div key={s.id} className="rounded-xl border border-[#E5EEF5] bg-white p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold text-[#112130]">{s.name}</h3>
                <span className="text-[10px] text-emerald-700 font-bold uppercase">Live Sync</span>
              </div>
              <p className="mt-1 text-xs text-[#677480]">{s.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
