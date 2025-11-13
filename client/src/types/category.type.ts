export enum CategoryType {
  INCOME = "INCOME",
  EXPENSE = "EXPENSE",
  SAVING = "SAVING",
}

export interface Category {
  id: number;
  user_id: number;
  name: string;
  type: CategoryType;
  icon?: string;
  color?: string;
  description: string;

  is_default: boolean;
  is_deleted: boolean;
  is_hidden: boolean;
  created_at: Date | string;
  updated_at: Date | string;

  user: null;
}


export interface CreateUserCategoryPayload {
  name: string;
  description: string;
  type: CategoryType.INCOME|CategoryType.EXPENSE;
}