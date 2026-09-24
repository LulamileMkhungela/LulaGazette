"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getCountryByCode } from "@/data/africanCountries";

type Message = {
  id: string;
  sender: "user" | "admin";
  senderName: string;
  time: string;
  text: string;
  badge?: string;
};

const INITIAL_MESSAGES: Message[] = [
  {
    id: "msg-1",
    sender: "user",
    senderName: "Adv. Nomsa Dlamini",
    time: "10:14 AM",
    text: "Good day support team. I uploaded the Commercial Court practice directive for Kenya earlier today under Matter #LG-2026-881. Can you confirm if it has been verified and indexed for the Kenya jurisdiction?",
  },
  {
    id: "msg-2",
    sender: "admin",
    senderName: "LulaGazette Admin (Lulamile)",
    time: "10:18 AM",
    badge: "Super Admin",
    text: "Hello Adv. Dlamini. Yes, our legal indexing engine has verified the PDF, normalized the neutral citation markers, and cross-referenced with Kenya Law. It is now live and searchable across the Pan-African database.",
  },
  {
    id: "msg-3",
    sender: "user",
    senderName: "Adv. Nomsa Dlamini",
    time: "10:22 AM",
    text: "Thank you! Also, can we pull the newest Government Gazette notices for South Africa regarding the national minimum wage?",
  },
  {
    id: "msg-4",
    sender: "admin",
    senderName: "LulaGazette Admin (Lulamile)",
    time: "10:25 AM",
    badge: "Super Admin",
    text: "Absolutely. You can open the Scraper Hub (/sources) with South Africa selected and trigger 'Pull Data' anytime. The newest notices are synced directly from the Government Gazette / gov.za connector.",
  },
];

