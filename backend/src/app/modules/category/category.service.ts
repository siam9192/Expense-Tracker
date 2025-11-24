import { Prisma } from "@prisma/client";
import { calculatePagination } from "../../helpers/pagination.helper";
import prisma from "../../prisma-client";
import { PaginationOptions } from "../../types";
import {
  CreateCurrentUserCategoryPayload,
  FilterCategoriesQuery,
  UpdateCurrentUserCategory,
} from "./category.interface";
import { AuthUser } from "../auth/auth.interface";
import AppError from "../../errors/AppError";
import httpStatus from "../../shared/http-status";

class CategoryService {
  async seedCategoriesIntoDB(userId: string) {}

  async createCurrentUserCategory(
    authUser: AuthUser,
    payload: CreateCurrentUserCategoryPayload,
  ) {
    // 1️⃣ Check if category with same name & type already exists for user
    const existingCategory = await prisma.category.findUnique({
      where: {
        user_id_name_type: {
          user_id: authUser.user_id,
          name: payload.name.trim(),
          type: payload.type,
        },
      },
    });

    if (existingCategory) {
      throw new AppError(
        httpStatus.CONFLICT,
        `Category "${payload.name}" already exists in ${payload.type.toLowerCase()} type.`,
      );
    }

    // 2️⃣ Create the new category
    const newCategory = await prisma.category.create({
      data: {
        user_id: authUser.user_id,
        name: payload.name.trim(),
        type: payload.type,
        description: payload.description,
        is_default: false,
        is_hidden: false,
      },
    });

    return newCategory;
  }

  async getCurrentUserCategoriesFromDB(
    authUser: AuthUser,
    filterQuery: FilterCategoriesQuery,
    paginationOptions: PaginationOptions,
  ) {
    const { search_term, ...other_filters } = filterQuery;
    const { page, skip, limit, sortBy, sortOrder } =
      calculatePagination(paginationOptions);
    const whereConditions: Prisma.CategoryWhereInput = {
      user_id: authUser.user_id,
      ...other_filters,
    };
    if (search_term) {
      whereConditions.name = {
        contains: search_term,
        mode: "insensitive",
      };
    }

    const categories = await prisma.category.findMany({
      where: whereConditions,
      skip,
      take: limit,
      orderBy: {
        [sortBy]: sortOrder,
      },
    });

    const transactions = await prisma.transaction.findMany({
      where: {
        user_id: authUser.id,
        category_id: {
          in: categories.map((_) => _.id),
        },
      },
    });

    const data = categories.map((cat) => {
      const catTrans = transactions.filter((t) => t.category_id === cat.id);

      const transactionAmount = catTrans.reduce((sum, t) => {
        // If conversion_amount exists, use it; otherwise use amount
        return sum + (t.conversion_amount ?? t.amount);
      }, 0);

      return {
        ...cat,
        transaction_amount: transactionAmount,
      };
    });

    const total_results = await prisma.category.count({
      where: whereConditions,
    });

    const meta = {
      page,
      limit,
      total_results,
    };

    return {
      data,
      meta,
    };
  }

  async updateCurrentUserCategoryById(
    authUser: AuthUser,
    categoryId: string | number,
    payload: UpdateCurrentUserCategory,
  ) {
    categoryId = Number(categoryId);

    // 1️⃣ Fetch the category to ensure it belongs to the user
    const category = await prisma.category.findUnique({
      where: {
        id: categoryId,
        is_default: false,
        is_hidden: false,
        is_deleted: false,
      },
    });

    if (!category || category.user_id !== authUser.user_id) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        "Category not found or you don't have permission to update it.",
      );
    }

    if (payload.name) {
      // 2️⃣ Check for duplicate name in the same type
      const duplicate = await prisma.category.findUnique({
        where: {
          user_id_name_type: {
            user_id: authUser.user_id,
            name: payload.name,
            type: category.type,
          },
        },
      });

      if (duplicate) {
        throw new AppError(
          httpStatus.CONFLICT,
          `Category "${payload.name}" already exists in ${category.type.toLowerCase()} type.`,
        );
      }
    }

    // 3️⃣ Update only the name
    const updatedCategory = await prisma.category.update({
      where: { id: categoryId },
      data: {
        ...payload,
      },
    });
    return updatedCategory;
  }

  async softDeleteCurrentUserCategoryById(
    authUser: AuthUser,
    categoryId: string,
  ) {
    // 1️⃣ Fetch the category to ensure it belongs to the user
    const category = await prisma.category.findUnique({
      where: {
        id: parseInt(categoryId, 10),
        is_default: false,
        is_hidden: false,
        is_deleted: false,
      },
    });

    if (!category || category.user_id !== authUser.user_id) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        "Category not found or you don't have permission to delete it.",
      );
    }

    // 2️⃣ Prevent deletion of default or hidden system categories
    if (category.is_default || category.is_hidden) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        "This category cannot be deleted.",
      );
    }

    // 3️⃣ Soft delete: mark as deleted
    const deletedCategory = await prisma.category.update({
      where: { id: parseInt(categoryId, 10) },
      data: { is_deleted: true },
    });
    return null;
  }
}

export default new CategoryService();
