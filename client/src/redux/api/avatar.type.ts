import { baseApi } from "./base.api";
import type { Response } from "../../types/response.type";
import type { Params } from "../../types/utils.type";
import type { Avatar } from "../../types/avatar.type";

const avatarApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPublicAvatars: builder.query({
      query: (params: Params) => ({
        url: "/avatars/public",
        method: "GET",
        params,
      }),
      transformResponse: (response: Response<Avatar[]>) => {
        return response;
      },
    }),
  }),
});

export const { useGetPublicAvatarsQuery } = avatarApi;
