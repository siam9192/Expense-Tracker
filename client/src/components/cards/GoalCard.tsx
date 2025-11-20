import { Goal as GoalIcon } from "lucide-react";
import DepositGoalModal from "../ui/DepositGoalModal";
import type { Goal } from "../../types/goal.type";
import { getTimeLeft } from "../../utils/helper";

interface Props {
  goal: Goal;
}
function GoalCard({ goal }: Props) {
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
      <div className="mt-4 space-y-2">
        <progress
          className="progress progress-primary w-full h-2 rounded-full"
          value={goal.complete_percentage}
          max="100"
        ></progress>
        <div className="flex justify-between text-sm text-gray-600 font-medium">
          <span>${goal.current_amount.toLocaleString()}</span>
          <span>${goal.target_amount.toLocaleString()}</span>
        </div>
      </div>

      <div className="flex justify-center">
        <DepositGoalModal goal_id={goal.id} />
      </div>
      {/* Percentage label */}
      <span className="absolute top-3 right-3 text-primary font-bold text-lg bg-base-100 px-2 py-1 rounded-full shadow">
        {goal.complete_percentage}%
      </span>
    </div>
  );
}

export default GoalCard;
