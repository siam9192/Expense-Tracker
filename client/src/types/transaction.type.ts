import type { Category } from "./category.type";
import type { Currency } from "./currency.type";

export enum TransactionType {
  INCOME = "INCOME",
  EXPENSE = "EXPENSE",
  GOAL_DEPOSIT = "GOAL_DEPOSIT",
  GOAL_WITHDRAW = "GOAL_WITHDRAW",
}

export interface Transaction {
  id: number;
  user: null;
  title: string;
  category: Category;
  currency: Currency;
  base_currency: Currency;

  amount: number;
  conversion_rate: number;
  conversion_amount: number;

  type: TransactionType;
  note: string | null;
  date: Date | string;
  created_at: Date | string;
  updated_at: Date | string;

  user_id: number;
  category_id: number;
  currency_id: number;
  base_currency_id: number | null;
}
