'use client';

import { useEffect, useState } from "react";

type UploadedBook = {
  id: number;
  title: string;
  original_filename: string;
  created_at: string;
};

export default function SummariesPage() {
  const [text, setText] = useState("");
  const [markdown, setMarkdown] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [bookFile, setBookFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState(false);
  const [books, setBooks] = useState<UploadedBook[]>([]);

  useEffect(() => {
    const loadBooks = async () => {
      const token = window.localStorage.getItem("token");
      if (!token) {
        setBooks([]);
        return;
      }

      const response = await fetch("/api-proxy/books", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setBooks(data);
      }
    };

    loadBooks();

    const handleAuthChange = () => {
      loadBooks();
    };

    window.addEventListener("user-auth-changed", handleAuthChange);

    return () => {
      window.removeEventListener("user-auth-changed", handleAuthChange);
    };
  }, []);

  const submit = async () => {
    setLoading(true);
    setMarkdown("");
    const res = await fetch("/api-proxy/summaries/extract", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const data = await res.json();
    setMarkdown(data.markdown);
    setLoading(false);
  };

  const uploadBook = async () => {
    if (!bookFile) {
      setUploadError(true);
      setUploadMessage("لطفاً یک فایل PDF انتخاب کنید.");
      return;
    }

    const token = window.localStorage.getItem("token");
    if (!token) {
      setUploadError(true);
      setUploadMessage("برای بارگذاری ابتدا وارد حساب شوید.");
      return;
    }

    const formData = new FormData();
    formData.append("file", bookFile);

    setUploading(true);
    setUploadMessage(null);
    setUploadError(false);

    try {
      const response = await fetch("/api-proxy/books", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload.detail || "بارگذاری ناموفق بود.");
      }
      const data = await response.json();
      setBooks((prev) => [data, ...prev]);
      setUploadError(false);
      setUploadMessage("فایل با موفقیت ذخیره شد.");
      setBookFile(null);
    } catch (err: any) {
      setUploadError(true);
      setUploadMessage(err.message || "خطا در بارگذاری فایل.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">خلاصه‌ساز متنی</h2>
        <p className="text-sm opacity-80">متن خود را وارد کنید تا خلاصهٔ استخراجی ایجاد شود.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <textarea
          className="min-h-[240px] w-full rounded-2xl border border-gray-200 p-4 text-right"
          placeholder="متن حقوقی خود را اینجا قرار دهید..."
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
        <div className="min-h-[240px] w-full rounded-2xl border border-dashed border-gray-200 p-4 text-sm whitespace-pre-wrap">
          {loading ? "در حال پردازش..." : markdown || "خلاصه در اینجا نمایش داده می‌شود."}
        </div>
      </div>
      <button
        onClick={submit}
        disabled={loading || !text}
        className="px-6 py-2 rounded-xl bg-gray-900 text-white disabled:opacity-40"
      >
        ساخت خلاصه
      </button>
      <div className="space-y-3 rounded-2xl border border-dashed border-gray-300 bg-white p-6">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">بارگذاری کتاب حقوقی به صورت PDF</h3>
          <p className="text-sm opacity-70">
            فایل‌های بارگذاری‌شده در حساب شما ذخیره می‌شوند و می‌توانید از آن‌ها برای پردازش‌های بعدی استفاده کنید.
          </p>
        </div>
        <div className="flex flex-col gap-3 text-sm">
          <input
            type="file"
            accept="application/pdf"
            onChange={(event) => setBookFile(event.target.files?.[0] || null)}
            className="w-full rounded-xl border border-gray-300 p-3"
          />
          <button
            type="button"
            onClick={uploadBook}
            disabled={uploading}
            className="w-full rounded-xl bg-emerald-600 py-3 text-white disabled:opacity-50"
          >
            {uploading ? "در حال بارگذاری..." : "بارگذاری فایل"}
          </button>
          {uploadMessage && (
            <span className={`text-sm ${uploadError ? "text-red-600" : "text-emerald-700"}`}>
              {uploadMessage}
            </span>
          )}
        </div>
        {books.length > 0 && (
          <div className="space-y-2 text-sm">
            <h4 className="font-semibold">کتاب‌های بارگذاری‌شده</h4>
            <ul className="space-y-2">
              {books.map((book) => (
                <li key={book.id} className="rounded-xl border border-gray-200 p-3">
                  <div className="font-medium">{book.title}</div>
                  <div className="text-xs opacity-70">نام فایل: {book.original_filename}</div>
                  <div className="text-xs opacity-70">
                    تاریخ بارگذاری: {new Date(book.created_at).toLocaleDateString("fa-IR")}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
