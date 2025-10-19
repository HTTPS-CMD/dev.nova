import Link from "next/link";

export default function LandingPage() {
  return (
    <section className="space-y-6">
      <div className="bg-white rounded-2xl shadow p-6 space-y-4">
        <h2 className="text-xl font-semibold">نسخهٔ اولیهٔ پلتفرم</h2>
        <p className="leading-7 text-sm opacity-80">
          این نسخه شامل خلاصه‌ساز متنی، موتور آزمون تطبیقی ساده و داشبورد تحلیلی پایه است.
          داده‌های واقعی آزمون وکالت سال‌های ۱۴۰۰ تا ۱۴۰۳ پس از بارگذاری در اختیار موتور قرار خواهند گرفت.
        </p>
        <div className="flex flex-wrap gap-3 text-sm">
          <Link className="px-4 py-2 rounded-xl bg-gray-900 text-white" href="/quiz">
            شروع آزمون تطبیقی
          </Link>
          <Link className="px-4 py-2 rounded-xl border border-gray-300" href="/summaries">
            ساخت خلاصهٔ متنی
          </Link>
          <Link className="px-4 py-2 rounded-xl border border-gray-300" href="/dashboard">
            مشاهدهٔ داشبورد
          </Link>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {[
          {
            title: "موتور تطبیقی نسخه ۱",
            body: "تنظیم سطح سختی با الگوریتم ۳ پاسخ درست/نادرست متوالی",
          },
          {
            title: "خلاصه‌ساز",
            body: "تولید خلاصهٔ استخراجی از متون حقوقی بدون نیاز به سرویس بیرونی",
          },
          {
            title: "تحلیل پیشرفت",
            body: "نمودارها و هیت‌مپ برای نمایش نقاط قوت و ضعف کاربر",
          },
        ].map((item) => (
          <div key={item.title} className="bg-white rounded-2xl shadow p-6">
            <h3 className="font-semibold mb-2">{item.title}</h3>
            <p className="text-sm opacity-80">{item.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
