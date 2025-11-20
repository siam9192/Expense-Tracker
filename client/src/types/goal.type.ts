export enum GoalStatus {
  ACTIVE = "ACTIVE",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}
export interface CreateUserGoalPayload {
  title: string;
  target_amount: number;
  initial_amount: number;
  deadline: Date;
}

export interface FilterGoalsQuery
  extends Partial<{
    search_term: string;
    status: GoalStatus;
  }> {}

export interface DepositUserGoalPayload {
  goal_id: number;
  amount: number;
}

export interface WithdrawUserGoalPayload {
  goal_id: number;
  amount: number;
}

export interface Goal {
  id: number;
  user_id: number;
  title: string;
  target_amount: number;
  current_amount: number;
  initial_amount: number;
  deadline: string;
  complete_percentage: number;
  status: GoalStatus;
  is_withdrawn: boolean;
  created_at: Date | string;
  updated_at: Date | string;

  user: null;
}
