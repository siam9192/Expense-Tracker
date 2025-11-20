import { baseApi } from "./base.api";
import type { Response } from "../../types/response.type";
import type { Params } from "../../types/utils.type";
import type {
  UserCategoriesBreakdown,
  UserCategoriesSummaryMetadata,
  UserExpenseStatsMetadata,
  UserFinanceStatsMetadata,
  UserGlobalSummaryMetadata,
  UserGoalsSummaryMetadata,
  UserIncomeStatsMetadata,
  UserMonthlyBudgetMetadata,
  UserTransactionsSummaryMetadata,
  UserWalletSummaryMetadata,
} from "../../types/metadata.type";

const metadataApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserGlobalSummary: builder.query({
      query: () => ({
        url: "/metadata/me/global",
        method: "GET",
      }),
      transformResponse: (response: Response<UserGlobalSummaryMetadata>) => {
        return response;
      },
    }),
    getUserWalletSummary: builder.query({
      query: () => ({
        url: "/metadata/me/wallet",
        method: "GET",
      }),
      transformResponse: (response: Response<UserWalletSummaryMetadata>) => {
        return response;
      },
    }),
    getUserMonthlyBudgetSummary: builder.query({
      query: () => ({
        url: "/metadata/me/budget",
        method: "GET",
      }),
      transformResponse: (response: Response<UserMonthlyBudgetMetadata>) => {
        return response;
      },
    }),
    getUserTransactionsSummary: builder.query({
      query: () => ({
        url: "/metadata/me/transactions",
        method: "GET",
      }),
      transformResponse: (response: Response<UserTransactionsSummaryMetadata>) => {
        return response;
      },
    }),
    getUserCategoriesSummary: builder.query({
      query: () => ({
        url: "/metadata/me/categories",
        method: "GET",
      }),
      transformResponse: (response: Response<UserCategoriesSummaryMetadata>) => {
        return response;
      },
    }),
    getUserGoalsSummary: builder.query({
      query: () => ({
        url: "/metadata/me/goals",
        method: "GET",
      }),
      transformResponse: (response: Response<UserGoalsSummaryMetadata>) => {
        return response;
      },
    }),
    getUserExpenseStats: builder.query({
      query: (params: Params) => ({
        url: "/metadata/me/expenses",
        method: "GET",
        params,
      }),
      transformResponse: (response: Response<UserExpenseStatsMetadata>) => {
        return response;
      },
    }),
    getUserIncomeStats: builder.query({
      query: (params: Params) => ({
        url: "/metadata/me/incomes",
        method: "GET",
        params,
      }),
      transformResponse: (response: Response<UserIncomeStatsMetadata>) => {
        return response;
      },
    }),
    getUserFinanceStats: builder.query({
      query: (params: Params) => ({
        url: "/metadata/me/finance",
        method: "GET",
        params,
      }),
      transformResponse: (response: Response<UserFinanceStatsMetadata>) => {
        return response;
      },
    }),
    getUserExpenseCategoryBreakdown: builder.query({
      query: (params: Params) => ({
        url: "/metadata/me/categories/expense/breakdown",
        method: "GET",
        params,
      }),
      transformResponse: (response: Response<UserCategoriesBreakdown>) => {
        return response;
      },
    }),
  }),
});

export const {
  useGetUserGlobalSummaryQuery,
  useGetUserWalletSummaryQuery,
  useGetUserMonthlyBudgetSummaryQuery,
  useGetUserTransactionsSummaryQuery,
  useGetUserCategoriesSummaryQuery,
  useGetUserGoalsSummaryQuery,
  useGetUserExpenseStatsQuery,
  useGetUserIncomeStatsQuery,
  useGetUserFinanceStatsQuery,
  useGetUserExpenseCategoryBreakdownQuery,
} = metadataApi;
