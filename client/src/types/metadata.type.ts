export type UserGlobalSummaryMetadata = {
  total_balance: number;
  total_categories: number;
  total_active_goals: number;
  total_income: number;
  total_expense: number;
  current_month_growth: {
    income: number;
    expense: number;
  };
};

export type UserWalletSummaryMetadata = {
  total_balance: number;
  spendable_balance: number;
  saving_balance: number;
  monthly_budget: number;
  last_month_spent: number;
};

export type UserMonthlyBudgetMetadata = {
  total_income: number;
  total_expense: number;
  budget_usage: number;
  budget: number;
};

export type UserTransactionsSummaryMetadata = {
  total_income: number;
  total_expense: number;
  transactions_count: number;
  period_total: number;
  period: string;
};

export type UserGoalsSummaryMetadata = {
  current_savings: number;
  avg_progress: number;
  total_completed_goals: number;
  total_active_goals: number;
};

export type UserCategoriesSummaryMetadata = {
  total_categories: number;
  unused_categories: number;
  most_used_category: number;
  most_used_percentage: number;
};

export type UserExpenseStatsMetadata = {
  sequence: string;
  total_expense: number;
  stats: {
    label: string;
    total: number;
  }[];
};

export type UserIncomeStatsMetadata = {
  sequence: string;
  total_income: number;
  stats: {
    label: string;
    total: number;
  }[];
};

export type UserFinanceStatsMetadata = {
  sequence: string;
  income: number;
  expense: number;
  savings: number;
};

export type UserCategoriesBreakdown = {
  sequence: string;
  breakdown: {
    category: string;
    total: number;
    percentage: number;
  }[];
};

export type UserNotificationsSummary = {
  total: number;
  read: number;
  unread: number;
};
