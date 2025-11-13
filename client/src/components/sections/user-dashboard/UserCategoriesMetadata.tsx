import ArriveAnimationContainer from "../../ui/ArriveAnimationContainer";
import DashboardSectionHeading from "../../ui/DashboardSectionHeading";
import MetaCard from "../../cards/MetaCard";
import { ChartColumnStacked, Activity, BarChart2, Clock } from "lucide-react";
import { useCategoriesPageProviderContext } from "../../../Provider/CategoriesPageProvider";


function UserCategoriesMetadata() {
  const {categoriesSummaryQuery} = useCategoriesPageProviderContext()
  
  const {data:resData} =  categoriesSummaryQuery
  const summary = resData?.data!
 const metadata = [
  {
    label: "Categories",
    icon: ChartColumnStacked,
    value: summary.total_categories,
  },
  {
    label: "Unused Categories",
    icon: Activity,
    value: summary.unused_categories,
  },
  {
    label: "Most Used Category",
    icon: BarChart2,
    value: summary.most_used_category||"N/A", // Example category name
  },
  {
    label: "Most Used Percentage",
    icon: Clock,
    value: summary.most_used_percentage,
    isPercentage: true, // ✅ corrected
  },
];
  return (
    <ArriveAnimationContainer>
      <div>
        <DashboardSectionHeading heading="Categories Overview" />
        <div className=" mt-5 grid  grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 p-5 lg:p-10 rounded-xl bg-base-300">
          {metadata.map((data, index) => (
            <MetaCard data={data} key={index} />
          ))}
        </div>
      </div>
    </ArriveAnimationContainer>
  );
}

export default UserCategoriesMetadata;
