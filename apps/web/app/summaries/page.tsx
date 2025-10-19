'use client';

import { useState } from "react";

export default function SummariesPage() {
  const [text, setText] = useState("");
  const [markdown, setMarkdown] = useState<string>("");
  const [loading, setLoading] = useState(false);

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
    </section>
  );
}
