import { Goal } from "lucide-react";
import DepositGoalModal from "../ui/DepositGoalModal";

function GoalCard() {
  return (
    <div className="p-5 bg-base-100 rounded-2xl shadow-md relative hover:shadow-lg transition-shadow duration-300">
      {/* Header: Icon + Title */}
      <div className="flex gap-3 items-center">
        <div className="p-3 bg-base-100 text-primary rounded-full flex items-center justify-center shadow-inner">
          <Goal size={28} />
        </div>
        <div>
          <p className="text-lg font-semibold text-neutral">New Car</p>
          <p className="text-sm text-gray-500 font-medium">10 Days left</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-4 space-y-2">
        <progress
          className="progress progress-primary w-full h-2 rounded-full"
          value="50"
          max="100"
        ></progress>
        <div className="flex justify-between text-sm text-gray-600 font-medium">
          <span>${(38883).toLocaleString()}</span>
          <span>${(150000).toLocaleString()}</span>
        </div>
      </div>

      <div className="flex justify-center">
        <DepositGoalModal/>
      </div>
      {/* Percentage label */}
      <span className="absolute top-3 right-3 text-primary font-bold text-lg bg-base-100 px-2 py-1 rounded-full shadow">
        35%
      </span>
    </div>
  );
}

export default GoalCard;
