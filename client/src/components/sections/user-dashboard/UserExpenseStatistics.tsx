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
import DashboardSectionHeading from "../../ui/DashboardSectionHeading";
import { useHomePageProviderContext } from "../../../Provider/HomePageProvider";
import { DEFAULT_ERROR_MESSAGE } from "../../../utils/constant";

// Register components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const ExpenseStatistics = () => {
  const { expenseStatsQuery, setExpenseStatsQueryParams } = useHomePageProviderContext();
  const { data: resData, isError } = expenseStatsQuery;
  const stats = resData?.data!.stats;

  if (isError) return <p>{DEFAULT_ERROR_MESSAGE}</p>;

  const data = {
    labels: stats?.map((_) => _.label),
    datasets: [
      {
        label: "Expenses",
        data: stats?.map((_) => _.total),
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
    <div className="w-full  p-4">
      <div className="flex  flex-col md:flex-row justify-between items-center">
        <DashboardSectionHeading heading="Expense Statistics" />
        <select
          defaultValue="Pick a font"
          className="select select-ghost min-w-32 max-w-40"
          onChange={(e) => setExpenseStatsQueryParams({ sequence: e.target.value })}
        >
          {durationOptions.map((du) => (
            <option value={du.value}>{du.label}</option>
          ))}
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
