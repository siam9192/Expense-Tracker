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
export function getTimeLeft(date: Date) {
  const now = new Date();
  const diff = date.getTime() - now.getTime(); // FIX: time left, not passed

  if (diff <= 0) return "Expired";

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) return `${years} Year${years > 1 ? "s" : ""}`;
  if (months > 0) return `${months} Month${months > 1 ? "s" : ""}`;
  if (days > 0) return `${days} Day${days > 1 ? "s" : ""}`;
  if (hours > 0) return `${hours} Hour${hours > 1 ? "s" : ""}`;
  if (minutes > 0) return `${minutes} Minute${minutes > 1 ? "s" : ""}`;
  return `${seconds} Second${seconds > 1 ? "s" : ""}`;
}
