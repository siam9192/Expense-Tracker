import { CategoryType, GoalStatus, TransactionType } from "@prisma/client";
import prisma from "../../prisma-client";
import { AuthUser } from "../auth/auth.interface";
import { sumTransactions } from "../../helpers/global.helper";

class MetadataService {
  async getCurrentUserSummary(authUser: AuthUser) {
    // 1️⃣ Get Wallet
    const wallet = await prisma.wallet.findUnique({
      where: { user_id: authUser.user_id },
    });
    if (!wallet) throw new Error("Wallet not found");

    const total_balance = wallet.total_balance;

    // 2️⃣ Helper to safely add numbers
    const addSafe = (a?: number | null) => a ?? 0;

    // 3️⃣ Helper to sum grouped transactions
    const sumTransactions = (transactions: any[]) => {
      let income = 0,
        expense = 0;
      transactions.forEach((t) => {
        const value =
          addSafe(t._sum.conversion_amount) || addSafe(t._sum.amount);
        if (t.type === TransactionType.INCOME) income += value;
        if (t.type === TransactionType.EXPENSE) expense += value;
      });
      return { income, expense };
    };

    // 4️⃣ Base currency transactions
    const baseCurrencyTransactions = await prisma.transaction.groupBy({
      where: {
        user_id: authUser.user_id,
        type: { in: [TransactionType.INCOME, TransactionType.EXPENSE] },
        base_currency_id: { not: null },
      },
      by: ["type"],
      _sum: { conversion_amount: true },
    });

    // 5️⃣ Main currency transactions
    const mainCurrencyTransactions = await prisma.transaction.groupBy({
      where: {
        user_id: authUser.user_id,
        type: { in: [TransactionType.INCOME, TransactionType.EXPENSE] },
        base_currency_id: null,
      },
      by: ["type"],
      _sum: { amount: true },
    });

    // 6️⃣ Total income & expense
    const { income: baseIncome, expense: baseExpense } = sumTransactions(
      baseCurrencyTransactions,
    );
    const { income: mainIncome, expense: mainExpense } = sumTransactions(
      mainCurrencyTransactions,
    );

    const total_income = baseIncome + mainIncome;
    const total_expense = baseExpense + mainExpense;

    // 7️⃣ Monthly growth calculation
    const now = new Date();
    const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const currentMonthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    const prevMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const prevMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);

    const currentMonthTransactions = await prisma.transaction.groupBy({
      where: {
        user_id: authUser.user_id,
        type: { in: [TransactionType.INCOME, TransactionType.EXPENSE] },
        date: { gte: currentMonthStart, lte: currentMonthEnd },
      },
      by: ["type"],
      _sum: { conversion_amount: true, amount: true },
    });

    const previousMonthTransactions = await prisma.transaction.groupBy({
      where: {
        user_id: authUser.user_id,
        type: { in: [TransactionType.INCOME, TransactionType.EXPENSE] },
        date: { gte: prevMonthStart, lte: prevMonthEnd },
      },
      by: ["type"],
      _sum: { conversion_amount: true, amount: true },
    });

    const currentMonthTotals = sumTransactions(currentMonthTransactions);
    const previousMonthTotals = sumTransactions(previousMonthTransactions);

    const calculateGrowth = (current: number, previous: number) => {
      if (previous === 0) return current === 0 ? 0 : 100;
      return ((current - previous) / previous) * 100;
    };

    const current_month_growth = {
      income: calculateGrowth(
        currentMonthTotals.income,
        previousMonthTotals.income,
      ),
      expense: calculateGrowth(
        currentMonthTotals.expense,
        previousMonthTotals.expense,
      ),
    };

    // 8️⃣ Categories and Active Goals
    const total_categories = await prisma.category.count({
      where: { user_id: authUser.user_id },
    });

