import { Goal as GoalIcon } from "lucide-react";
import DepositGoalModal from "../ui/DepositGoalModal";
import { GoalStatus, type Goal } from "../../types/goal.type";
import { getTimeLeft } from "../../utils/helper";
import WithdrawGoalModal from "../ui/WithdrawGoalModal";
import { useUserCurrency } from "../../Provider/CurrentUserProvider";

interface Props {
  goal: Goal;
}
function GoalCard({ goal }: Props) {
  const currency = useUserCurrency();
  return (
    <div className="p-5 bg-base-100 rounded-2xl shadow-md relative hover:shadow-lg transition-shadow duration-300">
      {/* Header: Icon + Title */}
      <div className="flex gap-3 items-center">
        <div className="p-3 bg-base-100 text-primary rounded-full flex items-center justify-center shadow-inner">
          <GoalIcon size={28} />
        </div>
        <div>
          <p className="text-lg font-semibold text-neutral">{goal.title}</p>
          <p className="text-sm text-gray-500 font-medium">
            {getTimeLeft(new Date(goal.deadline))} left
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-5 space-y-3">
        <div className="w-full bg-base-300 rounded-full h-3 overflow-hidden">
          <div
            className="h-3 bg-primary transition-all duration-500"
            style={{ width: `${goal.complete_percentage}%` }}
          ></div>
        </div>

        <div className="flex justify-between items-center text-sm font-medium text-gray-600">
          <span>
            {currency?.symbol}
            {goal.current_amount.toLocaleString()}
          </span>
          <span>
            Target: {currency?.symbol}
            {goal.target_amount.toLocaleString()}
          </span>
        </div>
      </div>
      {!goal.is_withdrawn ? (
        <div
          className={`flex ${goal.complete_percentage >= 100 ? "justify-between" : "justify-center"} mt-3`}
        >
          <DepositGoalModal goal_id={goal.id} />
          {goal.complete_percentage >= 100 || goal.status === GoalStatus.FAILED ? (
            <WithdrawGoalModal amount={goal.current_amount} goal_id={goal.id} />
          ) : null}
        </div>
      ) : (
        <div className="mt-3">
          <p className="text-center font-semibold text-sm">Money is withdrawn</p>
        </div>
      )}
      {/* Percentage label */}
      <span className="absolute top-3 right-3 text-primary font-bold text-lg bg-base-100 px-2 py-1 rounded-full shadow">
        {goal.complete_percentage}%
      </span>
    </div>
  );
}

export default GoalCard;
