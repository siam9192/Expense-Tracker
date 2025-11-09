
import { baseApi } from "./base.api";
import type { Response } from "../../types/response.type";
import type { Country } from "../../types/country.type";
import type { Params } from "../../types/utils.type";

const countryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPublicCountries: builder.query({
      query: (params:Params) => ({
        url: '/countries/public',
        method: "GET",
        params
      }),
      transformResponse: (response: Response<Country[]>) => {
        return response;
      },
    }),
  }),
});

export const {useGetPublicCountriesQuery} =  countryApi
