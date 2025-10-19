'use client';

import { useEffect, useState } from "react";

interface Question {
  id: number;
  stem: string;
  choices: string[];
  difficulty: number;
  answer_index?: number;
  topic?: string | null;
}

interface SessionPayload {
  session_id: number;
  question: Question | null;
}

interface AnswerPayload {
  correct: boolean;
  next: Question | null;
  difficulty: number;
}

export default function QuizPlayer() {
  const [session, setSession] = useState<number | null>(null);
  const [question, setQuestion] = useState<Question | null>(null);
  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [difficulty, setDifficulty] = useState<number>(2);

  useEffect(() => {
    const bootstrap = async () => {
      setLoading(true);
      const res = await fetch("/api-proxy/exams/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: 1, adaptive: true }),
      });
      const data: SessionPayload = await res.json();
      setSession(data.session_id);
      setQuestion(data.question);
      setDifficulty(data.question?.difficulty ?? 2);
      setLoading(false);
    };

    bootstrap();
  }, []);

  const answer = async (choice: number) => {
    if (!session || !question) return;
    setLoading(true);
    const res = await fetch("/api-proxy/exams/answer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ session_id: session, question_id: question.id, choice }),
    });
    const data: AnswerPayload = await res.json();
    setStatus(data.correct ? "✅ پاسخ درست" : "❌ پاسخ نادرست");
    setQuestion(data.next);
    setDifficulty(data.difficulty);
    setLoading(false);
  };

  if (loading && !question) {
    return <div className="bg-white rounded-2xl shadow p-6">در حال بارگذاری...</div>;
  }

  if (!question) {
    return <div className="bg-white rounded-2xl shadow p-6">سوالی یافت نشد. ابتدا بانک سوال را بارگذاری کنید.</div>;
  }

  return (
    <div className="space-y-4 bg-white p-6 rounded-2xl shadow">
      <div className="text-xs opacity-60">سطح دشواری فعلی: {difficulty}</div>
      <h3 className="font-bold">سوال:</h3>
      <p className="leading-7">{question.stem}</p>
      <div className="grid gap-2">
        {question.choices.map((choice, index) => (
          <button
            key={index}
            className="text-right border rounded-xl p-3 hover:bg-gray-50 disabled:opacity-50"
            onClick={() => answer(index)}
            disabled={loading}
          >
            {choice}
          </button>
        ))}
      </div>
      {status && <div className="pt-2 text-sm opacity-70">{status}</div>}
    </div>
  );
}
