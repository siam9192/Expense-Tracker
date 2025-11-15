import { baseApi } from "./base.api";
import type { Response } from "../../types/response.type";
import type {} from "../../types/auth.type";
import type { Params } from "../../types/utils.type";
import type { Category, CreateUserCategoryPayload } from "../../types/category.type";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserCategories: builder.query({
      query: (params: Params) => ({
        url: "categories/me",
        method: "GET",
        params,
      }),
      transformResponse: (response: Response<Category[]>) => {
        return response;
      },
      providesTags: ["userCategories"],
    }),
    createUserCategory: builder.mutation({
      query: (payload: CreateUserCategoryPayload) => ({
        url: "categories/me",
        method: "POST",
        body: payload,
      }),

      transformResponse: (response: Response<Category>) => {
        return response;
      },
      // invalidatesTags:["userCategories"]
    }),
  }),
});

export const { useGetUserCategoriesQuery, useCreateUserCategoryMutation } = categoryApi;
