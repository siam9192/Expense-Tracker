import { baseApi } from "./base.api";
import type { Response } from "../../types/response.type";
import type {} from "../../types/auth.type";
import type { Params } from "../../types/utils.type";


const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserNotifications: builder.query({
      query: (params: Params) => ({
        url: "notifications/me",
        method: "GET",
        params,
      }),
      transformResponse: (response: Response<Notification[]>) => {
        return response;
      },
      providesTags: ["userNotifications"],
    }),

    userAllNotificationSetAsRead: builder.mutation({
      query: () => ({
        url: "notifications/me/all/set-read",
        method: "PATCH",
      }),

      transformResponse: (response: Response<null>) => {
        return response;
      },
      invalidatesTags: ["userNotifications"],
    }),
    userNotificationSetAsRead: builder.mutation({
      query: (id: number) => ({
        url: `notifications/me/${id}/set-read`,
        method: "PATCH",
      }),

      transformResponse: (response: Response<Notification>) => {
        return response;
      },
      invalidatesTags: ["userNotifications"],
    }),
    deleteUserNotification: builder.mutation({
      query: (id: number) => ({
        url: `notifications/me/${id}`,
        method: "DELETE",
      }),

      transformResponse: (response: Response<null>) => {
        return response;
      },
      invalidatesTags: ["userNotifications"],
    }),
  }),
});

export const {
  useGetUserNotificationsQuery,
  useUserAllNotificationSetAsReadMutation,
  useUserNotificationSetAsReadMutation,
  useDeleteUserNotificationMutation,
} = notificationApi;
