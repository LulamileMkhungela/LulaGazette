import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-4 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-lg-blue">404</p>
      <h1 className="mt-2 font-display text-4xl text-lg-navy">Page not found</h1>
      <p className="mt-3 text-sm text-lg-muted">
        That route is not in the South African LulaGazette demo. Try search or return home.
      </p>
      <div className="mt-8 flex gap-3">
        <Link href="/" className="rounded-full bg-lg-blue px-5 py-2.5 text-sm font-semibold text-white">
          Home
        </Link>
        <Link
          href="/s"
          className="rounded-full border border-lg-line bg-white px-5 py-2.5 text-sm font-semibold text-lg-navy"
        >
          Search
        </Link>
      </div>
    </div>
  );
}
