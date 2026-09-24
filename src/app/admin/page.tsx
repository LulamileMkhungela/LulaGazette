"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { documents } from "@/data/legal";
import { externalSources } from "@/data/sources";
import { africanCountries } from "@/data/africanCountries";

export default function AdminPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"overview" | "database" | "users" | "scrapers">("overview");

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="rounded-3xl border border-[#E5EEF5] bg-gradient-to-r from-slate-900 to-[#0B151F] p-6 text-white sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-sky-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Super Admin Console · Role-Based Control
            </div>
            <h1 className="mt-3 font-display text-2xl font-semibold sm:text-3xl">
              LulaGazette Operations &amp; Analytics Hub
            </h1>
            <p className="mt-1 text-xs text-white/70">
              Pan-African legal database administration, registration curve metrics, scraper status, and user management.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/dashboard"
              className="rounded-xl bg-white/10 px-4 py-2 text-xs font-semibold text-white hover:bg-white/20"
            >
              User View
            </Link>
            <Link
              href="/sources"
              className="rounded-xl bg-[#0C68BE] px-4 py-2 text-xs font-semibold text-white hover:bg-[#0F80EB]"
            >
              Scraper Hub
            </Link>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="mt-6 flex flex-wrap gap-2 border-t border-white/10 pt-4">
          <button
            onClick={() => setActiveTab("overview")}
            className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
              activeTab === "overview" ? "bg-white text-[#0B151F]" : "text-white/70 hover:text-white"
            }`}
          >
            Overview &amp; KPIs
          </button>
          <button
            onClick={() => setActiveTab("database")}
            className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
              activeTab === "database" ? "bg-white text-[#0B151F]" : "text-white/70 hover:text-white"
            }`}
          >
            Legal Database ({documents.length})
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
              activeTab === "users" ? "bg-white text-[#0B151F]" : "text-white/70 hover:text-white"
            }`}
          >
            User Management &amp; Tiers
          </button>
          <button
            onClick={() => setActiveTab("scrapers")}
            className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
              activeTab === "scrapers" ? "bg-white text-[#0B151F]" : "text-white/70 hover:text-white"
            }`}
          >
            Connectors ({externalSources.length})
          </button>
        </div>
      </div>

      {/* 4 Launch KPIs - Exact from Lulamile's Portfolio */}
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-2xl border border-[#E5EEF5] bg-white p-5 shadow-xs">
          <p className="text-xs font-semibold text-[#86929E] uppercase tracking-wider">Registered Users Target</p>
          <p className="mt-2 text-3xl font-bold text-[#0B151F]">5,000+</p>
          <p className="mt-1 text-xs text-emerald-600 font-medium">↑ 20% MoM growth rate</p>
          <p className="mt-2 text-[11px] text-[#677480]">Year 1 launch trajectory</p>
        </div>

        <div className="rounded-2xl border border-[#E5EEF5] bg-white p-5 shadow-xs">
          <p className="text-xs font-semibold text-[#86929E] uppercase tracking-wider">Session Activation</p>
          <p className="mt-2 text-3xl font-bold text-[#0B151F]">34.8%</p>
          <p className="mt-1 text-xs text-emerald-600 font-medium">Target: &gt; 30%</p>
          <p className="mt-2 text-[11px] text-[#677480]">Search / upload in session 1</p>
        </div>

        <div className="rounded-2xl border border-[#E5EEF5] bg-white p-5 shadow-xs">
          <p className="text-xs font-semibold text-[#86929E] uppercase tracking-wider">DAU / MAU Stickiness</p>
          <p className="mt-2 text-3xl font-bold text-[#0B151F]">21.4%</p>
          <p className="mt-1 text-xs text-[#0C68BE] font-medium">Band: 15% – 25%</p>
          <p className="mt-2 text-[11px] text-[#677480]">Research tool engagement</p>
        </div>

        <div className="rounded-2xl border border-[#E5EEF5] bg-white p-5 shadow-xs">
          <p className="text-xs font-semibold text-[#86929E] uppercase tracking-wider">Monthly Retention</p>
          <p className="mt-2 text-3xl font-bold text-[#0B151F]">68.2%</p>
          <p className="mt-1 text-xs text-emerald-600 font-medium">Churn &lt; 12%</p>
          <p className="mt-2 text-[11px] text-[#677480]">Target: &gt; 60% active retention</p>
        </div>
      </div>

      {activeTab === "overview" && (
        <div className="mt-8 space-y-8">
          {/* Registration Curve Chart Representation */}
          <div className="rounded-3xl border border-[#E5EEF5] bg-white p-6 shadow-xs">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display text-lg font-semibold text-[#0B151F]">Registration Curve &amp; Growth Trajectory</h2>
                <p className="text-xs text-[#677480]">Monthly active users and Go Pro conversions over launch cohorts.</p>
              </div>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                12.4% Free-to-Pro Conversion
              </span>
            </div>

            <div className="mt-6 flex h-44 items-end gap-3 pt-6 border-b border-[#E5EEF5]">
              {[
                { month: "Apr", count: 420, pro: 45 },
                { month: "May", count: 680, pro: 82 },
                { month: "Jun", count: 1100, pro: 135 },
                { month: "Jul", count: 1840, pro: 230 },
                { month: "Aug", count: 2650, pro: 340 },
                { month: "Sep", count: 3820, pro: 480 },
              ].map((bar) => {
                const heightPercent = Math.round((bar.count / 4000) * 100);
                return (
                  <div key={bar.month} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                    <span className="text-[10px] font-bold text-[#0C68BE]">{bar.count}</span>
                    <div
                      className="w-full rounded-t-lg bg-gradient-to-t from-[#0C68BE] to-sky-400"
                      style={{ height: `${heightPercent}%` }}
                    />
                    <span className="text-[11px] font-semibold text-[#677480]">{bar.month}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Upload History & Moderation Queue */}
          <div className="rounded-3xl border border-[#E5EEF5] bg-white p-6 shadow-xs">
            <h2 className="font-display text-lg font-semibold text-[#0B151F]">Recent Document Uploads &amp; Submissions</h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#E5EEF5] text-[#86929E]">
                    <th className="pb-2">Title</th>
                    <th className="pb-2">Jurisdiction</th>
                    <th className="pb-2">Category</th>
                    <th className="pb-2">Uploader</th>
                    <th className="pb-2">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5EEF5]">
                  <tr>
                    <td className="py-3 font-medium text-[#0B151F]">High Court Electronic Service Directive 2026</td>
                    <td className="py-3">🇿🇦 South Africa</td>
                    <td className="py-3">Court Rules</td>
                    <td className="py-3 text-[#677480]">Adv. Nomsa Dlamini</td>
                    <td className="py-3 text-emerald-600 font-bold">✓ Approved</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium text-[#0B151F]">Companies Act Beneficial Ownership Guide</td>
                    <td className="py-3">🇬🇭 Ghana</td>
                    <td className="py-3">Acts</td>
                    <td className="py-3 text-[#677480]">Kwame Mensah</td>
                    <td className="py-3 text-emerald-600 font-bold">✓ Approved</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium text-[#0B151F]">Milimani Commercial Division Hearing Notice</td>
                    <td className="py-3">🇰🇪 Kenya</td>
                    <td className="py-3">Gazettes</td>
                    <td className="py-3 text-[#677480]">Dr. Amina Ochieng</td>
                    <td className="py-3 text-emerald-600 font-bold">✓ Approved</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === "database" && (
        <div className="mt-8 rounded-3xl border border-[#E5EEF5] bg-white p-6 shadow-xs">
          <h2 className="font-display text-lg font-semibold text-[#0B151F]">
            Pan-African Legal Database Breakdown ({documents.length} Records)
          </h2>
          <p className="mt-1 text-xs text-[#677480]">
            Coverage across 54 sovereign African countries and regional judicial tribunals.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {africanCountries.map((c) => {
              const count = documents.filter((d) => d.countryCode === c.code).length;
              return (
                <div key={c.code} className="flex items-center justify-between rounded-xl border border-[#E5EEF5] p-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{c.flag}</span>
                    <div>
                      <p className="text-xs font-semibold text-[#112130]">{c.name}</p>
                      <p className="text-[10px] text-[#86929E]">{c.legalSystem}</p>
                    </div>
                  </div>
                  <span className="rounded-md bg-[#F5F8FB] px-2 py-0.5 text-xs font-bold text-[#0C68BE]">
                    {count} docs
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === "users" && (
        <div className="mt-8 rounded-3xl border border-[#E5EEF5] bg-white p-6 shadow-xs">
          <h2 className="font-display text-lg font-semibold text-[#0B151F]">Practitioner User Accounts</h2>
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between rounded-xl border border-[#E5EEF5] p-3.5">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🇿🇦</span>
                <div>
                  <p className="text-xs font-bold text-[#0B151F]">Lulamile Mkhungela</p>
                  <p className="text-[11px] text-[#677480]">mkhungela.l@gmail.com · Advocate of the High Court (SA)</p>
                </div>
              </div>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                Super Admin
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-[#E5EEF5] p-3.5">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🇰🇪</span>
                <div>
                  <p className="text-xs font-bold text-[#0B151F]">Dr. Amina Ochieng</p>
                  <p className="text-[11px] text-[#677480]">amina.ochieng@uonbi.ac.ke · Constitutional Scholar (KE)</p>
                </div>
              </div>
              <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-bold text-sky-800">
                Go Pro Subscriber
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-[#E5EEF5] p-3.5">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🇳🇬</span>
                <div>
                  <p className="text-xs font-bold text-[#0B151F]">Barrister Chinedu Adeleke</p>
                  <p className="text-[11px] text-[#677480]">chinedu.adeleke@adelekepartners.ng · Corporate Counsel (NG)</p>
                </div>
              </div>
              <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-bold text-sky-800">
                Go Pro Subscriber
              </span>
            </div>
          </div>
        </div>
      )}

      {activeTab === "scrapers" && (
        <div className="mt-8 rounded-3xl border border-[#E5EEF5] bg-white p-6 shadow-xs">
          <h2 className="font-display text-lg font-semibold text-[#0B151F]">
            Connected Legal Sources ({externalSources.length})
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {externalSources.map((s) => (
              <div key={s.id} className="rounded-xl border border-[#E5EEF5] p-3.5 flex justify-between items-center">
                <div>
                  <p className="text-xs font-bold text-[#0B151F]">{s.name}</p>
                  <p className="text-[11px] text-[#677480]">{s.country || "Pan-African"}</p>
                </div>
                <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                  ● 100% HEALTHY
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
