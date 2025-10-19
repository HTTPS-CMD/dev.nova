"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api-proxy/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload.detail || "ورود ناموفق بود.");
      }

      const data = await response.json();
      window.localStorage.setItem("token", data.access_token);
      window.dispatchEvent(new Event("user-auth-changed"));
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "خطای ناشناخته رخ داد.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-md space-y-6">
      <div className="space-y-2 text-right">
        <h2 className="text-xl font-semibold">ورود به حساب کاربری</h2>
        <p className="text-sm opacity-80">ایمیل و رمز عبور خود را وارد کنید.</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-gray-200 bg-white p-6 shadow">
        <div className="space-y-1 text-right">
          <label className="text-sm font-medium" htmlFor="email">
            ایمیل
          </label>
          <input
            id="email"
            type="email"
            required
            className="w-full rounded-xl border border-gray-300 bg-white p-3 text-right"
            placeholder="example@email.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="space-y-1 text-right">
          <label className="text-sm font-medium" htmlFor="password">
            رمز عبور
          </label>
          <input
            id="password"
            type="password"
            required
            className="w-full rounded-xl border border-gray-300 bg-white p-3 text-right"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-gray-900 py-3 text-white disabled:opacity-50"
        >
          {loading ? "در حال ورود..." : "ورود"}
        </button>
      </form>
    </section>
  );
}
