import { baseApi } from "./base.api";
import type { Response } from "../../types/response.type";
import type {} from "../../types/auth.type";
import type { Params } from "../../types/utils.type";
import type { CreateUserGoalPayload, DepositUserGoalPayload, Goal } from "../../types/goal.type";

const goalApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserGoals: builder.query({
      query: (params: Params) => ({
        url: "goals/me",
        method: "GET",
        params,
      }),
      transformResponse: (response: Response<Goal[]>) => {
        return response;
      },
      providesTags: ["userGoals"],
    }),
    createUserGoal: builder.mutation({
      query: (payload: CreateUserGoalPayload) => ({
        url: "goals/me",
        method: "POST",
        body: payload,
      }),

      transformResponse: (response: Response<Goal>) => {
        return response;
      },
      invalidatesTags:[]
    }),
     depositUserGoal: builder.mutation({
      query: (payload: DepositUserGoalPayload) => ({
        url: "goals/me/deposit",
        method: "PATCH",
        body: payload,
      }),

      transformResponse: (response: Response<Goal>) => {
        return response;
      },
      invalidatesTags:["userGoals"]
    }),
        withdrawUserGoal: builder.mutation({
      query: (id:string) => ({
        url: `goals/me/${id}/withdraw`,
        method: "PATCH",
        
      }),

      transformResponse: (response: Response<Goal>) => {
        return response;
      },
     invalidatesTags:["userGoals"]
    }),
  }),
});

export const { useGetUserGoalsQuery,useCreateUserGoalMutation,useDepositUserGoalMutation,useWithdrawUserGoalMutation } = goalApi;
