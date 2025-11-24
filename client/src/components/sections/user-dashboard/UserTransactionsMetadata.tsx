import { ListChecks, TrendingUp, TrendingDown, Timer } from "lucide-react";

import ArriveAnimationContainer from "../../ui/ArriveAnimationContainer";
import DashboardSectionHeading from "../../ui/DashboardSectionHeading";
import MetaCard from "../../cards/MetaCard";
import { useTransactionPageProviderContext } from "../../../Provider/TransactionPageProvider";
import { useTranslation } from "react-i18next";

function UserTransactionsMetadata() {
  const { t } = useTranslation();

  const { transactionsSummaryQuery } = useTransactionPageProviderContext();

  const { data: resData } = transactionsSummaryQuery;
  const summary = resData?.data!;
  const metadata = [
    {
      label: t("transactions"),
      icon: ListChecks,
      value: summary.transactions_count,
    },
    {
      label: t("income"),
      icon: TrendingUp,
      value: summary.total_income,
      isCurrency: true,
    },
    {
      label: t("expense"),
      icon: TrendingDown,
      value: summary.total_expense,
      isCurrency: true,
    },
    {
      label: t("last30Days"),
      icon: Timer,
      value: summary.period_total,
      isCurrency: true,
    },
  ];

  return (
    <ArriveAnimationContainer>
      <div>
        <DashboardSectionHeading heading={t("transactionsOverview")} />
        <div className="mt-5 p-4 md:p-8 bg-base-300 rounded-2xl shadow-lg space-y-6">
          <div className="grid  grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
            {metadata.map((data, index) => (
              <MetaCard data={data} key={index} />
            ))}
          </div>
        </div>
      </div>
    </ArriveAnimationContainer>
  );
}

export default UserTransactionsMetadata;
