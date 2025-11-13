import axios from "axios";
import { DEFAULT_ERROR_MESSAGE } from "./constant";
import type { SigninResponseData } from "../types/auth.type";
import Cookies from "js-cookie";
export async function getIpAddress(): Promise<string> {
  try {
    const res = await axios.get("https://api.ipify.org/?format=json");
    const statusCode = res.status;

    if (statusCode < 200 || statusCode >= 300) {
      throw new Error(DEFAULT_ERROR_MESSAGE || "Failed to fetch IP address.");
    }

    const data = res.data;

    if (!data) {
      throw new Error("IP address not found in response.");
    }

    return data.ip;
  } catch (error: any) {
    console.error("Error fetching IP address:", error);
    throw new Error(error?.message || DEFAULT_ERROR_MESSAGE || "Something went wrong.");
  }
}

export function storeAuthToken(authData: SigninResponseData) {
  // 🔒 Store tokens securely (client-side only)
  Cookies.set("accessToken", authData.token.access, {
    secure: false,
    sameSite: "Lax",
    expires: new Date(authData.expires.access),
    path: "/",
  });

  Cookies.set("refreshToken", authData.token.refresh, {
    secure: false,
    sameSite: "Lax",
    expires: new Date(authData.expires.refresh),
    path: "/",
  });
}
