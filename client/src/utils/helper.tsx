import axios from "axios";
import type { ResultResponse } from "../types/result.type";

export async function fetchResult(rollNumber: number, regulation: string) {
  try {
    const response = await axios.get(
      `https://bteb-result-smoky.vercel.app/individual/${rollNumber}`,
      {
        params: {
          regulation: regulation,
        },
      },
    );

    // Axios wraps the data in `response.data`
    const result = response.data as ResultResponse;

    return result;
  } catch (err: any) {
    throw new Error(err?.response?.data.message || err.message);
  } finally {
    console.log("Fetch attempt completed");
  }
}
