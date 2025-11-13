import { MoreHorizontal } from "lucide-react";
import DashboardSectionHeading from "../../ui/DashboardSectionHeading";
import { useHomePageProviderContext } from "../../../Provider/HomePageProvider";
import { Link } from "react-router-dom";

function UserRecentPayments() {
  const { latestTransactionsQuery } = useHomePageProviderContext();
  const { data: resData, isError } = latestTransactionsQuery;

  const transactions = resData?.data!;

  if (isError) return <p>Something went wrong</p>;
  return (
    <div className="p-4 md:p-8 bg-base-300 rounded-2xl shadow-lg space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <DashboardSectionHeading heading="Recent Payments" />
        <Link to="/transactions">
          <button className="btn btn-sm btn-outline btn-neutral gap-1">
            <MoreHorizontal size={16} /> View All
          </button>
        </Link>
      </div>

      {/* List */}
      {transactions.length ? (
        <div className="space-y-6">
          {transactions.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center p-4 hover:bg-base-200 rounded-xl transition-all  bg-base-100"
            >
              {/* Left */}
              <div className="flex items-center gap-4">
                {/* <div className="p-3 bg-base-200 rounded-xl">{item.icon}</div> */}
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-sm text-neutral">{item.category.name}</p>
                </div>
              </div>

              {/* Right */}
              <div className="text-right">
                <p className="font-semibold text-error">
                  -{item.currency.code}
                  {item.amount.toFixed(2)}
                </p>
                <p className="text-xs text-neutral-content">{new Date(item.date).toDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="min-h-96 flex justify-center items-center text-center">
          <p className="text-base-content ">No recent Payments</p>
        </div>
      )}
    </div>
  );
}

export default UserRecentPayments;
