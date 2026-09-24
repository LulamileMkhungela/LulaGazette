"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getCountryByCode } from "@/data/africanCountries";

export default function GoProPage() {
  const { user, selectedCountry } = useAuth();
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  const [trialActivated, setTrialActivated] = useState(false);

  const activeCountryObj = getCountryByCode(selectedCountry);

  // Dynamic pricing based on active jurisdiction
  let price = "R299";
  let annualPrice = "R2,870";
  let currencyLabel = "ZAR / South Africa";

  if (selectedCountry === "KE") {
    price = "KSh 2,500";
    annualPrice = "KSh 24,000";
    currencyLabel = "KES / Kenya";
  } else if (selectedCountry === "NG") {
    price = "₦15,000";
    annualPrice = "₦144,000";
    currencyLabel = "NGN / Nigeria";
  } else if (selectedCountry === "GH") {
    price = "GH₵ 250";
    annualPrice = "GH₵ 2,400";
    currencyLabel = "GHS / Ghana";
  } else if (selectedCountry !== "ZA") {
    price = "$19";
    annualPrice = "$180";
    currencyLabel = "USD / Pan-African";
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="text-center">
        <span className="inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800 border border-emerald-200">
          ⚡ LulaGazette Go Pro
        </span>
        <h1 className="mt-4 font-display text-3xl font-semibold text-[#0B151F] sm:text-5xl">
          A law library that fits in your practice.
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-[#677480] sm:text-base">
          Unlimited full-document access, instant gazette sync across 54 African countries, matter folders, and advanced legal citations.
        </p>

        {/* Billing Toggle */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <span className={`text-xs font-semibold ${billingCycle === "monthly" ? "text-[#0B151F]" : "text-[#86929E]"}`}>
            Monthly Billing
          </span>
          <button
            type="button"
            onClick={() => setBillingCycle(billingCycle === "monthly" ? "annual" : "monthly")}
            className="relative h-6 w-12 rounded-full bg-[#0C68BE] transition"
          >
            <span
              className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-all ${
                billingCycle === "annual" ? "left-7" : "left-1"
              }`}
            />
          </button>
          <span className={`text-xs font-semibold ${billingCycle === "annual" ? "text-[#0B151F]" : "text-[#86929E]"}`}>
            Annual Billing <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] text-emerald-800 font-bold">Save 20%</span>
          </span>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:gap-8 max-w-4xl mx-auto">
        {/* Free Plan */}
        <div className="rounded-3xl border border-[#E5EEF5] bg-white p-8 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold uppercase tracking-wider text-[#86929E]">Free Tier</span>
              <span className="rounded-full bg-[#F5F8FB] px-2.5 py-0.5 text-xs font-semibold text-[#112130]">Guest &amp; Student</span>
            </div>
            <p className="mt-4 font-display text-4xl font-bold text-[#0B151F]">Free</p>
            <p className="mt-1 text-xs text-[#86929E]">Always free for instant research &amp; public access</p>

            <ul className="mt-8 space-y-3.5 text-xs text-[#112130]">
              <li className="flex items-center gap-2.5">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Intelligent search across all 54 African countries</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Full document previews in clean text viewer</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Copy formal legal citations &amp; neutral markers</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Open guest access — zero sign-up wall required</span>
              </li>
              <li className="flex items-center gap-2.5 text-[#86929E]">
                <span>✕</span>
                <span className="line-through">Offline full PDF downloads</span>
              </li>
              <li className="flex items-center gap-2.5 text-[#86929E]">
                <span>✕</span>
                <span className="line-through">Live multi-source gazette alerts</span>
              </li>
            </ul>
          </div>

          <div className="mt-8">
            <Link
              href="/s"
              className="block w-full rounded-full border border-[#E5EEF5] py-3 text-center text-xs font-semibold text-[#112130] hover:bg-[#F5F8FB]"
            >
              Continue with Free Access
            </Link>
          </div>
        </div>

        {/* Go Pro Plan */}
        <div className="relative rounded-3xl border-2 border-[#0C68BE] bg-gradient-to-b from-sky-50/50 via-white to-white p-8 shadow-xl flex flex-col justify-between">
          <div className="absolute -top-3.5 right-6 rounded-full bg-[#0C68BE] px-3.5 py-1 text-[11px] font-bold text-white shadow-sm">
            RECOMMENDED FOR PRACTITIONERS
          </div>

          <div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold uppercase tracking-wider text-[#0C68BE]">LulaGazette Go Pro</span>
              <span className="text-xs font-bold text-[#0C68BE]">{currencyLabel}</span>
            </div>

            <div className="mt-4 flex items-baseline gap-2">
              <span className="font-display text-4xl font-bold text-[#0B151F]">
                {billingCycle === "monthly" ? price : annualPrice}
              </span>
              <span className="text-xs text-[#86929E]">
                {billingCycle === "monthly" ? "/ month" : "/ year"}
              </span>
            </div>
            <p className="mt-1 text-xs text-[#677480]">Billed {billingCycle} · Cancel anytime with 1 click</p>

            <ul className="mt-8 space-y-3.5 text-xs text-[#112130]">
              <li className="flex items-center gap-2.5">
                <span className="text-[#0C68BE] font-bold">✓</span>
                <span className="font-semibold">Unlimited full PDF and raw text downloads</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="text-[#0C68BE] font-bold">✓</span>
                <span className="font-semibold">Live automated gazette sync &amp; statutory scraper feeds</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="text-[#0C68BE] font-bold">✓</span>
                <span>Team matter folders &amp; procedure checklists</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="text-[#0C68BE] font-bold">✓</span>
                <span>Personal crowdsourced library storage with verified badges</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="text-[#0C68BE] font-bold">✓</span>
                <span>Cross-jurisdiction legal citator (AU, SADC, ECOWAS, EAC)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="text-[#0C68BE] font-bold">✓</span>
                <span>Priority help desk &amp; administrative matter escalation</span>
              </li>
            </ul>
          </div>

          <div className="mt-8">
            {trialActivated ? (
              <div className="rounded-full bg-emerald-100 py-3 text-center text-xs font-bold text-emerald-900 border border-emerald-300">
                ✓ 14-Day Free Pro Trial Activated for {user ? user.name : "Your Session"}!
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setTrialActivated(true)}
                className="w-full rounded-full bg-[#0C68BE] py-3 text-center text-xs font-semibold text-white shadow-md transition hover:bg-[#0F80EB]"
              >
                Start 14-Day Free Trial
              </button>
            )}
            <p className="mt-2 text-center text-[10px] text-[#86929E]">No credit card required to start trial</p>
          </div>
        </div>
      </div>

      {/* Trust Quote from Lulamile */}
      <div className="mt-16 mx-auto max-w-3xl rounded-2xl border border-[#E5EEF5] bg-[#F5F8FB] p-6 sm:p-8 text-center">
        <blockquote className="font-display text-base sm:text-lg italic text-[#0B151F]">
          &ldquo;Legal professionals in South Africa and across the region face fragmented, expensive and incomplete access to legal resources. LulaGazette delivers speed and verifiable citations in a cost-sensitive market.&rdquo;
        </blockquote>
        <p className="mt-3 text-xs font-bold text-[#0C68BE]">
          Lulamile Mkhungela — Founder &amp; Designer, LulaGazette
        </p>
      </div>
    </div>
  );
}
