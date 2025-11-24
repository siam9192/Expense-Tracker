"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const metadata_controller_1 = __importDefault(require("./metadata.controller"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_interface_1 = require("../user/user.interface");
const router = (0, express_1.Router)();
// 🔹 Summary endpoints
router.get("/me/global", (0, auth_1.default)([user_interface_1.UserRole.USER]), metadata_controller_1.default.getCurrentUserSummary);
router.get("/me/budget", (0, auth_1.default)([user_interface_1.UserRole.USER]), metadata_controller_1.default.getCurrentUserMonthlyBudgetSummary);
router.get("/me/wallet", (0, auth_1.default)([user_interface_1.UserRole.USER]), metadata_controller_1.default.getCurrentUserWalletSummary);
router.get("/me/transactions", (0, auth_1.default)([user_interface_1.UserRole.USER]), metadata_controller_1.default.getCurrentUserTransactionsSummary);
router.get("/me/goals", (0, auth_1.default)([user_interface_1.UserRole.USER]), metadata_controller_1.default.getCurrentUserGoalSummary);
router.get("/me/categories", (0, auth_1.default)([user_interface_1.UserRole.USER]), metadata_controller_1.default.getCurrentUserCategoriesSummary);
// 🔹 Stats endpoints with optional sequence
router.get("/me/expenses", (0, auth_1.default)([user_interface_1.UserRole.USER]), metadata_controller_1.default.getCurrentUserExpenseStats);
router.get("/me/incomes", (0, auth_1.default)([user_interface_1.UserRole.USER]), metadata_controller_1.default.getCurrentUserIncomeStats);
router.get("/me/finance", (0, auth_1.default)([user_interface_1.UserRole.USER]), metadata_controller_1.default.getCurrentUserFinanceStats);
router.get("/me/categories/expense/breakdown", (0, auth_1.default)([user_interface_1.UserRole.USER]), metadata_controller_1.default.getCurrentUserExpenseCategoryBreakdown);
const metadataRouter = router;
exports.default = metadataRouter;
