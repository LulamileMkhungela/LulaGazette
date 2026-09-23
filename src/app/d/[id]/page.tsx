import { notFound } from "next/navigation";
import { DocumentViewer } from "@/components/DocumentViewer";
import { documents, getDocument } from "@/data/legal";

export function generateStaticParams() {
  return documents.map((d) => ({ id: d.id }));
}

export function generateMetadata({ params }: { params: { id: string } }) {
  const doc = getDocument(params.id);
  if (!doc) return { title: "Document" };
  return { title: doc.title, description: doc.summary };
}

export default function DocumentShortPage({ params }: { params: { id: string } }) {
  const doc = getDocument(params.id);
  if (!doc) notFound();
  return <DocumentViewer doc={doc} />;
}
