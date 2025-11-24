import { ArrowDownCircle, ArrowUpCircle, TrendingUp, Wallet } from "lucide-react";
import CountUp from "react-countup";
import { useHomePageProviderContext } from "../../../Provider/HomePageProvider";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import { useUserCurrency } from "../../../Provider/CurrentUserProvider";

function UserBalanceMetaData() {
  const { t, i18n } = useTranslation();
  const currency = useUserCurrency();
  const { globalSummaryQuery } = useHomePageProviderContext();

  const { data: resData, isError } = globalSummaryQuery;
  const data = resData?.data;

  const balanceMeta = useMemo(
    () => [
      {
        id: 1,
        label: t("income"),
        value: `${data?.total_income ?? 0}`,
        icon: ArrowDownCircle,
        color: "success",
        isCurrency: true,
        isGrowth: false,
      },
      {
        id: 2,
        label: t("expense"),
        value: `${data?.total_expense ?? 0}`,
        icon: ArrowUpCircle,
        color: "error",
        isCurrency: true,
        isGrowth: false,
      },
      {
        id: 3,
        label: t("activeWallets"),
        value: `1 ${t("accounts")}`,
        icon: Wallet,
        color: "primary",
        isCurrency: false,
        isGrowth: false,
      },
      {
        id: 4,
        label: t("monthlyGrowth"),
        value: `${(data?.current_month_growth?.expense ?? 0) + (data?.current_month_growth.income ?? 0)}`,
        icon: TrendingUp,
        color: "secondary",
        isCurrency: false,
        isGrowth: true,
      },
    ],
    [i18n.language, data],
  ); // <-- key fix

  if (isError) return <p>Something went wrong</p>;

  return (
    <div className="p-4 md:p-8 min-h-60 bg-base-300 w-full rounded-2xl space-y-6">
      {/* Balance Section */}
      <div>
        <h6 className="text-neutral font-medium">{t("availableBalance")}</h6>
        <h1 className="text-4xl mt-1">
          {currency?.symbol}{" "}
          <span className="text-info font-secondary font-semibold">
            <CountUp start={0} end={data?.total_balance ?? 0} duration={2} />
          </span>
        </h1>
      </div>

      {/* Dynamic Meta Items */}
      <div className="grid grid-cols-2 gap-3 md:gap-6">
        {balanceMeta.map(({ id, label, value, icon: Icon, color, isCurrency, isGrowth }) => {
          const isNumber = !isNaN(value as any);

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

                <h3 className={`text-lg font-semibold text-${color}`}>
                  {isNumber ? (
                    <CountUp
                      start={0}
                      end={Number(value)}
                      duration={2}
                      prefix={isCurrency ? currency?.symbol : ""}
                      suffix={isGrowth ? "%" : ""}
                      decimals={isGrowth ? 2 : 0}
                    />
                  ) : (
                    value
                  )}
                </h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default UserBalanceMetaData;
