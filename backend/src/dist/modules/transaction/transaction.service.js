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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const pagination_helper_1 = require("../../helpers/pagination.helper");
const prisma_client_1 = __importDefault(require("../../prisma-client"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const global_helper_1 = require("../../helpers/global.helper");
const http_status_1 = __importDefault(require("../../shared/http-status"));
const openai_1 = __importDefault(require("openai"));
const env_config_1 = __importDefault(require("../../config/env.config"));
class TransactionService {
    getCurrentUserTransactionsFromDB(authUser, filterQuery, paginationOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, type } = filterQuery;
            const { page, skip, limit, sortBy, sortOrder } = (0, pagination_helper_1.calculatePagination)(paginationOptions);
            const whereConditions = {
                user_id: authUser.user_id,
            };
            if (id) {
                whereConditions.id = id;
            }
            if (type) {
                if (type.toLocaleLowerCase() === "others") {
                    whereConditions.type = {
                        in: [client_1.TransactionType.GOAL_DEPOSIT, client_1.TransactionType.GOAL_WITHDRAW],
                    };
                }
                else
                    whereConditions.type = type;
            }
            const transactions = yield prisma_client_1.default.transaction.findMany({
                where: whereConditions,
                skip,
                take: limit,
                orderBy: {
                    [sortBy]: sortOrder,
                },
                include: {
                    currency: true,
                    base_currency: true,
                    category: true,
                },
            });
            const total_results = yield prisma_client_1.default.transaction.count({
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
        });
    }
    getCurrentUserTransactionById(authUser, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const transaction = yield prisma_client_1.default.transaction.findUnique({
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
                throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Transaction not found");
            return transaction;
        });
    }
    createTransactionIntoDB(authUser, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            // 1️⃣ Fetch user wallet
            const wallet = yield prisma_client_1.default.wallet.findUnique({
                where: { user_id: authUser.user_id },
            });
            if (!wallet)
                throw new AppError_1.default(404, "Wallet not found");
            // 2️⃣ Fetch user settings (base currency)
            const userSettings = yield prisma_client_1.default.userSetting.findUnique({
                where: { user_id: authUser.user_id },
                select: { currency: true },
            });
            if (!userSettings)
                throw new AppError_1.default(404, "User settings not found");
            // 3️⃣ Fetch category
            const category = yield prisma_client_1.default.category.findUnique({
                where: { id: payload.category_id },
            });
            if (!category)
                throw new AppError_1.default(404, "Category not found");
            // 4️⃣ Determine transaction type (optional: you may pass type separately)
            let transactionType;
            switch (category.type) {
                case client_1.CategoryType.INCOME:
                    transactionType = client_1.TransactionType.INCOME;
                    break;
                case client_1.CategoryType.EXPENSE:
                    transactionType = client_1.TransactionType.EXPENSE;
                    break;
                case client_1.CategoryType.SAVING:
                    // SAVING categories (like goal deposits) should not be created via this generic function
                    throw new AppError_1.default(400, "Invalid category for this transaction type");
                default:
                    throw new AppError_1.default(400, "Invalid category type");
            }
            const currency = yield prisma_client_1.default.currency.findUnique({
                where: {
                    id: payload.currency_id,
                },
            });
            if (!currency)
                throw new Error("Currency not found");
            // 5️⃣ Handle currency conversion if needed
            let conversionRate = undefined;
            let conversionAmount = undefined;
            let is_converted = false;
            if (payload.currency_id !== userSettings.currency.id) {
                // TODO: fetch conversion rate from currency service or table
                const conversion = yield (0, global_helper_1.getCurrencyConversionRate)(currency.code, userSettings.currency.code, payload.amount);
                if (!conversion) {
                    throw new Error();
                }
                conversionAmount = conversion.convertedAmount;
                is_converted = true;
            }
            // 6️⃣ Update wallet balances accordingly (for income/expense only)
            return yield prisma_client_1.default.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                if (transactionType === client_1.TransactionType.INCOME) {
                    yield tx.wallet.update({
                        where: { id: wallet.id },
                        data: {
                            total_balance: {
                                increment: conversionAmount !== null && conversionAmount !== void 0 ? conversionAmount : payload.amount,
                            },
                            spendable_balance: {
                                increment: conversionAmount !== null && conversionAmount !== void 0 ? conversionAmount : payload.amount,
                            },
                        },
                    });
                }
                else if (transactionType === client_1.TransactionType.EXPENSE) {
                    if (wallet.spendable_balance < (conversionAmount !== null && conversionAmount !== void 0 ? conversionAmount : payload.amount)) {
                        throw new AppError_1.default(400, "Insufficient balance");
                    }
                    yield tx.wallet.update({
                        where: { id: wallet.id },
                        data: {
                            total_balance: {
                                decrement: conversionAmount !== null && conversionAmount !== void 0 ? conversionAmount : payload.amount,
                            },
                            spendable_balance: {
                                decrement: conversionAmount !== null && conversionAmount !== void 0 ? conversionAmount : payload.amount,
                            },
                        },
                    });
                }
                // 7️⃣ Create the transaction record
                const createdTransaction = yield tx.transaction.create({
                    data: Object.assign(Object.assign({ title: payload.title, user_id: authUser.user_id, category_id: category.id, type: transactionType, amount: payload.amount, currency_id: payload.currency_id }, (is_converted
                        ? {
                            base_currency_id: userSettings.currency.id,
                            conversion_rate: conversionRate,
                            conversion_amount: conversionAmount,
                        }
                        : {})), { date: payload.date, note: payload.note }),
                });
                yield tx.notification.create({
                    data: {
                        user_id: authUser.user_id, // the user who made the transaction
                        message: `Your transaction of ${payload.amount} has been successfully recorded in category "${category.name}".`,
                        type: client_1.NotificationType.SUCCESS, // or ALERT / INFO depending on your enum
                    },
                });
                return createdTransaction;
            }));
        });
    }
    generateTransactionDataByAi(text) {
        return __awaiter(this, void 0, void 0, function* () {
            const openai = new openai_1.default({
                apiKey: env_config_1.default.open_ai.api_key,
            });
            const response = yield openai.responses.create({
                model: "gpt-5.1",
                input: "write a haiku about ai",
                store: false,
            });
            console.log(response.output_text);
        });
    }
}
exports.default = new TransactionService();
