import { useEffect, useState } from "react";
import GoalCard from "../../cards/GoalCard";
import ArriveAnimationContainer from "../../ui/ArriveAnimationContainer";
import CreateGoalModal from "../../ui/CreateGoalModal";
import DashboardSectionHeading from "../../ui/DashboardSectionHeading";
import { GoalStatus, type Goal } from "../../../types/goal.type";
import { useGoalPageProviderContext } from "../../../Provider/GoalPageProvider";

const tabs = [
  {
    label: "All",
    value: null,
  },
  {
    label: "Ongoing",
    value: GoalStatus.ACTIVE,
  },
  {
    label: "Achieved",
    value: GoalStatus.COMPLETED,
  },
  {
    label: "Failed",
    value: GoalStatus.FAILED,
  },
];
function UserGoals() {
  const [allGoals, setAllGoals] = useState<Goal[]>([]);
  const { goalsQuery, setGoalsQueryParams } = useGoalPageProviderContext();
  const { data, isFetching } = goalsQuery;
  const goals = data?.data || [];
  const meta = data?.meta;
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const isMoreAvailable = meta && meta.total_results > meta.limit * meta.page;

  const handelTabSwitch = (value: string | null) => {
    setActiveTab(value);
    setAllGoals([]);
    setPage(1);
    if (value) {
      setGoalsQueryParams({
        status: value,
        page: 1,
      });
    } else {
      setGoalsQueryParams(({ status, ...oth }) => ({ ...oth, page: 1 }));
    }
  };

  const handelLoadMore = () => {
    if (!isMoreAvailable) return;
    const newPage = page + 1;
    setPage(newPage);
    setGoalsQueryParams((p) => ({
      ...p,
      page: newPage,
    }));
  };

  function reset() {
    setActiveTab(null);
    setAllGoals([]);
    setPage(1);
    setGoalsQueryParams(({ type, ...oth }) => ({ ...oth, page: 1 }));
  }

  useEffect(() => {
    if (goals.length) {
      setAllGoals((prev) => {
        const existingIds = new Set(prev.map((cat) => cat.id));
        const newItems = goals.filter((cat) => !existingIds.has(cat.id));
        return [...prev, ...newItems];
      });
    }
  }, [goals, isFetching]);

  return (
    <ArriveAnimationContainer delay={0.5}>
      <div className="mt-10 ">
        <div className="text-center mb-5">
          <CreateGoalModal onSuccess={reset} />
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 ">
          <DashboardSectionHeading heading="Your Goals" />
          <div role="tablist" className="tabs tabs-box">
            {tabs.map((tab) => (
              <a
                role="tab"
                onClick={() => handelTabSwitch(tab.value)}
                className={`tab ${tab.value === activeTab ? "tab-active" : ""} `}
              >
                {tab.label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-5 p-10 rounded-xl bg-base-300">
          {allGoals.length ? (
            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 ">
              {goals.map((_) => (
                <GoalCard goal={_} key={_.id} />
              ))}
            </div>
          ) : (
            <div className="min-h-72 flex justify-center items-center text-center ">
              <p className="text-lg font-semibold text-base-content">No goals found </p>
            </div>
          )}
        </div>
        {isMoreAvailable ? (
          <div className="mt-10 text-center">
            <button
              className="btn  btn-secondary disabled:btn-secondary"
              disabled={isFetching}
              onClick={handelLoadMore}
            >
              {isFetching ? "Loading more.." : "Load more"}
            </button>
          </div>
        ) : null}
      </div>
    </ArriveAnimationContainer>
  );
}

export default UserGoals;
