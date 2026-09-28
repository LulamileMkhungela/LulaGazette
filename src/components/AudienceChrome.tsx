"use client";

import { useAudience } from "@/context/AudienceContext";

export function AudienceBadge({ className = "" }: { className?: string }) {
  const { label, isLawyer } = useAudience();
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
        isLawyer
          ? "bg-violet-50 text-violet-800 ring-1 ring-violet-200"
          : "bg-sky-50 text-sky-800 ring-1 ring-sky-200"
      } ${className}`}
    >
      Viewing: {label}
    </span>
  );
}

/** Compact strip under header — always shows who the library is for */
export function AudienceBanner() {
  const { isLawyer, label } = useAudience();
  return (
    <div className="border-b border-lg-line bg-lg-wash/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-1.5 sm:px-6">
        <p className="text-[11px] leading-4 text-lg-muted sm:text-xs">
          <span className="font-semibold text-lg-navy">{label}</span>
          {isLawyer
            ? " — procedure, authorities and drafting tools. Not a substitute for professional judgment."
            : " — plain guides and everyday laws. Information only, not a free lawyer."}
        </p>
      </div>
    </div>
  );
}

export function AudienceSwitcher({ size = "md" }: { size?: "sm" | "md" }) {
  const { audience, setAudience } = useAudience();
  const pad = size === "sm" ? "px-2.5 py-1 text-[11px]" : "px-3 py-1.5 text-xs";
  return (
    <div
      className="inline-flex items-center rounded-full border border-lg-line bg-lg-wash p-0.5"
      role="group"
      aria-label="Individual or lawyer library"
    >
      <button
        type="button"
        onClick={() => setAudience("individual")}
        className={`${pad} rounded-full font-semibold transition ${
          audience === "individual" ? "bg-white text-lg-blue shadow-sm" : "text-lg-muted"
        }`}
      >
        Individual
      </button>
      <button
        type="button"
        onClick={() => setAudience("lawyer")}
        className={`${pad} rounded-full font-semibold transition ${
          audience === "lawyer" ? "bg-white text-lg-blue shadow-sm" : "text-lg-muted"
        }`}
      >
        Lawyer
      </button>
    </div>
  );
}
