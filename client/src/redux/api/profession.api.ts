
import { baseApi } from "./base.api";
import type { Response } from "../../types/response.type";
import type { Params } from "../../types/utils.type";
import type Profession from "../../types/profession.type";

const professionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPublicProfessions: builder.query({
      query: (params:Params) => ({
        url: '/professions/public',
        method: "GET",
        params
      }),
      transformResponse: (response: Response<Profession[]>) => {
        return response;
      },
    }),
  }),
});

export const {useGetPublicProfessionsQuery} =  professionApi
