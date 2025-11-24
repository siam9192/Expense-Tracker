import { Award, Activity, BarChart2, Clock, type LucideIcon } from "lucide-react";
import ArriveAnimationContainer from "../../ui/ArriveAnimationContainer";
import DashboardSectionHeading from "../../ui/DashboardSectionHeading";
import MetaCard from "../../cards/MetaCard";
import { useGoalPageProviderContext } from "../../../Provider/GoalPageProvider";
import { useTranslation } from "react-i18next";

function UserGoalsMetadata() {
  const { t } = useTranslation();
  const { goalsSummaryQuery } = useGoalPageProviderContext();

  const { data: resData } = goalsSummaryQuery;
  const summary = resData?.data!;
  const userGoalsMetadata = [
    {
      label: t("availableSavings"),
      icon: Award,
      value: summary.current_savings,
      isCurrency: true,
      isPercentage: false,
    },
    {
      label: t("achieved"),
      icon: Activity,
      value: summary.total_completed_goals,
      isPercentage: true,
    },
    {
      label: t("avgProgress"),
      icon: BarChart2,
      value: summary.avg_progress,
      isPercentage: true,
    },
    {
      label: t("ongoing"),
      icon: Clock,
      value: summary.total_active_goals,
      isPercentage: false,
    },
  ];

  return (
    <ArriveAnimationContainer>
      <div>
        <DashboardSectionHeading heading="Goals Overview" />
        <div className="mt-5 p-4 md:p-8 bg-base-300 rounded-2xl shadow-lg space-y-6">
          <div className="grid  grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
            {userGoalsMetadata.map((data, index) => (
              <MetaCard data={data} key={index} />
            ))}
          </div>
        </div>
      </div>
    </ArriveAnimationContainer>
  );
}

export default UserGoalsMetadata;
