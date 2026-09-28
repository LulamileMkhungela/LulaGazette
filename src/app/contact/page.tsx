"use client";

import { FormEvent, useState } from "react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "");
    const email = String(fd.get("email") || "");
    const topic = String(fd.get("topic") || "General");
    const message = String(fd.get("message") || "");
    const subject = encodeURIComponent(`LulaGazette — ${topic} — ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${fd.get("phone") || ""}\nOrganisation: ${fd.get("org") || ""}\nTopic: ${topic}\n\n${message}`
    );
    window.location.href = `mailto:mkhungela.l@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-4xl text-[#0B151F]">Contact Us</h1>
      <p className="mt-3 text-sm leading-6 text-[#677480]">
        Hi — I’m <strong className="text-[#112130]">Lulamile Mkhungela</strong>, founder of LulaGazette. I’m a product
        builder, not an attorney. Write if you want a <strong>system overview</strong>, want to{" "}
        <strong>integrate</strong> LulaGazette with tools you already use, or have a product question. For legal advice
        on a live matter, please instruct an admitted South African attorney or advocate (Directory can help you find
        starting points).
      </p>

      <div className="mt-8 space-y-3 rounded-2xl border border-[#E5EEF5] bg-white p-6 shadow-sm">
        <h2 className="text-sm font-bold uppercase tracking-wide text-[#0C68BE]">Reach me</h2>
        <p className="text-sm text-[#1D2E40]">
          <span className="font-semibold text-[#0B151F]">Address</span>
          <br />
          41 Juta Street
          <br />
          Braamfontein
          <br />
          Johannesburg
        </p>
        <p className="text-sm text-[#1D2E40]">
          <span className="font-semibold text-[#0B151F]">Email</span>
          <br />
          <a className="text-[#0C68BE] hover:underline" href="mailto:mkhungela.l@gmail.com">
            mkhungela.l@gmail.com
          </a>
        </p>
        <p className="text-sm text-[#1D2E40]">
          <span className="font-semibold text-[#0B151F]">Phone</span>
          <br />
          <a className="text-[#0C68BE] hover:underline" href="tel:+27837195064">
            083 719 5064
          </a>
        </p>
      </div>

      <form onSubmit={onSubmit} className="mt-8 space-y-4 rounded-2xl border border-[#E5EEF5] bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-[#0B151F]">Send a message</h2>
        <Field label="Full name" name="name" required />
        <Field label="Email" name="email" type="email" required placeholder="you@company.co.za" />
        <Field label="Phone" name="phone" placeholder="083…" />
        <Field label="Organisation (optional)" name="org" placeholder="Firm / company / clinic" />
        <label className="block text-sm font-medium text-[#1D2E40]">
          Topic
          <select
            name="topic"
            className="mt-1.5 w-full rounded-xl border border-[#E5EEF5] bg-[#FAFDFF] px-3 py-2.5 text-sm outline-none focus:border-[#0C68BE] focus:bg-white"
            defaultValue="System overview"
          >
            <option>System overview</option>
            <option>Business / product integration</option>
            <option>Pricing & packages</option>
            <option>University / clinic partnership</option>
            <option>General platform question</option>
          </select>
        </label>
        <label className="block text-sm font-medium text-[#1D2E40]">
          Message
          <textarea
            name="message"
            required
            rows={5}
            placeholder="What do you want to see or connect?"
            className="mt-1.5 w-full rounded-xl border border-[#E5EEF5] bg-[#FAFDFF] px-3 py-2.5 outline-none focus:border-[#0C68BE] focus:bg-white focus:ring-2 focus:ring-[#0C68BE]/20"
          />
        </label>
        <button
          type="submit"
          className="rounded-full bg-[#0C68BE] px-6 py-3 text-sm font-semibold text-white hover:bg-[#0F80EB]"
        >
          Email mkhungela.l@gmail.com
        </button>
        {sent && (
          <p className="rounded-xl bg-emerald-50 px-3 py-2 text-sm text-emerald-800" role="status">
            Your email app should open. You can also call 083 719 5064.
          </p>
        )}
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block text-sm font-medium text-[#1D2E40]">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-xl border border-[#E5EEF5] bg-[#FAFDFF] px-3 py-2.5 outline-none focus:border-[#0C68BE] focus:bg-white focus:ring-2 focus:ring-[#0C68BE]/20"
      />
    </label>
  );
}
