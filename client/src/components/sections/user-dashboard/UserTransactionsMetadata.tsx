import { ListChecks, TrendingUp, TrendingDown, Timer } from "lucide-react";

import ArriveAnimationContainer from "../../ui/ArriveAnimationContainer";
import DashboardSectionHeading from "../../ui/DashboardSectionHeading";
import MetaCard from "../../cards/MetaCard";
import { useTransactionPageProviderContext } from "../../../Provider/TransactionPageProvider";

function UserTransactionsMetadata() {
  const { transactionsSummaryQuery } = useTransactionPageProviderContext();

  const { data: resData } = transactionsSummaryQuery;
  const summary = resData?.data!;
  const metadata = [
    {
      label: "Transactions",
      icon: ListChecks,
      value: summary.transactions_count,
    },
    {
      label: "Income",
      icon: TrendingUp,
      value: summary.total_income,
      isCurrency: true,
    },
    {
      label: "Expense",
      icon: TrendingDown,
      value: summary.total_expense,
      isCurrency: true,
    },
    {
      label: summary.period,
      icon: Timer,
      value: summary.period_total,
      isCurrency: true,
    },
  ];

  return (
    <ArriveAnimationContainer>
      <div>
        <DashboardSectionHeading heading="Goals Overview" />
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
