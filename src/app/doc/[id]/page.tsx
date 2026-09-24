import { notFound } from "next/navigation";
import { DocumentViewer } from "@/components/DocumentViewer";
import { documents, getDocument } from "@/data/legal";
import { harvestedCorpus, convertToLegalDocument } from "@/lib/scraper";

export function generateStaticParams() {
  const allIds = [
    ...documents.map((d) => ({ id: d.id })),
    ...harvestedCorpus.map((d) => ({ id: d.id })),
  ];
  return allIds;
}

function resolveDocument(id: string) {
  const localDoc = getDocument(id);
  if (localDoc) return localDoc;

  const scraped = harvestedCorpus.find((d) => d.id === id);
  if (scraped) return convertToLegalDocument(scraped);

  return undefined;
}

export function generateMetadata({ params }: { params: { id: string } }) {
  const doc = resolveDocument(params.id);
  if (!doc) return { title: "Document" };
  return { title: doc.title, description: doc.summary };
}

export default function DocumentAliasPage({ params }: { params: { id: string } }) {
  const doc = resolveDocument(params.id);
  if (!doc) notFound();
  return <DocumentViewer doc={doc} />;
}
