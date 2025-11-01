// ExpenseAreaChart.tsx
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import ArriveAnimationContainer from "../../ui/ArriveAnimationContainer";
import DashboardSectionHeading from "../../ui/DashboardSectionHeading";

// Register components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const ExpenseStatistics = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Expenses",
        data: [1200, 900, 1500, 800, 1100, 1300, 950],
        fill: true,
        backgroundColor: "rgba(99, 102, 241, 0.1)", // Soft blue area
        borderColor: "rgba(99, 102, 241, .4)", // Blue line
        tension: 0.5,
        pointRadius: 4,
        pointBackgroundColor: "#6366f1",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        labels: {
          color: "#333",
        },
      },
      tooltip: {
        backgroundColor: "#111827",
        titleColor: "#fff",
        bodyColor: "#d1d5db",
        display: false,
      },
    },
    scales: {
      x: {
        grid: { display: false, drawBorder: false },
        ticks: {
          color: "#6b7280",
        },
      },
      y: {
        grid: { display: false, drawBorder: false },
        ticks: {
          color: "#6b7280",
        },
      },
    },
  };

  return (
  
      <div className="w-full  p-4    ">
        <div className="flex  flex-col md:flex-row justify-between items-center">
        <DashboardSectionHeading heading="Expense Statistics"/>
          <select defaultValue="Pick a font" className="select select-ghost w-32">
            <option>Day</option>
            <option>Month</option>
            <option>Year</option>
          </select>
        </div>
        <div>
          <div className=" mt-5 h-[300px] md:h-[400px]">
            <Line data={data} options={options} />
          </div>
        </div>
      </div>
   
  );
};

export default ExpenseStatistics;
