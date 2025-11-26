import Cookies from "js-cookie";
import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
} from "@reduxjs/toolkit/query/react";
import envConfig from "../../config/env.config";
import type { SigninResponseData } from "../../types/auth.type";
import { clearAuthToken, storeAuthToken } from "../../utils/helper";

// 1️⃣ Base fetch
const baseQuery: BaseQueryFn<string | FetchArgs, unknown, unknown> = fetchBaseQuery({
  baseUrl: envConfig.backendUrl,
  prepareHeaders: (headers) => {
    const token = Cookies.get("accessToken");
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// 2️⃣ Add refresh logic
const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, unknown> = async (
  args,
  api,
  extraOptions,
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error && (result.error as any).status === 401) {
    console.log("⛔ Access token expired → refreshing...");

    const refreshToken = Cookies.get("refreshToken");
    if (!refreshToken) {
      clearAuthToken();
      return result;
    }

    // Call refresh token endpoint
    const refreshResult = await baseQuery(
      {
        url: "/auth/refresh-token",
        method: "POST",
        body: { refreshToken },
      },
      api,
      extraOptions,
    );

    if (refreshResult.data) {
      const data = refreshResult.data as SigninResponseData;
      storeAuthToken(data);

      // Retry original request
      result = await baseQuery(args, api, extraOptions);
    } else {
      clearAuthToken();
    }
  }

  return result;
};

// 3️⃣ Create API
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "getCurrentUser",
    "userCategories",
    "userGoals",
    "getUserSessions",
    "userNotifications",
  ],
  endpoints: () => ({}),
});
