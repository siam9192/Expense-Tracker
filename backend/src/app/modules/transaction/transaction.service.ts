import {
  CategoryType,
  NotificationType,
  Prisma,
  TransactionType,
} from "@prisma/client";
import { calculatePagination } from "../../helpers/pagination.helper";
import { PaginationOptions } from "../../types";
import { AuthUser } from "../auth/auth.interface";
import {
  CreateTransactionPayload,
  FilterTransactionsQuery,
} from "./transaction.interface";
import prisma from "../../prisma-client";
import AppError from "../../errors/AppError";
import { getCurrencyConversionRate } from "../../helpers/global.helper";
import httpStatus from "../../shared/http-status";

class TransactionService {
  async getCurrentUserTransactionsFromDB(
    authUser: AuthUser,
    filterQuery: FilterTransactionsQuery,
    paginationOptions: PaginationOptions,
  ) {
    const { id } = filterQuery;
    const { page, skip, limit, sortBy, sortOrder } =
      calculatePagination(paginationOptions);
    const whereConditions: Prisma.TransactionWhereInput = {
      user_id: authUser.user_id,
    };
    if (id) {
      whereConditions.id = id;
    }

    const transactions = await prisma.transaction.findMany({
      where: whereConditions,
      skip,
      take: limit,
      orderBy: {
        [sortBy]: sortOrder,
      },
    });

    const total_results = await prisma.transaction.count({
      where: whereConditions,
    });

    const meta = {
      page,
      limit,
      total_results,
    };

    return {
      data: transactions,
      meta,
    };
  }

  async getCurrentUserTransactionById(authUser: AuthUser, id: string) {
    const transaction = await prisma.transaction.findUnique({
      where: {
        id,
        user_id: authUser.user_id,
      },
      include: {
        currency: true,
        base_currency: true,
      },
    });

    if (!transaction)
      throw new AppError(httpStatus.NOT_FOUND, "Transaction not found");
    return transaction;
  }
  async createTransactionIntoDB(
    authUser: AuthUser,
    payload: CreateTransactionPayload,
  ) {
    // 1️⃣ Fetch user wallet
    const wallet = await prisma.wallet.findUnique({
      where: { user_id: authUser.user_id },
    });
    if (!wallet) throw new AppError(404, "Wallet not found");

    // 2️⃣ Fetch user settings (base currency)
    const userSettings = await prisma.userSetting.findUnique({
      where: { user_id: authUser.user_id },
      select: { currency: true },
    });
    if (!userSettings) throw new AppError(404, "User settings not found");

    // 3️⃣ Fetch category
    const category = await prisma.category.findUnique({
      where: { id: payload.category_id },
    });
    if (!category) throw new AppError(404, "Category not found");

    // 4️⃣ Determine transaction type (optional: you may pass type separately)
    let transactionType: TransactionType;
    switch (category.type) {
      case CategoryType.INCOME:
        transactionType = TransactionType.INCOME;
        break;
      case CategoryType.EXPENSE:
        transactionType = TransactionType.EXPENSE;
        break;
      case CategoryType.SAVING:
        // SAVING categories (like goal deposits) should not be created via this generic function
        throw new AppError(400, "Invalid category for this transaction type");
      default:
        throw new AppError(400, "Invalid category type");
    }

    const currency = await prisma.currency.findUnique({
      where: {
        id: payload.currency_id,
      },
    });

    if (!currency) throw new Error("Currency not found");

    // 5️⃣ Handle currency conversion if needed
    let conversionRate: number | undefined = undefined;
    let conversionAmount: number | undefined = undefined;

    if (payload.currency_id !== userSettings.currency.id) {
      // TODO: fetch conversion rate from currency service or table
      const conversion = await getCurrencyConversionRate(
        currency.code,
        userSettings.currency.code,
        payload.amount,
      );

      if (!conversion) {
        throw new Error();
      }
      conversionAmount = conversion.convertedAmount;
    }

    // 6️⃣ Update wallet balances accordingly (for income/expense only)
    return await prisma.$transaction(async (tx) => {
      if (transactionType === TransactionType.INCOME) {
        await tx.wallet.update({
          where: { id: wallet.id },
          data: {
            total_balance: {
              increment: conversionAmount ?? payload.amount,
            },
            spendable_balance: {
              increment: conversionAmount ?? payload.amount,
            },
          },
        });
      } else if (transactionType === TransactionType.EXPENSE) {
        if (wallet.spendable_balance < (conversionAmount ?? payload.amount)) {
          throw new AppError(400, "Insufficient balance");
        }
        await tx.wallet.update({
          where: { id: wallet.id },
          data: {
            total_balance: {
              decrement: conversionAmount ?? payload.amount,
            },
            spendable_balance: {
              decrement: conversionAmount ?? payload.amount,
            },
          },
        });
      }

      // 7️⃣ Create the transaction record
      const createdTransaction = await tx.transaction.create({
        data: {
          user_id: authUser.user_id,
          category_id: category.id,
          type: transactionType,
          amount: payload.amount,
          currency_id: payload.currency_id,
          base_currency_id: userSettings.currency.id,
          conversion_rate: conversionRate,
          conversion_amount: conversionAmount,
          date: payload.date,
          note: payload.note,
        },
      });
      await tx.notification.create({
        data: {
          user_id: authUser.user_id, // the user who made the transaction
          message: `Your transaction of ${payload.amount} has been successfully recorded in category "${category.name}".`,
          type: NotificationType.SUCCESS, // or ALERT / INFO depending on your enum
        },
      });
      return createdTransaction;
    });
  }
}

export default new TransactionService();
