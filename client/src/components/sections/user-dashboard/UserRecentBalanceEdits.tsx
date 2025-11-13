import { useWalletPageProviderContext } from "../../../Provider/WalletPageProvider";
import { DEFAULT_ERROR_MESSAGE } from "../../../utils/constant";
import ArriveAnimationContainer from "../../ui/ArriveAnimationContainer";

const recentEdits = [
  {
    id: 1,
    reason: "Grocery Shopping",
    prevAmount: 1500,
    newAmount: 1200,
    date: "2025-11-01",
  },
  {
    id: 2,
    reason: "Monthly Internet Bill",
    prevAmount: 120,
    newAmount: 100,
    date: "2025-10-30",
  },
  {
    id: 3,
    reason: "Dining Out",
    prevAmount: 80,
    newAmount: 60,
    date: "2025-10-28",
  },
  {
    id: 4,
    reason: "Credit Card Payment",
    prevAmount: 500,
    newAmount: 0,
    date: "2025-10-25",
  },
];

function UserRecentBalanceEdits() {
  const {latestBalanceUpdatesQuery} = useWalletPageProviderContext()
  const {data:resData,isError} =  latestBalanceUpdatesQuery
  const updates =  resData?.data!
  if (isError) return <p>{DEFAULT_ERROR_MESSAGE}</p>;
  return (
    <div className="p-4 md:p-8 bg-base-300 rounded-2xl shadow-lg space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-primary">Recent Balance Edits</h2>
      </div>

     {
      updates.length ?
      <div className="space-y-4">
        {updates.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center py-4 hover:bg-base-200 rounded-xl transition-all px-4 bg-base-100"
          >
            {/* Left */}
            <div>
              <p className="text-sm">Reason:</p>
              <p className="font-semibold">{item.reason}</p>
            </div>

            {/* Right */}
            <div className="text-right">
              <p className="font-semibold text-lg text-primary">${item.new_balance}</p>

              <p className="text-xs text-neutral-content">{new Date(item.created_at).toDateString()}</p>
            </div>
          </div>
        ))}
      </div>
:
 <div className="min-h-80 flex justify-center items-center text-center">
          <p className="text-base-content ">No recent Edits</p>
        </div>
     }
       
    </div>
  );
}

export default UserRecentBalanceEdits;
