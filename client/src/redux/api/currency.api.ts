
import { baseApi } from "./base.api";
import type { Response } from "../../types/response.type";
import type { Params } from "../../types/utils.type";
import type { Currency } from "../../types/currency.type";

const currencyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPublicCurrencies: builder.query({
      query: (params:Params) => ({
        url: '/currencies/public',
        method: "GET",
        params
      }),
      transformResponse: (response: Response<Currency[]>) => {
        return response;
      },
    }),
  }),
});

export const {useGetPublicCurrenciesQuery} =  currencyApi
