import { baseApi } from "./base.api";
import type { Response } from "../../types/response.type";
import type { Params } from "../../types/utils.type";
import type { Transaction } from "../../types/transaction.type";

const transactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserTransactions: builder.query({
      query: (params: Params) => ({
        url: "/transactions/me",
        method: "GET",
        params,
      }),
      transformResponse: (response: Response<Transaction[]>) => {
        return response;
      },
    }),
  }),
});

export const { useGetUserTransactionsQuery } = transactionApi;
