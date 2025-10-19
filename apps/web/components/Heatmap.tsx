'use client';

const topics = [
  { name: "آیین دادرسی مدنی", score: 0.7 },
  { name: "آیین دادرسی کیفری", score: 0.55 },
  { name: "حقوق تجارت", score: 0.82 },
  { name: "حقوق مدنی", score: 0.65 },
  { name: "اصول فقه", score: 0.58 },
];

const shades = [
  "bg-red-200",
  "bg-orange-200",
  "bg-amber-200",
  "bg-lime-200",
  "bg-emerald-200",
];

export default function Heatmap() {
  return (
    <div className="grid gap-3">
      {topics.map((topic) => {
        const level = Math.min(shades.length - 1, Math.floor(topic.score * shades.length));
        return (
          <div key={topic.name} className={`rounded-2xl p-4 text-sm ${shades[level]}`}>
            <div className="font-semibold">{topic.name}</div>
            <div className="opacity-80">دقت: {(topic.score * 100).toFixed(0)}٪</div>
          </div>
        );
      })}
    </div>
  );
}
