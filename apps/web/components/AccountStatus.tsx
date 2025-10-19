"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type UserProfile = {
  id: number;
  email: string;
  full_name?: string | null;
};

export default function AccountStatus() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = window.localStorage.getItem("token");
      if (!token) {
        setUser(null);
        setError(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch("/api-proxy/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) {
          throw new Error("AUTH_ERROR");
        }
        const data = await response.json();
        setUser(data);
        setError(null);
      } catch (err) {
        window.localStorage.removeItem("token");
        setError("نشست شما منقضی شده است. دوباره وارد شوید.");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();

    const handleStorage = (event: StorageEvent) => {
      if (event.key === "token") {
        fetchProfile();
      }
    };

    const handleAuthChange = () => fetchProfile();

    window.addEventListener("storage", handleStorage);
    window.addEventListener("user-auth-changed", handleAuthChange);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("user-auth-changed", handleAuthChange);
    };
  }, []);

  if (loading) {
    return <span className="text-xs opacity-70">در حال بررسی حساب...</span>;
  }

  if (user) {
    return (
      <div className="flex flex-col items-end gap-1 text-sm text-right">
        <span className="font-semibold">{user.full_name || user.email}</span>
        <button
          onClick={() => {
            window.localStorage.removeItem("token");
            setUser(null);
            setError(null);
            window.dispatchEvent(new Event("user-auth-changed"));
          }}
          className="text-xs text-red-600 hover:underline"
        >
          خروج از حساب
        </button>
        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-end gap-1 text-sm">
      {error && <span className="text-xs text-red-500">{error}</span>}
      <div className="flex gap-3">
        <Link className="hover:underline" href="/login">
          ورود
        </Link>
        <Link className="hover:underline" href="/register">
          ثبت‌نام
        </Link>
      </div>
    </div>
  );
}
