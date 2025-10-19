import type { Metadata } from "next";
import AccountStatus from "@/components/AccountStatus";
import "./globals.css";

export const metadata: Metadata = {
  title: "پلتفرم یادگیری حقوقی",
  description: "MVP for the AI-powered adaptive legal learning platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body className="min-h-screen bg-gray-50 text-gray-900 text-right">
        <div className="max-w-6xl mx-auto p-4 space-y-6">
          <header className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold">پلتفرم آموزش حقوقی وکالت</h1>
              <p className="text-sm opacity-70">نسخهٔ اولیه با موتور تطبیقی و خلاصه‌ساز متنی</p>
            </div>
            <div className="flex flex-col items-end gap-2 md:gap-3">
              <nav className="flex gap-4 text-sm">
                <a className="hover:underline" href="/">خانه</a>
                <a className="hover:underline" href="/dashboard">داشبورد</a>
                <a className="hover:underline" href="/quiz">آزمون تطبیقی</a>
                <a className="hover:underline" href="/summaries">خلاصه‌ساز</a>
              </nav>
              <AccountStatus />
            </div>
          </header>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
