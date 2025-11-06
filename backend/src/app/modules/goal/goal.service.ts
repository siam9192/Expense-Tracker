import {
  CategoryType,
  NotificationType,
  Prisma,
  TransactionType,
} from "@prisma/client";
import { calculatePagination } from "../../helpers/pagination.helper";
import prisma from "../../prisma-client";
import { PaginationOptions } from "../../types";
import { AuthUser } from "../auth/auth.interface";
import {
  CreateCurrentUserGoalPayload,
  DepositCurrentUserGoalPayload,
  FilterGoalsQuery,
  WithdrawCurrentUserGoalPayload,
} from "./goal.interface";
import AppError from "../../errors/AppError";
import httpStatus from "../../shared/http-status";

class GoalService {
  async createGoalIntoDB(
    authUser: AuthUser,
    payload: CreateCurrentUserGoalPayload,
  ) {
    const complete_percentage =
      (payload.initial_amount / payload.target_amount) * 100;
    return await prisma.goal.create({
      data: {
        ...payload,
        current_amount: payload.initial_amount,
        complete_percentage,
        user_id: authUser.user_id,
      },
    });
  }

  async getCurrentUserGoalsFromDB(
    authUser: AuthUser,
    filterQuery: FilterGoalsQuery,
    paginationOptions: PaginationOptions,
  ) {
    const { search_term } = filterQuery;
    const { page, skip, limit, sortBy, sortOrder } =
      calculatePagination(paginationOptions);
    const whereConditions: Prisma.GoalWhereInput = {
      user_id: authUser.user_id,
    };
    if (search_term) {
      whereConditions.title = {
        contains: search_term,
        mode: "insensitive",
      };
    }

    const goals = await prisma.goal.findMany({
      where: whereConditions,
      skip,
      take: limit,
      orderBy: {
        [sortBy]: sortOrder,
      },
    });

    const total_results = await prisma.goal.count({
      where: whereConditions,
    });

    const meta = {
      page,
      limit,
      total_results,
    };

    return {
      data: goals,
      meta,
    };
  }

  async createGoalDepositIntoDB(
    authUser: AuthUser,
    payload: DepositCurrentUserGoalPayload,
  ) {
    // 1️⃣ Fetch goal
    const goal = await prisma.goal.findUnique({
      where: {
        id: payload.goal_id,
        user_id: authUser.user_id,
      },
    });

    if (!goal) {
      throw new AppError(httpStatus.NOT_FOUND, "Goal not found");
    }

    // 2️⃣ Check deadline
    if (new Date(goal.deadline).getTime() < new Date().getTime()) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Goal deadline has already passed. Please reset goal deadline",
      );
    }

    // 3️⃣ Fetch wallet
    const wallet = await prisma.wallet.findUnique({
      where: { user_id: authUser.user_id },
    });
    if (!wallet) throw new AppError(httpStatus.NOT_FOUND, "Wallet not found");

    if (wallet.spendable_balance < payload.amount) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "You don't have enough balance for deposit",
      );
    }

    // 4️⃣ Fetch user settings (currency)
    const userSettings = await prisma.userSetting.findUnique({
      where: { user_id: authUser.user_id },
      select: { currency: true },
    });
    if (!userSettings)
      throw new AppError(httpStatus.NOT_FOUND, "User settings not found");

    // 5️⃣ Fetch or create goal deposit category
    const category = await prisma.category.findUnique({
      where: {
        user_id_name_type: {
          user_id: authUser.user_id,
          name: "Goal Deposit",
          type: CategoryType.SAVING,
        },
      },
    });
    if (!category)
      throw new AppError(httpStatus.NOT_FOUND, "Category not found");

    // 6️⃣ Perform transaction atomically
    const [updatedWallet, createdTransaction, createdNotification] =
      await prisma.$transaction([
        // Update wallet balances
        prisma.wallet.update({
          where: { id: wallet.id },
          data: {
            spendable_balance: { decrement: payload.amount },
            saving_balance: { increment: payload.amount },
          },
        }),

        // Create transaction record
        prisma.transaction.create({
          data: {
            user_id: authUser.user_id,
            category_id: category.id,
            type: TransactionType.GOAL_DEPOSIT,
            amount: payload.amount,
            currency_id: userSettings.currency.id,
            date: new Date(),
          },
        }),

        // Create notification
        prisma.notification.create({
          data: {
            user_id: authUser.user_id,
            message: `You have successfully deposited ${payload.amount} into your goal "${goal.title}".`,
            type: NotificationType.SUCCESS,
          },
        }),
      ]);

    // 7️⃣ Return useful info
    return {
      wallet: updatedWallet,
      transaction: createdTransaction,
      notification: createdNotification,
    };
  }

  async createGoalWithdrawIntoDB(authUser: AuthUser, goalId: string) {
    // 1️⃣ Fetch goal
    const goal = await prisma.goal.findUnique({
      where: {
        id: Number(goalId),
        user_id: authUser.user_id,
      },
    });
    if (!goal) {
      throw new AppError(httpStatus.NOT_FOUND, "Goal not found");
    }

    // 3️⃣ Fetch wallet
    const wallet = await prisma.wallet.findUnique({
      where: { user_id: authUser.user_id },
    });
    if (!wallet) throw new AppError(httpStatus.NOT_FOUND, "Wallet not found");

    // 4️⃣ Fetch user currency
    const userSettings = await prisma.userSetting.findUnique({
      where: { user_id: authUser.user_id },
      select: { currency: true },
    });
    if (!userSettings)
      throw new AppError(httpStatus.NOT_FOUND, "User settings not found");

    // 5️⃣ Fetch category for GOAL_WITHDRAW
    const category = await prisma.category.findUnique({
      where: {
        user_id_name_type: {
          user_id: authUser.user_id,
          name: "Goal Withdraw",
          type: CategoryType.SAVING,
        },
        is_default: true,
      },
    });
    if (!category)
      throw new AppError(httpStatus.NOT_FOUND, "Category not found");

    // 6️⃣ Perform atomic transaction
    const [updatedGoal, updatedWallet, transaction, notification] =
      await prisma.$transaction([
        // Decrease goal saved amount
        prisma.goal.update({
          where: { id: goal.id },
          data: {
            is_withdrawn: true,
          },
        }),

        // Increase spendable balance
        prisma.wallet.update({
          where: { id: wallet.id },
          data: {
            spendable_balance: { increment: goal.current_amount },
            saving_balance: { decrement: goal.current_amount },
          },
        }),

        // Record transaction
        prisma.transaction.create({
          data: {
            user_id: authUser.user_id,
            category_id: category.id,
            type: TransactionType.GOAL_WITHDRAW,
            amount: goal.current_amount,
            currency_id: userSettings.currency.id,
            date: new Date(),
          },
        }),

        // Send notification
        prisma.notification.create({
          data: {
            user_id: authUser.user_id,
            message: `You have withdrawn ${goal.current_amount} from your goal "${goal.title}" to your spendable balance.`,
            type: NotificationType.SUCCESS,
          },
        }),
      ]);

    // 7️⃣ Return useful info
    return {
      goal: updatedGoal,
      wallet: updatedWallet,
      transaction,
      notification,
    };
  }
}

export default new GoalService();
