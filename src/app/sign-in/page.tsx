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
  const [organization, setOrganization] = useState("");
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
      }, 700);
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
        organization: organization || undefined,
      });
      setMessage({ text: `Account created! Welcome to LulaGazette, ${name}.`, type: "success" });
      setTimeout(() => {
        router.push("/account");
      }, 700);
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
    }, 600);
  }

  return (
    <div className="mx-auto flex min-h-[75vh] max-w-xl flex-col justify-center px-4 py-12 sm:px-6">
      {/* If already signed in */}
      {user && (
        <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-emerald-950">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{user.flag}</span>
              <div>
                <p className="font-semibold text-emerald-900">Currently signed in as {user.name}</p>
                <p className="text-xs text-emerald-700">
                  {user.roleTitle} · {user.country} ({user.email})
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Link
                href="/account"
                className="rounded-xl bg-emerald-700 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-800"
              >
                My Account
              </Link>
              <button
                onClick={logout}
                className="rounded-xl border border-emerald-300 bg-white px-3 py-1.5 text-xs font-semibold text-emerald-800 hover:bg-emerald-100"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="rounded-3xl border border-[#E5EEF5] bg-white p-6 shadow-card sm:p-8">
        {/* Tab switch */}
        <div className="flex rounded-2xl border border-[#E5EEF5] bg-[#F5F8FB] p-1">
          <button
            type="button"
            onClick={() => {
              setMode("signin");
              setMessage(null);
            }}
            className={`flex-1 rounded-xl py-2 text-xs font-semibold transition ${
              mode === "signin" ? "bg-white text-[#0B151F] shadow-xs" : "text-[#677480] hover:text-[#0B151F]"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("signup");
              setMessage(null);
            }}
            className={`flex-1 rounded-xl py-2 text-xs font-semibold transition ${
              mode === "signup" ? "bg-white text-[#0B151F] shadow-xs" : "text-[#677480] hover:text-[#0B151F]"
            }`}
          >
            Create Account
          </button>
        </div>

        <div className="mt-6">
          <h1 className="font-display text-2xl font-semibold text-[#0B151F]">
            {mode === "signin" ? "Sign in to LulaGazette" : "Join the Pan-African Legal Network"}
          </h1>
          <p className="mt-1 text-xs text-[#677480]">
            {mode === "signin"
              ? "Access full official gazettes, save matters, run multi-source scrapers, and research across African courts."
              : "Register your profile across 54 African jurisdictions. Save documents, notes, and research history."}
          </p>
        </div>

        {/* Message notification */}
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

        {/* Sign In Form */}
        {mode === "signin" ? (
          <form onSubmit={handleSignIn} className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-medium text-[#112130]">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="advocate@chambers.co.za"
                required
                className="mt-1.5 w-full rounded-xl border border-[#E5EEF5] bg-[#F5F8FB] px-3.5 py-2.5 text-xs text-[#112130] outline-none focus:border-[#0C68BE] focus:bg-white focus:ring-2 focus:ring-[#0C68BE]/20"
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="block text-xs font-medium text-[#112130]">Password</label>
                <span className="text-[11px] text-[#0C68BE] hover:underline cursor-pointer">Forgot password?</span>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="mt-1.5 w-full rounded-xl border border-[#E5EEF5] bg-[#F5F8FB] px-3.5 py-2.5 text-xs text-[#112130] outline-none focus:border-[#0C68BE] focus:bg-white focus:ring-2 focus:ring-[#0C68BE]/20"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 w-full rounded-full bg-[#0C68BE] py-3 text-xs font-semibold text-white transition hover:bg-[#0F80EB] disabled:opacity-60"
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
            </button>
          </form>
        ) : (
          /* Sign Up Form */
          <form onSubmit={handleSignUp} className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-medium text-[#112130]">Full name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Adv. Nomsa Dlamini"
                required
                className="mt-1.5 w-full rounded-xl border border-[#E5EEF5] bg-[#F5F8FB] px-3.5 py-2.5 text-xs text-[#112130] outline-none focus:border-[#0C68BE] focus:bg-white focus:ring-2 focus:ring-[#0C68BE]/20"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#112130]">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nomsa@law.org.za"
                required
                className="mt-1.5 w-full rounded-xl border border-[#E5EEF5] bg-[#F5F8FB] px-3.5 py-2.5 text-xs text-[#112130] outline-none focus:border-[#0C68BE] focus:bg-white focus:ring-2 focus:ring-[#0C68BE]/20"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-[#112130]">Country (54 Nations)</label>
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-[#E5EEF5] bg-[#F5F8FB] px-3 py-2 text-xs text-[#112130] outline-none focus:border-[#0C68BE] focus:bg-white focus:ring-2 focus:ring-[#0C68BE]/20"
                >
                  {africanCountries.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.flag} {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#112130]">Profession / Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as UserRole)}
                  className="mt-1.5 w-full rounded-xl border border-[#E5EEF5] bg-[#F5F8FB] px-3 py-2 text-xs text-[#112130] outline-none focus:border-[#0C68BE] focus:bg-white focus:ring-2 focus:ring-[#0C68BE]/20"
                >
                  <option value="advocate">Advocate / Barrister</option>
                  <option value="attorney">Admitted Attorney / Solicitor</option>
                  <option value="counsel">Corporate Legal Counsel</option>
                  <option value="researcher">Legal Researcher / Scholar</option>
                  <option value="student">Law Student</option>
                  <option value="citizen">Individual Citizen / Business</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#112130]">Chambers / Firm / University (optional)</label>
              <input
                type="text"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                placeholder="Cape Bar / Bowman Gilfillan / Legal Aid"
                className="mt-1.5 w-full rounded-xl border border-[#E5EEF5] bg-[#F5F8FB] px-3.5 py-2 text-xs text-[#112130] outline-none focus:border-[#0C68BE] focus:bg-white focus:ring-2 focus:ring-[#0C68BE]/20"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#112130]">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="mt-1.5 w-full rounded-xl border border-[#E5EEF5] bg-[#F5F8FB] px-3.5 py-2.5 text-xs text-[#112130] outline-none focus:border-[#0C68BE] focus:bg-white focus:ring-2 focus:ring-[#0C68BE]/20"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 w-full rounded-full bg-[#0C68BE] py-3 text-xs font-semibold text-white transition hover:bg-[#0F80EB] disabled:opacity-60"
            >
              {isSubmitting ? "Creating Account..." : "Create Account & Sign In"}
            </button>
          </form>
        )}

        {/* Demo Fast Logins */}
        <div className="mt-8 border-t border-[#E5EEF5] pt-6">
          <p className="text-center text-xs font-medium text-[#86929E]">
            Or test instantly with verified African practitioner profiles:
          </p>

          <div className="mt-4 grid grid-cols-2 gap-2">
            {DEMO_PROFILES.map((demo) => (
              <button
                key={demo.id}
                type="button"
                onClick={() => handleDemoSelect(demo.id)}
                className="flex items-center gap-2.5 rounded-xl border border-[#E5EEF5] bg-[#F5F8FB] p-2.5 text-left transition hover:border-[#0C68BE] hover:bg-white hover:shadow-xs"
              >
                <span className="text-xl">{demo.flag}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-semibold text-[#112130]">{demo.name}</p>
                  <p className="truncate text-[10px] text-[#677480]">
                    {demo.countryName} · {demo.role}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link href="/s" className="text-xs font-medium text-[#0C68BE] hover:underline">
            ← Continue browsing library without signing in
          </Link>
        </div>
      </div>
    </div>
  );
}
