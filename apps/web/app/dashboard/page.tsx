import Heatmap from "@/components/Heatmap";
import ProgressChart from "@/components/charts/ProgressChart";

export default function DashboardPage() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="bg-white p-6 rounded-2xl shadow space-y-2">
        <h2 className="font-bold">پیشرفت کلی</h2>
        <p className="text-xs opacity-70">اطلاعات به صورت ساختگی برای نمایش رابط کاربری استفاده شده است.</p>
        <ProgressChart />
      </div>
      <div className="bg-white p-6 rounded-2xl shadow space-y-2">
        <h2 className="font-bold">نقاط قوت و ضعف</h2>
        <p className="text-xs opacity-70">پس از اتصال به API، داده‌ها از /analytics/overview خوانده می‌شوند.</p>
        <Heatmap />
      </div>
    </div>
  );
}
