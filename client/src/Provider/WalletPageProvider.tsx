import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { useGetUserFinanceStatsQuery, useGetUserIncomeStatsQuery, useGetUserWalletSummaryQuery } from "../redux/api/metadata.api";
import type { UserFinanceStatsMetadata, UserIncomeStatsMetadata, UserWalletSummaryMetadata } from "../types/metadata.type";
import DashboardPageLoading from "../components/ui/DashboardPageLoading";
import type { Params, UseQueryResult } from "../types/utils.type";
import type { Response } from "../types/response.type";
import type { BalanceUpdate } from "../types/balance-update.type";
import { useGetUserLatestBalanceUpdatesQuery } from "../redux/api/user.api";

export type WalletPageContextType = {
  walletSummaryQuery:UseQueryResult<Response<UserWalletSummaryMetadata>>;
  financeStatsQuery: UseQueryResult<Response<UserFinanceStatsMetadata>>;
  incomeStatsQuery: UseQueryResult<Response<UserIncomeStatsMetadata>>;
  latestBalanceUpdatesQuery: UseQueryResult<Response<BalanceUpdate[]>>;
  
  incomeStatsQueryParams: Params;
  financeStatsQueryParams: Params;

  setFinanceStatsQueryParams: React.Dispatch<React.SetStateAction<Params>>;
  setIncomeStatsQueryParams: React.Dispatch<React.SetStateAction<Params>>;
};

export const WalletPageProviderContext = createContext<WalletPageContextType | null>(null);

interface Props {
  children: ReactNode;
}

function WalletPageProvider({ children }: Props) {
  const [incomeStatsQueryParams, setIncomeStatsQueryParams] = useState<Params>({});
  const [financeStatsQueryParams, setFinanceStatsQueryParams] = useState<Params>({});
  const walletSummaryQuery =  useGetUserWalletSummaryQuery(undefined)
  const financeStatsQuery = useGetUserFinanceStatsQuery(financeStatsQueryParams);
  const incomeStatsQuery = useGetUserIncomeStatsQuery(incomeStatsQueryParams);
  const latestBalanceUpdatesQuery = useGetUserLatestBalanceUpdatesQuery(undefined);
  // ✅ Derived loading state from all queries
  const isLoading =
  walletSummaryQuery.isLoading||
    financeStatsQuery.isLoading ||
    incomeStatsQuery.isLoading ||
    latestBalanceUpdatesQuery.isLoading;

  // ✅ Memoize context value properly
  const contextValue = useMemo(
    () => ({
      walletSummaryQuery,
      financeStatsQuery,
      incomeStatsQuery,
      latestBalanceUpdatesQuery,
      
      financeStatsQueryParams,
      incomeStatsQueryParams,

      setFinanceStatsQueryParams,
      setIncomeStatsQueryParams,
    }),
    [walletSummaryQuery,walletSummaryQuery,financeStatsQuery,incomeStatsQuery,latestBalanceUpdatesQuery,incomeStatsQuery,financeStatsQueryParams],
  );

  
  return (
    <WalletPageProviderContext.Provider value={contextValue}>
      {isLoading ? <DashboardPageLoading /> : children}
    </WalletPageProviderContext.Provider>
  );
}

export default WalletPageProvider;

export function useWalletPageProviderContext() {
  const context = useContext(WalletPageProviderContext);
  if (!context) throw new Error("Must be under at home page provider");
  return context;
}
