import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import {
  useGetUserExpenseCategoryBreakdownQuery,
  useGetUserExpenseStatsQuery,
  useGetUserGlobalSummaryQuery,
  useGetUserMonthlyBudgetSummaryQuery,
} from "../redux/api/metadata.api";
import type {
  UserCategoriesBreakdown,
  UserExpenseStatsMetadata,
  UserGlobalSummaryMetadata,
  UserMonthlyBudgetMetadata,
} from "../types/metadata.type";
import DashboardPageLoading from "../components/ui/DashboardPageLoading";
import type { Params, UseQueryResult } from "../types/utils.type";
import type { Response } from "../types/response.type";
import { TransactionType, type Transaction } from "../types/transaction.type";
import { useGetUserTransactionsQuery } from "../redux/api/transaction.api";

export type HomePageContextType = {
  globalSummaryQuery: UseQueryResult<Response<UserGlobalSummaryMetadata>>;
  monthlyBudgetSummaryQuery: UseQueryResult<Response<UserMonthlyBudgetMetadata>>;
  expenseStatsQuery: UseQueryResult<Response<UserExpenseStatsMetadata>>;
  latestTransactionsQuery: UseQueryResult<Response<Transaction[]>>;
  expenseCategoriesBreakdownQuery: UseQueryResult<Response<UserCategoriesBreakdown>>; // Add proper type if you have it

  expenseStatsQueryParams: Params;
  expenseCategoriesBreakdownQueryParams: Params;

  setExpenseStatsQueryParams: React.Dispatch<React.SetStateAction<Params>>;
  setExpenseCategoriesBreakdownQueryParams: React.Dispatch<React.SetStateAction<Params>>;
};

export const HomePageProviderContext = createContext<HomePageContextType | null>(null);

interface Props {
  children: ReactNode;
}

function HomePageProvider({ children }: Props) {
  const [expenseStatsQueryParams, setExpenseStatsQueryParams] = useState<Params>({});
  const [expenseCategoriesBreakdownQueryParams, setExpenseCategoriesBreakdownQueryParams] =
    useState<Params>({});

  const globalSummaryQuery = useGetUserGlobalSummaryQuery(undefined);
  const monthlyBudgetSummaryQuery = useGetUserMonthlyBudgetSummaryQuery(undefined);
  const expenseStatsQuery = useGetUserExpenseStatsQuery(expenseStatsQueryParams);

  const expenseCategoriesBreakdownQuery = useGetUserExpenseCategoryBreakdownQuery(
    expenseCategoriesBreakdownQueryParams,
  );

  const latestTransactionsQuery = useGetUserTransactionsQuery({
    sortBy: "created_at",
    sortOrder: "desc",
    type: TransactionType.EXPENSE,
    limit: 6,
  });

  // ✅ Derived loading state from all queries
  const isLoading =
    globalSummaryQuery.isLoading ||
    monthlyBudgetSummaryQuery.isLoading ||
    expenseStatsQuery.isLoading ||
    expenseCategoriesBreakdownQuery.isLoading;

  // ✅ Memoize context value properly
  const contextValue = useMemo(
    () => ({
      globalSummaryQuery,
      monthlyBudgetSummaryQuery,
      expenseStatsQuery,
      expenseCategoriesBreakdownQuery,
      latestTransactionsQuery,

      expenseStatsQueryParams,
      expenseCategoriesBreakdownQueryParams,

      setExpenseStatsQueryParams,
      setExpenseCategoriesBreakdownQueryParams,
    }),
    [
      globalSummaryQuery,
      monthlyBudgetSummaryQuery,
      expenseStatsQuery,

      expenseCategoriesBreakdownQuery,
      expenseStatsQueryParams,
      expenseCategoriesBreakdownQueryParams,
    ],
  );

  return (
    <HomePageProviderContext.Provider value={contextValue as HomePageContextType}>
      {isLoading ? <DashboardPageLoading /> : children}
    </HomePageProviderContext.Provider>
  );
}

export default HomePageProvider;

export function useHomePageProviderContext() {
  const context = useContext(HomePageProviderContext);
  if (!context) throw new Error("Must be under at home page provider");
  return context;
}
