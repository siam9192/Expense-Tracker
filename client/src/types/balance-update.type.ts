export enum BalanceUpdateType {
  SPENDABLE = "SPENDABLE",
  SAVING = "SAVING",
}

export enum BalanceUpdateResource {
  USER_ADJUSTMENT = "USER_ADJUSTMENT",
  TRANSACTION = "TRANSACTION",
  GOAL_DEPOSIT = "GOAL_DEPOSIT",
  GOAL_WITHDRAW = "GOAL_WITHDRAW",
}

export interface BalanceUpdate {
  id: number;
  user_id: number;
  reason: string;
  prev_balance: number;
  new_balance: number;
  change_amount: number;
  balance_type: BalanceUpdateType;
  resource: BalanceUpdateResource;
  created_at: Date | string;
  updated_at: Date | string;
}
