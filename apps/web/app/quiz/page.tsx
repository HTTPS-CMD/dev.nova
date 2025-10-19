import QuizPlayer from "@/components/QuizPlayer";

export default function QuizPage() {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">آزمون تطبیقی</h2>
        <p className="text-sm opacity-80">
          با هر پاسخ سطح سختی تغییر می‌کند. برای نمایش دادهٔ واقعی ابتدا بانک سوال را وارد کنید.
        </p>
      </div>
      <QuizPlayer />
    </section>
  );
}
