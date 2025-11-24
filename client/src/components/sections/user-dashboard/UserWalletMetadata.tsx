import { Wallet, CreditCard, PiggyBank, Receipt, DollarSign } from "lucide-react";
import CountUp from "react-countup";
import { useWalletPageProviderContext } from "../../../Provider/WalletPageProvider";
import { DEFAULT_ERROR_MESSAGE } from "../../../utils/constant";
import { useTranslation } from "react-i18next";
import { useUserCurrency } from "../../../Provider/CurrentUserProvider";

function UserWalletMetadata() {
  const { t } = useTranslation();
  const currency = useUserCurrency();
  const { walletSummaryQuery } = useWalletPageProviderContext();
  const { data: resData, isError } = walletSummaryQuery;
  const summary = resData?.data!;

  if (isError) return <p>{DEFAULT_ERROR_MESSAGE}</p>;

  const metadata = [
    {
      label: t("totalBalance"),
      value: summary.total_balance,
      icon: Wallet,
      isCurrency: true,
      isPercentage: false,
      color: "bg-primary/10 text-primary",
    },
    {
      label: t("spendableBalance"),
      value: summary.spendable_balance,
      icon: CreditCard,
      isCurrency: true,
      isPercentage: false,
      color: "bg-secondary/10 text-secondary",
    },
    {
      label: t("onSavings"),
      value: summary.saving_balance,
      icon: PiggyBank,
      isCurrency: true,
      isPercentage: false,
      color: "bg-accent/10 text-accent",
    },
    {
      label: t("pendingBills"),
      value: 0,
      icon: Receipt,
      isCurrency: true,
      isPercentage: false,
      color: "bg-warning/10 text-warning",
    },
    {
      label: t("monthlyBudget"),
      value: summary.monthly_budget,
      icon: DollarSign,
      isCurrency: true,
      isPercentage: false,
      color: "bg-success/10 text-success",
    },
    {
      label: t("lastMonthSpent"),
      value: summary.last_month_spent,
      icon: DollarSign,
      isCurrency: true,
      isPercentage: false,
      color: "bg-error/10 text-error",
    },
  ];

  return (
    <div className="p-4 md:p-8 bg-base-300 rounded-2xl shadow-lg space-y-6">
      <h2 className="text-2xl font-semibold text-primary">{t("overview")}</h2>
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
                    prefix={data.isCurrency ? currency?.symbol : ""}
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
