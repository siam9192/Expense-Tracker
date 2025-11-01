import { ArrowDownCircle, ArrowUpCircle, TrendingUp, Wallet } from "lucide-react";
import ArriveAnimationContainer from "../../ui/ArriveAnimationContainer";
import CountUp from "react-countup";
const balanceMeta = [
  {
    id: 1,
    label: "Income",
    value: "$12,580",
    icon: ArrowDownCircle,
    color: "success",
  },
  {
    id: 2,
    label: "Expenses",
    value: "$7,340",
    icon: ArrowUpCircle,
    color: "error",
  },
  {
    id: 3,
    label: "Active Wallets",
    value: "3 Accounts",
    icon: Wallet,
    color: "primary",
  },
  {
    id: 4,
    label: "Monthly Growth",
    value: "+8.6%",
    icon: TrendingUp,
    color: "secondary",
  },
];

function UserBalanceMetaData() {
  return (
    
      <div className="p-4 md:p-8 min-h-60 bg-base-300 w-full rounded-2xl space-y-6">
        {/* Balance Section */}
        <div>
          <h6 className="text-neutral font-medium">Available Balance</h6>
          <h1 className="text-4xl mt-1">
            ${" "}
            <span className="text-info font-secondary font-semibold">
              <CountUp start={0} end={8376873} duration={2} />
            </span>
          </h1>
        </div>

        {/* Dynamic Meta Items */}
        <div className="grid grid-cols-2 gap-3 md:gap-6">
          {balanceMeta.map(({ id, label, value, icon: Icon, color }) => (
            <div
              key={id}
              className="flex flex-col md:flex-row md:items-center gap-3 p-4 bg-base-100 rounded-xl transition-all hover:shadow-sm"
            >
              <div className={`p-3 rounded-full bg-${color}/20 text-${color} size-fit`}>
                <Icon size={22} />
              </div>
              <div>
                <p className="text-sm text-neutral-content">{label}</p>
                <h3 className={`text-lg font-semibold text-${color}`}>
                  {typeof value === "string" ? (
                    value
                  ) : (
                    <CountUp start={0} end={value} duration={2} />
                  )}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
  
  );
}

export default UserBalanceMetaData;
