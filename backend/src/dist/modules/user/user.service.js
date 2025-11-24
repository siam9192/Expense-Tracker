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
const AppError_1 = __importDefault(require("../../errors/AppError"));
const prisma_client_1 = __importDefault(require("../../prisma-client"));
const http_status_1 = __importDefault(require("../../shared/http-status"));
const constant_1 = require("../../utils/constant");
class UserService {
    setupUserProfileIntoDB(authUser, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma_client_1.default.user.findFirst({
                where: {
                    id: authUser.user_id,
                },
                include: {
                    auth_info: true,
                },
            });
            if (user.isSetupComplete) {
                throw new AppError_1.default(http_status_1.default.FORBIDDEN, "Setup already completed");
            }
            yield prisma_client_1.default.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                yield tx.user.update({
                    where: {
                        id: authUser.user_id,
                    },
                    data: {
                        isSetupComplete: true,
                        profile: {
                            create: {
                                name: payload.name,
                                gender: payload.gender,
                                avatar_id: payload.avatar_id,
                                profession_id: payload.profession_id,
                                country_id: payload.country_id,
                                wallet: {
                                    create: {
                                        total_balance: payload.spendable_balance,
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
                                        data: constant_1.DEFAULT_CATEGORIES.map((category) => (Object.assign(Object.assign({}, category), { type: category.type === "SAVING"
                                                ? client_1.CategoryType.SAVING
                                                : category.type === "EXPENSE"
                                                    ? client_1.CategoryType.EXPENSE
                                                    : client_1.CategoryType.INCOME }))),
                                    },
                                },
                            },
                        },
                    },
                });
            }));
            return {
                setupComplete: true,
            };
        });
    }
    updateCurrentUserProfileIntoDB(authUser, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_client_1.default.userProfile.update({
                where: {
                    user_id: authUser.user_id,
                },
                data: payload,
            });
        });
    }
    getCurrentUserSettingsFromDB(authUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const settings = yield prisma_client_1.default.userSetting.findUnique({
                where: {
                    user_id: authUser.user_id,
                },
                include: {
                    currency: true,
                },
            });
            if (!settings)
                throw new Error();
            return settings;
        });
    }
    getCurrentUserFromDB(authUser) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const user = yield prisma_client_1.default.user.findUnique({
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
            if (!user)
                throw new Error();
            if (user.isSetupComplete) {
                const { profile, auth_info } = user;
                const data = {
                    name: profile === null || profile === void 0 ? void 0 : profile.name,
                    email: auth_info === null || auth_info === void 0 ? void 0 : auth_info.email,
                    gender: profile === null || profile === void 0 ? void 0 : profile.gender,
                    profile_picture: profile === null || profile === void 0 ? void 0 : profile.profile_picture,
                    avatar: profile === null || profile === void 0 ? void 0 : profile.avatar,
                    profession: profile === null || profile === void 0 ? void 0 : profile.profession,
                    country: profile === null || profile === void 0 ? void 0 : profile.country,
                    currency: (_a = profile === null || profile === void 0 ? void 0 : profile.settings) === null || _a === void 0 ? void 0 : _a.currency,
                    wallet: profile === null || profile === void 0 ? void 0 : profile.wallet,
                    joined_at: user.created_at,
                };
                return data;
            }
            else {
                return {
                    email: (_b = user.auth_info) === null || _b === void 0 ? void 0 : _b.email,
                    isSetupComplete: false,
                };
            }
        });
    }
    getCurrentUserSessionsFromDB(authUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const sessions = yield prisma_client_1.default.session.findMany({
                where: {
                    user_id: authUser.user_id,
                    status: client_1.SessionStatus.ACTIVE,
                },
                select: {
                    id: true,
                    user_id: true,
                    device_name: true,
                    address: true,
                    ip: true,
                    status: true,
                    created_at: true,
                },
            });
            return sessions.map((_) => (Object.assign(Object.assign({}, _), { current: _.id === authUser.session_id })));
        });
    }
    getCurrentUserLatestBalanceUpdatesFromDB(authUser) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_client_1.default.balanceUpdate.findMany({
                where: {
                    user_id: authUser.user_id,
                },
                take: 5,
                orderBy: {
                    created_at: "desc",
                },
            });
        });
    }
    revokeUserSessionIntoDB(authUser, sessionId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (authUser.session_id === sessionId) {
                throw new AppError_1.default(http_status_1.default.FORBIDDEN, "You cannot revoke your current session");
            }
            const session = yield prisma_client_1.default.session.findUnique({
                where: { id: sessionId },
            });
            if (!session) {
                throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Session not found");
            }
            const updatedSession = yield prisma_client_1.default.session.update({
                where: { id: sessionId },
                data: { status: client_1.SessionStatus.REVOKED },
            });
            return updatedSession;
        });
    }
    revokeUserAllSessionIntoDB(authUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const session = yield prisma_client_1.default.session.findFirst({
                where: {
                    status: client_1.SessionStatus.ACTIVE,
                },
            });
            if (!session) {
                throw new AppError_1.default(http_status_1.default.NOT_FOUND, "No active session  found");
            }
            const updatedSession = yield prisma_client_1.default.session.updateMany({
                where: { user_id: authUser.user_id, status: client_1.SessionStatus.ACTIVE },
                data: { status: client_1.SessionStatus.REVOKED },
            });
            return null;
        });
    }
    updateCurrentUserSettingsIntoDB(authUser, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_client_1.default.userSetting.update({
                where: {
                    user_id: authUser.user_id,
                },
                data: payload,
            });
        });
    }
    updateCurrentUserSpendableBalanceIntoDB(authUser, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { new_balance, reason } = payload;
            if (new_balance === 0) {
                throw new AppError_1.default(400, "Amount cannot be zero");
            }
            // 1️⃣ Fetch user's wallet
            const wallet = yield prisma_client_1.default.wallet.findUnique({
                where: { user_id: authUser.user_id },
            });
            if (!wallet) {
                throw new AppError_1.default(404, "Wallet not found");
            }
            const change_amount = payload.new_balance - wallet.spendable_balance;
            // 3️⃣ Perform atomic update and log BalanceUpdate
            return yield prisma_client_1.default.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                // Update wallet
                const updateWallet = yield tx.wallet.update({
                    where: { id: wallet.id },
                    data: {
                        spendable_balance: payload.new_balance,
                        total_balance: wallet.spendable_balance + change_amount,
                    },
                });
                // Log balance update
                const balanceUpdate = yield tx.balanceUpdate.create({
                    data: {
                        user_id: authUser.user_id,
                        prev_balance: wallet.spendable_balance,
                        new_balance: payload.new_balance,
                        change_amount,
                        balance_type: client_1.BalanceUpdateType.SPENDABLE,
                        reason,
                        resource: client_1.BalanceUpdateResource.USER_ADJUSTMENT,
                    },
                });
                return updateWallet;
            }));
        });
    }
}
exports.default = new UserService();
