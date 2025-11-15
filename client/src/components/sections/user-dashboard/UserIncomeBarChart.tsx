import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useWalletPageProviderContext } from "../../../Provider/WalletPageProvider";
import { DEFAULT_ERROR_MESSAGE } from "../../../utils/constant";

// Register Chart.js modules
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Props {
  monthlyIncome?: number[]; // array of 12 months
  labels?: string[]; // months labels
}

const defaultLabels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const UserIncomeBarChart: React.FC<Props> = ({}) => {
  const { incomeStatsQuery, setIncomeStatsQueryParams } = useWalletPageProviderContext();
  const { data: resData, isError } = incomeStatsQuery;
  const stats = resData?.data?.stats!;

  if (isError) return <p>{DEFAULT_ERROR_MESSAGE}</p>;

  const data = {
    labels: stats.map((_) => _.label),
    datasets: [
      {
        label: "Monthly Income ($)",
        data: stats.map((_) => _.total),
        backgroundColor: "#5356FF", // green-400 Tailwind color
        borderRadius: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        display: false,
      },
      title: {
        display: false,
        text: "User Monthly Income",
        font: {
          size: 18,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            return `$${context.parsed.y.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: { display: false, drawBorder: false },
      },
      y: {
        grid: { display: false, drawBorder: false },
        beginAtZero: true,
        ticks: {
          callback: (value: any) => `$${value.toLocaleString()}`,
        },
      },
    },
  };

  const durationOptions = [
    {
      label: "Last 30 Days",
      value: "day",
    },
    {
      label: "Last 12 Months",
      value: "month",
    },
    {
      label: "Last 6 years",
      value: "year",
    },
  ];
  return (
    <div className="p-4 md:p-8 bg-base-300 rounded-2xl space-y-6">
      <div className="flex  flex-col md:flex-row justify-between items-center">
        <h2 className="text-2xl text-primary font-semibold mb-4">User Income Statistics</h2>
        <select
          defaultValue="Pick a sequence"
          onChange={(e) => setIncomeStatsQueryParams({ sequence: e.target.value })}
          className="select select-ghost w-40"
        >
          {durationOptions.map((_) => (
            <option value={_.value}>{_.label}</option>
          ))}
        </select>
      </div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default UserIncomeBarChart;
