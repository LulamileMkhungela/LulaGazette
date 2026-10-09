import Image from "next/image";
import { CategoryGrid } from "@/components/CategoryGrid";
import { HomeNextSteps } from "@/components/HomeNextSteps";
import { InsightRail } from "@/components/InsightRail";
import { SearchBox } from "@/components/SearchBox";

export default function HomePage() {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/landing_bg.png"
          alt=""
          fill
          priority
          className="object-cover object-center opacity-90"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/55 to-white" />
      </div>

      <div className="mx-auto flex max-w-5xl flex-col items-center px-4 pb-12 pt-16 text-center sm:px-6 sm:pt-20">
        <h1 className="max-w-3xl text-balance font-display text-[2rem] font-medium leading-tight text-[#0B151F] sm:text-5xl">
          Smart legal intelligence
        </h1>
        <p className="mt-2 text-base text-[#677480] sm:text-xl">What would you like to explore today?</p>

        <div className="mt-8 w-full">
          <InsightRail />
        </div>

        <div className="mt-6 w-full sm:mt-8">
          <SearchBox large />
        </div>

        <div className="mt-10 w-full sm:mt-12">
          <CategoryGrid />
        </div>
      </div>

      <HomeNextSteps />
    </div>
  );
}
