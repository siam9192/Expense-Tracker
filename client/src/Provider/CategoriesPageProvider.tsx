import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { useGetUserCategoriesSummaryQuery } from "../redux/api/metadata.api";
import type { UserCategoriesSummaryMetadata } from "../types/metadata.type";
import DashboardPageLoading from "../components/ui/DashboardPageLoading";
import type { Params, UseQueryResult } from "../types/utils.type";
import type { Response } from "../types/response.type";
import type { Category } from "../types/category.type";
import { useGetUserCategoriesQuery } from "../redux/api/category.api";

export type CategoriesPageContextType = {
  categoriesSummaryQuery: UseQueryResult<Response<UserCategoriesSummaryMetadata>>;
  categoriesQuery: UseQueryResult<Response<Category[]>>;

  categoriesQueryParams: Params;

  setCategoriesQueryParams: React.Dispatch<React.SetStateAction<Params>>;
};

export const CategoriesPageProviderContext = createContext<CategoriesPageContextType | null>(null);

interface Props {
  children: ReactNode;
}

function CategoriesPageProvider({ children }: Props) {
  const [categoriesQueryParams, setCategoriesQueryParams] = useState<Params>({});

  const categoriesSummaryQuery = useGetUserCategoriesSummaryQuery(undefined);
  const categoriesQuery = useGetUserCategoriesQuery(categoriesQueryParams);

  // ✅ Derived loading state from all queries
  const isLoading = categoriesQuery.isLoading || categoriesSummaryQuery.isLoading;

  // ✅ Memoize context value properly
  const contextValue = useMemo(
    () => ({
      categoriesSummaryQuery,
      categoriesQuery,
      categoriesQueryParams,
      setCategoriesQueryParams,
    }),
    [categoriesQueryParams, categoriesQuery, categoriesSummaryQuery],
  );

  return (
    <CategoriesPageProviderContext.Provider value={contextValue as CategoriesPageContextType}>
      {isLoading ? <DashboardPageLoading /> : children}
    </CategoriesPageProviderContext.Provider>
  );
}

export default CategoriesPageProvider;

export function useCategoriesPageProviderContext() {
  const context = useContext(CategoriesPageProviderContext);
  if (!context) throw new Error("Must be under at home page provider");
  return context;
}
