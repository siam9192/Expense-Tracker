import { Link } from "react-router-dom";
import UserTransactionCard from "../../cards/UserTransactionCard";
import ArriveAnimationContainer from "../../ui/ArriveAnimationContainer";
import DashboardSectionHeading from "../../ui/DashboardSectionHeading";
import { useEffect, useState } from "react";
import { useTransactionPageProviderContext } from "../../../Provider/TransactionPageProvider";
import { TransactionType, type Transaction } from "../../../types/transaction.type";

const tabs = [
  {
    label: "All",
    value: null,
  },
  {
    label: "Income",
    value: TransactionType.INCOME,
  },
  {
    label: "Expense",
    value: TransactionType.EXPENSE,
  },
  {
    label: "Others",
    value: "Others",
  },
];
function UserTransactions() {
  const [allTransactions, setAllTransactions] = useState<Transaction[]>([]);
  const { transactionsQuery, setTransactionsQueryParams } = useTransactionPageProviderContext();

  const { data, isFetching } = transactionsQuery;

  const transactions = data?.data || [];
  const meta = data?.meta;

  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  // Check whether more data is available
  const isMoreAvailable = meta ? meta.total_results > meta.limit * meta.page : false;

  // Handle Tab Switch
  const handelTabSwitch = (value: string | null) => {
    setActiveTab(value);
    setAllTransactions([]);
    setPage(1);

    // If tab has a filter
    if (value) {
      setTransactionsQueryParams((p) => ({
        ...p,
        type: value,
        page: 1,
      }));
    } else {
      // Remove type filter
      setTransactionsQueryParams((old) => {
        const { type, ...rest } = old;
        return { ...rest, page: 1 };
      });
    }
  };

  // Load More Pagination
  const handelLoadMore = () => {
    if (!isMoreAvailable) return;

    const newPage = page + 1;
    setPage(newPage);

    setTransactionsQueryParams((prev) => ({
      ...prev,
      page: newPage,
    }));
  };

  // Append new transactions
  useEffect(() => {
    if (!transactions.length) return;

    setAllTransactions((prev) => {
      const existingIds = new Set(prev.map((t) => t.id));
      const newItems = transactions.filter((t) => !existingIds.has(t.id));
      return [...prev, ...newItems];
    });
  }, [transactions]); // ❗ No isFetching dependency

  return (
    <ArriveAnimationContainer delay={0.5}>
      <div className="mt-10">
        <div className="text-center mb-5">
          <Link to="create">
            <button className="text-primary hover:text-secondary font-semibold bg-base-100 btn md:btn-lg ">
              Create Transaction
            </button>
          </Link>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 ">
          <DashboardSectionHeading heading="Your Transactions" />
          <div role="tablist" className="tabs tabs-box">
            {tabs.map((tab) => (
              <a
                role="tab"
                onClick={() => handelTabSwitch(tab.value)}
                className={`tab ${tab.value === activeTab ? "tab-active" : ""} `}
              >
                {tab.label}
              </a>
            ))}
          </div>
        </div>
        <div className="mt-5 p-10 rounded-xl bg-base-300">
          {allTransactions.length ? (
            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 ">
              {allTransactions.map((_) => (
                <UserTransactionCard transaction={_} key={_.id} />
              ))}
            </div>
          ) : (
            <div className="min-h-72 flex justify-center items-center text-center ">
              <p className="text-lg font-semibold text-base-content">No transactions found </p>
            </div>
          )}
        </div>
        {isMoreAvailable ? (
          <div className="mt-10 text-center">
            <button
              className="btn  btn-secondary disabled:btn-secondary"
              disabled={isFetching}
              onClick={handelLoadMore}
            >
              {isFetching ? "Loading more.." : "Load more"}
            </button>
          </div>
        ) : null}
      </div>
    </ArriveAnimationContainer>
  );
}

export default UserTransactions;
