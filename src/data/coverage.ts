import { categories, documents } from "@/data/legal";
import { externalSources } from "@/data/sources";
import { africanCountries } from "@/data/africanCountries";

/**
 * Public coverage contract for the Pan-African LulaGazette platform.
 * Transparent reporting of active data scrapers, connected jurisdictions, and data provenance.
 */
export const coverageReviewedAt = "2026-09-24";

export const coverageHighlights = [
  "Multi-source live scraper engine connecting AfricanLII, SAFLII, Kenya Law, LawNigeria, GhanaLII, and regional courts.",
  "Comprehensive coverage framework spanning all 54 sovereign African countries and 5 regional economic communities.",
  "In-app automated gazette extractor and live pull API (/api/scrape and /api/pull) for statutory and judgment updates.",
  "Integrated document reader with both PDF viewer and verified official gazette text extraction modes.",
  "User session workspace with country preference switching, saved matters, and bookmarks.",
];

export const coverageGaps = [
  "Point-in-time statutory consolidation: Always verify commencement dates and recent amendment notices in the official gazette print.",
  "Commercial headnotes from paywalled subscription providers (Lexis/Juta) require practitioner-licensed import via matter notes.",
  "Sub-national by-laws and municipal gazettes in certain jurisdictions are harvested incrementally upon publication.",
];

export const categoryCoverage = categories.map((category) => ({
  ...category,
  count: documents.filter((document) => document.category === category.id).length,
}));

export const sourceCoverage = externalSources.map((source) => ({
  ...source,
  mode: source.scraperSupported ? "Live Harvester / Scraper Connector" : "Reference Portal",
  live: source.scraperSupported,
}));

export const coverageSummary = {
  documentCount: documents.length,
  categoryCount: categories.length,
  sourceCount: externalSources.length,
  countryCount: africanCountries.length,
  liveConnectors: externalSources.filter((s) => s.scraperSupported).length,
};