export default function SupportPage() {
  const { user, selectedCountry } = useAuth();
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [activeMatterRef, setActiveMatterRef] = useState("Matter #LG-2026-881");
  const [isEscalated, setIsEscalated] = useState(false);

  const activeCountryObj = getCountryByCode(selectedCountry);

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: Message = {
      id: "msg-" + Date.now(),
      sender: "user",
      senderName: user ? user.name : "Legal Researcher",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      text: input,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Simulated admin response
    setTimeout(() => {
      const adminMsg: Message = {
        id: "msg-" + (Date.now() + 1),
        sender: "admin",
        senderName: "LulaGazette Legal Support",
        badge: "Admin",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        text: `Thank you for your inquiry regarding ${activeMatterRef}. Our operations team has logged this request and verified your active jurisdiction (${selectedCountry === "all" ? "Pan-African" : activeCountryObj?.name}).`,
      };
      setMessages((prev) => [...prev, adminMsg]);
    }, 1000);
  }

  function handleEscalate() {
    setIsEscalated(true);
    const alertMsg: Message = {
      id: "msg-" + Date.now(),
      sender: "admin",
      senderName: "Super Admin Desk",
      badge: "Priority Escalation",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      text: `⚡ PRIORITY ESCALATION: ${activeMatterRef} has been flagged for expedited supervisory review. A senior legal technologist has been assigned.`,
    };
    setMessages((prev) => [...prev, alertMsg]);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Top Banner */}
      <div className="rounded-3xl border border-[#E5EEF5] bg-gradient-to-r from-sky-50 via-white to-sky-50/40 p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#0C68BE] border border-[#E5EEF5]">
              <span>💬 Live Practitioner Help Desk</span>
              <span>· {selectedCountry === "all" ? "All Africa" : activeCountryObj?.name}</span>
            </div>
            <h1 className="mt-3 font-display text-2xl font-semibold text-[#0B151F] sm:text-3xl">
              Support, Inquiries &amp; Matter Escalations
            </h1>
            <p className="mt-1 text-xs text-[#677480]">
              Direct conversation between practitioner and administrator — conversations, matter references, and one-tap escalations.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/dashboard"
              className="rounded-xl border border-[#E5EEF5] bg-white px-4 py-2.5 text-xs font-semibold text-[#112130] hover:bg-[#F5F8FB]"
            >
              Dashboard
            </Link>
            <Link
              href="/workspace"
              className="rounded-xl bg-[#0C68BE] px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#0F80EB]"
            >
              Matter Workspace
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        {/* Left Column (8 cols): Interactive Support Chat Desk */}
        <div className="lg:col-span-8">
          <div className="flex flex-col h-[600px] rounded-3xl border border-[#E5EEF5] bg-white shadow-sm overflow-hidden">
            {/* Chat Header */}
            <div className="flex items-center justify-between border-b border-[#E5EEF5] bg-[#F5F8FB] px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-bold text-[#0B151F]">LulaGazette Support Desk</p>
                    <span className="rounded-md bg-[#0C68BE]/10 px-2 py-0.5 text-[10px] font-bold text-[#0C68BE]">
                      {activeMatterRef}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#677480]">Average response time: &lt; 2 minutes</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleEscalate}
                  disabled={isEscalated}
                  className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-800 hover:bg-rose-100 disabled:opacity-50"
                >
                  {isEscalated ? "✓ Escalated" : "⚡ Escalate to Super Admin"}
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex flex-col ${m.sender === "user" ? "items-end" : "items-start"}`}
                >
                  <div className="flex items-center gap-2 text-[11px] text-[#86929E] mb-1">
                    <span className="font-semibold text-[#112130]">{m.senderName}</span>
                    {m.badge && (
                      <span className="rounded-full bg-sky-100 px-2 py-0.2 text-[9px] font-bold text-[#0C68BE]">
                        {m.badge}
                      </span>
                    )}
                    <span>{m.time}</span>
                  </div>
                  <div
                    className={`max-w-xl rounded-2xl p-4 text-xs leading-relaxed ${
                      m.sender === "user"
                        ? "bg-[#0C68BE] text-white rounded-br-xs"
                        : "bg-[#F5F8FB] text-[#112130] border border-[#E5EEF5] rounded-bl-xs"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions & Input Form */}
            <div className="border-t border-[#E5EEF5] p-4 bg-white">
              <div className="flex flex-wrap gap-1.5 mb-3">
                <span className="text-[10px] font-semibold text-[#86929E] self-center">Quick prompt:</span>
                <button
                  type="button"
                  onClick={() => setInput("Can you verify when the newest gazette notices for this country were synced?")}
                  className="rounded-full border border-[#E5EEF5] px-2.5 py-0.5 text-[10px] text-[#677480] hover:border-[#0C68BE] hover:text-[#0C68BE]"
                >
                  Gazette sync check
                </button>
                <button
                  type="button"
                  onClick={() => setInput("How do I export my saved precedents and case notes into a hearing bundle?")}
                  className="rounded-full border border-[#E5EEF5] px-2.5 py-0.5 text-[10px] text-[#677480] hover:border-[#0C68BE] hover:text-[#0C68BE]"
                >
                  Export bundle help
                </button>
                <button
                  type="button"
                  onClick={() => setInput("I found an unindexed High Court ruling that I would like to upload to the library.")}
                  className="rounded-full border border-[#E5EEF5] px-2.5 py-0.5 text-[10px] text-[#677480] hover:border-[#0C68BE] hover:text-[#0C68BE]"
                >
                  Crowdsourced upload query
                </button>
              </div>

              <form onSubmit={handleSend} className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message or matter question..."
                  className="flex-1 rounded-2xl border border-[#E5EEF5] bg-[#F5F8FB] px-4 py-2.5 text-xs text-[#112130] outline-none focus:border-[#0C68BE] focus:bg-white"
                />
                <button
                  type="submit"
                  className="rounded-2xl bg-[#0C68BE] px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#0F80EB]"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Self-Service Guides & FAQs */}
        <div className="space-y-6 lg:col-span-4">
          <div className="rounded-3xl border border-[#E5EEF5] bg-white p-6 shadow-xs">
            <h3 className="font-display text-lg font-semibold text-[#0B151F]">Knowledge Base</h3>
            <div className="mt-4 space-y-3">
              <div className="rounded-xl border border-[#E5EEF5] p-3 text-xs">
                <h4 className="font-semibold text-[#112130]">Country Scoping &amp; Filtering</h4>
                <p className="mt-1 text-[#677480]">
                  Selecting a country in the header pill strictly isolates all searches, acts, gazettes, and scraper endpoints to that nation.
                </p>
              </div>
              <div className="rounded-xl border border-[#E5EEF5] p-3 text-xs">
                <h4 className="font-semibold text-[#112130]">Crowdsourced Library</h4>
                <p className="mt-1 text-[#677480]">
                  Any verified practitioner can upload judgment transcripts, practice directions, or pleadings to crowdsource local authority.
                </p>
              </div>
              <div className="rounded-xl border border-[#E5EEF5] p-3 text-xs">
                <h4 className="font-semibold text-[#112130]">Multi-Source Scraper Sync</h4>
                <p className="mt-1 text-[#677480]">
                  The Harvester engine connects directly to 25 verified gazette printers and apex court registries continent-wide.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-sky-100 bg-sky-50/70 p-6 text-xs text-sky-950">
            <h4 className="font-semibold text-sky-900">Direct Founder Channel</h4>
            <p className="mt-1.5 leading-relaxed text-sky-800">
              For firm-wide integrations, API access, or custom legal engineering workshops, contact:
            </p>
            <p className="mt-3 font-semibold text-[#0C68BE]">
              Lulamile Mkhungela · mkhungela.l@gmail.com
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-block rounded-xl bg-[#0C68BE] px-4 py-2 text-xs font-semibold text-white"
            >
              Book Product Walkthrough
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
