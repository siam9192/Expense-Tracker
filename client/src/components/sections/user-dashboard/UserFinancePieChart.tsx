import React, { useEffect, useRef } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { useWalletPageProviderContext } from "../../../Provider/WalletPageProvider";
import { DEFAULT_ERROR_MESSAGE } from "../../../utils/constant";

// Register chart components
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const UserFinancePieChart = () => {
  const {financeStatsQuery,setFinanceStatsQueryParams} = useWalletPageProviderContext()
  const {data:resData,isError} =  financeStatsQuery
   const summary = resData?.data!
  

   if(isError) return <p className="text-shadow-base-100">{DEFAULT_ERROR_MESSAGE}</p>

  const income = summary.income;
  const expense = summary.expense;
  const saving = summary.savings;

 
  const data = {
    labels: ["Income", "Expense", "Savings"],
    datasets: [
      {
        data: [income, expense, saving],
        backgroundColor: [
          "rgba(34,197,94,0.9)", // green-500
          "rgba(239,68,68,0.9)", // red-500
          "rgba(59,130,246,0.9)", // blue-500
        ],
        borderColor: "#ffffff",
        borderWidth: 3,
        hoverOffset: 8,
        cutout: "70%", // makes it a doughnut
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: false,
        text: "Income vs Expense vs Savings",
        font: { size: 18, family: "Inter, sans-serif", weight: "600" },
        color: "#444",
      },
      legend: {
        position: "bottom" as const,
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          color: "#6b7280",
          padding: 16,
          font: {
            size: 13,
          },
        },
      },
      tooltip: {
        backgroundColor: "#1f2937",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderWidth: 0,
        callbacks: {
          label: function (context: any) {
            const label = context.label || "";
            const value = context.parsed;
            const total = context.chart._metasets[0].total;
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: $${value.toLocaleString()} (${percentage}%)`;
          },
        },
      },
    },
  };
  const total = income + expense + saving;
  const chartRef = useRef<any>(null);

  // Center text (shows total balance)
  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;
    const ctx = chart.ctx;
    const { width } = chart;
    chart.options.animation = false;
    chart.render();

    const drawCenterText = () => {
      const fontSize = (width / 160).toFixed(2);
      ctx.save();
      ctx.font = `${fontSize}em Inter, sans-serif`;
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#374151";
      const text = `$${total.toLocaleString()}`;
      const textX = Math.round((width - ctx.measureText(text).width) / 2);
      const textY = chart.chartArea.height / 1.7;
      ctx.fillText(text, textX, textY);
      ctx.restore();
    };

    chart.render();
    chart.options.animation = false;
    chart.options.plugins.afterDraw = drawCenterText;
  }, [total]);

  const durationOptions = [
    {
      label:"This Month",
      value:"month"
    },
     {
      label:"This Year",
      value:"year"
    },
     
  ]
  return (
    <div className="p-4 md:p-8 bg-base-300 rounded-2xl  space-y-6 min-w-[500px]">
      <div className="flex  flex-col md:flex-row justify-between items-center">
        <h2 className="text-2xl text-primary font-semibold mb-4">User Finance Statistics</h2>
        <select defaultValue="Pick a sequence" onChange={(e)=>setFinanceStatsQueryParams({sequence:e.target.value})} className="select select-ghost w-40">
          
        {
          durationOptions.map(_=>(
            <option value={_.value}>{_.label}</option>
          ))
        }
        </select>
      </div>
      <div className="h-72 ">
        <Pie data={data} options={options as any} className="mx-auto" />
      </div>
    </div>
  );
};

export default UserFinancePieChart;
