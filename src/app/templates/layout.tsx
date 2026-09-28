import { Suspense } from "react";

export default function TemplatesLayout({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<div className="p-8 text-sm text-lg-muted">Loading templates…</div>}>{children}</Suspense>;
}
