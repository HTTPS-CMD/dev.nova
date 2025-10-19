'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler, Legend);

const labels = ["هفته ۱", "هفته ۲", "هفته ۳", "هفته ۴", "هفته ۵", "هفته ۶", "هفته ۷", "هفته ۸"];

const data = {
  labels,
  datasets: [
    {
      label: "درصد پاسخ صحیح",
      data: [42, 48, 51, 55, 60, 66, 70, 74],
      borderColor: "#111827",
      backgroundColor: "rgba(17,24,39,0.15)",
      fill: true,
      tension: 0.4,
    },
  ],
};

export default function ProgressChart() {
  return <Line data={data} options={{ responsive: true, plugins: { legend: { display: false } } }} />;
}
