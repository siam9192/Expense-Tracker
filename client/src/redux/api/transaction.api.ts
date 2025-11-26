import { baseApi } from "./base.api";
import type { Response } from "../../types/response.type";
import type { Params } from "../../types/utils.type";
import type { CreateTransactionPayload, Transaction } from "../../types/transaction.type";

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
    getUserTransactionById: builder.query({
      query: (id) => ({
        url: `/transactions/me/${id}`,
        method: "GET",
      }),
      transformResponse: (response: Response<Transaction>) => {
        return response;
      },
    }),
    createUserTransaction: builder.mutation({
      query: (payload: CreateTransactionPayload) => ({
        url: "/transactions/me",
        method: "POST",
        body: payload,
      }),
      transformResponse: (response: Response<Transaction>) => {
        return response;
      },
    }),
  }),
});

export const {
  useGetUserTransactionsQuery,
  useCreateUserTransactionMutation,
  useGetUserTransactionByIdQuery,
} = transactionApi;
