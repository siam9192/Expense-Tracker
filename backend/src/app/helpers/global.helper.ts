import httpStatus from "../shared/http-status";
import AppError from "../errors/AppError";
import { GLOBAL_ERROR_MESSAGE } from "../utils/constant";
import axios from "axios";
import envConfig from "../config/env.config";
import { CurrencyConversionResponse } from "../utils/type";

export function generateSlug(name: string) {
  return name
    .toLowerCase() // Convert to lowercase
    .replace(/[^a-z0-9\s]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .trim(); // Remove leading/trailing spaces
}

export function generateTransactionId(length = 10) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let transactionId = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    transactionId += characters[randomIndex];
  }
  return transactionId;
}

export function generateChar(length = 20): string {
  let secret = "";
  const source = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * source.length);
    secret += source[randomIndex];
  }

  return secret;
}

export function isNumber(value: string) {
  return !isNaN(parseInt(value));
}

export function formatSecret(secret: string, perChunk = 4) {
  const step = Math.floor(secret.length / perChunk);
  const arr = Array.from({ length: step + 1 }, (_, i) =>
    secret.slice(i * perChunk, i * perChunk + perChunk),
  ).filter((_) => _);
  return arr.join("-");
}

export function flattenObject(
  obj: object,
  parent = "",
  result: Record<string, unknown> = {},
) {
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = parent ? `${parent}.${key}` : key;

    if (value && typeof value === "object" && !Array.isArray(value)) {
      flattenObject(value, fullKey, result);
    } else {
      result[fullKey] = value;
    }
  }
  return result;
}

export function generateOTP(length = 6) {
  const digits = [];
  for (let i = 0; i < length; i++) {
    const random = Math.floor(Math.random() * 10); // 0–9
    digits.push(random);
  }
  return digits.join("");
}

export function throwInternalError() {
  throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, GLOBAL_ERROR_MESSAGE);
}

export interface ConversionResponse {
  base: string;
  date: string;
  rates: { [currencyCode: string]: number };
}

export async function getCurrencyConversionRate(
  from: string,
  to: string,
  amount: number,
): Promise<CurrencyConversionResponse | null> {
  if (!from || !to) {
    return null;
  }

  if (!amount || amount <= 0) {
    return null;
  }

  try {
    const res = await axios.get<ConversionResponse>(
      `https://api.exchangerate-api.com/v4/latest/${from}`,
      {
        params: {
          api_key: envConfig.exchange_rate.api_key,
        },
      },
    );

    const rate = res.data.rates[to];
    if (rate == null) {
      return null;
    }

    return {
      currency: to,
      rate,
      convertedAmount: amount * rate,
    };
  } catch (err: any) {
    return null;
  }
}


export function sumTransactions(transactions: any[]) {
  let income = 0, expense = 0;
  transactions.forEach(item => {
    const value = item._sum.conversion_amount ?? item._sum.amount ?? 0;
    if (item.type === 'INCOME') income += value;
    if (item.type === 'EXPENSE') expense += value;
  });
  return { income, expense };
}

export function calculateGrowth(current: number, previous: number) {
  if (previous === 0) return current === 0 ? 0 : 100;
  return ((current - previous) / previous) * 100;
}