    const total_active_goals = await prisma.goal.count({
      where: { user_id: authUser.user_id, status: GoalStatus.ACTIVE },
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
  }
  async getCurrentUserWalletSummary(authUser: AuthUser) {
    // 1️⃣ Get Wallet
    const wallet = await prisma.wallet.findUnique({
      where: { user_id: authUser.user_id },
    });
    if (!wallet) throw new Error("Wallet not found");
    const userSettings = await prisma.userSetting.findUnique({
      where: {
        user_id: authUser.user_id,
      },
    });
    if (!userSettings) throw new Error();

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
  }

  async getCurrentUserMonthlyBudgetSummary(authUser: AuthUser) {
    // 1️⃣ Get Wallet
    const wallet = await prisma.wallet.findUnique({
      where: { user_id: authUser.user_id },
    });
    if (!wallet) throw new Error("Wallet not found");

    const userSettings = await prisma.userSetting.findUnique({
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
    const baseCurrencyTransactions = await prisma.transaction.groupBy({
      where: {
        user_id: authUser.user_id,
        type: { in: [TransactionType.INCOME, TransactionType.EXPENSE] },
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
    const mainCurrencyTransactions = await prisma.transaction.groupBy({
      where: {
        user_id: authUser.user_id,
        type: { in: [TransactionType.INCOME, TransactionType.EXPENSE] },
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
    const { income: baseIncome, expense: baseExpense } = sumTransactions(
      baseCurrencyTransactions,
    );
    const { income: mainIncome, expense: mainExpense } = sumTransactions(
      mainCurrencyTransactions,
    );

    const total_income = baseIncome + mainIncome;
    const total_expense = baseExpense + mainExpense;

    const budget_usage = (total_expense / monthly_budget) * 100;

    return {
      total_income,
      total_expense,
      budget_usage,
      budget: userSettings.monthly_budget,
    };
  }

  async getCurrentUserTransactionsSummary(authUser: AuthUser) {
    const now = new Date();
    const last30DaysStart = new Date();
    last30DaysStart.setDate(now.getDate() - 30);

    // 1️⃣ Fetch transactions in last 30 days
    const transactions = await prisma.transaction.findMany({
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
      const value = t.conversion_amount ?? t.amount ?? 0;
      if (t.type === TransactionType.INCOME) totalIncome += value;
      if (t.type === TransactionType.EXPENSE) totalExpense += value;
    });

    const period_total = transactions
      .filter((tr) => new Date(tr.date).getTime() >= last30DaysStart.getTime())
      .reduce((p, c) => p + (c.conversion_amount ?? c.amount ?? 0), 0);

    // 5️⃣ Return summary
    return {
      total_income: totalIncome,
      total_expense: totalExpense,
      transactions_count: transactions.length,
      period_total,
      period: "Last 30 days",
    };
  }

  async getCurrentUserGoalsSummary(authUser: AuthUser) {
    const goals = await prisma.goal.findMany({
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

    const activeGoals = goals.filter((g) => g.status === GoalStatus.ACTIVE);
    const completedGoals = goals.filter(
      (g) => g.status === GoalStatus.COMPLETED,
    );

    const current_savings = goals.reduce(
      (sum, g) => (!g.is_withdrawn ? sum + g.current_amount : sum),
      0,
    );

    const avg_progress =
      goals.reduce((sum, g) => sum + g.complete_percentage, 0) / goals.length;

    const total_completed_goals = (completedGoals.length / goals.length) * 100;

    const total_active_goals = activeGoals.length;

    return {
      current_savings,
      avg_progress: Number(avg_progress.toFixed(2)),
      total_completed_goals: Number(total_completed_goals.toFixed(2)),
      total_active_goals,
    };
  }

  async getCurrentUserCategoriesSummary(authUser: AuthUser) {
    // 1️⃣ Get all user categories
    const categories = await prisma.category.findMany({
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
    const categoryUsage = await prisma.transaction.groupBy({
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
      const totalTransactions = categoryUsage.reduce(
        (p, c) => p + c._count.id,
        0,
      );
      const topCategory = categoryUsage.reduce((max, c) =>
        c._count.id > max._count.id ? c : max,
      );

      const category = categories.find(
        (cat) => cat.id === topCategory.category_id,
      );
      most_used_category = category ? category.name : null;
      most_used_percentage = Number(
        ((topCategory._count.id / totalTransactions) * 100).toFixed(2),
      );
    }

    // 5️⃣ Return clean summary
    return {
      total_categories,
      unused_categories,
      most_used_category,
      most_used_percentage,
    };
  }

  async getCurrentUserExpenseStats(
    authUser: AuthUser,
    sequence: "day" | "month" | "year" = "day",
  ) {
    const now = new Date();
    let startDate: Date;
    let totalPoints: number;
    const labels: string[] = [];

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
    } else if (sequence === "month") {
      totalPoints = 12;
      startDate = new Date(
        now.getFullYear(),
        now.getMonth() - (totalPoints - 1), 
        1,
      );

      for (let i = 0; i < totalPoints; i++) {
        const d = new Date(
          startDate.getFullYear(),
          startDate.getMonth() + i,
          1,
        );
        labels.push(
          `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`,
        ); // YYYY-MM
      }
    } else {
      totalPoints = 6;
      startDate = new Date(now.getFullYear() - (totalPoints - 1), 0, 1);

      for (let i = 0; i < totalPoints; i++) {
        const d = new Date(startDate.getFullYear() + i, 0, 1);
        labels.push(`${d.getFullYear()}`); // YYYY
      }
    }

    // 💰 Fetch expenses in range
    const expenses = await prisma.transaction.findMany({
      where: {
        user_id: authUser.user_id,
        type: TransactionType.EXPENSE,
        date: { gte: startDate, lte: now },
      },
      select: { amount: true, date: true },
    });

    // 🧮 Group existing data
    const grouped: Record<string, number> = {};
    for (const tx of expenses) {
      const d = new Date(tx.date);
      let key = "";

      if (sequence === "day") key = d.toISOString().split("T")[0];
      else if (sequence === "month")
        key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      else key = `${d.getFullYear()}`;

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
  }

  async getCurrentUserIncomeStats(
    authUser: AuthUser,
    sequence: "day" | "month" | "year" = "day",
  ) {
    const now = new Date();
    let startDate: Date;
    let totalPoints: number;
    const labels: string[] = [];

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
    } else if (sequence === "month") {
      totalPoints = 12;
      startDate = new Date(
        now.getFullYear(),
        now.getMonth() - (totalPoints - 1),
        1,
      );

      for (let i = 0; i < totalPoints; i++) {
        const d = new Date(
          startDate.getFullYear(),
          startDate.getMonth() + i,
          1,
        );
        labels.push(
          `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`,
        ); // YYYY-MM
      }
    } else {
      totalPoints = 6;
      startDate = new Date(now.getFullYear() - (totalPoints - 1), 0, 1);

      for (let i = 0; i < totalPoints; i++) {
        const d = new Date(startDate.getFullYear() + i, 0, 1);
        labels.push(`${d.getFullYear()}`); // YYYY
      }
    }

    // 💰 Fetch incomes in range
    const incomes = await prisma.transaction.findMany({
      where: {
        user_id: authUser.user_id,
        type: TransactionType.INCOME,
        date: { gte: startDate, lte: now },
      },
      select: { amount: true, date: true },
    });

    // 🧮 Group existing data
    const grouped: Record<string, number> = {};
    for (const tx of incomes) {
      const d = new Date(tx.date);
      let key = "";

      if (sequence === "day") key = d.toISOString().split("T")[0];
      else if (sequence === "month")
        key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      else key = `${d.getFullYear()}`;

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
  }

  async getCurrentUserFinanceStats(
    authUser: AuthUser,
    sequence: "month" | "year" = "month",
  ) {
    const now = new Date();
    let startDate: Date;
    let endDate: Date;

    if (sequence === "month") {
      // Current month
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      endDate = new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        0,
        23,
        59,
        59,
        999,
      );
    } else {
      // Current year
      startDate = new Date(now.getFullYear(), 0, 1);
      endDate = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);
    }

    // 💰 Fetch income & expenses
    const transactions = await prisma.transaction.findMany({
      where: {
        user_id: authUser.user_id,
        type: { in: [TransactionType.INCOME, TransactionType.EXPENSE] },
        date: { gte: startDate, lte: endDate },
      },
      select: { amount: true, type: true },
    });

    let total_income = 0;
    let total_expense = 0;

    for (const tx of transactions) {
      if (tx.type === TransactionType.INCOME) total_income += tx.amount;
      else if (tx.type === TransactionType.EXPENSE) total_expense += tx.amount;
    }

    // 💵 Fetch savings from goals (completed + active)
    const goals = await prisma.goal.findMany({
      where: { user_id: authUser.user_id },
      select: { current_amount: true, is_withdrawn: true },
    });

    const savings = goals.reduce(
      (sum, g) => (!g.is_withdrawn ? sum + g.current_amount : sum),
      0,
    );

    return {
      sequence,
      income: total_income,
      expense: total_expense,
      savings,
    };
  }

  async getCurrentUserExpenseCategoryBreakdown(
    authUser: AuthUser,
    sequence: "month" | "year" = "month",
  ) {
    const now = new Date();
    let startDate: Date;
    let endDate: Date;

    if (sequence === "month") {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      endDate = new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        0,
        23,
        59,
        59,
        999,
      );
    } else {
      startDate = new Date(now.getFullYear(), 0, 1);
      endDate = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);
    }

    // 1️⃣ Fetch all user categories
    const categories = await prisma.category.findMany({
      where: { user_id: authUser.user_id },
      select: { id: true, name: true },
    });

    if (categories.length === 0) return [];

    // 2️⃣ Group expenses by category within the date range
    const categoryExpenses = await prisma.transaction.groupBy({
      by: ["category_id"],
      where: {
        user_id: authUser.user_id,
        type: CategoryType.EXPENSE,
        date: { gte: startDate, lte: endDate },
      },
      _sum: { amount: true },
    });

    // 3️⃣ Calculate total expenses for the selected period
    const totalExpenses = categoryExpenses.reduce(
      (sum, c) => sum + (c._sum.amount || 0),
      0,
    );

    // 4️⃣ Map results to category names + total + percentage
    const breakdown = categories
      .map((cat) => {
        const catExpense = categoryExpenses.find(
          (c) => c.category_id === cat.id,
        );
        const total = catExpense?._sum.amount || 0;
        const percentage =
          totalExpenses > 0
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
  }

  async getCurrentUserNotificationsSummary(authUser: AuthUser) {
    const notifications = await prisma.notification.findMany({
      where: {
        user_id: authUser.user_id,
      },
    });

    const read = notifications.filter((_) => _.is_read).length;
    const unread = notifications.filter((_) => _.is_read === false).length;
    const total = notifications.length;

    return {
      total,
      read,
      unread,
    };
  }
}
export default new MetadataService();
