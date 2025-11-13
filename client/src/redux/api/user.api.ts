import type { BalanceUpdate } from "../../types/balance-update.type";
import type { Response } from "../../types/response.type";
import type {
  GetCurrentUserResponseData,
  SetupUserProfileResponseData,
  UserProfileSetupProfilePayload,
  UserSettings,
} from "../../types/user.type";
import { baseApi } from "./base.api";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentUser: builder.query({
      query: () => ({
        url: "users/me",
        method: "GET",
      }),
      transformResponse: (response: Response<GetCurrentUserResponseData>) => {
        return response;
      },
      providesTags: ["getCurrentUser"],
    }),
    getCurrentUserSettings: builder.query({
      query: () => ({
        url: "users/me/settings",
        method: "GET",
      }),
      transformResponse: (response: Response<UserSettings>) => {
        return response;
      },
    }),
    setupUserProfile: builder.mutation({
      query: (payload: UserProfileSetupProfilePayload) => ({
        url: "users/me/setup-profile",
        method: "POST",
        body: payload,
      }),
      transformResponse: (response: Response<SetupUserProfileResponseData>) => {
        return response;
      },
    }),

    getUserLatestBalanceUpdates: builder.query({
      query: () => ({
        url: "users/me/balance-updates",
        method: "GET",
      }),
      transformResponse: (response: Response<BalanceUpdate[]>) => {
        return response;
      },
    }),
  }),
});

export const {
  useGetCurrentUserQuery,
  useSetupUserProfileMutation,
  useGetCurrentUserSettingsQuery,
  useGetUserLatestBalanceUpdatesQuery,
} = authApi;
