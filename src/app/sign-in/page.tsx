"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) {
      setMessage("Enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setMessage("Password must be at least 6 characters for this demo.");
      return;
    }
    setMessage(
      `Demo only — no account is created. Welcome, ${email}. Explore the SA library from Search or Home.`
    );
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-12 sm:px-6">
      <div className="rounded-3xl border border-lg-line bg-white p-8 shadow-card">
        <h1 className="font-display text-3xl text-lg-navy">Sign in</h1>
        <p className="mt-2 text-sm text-lg-muted">
          Local demo authentication. Credentials stay in your browser session message only — nothing is sent to a
          server backend.
        </p>
        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <label className="block text-sm font-medium text-lg-slate">
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-lg-line bg-lg-wash px-3 py-2.5 outline-none focus:border-lg-blue focus:bg-white focus:ring-2 focus:ring-lg-blue/20"
              placeholder="you@firm.co.za"
              required
            />
          </label>
          <label className="block text-sm font-medium text-lg-slate">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-lg-line bg-lg-wash px-3 py-2.5 outline-none focus:border-lg-blue focus:bg-white focus:ring-2 focus:ring-lg-blue/20"
              placeholder="••••••••"
              required
            />
          </label>
          <button
            type="submit"
            className="w-full rounded-full bg-lg-blue py-3 text-sm font-semibold text-white hover:bg-lg-blue-bright"
          >
            Sign in
          </button>
        </form>
        {message && (
          <p className="mt-4 rounded-xl bg-lg-wash px-3 py-2 text-sm text-lg-slate" role="status">
            {message}
          </p>
        )}
        <p className="mt-6 text-center text-sm text-lg-muted">
          <Link href="/s" className="font-semibold text-lg-blue hover:underline">
            Continue without signing in
          </Link>
        </p>
      </div>
    </div>
  );
}
