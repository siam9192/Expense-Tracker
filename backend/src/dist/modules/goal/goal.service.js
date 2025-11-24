"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const pagination_helper_1 = require("../../helpers/pagination.helper");
const prisma_client_1 = __importDefault(require("../../prisma-client"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("../../shared/http-status"));
class GoalService {
    createGoalIntoDB(authUser, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const complete_percentage = (payload.initial_amount / payload.target_amount) * 100;
            return yield prisma_client_1.default.goal.create({
                data: Object.assign(Object.assign({}, payload), { current_amount: payload.initial_amount, complete_percentage, user_id: authUser.user_id }),
            });
        });
    }
    getCurrentUserGoalsFromDB(authUser, filterQuery, paginationOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            const { search_term } = filterQuery, otherFilterQueries = __rest(filterQuery, ["search_term"]);
            const { page, skip, limit, sortBy, sortOrder } = (0, pagination_helper_1.calculatePagination)(paginationOptions);
            const whereConditions = Object.assign({ user_id: authUser.user_id }, otherFilterQueries);
            if (search_term) {
                whereConditions.title = {
                    contains: search_term,
                    mode: "insensitive",
                };
            }
            const goals = yield prisma_client_1.default.goal.findMany({
                where: whereConditions,
                skip,
                take: limit,
                orderBy: {
                    [sortBy]: sortOrder,
                },
            });
            const total_results = yield prisma_client_1.default.goal.count({
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
        });
    }
    createGoalDepositIntoDB(authUser, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            // 1️⃣ Fetch goal
            const goal = yield prisma_client_1.default.goal.findUnique({
                where: {
                    id: payload.goal_id,
                    user_id: authUser.user_id,
                },
            });
            if (!goal) {
                throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Goal not found");
            }
            // 2️⃣ Check deadline
            if (new Date(goal.deadline).getTime() < new Date().getTime()) {
                throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Goal deadline has already passed. Please reset goal deadline");
            }
            // 3️⃣ Fetch wallet
            const wallet = yield prisma_client_1.default.wallet.findUnique({
                where: { user_id: authUser.user_id },
            });
            if (!wallet)
                throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Wallet not found");
            if (wallet.spendable_balance < payload.amount) {
                throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "You don't have enough balance for deposit");
            }
            // 4️⃣ Fetch user settings (currency)
            const userSettings = yield prisma_client_1.default.userSetting.findUnique({
                where: { user_id: authUser.user_id },
                select: { currency: true },
            });
            if (!userSettings)
                throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User settings not found");
            // 5️⃣ Fetch or create goal deposit category
            const category = yield prisma_client_1.default.category.findUnique({
                where: {
                    user_id_name_type: {
                        user_id: authUser.user_id,
                        name: "Goal Deposit",
                        type: client_1.CategoryType.SAVING,
                    },
                },
            });
            if (!category)
                throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Category not found");
            // 6️⃣ Perform transaction atomically
            const [updatedWallet, createdTransaction, createdNotification] = yield prisma_client_1.default.$transaction([
                // Update wallet balances
                prisma_client_1.default.wallet.update({
                    where: { id: wallet.id },
                    data: {
                        spendable_balance: { decrement: payload.amount },
                        saving_balance: { increment: payload.amount },
                    },
                }),
                // Create transaction record
                prisma_client_1.default.transaction.create({
                    data: {
                        title: `Deposit into goal "${goal.title}"`,
                        user_id: authUser.user_id,
                        category_id: category.id,
                        type: client_1.TransactionType.GOAL_DEPOSIT,
                        amount: payload.amount,
                        currency_id: userSettings.currency.id,
                        date: new Date(),
                    },
                }),
                prisma_client_1.default.goal.update({
                    where: {
                        id: payload.goal_id,
                    },
                    data: Object.assign(Object.assign({ current_amount: {
                            increment: payload.amount,
                        } }, (goal.current_amount + payload.amount >= goal.target_amount
                        ? { status: client_1.GoalStatus.COMPLETED }
                        : {})), { complete_percentage: ((goal.current_amount + payload.amount) / goal.target_amount) *
                            100 }),
                }),
                // Create notification
                prisma_client_1.default.notification.create({
                    data: {
                        user_id: authUser.user_id,
                        message: `You have successfully deposited ${payload.amount} into your goal "${goal.title}".`,
                        type: client_1.NotificationType.SUCCESS,
                    },
                }),
            ]);
            // 7️⃣ Return useful info
            return {
                wallet: updatedWallet,
                transaction: createdTransaction,
                notification: createdNotification,
            };
        });
    }
    createGoalWithdrawIntoDB(authUser, goalId) {
        return __awaiter(this, void 0, void 0, function* () {
            // 1️⃣ Fetch goal
            const goal = yield prisma_client_1.default.goal.findUnique({
                where: {
                    id: Number(goalId),
                    user_id: authUser.user_id,
                },
            });
            if (!goal) {
                throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Goal not found");
            }
            // 3️⃣ Fetch wallet
            const wallet = yield prisma_client_1.default.wallet.findUnique({
                where: { user_id: authUser.user_id },
            });
            if (!wallet)
                throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Wallet not found");
            // 4️⃣ Fetch user currency
            const userSettings = yield prisma_client_1.default.userSetting.findUnique({
                where: { user_id: authUser.user_id },
                select: { currency: true },
            });
            if (!userSettings)
                throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User settings not found");
            // 5️⃣ Fetch category for GOAL_WITHDRAW
            const category = yield prisma_client_1.default.category.findUnique({
                where: {
                    user_id_name_type: {
                        user_id: authUser.user_id,
                        name: "Goal Withdrawal",
                        type: client_1.CategoryType.SAVING,
                    },
                    is_default: true,
                },
            });
            if (!category)
                throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Category not found");
            // 6️⃣ Perform atomic transaction
            const [updatedGoal, updatedWallet, transaction, notification] = yield prisma_client_1.default.$transaction([
                // Decrease goal saved amount
                prisma_client_1.default.goal.update({
                    where: { id: goal.id },
                    data: {
                        is_withdrawn: true,
                    },
                }),
                // Increase spendable balance
                prisma_client_1.default.wallet.update({
                    where: { id: wallet.id },
                    data: {
                        spendable_balance: { increment: goal.current_amount },
                        saving_balance: { decrement: goal.current_amount },
                    },
                }),
                // Record transaction
                prisma_client_1.default.transaction.create({
                    data: {
                        title: `Withdraw from goal  "${goal.title}"`,
                        user_id: authUser.user_id,
                        category_id: category.id,
                        type: client_1.TransactionType.GOAL_WITHDRAW,
                        amount: goal.current_amount,
                        currency_id: userSettings.currency.id,
                        date: new Date(),
                    },
                }),
                // Send notification
                prisma_client_1.default.notification.create({
                    data: {
                        user_id: authUser.user_id,
                        message: `You have withdrawn ${goal.current_amount} from your goal "${goal.title}" to your spendable balance.`,
                        type: client_1.NotificationType.SUCCESS,
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
        });
    }
}
exports.default = new GoalService();
