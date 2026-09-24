"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useAuth, DEMO_PROFILES, UserRole } from "@/context/AuthContext";
import { africanCountries } from "@/data/africanCountries";

export default function SignInPage() {
  const router = useRouter();
  const { login, signup, loginAsDemo, user, logout } = useAuth();

  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [countryCode, setCountryCode] = useState("ZA");
  const [role, setRole] = useState<UserRole>("advocate");
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSignIn(e: FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) {
      setMessage({ text: "Please enter a valid email address.", type: "error" });
      return;
    }
    if (password.length < 4) {
      setMessage({ text: "Password must be at least 4 characters.", type: "error" });
      return;
    }

    setIsSubmitting(true);
    try {
      await login(email, password, countryCode, role);
      setMessage({ text: `Welcome back, ${email.split("@")[0]}! Signed in successfully.`, type: "success" });
      setTimeout(() => {
        router.push("/account");
      }, 500);
    } catch {
      setMessage({ text: "Sign-in failed. Please try again.", type: "error" });
      setIsSubmitting(false);
    }
  }

  async function handleSignUp(e: FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setMessage({ text: "Please enter your full name.", type: "error" });
      return;
    }
    if (!email.includes("@")) {
      setMessage({ text: "Please enter a valid email address.", type: "error" });
      return;
    }
    if (password.length < 4) {
      setMessage({ text: "Password must be at least 4 characters.", type: "error" });
      return;
    }

    setIsSubmitting(true);
    try {
      await signup({
        name,
        email,
        password,
        countryCode,
        role,
      });
      setMessage({ text: `Account created! Welcome to LulaGazette, ${name}.`, type: "success" });
      setTimeout(() => {
        router.push("/account");
      }, 500);
    } catch {
      setMessage({ text: "Could not create account. Please try again.", type: "error" });
      setIsSubmitting(false);
    }
  }

  function handleDemoSelect(demoId: string) {
    loginAsDemo(demoId);
    const selected = DEMO_PROFILES.find((d) => d.id === demoId);
    setMessage({
      text: `Signed in as ${selected?.name} (${selected?.countryName}). Redirecting...`,
      type: "success",
    });
    setTimeout(() => {
      router.push("/account");
    }, 450);
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-12 sm:px-6">
      {/* Active User Banner */}
      {user && (
        <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-950">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">{user.flag}</span>
              <div>
                <p className="text-sm font-semibold text-emerald-900">Signed in as {user.name}</p>
                <p className="text-xs text-emerald-700">
                  {user.roleTitle} · {user.country}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/account"
                className="rounded-lg bg-emerald-700 px-2.5 py-1 text-xs font-semibold text-white hover:bg-emerald-800"
              >
                Account
              </Link>
              <button
                type="button"
                onClick={logout}
                className="rounded-lg border border-emerald-300 bg-white px-2.5 py-1 text-xs font-semibold text-emerald-800 hover:bg-emerald-100"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Auth Card */}
      <div className="rounded-3xl border border-lg-line bg-white p-8 shadow-card">
        {/* Toggle Mode */}
        <div className="flex rounded-xl border border-lg-line bg-lg-wash p-1">
          <button
            type="button"
            onClick={() => {
              setMode("signin");
              setMessage(null);
            }}
            className={`flex-1 rounded-lg py-1.5 text-xs font-semibold transition ${
              mode === "signin" ? "bg-white text-lg-navy shadow-xs" : "text-lg-muted hover:text-lg-navy"
            }`}
          >
            Sign in
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("signup");
              setMessage(null);
            }}
            className={`flex-1 rounded-lg py-1.5 text-xs font-semibold transition ${
              mode === "signup" ? "bg-white text-lg-navy shadow-xs" : "text-lg-muted hover:text-lg-navy"
            }`}
          >
            Create account
          </button>
        </div>

        <div className="mt-6">
          <h1 className="font-display text-3xl text-lg-navy">
            {mode === "signin" ? "Sign in" : "Create account"}
          </h1>
          <p className="mt-2 text-sm text-lg-muted">
            {mode === "signin"
              ? "Access official gazettes, saved matters, and research tools across 54 African jurisdictions."
              : "Register your profile to access Pan-African gazette records and court decisions."}
          </p>
        </div>

        {message && (
          <div
            className={`mt-4 rounded-xl p-3 text-xs font-medium ${
              message.type === "success"
                ? "border border-emerald-200 bg-emerald-50 text-emerald-900"
                : "border border-rose-200 bg-rose-50 text-rose-900"
            }`}
          >
            {message.text}
          </div>
        )}

        {mode === "signin" ? (
          <form onSubmit={handleSignIn} className="mt-6 space-y-4">
            <label className="block text-sm font-medium text-lg-slate">
              Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@firm.co.za"
                required
                className="mt-1.5 w-full rounded-xl border border-lg-line bg-lg-wash px-3 py-2.5 text-sm text-lg-ink outline-none focus:border-lg-blue focus:bg-white focus:ring-2 focus:ring-lg-blue/20"
              />
            </label>
            <label className="block text-sm font-medium text-lg-slate">
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="mt-1.5 w-full rounded-xl border border-lg-line bg-lg-wash px-3 py-2.5 text-sm text-lg-ink outline-none focus:border-lg-blue focus:bg-white focus:ring-2 focus:ring-lg-blue/20"
              />
            </label>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-full bg-lg-blue py-3 text-sm font-semibold text-white transition hover:bg-lg-blue-bright disabled:opacity-60"
            >
              {isSubmitting ? "Signing in..." : "Sign in"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleSignUp} className="mt-6 space-y-4">
            <label className="block text-sm font-medium text-lg-slate">
              Full Name
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Adv. Nomsa Dlamini"
                required
                className="mt-1.5 w-full rounded-xl border border-lg-line bg-lg-wash px-3 py-2.5 text-sm text-lg-ink outline-none focus:border-lg-blue focus:bg-white focus:ring-2 focus:ring-lg-blue/20"
              />
            </label>
            <label className="block text-sm font-medium text-lg-slate">
              Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nomsa@law.org.za"
                required
                className="mt-1.5 w-full rounded-xl border border-lg-line bg-lg-wash px-3 py-2.5 text-sm text-lg-ink outline-none focus:border-lg-blue focus:bg-white focus:ring-2 focus:ring-lg-blue/20"
              />
            </label>
            <label className="block text-sm font-medium text-lg-slate">
              Jurisdiction (54 African Countries)
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-lg-line bg-lg-wash px-3 py-2.5 text-sm text-lg-ink outline-none focus:border-lg-blue focus:bg-white focus:ring-2 focus:ring-lg-blue/20"
              >
                {africanCountries.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-sm font-medium text-lg-slate">
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="mt-1.5 w-full rounded-xl border border-lg-line bg-lg-wash px-3 py-2.5 text-sm text-lg-ink outline-none focus:border-lg-blue focus:bg-white focus:ring-2 focus:ring-lg-blue/20"
              />
            </label>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-full bg-lg-blue py-3 text-sm font-semibold text-white transition hover:bg-lg-blue-bright disabled:opacity-60"
            >
              {isSubmitting ? "Creating account..." : "Create account"}
            </button>
          </form>
        )}

        {/* Instant Demo Sign-in */}
        <div className="mt-8 border-t border-lg-line pt-5">
          <p className="text-center text-xs font-medium text-lg-muted">
            Instant demo sign-in:
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {DEMO_PROFILES.map((demo) => (
              <button
                key={demo.id}
                type="button"
                onClick={() => handleDemoSelect(demo.id)}
                className="flex items-center gap-2 rounded-xl border border-lg-line bg-lg-wash px-2.5 py-2 text-left transition hover:border-lg-blue hover:bg-white"
              >
                <span className="text-lg">{demo.flag}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-semibold text-lg-slate">{demo.name}</p>
                  <p className="truncate text-[10px] text-lg-muted">{demo.countryName}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-lg-muted">
          <Link href="/s" className="font-semibold text-lg-blue hover:underline">
            Continue without signing in
          </Link>
        </p>
      </div>
    </div>
  );
}
