import { baseApi } from "./base.api";
import type { Response } from "../../types/response.type";
import type {
  ResendOTPPayload,
  SigninPayload,
  SigninResponseData,
  SignupPayload,
  SignupResponseData,
  SignupVerifyPayload,
  SignupVerifyResponseData,
} from "../../types/auth.type";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (payload: SignupPayload) => ({
        url: "auth/signup",
        method: "POST",
        body: payload,
      }),
      transformResponse: (response: Response<SignupResponseData>) => {
        return response;
      },
    }),
    resendOTP: builder.mutation({
      query: (payload: ResendOTPPayload) => ({
        url: "auth/signup/resend-otp",
        method: "POST",
        body: payload,
      }),
      transformResponse: (response: Response<SignupResponseData>) => {
        return response;
      },
    }),
    signupVerify: builder.mutation({
      query: (payload: SignupVerifyPayload) => ({
        url: "auth/signup/verify",
        method: "POST",
        body: payload,
      }),
      transformResponse: (response: Response<SignupVerifyResponseData>) => {
        return response;
      },
    }),
    signin: builder.mutation({
      query: (payload: SigninPayload) => ({
        url: "auth/signin",
        method: "POST",
        body: payload,
      }),
      transformResponse: (response: Response<SigninResponseData>) => {
        return response;
      },
    }),
  }),
});

export const {
  useSignupMutation,
  useResendOTPMutation,
  useSignupVerifyMutation,
  useSigninMutation,
} = authApi;
