import type { BalanceUpdate } from "../../types/balance-update.type";
import type { Response } from "../../types/response.type";
import type {
  GetCurrentUserResponseData,
  SetupUserProfileResponseData,
  UpdateUserSettingsPayload,
  UserProfileSetupProfilePayload,
  UserSession,
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
     updateUserSettings: builder.mutation({
      query: (payload: UpdateUserSettingsPayload) => ({
        url: "users/me/settings",
        method: "PUT",
        body: payload,
      }),
      transformResponse: (response: Response<SetupUserProfileResponseData>) => {
        return response;
      },
    }),
   revokeUserSession: builder.mutation({
      query: (id:number) => ({
        url: `users/me/sessions/${id}/revoke`,
        method: "PATCH",
      }),
      transformResponse: (response: Response<SetupUserProfileResponseData>) => {
        return response;
      },
    }),
  revokeUserAllSession: builder.mutation({
      query: () => ({
        url: `users/me/sessions/all/revoke`,
        method: "PATCH",
       
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
      getUserSessions: builder.query({
      query: () => ({
        url: "users/me/sessions",
        method: "GET",
      }),
      transformResponse: (response: Response<UserSession[]>) => {
        return response;
      },
    }),
  }),
});

export const {
  useGetCurrentUserQuery,
  useSetupUserProfileMutation,
  useGetCurrentUserSettingsQuery,
  useUpdateUserSettingsMutation,
  useRevokeUserAllSessionMutation,
  useRevokeUserSessionMutation,
  useGetUserLatestBalanceUpdatesQuery,
  useGetUserSessionsQuery,
} = authApi;
