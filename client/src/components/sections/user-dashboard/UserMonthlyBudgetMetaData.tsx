import { TrendingUp, TrendingDown, Target } from "lucide-react";
import ArriveAnimationContainer from "../../ui/ArriveAnimationContainer";
import CountUp from "react-countup";
import { useHomePageProviderContext } from "../../../Provider/HomePageProvider";
function UserMonthlyBudgetMetaData() {
  const { monthlyBudgetSummaryQuery } = useHomePageProviderContext();
  const { data: resData, isError } = monthlyBudgetSummaryQuery;
  const data = resData?.data!;

  if (isError) return <p>Something went wrong</p>;

  const income = data.total_income;
  const budgetLimit = data.budget;
  const spent = data.total_expense;
  const spentPercent = data.budget_usage;

  return (
    <ArriveAnimationContainer>
      <div className="p-8 rounded-2xl space-y-6  transition-all">
        {/* --- Header --- */}
        <div className="flex justify-between items-center">
          <p className="text-sm text-neutral font-medium flex items-center gap-2">
            <TrendingUp className="text-success w-4 h-4" />
            Monthly Income
          </p>
          <p className="text-primary font-semibold text-2xl font-secondary">
            $<CountUp start={0} end={income} duration={2} />
          </p>
        </div>

        {/* --- Budget Summary --- */}
        <div className="grid grid-cols-2 divide-x divide-neutral-content text-center">
          {/* Budget Limit */}
          <div className="px-4">
            <p className="text-sm text-neutral flex items-center justify-center gap-1">
              <Target size={14} className="text-info" /> Budget Limit
            </p>
            <p className="mt-1 text-lg font-semibold text-info">
              $<CountUp start={0} end={budgetLimit} duration={2} />
            </p>
          </div>

          {/* Spent */}
          <div className="px-4">
            <p className="text-sm text-neutral flex items-center justify-center gap-1">
              <TrendingDown size={14} className="text-error" /> Spent
            </p>
            <p className="mt-1 text-lg font-semibold text-error">
              $<CountUp start={0} end={spent} duration={2} />
            </p>
          </div>
        </div>

        {/* --- Progress Bar --- */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm font-medium">
            <span className="text-neutral-content">Budget Usage</span>
            <span
              className={`${
                spentPercent > 80
                  ? "text-error"
                  : spentPercent > 60
                    ? "text-warning"
                    : "text-success"
              }`}
            >
              <CountUp start={0} end={spentPercent} duration={2} />% used
            </span>
          </div>
          <progress
            className="progress progress-primary w-full"
            value={spentPercent}
            max={100}
          ></progress>
        </div>
      </div>
    </ArriveAnimationContainer>
  );
}

export default UserMonthlyBudgetMetaData;
