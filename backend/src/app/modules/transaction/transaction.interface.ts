import { TransactionType } from "@prisma/client";

export interface FilterTransactionsQuery
  extends Partial<{
    id: string;
    type: TransactionType | string;
  }> {}

export interface CreateTransactionPayload {
  title: string;
  category_id: number;
  currency_id: number;
  amount: number;
  date: Date;
  note?: string;
}
