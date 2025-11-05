import { GoalStatus } from "@prisma/client";

export interface CreateCurrentUserGoalPayload {
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

export interface DepositCurrentUserGoalPayload {
  goal_id: number;
  amount: number;
}
