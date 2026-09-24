import { categories, documents } from "@/data/legal";
import { externalSources } from "@/data/sources";

/**
 * Public coverage contract for the current build.
 * This is deliberately explicit: a listed source is not treated as an ingestion
 * source unless it has a connector and a licence recorded here.
 */
export const coverageReviewedAt = "2026-09-24";

export const coverageGaps = [
  "No live crawler, API connector, scheduled sync, or webhook is enabled in this deployment.",
  "The local corpus is curated and educational; it is not a complete or consolidated statute database.",
  "Provincial and municipal legislation, notices, by-laws, directives, and gazettes are incomplete.",
  "Commercial databases and authenticated court workspaces are not scraped or connected.",
  "Document freshness, amendment relationships, Gazette numbers, and point-in-time versions require verification before reliance.",
];

export const categoryCoverage = categories.map((category) => ({
  ...category,
  count: documents.filter((document) => document.category === category.id).length,
}));

export const sourceCoverage = externalSources.map((source) => ({
  ...source,
  mode: source.kind === "commercial" || source.id === "saflii" || source.id === "court-online"
    ? "link / authorised manual import"
    : "reference link only",
  live: false,
}));

export const coverageSummary = {
  documentCount: documents.length,
  categoryCount: categories.length,
  sourceCount: externalSources.length,
  liveConnectors: 0,
};
