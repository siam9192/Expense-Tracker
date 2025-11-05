import { CategoryType } from "@prisma/client";

export interface FilterCategoriesQuery
  extends Partial<{
    search_term: string;
    type: CategoryType;
  }> {}

export interface CreateCurrentUserCategoryPayload {
  name: string;
  description: string;
  type: "INCOME" | "EXPENSE";
}

export interface UpdateCurrentUserCategory
  extends Partial<{
    name: string;
    description: string;
  }> {}
