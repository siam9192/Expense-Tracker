import { Wallet, CreditCard, PiggyBank, Receipt, DollarSign } from "lucide-react";
import CountUp from "react-countup";
import ArriveAnimationContainer from "../../ui/ArriveAnimationContainer";

const metadata = [
  {
    label: "Total Balance",
    value: 82789789,
    icon: Wallet,
    isCurrency: true,
    isPercentage: false,
    color: "bg-primary/10 text-primary",
  },
  {
    label: "Expensible Balance",
    value: 42750000,
    icon: CreditCard,
    isCurrency: true,
    isPercentage: false,
    color: "bg-secondary/10 text-secondary",
  },
  {
    label: "On Savings",
    value: 30000000,
    icon: PiggyBank,
    isCurrency: true,
    isPercentage: false,
    color: "bg-accent/10 text-accent",
  },
  {
    label: "Pending Bills",
    value: 2500000,
    icon: Receipt,
    isCurrency: true,
    isPercentage: false,
    color: "bg-warning/10 text-warning",
  },
  {
    label: "Monthly Income",
    value: 200000,
    icon: DollarSign,
    isCurrency: true,
    isPercentage: false,
    color: "bg-success/10 text-success",
  },
  {
    label: "Last Month Spent",
    value: 200000,
    icon: DollarSign,
    isCurrency: true,
    isPercentage: false,
    color: "bg-error/10 text-error",
  },
];

function UserWalletMetadata() {
  return (
    <div className="p-4 md:p-8 bg-base-300 rounded-2xl shadow-lg space-y-6">
      <h2 className="text-2xl font-semibold text-primary">Overview</h2>
      <div className="grid grid-cols-2 gap-5">
        {metadata.map((data) => (
          <div
            key={data.label}
            className="flex flex-col md:flex-row md:items-center gap-3 p-4 bg-base-100 rounded-xl transition-all hover:shadow-sm"
          >
            {/* Colored Icon */}
            <div
              className={`p-3 rounded-full ${data.color} inline-flex items-center justify-center size-fit`}
            >
              <data.icon size={22} />
            </div>

            {/* Label + Value */}
            <div>
              <p className="text-sm text-neutral-content">{data.label}</p>
              <h3 className="text-lg font-semibold">
                {typeof data.value === "string" ? (
                  data.value
                ) : (
                  <CountUp
                    start={0}
                    end={data.value}
                    duration={2}
                    separator=","
                    prefix={data.isCurrency ? "$" : ""}
                    suffix={data.isPercentage ? "%" : ""}
                  />
                )}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserWalletMetadata;
