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
    label: "Savings",
    icon: Award,
    value: 1200,
    isCurrency: true,
    isPercentage: false,
  },
  {
    label: "Achieved",
    icon: Activity,
    value: 85,
    isPercentage: true,
  },
  {
    label: "Avg Progress",
    icon: BarChart2,
    value: 60,
    isPercentage: true,
  },
  {
    label: "In Pending",
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
function UserGoalsMetadata() {
  return (
    <ArriveAnimationContainer>
      <div>
         <DashboardSectionHeading heading="Goals Overview"/>
        <div className="mt-5 p-4 md:p-8 bg-base-300 rounded-2xl shadow-lg space-y-6">
  <div className="grid  grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
          {userGoalsMetadata.map((data, index) =><MetaCard data={data} key={index}/>)}
        </div>
        </div>
      
      </div>
    </ArriveAnimationContainer>
  );
}

export default UserGoalsMetadata;
