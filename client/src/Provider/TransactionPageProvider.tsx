import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { useGetUserTransactionsSummaryQuery } from "../redux/api/metadata.api";
import type { UserTransactionsSummaryMetadata } from "../types/metadata.type";
import DashboardPageLoading from "../components/ui/DashboardPageLoading";
import type { Params, UseQueryResult } from "../types/utils.type";
import type { Response } from "../types/response.type";
import type { Transaction } from "../types/transaction.type";
import { useGetUserTransactionsQuery } from "../redux/api/transaction.api";

export type TransactionPageContextType = {
  transactionsSummaryQuery: UseQueryResult<Response<UserTransactionsSummaryMetadata>>;
  transactionsQuery: UseQueryResult<Response<Transaction[]>>;
  transactionsQueryParams: Params;
  setTransactionsQueryParams: React.Dispatch<React.SetStateAction<Params>>;
};

export const GoalsPageProviderContext = createContext<TransactionPageContextType | null>(null);

interface Props {
  children: ReactNode;
}

function TransactionPageProvider({ children }: Props) {
  const [transactionsQueryParams, setTransactionsQueryParams] = useState<Params>({
    limit: 4,
  });

  const transactionsSummaryQuery = useGetUserTransactionsSummaryQuery(undefined);
  const transactionsQuery = useGetUserTransactionsQuery(transactionsQueryParams);

  // ✅ Derived loading state from all queries
  const isLoading = transactionsSummaryQuery.isLoading || transactionsQuery.isLoading;

  // ✅ Memoize context value properly
  const contextValue = useMemo(
    () => ({
      transactionsSummaryQuery,
      transactionsQuery,
      transactionsQueryParams,
      setTransactionsQueryParams,
    }),
    [transactionsSummaryQuery, transactionsQuery, transactionsQueryParams],
  );

  return (
    <GoalsPageProviderContext.Provider value={contextValue}>
      {isLoading ? <DashboardPageLoading /> : children}
    </GoalsPageProviderContext.Provider>
  );
}

export default TransactionPageProvider;

export function useTransactionPageProviderContext() {
  const context = useContext(GoalsPageProviderContext);
  if (!context) throw new Error("Must be under at transactions page provider");
  return context;
}
