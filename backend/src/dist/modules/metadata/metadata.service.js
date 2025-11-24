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
const prisma_client_1 = __importDefault(require("../../prisma-client"));
const global_helper_1 = require("../../helpers/global.helper");
class MetadataService {
    getCurrentUserSummary(authUser) {
        return __awaiter(this, void 0, void 0, function* () {
            // 1️⃣ Get Wallet
            const wallet = yield prisma_client_1.default.wallet.findUnique({
                where: { user_id: authUser.user_id },
            });
            if (!wallet)
                throw new Error("Wallet not found");
            const total_balance = wallet.total_balance;
            // 2️⃣ Helper to safely add numbers
            const addSafe = (a) => a !== null && a !== void 0 ? a : 0;
            // 3️⃣ Helper to sum grouped transactions
            const sumTransactions = (transactions) => {
                let income = 0, expense = 0;
                transactions.forEach((t) => {
                    const value = addSafe(t._sum.conversion_amount) || addSafe(t._sum.amount);
                    if (t.type === client_1.TransactionType.INCOME)
                        income += value;
                    if (t.type === client_1.TransactionType.EXPENSE)
                        expense += value;
                });
                return { income, expense };
            };
            // 4️⃣ Base currency transactions
            const baseCurrencyTransactions = yield prisma_client_1.default.transaction.groupBy({
                where: {
                    user_id: authUser.user_id,
                    type: { in: [client_1.TransactionType.INCOME, client_1.TransactionType.EXPENSE] },
                    base_currency_id: { not: null },
                },
                by: ["type"],
                _sum: { conversion_amount: true },
            });
            // 5️⃣ Main currency transactions
            const mainCurrencyTransactions = yield prisma_client_1.default.transaction.groupBy({
                where: {
                    user_id: authUser.user_id,
                    type: { in: [client_1.TransactionType.INCOME, client_1.TransactionType.EXPENSE] },
                    base_currency_id: null,
                },
                by: ["type"],
                _sum: { amount: true },
            });
            // 6️⃣ Total income & expense
            const { income: baseIncome, expense: baseExpense } = sumTransactions(baseCurrencyTransactions);
            const { income: mainIncome, expense: mainExpense } = sumTransactions(mainCurrencyTransactions);
            const total_income = baseIncome + mainIncome;
            const total_expense = baseExpense + mainExpense;
            // 7️⃣ Monthly growth calculation
            const now = new Date();
            const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
            const currentMonthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
            const prevMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
            const prevMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);
            const currentMonthTransactions = yield prisma_client_1.default.transaction.groupBy({
                where: {
                    user_id: authUser.user_id,
                    type: { in: [client_1.TransactionType.INCOME, client_1.TransactionType.EXPENSE] },
                    date: { gte: currentMonthStart, lte: currentMonthEnd },
                },
                by: ["type"],
                _sum: { conversion_amount: true, amount: true },
            });
            const previousMonthTransactions = yield prisma_client_1.default.transaction.groupBy({
                where: {
                    user_id: authUser.user_id,
                    type: { in: [client_1.TransactionType.INCOME, client_1.TransactionType.EXPENSE] },
                    date: { gte: prevMonthStart, lte: prevMonthEnd },
                },
                by: ["type"],
                _sum: { conversion_amount: true, amount: true },
            });
            const currentMonthTotals = sumTransactions(currentMonthTransactions);
            const previousMonthTotals = sumTransactions(previousMonthTransactions);
            const calculateGrowth = (current, previous) => {
                if (previous === 0)
                    return current === 0 ? 0 : 100;
                return ((current - previous) / previous) * 100;
            };
            const current_month_growth = {
                income: calculateGrowth(currentMonthTotals.income, previousMonthTotals.income),
                expense: calculateGrowth(currentMonthTotals.expense, previousMonthTotals.expense),
            };
            // 8️⃣ Categories and Active Goals
            const total_categories = yield prisma_client_1.default.category.count({
                where: { user_id: authUser.user_id },
            });
            const total_active_goals = yield prisma_client_1.default.goal.count({
                where: { user_id: authUser.user_id, status: client_1.GoalStatus.ACTIVE },
            });
            // 9️⃣ Return consolidated summary
            return {
                total_balance,
                total_categories,
                total_active_goals,
                total_income,
                total_expense,
                current_month_growth,
            };
        });
    }
    getCurrentUserWalletSummary(authUser) {
        return __awaiter(this, void 0, void 0, function* () {
            // 1️⃣ Get Wallet
            const wallet = yield prisma_client_1.default.wallet.findUnique({
                where: { user_id: authUser.user_id },
            });
            if (!wallet)
                throw new Error("Wallet not found");
            const userSettings = yield prisma_client_1.default.userSetting.findUnique({
                where: {
                    user_id: authUser.user_id,
                },
            });
            if (!userSettings)
                throw new Error();
            const total_balance = wallet.total_balance;
            const spendable_balance = wallet.spendable_balance;
            const saving_balance = wallet.saving_balance;
            const monthly_budget = userSettings.monthly_budget;
            const last_month_spent = 0;
            return {
                total_balance,
                spendable_balance,
                saving_balance,
                monthly_budget,
                last_month_spent,
            };
        });
    }
    getCurrentUserMonthlyBudgetSummary(authUser) {
        return __awaiter(this, void 0, void 0, function* () {
            // 1️⃣ Get Wallet
            const wallet = yield prisma_client_1.default.wallet.findUnique({
                where: { user_id: authUser.user_id },
            });
            if (!wallet)
                throw new Error("Wallet not found");
            const userSettings = yield prisma_client_1.default.userSetting.findUnique({
                where: {
                    user_id: authUser.user_id,
                },
            });
            if (!userSettings) {
                throw new Error();
            }
            const { monthly_budget } = userSettings;
            // 7️⃣ Monthly growth calculation
            const now = new Date();
            const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
            const currentMonthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
            // 4️⃣ Base currency transactions
            const baseCurrencyTransactions = yield prisma_client_1.default.transaction.groupBy({
                where: {
                    user_id: authUser.user_id,
                    type: { in: [client_1.TransactionType.INCOME, client_1.TransactionType.EXPENSE] },
                    base_currency_id: { not: null },
                    date: {
                        gte: currentMonthStart,
                        lte: currentMonthEnd,
                    },
                },
                by: ["type"],
                _sum: { conversion_amount: true },
            });
            // 5️⃣ Main currency transactions
            const mainCurrencyTransactions = yield prisma_client_1.default.transaction.groupBy({
                where: {
                    user_id: authUser.user_id,
                    type: { in: [client_1.TransactionType.INCOME, client_1.TransactionType.EXPENSE] },
                    base_currency_id: null,
                    date: {
                        gte: currentMonthStart,
                        lte: currentMonthEnd,
                    },
                },
                by: ["type"],
                _sum: { amount: true },
            });
            console.log(baseCurrencyTransactions, mainCurrencyTransactions);
            // 6️⃣ Total income & expense
            const { income: baseIncome, expense: baseExpense } = (0, global_helper_1.sumTransactions)(baseCurrencyTransactions);
            const { income: mainIncome, expense: mainExpense } = (0, global_helper_1.sumTransactions)(mainCurrencyTransactions);
            const total_income = baseIncome + mainIncome;
            const total_expense = baseExpense + mainExpense;
            const budget_usage = (total_expense / monthly_budget) * 100;
            return {
                total_income,
                total_expense,
                budget_usage,
                budget: userSettings.monthly_budget,
            };
        });
    }
    getCurrentUserTransactionsSummary(authUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const now = new Date();
            const last30DaysStart = new Date();
            last30DaysStart.setDate(now.getDate() - 30);
            // 1️⃣ Fetch transactions in last 30 days
            const transactions = yield prisma_client_1.default.transaction.findMany({
                where: {
                    user_id: authUser.user_id,
                },
                select: {
                    type: true,
                    amount: true,
                    conversion_amount: true,
                    base_currency_id: true,
                    date: true,
                },
            });
            // 2️⃣ Sum income and expense
            let totalIncome = 0;
            let totalExpense = 0;
            transactions.forEach((t) => {
                var _a, _b;
                const value = (_b = (_a = t.conversion_amount) !== null && _a !== void 0 ? _a : t.amount) !== null && _b !== void 0 ? _b : 0;
                if (t.type === client_1.TransactionType.INCOME)
                    totalIncome += value;
                if (t.type === client_1.TransactionType.EXPENSE)
                    totalExpense += value;
            });
            const period_total = transactions
                .filter((tr) => new Date(tr.date).getTime() >= last30DaysStart.getTime())
                .reduce((p, c) => { var _a, _b; return p + ((_b = (_a = c.conversion_amount) !== null && _a !== void 0 ? _a : c.amount) !== null && _b !== void 0 ? _b : 0); }, 0);
            // 5️⃣ Return summary
            return {
                total_income: totalIncome,
                total_expense: totalExpense,
                transactions_count: transactions.length,
                period_total,
                period: "Last 30 days",
            };
        });
    }
    getCurrentUserGoalsSummary(authUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const goals = yield prisma_client_1.default.goal.findMany({
                where: { user_id: authUser.user_id },
                select: {
                    is_withdrawn: true,
                    current_amount: true,
                    complete_percentage: true,
                    status: true,
                },
            });
            if (goals.length === 0) {
                return {
                    current_savings: 0,
                    avg_progress: 0,
                    total_completed_goals: 0,
                    total_active_goals: 0,
                };
            }
            const activeGoals = goals.filter((g) => g.status === client_1.GoalStatus.ACTIVE);
            const completedGoals = goals.filter((g) => g.status === client_1.GoalStatus.COMPLETED);
            const current_savings = goals.reduce((sum, g) => (!g.is_withdrawn ? sum + g.current_amount : sum), 0);
            const avg_progress = goals.reduce((sum, g) => sum + g.complete_percentage, 0) / goals.length;
            const total_completed_goals = (completedGoals.length / goals.length) * 100;
            const total_active_goals = activeGoals.length;
            return {
                current_savings,
                avg_progress: Number(avg_progress.toFixed(2)),
                total_completed_goals: Number(total_completed_goals.toFixed(2)),
                total_active_goals,
            };
        });
    }
    getCurrentUserCategoriesSummary(authUser) {
        return __awaiter(this, void 0, void 0, function* () {
            // 1️⃣ Get all user categories
            const categories = yield prisma_client_1.default.category.findMany({
                where: { user_id: authUser.user_id },
                select: { id: true, name: true },
            });
            if (categories.length === 0) {
                return {
                    total_categories: 0,
                    unused_categories: 0,
                    most_used_category: null,
                    most_used_percentage: 0,
                };
            }
            const total_categories = categories.length;
            // 2️⃣ Count transactions per category
            const categoryUsage = yield prisma_client_1.default.transaction.groupBy({
                by: ["category_id"],
                where: { user_id: authUser.user_id },
                _count: { id: true },
            });
            // 3️⃣ Compute unused categories
            const usedCategoryIds = new Set(categoryUsage.map((c) => c.category_id));
            const unused_categories = total_categories - usedCategoryIds.size;
            // 4️⃣ Find most used category
            let most_used_category = null;
            let most_used_percentage = 0;
            if (categoryUsage.length > 0) {
                const totalTransactions = categoryUsage.reduce((p, c) => p + c._count.id, 0);
                const topCategory = categoryUsage.reduce((max, c) => c._count.id > max._count.id ? c : max);
                const category = categories.find((cat) => cat.id === topCategory.category_id);
                most_used_category = category ? category.name : null;
                most_used_percentage = Number(((topCategory._count.id / totalTransactions) * 100).toFixed(2));
            }
            // 5️⃣ Return clean summary
            return {
                total_categories,
                unused_categories,
                most_used_category,
                most_used_percentage,
            };
        });
    }
    getCurrentUserExpenseStats(authUser_1) {
        return __awaiter(this, arguments, void 0, function* (authUser, sequence = "day") {
            const now = new Date();
            let startDate;
            let totalPoints;
            const labels = [];
            // 🕒 Determine date range + label list
            if (sequence === "day") {
                totalPoints = 30;
                startDate = new Date(now);
                startDate.setDate(startDate.getDate() - (totalPoints - 1));
                for (let i = 0; i < totalPoints; i++) {
                    const d = new Date(startDate);
                    d.setDate(startDate.getDate() + i);
                    labels.push(d.toISOString().split("T")[0]); // YYYY-MM-DD
                }
            }
            else if (sequence === "month") {
                totalPoints = 12;
                startDate = new Date(now.getFullYear(), now.getMonth() - (totalPoints - 1), 1);
                for (let i = 0; i < totalPoints; i++) {
                    const d = new Date(startDate.getFullYear(), startDate.getMonth() + i, 1);
                    labels.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`); // YYYY-MM
                }
            }
            else {
                totalPoints = 6;
                startDate = new Date(now.getFullYear() - (totalPoints - 1), 0, 1);
                for (let i = 0; i < totalPoints; i++) {
                    const d = new Date(startDate.getFullYear() + i, 0, 1);
                    labels.push(`${d.getFullYear()}`); // YYYY
                }
            }
            // 💰 Fetch expenses in range
            const expenses = yield prisma_client_1.default.transaction.findMany({
                where: {
                    user_id: authUser.user_id,
                    type: client_1.TransactionType.EXPENSE,
                    date: { gte: startDate, lte: now },
                },
                select: { amount: true, date: true },
            });
            // 🧮 Group existing data
            const grouped = {};
            for (const tx of expenses) {
                const d = new Date(tx.date);
                let key = "";
                if (sequence === "day")
                    key = d.toISOString().split("T")[0];
                else if (sequence === "month")
                    key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
                else
                    key = `${d.getFullYear()}`;
                grouped[key] = (grouped[key] || 0) + tx.amount;
            }
            // 🧾 Fill missing entries with 0
            const stats = labels.map((label) => ({
                label,
                total: grouped[label] || 0,
            }));
            // 💵 Total expense
            const total_expense = stats.reduce((sum, s) => sum + s.total, 0);
            return {
                sequence,
                total_expense,
                stats,
            };
        });
    }
    getCurrentUserIncomeStats(authUser_1) {
        return __awaiter(this, arguments, void 0, function* (authUser, sequence = "day") {
            const now = new Date();
            let startDate;
            let totalPoints;
            const labels = [];
            // 🕒 Determine date range + label list
            if (sequence === "day") {
                totalPoints = 30;
                startDate = new Date(now);
                startDate.setDate(startDate.getDate() - (totalPoints - 1));
                for (let i = 0; i < totalPoints; i++) {
                    const d = new Date(startDate);
                    d.setDate(startDate.getDate() + i);
                    labels.push(d.toISOString().split("T")[0]); // YYYY-MM-DD
                }
            }
            else if (sequence === "month") {
                totalPoints = 12;
                startDate = new Date(now.getFullYear(), now.getMonth() - (totalPoints - 1), 1);
                for (let i = 0; i < totalPoints; i++) {
                    const d = new Date(startDate.getFullYear(), startDate.getMonth() + i, 1);
                    labels.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`); // YYYY-MM
                }
            }
            else {
                totalPoints = 6;
                startDate = new Date(now.getFullYear() - (totalPoints - 1), 0, 1);
                for (let i = 0; i < totalPoints; i++) {
                    const d = new Date(startDate.getFullYear() + i, 0, 1);
                    labels.push(`${d.getFullYear()}`); // YYYY
                }
            }
            // 💰 Fetch incomes in range
            const incomes = yield prisma_client_1.default.transaction.findMany({
                where: {
                    user_id: authUser.user_id,
                    type: client_1.TransactionType.INCOME,
                    date: { gte: startDate, lte: now },
                },
                select: { amount: true, date: true },
            });
            // 🧮 Group existing data
            const grouped = {};
            for (const tx of incomes) {
                const d = new Date(tx.date);
                let key = "";
                if (sequence === "day")
                    key = d.toISOString().split("T")[0];
                else if (sequence === "month")
                    key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
                else
                    key = `${d.getFullYear()}`;
                grouped[key] = (grouped[key] || 0) + tx.amount;
            }
            // 🧾 Fill missing entries with 0
            const stats = labels.map((label) => ({
                label,
                total: grouped[label] || 0,
            }));
            // 💵 Total income
            const total_income = stats.reduce((sum, s) => sum + s.total, 0);
            return {
                sequence,
                total_income,
                stats,
            };
        });
    }
    getCurrentUserFinanceStats(authUser_1) {
        return __awaiter(this, arguments, void 0, function* (authUser, sequence = "month") {
            const now = new Date();
            let startDate;
            let endDate;
            if (sequence === "month") {
                // Current month
                startDate = new Date(now.getFullYear(), now.getMonth(), 1);
                endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
            }
            else {
                // Current year
                startDate = new Date(now.getFullYear(), 0, 1);
                endDate = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);
            }
            // 💰 Fetch income & expenses
            const transactions = yield prisma_client_1.default.transaction.findMany({
                where: {
                    user_id: authUser.user_id,
                    type: { in: [client_1.TransactionType.INCOME, client_1.TransactionType.EXPENSE] },
                    date: { gte: startDate, lte: endDate },
                },
                select: { amount: true, type: true },
            });
            let total_income = 0;
            let total_expense = 0;
            for (const tx of transactions) {
                if (tx.type === client_1.TransactionType.INCOME)
                    total_income += tx.amount;
                else if (tx.type === client_1.TransactionType.EXPENSE)
                    total_expense += tx.amount;
            }
            // 💵 Fetch savings from goals (completed + active)
            const goals = yield prisma_client_1.default.goal.findMany({
                where: { user_id: authUser.user_id },
                select: { current_amount: true, is_withdrawn: true },
            });
            const savings = goals.reduce((sum, g) => (!g.is_withdrawn ? sum + g.current_amount : sum), 0);
            return {
                sequence,
                income: total_income,
                expense: total_expense,
                savings,
            };
        });
    }
    getCurrentUserExpenseCategoryBreakdown(authUser_1) {
        return __awaiter(this, arguments, void 0, function* (authUser, sequence = "month") {
            const now = new Date();
            let startDate;
            let endDate;
            if (sequence === "month") {
                startDate = new Date(now.getFullYear(), now.getMonth(), 1);
                endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
            }
            else {
                startDate = new Date(now.getFullYear(), 0, 1);
                endDate = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);
            }
            // 1️⃣ Fetch all user categories
            const categories = yield prisma_client_1.default.category.findMany({
                where: { user_id: authUser.user_id },
                select: { id: true, name: true },
            });
            if (categories.length === 0)
                return [];
            // 2️⃣ Group expenses by category within the date range
            const categoryExpenses = yield prisma_client_1.default.transaction.groupBy({
                by: ["category_id"],
                where: {
                    user_id: authUser.user_id,
                    type: client_1.CategoryType.EXPENSE,
                    date: { gte: startDate, lte: endDate },
                },
                _sum: { amount: true },
            });
            // 3️⃣ Calculate total expenses for the selected period
            const totalExpenses = categoryExpenses.reduce((sum, c) => sum + (c._sum.amount || 0), 0);
            // 4️⃣ Map results to category names + total + percentage
            const breakdown = categories
                .map((cat) => {
                const catExpense = categoryExpenses.find((c) => c.category_id === cat.id);
                const total = (catExpense === null || catExpense === void 0 ? void 0 : catExpense._sum.amount) || 0;
                const percentage = totalExpenses > 0
                    ? Number(((total / totalExpenses) * 100).toFixed(2))
                    : 0;
                return {
                    category: cat.name,
                    total,
                    percentage,
                };
            })
                .filter((_) => _.total > 0);
            return {
                sequence,
                breakdown,
            };
        });
    }
    getCurrentUserNotificationsSummary(authUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const notifications = yield prisma_client_1.default.notification.findMany({
                where: {
                    user_id: authUser.user_id,
                },
            });
            const read = notifications.filter((_) => _.is_read);
            const unread = notifications.filter((_) => _.is_read === false);
            const total = notifications.length;
            return {
                total,
                read,
                unread,
            };
        });
    }
}
exports.default = new MetadataService();
