import { ArrowDownCircle, ArrowUpCircle, TrendingUp, Wallet } from "lucide-react";
import CountUp from "react-countup";
import { useHomePageProviderContext } from "../../../Provider/HomePageProvider";

function UserBalanceMetaData() {
  const { globalSummaryQuery } = useHomePageProviderContext();

  const { data: resData, isError } = globalSummaryQuery;

  const data = resData?.data;

  const balanceMeta = [
    {
      id: 1,
      label: "Income",
      value: `$${data?.total_income ?? 0}`,
      icon: ArrowDownCircle,
      color: "success",
      isCurrency: true,
      isGrowth: false,
    },
    {
      id: 2,
      label: "Expenses",
      value: `${data?.total_expense ?? 0}`,
      icon: ArrowUpCircle,
      color: "error",
      isCurrency: true,
      isGrowth: false,
    },
    {
      id: 3,
      label: "Active Wallets",
      value: `1 Accounts`,
      icon: Wallet,
      color: "primary",
      isCurrency: false,
      isGrowth: false,
    },
    {
      id: 4,
      label: "Monthly Growth",
      value: `${data?.current_month_growth?.expense ?? 0}%`,
      icon: TrendingUp,
      color: "secondary",
      isCurrency: false,
      isGrowth: true,
    },
  ];

  if (isError) return <p>Something went wrong</p>;

  return (
    <div className="p-4 md:p-8 min-h-60 bg-base-300 w-full rounded-2xl space-y-6">
      {/* Balance Section */}
      <div>
        <h6 className="text-neutral font-medium">Available Balance</h6>
        <h1 className="text-4xl mt-1">
          ${" "}
          <span className="text-info font-secondary font-semibold">
            <CountUp start={0} end={data!.total_balance} duration={2} />
          </span>
        </h1>
      </div>

      {/* Dynamic Meta Items */}
      <div className="grid grid-cols-2 gap-3 md:gap-6">
        {balanceMeta.map(({ id, label, value, icon: Icon, color, isCurrency, isGrowth }) => {
          // Determine display value and suffix/prefix
          const isNumber = typeof value === "number";

          const displayValue = isNumber ? (
            <CountUp
              start={0}
              end={value}
              duration={2}
              prefix={isCurrency ? "$" : ""}
              suffix={isGrowth ? "%" : ""}
              decimals={isGrowth ? 2 : 0}
            />
          ) : (
            value
          );

          return (
            <div
              key={id}
              className="flex flex-col md:flex-row md:items-center gap-3 p-4 bg-base-100 rounded-xl transition-all hover:shadow-sm"
            >
              <div className={`p-3 rounded-full bg-${color}/20 text-${color} size-fit`}>
                <Icon size={22} />
              </div>

              <div>
                <p className="text-sm text-neutral-content">{label}</p>
                <h3 className={`text-lg font-semibold text-${color}`}>{displayValue}</h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default UserBalanceMetaData;
