"use client";

import Image from "next/image";
import Link from "next/link";
import { categories } from "@/data/legal";
import { useAuth } from "@/context/AuthContext";

export function CategoryGrid() {
  const { selectedCountry } = useAuth();
  const countryParam = selectedCountry && selectedCountry !== "all" ? `&country=${selectedCountry}` : "";

  return (
    <div className="mx-auto grid w-full max-w-4xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {categories.map((c) => (
        <Link
          key={c.id}
          href={`/s?c=${c.id}${countryParam}&sort=year-desc&limit=20&page=1`}
          className="group flex flex-col items-center gap-2.5 rounded-2xl border border-[#E5EEF5] bg-white/95 px-2 py-5 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-[#0C68BE]/40 hover:shadow-md sm:px-3"
        >
          <span
            className="flex h-12 w-12 items-center justify-center rounded-2xl"
            style={{ backgroundColor: `${c.color}18` }}
          >
            <Image src={c.icon} alt="" width={28} height={28} />
          </span>
          <span className="text-center text-sm font-semibold text-[#0B151F] group-hover:text-[#0C68BE]">
            {c.label}
          </span>
        </Link>
      ))}
    </div>
  );
}
