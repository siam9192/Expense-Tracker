export interface FilterTransactionsQuery
  extends Partial<{
    id: string;
  }> {}

export interface CreateTransactionPayload {
  category_id: number;
  currency_id: number;
  amount: number;
  date: Date;
  note?: string;
}
