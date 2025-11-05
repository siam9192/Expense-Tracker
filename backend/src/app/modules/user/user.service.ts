import {
  BalanceUpdateResource,
  BalanceUpdateType,
  CategoryType,
  SessionStatus,
} from "@prisma/client";
import AppError from "../../errors/AppError";
import prisma from "../../prisma-client";
import httpStatus from "../../shared/http-status";
import { AuthUser } from "../auth/auth.interface";
import {
  SetupUserProfilePayload,
  UpdateCurrentUserSettingsPayload,
  UpdateCurrentUserSpendableBalance,
  UpdateUserProfilePayload,
} from "./user.interface";
import { DEFAULT_CATEGORIES } from "../../utils/constant";

class UserService {
  async setupUserProfileIntoDB(
    authUser: AuthUser,
    payload: SetupUserProfilePayload,
  ) {
    const user = await prisma.user.findFirst({
      where: {
        id: authUser.user_id,
      },
      include: {
        auth_info: true,
      },
    });

    if (user!.isSetupComplete) {
      throw new AppError(httpStatus.FORBIDDEN, "Setup already completed");
    }

    await prisma.$transaction(async (tx) => {
      tx.user.update({
        where: {
          id: authUser.user_id,
        },
        data: {
          isSetupComplete: true,
          profile: {
            create: {
              name: payload.name,
              avatar_id: payload.avatar_id,
              profession_id: payload.profession_id,
              country_id: payload.currency_id,
              wallet: {
                create: {
                  spendable_balance: payload.spendable_balance,
                },
              },
              settings: {
                create: {
                  currency_id: payload.currency_id,
                  monthly_budget: payload.monthly_budget,
                },
              },
              categories: {
                createMany: {
                  data: DEFAULT_CATEGORIES.map((category) => ({
                    ...category,
                    type:
                      category.type === "SAVING"
                        ? CategoryType.SAVING
                        : category.type === "EXPENSE"
                          ? CategoryType.EXPENSE
                          : CategoryType.INCOME,
                  })),
                },
              },
            },
          },
        },
      });
    });

    return {
      setupCompleted: true,
    };
  }

  async updateCurrentUserProfileIntoDB(
    authUser: AuthUser,
    payload: UpdateUserProfilePayload,
  ) {
    return await prisma.userProfile.update({
      where: {
        user_id: authUser.user_id,
      },
      data: payload,
    });
  }

  async getCurrentUserSettingsFromDB(authUser: AuthUser) {
    const settings = await prisma.userSetting.findUnique({
      where: {
        user_id: authUser.user_id,
      },
    });
    if (!settings) throw new Error();
    return settings;
  }

  async getCurrentUserFromDB(authUser: AuthUser) {
    const user = await prisma.user.findUnique({
      where: {
        id: authUser.user_id,
      },
      include: {
        auth_info: true,
        profile: {
          include: {
            avatar: true,
            country: true,
            profession: true,
            wallet: true,
            settings: {
              include: {
                currency: true,
              },
            },
          },
        },
      },
    });

    if (!user) throw new Error();

    const { profile, auth_info } = user;
    const data = {
      name: profile?.name,
      email: auth_info?.email,
      gender: null,
      profile_picture: profile?.profile_picture,
      avatar: profile?.avatar,
      profession: profile?.profession,
      country: profile?.country,
      currency: profile?.settings?.currency,
      wallet: profile?.wallet,
      joined_at: user.created_at,
    };

    return data;
  }

  async getCurrentUserSessionsFromDB(authUser: AuthUser) {
    const sessions = await prisma.session.findMany({
      where: {
        user_id: authUser.user_id,
        status: SessionStatus.ACTIVE,
      },
    });

    return sessions;
  }

  async getCurrentUserLatestBalanceUpdatesFromDB(authUser: AuthUser) {
    return await prisma.balanceUpdate.findMany({
      where: {
        user_id: authUser.user_id,
      },
      take: 5,
      orderBy: {
        created_at: "desc",
      },
    });
  }

  async revokeUserSessionIntoDB(authUser: AuthUser, sessionId: string) {
    if (authUser.session_id === sessionId) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        "You cannot revoke your current session",
      );
    }

    const session = await prisma.session.findUnique({
      where: { id: sessionId },
    });
    if (!session) {
      throw new AppError(httpStatus.NOT_FOUND, "Session not found");
    }

    const updatedSession = await prisma.session.update({
      where: { id: sessionId },
      data: { status: SessionStatus.REVOKED },
    });

    return updatedSession;
  }

  async updateCurrentUserSettingsIntoDB(
    authUser: AuthUser,
    payload: UpdateCurrentUserSettingsPayload,
  ) {
    return await prisma.userSetting.update({
      where: {
        user_id: authUser.user_id,
      },
      data: payload,
    });
  }

  async updateCurrentUserSpendableBalanceIntoDB(
    authUser: AuthUser,
    payload: UpdateCurrentUserSpendableBalance,
  ) {
    const { new_balance, reason } = payload;

    if (new_balance === 0) {
      throw new AppError(400, "Amount cannot be zero");
    }

    // 1️⃣ Fetch user's wallet
    const wallet = await prisma.wallet.findUnique({
      where: { user_id: authUser.user_id },
    });
    if (!wallet) {
      throw new AppError(404, "Wallet not found");
    }

    const change_amount = payload.new_balance - wallet.spendable_balance;

    // 3️⃣ Perform atomic update and log BalanceUpdate
    return await prisma.$transaction(async (tx) => {
      // Update wallet
      const updateWallet = await tx.wallet.update({
        where: { id: wallet.id },
        data: {
          spendable_balance: payload.new_balance,
          total_balance: wallet.spendable_balance + change_amount,
        },
      });

      // Log balance update
      const balanceUpdate = await tx.balanceUpdate.create({
        data: {
          user_id: authUser.user_id,
          prev_balance: wallet.spendable_balance,
          new_balance: payload.new_balance,
          change_amount,
          balance_type: BalanceUpdateType.SPENDABLE,
          reason,
          resource: BalanceUpdateResource.USER_ADJUSTMENT,
        },
      });

      return updateWallet;
    });
  }
}

export default new UserService();
