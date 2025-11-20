import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { useGetUserGoalsSummaryQuery } from "../redux/api/metadata.api";
import type { UserGoalsSummaryMetadata } from "../types/metadata.type";
import DashboardPageLoading from "../components/ui/DashboardPageLoading";
import type { Params, UseQueryResult } from "../types/utils.type";
import type { Response } from "../types/response.type";

import type { Goal } from "../types/goal.type";
import { useGetUserGoalsQuery } from "../redux/api/goal.api";

export type GoalsPageContextType = {
  goalsSummaryQuery: UseQueryResult<Response<UserGoalsSummaryMetadata>>;
  goalsQuery: UseQueryResult<Response<Goal[]>>;
  goalsQueryParams: Params;
  setGoalsQueryParams: React.Dispatch<React.SetStateAction<Params>>;
};

export const GoalsPageProviderContext = createContext<GoalsPageContextType | null>(null);

interface Props {
  children: ReactNode;
}

function GoalPageProvider({ children }: Props) {
  const [goalsQueryParams, setGoalsQueryParams] = useState<Params>({
    limit: 4,
  });

  const goalsSummaryQuery = useGetUserGoalsSummaryQuery(undefined);
  const goalsQuery = useGetUserGoalsQuery(goalsQueryParams);

  // ✅ Derived loading state from all queries
  const isLoading = goalsSummaryQuery.isLoading || goalsQuery.isLoading;

  // ✅ Memoize context value properly
  const contextValue = useMemo(
    () => ({
      goalsSummaryQuery,
      goalsQuery,
      goalsQueryParams,
      setGoalsQueryParams,
    }),
    [goalsSummaryQuery, goalsQuery, goalsQueryParams],
  );

  return (
    <GoalsPageProviderContext.Provider value={contextValue}>
      {isLoading ? <DashboardPageLoading /> : children}
    </GoalsPageProviderContext.Provider>
  );
}

export default GoalPageProvider;

export function useGoalPageProviderContext() {
  const context = useContext(GoalsPageProviderContext);
  if (!context) throw new Error("Must be under at home page provider");
  return context;
}
