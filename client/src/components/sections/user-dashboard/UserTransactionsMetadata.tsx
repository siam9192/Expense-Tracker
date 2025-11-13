import { Award, Activity, BarChart2, Clock, type LucideIcon } from "lucide-react";
import ArriveAnimationContainer from "../../ui/ArriveAnimationContainer";
import DashboardSectionHeading from "../../ui/DashboardSectionHeading";
import MetaCard from "../../cards/MetaCard";

interface MetaData {
  label: string;
  icon: LucideIcon;
  value: string | number;
  isCurrency?: boolean;
  isPercentage: boolean;
}

const userGoalsMetadata: MetaData[] = [
  {
    label: "Transactions",
    icon: Award,
    value: 1200,
    isCurrency: true,
    isPercentage: false,
  },
  {
    label: "Income",
    icon: Activity,
    value: 85,
    isPercentage: true,
  },
  {
    label: "Expense",
    icon: BarChart2,
    value: 60,
    isPercentage: true,
  },
  {
    label: "Last 30 days",
    icon: Clock,
    value: 40,
    isPercentage: false,
  },
];
const formatValue = (data: {
  value: string | number;
  isCurrency?: boolean;
  isPercentage: boolean;
}) => {
  if (data.isCurrency && typeof data.value === "number") {
    return `$${data.value.toLocaleString()}`;
  }
  if (data.isPercentage && typeof data.value === "number") {
    return `${data.value}%`;
  }
  return data.value;
};
function UserTransactionsMetadata() {
  return (
    <ArriveAnimationContainer>
      <div>
        <DashboardSectionHeading heading="Transactions Overview" />
        <div className=" mt-5 grid  grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 p-5 lg:p-10 rounded-xl bg-base-300">
          {userGoalsMetadata.map((data, index) => (
            <MetaCard data={data} key={index} />
          ))}
        </div>
      </div>
    </ArriveAnimationContainer>
  );
}

export default UserTransactionsMetadata;
