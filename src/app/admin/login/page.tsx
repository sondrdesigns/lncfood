"use client";

import { useState, useTransition, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white rounded-2xl border border-border shadow-sm p-8">
        <h1 className="text-2xl mb-1" style={{ fontWeight: 700 }}>
          Admin sign in
        </h1>
        <p className="text-foreground/60 text-sm mb-8">
          L&amp;C Food Distribution content management
        </p>
        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}

function LoginForm() {
  const router = useRouter();
  const sp = useSearchParams();
  const callbackUrl = sp.get("callbackUrl") ?? "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl,
      });
      if (!res || res.error) {
        if (res?.code === "rate_limited" || res?.error === "rate_limited") {
          setError("Too many login attempts. Try again in 15 minutes.");
        } else {
          setError("Invalid email or password.");
        }
        return;
      }
      router.push(callbackUrl);
      router.refresh();
    });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm mb-1.5" style={{ fontWeight: 500 }}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2.5 bg-secondary rounded-lg border border-transparent focus:border-primary focus:outline-none transition-colors"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm mb-1.5" style={{ fontWeight: 500 }}>
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2.5 bg-secondary rounded-lg border border-transparent focus:border-primary focus:outline-none transition-colors"
        />
      </div>
      {error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
          {error}
        </div>
      )}
      <button
        type="submit"
        disabled={pending}
        className="w-full px-4 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-60"
        style={{ fontWeight: 600 }}
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
