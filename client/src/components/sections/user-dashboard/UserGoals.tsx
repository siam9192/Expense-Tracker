import GoalCard from "../../cards/GoalCard";
import ArriveAnimationContainer from "../../ui/ArriveAnimationContainer";
import CreateGoalModal from "../../ui/CreateGoalModal";
import DashboardSectionHeading from "../../ui/DashboardSectionHeading";

function UserGoals() {
  return (
    <ArriveAnimationContainer delay={0.5}>
      <div className="mt-10 ">
        <div className="text-center mb-5">
          <CreateGoalModal />
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 ">
          <DashboardSectionHeading heading="My Categories" />
          <div role="tablist" className="tabs tabs-box">
            <a role="tab" className="tab tab-active">
              All
            </a>
            <a role="tab" className="tab">
              In Progress
            </a>
            <a role="tab" className="tab">
              Achieved
            </a>
            <a role="tab" className="tab">
              Failed
            </a>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 p-10 rounded-xl bg-base-300">
          {Array.from({ length: 14 }).map((_, index) => (
            <GoalCard key={index} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <button className="btn  btn-secondary">Load more</button>
        </div>
      </div>
    </ArriveAnimationContainer>
  );
}

export default UserGoals;
