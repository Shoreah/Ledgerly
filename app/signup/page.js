"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/confirm`,
      },
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg px-5">
        <div className="w-full max-w-[420px] rounded-[10px] border border-border bg-paper p-8 text-center shadow-[0_30px_60px_-20px_rgba(28,42,34,0.45)]">
          <h1 className="font-serif text-[22px] font-medium text-ink">
            Check your email
          </h1>
          <p className="mt-3 text-[14.5px] text-ink-soft">
            We sent a confirmation link to {email}. Click it to activate your
            account, then come back and log in.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-5">
      <div className="w-full max-w-[420px] rounded-[10px] border border-border bg-paper p-8 shadow-[0_30px_60px_-20px_rgba(28,42,34,0.45)]">
        <h1 className="font-serif text-[22px] font-medium text-ink">
          Create your account
        </h1>
        <p className="mt-1.5 text-[14.5px] text-ink-soft">
          Start invoicing in minutes.
        </p>

        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-4">
            <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.05em] text-ink-soft">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-[5px] border border-border bg-white px-[11px] py-[9px] text-[14.5px] text-ink focus:border-margin focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.05em] text-ink-soft">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full rounded-[5px] border border-border bg-white px-[11px] py-[9px] pr-10 text-[14.5px] text-ink focus:border-margin focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-ink-faint hover:text-ink-soft"
              >
                {showPassword ? (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {error && <p className="mb-4 text-[13.5px] text-stamp">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded border border-transparent bg-ink px-5 py-[11px] text-[14.5px] font-semibold text-paper hover:bg-[#0f1811] disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="mt-5 text-center text-[13.5px] text-ink-soft">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-semibold text-margin hover:underline"
          >
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
